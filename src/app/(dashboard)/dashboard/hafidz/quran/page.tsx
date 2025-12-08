"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Surah {
  number: number;
  name: string;
  ayahCount: number;
  juzNumber: number;
  minTier: string;
  accessible: boolean;
}

const tierColors: Record<string, string> = {
  FREE: "bg-emerald-100 text-emerald-700",
  BRONZE: "bg-amber-100 text-amber-700",
  SILVER: "bg-slate-200 text-slate-700",
  GOLD: "bg-yellow-100 text-yellow-700",
};

export default function QuranListPage() {
  const searchParams = useSearchParams();
  const juzParam = searchParams.get("juz");
  
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJuz, setSelectedJuz] = useState<number | null>(juzParam ? parseInt(juzParam) : null);

  useEffect(() => {
    fetch("/api/hafalan/quran/surahs")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.surahs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const juzList = Array.from(new Set(surahs.map((s) => s.juzNumber))).sort((a, b) => b - a);
  const filteredSurahs = selectedJuz ? surahs.filter((s) => s.juzNumber === selectedJuz) : surahs;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard/hafidz" className="text-gray-500 hover:text-gray-700">
            ← Hafidz
          </Link>
          <h1 className="font-semibold text-gray-900">Pilih Surah</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Juz Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Surah List */}
        <div className="space-y-2">
          {filteredSurahs.map((surah) => (
            <Link 
              key={surah.number} 
              href={surah.accessible ? `/dashboard/hafidz/quran/${surah.number}` : "#"}
              className={!surah.accessible ? "pointer-events-none" : ""}
            >
              <Card className={`transition-all ${
                surah.accessible 
                  ? "hover:shadow-md hover:border-emerald-300 cursor-pointer" 
                  : "opacity-50"
              }`}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-bold">{surah.number}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{surah.name}</p>
                        <p className="text-sm text-gray-500">{surah.ayahCount} Ayat • Juz {surah.juzNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={tierColors[surah.minTier]}>{surah.minTier}</Badge>
                      {!surah.accessible && (
                        <span className="text-xs text-red-500">🔒</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
