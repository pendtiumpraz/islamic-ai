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
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const includeDeleted = searchParams.get("includeDeleted") === "true";

    const where: Record<string, unknown> = {};
    
    if (status) {
      where.paymentStatus = status;
    }
    
    if (!includeDeleted) {
      where.deletedAt = null;
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.donation.count({ where })
    ]);

    // Stats
    const stats = await prisma.donation.aggregate({
      where: { deletedAt: null, paymentStatus: "COMPLETED" },
      _sum: { amount: true },
      _count: { id: true }
    });

    const pendingCount = await prisma.donation.count({
      where: { deletedAt: null, paymentStatus: "PENDING" }
    });

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      stats: {
        totalAmount: stats._sum.amount || 0,
        completedCount: stats._count.id,
        pendingCount
      }
    });
  } catch (error) {
    console.error("Admin donations error:", error);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, amount, tier, donorName, donorEmail, isAnonymous, message, paymentMethod } = body;

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const donation = await prisma.donation.create({
      data: {
        userId,
        amount,
        tier,
        donorName,
        donorEmail,
        isAnonymous: isAnonymous || false,
        message,
        paymentMethod,
        paymentStatus: "PENDING"
      }
    });

    return NextResponse.json({ donation });
  } catch (error) {
    console.error("Create donation error:", error);
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 });
  }
}
