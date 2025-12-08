"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  {
    title: "AI Chat",
    description: "Konsultasi dengan 13+ modul AI Islam",
    href: "/dashboard/chat",
    icon: "💬",
    gradient: "from-emerald-500 to-teal-500",
    stats: "13 Modul",
  },
  {
    title: "Hafidz Mode",
    description: "Setoran hafalan dengan evaluasi AI",
    href: "/dashboard/hafidz",
    icon: "📖",
    gradient: "from-blue-500 to-indigo-500",
    stats: "114 Surah",
  },
  {
    title: "Write Mode",
    description: "Buat konten Islami dengan AI",
    href: "/dashboard/write",
    icon: "✍️",
    gradient: "from-amber-500 to-orange-500",
    stats: "Segera",
    soon: true,
  },
];

const recentActivity = [
  { type: "chat", title: "Chat dengan Tafsir Ibnu Katsir", time: "2 jam lalu" },
  { type: "hafalan", title: "Setor Surah Al-Fatihah", time: "Kemarin" },
  { type: "chat", title: "Tanya Fiqih Sholat", time: "2 hari lalu" },
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
  const firstName = user?.name?.split(" ")[0] || "User";
  
  // Calculate greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Selamat Pagi" : hour < 15 ? "Selamat Siang" : hour < 18 ? "Selamat Sore" : "Selamat Malam";

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-500 mb-1">{greeting} 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Assalamu&apos;alaikum, {firstName}!
            </h1>
            <p className="text-gray-600 mt-1">
              Mau belajar apa hari ini?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Streak</p>
              <p className="text-2xl font-bold text-orange-500">🔥 0 hari</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{user?.dailyChatCount || 0}</p>
              <p className="text-emerald-100 text-sm mt-1">Chat Hari Ini</p>
              <p className="text-xs text-emerald-200 mt-2">
                Limit: {user?.tier === "GOLD" ? "∞" : user?.tier === "SILVER" ? "100" : user?.tier === "BRONZE" ? "30" : "10"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{user?.dailyHafalanCount || 0}</p>
              <p className="text-blue-100 text-sm mt-1">Setoran Hari Ini</p>
              <p className="text-xs text-blue-200 mt-2">
                Limit: {user?.tier === "GOLD" ? "∞" : user?.tier === "SILVER" ? "50" : user?.tier === "BRONZE" ? "15" : "5"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">0</p>
              <p className="text-gray-500 text-sm mt-1">Hafalan Lulus</p>
              <p className="text-xs text-gray-400 mt-2">Total selesai</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-500">0%</p>
              <p className="text-gray-500 text-sm mt-1">Progress Juz 30</p>
              <p className="text-xs text-gray-400 mt-2">0/37 surah</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mulai Belajar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card 
              key={action.title} 
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                action.soon ? "opacity-75" : ""
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${action.gradient}`} />
              {action.soon && (
                <Badge className="absolute top-4 right-4 bg-gray-100 text-gray-600">
                  Segera
                </Badge>
              )}
              <CardHeader className="pb-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <CardTitle className="text-xl">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{action.stats}</span>
                  {action.soon ? (
                    <Button variant="outline" disabled size="sm">
                      Segera Hadir
                    </Button>
                  ) : (
                    <Link href={action.href}>
                      <Button size="sm" className={`bg-gradient-to-r ${action.gradient} hover:opacity-90`}>
                        Mulai →
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "chat" ? "bg-emerald-100" : "bg-blue-100"
                    }`}>
                      <span>{activity.type === "chat" ? "💬" : "📖"}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">📝</p>
                <p>Belum ada aktivitas</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tier Info */}
        <Card className={`border-0 shadow-md ${
          user?.tier === "FREE" 
            ? "bg-gradient-to-br from-gray-50 to-gray-100" 
            : user?.tier === "GOLD"
            ? "bg-gradient-to-br from-yellow-50 to-amber-100"
            : user?.tier === "SILVER"
            ? "bg-gradient-to-br from-slate-50 to-gray-200"
            : "bg-gradient-to-br from-amber-50 to-orange-100"
        }`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Status Langganan</CardTitle>
              <Badge className={`${
                user?.tier === "GOLD" ? "bg-yellow-500" :
                user?.tier === "SILVER" ? "bg-slate-500" :
                user?.tier === "BRONZE" ? "bg-amber-600" :
                "bg-gray-500"
              } text-white`}>
                {user?.tier || "FREE"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200/50">
                <span className="text-gray-600">Chat per hari</span>
                <span className="font-semibold">
                  {user?.tier === "GOLD" ? "Unlimited" : 
                   user?.tier === "SILVER" ? "100" :
                   user?.tier === "BRONZE" ? "30" : "10"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200/50">
                <span className="text-gray-600">Setoran per hari</span>
                <span className="font-semibold">
                  {user?.tier === "GOLD" ? "Unlimited" : 
                   user?.tier === "SILVER" ? "50" :
                   user?.tier === "BRONZE" ? "15" : "5"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200/50">
                <span className="text-gray-600">Akses Surah</span>
                <span className="font-semibold">
                  {user?.tier === "GOLD" ? "Semua (114)" : 
                   user?.tier === "SILVER" ? "Juz 26-30" :
                   user?.tier === "BRONZE" ? "Juz 29-30" : "Juz 30"}
                </span>
              </div>
              {user?.tier === "FREE" && (
                <Link href="/pricing" className="block mt-4">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Upgrade untuk Akses Lebih
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Hadith */}
      <Card className="mt-8 border-0 shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardContent className="py-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-emerald-200 text-sm mb-3">Hadits Hari Ini</p>
            <p className="text-xl md:text-2xl font-arabic leading-loose mb-4" dir="rtl">
              مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ
            </p>
            <p className="text-emerald-100">
              &quot;Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah mudahkan baginya jalan menuju surga.&quot;
            </p>
            <p className="text-emerald-200 text-sm mt-3">HR. Muslim</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
