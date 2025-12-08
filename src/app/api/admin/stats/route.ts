import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get counts
    const [
      totalUsers,
      activeUsers,
      totalModules,
      totalDonations,
      totalChats,
      totalHafalan,
      recentUsers,
      tierDistribution,
    ] = await Promise.all([
      // Total users (not deleted)
      prisma.user.count({ where: { deletedAt: null } }),
      
      // Active users (last 7 days)
      prisma.user.count({
        where: {
          deletedAt: null,
          lastActiveDate: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      
      // Total modules
      prisma.aIModule.count({ where: { deletedAt: null } }),
      
      // Total donations (completed)
      prisma.donation.aggregate({
        where: { paymentStatus: "COMPLETED", deletedAt: null },
        _sum: { amount: true },
        _count: true,
      }),
      
      // Total chat sessions
      prisma.chatSession.count({ where: { deletedAt: null } }),
      
      // Total hafalan submissions
      prisma.hafalanSubmission.count({ where: { deletedAt: null } }),
      
      // Recent users (last 5)
      prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          tier: true,
          role: true,
          createdAt: true,
        },
      }),
      
      // Tier distribution
      prisma.user.groupBy({
        by: ["tier"],
        where: { deletedAt: null },
        _count: true,
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers,
        totalModules,
        totalDonations: totalDonations._sum.amount || 0,
        donationCount: totalDonations._count,
        totalChats,
        totalHafalan,
      },
      recentUsers,
      tierDistribution: tierDistribution.map((t) => ({
        tier: t.tier,
        count: t._count,
      })),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
