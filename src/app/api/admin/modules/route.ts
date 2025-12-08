import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const includeDeleted = searchParams.get("includeDeleted") === "true";

    const where: Record<string, unknown> = {};
    
    if (category) {
      where.category = category;
    }
    
    if (!includeDeleted) {
      where.deletedAt = null;
    }

    const modules = await prisma.aIModule.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { chatSessions: true }
        }
      }
    });

    const stats = await prisma.aIModule.groupBy({
      by: ["category"],
      _count: { id: true },
      where: { deletedAt: null }
    });

    return NextResponse.json({
      modules,
      stats: stats.reduce((acc, s) => ({ ...acc, [s.category]: s._count.id }), {}),
      total: modules.length
    });
  } catch (error) {
    console.error("Admin modules error:", error);
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, name, nameAr, description, category, icon, minTier, systemPrompt, temperature } = body;

    if (!slug || !name || !description || !category || !systemPrompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.aIModule.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const aiModule = await prisma.aIModule.create({
      data: {
        slug,
        name,
        nameAr,
        description,
        category,
        icon,
        minTier: minTier || "FREE",
        systemPrompt,
        temperature: temperature || 0.7,
        isActive: true
      }
    });

    return NextResponse.json({ module: aiModule });
  } catch (error) {
    console.error("Create module error:", error);
    return NextResponse.json({ error: "Failed to create module" }, { status: 500 });
  }
}
