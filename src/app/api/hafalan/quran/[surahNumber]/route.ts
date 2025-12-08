import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/hafalan/quran/[surahNumber] - Get all ayahs of a surah
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surahNumber: string }> }
) {
  try {
    const { surahNumber } = await params;
    const surahNum = parseInt(surahNumber);
    
    if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
      return NextResponse.json(
        { success: false, error: "Invalid surah number" },
        { status: 400 }
      );
    }

    const session = await getSession();
    const userTier = session?.user?.tier || "FREE";
    const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
    const userTierIndex = tierOrder.indexOf(userTier);
    const accessibleTiers = tierOrder.slice(0, userTierIndex + 1);

    // Get all ayahs for this surah
    const ayahs = await prisma.hafalanItem.findMany({
      where: {
        type: "QURAN",
        surahNumber: surahNum,
      },
      orderBy: { ayahStart: "asc" },
      select: {
        id: true,
        title: true,
        arabicText: true,
        translation: true,
        ayahStart: true,
        ayahEnd: true,
        minTier: true,
      },
    });

    if (ayahs.length === 0) {
      return NextResponse.json(
        { success: false, error: "Surah not found" },
        { status: 404 }
      );
    }

    // Get surah name from first ayah
    const surahName = ayahs[0].title?.split(" : ")[0] || `Surah ${surahNum}`;

    // Check access
    const surahMinTier = ayahs[0].minTier;
    const hasAccess = accessibleTiers.includes(surahMinTier);

    if (!hasAccess) {
      return NextResponse.json({
        success: false,
        error: `Upgrade ke ${surahMinTier} untuk mengakses surah ini`,
        requiredTier: surahMinTier,
      }, { status: 403 });
    }

    // Get user progress for each ayah
    let ayahsWithProgress = ayahs.map((a) => ({
      id: a.id,
      ayahNumber: a.ayahStart || 1,
      arabicText: a.arabicText,
      translation: a.translation,
      progress: null as { status: string; bestScore: number } | null,
    }));

    if (session?.user?.id) {
      const progress = await prisma.hafalanProgress.findMany({
        where: {
          userId: session.user.id,
          itemId: { in: ayahs.map((a) => a.id) },
        },
        select: {
          itemId: true,
          status: true,
          bestScore: true,
        },
      });

      const progressMap = new Map(progress.map((p) => [p.itemId, p]));

      ayahsWithProgress = ayahsWithProgress.map((ayah) => {
        const prog = progressMap.get(ayah.id);
        return {
          ...ayah,
          progress: prog ? { status: prog.status, bestScore: prog.bestScore } : null,
        };
      });
    }

    return NextResponse.json({
      success: true,
      surahNumber: surahNum,
      surahName,
      ayahs: ayahsWithProgress,
      userTier,
    });
  } catch (error) {
    console.error("Error fetching surah:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch surah" },
      { status: 500 }
    );
  }
}
