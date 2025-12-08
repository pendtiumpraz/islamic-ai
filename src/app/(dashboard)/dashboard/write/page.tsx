"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ContentType = "article" | "social" | "khutbah" | "caption";

interface GeneratedContent {
  title?: string;
  content: string;
  hashtags?: string[];
}

const contentTypes = [
  {
    id: "article" as ContentType,
    name: "Artikel Islami",
    icon: "📝",
    description: "Buat artikel panjang tentang topik keislaman",
    placeholder: "Contoh: Keutamaan shalat tahajud di bulan Ramadhan",
  },
  {
    id: "social" as ContentType,
    name: "Post Media Sosial",
    icon: "📱",
    description: "Konten singkat untuk Instagram, Twitter, dll",
    placeholder: "Contoh: Quote tentang sabar dalam menghadapi ujian",
  },
  {
    id: "khutbah" as ContentType,
    name: "Naskah Khutbah",
    icon: "🕌",
    description: "Naskah khutbah Jumat atau ceramah",
    placeholder: "Contoh: Khutbah tentang menjaga lisan di era digital",
  },
  {
    id: "caption" as ContentType,
    name: "Caption Dakwah",
    icon: "✨",
    description: "Caption menarik untuk konten dakwah",
    placeholder: "Contoh: Caption untuk gambar masjid saat maghrib",
  },
];

export default function WritePage() {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!selectedType || !topic.trim()) return;

    setGenerating(true);
    setResult(null);

    try {
      const res = await fetch("/api/write/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          topic: topic.trim(),
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        setResult(data.content);
      } else {
        alert(data.error || "Gagal generate konten");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = result.title 
      ? `${result.title}\n\n${result.content}${result.hashtags ? "\n\n" + result.hashtags.join(" ") : ""}`
      : result.content;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
            ← Dashboard
          </Link>
          <span className="text-2xl font-bold text-purple-600">✍️ Write Mode</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Konten Islami</h1>
          <p className="text-gray-600">
            Generate konten dakwah dengan bantuan AI sesuai adab Islami
          </p>
        </div>

        {/* Content Type Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {contentTypes.map((type) => (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all ${
                selectedType === type.id 
                  ? "border-purple-500 bg-purple-50 shadow-md" 
                  : "hover:border-purple-300 hover:shadow"
              }`}
              onClick={() => {
                setSelectedType(type.id);
                setResult(null);
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{type.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Input */}
        {selectedType && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Topik / Tema</CardTitle>
              <CardDescription>
                {contentTypes.find((t) => t.id === selectedType)?.placeholder}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Masukkan topik atau tema yang ingin dibahas..."
                className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={generating || !topic.trim()}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  {generating ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span> Generating...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✨</span> Generate Konten
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result */}
        {result && (
          <Card className="border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hasil</CardTitle>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {result.title && (
                <h3 className="text-xl font-bold text-gray-900 mb-4">{result.title}</h3>
              )}
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {result.content}
                </p>
              </div>
              {result.hashtags && result.hashtags.length > 0 && (
                <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                  {result.hashtags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
