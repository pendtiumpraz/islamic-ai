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

    const prompt = `Kamu adalah GURU TAHSIN AL-QURAN yang SANGAT KETAT. Ini bukan hanya hafalan, tapi juga TAHSIN - evaluasi kualitas bacaan SETIAP HURUF.

SURAH: ${surahName} (Surah ke-${surahNumber})

TEKS YANG HARUS DIBACA:
${ayahTexts.map((a) => `[Ayat ${a.number}] ${a.text}`).join("\n")}

=== EVALUASI TAHSIN PER HURUF ===

Dengarkan SETIAP HURUF dan evaluasi:

1. MAKHARIJUL HURUF (30 poin)
   Periksa SETIAP huruf apakah keluar dari makhraj yang benar:
   - Al-Jauf (rongga mulut): ا و ي (huruf mad)
   - Al-Halq (tenggorokan): ء ه ع ح غ خ
   - Al-Lisan (lidah): ق ك ج ش ي ض ل ن ر ط د ت ظ ذ ث ز س ص
   - Asy-Syafatain (dua bibir): ب م و ف
   - Al-Khaisyum (pangkal hidung): untuk ghunnah
   
   KESALAHAN UMUM yang harus dideteksi:
   - ع dibaca seperti أ
   - ح dibaca seperti ه
   - ق dibaca seperti ك
   - ض dibaca seperti د atau ظ
   - ط dibaca seperti ت
   - ص dibaca seperti س
   - ذ dibaca seperti ز
   - ث dibaca seperti س
   
   → KURANGI 5 poin per huruf yang salah makhrajnya

2. SIFATUL HURUF (20 poin)
   - Hams/Jahr (bisikan/keras)
   - Syiddah/Rakhawah/Tawassuth (kuat/lunak/sedang)
   - Isti'la/Istifal (terangkat/turun lidah)
   - Ithbaq/Infitah (tertutup/terbuka)
   - Shafir, Qalqalah, Lin, Inhiraf, Takrir, Tafasysyi, Istithalah
   → KURANGI 3 poin per sifat yang tidak tepat

3. HUKUM NUN MATI & TANWIN (15 poin)
   - Idzhar Halqi (نْ/tanwin + ء ه ع ح غ خ) = jelas tanpa ghunnah
   - Idgham Bighunnah (نْ/tanwin + ي ن م و) = lebur dengan dengung
   - Idgham Bilaghunnah (نْ/tanwin + ل ر) = lebur tanpa dengung
   - Iqlab (نْ/tanwin + ب) = ganti menjadi م
   - Ikhfa Haqiqi (نْ/tanwin + 15 huruf lainnya) = samar dengan ghunnah
   → KURANGI 5 poin per hukum yang salah

4. HUKUM MIM MATI (10 poin)
   - Idgham Mimi (مْ + م) = lebur dengan ghunnah
   - Ikhfa Syafawi (مْ + ب) = samar dengan ghunnah
   - Idzhar Syafawi (مْ + huruf lain) = jelas
   → KURANGI 3 poin per kesalahan

5. MAD - PANJANG PENDEK (15 poin)
   SANGAT PENTING! Perhatikan durasi:
   - Mad Thabi'i = 2 harakat (1 alif)
   - Mad Wajib Muttashil = 4-5 harakat
   - Mad Jaiz Munfashil = 2/4/5 harakat
   - Mad Lazim = 6 harakat
   - Mad 'Aridh Lissukun = 2/4/6 harakat
   - Mad Badal = 2 harakat
   - Mad Iwadh = 2 harakat
   
   KESALAHAN: mad dipendekkan atau dipanjangkan tidak sesuai
   → KURANGI 5 poin per mad yang salah panjangnya

6. GHUNNAH (5 poin)
   Dengung pada ن dan م (2 harakat)
   → KURANGI 2 poin jika tidak ada/kurang ghunnah

7. QALQALAH (5 poin)
   Huruf ق ط ب ج د harus memantul saat sukun/waqaf
   → KURANGI 2 poin per qalqalah yang tidak jelas

STANDAR NILAI KETAT:
- 95-100: MUMTAZ - Hampir sempurna, makhraj & tajwid sangat baik
- 85-94: JAYYID JIDDAN - Sangat baik, kesalahan minor 1-2x
- 75-84: JAYYID - Baik, ada beberapa kesalahan
- 65-74: MAQBUL - Cukup, perlu perbaikan beberapa aspek
- 50-64: DHAIF - Lemah, banyak kesalahan makhraj/tajwid
- <50: RASIB - Perlu belajar ulang dari dasar

PERINGATAN KERAS:
❌ Jika ada LAHN JALI (kesalahan fatal yang mengubah makna) = maksimal 50
❌ Jika makhraj huruf halqi (ع ح خ غ) salah = kurangi 10 poin
❌ Jika mad thabi'i dipendekkan = kurangi 5 poin per kejadian
❌ Jika ghunnah tidak ada = kurangi 3 poin per kejadian

RESPONSE (JSON only):
{
  "totalScore": <0-100>,
  "lastAyahRecited": <ayat terakhir>,
  "ayahScores": [
    {
      "ayahNumber": <nomor>,
      "score": <0-100>,
      "status": "<correct|partial|incorrect>",
      "feedback": "<SPESIFIK: huruf X di kata Y salah makhrajnya, seharusnya Z>"
    }
  ],
  "summary": "<kesalahan utama yang harus diperbaiki>"
}

RULES:
- correct = skor >= 85
- partial = skor 65-84  
- incorrect = skor < 65
- Feedback harus SPESIFIK menyebut huruf dan kata yang salah`;

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
