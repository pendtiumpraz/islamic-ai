"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HafalanItem {
  id: string;
  type: string;
  title: string;
  surahNumber: number | null;
  ayahStart: number | null;
  ayahEnd: number | null;
  juzNumber: number | null;
  haditsNumber: number | null;
  minTier: string;
  arabicText: string;
  progress?: {
    status: string;
    bestScore: number;
    totalAttempts: number;
  };
}

const typeLabels: Record<string, string> = {
  QURAN: "Al-Quran",
  HADITS: "Hadits",
  MATAN: "Matan",
};

const typeColors: Record<string, string> = {
  QURAN: "bg-emerald-100 text-emerald-800",
  HADITS: "bg-blue-100 text-blue-800",
  MATAN: "bg-purple-100 text-purple-800",
};

const statusColors: Record<string, string> = {
  NOT_STARTED: "bg-gray-100 text-gray-600",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  PASSED: "bg-green-100 text-green-800",
  MEMORIZED: "bg-emerald-500 text-white",
};

const statusLabels: Record<string, string> = {
  NOT_STARTED: "Belum Mulai",
  IN_PROGRESS: "Sedang Hafal",
  PASSED: "Lulus",
  MEMORIZED: "Hafal",
};

const tierColors: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-700",
  BRONZE: "bg-amber-100 text-amber-800",
  SILVER: "bg-slate-200 text-slate-700",
  GOLD: "bg-yellow-100 text-yellow-800",
};

export default function HafidzPage() {
  const [items, setItems] = useState<HafalanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/hafalan/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const types = Array.from(new Set(items.map((i) => i.type)));
  const juzList = Array.from(new Set(items.filter(i => i.juzNumber).map((i) => i.juzNumber))).sort((a, b) => (b || 0) - (a || 0));
  
  const filteredItems = items.filter((i) => {
    if (selectedType && i.type !== selectedType) return false;
    if (selectedJuz && i.juzNumber !== selectedJuz) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Setoran Hafalan</h1>
          <p className="text-gray-600">
            Pilih materi untuk memulai setoran hafalan dengan evaluasi AI
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 py-1">Tipe:</span>
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              Semua
            </Button>
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {typeLabels[type] || type}
              </Button>
            ))}
          </div>
          
          {/* Juz Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 py-1">Juz:</span>
            <Button
              variant={selectedJuz === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedJuz(null)}
            >
              Semua
            </Button>
            {juzList.map((juz) => (
              <Button
                key={juz}
                variant={selectedJuz === juz ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedJuz(juz)}
              >
                Juz {juz}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-gray-900">{items.length}</p>
              <p className="text-sm text-gray-500">Total Materi</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-emerald-600">
                {items.filter((i) => i.progress?.status === "PASSED" || i.progress?.status === "MEMORIZED").length}
              </p>
              <p className="text-sm text-gray-500">Lulus</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {items.filter((i) => i.progress?.status === "IN_PROGRESS").length}
              </p>
              <p className="text-sm text-gray-500">Sedang Hafal</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-gray-400">
                {items.filter((i) => !i.progress || i.progress.status === "NOT_STARTED").length}
              </p>
              <p className="text-sm text-gray-500">Belum Mulai</p>
            </CardContent>
          </Card>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Link key={item.id} href={`/dashboard/hafidz/${item.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-1 flex-wrap">
                    <div className="flex gap-1">
                      <Badge className={typeColors[item.type]}>
                        {typeLabels[item.type]}
                      </Badge>
                      {item.juzNumber && (
                        <Badge variant="outline">Juz {item.juzNumber}</Badge>
                      )}
                      <Badge className={tierColors[item.minTier]}>
                        {item.minTier}
                      </Badge>
                    </div>
                    {item.progress && (
                      <Badge className={statusColors[item.progress.status]}>
                        {statusLabels[item.progress.status]}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
                  {item.surahNumber && (
                    <CardDescription>
                      Ayat {item.ayahStart}-{item.ayahEnd}
                    </CardDescription>
                  )}
                  {item.haditsNumber && (
                    <CardDescription>Hadits ke-{item.haditsNumber}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-right font-arabic text-lg text-gray-800 line-clamp-2 leading-loose">
                    {item.arabicText.substring(0, 100)}...
                  </p>
                  {item.progress && item.progress.totalAttempts > 0 && (
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {item.progress.totalAttempts}x percobaan
                      </span>
                      <span className="font-semibold text-emerald-600">
                        Skor: {item.progress.bestScore}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada materi hafalan ditemukan
          </div>
        )}
      </main>
    </div>
  );
}
