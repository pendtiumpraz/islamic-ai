"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TabType = "quran" | "hadits" | "matan";

export default function HafidzPage() {
  const [activeTab, setActiveTab] = useState<TabType>("quran");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              ← Dashboard
            </Link>
            <span className="text-2xl font-bold text-emerald-600">🎙️ Hafidz Mode</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab("quran")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "quran"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📖 Al-Quran
          </button>
          <button
            onClick={() => setActiveTab("hadits")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "hadits"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📜 Hadits Arbain
          </button>
          <button
            onClick={() => setActiveTab("matan")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "matan"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📚 Matan
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "quran" && <QuranTab />}
        {activeTab === "hadits" && <HaditsTab />}
        {activeTab === "matan" && <MatanTab />}
      </main>
    </div>
  );
}

function QuranTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hafalan Al-Quran</h2>
        <p className="text-gray-600">Pilih surah untuk memulai setoran hafalan per ayat</p>
      </div>

      {/* Juz Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[30, 29, 28, 27, 26].map((juz) => (
          <Link key={juz} href={`/dashboard/hafidz/quran?juz=${juz}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-emerald-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Juz {juz}</span>
                  <span className="text-sm font-normal text-gray-500">
                    {juz === 30 ? "FREE" : juz === 29 ? "BRONZE" : "SILVER+"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {juz === 30 && "Surah An-Naba' - An-Nas"}
                  {juz === 29 && "Surah Al-Mulk - Al-Mursalat"}
                  {juz === 28 && "Surah Al-Mujadilah - At-Tahrim"}
                  {juz === 27 && "Surah Az-Zariyat - Al-Hadid"}
                  {juz === 26 && "Surah Al-Ahqaf - Az-Zariyat"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        
        <Link href="/dashboard/hafidz/quran">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed hover:border-emerald-300">
            <CardHeader>
              <CardTitle>Semua Juz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">Lihat semua 114 surah</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

function HaditsTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hadits Arbain Nawawi</h2>
        <p className="text-gray-600">42 Hadits pilihan Imam Nawawi untuk dihafal</p>
      </div>

      <Link href="/dashboard/hafidz/hadits">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-blue-300 max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-3xl">📜</span>
              <div>
                <p>Hadits Arbain</p>
                <p className="text-sm font-normal text-gray-500">42 Hadits</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Kumpulan 42 hadits pilihan yang mencakup pokok-pokok ajaran Islam
            </p>
            <Button className="mt-4 w-full" variant="outline">
              Mulai Hafalan
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

function MatanTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Matan Ilmiah</h2>
        <p className="text-gray-600">Kitab-kitab matan untuk dihafal</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/dashboard/hafidz/matan/ushul-tsalatsah">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📕</span>
                </div>
                <div>
                  <CardTitle>Ushul Tsalatsah</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Syaikh Muhammad bin Abdul Wahhab</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Tiga landasan utama yang wajib diketahui setiap Muslim
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/hafidz/matan/qawaidul-arba">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📗</span>
                </div>
                <div>
                  <CardTitle>Qawaidul Arba</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Syaikh Muhammad bin Abdul Wahhab</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Empat kaidah penting dalam memahami tauhid
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
