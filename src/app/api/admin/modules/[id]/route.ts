import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isSuperAdmin } from "@/lib/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const aiModule = await prisma.aIModule.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { chatSessions: true }
        }
      }
    });

    if (!aiModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    return NextResponse.json({ module: aiModule });
  } catch (error) {
    console.error("Get module error:", error);
    return NextResponse.json({ error: "Failed to fetch module" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, nameAr, description, icon, minTier, systemPrompt, temperature, isActive } = body;

    const aiModule = await prisma.aIModule.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(nameAr !== undefined && { nameAr }),
        ...(description && { description }),
        ...(icon !== undefined && { icon }),
        ...(minTier && { minTier }),
        ...(systemPrompt && { systemPrompt }),
        ...(temperature !== undefined && { temperature }),
        ...(isActive !== undefined && { isActive })
      }
    });

    return NextResponse.json({ module: aiModule });
  } catch (error) {
    console.error("Update module error:", error);
    return NextResponse.json({ error: "Failed to update module" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const superAdmin = await isSuperAdmin();
    if (!superAdmin) {
      return NextResponse.json({ error: "Only Super Admin can delete modules" }, { status: 403 });
    }

    // Soft delete
    const aiModule = await prisma.aIModule.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({ module: aiModule, message: "Module soft deleted" });
  } catch (error) {
    console.error("Delete module error:", error);
    return NextResponse.json({ error: "Failed to delete module" }, { status: 500 });
  }
}
