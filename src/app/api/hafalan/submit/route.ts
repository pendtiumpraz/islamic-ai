import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, resetDailyUsageIfNeeded } from "@/lib/auth";
import { evaluateHafalan } from "@/lib/gemini";
import { canUseFeature, TIER_LIMITS, Tier } from "@/lib/utils";

// POST /api/hafalan/submit - Submit hafalan for AI evaluation
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Reset daily usage if needed
    await resetDailyUsageIfNeeded(user.id);

    // Check rate limit
    const userTier = user.tier as Tier;
    if (!canUseFeature(userTier, "dailyHafalan", user.dailyHafalanCount)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Batas setoran harian tercapai (${TIER_LIMITS[userTier].dailyHafalan}/hari)` 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { itemId, mode, audioData, audioMimeType } = body;

    if (!itemId || !audioData) {
      return NextResponse.json(
        { success: false, error: "itemId and audioData are required" },
        { status: 400 }
      );
    }

    // Get hafalan item
    const item = await prisma.hafalanItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Hafalan item not found" },
        { status: 404 }
      );
    }

    const audioBase64 = audioData;
    const mimeType = audioMimeType || "audio/webm";

    // Evaluate with Gemini
    const evaluation = await evaluateHafalan(
      item.arabicText,
      audioBase64,
      item.type.toLowerCase() as "quran" | "hadits" | "matan",
      mimeType
    );

    // Get current progress
    let progress = await prisma.hafalanProgress.findUnique({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId: item.id,
        },
      },
    });

    const attemptNumber = progress ? progress.totalAttempts + 1 : 1;
    const isFirstPass = !progress?.firstPassedAt && evaluation.passed;

    // Save submission
    await prisma.hafalanSubmission.create({
      data: {
        userId: user.id,
        itemId: item.id,
        itemType: item.type,
        mode: mode === "BLIND" ? "BLIND" : "WITH_TEXT",
        score: evaluation.score,
        passed: evaluation.passed,
        accuracyScore: evaluation.scoreBreakdown?.accuracy,
        tajwidScore: evaluation.scoreBreakdown?.tajwid,
        fluencyScore: evaluation.scoreBreakdown?.fluency,
        feedbackSummary: evaluation.feedback.summary,
        feedbackCorrections: evaluation.feedback.corrections,
        feedbackTips: evaluation.feedback.tips,
        attemptNumber,
      },
    });

    // Update or create progress
    if (progress) {
      progress = await prisma.hafalanProgress.update({
        where: { id: progress.id },
        data: {
          status: evaluation.passed ? "PASSED" : "IN_PROGRESS",
          canProceed: evaluation.passed,
          bestScore: Math.max(progress.bestScore, evaluation.score),
          totalAttempts: attemptNumber,
          lastAttemptAt: new Date(),
          firstPassedAt: isFirstPass ? new Date() : progress.firstPassedAt,
        },
      });
    } else {
      progress = await prisma.hafalanProgress.create({
        data: {
          userId: user.id,
          itemId: item.id,
          itemType: item.type,
          status: evaluation.passed ? "PASSED" : "IN_PROGRESS",
          canProceed: evaluation.passed,
          bestScore: evaluation.score,
          totalAttempts: 1,
          lastAttemptAt: new Date(),
          firstPassedAt: evaluation.passed ? new Date() : null,
        },
      });
    }

    // Increment daily usage
    await prisma.user.update({
      where: { id: user.id },
      data: { dailyHafalanCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      submission: {
        id: `${user.id}-${itemId}-${attemptNumber}`,
        score: evaluation.score,
        passed: evaluation.passed,
        feedbackSummary: evaluation.feedback.summary,
        createdAt: new Date().toISOString(),
      },
      data: {
        type: "hafalan_evaluation",
        score: evaluation.score,
        passed: evaluation.passed,
        scoreBreakdown: evaluation.scoreBreakdown,
        feedback: evaluation.feedback,
        progress: {
          canProceed: evaluation.passed,
          attemptNumber,
          bestScore: progress.bestScore,
        },
      },
    });
  } catch (error) {
    console.error("Error submitting hafalan:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit hafalan" },
      { status: 500 }
    );
  }
}
