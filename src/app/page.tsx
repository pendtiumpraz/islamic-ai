import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: "📚",
    title: "Learn Mode",
    description: "Belajar terstruktur dengan kurikulum lengkap dari dasar hingga mahir",
  },
  {
    icon: "🎙️",
    title: "Hafidz Mode",
    description: "Setoran hafalan Al-Quran, Hadits, dan Matan dengan evaluasi AI",
  },
  {
    icon: "✍️",
    title: "Write Mode",
    description: "Buat konten Islami berkualitas dengan bantuan AI",
  },
];

const modules = [
  { name: "Tafsir Al-Quran", category: "Quran" },
  { name: "Hadits Explorer", category: "Hadits" },
  { name: "Fiqih 4 Madzhab", category: "Fiqih" },
  { name: "Sirah Nabawiyah", category: "Sejarah" },
  { name: "Bahasa Arab", category: "Bahasa" },
  { name: "Akidah Ahlussunnah", category: "Akidah" },
];

const supporters = [
  "Kesamben Mengaji",
  "Blitar Mengaji",
  "Yayasan Sanggrahan Tunas Mulia",
  "Yayasan Imam Syafii Blitar",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">ILMUNA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:text-emerald-600">
              Fitur
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-emerald-600">
              Harga
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-emerald-600">
              Tentang
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-emerald-600">
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/login">
              <Button>Daftar Gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Platform Pendidikan Islam #1 di Indonesia
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Belajar Islam dengan{" "}
            <span className="text-emerald-600">Kecerdasan Buatan</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Platform pendidikan Islam berbasis AI yang membantu Anda memahami 
            Al-Quran, Hadits, dan ilmu Islam dengan mudah dan interaktif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button size="xl" className="w-full sm:w-auto">
                Mulai Gratis Sekarang
              </Button>
            </Link>
            <Link href="/features">
              <Button size="xl" variant="outline" className="w-full sm:w-auto">
                Lihat Fitur
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              ✓ 36+ Modul AI
            </span>
            <span className="flex items-center gap-2">
              ✓ 3 Mode Belajar
            </span>
            <span className="flex items-center gap-2">
              ✓ Gratis Selamanya
            </span>
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-6">Didukung oleh:</p>
          <div className="flex flex-wrap justify-center gap-8">
            {supporters.map((name) => (
              <span key={name} className="text-gray-600 font-medium">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tiga Mode Pembelajaran
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih mode sesuai kebutuhan belajar Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              36+ Modul AI Spesialis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Konsultasi dengan AI yang memahami berbagai bidang ilmu Islam
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modules.map((module) => (
              <Card key={module.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <p className="font-medium text-sm">{module.name}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {module.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/features">
              <Button variant="outline">Lihat Semua Modul →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Perjalanan Ilmu?
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-8">
            Bergabung dengan ribuan Muslim yang sudah belajar dengan ILMUNA
          </p>
          <Link href="/login">
            <Button size="xl" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
              Daftar Gratis Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ILMUNA</h3>
              <p className="text-sm">
                Platform Pendidikan Islam Berbasis AI
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white">Fitur</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Harga</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">Tentang</Link></li>
                <li><Link href="/contact" className="hover:text-white">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">Syarat & Ketentuan</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Kebijakan Privasi</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 ILMUNA. Hak Cipta Dilindungi.</p>
            <p className="mt-2 font-arabic text-lg text-gray-500">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
