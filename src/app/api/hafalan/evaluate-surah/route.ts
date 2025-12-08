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

    const prompt = `PERAN: Kamu adalah GURU TAHSIN AL-QURAN yang ADIL dan AKURAT.

Evaluasi bacaan dengan JUJUR - kurangi nilai HANYA jika benar-benar ada kesalahan yang JELAS terdengar.

SURAH: ${surahName} (Surah ke-${surahNumber})

TEKS YANG DIBACA:
${ayahTexts.map((a) => `[Ayat ${a.number}] ${a.text}`).join("\n")}

=== PANDUAN PENILAIAN ===

MULAI DARI 100, kurangi HANYA untuk kesalahan yang BENAR-BENAR terdengar:

LAHN JALI (Kesalahan Fatal) → Maksimal 50:
- Mengganti huruf (misal ض jadi د, ط jadi ت)
- Salah harakat yang mengubah makna
- Menambah/mengurangi huruf atau kata

KESALAHAN MAKHRAJ (-5 poin jika JELAS salah):
- ع dibaca أ (beda jelas: ع dari tenggorokan bawah)
- ح dibaca ه (beda jelas: ح lebih berat)
- خ dibaca ك
- ق dibaca ك (ق dari pangkal lidah, lebih berat)
- Catatan: Jika makhraj sudah benar tapi kurang sempurna, JANGAN kurangi

KESALAHAN TAJWID (-3 poin per kesalahan JELAS):
- Mad thabi'i kurang dari 2 harakat (terlalu pendek)
- Mad wajib muttashil kurang dari 4 harakat
- Idgham tidak dilebur
- Ikhfa tidak samar
- Ghunnah tidak ada sama sekali (seharusnya 2 harakat)

QALQALAH - PAHAMI BEDANYA:
- Qalqalah SUGHRA (di tengah kata) = pantulan RINGAN, tidak perlu kuat
- Qalqalah KUBRA (di akhir kata/waqaf) = pantulan JELAS
- JANGAN kurangi nilai jika qalqalah sughra tidak terlalu kuat - itu BENAR!

KESALAHAN RINGAN (-2 poin):
- Tempo tidak stabil
- Waqaf kurang tepat

=== PENTING ===

- Jika bacaan JELAS dan BENAR, beri nilai TINGGI (90+)
- Jangan paranoid mencari kesalahan yang tidak ada
- Kurangi nilai HANYA untuk kesalahan yang JELAS terdengar
- Qalqalah sughra memang lebih ringan dari kubra - itu BUKAN kesalahan
- Jika ragu apakah itu kesalahan, JANGAN kurangi

=== STANDAR NILAI ===

- 95-100: Sangat baik, makhraj & tajwid tepat
- 85-94: Baik, ada 1-2 kesalahan minor
- 75-84: Cukup baik, beberapa kesalahan
- 65-74: Perlu perbaikan
- 50-64: Banyak kesalahan
- <50: Ada lahn jali

TUGAS UTAMA:
1. Dengarkan audio dengan teliti
2. Identifikasi ayat mana saja yang BENAR-BENAR dibaca
3. HANYA beri nilai untuk ayat yang dibaca - JANGAN nilai ayat yang tidak dibaca!
4. Jika hanya ayat 1 yang dibaca, hanya ayat 1 yang ada di ayahScores

RESPONSE (JSON only):
{
  "totalScore": <rata-rata nilai ayat yang dibaca>,
  "lastAyahRecited": <nomor ayat terakhir yang dibaca>,
  "ayahScores": [
    // HANYA masukkan ayat yang BENAR-BENAR terdengar dibaca!
    // Jika user hanya baca ayat 1, maka hanya ada 1 object di sini
    {
      "ayahNumber": <nomor ayat yang dibaca>,
      "score": <nilai>,
      "status": "<correct|partial|incorrect>",
      "feedback": "<kosongkan jika bagus, atau sebutkan kesalahan>"
    }
  ],
  "summary": "<ringkasan>"
}

PENTING: Jangan masukkan ayat yang TIDAK dibaca ke ayahScores!

STATUS: correct >= 85, partial 65-84, incorrect < 65`;

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
        // Tahsin standard: 85+ = PASSED (correct), 65-84 = partial, <65 = incorrect
        const isPassed = newBestScore >= 85;
        const isFirstPass = !existingProgress?.firstPassedAt && ayahScore.score >= 85;

        // Save submission record (history)
        await prisma.hafalanSubmission.create({
          data: {
            userId: user.id,
            itemId: ayahData.id,
            itemType: "QURAN",
            mode: "WITH_TEXT",
            score: ayahScore.score,
            passed: ayahScore.score >= 85,
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
            status: ayahScore.score >= 85 ? "PASSED" : "IN_PROGRESS",
            canProceed: ayahScore.score >= 85,
            firstPassedAt: ayahScore.score >= 85 ? new Date() : null,
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
