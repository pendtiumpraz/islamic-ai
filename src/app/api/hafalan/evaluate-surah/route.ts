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

    const prompt = `PERAN: Kamu adalah PENGUJI TAHSIN yang SANGAT KERAS dan TIDAK TOLERAN terhadap kesalahan.

PENTING: JANGAN PERNAH MEMBERI NILAI TINGGI! Bersikaplah seperti guru tahsin yang sangat strict.

SURAH: ${surahName} (Surah ke-${surahNumber})

TEKS YANG SEHARUSNYA DIBACA:
${ayahTexts.map((a) => `[Ayat ${a.number}] ${a.text}`).join("\n")}

=== CARA MENILAI ===

MULAI DARI NILAI 100, lalu KURANGI untuk setiap kesalahan yang kamu dengar:

KESALAHAN FATAL (Lahn Jali) → LANGSUNG NILAI MAKSIMAL 50:
- Mengganti huruf dengan huruf lain (misal: ض jadi د)
- Salah harakat yang mengubah makna
- Menambah/mengurangi huruf
- Salah kata

KESALAHAN BERAT (-10 poin per kejadian):
- Makhraj huruf halqi salah (ع ح خ غ ء ه)
- ع dibaca أ
- ح dibaca ه  
- خ dibaca ك
- غ dibaca غ yang tidak jelas
- ق dibaca ك (tidak ada qalqalah)

KESALAHAN SEDANG (-5 poin per kejadian):
- Mad dipendekkan (tidak 2 harakat untuk mad thabi'i)
- Mad dipanjangkan berlebihan
- Tajwid nun/tanwin salah (idzhar, idgham, ikhfa, iqlab)
- Tajwid mim mati salah
- Huruf tebal (ص ض ط ظ) tidak tafkhim
- Huruf tipis dibaca tebal

KESALAHAN RINGAN (-3 poin per kejadian):
- Ghunnah kurang jelas (tidak 2 harakat)
- Qalqalah tidak memantul
- Waqaf di tempat yang kurang tepat
- Tempo terlalu cepat/lambat

=== DETEKSI KESALAHAN SPESIFIK ===

Bandingkan audio dengan teks. Perhatikan:
1. Apakah SETIAP huruf diucapkan dari makhraj yang benar?
2. Apakah panjang mad sudah sesuai?
3. Apakah hukum tajwid diterapkan dengan benar?
4. Apakah ada huruf yang tertukar atau salah?

=== STANDAR NILAI ===

- 95-100: MUSTAHIL kecuali qari profesional, hampir tidak ada kesalahan sama sekali
- 85-94: Sangat jarang, hanya 1-2 kesalahan ringan
- 75-84: Baik, ada beberapa kesalahan minor
- 65-74: Cukup, ada kesalahan tajwid/makhraj
- 50-64: Kurang, banyak kesalahan
- 30-49: Buruk, sangat banyak kesalahan
- <30: Perlu belajar dari dasar

INGAT: 
- Nilai 90+ SANGAT JARANG! Jangan mudah memberi nilai tinggi!
- Jika ragu, KURANGI nilainya!
- Lebih baik strict daripada terlalu lunak!
- Setiap kesalahan HARUS dikurangi nilainya!

RESPONSE FORMAT (JSON only, tanpa markdown):
{
  "totalScore": <nilai setelah dikurangi>,
  "lastAyahRecited": <ayat terakhir yang dibaca>,
  "ayahScores": [
    {
      "ayahNumber": <nomor ayat>,
      "score": <nilai ayat ini>,
      "status": "<correct|partial|incorrect>",
      "feedback": "<WAJIB sebutkan kesalahan spesifik: huruf apa, di kata mana, seharusnya bagaimana>"
    }
  ],
  "summary": "<daftar semua kesalahan yang ditemukan>"
}

STATUS:
- "correct" = score >= 85 (hampir sempurna)
- "partial" = score 65-84 (ada kesalahan)
- "incorrect" = score < 65 (banyak kesalahan)`;

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
