import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { geminiAudioModel } from "@/lib/gemini";

// POST /api/hafalan/evaluate-surah - Evaluate full surah recitation with per-ayah scoring
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { surahNumber, audioData, audioMimeType } = body;

    if (!surahNumber || !audioData) {
      return NextResponse.json(
        { success: false, error: "surahNumber and audioData are required" },
        { status: 400 }
      );
    }

    // Get all ayahs for this surah
    const ayahs = await prisma.hafalanItem.findMany({
      where: {
        type: "QURAN",
        surahNumber: parseInt(surahNumber),
      },
      orderBy: { ayahStart: "asc" },
      select: {
        id: true,
        title: true,
        arabicText: true,
        ayahStart: true,
      },
    });

    if (ayahs.length === 0) {
      return NextResponse.json(
        { success: false, error: "Surah not found" },
        { status: 404 }
      );
    }

    const surahName = ayahs[0].title?.split(" : ")[0] || `Surah ${surahNumber}`;

    // Build prompt for Gemini
    const ayahTexts = ayahs.map((a) => ({
      number: a.ayahStart,
      text: a.arabicText,
    }));

    const prompt = `Kamu adalah penguji hafalan Al-Quran yang ahli dalam tajwid dan makhraj.

SURAH: ${surahName} (${ayahs.length} ayat)

DAFTAR AYAT:
${ayahTexts.map((a) => `Ayat ${a.number}: ${a.text}`).join("\n")}

TUGAS:
1. Dengarkan rekaman audio yang dikirim
2. Identifikasi ayat mana saja yang dibaca (dari ayat 1 sampai ayat berapa)
3. Evaluasi setiap ayat yang dibaca dengan skor 0-100
4. Berikan feedback singkat

KRITERIA PENILAIAN:
- Accuracy (ketepatan bacaan): 40%
- Tajwid (hukum bacaan): 30%
- Makharijul huruf: 20%
- Kelancaran: 10%

RESPONSE FORMAT (JSON only, no markdown):
{
  "totalScore": <rata-rata skor 0-100>,
  "lastAyahRecited": <nomor ayat terakhir yang dibaca>,
  "ayahScores": [
    {
      "ayahNumber": 1,
      "score": <0-100>,
      "status": "<correct|partial|incorrect>",
      "feedback": "<feedback singkat jika ada kesalahan>"
    }
  ],
  "summary": "<ringkasan evaluasi dalam bahasa Indonesia, max 2 kalimat>"
}

RULES:
- Jika ayat tidak dibaca, jangan masukkan ke ayahScores
- status "correct" = skor >= 80
- status "partial" = skor 50-79
- status "incorrect" = skor < 50
- Berikan response JSON saja tanpa markdown`;

    const mimeType = audioMimeType || "audio/webm";

    console.log("Evaluating surah with Gemini...");
    console.log("Surah:", surahName, "Ayahs:", ayahs.length);

    const result = await geminiAudioModel.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: mimeType,
          data: audioData,
        },
      },
    ]);

    const responseText = result.response.text();
    console.log("Gemini response:", responseText);

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }

    const evaluation = JSON.parse(jsonMatch[0]);

    // Save progress and submission for each evaluated ayah
    if (evaluation.ayahScores && Array.isArray(evaluation.ayahScores)) {
      for (const ayahScore of evaluation.ayahScores) {
        const ayahData = ayahs.find((a) => a.ayahStart === ayahScore.ayahNumber);
        if (!ayahData) continue;

        // Get existing progress to compare best score
        const existingProgress = await prisma.hafalanProgress.findUnique({
          where: {
            userId_itemId: {
              userId: user.id,
              itemId: ayahData.id,
            },
          },
        });

        const currentBestScore = existingProgress?.bestScore || 0;
        const newBestScore = Math.max(currentBestScore, ayahScore.score);
        const isPassed = newBestScore >= 70;
        const isFirstPass = !existingProgress?.firstPassedAt && ayahScore.score >= 70;

        // Save submission record (history)
        await prisma.hafalanSubmission.create({
          data: {
            userId: user.id,
            itemId: ayahData.id,
            itemType: "QURAN",
            mode: "WITH_TEXT",
            score: ayahScore.score,
            passed: ayahScore.score >= 70,
            feedbackSummary: ayahScore.feedback || "",
            feedbackCorrections: [],
            feedbackTips: [],
            attemptNumber: (existingProgress?.totalAttempts || 0) + 1,
          },
        });

        // Upsert progress (keep best score)
        await prisma.hafalanProgress.upsert({
          where: {
            userId_itemId: {
              userId: user.id,
              itemId: ayahData.id,
            },
          },
          update: {
            bestScore: newBestScore,
            totalAttempts: { increment: 1 },
            lastAttemptAt: new Date(),
            status: isPassed ? "PASSED" : "IN_PROGRESS",
            canProceed: isPassed,
            firstPassedAt: isFirstPass ? new Date() : existingProgress?.firstPassedAt,
          },
          create: {
            userId: user.id,
            itemId: ayahData.id,
            itemType: "QURAN",
            bestScore: ayahScore.score,
            totalAttempts: 1,
            lastAttemptAt: new Date(),
            status: ayahScore.score >= 70 ? "PASSED" : "IN_PROGRESS",
            canProceed: ayahScore.score >= 70,
            firstPassedAt: ayahScore.score >= 70 ? new Date() : null,
          },
        });
      }
    }

    // Increment daily usage
    await prisma.user.update({
      where: { id: user.id },
      data: { dailyHafalanCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      evaluation,
    });
  } catch (error) {
    console.error("Error evaluating surah:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: `Gagal mengevaluasi: ${errorMessage}` },
      { status: 500 }
    );
  }
}
