"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  {
    title: "AI Chat",
    description: "Konsultasi dengan 36+ modul AI Islam",
    href: "/dashboard/chat",
    icon: "💬",
  },
  {
    title: "Hafidz Mode",
    description: "Setoran hafalan dengan evaluasi AI",
    href: "/dashboard/hafidz",
    icon: "🎙️",
  },
  {
    title: "Write Mode",
    description: "Buat konten Islami dengan AI",
    href: "/dashboard/write",
    icon: "✍️",
    soon: true,
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const user = session?.user;
  const tierBadgeVariant = {
    FREE: "free",
    BRONZE: "bronze",
    SILVER: "silver",
    GOLD: "gold",
    PATRON: "patron",
  } as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">ILMUNA</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant={tierBadgeVariant[user?.tier || "FREE"]}>
              {user?.tier || "FREE"}
            </Badge>
            <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Assalamu&apos;alaikum, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Selamat datang di ILMUNA. Mau belajar apa hari ini?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-lg transition-shadow relative">
              {action.soon && (
                <Badge className="absolute top-4 right-4" variant="secondary">
                  Segera
                </Badge>
              )}
              <CardHeader>
                <div className="text-4xl mb-2">{action.icon}</div>
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {action.soon ? (
                  <Button variant="outline" disabled className="w-full">
                    Segera Hadir
                  </Button>
                ) : (
                  <Link href={action.href}>
                    <Button className="w-full">Mulai</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">
                  {user?.dailyChatCount || 0}
                </p>
                <p className="text-sm text-gray-500">Chat Hari Ini</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">
                  {user?.dailyHafalanCount || 0}
                </p>
                <p className="text-sm text-gray-500">Setoran Hari Ini</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">0</p>
                <p className="text-sm text-gray-500">Hafalan Lulus</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">🔥 0</p>
                <p className="text-sm text-gray-500">Streak Hari</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Info */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-emerald-800">
                  Paket {user?.tier || "FREE"}
                </p>
                <p className="text-sm text-emerald-600">
                  {user?.tier === "FREE"
                    ? "Upgrade untuk akses lebih banyak fitur"
                    : "Terima kasih telah berdonasi!"}
                </p>
              </div>
              {user?.tier === "FREE" && (
                <Link href="/pricing">
                  <Button variant="default">Upgrade</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
