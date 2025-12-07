import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const userTier = session?.user?.tier || "FREE";
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const modules = await prisma.aIModule.findMany({
      where: {
        isActive: true,
        ...(slug && { slug }),
      },
      orderBy: [
        { category: "asc" },
        { name: "asc" },
      ],
      select: {
        id: true,
        slug: true,
        name: true,
        nameAr: true,
        description: true,
        category: true,
        icon: true,
        minTier: true,
      },
    });

    // Mark which modules user can access
    const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
    const userTierIndex = tierOrder.indexOf(userTier);

    const modulesWithAccess = modules.map((module) => ({
      ...module,
      hasAccess: tierOrder.indexOf(module.minTier) <= userTierIndex,
    }));

    return NextResponse.json({
      success: true,
      modules: modulesWithAccess,
    });
  } catch (error) {
    console.error("Error fetching modules:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}
