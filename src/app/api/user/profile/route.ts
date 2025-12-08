import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        tier: true,
        totalDonation: true,
        preferredLang: true,
        createdAt: true,
        _count: {
          select: {
            chatSessions: true,
            hafalanSubmissions: true,
            donations: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get hafalan stats
    const hafalanPassed = await prisma.hafalanSubmission.count({
      where: { userId: session.user.id, passed: true }
    });

    return NextResponse.json({
      user,
      stats: {
        totalChats: user._count.chatSessions,
        totalSubmissions: user._count.hafalanSubmissions,
        hafalanPassed,
        totalDonations: user._count.donations,
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, preferredLang } = body;

    const updateData: Record<string, unknown> = {};
    
    if (name && typeof name === "string" && name.trim().length > 0) {
      updateData.name = name.trim();
    }
    
    if (preferredLang && ["AR", "EN", "ID"].includes(preferredLang)) {
      updateData.preferredLang = preferredLang;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        tier: true,
        preferredLang: true,
      }
    });

    return NextResponse.json({ user, message: "Profile updated" });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Soft delete - mark for deletion after 30 days
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deletedAt: new Date(),
        deleteReason: "User requested account deletion"
      }
    });

    return NextResponse.json({ message: "Account marked for deletion. Will be permanently deleted after 30 days." });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
