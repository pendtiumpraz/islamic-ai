"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MatanItem {
  id: string;
  title: string;
  arabicText: string;
  translation: string | null;
  orderIndex: number;
  progress?: {
    bestScore: number;
    status: string;
  };
}

const matanInfo: Record<string, { title: string; author: string; description: string }> = {
  "ushul-tsalatsah": {
    title: "Ushul Tsalatsah",
    author: "Syaikh Muhammad bin Abdul Wahhab",
    description: "Tiga landasan utama yang wajib diketahui setiap Muslim",
  },
  "qawaidul-arba": {
    title: "Qawaidul Arba'",
    author: "Syaikh Muhammad bin Abdul Wahhab",
    description: "Empat kaidah penting dalam memahami tauhid",
  },
};

export default function MatanDetailPage() {
  const params = useParams();
  const matanSlug = params.matanSlug as string;
  const info = matanInfo[matanSlug] || { title: "Matan", author: "", description: "" };

  const [items, setItems] = useState<MatanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MatanItem | null>(null);
  const [showText, setShowText] = useState(true);
  
  // Recording
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; feedback: string } | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Map slug to search term
    const searchTerm = matanSlug === "ushul-tsalatsah" ? "ushul" : "qawaid";
    
    fetch(`/api/hafalan/items?type=matan&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.items || []).filter((item: { title: string }) => 
          item.title.toLowerCase().includes(searchTerm)
        );
        setItems(filtered.sort((a: MatanItem, b: MatanItem) => a.orderIndex - b.orderIndex));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [matanSlug]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setResult(null);

      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } catch {
      alert("Tidak dapat mengakses mikrofon");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleSubmit = async () => {
    if (!audioBlob || !selectedItem || submitting) return;

    setSubmitting(true);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(audioBlob);
      const audioBase64 = await base64Promise;

      const res = await fetch("/api/hafalan/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: selectedItem.id,
          mode: showText ? "WITH_TEXT" : "BLIND",
          audioData: audioBase64,
          audioMimeType: "audio/webm",
        }),
      });

      const data = await res.json();
      
      if (data.submission) {
        setResult({
          score: data.submission.score,
          passed: data.submission.passed,
          feedback: data.submission.feedbackSummary,
        });
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard/hafidz" className="text-gray-500 hover:text-gray-700">
            ← Hafidz
          </Link>
          <div>
            <h1 className="font-semibold text-gray-900">{info.title}</h1>
            <p className="text-xs text-gray-500">{info.author}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Book Cover / Info */}
        {!selectedItem && (
          <div className="text-center mb-8">
            <div className="w-32 h-40 mx-auto bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-xl flex items-center justify-center mb-6">
              <span className="text-4xl">📕</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h2>
            <p className="text-gray-600 mb-1">{info.author}</p>
            <p className="text-gray-500 text-sm">{info.description}</p>
            <p className="text-purple-600 font-medium mt-4">{items.length} Bagian</p>
          </div>
        )}

        {/* Content List (Book Pages) */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card 
              key={item.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                item.progress?.status === "PASSED" ? "border-l-4 border-l-green-500" : ""
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm ${
                    item.progress?.status === "PASSED" 
                      ? "bg-green-500 text-white" 
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{item.title}</p>
                    <p className="text-right font-arabic text-lg text-gray-700 line-clamp-2">
                      {item.arabicText.substring(0, 100)}...
                    </p>
                    {item.progress && (
                      <Badge className={`mt-2 ${item.progress.status === "PASSED" ? "bg-green-500" : "bg-yellow-500"}`}>
                        Skor: {item.progress.bestScore}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedItem.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedItem(null);
                  setAudioBlob(null);
                  setAudioUrl(null);
                  setResult(null);
                }}>✕</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Toggle Text */}
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowText(!showText)}>
                  {showText ? "🙈 Sembunyikan" : "👁️ Tampilkan"}
                </Button>
              </div>

              {/* Text Content */}
              {showText ? (
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-right font-arabic text-xl leading-[2.5] text-gray-800">
                    {selectedItem.arabicText}
                  </p>
                  {selectedItem.translation && (
                    <p className="text-gray-600 mt-4 pt-4 border-t border-purple-200">
                      {selectedItem.translation}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-400">
                  🙈 Mode Ujian - Teks disembunyikan
                </div>
              )}

              {/* Recording */}
              <div className="border-t pt-4">
                <p className="text-center text-sm text-gray-500 mb-4">Rekam hafalan Anda</p>
                <div className="flex flex-col items-center gap-4">
                  {isRecording && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-xl font-mono text-red-600">{formatTime(recordingTime)}</span>
                    </div>
                  )}

                  {audioUrl && !isRecording && (
                    <audio src={audioUrl} controls className="w-full" />
                  )}

                  <div className="flex gap-2">
                    {!isRecording && !audioBlob && (
                      <Button onClick={startRecording} className="bg-red-500 hover:bg-red-600">
                        🎙️ Rekam
                      </Button>
                    )}

                    {isRecording && (
                      <Button onClick={stopRecording} variant="outline">
                        ⏹️ Stop
                      </Button>
                    )}

                    {audioBlob && !isRecording && (
                      <>
                        <Button variant="outline" onClick={() => {
                          setAudioBlob(null);
                          setAudioUrl(null);
                          setResult(null);
                        }}>
                          🔄 Ulang
                        </Button>
                        <Button 
                          onClick={handleSubmit} 
                          disabled={submitting}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          {submitting ? "Evaluasi..." : "📤 Setor"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className={`p-4 rounded-lg ${result.passed ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Hasil Evaluasi</span>
                    <Badge className={result.passed ? "bg-green-500" : "bg-yellow-500"}>
                      {result.score}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{result.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
