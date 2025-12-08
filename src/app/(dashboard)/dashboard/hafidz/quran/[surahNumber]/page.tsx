"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Ayah {
  id: string;
  ayahNumber: number;
  arabicText: string;
  translation: string | null;
  score?: number;
  status?: "not_recited" | "correct" | "incorrect" | "partial";
}

interface EvaluationResult {
  totalScore: number;
  ayahScores: Array<{
    ayahNumber: number;
    score: number;
    status: "correct" | "incorrect" | "partial" | "not_recited";
    feedback?: string;
  }>;
  summary: string;
  lastAyahRecited: number;
}

export default function SurahDetailPage() {
  const params = useParams();
  const surahNumber = parseInt(params.surahNumber as string);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [surahName, setSurahName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState(true);
  
  // Recording
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAyahs = useCallback(() => {
    fetch(`/api/hafalan/quran/${surahNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Map progress to ayah format
          const ayahsWithScores = (data.ayahs || []).map((a: { id: string; ayahNumber: number; arabicText: string; translation: string | null; progress?: { bestScore: number; status: string } }) => ({
            ...a,
            score: a.progress?.bestScore,
            status: a.progress?.status === "PASSED" ? "correct" as const : 
                   a.progress?.status === "IN_PROGRESS" ? "partial" as const : undefined,
          }));
          setAyahs(ayahsWithScores);
          setSurahName(data.surahName || `Surah ${surahNumber}`);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [surahNumber]);

  useEffect(() => {
    fetchAyahs();
  }, [fetchAyahs]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

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
      alert("Tidak dapat mengakses mikrofon. Pastikan izin sudah diberikan.");
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

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!audioBlob || submitting) return;

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

      const res = await fetch("/api/hafalan/evaluate-surah", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahNumber,
          audioData: audioBase64,
          audioMimeType: "audio/webm",
          showText,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengevaluasi");
      }

      setResult(data.evaluation);
      
      // Update ayah scores locally for immediate feedback
      if (data.evaluation?.ayahScores) {
        setAyahs(prev => prev.map(ayah => {
          const scoreData = data.evaluation.ayahScores.find(
            (s: { ayahNumber: number }) => s.ayahNumber === ayah.ayahNumber
          );
          if (scoreData) {
            // Keep higher score
            const newScore = Math.max(ayah.score || 0, scoreData.score);
            return {
              ...ayah,
              score: newScore,
              status: scoreData.status || (newScore >= 80 ? "correct" : newScore >= 50 ? "partial" : "incorrect"),
            };
          }
          return ayah;
        }));
      }
      
      // Refetch to get updated progress from database
      setTimeout(() => fetchAyahs(), 500);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "correct": return "bg-green-500";
      case "partial": return "bg-yellow-500";
      case "incorrect": return "bg-red-500";
      default: return "bg-gray-300";
    }
  };

  const getStatusBorder = (status?: string) => {
    switch (status) {
      case "correct": return "border-l-4 border-l-green-500 bg-green-50";
      case "partial": return "border-l-4 border-l-yellow-500 bg-yellow-50";
      case "incorrect": return "border-l-4 border-l-red-500 bg-red-50";
      default: return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/hafidz/quran" className="text-gray-500 hover:text-gray-700">
              ← Daftar Surah
            </Link>
            <div>
              <h1 className="font-semibold text-gray-900">{surahName}</h1>
              <p className="text-xs text-gray-500">{ayahs.length} Ayat</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowText(!showText)}>
            {showText ? "🙈 Sembunyikan" : "👁️ Tampilkan"}
          </Button>
        </div>
      </header>

      {/* Ayah List */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {result && (
          <Card className="mb-6 border-2 border-emerald-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hasil Evaluasi</CardTitle>
                <Badge className="bg-emerald-500 text-lg px-4 py-1">
                  {result.totalScore}/100
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{result.summary}</p>
              <p className="text-sm text-gray-500">
                Ayat terbaca: 1 - {result.lastAyahRecited}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {ayahs.map((ayah) => (
            <Card key={ayah.id} className={`transition-all ${getStatusBorder(ayah.status)}`}>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  {/* Ayah Number with Score */}
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      ayah.score !== undefined ? getStatusColor(ayah.status) : "bg-gray-200 text-gray-600"
                    }`}>
                      {ayah.ayahNumber}
                    </div>
                    {ayah.score !== undefined && (
                      <span className="text-xs font-bold text-gray-600">{ayah.score}</span>
                    )}
                  </div>
                  
                  {/* Ayah Content */}
                  <div className="flex-1">
                    {showText ? (
                      <>
                        <p className="text-right font-arabic text-xl leading-[2] text-gray-800 mb-2">
                          {ayah.arabicText}
                        </p>
                        {ayah.translation && (
                          <p className="text-sm text-gray-500">{ayah.translation}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-400 italic">Teks disembunyikan (Mode Ujian)</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Fixed Recording Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            {/* Recording Status */}
            <div className="flex items-center gap-3">
              {isRecording ? (
                <>
                  <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-xl font-mono text-red-600">{formatTime(recordingTime)}</span>
                </>
              ) : audioUrl ? (
                <audio src={audioUrl} controls className="h-10" />
              ) : (
                <p className="text-gray-500">Tekan tombol untuk mulai merekam</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isRecording && !audioBlob && (
                <Button onClick={startRecording} className="bg-red-500 hover:bg-red-600">
                  🎙️ Rekam
                </Button>
              )}

              {isRecording && (
                <Button onClick={stopRecording} variant="outline" className="border-red-500 text-red-500">
                  ⏹️ Stop
                </Button>
              )}

              {audioBlob && !isRecording && (
                <>
                  <Button variant="outline" onClick={resetRecording}>
                    🔄 Ulang
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={submitting}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    {submitting ? "⏳ Evaluasi..." : "📤 Setor"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
