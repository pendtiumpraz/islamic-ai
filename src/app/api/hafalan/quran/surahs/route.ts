import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/hafalan/quran/surahs - List all surahs with access info
export async function GET() {
  try {
    const session = await getSession();
    const userTier = session?.user?.tier || "FREE";
    const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
    const userTierIndex = tierOrder.indexOf(userTier);

    // Get distinct surahs with their info
    const surahData = await prisma.hafalanItem.groupBy({
      by: ["surahNumber", "juzNumber", "minTier"],
      where: {
        type: "QURAN",
        surahNumber: { not: null },
      },
      _count: { id: true },
    });

    // Get surah names from first ayah of each surah
    const surahNames = await prisma.hafalanItem.findMany({
      where: {
        type: "QURAN",
        ayahStart: 1,
      },
      select: {
        surahNumber: true,
        title: true,
      },
    });

    const nameMap = new Map(
      surahNames.map((s) => [s.surahNumber, s.title?.split(" : ")[0] || `Surah ${s.surahNumber}`])
    );

    // Build surah list
    const surahMap = new Map<number, { juzNumber: number; minTier: string; ayahCount: number }>();
    
    for (const data of surahData) {
      if (!data.surahNumber) continue;
      
      const existing = surahMap.get(data.surahNumber);
      if (!existing) {
        surahMap.set(data.surahNumber, {
          juzNumber: data.juzNumber || 30,
          minTier: data.minTier,
          ayahCount: data._count.id,
        });
      } else {
        existing.ayahCount += data._count.id;
        // Use lowest tier requirement
        const existingTierIndex = tierOrder.indexOf(existing.minTier);
        const newTierIndex = tierOrder.indexOf(data.minTier);
        if (newTierIndex < existingTierIndex) {
          existing.minTier = data.minTier;
        }
      }
    }

    const surahs = Array.from(surahMap.entries())
      .map(([number, data]) => ({
        number,
        name: nameMap.get(number) || `Surah ${number}`,
        ayahCount: data.ayahCount,
        juzNumber: data.juzNumber,
        minTier: data.minTier,
        accessible: tierOrder.indexOf(data.minTier) <= userTierIndex,
      }))
      .sort((a, b) => a.number - b.number);

    return NextResponse.json({
      success: true,
      surahs,
      userTier,
    });
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch surahs" },
      { status: 500 }
    );
  }
}
