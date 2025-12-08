"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Hadits {
  id: string;
  haditsNumber: number;
  arabicText: string;
  translation: string | null;
  progress?: {
    bestScore: number;
    status: string;
  };
}

export default function HaditsPage() {
  const [haditsList, setHaditsList] = useState<Hadits[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHadits, setSelectedHadits] = useState<Hadits | null>(null);
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
    fetch("/api/hafalan/items?type=hadits&limit=50")
      .then((res) => res.json())
      .then((data) => {
        const items = (data.items || []).map((item: Record<string, unknown>) => ({
          id: item.id,
          haditsNumber: item.haditsNumber || item.orderIndex,
          arabicText: item.arabicText,
          translation: item.translation,
          progress: item.progress,
        }));
        setHaditsList(items.sort((a: Hadits, b: Hadits) => (a.haditsNumber || 0) - (b.haditsNumber || 0)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    if (!audioBlob || !selectedHadits || submitting) return;

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
          itemId: selectedHadits.id,
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

  const closeModal = () => {
    setSelectedHadits(null);
    setAudioBlob(null);
    setAudioUrl(null);
    setResult(null);
    setIsRecording(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
          <h1 className="font-semibold text-gray-900">Hadits Arbain Nawawi</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">42 Hadits Pilihan</h2>
          <p className="text-gray-600">Klik hadits untuk memulai setoran hafalan</p>
        </div>

        <div className="space-y-3">
          {haditsList.map((hadits) => (
            <Card 
              key={hadits.id}
              className="cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
              onClick={() => setSelectedHadits(hadits)}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    hadits.progress?.status === "PASSED" 
                      ? "bg-green-500 text-white" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {hadits.haditsNumber}
                  </div>
                  <div className="flex-1">
                    <p className="text-right font-arabic text-lg leading-loose text-gray-800 line-clamp-2">
                      {hadits.arabicText}
                    </p>
                    {hadits.progress && (
                      <div className="mt-2 flex items-center gap-2">
                        <Badge className={hadits.progress.status === "PASSED" ? "bg-green-500" : "bg-yellow-500"}>
                          Skor: {hadits.progress.bestScore}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedHadits && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hadits ke-{selectedHadits.haditsNumber}</CardTitle>
                <Button variant="ghost" size="sm" onClick={closeModal}>✕</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Teks Hadits</span>
                <Button variant="outline" size="sm" onClick={() => setShowText(!showText)}>
                  {showText ? "Sembunyikan" : "Tampilkan"}
                </Button>
              </div>
              
              {showText ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-right font-arabic text-xl leading-[2] text-gray-800">
                    {selectedHadits.arabicText}
                  </p>
                  {selectedHadits.translation && (
                    <p className="text-sm text-gray-600 mt-4 pt-4 border-t">
                      {selectedHadits.translation}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-400">
                  🙈 Mode Ujian
                </div>
              )}

              {/* Recording */}
              <div className="border-t pt-4">
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
                          className="bg-blue-500 hover:bg-blue-600"
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
                    <span className="font-semibold">Hasil</span>
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
