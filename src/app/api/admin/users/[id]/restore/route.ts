import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Restore user
    await prisma.user.update({
      where: { id: params.id },
      data: {
        deletedAt: null,
        deletedBy: null,
        deleteReason: null,
      },
    });

    return NextResponse.json({ message: "User restored successfully" });
  } catch (error) {
    console.error("Admin restore user error:", error);
    return NextResponse.json(
      { error: "Failed to restore user" },
      { status: 500 }
    );
  }
}
