import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { geminiModel } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

const contentPrompts: Record<string, string> = {
  article: `Kamu adalah penulis artikel Islami yang ahli. Tulis artikel yang:
- Berlandaskan Al-Quran dan Hadits shahih
- Bahasa Indonesia yang baik dan mudah dipahami
- Panjang 300-500 kata
- Sertakan dalil jika relevan

Format response JSON:
{
  "title": "<judul artikel menarik>",
  "content": "<isi artikel>",
  "hashtags": ["#islam", "#dakwah", ...]
}`,

  social: `Kamu adalah content creator dakwah di media sosial. Buat post yang:
- Singkat dan impactful (max 280 karakter untuk konten utama)
- Menyentuh hati dan memotivasi
- Sesuai adab Islami
- Cocok untuk Instagram/Twitter

Format response JSON:
{
  "content": "<isi post>",
  "hashtags": ["#islam", "#motivasi", ...]
}`,

  khutbah: `Kamu adalah khatib yang berpengalaman. Tulis naskah khutbah yang:
- Struktur: Muqaddimah, Isi (2-3 poin), Penutup
- Sertakan ayat Al-Quran dan Hadits
- Panjang cukup untuk 15-20 menit
- Bahasa formal namun mudah dipahami

Format response JSON:
{
  "title": "<judul khutbah>",
  "content": "<naskah lengkap dengan struktur jelas>"
}`,

  caption: `Kamu adalah copywriter konten dakwah. Buat caption yang:
- Menarik dan engaging
- Mengandung pesan kebaikan
- Cocok untuk Instagram
- Max 150 kata

Format response JSON:
{
  "content": "<caption>",
  "hashtags": ["#dakwah", "#islamic", ...]
}`,
};

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
    const { type, topic } = body;

    if (!type || !topic) {
      return NextResponse.json(
        { success: false, error: "type and topic are required" },
        { status: 400 }
      );
    }

    const systemPrompt = contentPrompts[type];
    if (!systemPrompt) {
      return NextResponse.json(
        { success: false, error: "Invalid content type" },
        { status: 400 }
      );
    }

    const prompt = `${systemPrompt}

TOPIK: ${topic}

Berikan response dalam format JSON saja, tanpa markdown.`;

    console.log("Generating content:", type, topic);

    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    console.log("Gemini response:", responseText);

    // Parse JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    const content = JSON.parse(jsonMatch[0]);

    // Increment daily write count
    await prisma.user.update({
      where: { id: user.id },
      data: { dailyWriteCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: `Gagal generate: ${errorMessage}` },
      { status: 500 }
    );
  }
}
