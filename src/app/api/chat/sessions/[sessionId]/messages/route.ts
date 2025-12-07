import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, resetDailyUsageIfNeeded } from "@/lib/auth";
import { generateChatResponseStream, ChatMessage } from "@/lib/gemini";
import { canUseFeature, TIER_LIMITS, Tier } from "@/lib/utils";

// POST /api/chat/sessions/[sessionId]/messages - Send message and get streaming response
export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { sessionId } = params;
    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, error: "Message content is required" },
        { status: 400 }
      );
    }

    // Reset daily usage if needed
    await resetDailyUsageIfNeeded(user.id);

    // Check rate limit
    const userTier = user.tier as Tier;
    if (!canUseFeature(userTier, "dailyChat", user.dailyChatCount)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Batas chat harian tercapai (${TIER_LIMITS[userTier].dailyChat}/hari)` 
        },
        { status: 429 }
      );
    }

    // Get session with module
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        module: true,
        messages: {
          orderBy: { createdAt: "asc" },
          take: 50, // Limit context
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: "USER",
        content: content.trim(),
      },
    });

    // Increment usage
    await prisma.user.update({
      where: { id: user.id },
      data: { dailyChatCount: { increment: 1 } },
    });

    // Prepare chat history for Gemini
    const history: ChatMessage[] = session.messages.map((msg) => ({
      role: msg.role === "USER" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Create streaming response
    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const generator = generateChatResponseStream(
            session.module.systemPrompt,
            history,
            content.trim()
          );

          for await (const chunk of generator) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
          }

          // Save assistant message
          await prisma.chatMessage.create({
            data: {
              sessionId,
              role: "ASSISTANT",
              content: fullResponse,
            },
          });

          // Update session title if first message
          if (session.messages.length === 0) {
            const title = content.trim().slice(0, 50) + (content.length > 50 ? "..." : "");
            await prisma.chatSession.update({
              where: { id: sessionId },
              data: { title },
            });
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: "Generation failed" })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// GET /api/chat/sessions/[sessionId]/messages - Get session messages
export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { sessionId } = params;

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        module: {
          select: {
            name: true,
            slug: true,
            icon: true,
          },
        },
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
