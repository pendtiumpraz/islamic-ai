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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        
        // Get full user data from database
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            tier: true,
            role: true,
            totalDonation: true,
            preferredLang: true,
            dailyChatCount: true,
            dailyHafalanCount: true,
            dailyWriteCount: true,
          },
        });

        if (dbUser) {
          session.user.tier = dbUser.tier;
          session.user.role = dbUser.role;
          session.user.totalDonation = dbUser.totalDonation;
          session.user.preferredLang = dbUser.preferredLang;
          session.user.dailyChatCount = dbUser.dailyChatCount;
          session.user.dailyHafalanCount = dbUser.dailyHafalanCount;
          session.user.dailyWriteCount = dbUser.dailyWriteCount;
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to dashboard
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
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
