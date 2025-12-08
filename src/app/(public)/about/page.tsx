import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Modul AI", value: "13+", icon: "🤖" },
  { label: "Surah Al-Quran", value: "114", icon: "📖" },
  { label: "Hadits Arbain", value: "42", icon: "📚" },
  { label: "Pengguna Aktif", value: "1K+", icon: "👥" },
];

const features = [
  {
    icon: "💬",
    title: "AI Chat Islami",
    description: "Konsultasi dengan AI tentang tafsir, fiqih, hadits, dan ilmu Islam lainnya.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop",
  },
  {
    icon: "🎙️",
    title: "Hafidz Mode",
    description: "Setorkan hafalan Al-Quran dan dapatkan evaluasi dari AI secara real-time.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=300&fit=crop",
  },
  {
    icon: "✍️",
    title: "Write Mode",
    description: "Buat konten Islami seperti khutbah, artikel, dan materi dakwah dengan AI.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
  },
];

const supporters = [
  { name: "Pondok Pesantren Al-Hikmah", location: "Blitar" },
  { name: "Masjid Nurul Iman", location: "Blitar" },
  { name: "TPQ Al-Falah", location: "Blitar" },
  { name: "Yayasan Yatim Piatu", location: "Blitar" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            ILMUNA
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/pricing" className="text-gray-600 hover:text-emerald-600 transition">Donasi</Link>
            <Link href="/contact" className="text-gray-600 hover:text-emerald-600 transition">Kontak</Link>
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&h=800&fit=crop"
            alt="Mosque"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tentang <span className="text-emerald-300">ILMUNA</span>
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Platform pendidikan Islam berbasis AI yang membantu umat Muslim belajar
              Al-Quran, Hadits, dan ilmu Islam dengan cara yang mudah, interaktif, dan personal.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center hover:shadow-lg transition">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-4xl font-bold text-emerald-600">{stat.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                📖 Cerita Kami
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">ILMUNA</strong> lahir dari keprihatinan terhadap
                  minimnya akses pendidikan Islam berkualitas, terutama di daerah-daerah terpencil.
                </p>
                <p>
                  Nama <strong className="text-emerald-600">ILMUNA</strong> berasal dari bahasa Arab
                  &quot;ilmu&quot; (علم) yang berarti pengetahuan, dan &quot;-na&quot; yang berarti &quot;kita&quot;.
                  ILMUNA berarti <em>&quot;ilmu kita bersama&quot;</em> - sebuah wadah untuk berbagi dan
                  menimba ilmu agama bersama-sama.
                </p>
                <p>
                  Dengan teknologi AI, kami menghadirkan &quot;ustadz virtual&quot; yang bisa diakses
                  kapan saja dan di mana saja - membantu setiap Muslim dalam perjalanan menuntut ilmu.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&h=600&fit=crop"
                alt="Islamic education"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visi</h2>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform pendidikan Islam terdepan yang memanfaatkan teknologi AI
                  untuk mempermudah umat Muslim di seluruh dunia dalam mempelajari dan
                  mengamalkan ajaran Islam.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi</h2>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Menyediakan akses pendidikan Islam berkualitas untuk semua
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Memanfaatkan AI untuk pembelajaran yang personal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Mendukung program hafalan Al-Quran
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    Membangun pusat-pusat Islam di daerah
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai fitur yang dirancang khusus untuk membantu perjalanan belajar Islam Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden hover:shadow-xl transition group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🤝 Mitra & Pendukung</h2>
            <p className="text-gray-600">
              Organisasi yang mendukung dan bekerja sama dengan ILMUNA
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supporters.map((supporter) => (
              <Card key={supporter.name} className="text-center hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🕌</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{supporter.name}</h3>
                  <p className="text-gray-500 text-sm">{supporter.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Belajar?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Bergabunglah dengan ribuan Muslim lainnya yang sudah belajar Islam dengan ILMUNA
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Mulai Gratis
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-emerald-700">
                Lihat Paket
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">ILMUNA</h3>
              <p className="text-sm">Platform pendidikan Islam berbasis AI untuk umat Muslim Indonesia.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-emerald-400 transition">Beranda</Link></li>
                <li><Link href="/about" className="hover:text-emerald-400 transition">Tentang</Link></li>
                <li><Link href="/pricing" className="hover:text-emerald-400 transition">Donasi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-emerald-400 transition">Syarat & Ketentuan</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-400 transition">Kebijakan Privasi</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li>📧 pendtiumpraz@gmail.com</li>
                <li>📱 +62 813-1950-4441</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 ILMUNA. Dibuat dengan ❤️ untuk umat.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
