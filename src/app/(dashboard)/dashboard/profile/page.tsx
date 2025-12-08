"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const user = session?.user;

  const tierInfo = {
    FREE: { label: "Free", color: "bg-gray-500", benefits: ["10 chat/hari", "5 setoran/hari", "Juz 30"] },
    BRONZE: { label: "Bronze", color: "bg-amber-600", benefits: ["30 chat/hari", "15 setoran/hari", "Juz 29-30"] },
    SILVER: { label: "Silver", color: "bg-slate-500", benefits: ["100 chat/hari", "50 setoran/hari", "Juz 26-30"] },
    GOLD: { label: "Gold", color: "bg-yellow-500", benefits: ["Unlimited chat", "Unlimited setoran", "Semua 114 Surah"] },
    PATRON: { label: "Patron", color: "bg-purple-500", benefits: ["Semua fitur Gold", "Akses eksklusif", "Prioritas support"] },
  };

  const currentTier = tierInfo[user?.tier || "FREE"];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-600 mt-1">Kelola informasi akun Anda</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16">
              <div className="relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg bg-emerald-100 flex items-center justify-center">
                    <span className="text-5xl text-emerald-600">{user?.name?.[0] || "U"}</span>
                  </div>
                )}
                <Badge className={`absolute -bottom-2 -right-2 ${currentTier.color} text-white px-3 py-1`}>
                  {currentTier.label}
                </Badge>
              </div>
              <div className="flex-1 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
              <CardDescription>Informasi dasar akun Anda</CardDescription>
            </div>
            <Button 
              variant={isEditing ? "default" : "outline"} 
              size="sm"
              onClick={() => {
                if (isEditing) {
                  // Save logic here
                  setIsEditing(false);
                } else {
                  setName(user?.name || "");
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Simpan" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  {isEditing ? (
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user?.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <p className="text-gray-900 py-2">{user?.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Email tidak dapat diubah (terhubung dengan Google)
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bergabung Sejak
                  </label>
                  <p className="text-gray-900 py-2">
                    {new Date().toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Pengguna
                  </label>
                  <p className="text-gray-500 py-2 font-mono text-sm">
                    {user?.id?.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tier Info */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Status Langganan</CardTitle>
            <CardDescription>Informasi tier dan benefit Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`p-6 rounded-2xl ${
              user?.tier === "GOLD" ? "bg-gradient-to-br from-yellow-50 to-amber-100" :
              user?.tier === "SILVER" ? "bg-gradient-to-br from-slate-50 to-gray-200" :
              user?.tier === "BRONZE" ? "bg-gradient-to-br from-amber-50 to-orange-100" :
              "bg-gradient-to-br from-gray-50 to-gray-100"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge className={`${currentTier.color} text-white text-lg px-4 py-1`}>
                    {currentTier.label}
                  </Badge>
                  {user?.tier !== "FREE" && (
                    <span className="text-sm text-gray-500">Donatur</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Benefit Anda:</p>
                {currentTier.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              {user?.tier === "FREE" && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Upgrade untuk akses lebih banyak fitur dan bantu pembangunan pusat Islam.
                  </p>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Lihat Paket Donasi
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Statistik Belajar</CardTitle>
            <CardDescription>Ringkasan aktivitas Anda di ILMUNA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl text-center">
                <p className="text-3xl font-bold text-emerald-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Total Chat</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-center">
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Total Setoran</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl text-center">
                <p className="text-3xl font-bold text-purple-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Hafalan Lulus</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl text-center">
                <p className="text-3xl font-bold text-amber-600">0</p>
                <p className="text-sm text-gray-600 mt-1">Hari Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-0 shadow-md border-red-100">
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Zona Berbahaya</CardTitle>
            <CardDescription>Aksi yang tidak dapat dibatalkan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div>
                <p className="font-medium text-red-800">Hapus Akun</p>
                <p className="text-sm text-red-600">
                  Semua data akan dihapus permanen setelah 30 hari
                </p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                Hapus Akun
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
