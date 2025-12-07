import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        
        // Get full user data
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            tier: true,
            totalDonation: true,
            preferredLang: true,
            dailyChatCount: true,
            dailyHafalanCount: true,
            dailyWriteCount: true,
          },
        });

        if (dbUser) {
          session.user.tier = dbUser.tier;
          session.user.totalDonation = dbUser.totalDonation;
          session.user.preferredLang = dbUser.preferredLang;
          session.user.dailyChatCount = dbUser.dailyChatCount;
          session.user.dailyHafalanCount = dbUser.dailyHafalanCount;
          session.user.dailyWriteCount = dbUser.dailyWriteCount;
        }
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Update googleId if not set
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser && !existingUser.googleId) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { googleId: account.providerAccountId },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

// Reset daily usage at midnight
export async function resetDailyUsageIfNeeded(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastActiveDate: true },
  });

  if (!user) return;

  const lastActive = new Date(user.lastActiveDate);
  const today = new Date();
  
  // Check if it's a new day
  if (
    lastActive.getDate() !== today.getDate() ||
    lastActive.getMonth() !== today.getMonth() ||
    lastActive.getFullYear() !== today.getFullYear()
  ) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        dailyChatCount: 0,
        dailyHafalanCount: 0,
        dailyWriteCount: 0,
        lastActiveDate: today,
      },
    });
  }
}
