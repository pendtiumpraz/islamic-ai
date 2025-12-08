import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Delete user data (chat history, hafalan history)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json({ error: "Type parameter required" }, { status: 400 });
    }

    switch (type) {
      case "chat":
        // Soft delete all chat sessions
        await prisma.chatSession.updateMany({
          where: { userId: session.user.id },
          data: { 
            deletedAt: new Date(),
            deletedBy: session.user.id,
          }
        });
        return NextResponse.json({ message: "Chat history deleted" });

      case "hafalan":
        // Soft delete all hafalan submissions
        await prisma.hafalanSubmission.updateMany({
          where: { userId: session.user.id },
          data: { deletedAt: new Date() }
        });
        // Reset progress
        await prisma.hafalanProgress.updateMany({
          where: { userId: session.user.id },
          data: { deletedAt: new Date() }
        });
        return NextResponse.json({ message: "Hafalan history deleted" });

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Delete data error:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

// Export user data
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        chatSessions: {
          where: { deletedAt: null },
          include: {
            messages: { where: { deletedAt: null } },
            module: { select: { name: true } }
          }
        },
        hafalanSubmissions: {
          where: { deletedAt: null },
          include: {
            item: { select: { title: true, type: true } }
          }
        },
        hafalanProgress: {
          where: { deletedAt: null },
          include: {
            item: { select: { title: true, type: true } }
          }
        },
        donations: {
          where: { deletedAt: null }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Format for export
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tier: user.tier,
        totalDonation: user.totalDonation,
        preferredLang: user.preferredLang,
        createdAt: user.createdAt,
      },
      chatHistory: user.chatSessions.map(s => ({
        module: s.module.name,
        title: s.title,
        createdAt: s.createdAt,
        messages: s.messages.map(m => ({
          role: m.role,
          content: m.content,
          createdAt: m.createdAt,
        }))
      })),
      hafalanSubmissions: user.hafalanSubmissions.map(s => ({
        item: s.item.title,
        type: s.item.type,
        score: s.score,
        passed: s.passed,
        feedback: s.feedbackSummary,
        createdAt: s.createdAt,
      })),
      hafalanProgress: user.hafalanProgress.map(p => ({
        item: p.item.title,
        type: p.item.type,
        status: p.status,
        bestScore: p.bestScore,
        totalAttempts: p.totalAttempts,
      })),
      donations: user.donations.map(d => ({
        amount: d.amount,
        tier: d.tier,
        status: d.paymentStatus,
        createdAt: d.createdAt,
      })),
    };

    return NextResponse.json(exportData);
  } catch (error) {
    console.error("Export data error:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
