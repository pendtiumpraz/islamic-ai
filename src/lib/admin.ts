import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { Role } from "@prisma/client";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return false;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  return user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN;
}

export async function isSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return false;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  return user?.role === Role.SUPER_ADMIN;
}

export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error("Unauthorized: Admin access required");
  }
  return true;
}

export async function requireSuperAdmin() {
  const superAdmin = await isSuperAdmin();
  if (!superAdmin) {
    throw new Error("Unauthorized: Super Admin access required");
  }
  return true;
}

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { 
      id: true, 
      name: true, 
      email: true, 
      image: true,
      role: true 
    },
  });

  if (!user || (user.role !== Role.ADMIN && user.role !== Role.SUPER_ADMIN)) {
    return null;
  }

  return { ...session, user };
}
