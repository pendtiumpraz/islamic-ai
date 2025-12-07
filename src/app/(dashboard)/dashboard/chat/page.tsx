"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIModule {
  id: string;
  slug: string;
  name: string;
  nameAr: string | null;
  description: string;
  category: string;
  icon: string | null;
  minTier: string;
}

const categoryLabels: Record<string, string> = {
  QURAN_TAFSIR: "Al-Quran & Tafsir",
  HADITS: "Hadits",
  FIQIH: "Fiqih",
  AKIDAH_SEJARAH: "Akidah & Sejarah",
};

const tierColors: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-800",
  BRONZE: "bg-amber-100 text-amber-800",
  SILVER: "bg-slate-200 text-slate-800",
  GOLD: "bg-yellow-100 text-yellow-800",
};

export default function ChatModulesPage() {
  const [modules, setModules] = useState<AIModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/modules")
      .then((res) => res.json())
      .then((data) => {
        setModules(data.modules || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = Array.from(new Set(modules.map((m) => m.category)));
  const filteredModules = selectedCategory
    ? modules.filter((m) => m.category === selectedCategory)
    : modules;

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
            <span className="text-2xl font-bold text-emerald-600">AI Chat</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pilih Modul AI</h1>
          <p className="text-gray-600">
            Pilih modul untuk memulai percakapan dengan AI ustadz
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Semua
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryLabels[cat] || cat}
            </Button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map((mod) => (
            <Link key={mod.id} href={`/dashboard/chat/${mod.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{mod.icon || "📚"}</div>
                    <Badge className={tierColors[mod.minTier] || tierColors.FREE}>
                      {mod.minTier}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{mod.name}</CardTitle>
                  {mod.nameAr && (
                    <p className="text-sm text-gray-500 font-arabic">{mod.nameAr}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {mod.description}
                  </CardDescription>
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[mod.category] || mod.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada modul ditemukan
          </div>
        )}
      </main>
    </div>
  );
}
