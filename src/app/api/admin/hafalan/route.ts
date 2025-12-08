import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const passed = searchParams.get("passed");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const includeDeleted = searchParams.get("includeDeleted") === "true";

    const where: Record<string, unknown> = {};
    
    if (type) {
      where.itemType = type;
    }
    
    if (passed !== null && passed !== "") {
      where.passed = passed === "true";
    }
    
    if (!includeDeleted) {
      where.deletedAt = null;
    }

    const [submissions, total] = await Promise.all([
      prisma.hafalanSubmission.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true, tier: true }
          },
          item: {
            select: { id: true, title: true, type: true, surahNumber: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.hafalanSubmission.count({ where })
    ]);

    // Stats
    const stats = await prisma.hafalanSubmission.groupBy({
      by: ["passed"],
      _count: { id: true },
      where: { deletedAt: null }
    });

    const typeStats = await prisma.hafalanSubmission.groupBy({
      by: ["itemType"],
      _count: { id: true },
      where: { deletedAt: null }
    });

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      stats: {
        passed: stats.find(s => s.passed)?._count.id || 0,
        failed: stats.find(s => !s.passed)?._count.id || 0,
        byType: typeStats.reduce((acc, s) => ({ ...acc, [s.itemType]: s._count.id }), {})
      }
    });
  } catch (error) {
    console.error("Admin hafalan error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
