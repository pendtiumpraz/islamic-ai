import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

// Model untuk audio - Gemini 2.0 Flash Experimental (free tier available)
export const geminiAudioModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function generateChatResponse(
  systemPrompt: string,
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const chat = geminiModel.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: `System: ${systemPrompt}` }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will follow these instructions." }],
      },
      ...history,
    ],
  });

  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  return response.text();
}

export async function* generateChatResponseStream(
  systemPrompt: string,
  history: ChatMessage[],
  userMessage: string
): AsyncGenerator<string> {
  const chat = geminiModel.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: `System: ${systemPrompt}` }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will follow these instructions." }],
      },
      ...history,
    ],
  });

  const result = await chat.sendMessageStream(userMessage);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      yield text;
    }
  }
}

export async function evaluateHafalan(
  arabicText: string,
  audioBase64: string,
  type: "quran" | "hadits" | "matan",
  mimeType: string = "audio/webm"
): Promise<{
  score: number;
  passed: boolean;
  feedback: {
    summary: string;
    corrections: string[];
    tips: string[];
    encouragement: string;
  };
  scoreBreakdown?: {
    accuracy: number;
    tajwid?: number;
    fluency: number;
  };
}> {
  const prompt = `Kamu adalah evaluator hafalan ${type === "quran" ? "Al-Quran" : type === "hadits" ? "Hadits" : "Matan"}.

Teks yang seharusnya dibaca:
${arabicText}

Tugas:
1. Dengarkan audio yang dikirim
2. Bandingkan dengan teks yang seharusnya
3. Beri skor 0-100
4. Berikan feedback dalam format JSON berikut:

{
  "score": <number 0-100>,
  "passed": <true jika score >= 70>,
  "scoreBreakdown": {
    "accuracy": <number 0-100>,
    ${type === "quran" ? '"tajwid": <number 0-100>,' : ""}
    "fluency": <number 0-100>
  },
  "feedback": {
    "summary": "<ringkasan singkat dalam bahasa Indonesia>",
    "corrections": ["<koreksi 1>", "<koreksi 2>"],
    "tips": ["<tip 1>", "<tip 2>"],
    "encouragement": "<kalimat motivasi Islami>"
  }
}

Berikan response dalam format JSON saja, tanpa markdown.`;

  try {
    console.log("Evaluating hafalan with Gemini...");
    console.log("Audio mimeType:", mimeType);
    console.log("Audio base64 length:", audioBase64.length);
    console.log("Type:", type);
    
    const result = await geminiAudioModel.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: mimeType,
          data: audioBase64,
        },
      },
    ]);

    const text = result.response.text();
    console.log("Gemini response:", text);
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Hafalan evaluation error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Return error with more details
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      score: 0,
      passed: false,
      feedback: {
        summary: `Maaf, terjadi kesalahan saat mengevaluasi hafalan. (${errorMessage})`,
        corrections: [],
        tips: ["Silakan coba lagi", "Pastikan audio terrekam dengan jelas"],
        encouragement: "Tetap semangat menghafal!",
      },
    };
  }
}

export { genAI, GenerativeModel };
