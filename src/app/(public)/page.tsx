"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const features = [
  {
    icon: "💬",
    title: "AI Chat Islami",
    description: "Tanya jawab seputar tafsir, fiqih, hadits, akidah, dan ilmu Islam lainnya dengan AI yang cerdas dan terpercaya.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: "📖",
    title: "Hafidz Mode",
    description: "Setorkan hafalan Al-Quran Anda dan dapatkan evaluasi tajwid serta feedback dari AI secara real-time.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: "✍️",
    title: "Write Mode",
    description: "Buat konten Islami seperti khutbah, artikel dakwah, dan materi pengajaran dengan bantuan AI.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: "📚",
    title: "13+ Modul AI",
    description: "Tafsir Ibnu Katsir, Hadits Arbain, Fiqih 4 Madzhab, Sirah Nabawiyah, Bahasa Arab, dan banyak lagi.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "🌍",
    title: "Multi Bahasa",
    description: "Tersedia dalam Bahasa Indonesia, Arab, dan Inggris untuk menjangkau lebih banyak umat.",
    gradient: "from-rose-500 to-red-500",
  },
  {
    icon: "🎓",
    title: "Kurikulum Terstruktur",
    description: "Materi disusun seperti kurikulum Universitas Islam Madinah untuk pembelajaran yang sistematis.",
    gradient: "from-cyan-500 to-teal-500",
  },
];

const stats = [
  { value: "114", label: "Surah Al-Quran", suffix: "" },
  { value: "13", label: "Modul AI", suffix: "+" },
  { value: "42", label: "Hadits Arbain", suffix: "" },
  { value: "1000", label: "Pengguna Aktif", suffix: "+" },
];

