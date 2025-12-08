import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// User settings stored in JSON field (we need to add this to schema)
// For now, we'll use preferredLang as the main setting

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        preferredLang: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return default settings structure
    return NextResponse.json({
      settings: {
        language: user.preferredLang || "ID",
        theme: "light",
        fontSize: "medium",
        notifications: {
          dailyReminder: true,
          weeklyProgress: true,
          newFeatures: false,
          promotions: false,
        },
        ai: {
          responseStyle: "balanced",
          preferredMadzhab: "syafii",
        }
      }
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { language } = body;

    const updateData: Record<string, unknown> = {};
    
    if (language && ["AR", "EN", "ID"].includes(language.toUpperCase())) {
      updateData.preferredLang = language.toUpperCase();
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: updateData,
      });
    }

    return NextResponse.json({ 
      message: "Settings updated",
      settings: {
        language: updateData.preferredLang || "ID",
      }
    });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
