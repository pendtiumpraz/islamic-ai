import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isSuperAdmin, getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const donation = await prisma.donation.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true, tier: true }
        }
      }
    });

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    return NextResponse.json({ donation });
  } catch (error) {
    console.error("Get donation error:", error);
    return NextResponse.json({ error: "Failed to fetch donation" }, { status: 500 });
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
    const { paymentStatus, transactionId } = body;

    const donation = await prisma.donation.findUnique({
      where: { id: params.id },
      include: { user: true }
    });

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
      if (paymentStatus === "COMPLETED") {
        updateData.paidAt = new Date();

        // Update user tier if donation is completed and has tier
        if (donation.userId && donation.tier) {
          await prisma.user.update({
            where: { id: donation.userId },
            data: {
              tier: donation.tier,
              totalDonation: { increment: donation.amount }
            }
          });
        }
      }
    }

    if (transactionId !== undefined) {
      updateData.transactionId = transactionId;
    }

    const updated = await prisma.donation.update({
      where: { id: params.id },
      data: updateData
    });

    return NextResponse.json({ donation: updated });
  } catch (error) {
    console.error("Update donation error:", error);
    return NextResponse.json({ error: "Failed to update donation" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminSession = await getAdminSession();
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const superAdmin = await isSuperAdmin();
    if (!superAdmin) {
      return NextResponse.json({ error: "Only Super Admin can delete donations" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const reason = searchParams.get("reason") || "Admin deleted";

    // Soft delete
    const donation = await prisma.donation.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: adminSession.user?.id,
        deleteReason: reason
      }
    });

    return NextResponse.json({ donation, message: "Donation soft deleted" });
  } catch (error) {
    console.error("Delete donation error:", error);
    return NextResponse.json({ error: "Failed to delete donation" }, { status: 500 });
  }
}