const modules = [
  { name: "Tafsir Ibnu Katsir", icon: "📖", color: "bg-emerald-500" },
  { name: "Hadits Arbain", icon: "📚", color: "bg-blue-500" },
  { name: "Fiqih Ibadah", icon: "🕌", color: "bg-purple-500" },
  { name: "Akidah Ahlus Sunnah", icon: "☪️", color: "bg-amber-500" },
  { name: "Sirah Nabawiyah", icon: "🌙", color: "bg-rose-500" },
  { name: "Bahasa Arab", icon: "🔤", color: "bg-cyan-500" },
];

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Santri Pondok Pesantren",
    content: "ILMUNA sangat membantu saya memahami tafsir Al-Quran dengan penjelasan yang mudah dipahami. AI-nya sangat cerdas!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Siti Aisyah",
    role: "Mahasiswi",
    content: "Hafidz Mode-nya luar biasa! Saya bisa setor hafalan kapan saja dan mendapat feedback langsung. Sangat membantu!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Ustadz Rahmat",
    role: "Guru Ngaji",
    content: "Platform yang sangat bermanfaat untuk persiapan materi pengajaran. AI-nya akurat dan mengacu pada kitab-kitab muktabar.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const crowdfunding = [
  { name: "Pondok Pesantren Al-Hikmah", target: 50, current: 25, image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400&h=300&fit=crop" },
  { name: "Masjid Nurul Iman", target: 30, current: 12, image: "https://images.unsplash.com/photo-1545167496-c1e092d383a2?w=400&h=300&fit=crop" },
  { name: "TPQ Al-Falah", target: 20, current: 8, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 pattern-islamic opacity-30" />

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-200 text-sm mb-6 animate-slide-down">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Platform Pendidikan Islam #1 di Indonesia
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
                Belajar Islam dengan{" "}
                <span className="relative">
                  <span className="relative z-10">Kecerdasan Buatan</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-400/30 -z-10" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up delay-100">
                ILMUNA hadir sebagai &quot;ustadz virtual&quot; yang siap menemani perjalanan Anda
                menuntut ilmu agama kapan saja dan di mana saja.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-200">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-black/20 text-lg h-14 px-8 btn-shine">
                    Mulai Belajar Gratis
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg h-14 px-8">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-10 animate-slide-up delay-300">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white/50 flex items-center justify-center text-white text-xs font-bold">
                      {i}K
                    </div>
                  ))}
                </div>
                <div className="text-emerald-100 text-sm">
                  <span className="font-semibold text-white">4,000+</span> pengguna aktif
                </div>
              </div>
            </div>

            {/* Right Content - Floating Cards */}
            <div className="relative h-[500px] hidden lg:block animate-scale-in delay-400">
              {/* Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 glass rounded-3xl p-6 shadow-2xl animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">AI Chat Islami</p>
                    <p className="text-emerald-200 text-sm">Online sekarang</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-2xl rounded-tl-none p-4">
                    <p className="text-white text-sm">Apa hukum sholat tahajud berjamaah?</p>
                  </div>
                  <div className="bg-emerald-500/30 rounded-2xl rounded-tr-none p-4">
                    <p className="text-white text-sm">Sholat tahajud berjamaah dibolehkan dalam Islam, namun tidak dilakukan secara rutin...</p>
                  </div>
                </div>
              </div>

              {/* Floating Mini Cards */}
              <div className="absolute top-10 right-10 glass rounded-2xl p-4 animate-float delay-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span className="text-white font-medium">114 Surah</span>
                </div>
              </div>

              <div className="absolute bottom-20 left-0 glass rounded-2xl p-4 animate-float delay-400">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span>
                  <span className="text-white font-medium">13+ Modul</span>
                </div>
              </div>

              <div className="absolute top-32 left-10 glass rounded-2xl p-4 animate-float delay-500">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎙️</span>
                  <span className="text-white font-medium">Hafidz Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white rounded-2xl shadow-lg shadow-gray-200/50 card-hover"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Semua yang Anda Butuhkan untuk{" "}
              <span className="gradient-text">Belajar Islam</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Platform lengkap dengan teknologi AI terdepan untuk membantu perjalanan
              spiritual dan intelektual Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Showcase */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              13+ Modul AI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Modul Pembelajaran Lengkap
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Berbagai cabang ilmu Islam dari sumber-sumber yang terpercaya
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modules.map((module, i) => (
              <div
                key={module.name}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{module.icon}</span>
                </div>
                <p className="text-white text-sm font-medium text-center">{module.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/dashboard/chat">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg h-14 px-8">
                Jelajahi Semua Modul
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Cara Kerja
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mulai Belajar dalam <span className="gradient-text">3 Langkah</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Daftar Gratis", desc: "Buat akun dengan Google dalam hitungan detik", icon: "👤" },
              { step: "02", title: "Pilih Modul", desc: "Pilih modul AI sesuai ilmu yang ingin dipelajari", icon: "📚" },
              { step: "03", title: "Mulai Belajar", desc: "Tanya jawab dengan AI atau setorkan hafalan", icon: "🚀" },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-300 to-transparent" />
                )}
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <span className="text-emerald-500 font-bold text-sm">{item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Testimoni
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata <span className="gradient-text">Pengguna Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-8 bg-white rounded-3xl shadow-lg shadow-gray-100/50 card-hover"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-amber-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crowdfunding Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              💝 Crowdfunding
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bantu Bangun <span className="gradient-text-gold">Pusat Islam</span> di Blitar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              100% donasi Anda akan disalurkan untuk pembangunan pondok pesantren, masjid, dan TPQ di Blitar, Jawa Timur
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {crowdfunding.map((project) => {
              const percentage = Math.round((project.current / project.target) * 100);
              return (
                <div key={project.name} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100/50 card-hover">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-white">{project.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-emerald-600">{percentage}% tercapai</span>
                      <span className="text-gray-500">Rp {project.current}jt / {project.target}jt</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <Link href="/pricing" className="block mt-4">
                      <Button variant="outline" className="w-full">
                        Donasi Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg h-14 px-8">
                Lihat Semua Proyek
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Siap Memulai Perjalanan<br />Menuntut Ilmu?
          </h2>
          <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan Muslim lainnya yang sudah belajar Islam dengan ILMUNA.
            Gratis selamanya, upgrade kapan saja.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl text-lg h-14 px-10">
                Daftar Gratis Sekarang
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-lg h-14 px-10">
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
