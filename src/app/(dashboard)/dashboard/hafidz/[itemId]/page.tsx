"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HafalanItem {
  id: string;
  type: string;
  title: string;
  arabicText: string;
  translation: string | null;
  surahNumber: number | null;
  ayahStart: number | null;
  ayahEnd: number | null;
  haditsNumber: number | null;
}

interface Submission {
  id: string;
  score: number;
  passed: boolean;
  feedbackSummary: string;
  createdAt: string;
}

export default function HafidzItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.itemId as string;

  const [item, setItem] = useState<HafalanItem | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showText, setShowText] = useState(true);
  const [result, setResult] = useState<Submission | null>(null);

  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(`/api/hafalan/items?id=${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setItem(data.items[0]);
        }
        setSubmissions(data.submissions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [itemId]);

  // Cleanup audio URL on unmount
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
      setAudioBlob(null);
      setAudioUrl(null);
      setResult(null);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } catch (err) {
      alert("Tidak dapat mengakses mikrofon. Pastikan izin mikrofon diberikan.");
      console.error(err);
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
    setRecordingTime(0);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!audioBlob || submitting) return;

    setSubmitting(true);
    setResult(null);

    try {
      // Convert blob to base64
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
          itemId,
          mode: showText ? "WITH_TEXT" : "BLIND",
          audioData: audioBase64,
          audioMimeType: "audio/webm",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal mengirim setoran");
      }

      const data = await res.json();
      setResult(data.submission);
      setSubmissions((prev) => [data.submission, ...prev]);
    } catch (error) {
      console.error(error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Materi tidak ditemukan</p>
          <Button onClick={() => router.push("/dashboard/hafidz")}>Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard/hafidz" className="text-gray-500 hover:text-gray-700">
            ← Hafidz
          </Link>
          <div>
            <h1 className="font-semibold text-gray-900">{item.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Reference Text */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Teks Hafalan</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowText(!showText)}>
                {showText ? "Sembunyikan" : "Tampilkan"} Teks
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showText ? (
              <>
                <p className="text-right font-arabic text-2xl leading-[2.5] text-gray-800 mb-4">
                  {item.arabicText}
                </p>
                {item.translation && (
                  <p className="text-gray-600 text-sm border-t pt-4">
                    <strong>Terjemah:</strong> {item.translation}
                  </p>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-2">🙈</p>
                <p>Teks disembunyikan untuk mode ujian</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Audio Recording */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Setoran Hafalan (Audio)</CardTitle>
            <p className="text-sm text-gray-500">
              Rekam bacaan Anda untuk dievaluasi AI
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Recording Indicator */}
              {isRecording && (
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-2xl font-mono text-red-600">{formatTime(recordingTime)}</span>
                </div>
              )}

              {/* Audio Player */}
              {audioUrl && !isRecording && (
                <div className="w-full">
                  <audio src={audioUrl} controls className="w-full" />
                </div>
              )}

              {/* Recording Buttons */}
              <div className="flex gap-3">
                {!isRecording && !audioBlob && (
                  <Button
                    size="lg"
                    onClick={startRecording}
                    className="bg-red-500 hover:bg-red-600 text-white px-8"
                  >
                    <span className="mr-2">🎙️</span> Mulai Rekam
                  </Button>
                )}

                {isRecording && (
                  <Button
                    size="lg"
                    onClick={stopRecording}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 px-8"
                  >
                    <span className="mr-2">⏹️</span> Stop Rekam
                  </Button>
                )}

                {audioBlob && !isRecording && (
                  <>
                    <Button size="lg" variant="outline" onClick={resetRecording}>
                      <span className="mr-2">🔄</span> Rekam Ulang
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
                    >
                      {submitting ? (
                        <>
                          <span className="mr-2 animate-spin">⏳</span> Mengevaluasi...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">📤</span> Kirim Setoran
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>

              {/* Mode Badge */}
              <Badge variant="outline" className="mt-2">
                Mode: {showText ? "Dengan Teks" : "Tanpa Teks (Ujian)"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className={`mb-6 ${result.passed ? "border-green-500" : "border-yellow-500"} border-2`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hasil Evaluasi</CardTitle>
                <Badge className={result.passed ? "bg-green-500" : "bg-yellow-500"}>
                  {result.passed ? "LULUS ✓" : "BELUM LULUS"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-emerald-600">{result.score}</p>
                <p className="text-gray-500">Skor</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold mb-2">Komentar AI:</p>
                <p className="text-gray-700 whitespace-pre-wrap">{result.feedbackSummary}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History */}
        {submissions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Setoran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submissions.slice(0, 5).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{sub.score}</span>
                      <Badge className={sub.passed ? "bg-green-500" : "bg-gray-400"}>
                        {sub.passed ? "Lulus" : "Belum"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
