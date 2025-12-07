import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/hafalan/items - List hafalan items
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const searchParams = request.nextUrl.searchParams;
    
    const type = searchParams.get("type"); // quran, hadits, matan
    const surah = searchParams.get("surah");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    
    if (type) {
      where.type = type.toUpperCase();
    }
    
    if (surah) {
      where.surahNumber = parseInt(surah);
    }

    const [items, total] = await Promise.all([
      prisma.hafalanItem.findMany({
        where,
        orderBy: [
          { surahNumber: "asc" },
          { ayahStart: "asc" },
          { orderIndex: "asc" },
        ],
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          type: true,
          title: true,
          arabicText: true,
          translation: true,
          transliteration: true,
          audioUrl: true,
          surahNumber: true,
          ayahStart: true,
          ayahEnd: true,
          orderIndex: true,
        },
      }),
      prisma.hafalanItem.count({ where }),
    ]);

    // If user logged in, include their progress
    let itemsWithProgress = items;
    
    if (session?.user?.id) {
      const progress = await prisma.hafalanProgress.findMany({
        where: {
          userId: session.user.id,
          itemId: { in: items.map((i) => i.id) },
        },
      });

      const progressMap = new Map(progress.map((p) => [p.itemId, p]));

      itemsWithProgress = items.map((item) => ({
        ...item,
        progress: progressMap.get(item.id) || null,
      }));
    }

    return NextResponse.json({
      success: true,
      data: itemsWithProgress,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching hafalan items:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
