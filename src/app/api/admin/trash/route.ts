import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isSuperAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const results: Record<string, unknown[]> = {};

    // Fetch deleted users
    if (!type || type === "users") {
      results.users = await prisma.user.findMany({
        where: { deletedAt: { not: null } },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          tier: true,
          role: true,
          deletedAt: true,
          deletedBy: true,
          deleteReason: true
        },
        orderBy: { deletedAt: "desc" }
      });
    }

    // Fetch deleted modules
    if (!type || type === "modules") {
      results.modules = await prisma.aIModule.findMany({
        where: { deletedAt: { not: null } },
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          deletedAt: true
        },
        orderBy: { deletedAt: "desc" }
      });
    }

    // Fetch deleted donations
    if (!type || type === "donations") {
      results.donations = await prisma.donation.findMany({
        where: { deletedAt: { not: null } },
        select: {
          id: true,
          amount: true,
          donorName: true,
          paymentStatus: true,
          deletedAt: true,
          deletedBy: true,
          deleteReason: true
        },
        orderBy: { deletedAt: "desc" }
      });
    }

    // Fetch deleted chat sessions
    if (!type || type === "chats") {
      results.chats = await prisma.chatSession.findMany({
        where: { deletedAt: { not: null } },
        select: {
          id: true,
          title: true,
          deletedAt: true,
          deletedBy: true,
          user: { select: { name: true, email: true } },
          module: { select: { name: true } }
        },
        orderBy: { deletedAt: "desc" }
      });
    }

    // Fetch deleted hafalan submissions
    if (!type || type === "hafalan") {
      results.hafalan = await prisma.hafalanSubmission.findMany({
        where: { deletedAt: { not: null } },
        select: {
          id: true,
          score: true,
          passed: true,
          deletedAt: true,
          user: { select: { name: true } },
          item: { select: { title: true } }
        },
        orderBy: { deletedAt: "desc" }
      });
    }

    // Count stats
    const stats = {
      users: Array.isArray(results.users) ? results.users.length : 0,
      modules: Array.isArray(results.modules) ? results.modules.length : 0,
      donations: Array.isArray(results.donations) ? results.donations.length : 0,
      chats: Array.isArray(results.chats) ? results.chats.length : 0,
      hafalan: Array.isArray(results.hafalan) ? results.hafalan.length : 0
    };

    return NextResponse.json({ ...results, stats });
  } catch (error) {
    console.error("Admin trash error:", error);
    return NextResponse.json({ error: "Failed to fetch deleted items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const superAdmin = await isSuperAdmin();
    if (!superAdmin) {
      return NextResponse.json({ error: "Only Super Admin can restore items" }, { status: 403 });
    }

    const body = await request.json();
    const { type, id } = body;

    if (!type || !id) {
      return NextResponse.json({ error: "Type and ID required" }, { status: 400 });
    }

    let result;

    switch (type) {
      case "user":
        result = await prisma.user.update({
          where: { id },
          data: { deletedAt: null, deletedBy: null, deleteReason: null }
        });
        break;
      case "module":
        result = await prisma.aIModule.update({
          where: { id },
          data: { deletedAt: null }
        });
        break;
      case "donation":
        result = await prisma.donation.update({
          where: { id },
          data: { deletedAt: null, deletedBy: null, deleteReason: null }
        });
        break;
      case "chat":
        result = await prisma.chatSession.update({
          where: { id },
          data: { deletedAt: null, deletedBy: null }
        });
        break;
      case "hafalan":
        result = await prisma.hafalanSubmission.update({
          where: { id },
          data: { deletedAt: null }
        });
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ result, message: "Item restored successfully" });
  } catch (error) {
    console.error("Restore error:", error);
    return NextResponse.json({ error: "Failed to restore item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const superAdmin = await isSuperAdmin();
    if (!superAdmin) {
      return NextResponse.json({ error: "Only Super Admin can permanently delete" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json({ error: "Type and ID required" }, { status: 400 });
    }

    // PERMANENT DELETE - use with caution
    switch (type) {
      case "module":
        await prisma.aIModule.delete({ where: { id } });
        break;
      case "donation":
        await prisma.donation.delete({ where: { id } });
        break;
      case "chat":
        await prisma.chatSession.delete({ where: { id } });
        break;
      case "hafalan":
        await prisma.hafalanSubmission.delete({ where: { id } });
        break;
      default:
        return NextResponse.json({ error: "Invalid type or cannot permanently delete users" }, { status: 400 });
    }

    return NextResponse.json({ message: "Item permanently deleted" });
  } catch (error) {
    console.error("Permanent delete error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
