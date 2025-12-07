import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, resetDailyUsageIfNeeded } from "@/lib/auth";
import { canUseFeature, TIER_LIMITS, Tier } from "@/lib/utils";

// GET /api/chat/sessions - List user's chat sessions
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: user.id,
      },
      include: {
        module: {
          select: {
            name: true,
            slug: true,
            icon: true,
          },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

// POST /api/chat/sessions - Create new chat session
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
    if (!canUseFeature(userTier, "dailyChat", user.dailyChatCount)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Batas chat harian tercapai (${TIER_LIMITS[userTier].dailyChat}/hari). Upgrade untuk akses lebih banyak.` 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { moduleSlug } = body;

    if (!moduleSlug) {
      return NextResponse.json(
        { success: false, error: "Module slug is required" },
        { status: 400 }
      );
    }

    // Find module
    const aiModule = await prisma.aIModule.findUnique({
      where: { slug: moduleSlug },
    });

    if (!aiModule) {
      return NextResponse.json(
        { success: false, error: "Module not found" },
        { status: 404 }
      );
    }

    // Check tier access
    const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
    if (tierOrder.indexOf(aiModule.minTier) > tierOrder.indexOf(userTier)) {
      return NextResponse.json(
        { success: false, error: "Upgrade required to access this module" },
        { status: 403 }
      );
    }

    // Create session
    const session = await prisma.chatSession.create({
      data: {
        userId: user.id,
        moduleId: aiModule.id,
      },
      include: {
        module: {
          select: {
            name: true,
            slug: true,
            icon: true,
            systemPrompt: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create session" },
      { status: 500 }
    );
  }
}
