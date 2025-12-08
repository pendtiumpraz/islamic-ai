import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/hafalan/quran/[surahNumber] - Get all ayahs of a surah
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surahNumber: string }> }
) {
  try {
    const { surahNumber } = await params;
    const surahNum = parseInt(surahNumber);
    
    if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
      return NextResponse.json(
        { success: false, error: "Invalid surah number" },
        { status: 400 }
      );
    }

    const session = await getSession();
    const userTier = session?.user?.tier || "FREE";
    const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
    const userTierIndex = tierOrder.indexOf(userTier);
    const accessibleTiers = tierOrder.slice(0, userTierIndex + 1);

    // Get all ayahs for this surah
    const ayahs = await prisma.hafalanItem.findMany({
      where: {
        type: "QURAN",
        surahNumber: surahNum,
      },
      orderBy: { ayahStart: "asc" },
      select: {
        id: true,
        title: true,
        arabicText: true,
        translation: true,
        ayahStart: true,
        ayahEnd: true,
        minTier: true,
      },
    });

    if (ayahs.length === 0) {
      return NextResponse.json(
        { success: false, error: "Surah not found" },
        { status: 404 }
      );
    }

    // Get surah name from first ayah
    const surahName = ayahs[0].title?.split(" : ")[0] || `Surah ${surahNum}`;

    // Check access
    const surahMinTier = ayahs[0].minTier;
    const hasAccess = accessibleTiers.includes(surahMinTier);

    if (!hasAccess) {
      return NextResponse.json({
        success: false,
        error: `Upgrade ke ${surahMinTier} untuk mengakses surah ini`,
        requiredTier: surahMinTier,
      }, { status: 403 });
    }

    // Get user progress and feedback history for each ayah
    let ayahsWithProgress = ayahs.map((a) => ({
      id: a.id,
      ayahNumber: a.ayahStart || 1,
      arabicText: a.arabicText,
      translation: a.translation,
      progress: null as { status: string; bestScore: number; totalAttempts: number } | null,
      feedbackHistory: [] as { id: string; score: number; feedback: string; createdAt: Date }[],
    }));

    if (session?.user?.id) {
      // Get progress
      const progress = await prisma.hafalanProgress.findMany({
        where: {
          userId: session.user.id,
          itemId: { in: ayahs.map((a) => a.id) },
        },
        select: {
          itemId: true,
          status: true,
          bestScore: true,
          totalAttempts: true,
        },
      });

      // Get all submissions (feedback history) - cannot be deleted
      const submissions = await prisma.hafalanSubmission.findMany({
        where: {
          userId: session.user.id,
          itemId: { in: ayahs.map((a) => a.id) },
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          itemId: true,
          score: true,
          feedbackSummary: true,
          createdAt: true,
        },
      });

      const progressMap = new Map(progress.map((p) => [p.itemId, p]));
      const submissionsMap = new Map<string, typeof submissions>();
      submissions.forEach((s) => {
        if (!submissionsMap.has(s.itemId)) {
          submissionsMap.set(s.itemId, []);
        }
        submissionsMap.get(s.itemId)!.push(s);
      });

      ayahsWithProgress = ayahsWithProgress.map((ayah) => {
        const prog = progressMap.get(ayah.id);
        const subs = submissionsMap.get(ayah.id) || [];
        return {
          ...ayah,
          progress: prog ? { 
            status: prog.status, 
            bestScore: prog.bestScore,
            totalAttempts: prog.totalAttempts,
          } : null,
          feedbackHistory: subs.map((s) => ({
            id: s.id,
            score: s.score,
            feedback: s.feedbackSummary || "",
            createdAt: s.createdAt,
          })),
        };
      });
    }

    return NextResponse.json({
      success: true,
      surahNumber: surahNum,
      surahName,
      ayahs: ayahsWithProgress,
      userTier,
    });
  } catch (error) {
    console.error("Error fetching surah:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch surah" },
      { status: 500 }
    );
  }
}
