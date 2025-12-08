"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const stats = [
  { value: "114", label: "Surah Al-Quran", icon: "📖" },
  { value: "13+", label: "Modul AI", icon: "🤖" },
  { value: "42", label: "Hadits Arbain", icon: "📚" },
  { value: "6", label: "Proyek Sosial", icon: "🕌" },
];

const values = [
  {
    icon: "🎯",
    title: "Akurasi",
    description: "Semua jawaban AI berdasarkan sumber Islam yang muktabar: kitab tafsir, hadits shahih, dan pendapat ulama.",
  },
  {
    icon: "🔒",
    title: "Privasi",
    description: "Data Anda aman dan tidak pernah dijual. Kami berkomitmen menjaga privasi setiap pengguna.",
  },
  {
    icon: "💝",
    title: "Amanah",
    description: "100% donasi disalurkan untuk pembangunan pusat Islam. Laporan keuangan transparan setiap bulan.",
  },
  {
    icon: "🌍",
    title: "Inklusif",
    description: "ILMUNA terbuka untuk semua Muslim dari berbagai latar belakang dan madzhab.",
  },
];

const team = [
  { name: "Tim Pengembang", role: "Development", icon: "👨‍💻" },
  { name: "Dewan Syariah", role: "Content Review", icon: "👳" },
  { name: "Tim Support", role: "Customer Service", icon: "💬" },
  { name: "Tim Donasi", role: "Fund Management", icon: "💰" },
];

const timeline = [
  { year: "2024", title: "ILMUNA Lahir", desc: "Platform pendidikan Islam AI pertama di Indonesia" },
  { year: "2024", title: "13 Modul AI", desc: "Peluncuran modul tafsir, hadits, fiqih, dan lainnya" },
  { year: "2024", title: "Hafidz Mode", desc: "Fitur setoran hafalan Al-Quran dengan AI" },
  { year: "2025", title: "Ekspansi", desc: "Target 100.000 pengguna aktif" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1920&h=800&fit=crop"
            alt="Mosque"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-teal-800/90" />
        </div>
        <div className="absolute inset-0 pattern-islamic opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-200 text-sm mb-6 animate-slide-down">
              <span>🕌</span>
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Misi Kami:<br />
              <span className="text-emerald-300">Ilmu Islam untuk Semua</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 leading-relaxed animate-slide-up delay-100">
              ILMUNA adalah platform pendidikan Islam berbasis AI yang membantu umat Muslim
              mempelajari Al-Quran, Hadits, dan ilmu Islam dengan cara yang mudah, personal, dan interaktif.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 bg-white rounded-2xl shadow-xl shadow-gray-100/50 text-center card-hover"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <p className="text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                Cerita Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mengapa <span className="gradient-text">ILMUNA</span> Ada?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">ILMUNA</strong> lahir dari keprihatinan terhadap
                  minimnya akses pendidikan Islam berkualitas, terutama di daerah-daerah terpencil
                  yang jauh dari ustadz dan lembaga pendidikan Islam.
                </p>
                <p>
                  Nama <strong className="text-emerald-600">ILMUNA</strong> berasal dari bahasa Arab
                  <span className="font-arabic text-lg mx-2">عِلْمُنَا</span>
                  yang berarti <em>&quot;ilmu kita&quot;</em> - sebuah wadah untuk berbagi dan
                  menimba ilmu agama bersama-sama.
                </p>
                <p>
                  Dengan teknologi <strong>AI (Artificial Intelligence)</strong>, kami menghadirkan
                  &quot;ustadz virtual&quot; yang bisa diakses kapan saja dan di mana saja - membantu
                  setiap Muslim dalam perjalanan menuntut ilmu.
                </p>
                <p className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                  <strong className="text-emerald-700">💡 Fun Fact:</strong> AI ILMUNA dilatih
                  berdasarkan kitab-kitab tafsir muktabar seperti Ibnu Katsir, Al-Qurthubi,
                  dan As-Sa&apos;di untuk memastikan akurasi jawaban.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&h=600&fit=crop"
                  alt="Islamic education"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-2xl shadow-xl max-w-xs">
                <p className="text-emerald-600 font-bold text-lg mb-1">Visi Kami</p>
                <p className="text-gray-600 text-sm">
                  Menjadi platform pendidikan Islam #1 di Indonesia yang memanfaatkan teknologi AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Nilai-Nilai Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prinsip yang Kami Pegang
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 bg-white rounded-3xl shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="text-4xl mb-6 block">🎯</span>
                <h3 className="text-2xl font-bold mb-4">Visi</h3>
                <p className="text-emerald-100 leading-relaxed">
                  Menjadi platform pendidikan Islam terdepan di Asia Tenggara yang memanfaatkan
                  teknologi AI untuk mempermudah umat Muslim dalam mempelajari dan mengamalkan
                  ajaran Islam berdasarkan Al-Quran dan Sunnah.
                </p>
              </div>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="text-4xl mb-6 block">🚀</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Menyediakan akses pendidikan Islam berkualitas untuk semua
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Memanfaatkan AI untuk pembelajaran yang personal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Mendukung program hafalan Al-Quran
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Membangun pusat-pusat Islam di daerah
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Timeline ILMUNA
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/30" />
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-8 mb-12 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                      <span className="text-emerald-400 font-bold">{item.year}</span>
                      <h3 className="text-white font-bold text-lg mt-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 shadow-lg shadow-emerald-500/50" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Tim Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Orang-Orang di Balik ILMUNA
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center p-8 bg-gray-50 rounded-3xl hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
                  <span className="text-3xl">{member.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bergabung dengan ILMUNA Sekarang
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto">
            Mulai perjalanan menuntut ilmu Islam Anda bersama AI yang cerdas dan terpercaya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl text-lg h-14 px-10">
                Mulai Gratis
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg h-14 px-10">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
