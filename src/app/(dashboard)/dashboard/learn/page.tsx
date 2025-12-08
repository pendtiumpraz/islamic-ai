"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;
  duration: string;
  topics: string[];
}

const courses: Course[] = [
  {
    id: "aqidah-101",
    title: "Aqidah Islam Dasar",
    description: "Pelajari dasar-dasar aqidah Islam: Rukun Iman, Tauhid, dan keyakinan seorang Muslim",
    icon: "🕋",
    level: "beginner",
    lessons: 12,
    duration: "4 jam",
    topics: ["Rukun Iman", "Tauhid Uluhiyah", "Tauhid Rububiyah", "Asma wa Sifat"],
  },
  {
    id: "fiqih-ibadah",
    title: "Fiqih Ibadah",
    description: "Panduan lengkap tata cara ibadah: shalat, puasa, zakat, dan haji",
    icon: "🤲",
    level: "beginner",
    lessons: 20,
    duration: "8 jam",
    topics: ["Thaharah", "Shalat", "Puasa", "Zakat", "Haji"],
  },
  {
    id: "tajwid",
    title: "Ilmu Tajwid",
    description: "Pelajari hukum-hukum tajwid untuk membaca Al-Quran dengan benar",
    icon: "📖",
    level: "intermediate",
    lessons: 15,
    duration: "6 jam",
    topics: ["Makharijul Huruf", "Hukum Nun Mati", "Hukum Mim Mati", "Mad"],
  },
  {
    id: "sirah-nabawiyah",
    title: "Sirah Nabawiyah",
    description: "Mempelajari sejarah kehidupan Rasulullah SAW dari lahir hingga wafat",
    icon: "🌙",
    level: "beginner",
    lessons: 24,
    duration: "10 jam",
    topics: ["Masa Kecil", "Kenabian", "Hijrah", "Fathu Makkah"],
  },
  {
    id: "akhlak",
    title: "Akhlak Mulia",
    description: "Membentuk karakter Islami berdasarkan Al-Quran dan Sunnah",
    icon: "💎",
    level: "beginner",
    lessons: 10,
    duration: "4 jam",
    topics: ["Adab terhadap Allah", "Adab terhadap Rasul", "Adab Pergaulan", "Adab Makan Minum"],
  },
  {
    id: "ushul-fiqih",
    title: "Ushul Fiqih",
    description: "Memahami metodologi pengambilan hukum dalam Islam",
    icon: "⚖️",
    level: "advanced",
    lessons: 18,
    duration: "8 jam",
    topics: ["Sumber Hukum", "Ijma", "Qiyas", "Ijtihad"],
  },
];

const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

const levelLabels = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Lanjutan",
};

export default function LearnPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = selectedLevel
    ? courses.filter((c) => c.level === selectedLevel)
    : courses;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
            ← Dashboard
          </Link>
          <span className="text-2xl font-bold text-blue-600">📚 Learn Mode</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Belajar Islam</h1>
          <p className="text-gray-600">
            Pelajari ilmu-ilmu Islam secara sistematis dengan kurikulum terstruktur
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedLevel === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel(null)}
          >
            Semua Level
          </Button>
          <Button
            variant={selectedLevel === "beginner" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("beginner")}
            className={selectedLevel === "beginner" ? "bg-green-600" : ""}
          >
            Pemula
          </Button>
          <Button
            variant={selectedLevel === "intermediate" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("intermediate")}
            className={selectedLevel === "intermediate" ? "bg-yellow-600" : ""}
          >
            Menengah
          </Button>
          <Button
            variant={selectedLevel === "advanced" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("advanced")}
            className={selectedLevel === "advanced" ? "bg-red-600" : ""}
          >
            Lanjutan
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id}
              className="hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedCourse(course)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {course.icon}
                  </span>
                  <Badge className={levelColors[course.level]}>
                    {levelLabels[course.level]}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>📚 {course.lessons} Pelajaran</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.topics.slice(0, 3).map((topic, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {course.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.topics.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-dashed">
          <CardContent className="py-8 text-center">
            <span className="text-4xl mb-4 block">🚀</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Segera Hadir!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Fitur Learn Mode dengan video pembelajaran, quiz interaktif, dan sertifikat 
              sedang dalam pengembangan. Stay tuned!
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCourse.icon}</span>
                  <div>
                    <CardTitle>{selectedCourse.title}</CardTitle>
                    <Badge className={`mt-1 ${levelColors[selectedCourse.level]}`}>
                      {levelLabels[selectedCourse.level]}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{selectedCourse.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span>📚</span> {selectedCourse.lessons} Pelajaran
                </span>
                <span className="flex items-center gap-1">
                  <span>⏱️</span> {selectedCourse.duration}
                </span>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">Materi yang dipelajari:</p>
                <ul className="space-y-1">
                  {selectedCourse.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full bg-blue-500 hover:bg-blue-600" disabled>
                  🔒 Segera Hadir
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Fitur ini sedang dalam pengembangan
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
