"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const tiers = [
  {
    name: "FREE",
    price: "Gratis",
    description: "Mulai perjalanan belajar Islam Anda",
    features: [
      "10 chat/hari dengan AI",
      "5 setoran hafalan/hari",
      "Juz 30 (37 surah) + Ayat Kursi",
      "Semua 13 modul AI dasar",
      "Riwayat chat 7 hari",
    ],
    notIncluded: [
      "Modul AI premium",
      "Prioritas support",
    ],
    cta: "Mulai Gratis",
    href: "/login",
    popular: false,
    gradient: "from-gray-600 to-gray-700",
    bg: "bg-white",
  },
  {
    name: "BRONZE",
    price: "Rp 50.000",
    period: "sekali bayar",
    description: "Akses lebih banyak konten",
    features: [
      "30 chat/hari dengan AI",
      "15 setoran hafalan/hari",
      "Juz 29-30 (48 surah)",
      "Semua modul AI",
      "Riwayat chat 30 hari",
      "Badge donatur bronze",
    ],
    notIncluded: [
      "Prioritas support VIP",
    ],
    cta: "Donasi Bronze",
    href: "/donate?tier=bronze",
    popular: false,
    gradient: "from-amber-600 to-orange-600",
    bg: "bg-white",
  },
  {
    name: "SILVER",
    price: "Rp 150.000",
    period: "sekali bayar",
    description: "Untuk penghafal serius",
    features: [
      "100 chat/hari dengan AI",
      "50 setoran hafalan/hari",
      "Juz 26-30 (69 surah)",
      "Semua modul AI",
      "Riwayat chat 90 hari",
      "Prioritas support",
      "Badge donatur silver",
    ],
    notIncluded: [],
    cta: "Donasi Silver",
    href: "/donate?tier=silver",
    popular: true,
    gradient: "from-slate-500 to-slate-700",
    bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
  },
  {
    name: "GOLD",
    price: "Rp 500.000",
    period: "sekali bayar",
    description: "Akses penuh selamanya",
    features: [
      "Unlimited chat dengan AI",
      "Unlimited setoran hafalan",
      "Semua 114 surah (30 Juz)",
      "Semua modul AI premium",
      "Riwayat chat selamanya",
      "Prioritas support VIP",
      "Badge donatur gold",
      "Nama di Hall of Fame",
    ],
    notIncluded: [],
    cta: "Donasi Gold",
    href: "/donate?tier=gold",
    popular: false,
    gradient: "from-yellow-500 to-amber-600",
    bg: "bg-white",
  },
];

const crowdfunding = [
  { 
    name: "Pondok Pesantren Al-Hikmah", 
    desc: "Pembangunan asrama santri kapasitas 100 orang",
    target: 50000000, 
    current: 25000000, 
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&h=400&fit=crop",
    donors: 127
  },
  { 
    name: "Masjid Nurul Iman", 
    desc: "Renovasi dan perluasan area sholat",
    target: 30000000, 
    current: 12000000, 
    image: "https://images.unsplash.com/photo-1545167496-c1e092d383a2?w=600&h=400&fit=crop",
    donors: 89
  },
  { 
    name: "TPQ Al-Falah", 
    desc: "Pembangunan gedung baru untuk 200 santri",
    target: 20000000, 
    current: 8000000, 
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    donors: 56
  },
  { 
    name: "Panti Asuhan Yatim Piatu", 
    desc: "Biaya operasional dan pendidikan anak yatim",
    target: 40000000, 
    current: 18000000, 
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    donors: 203
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float delay-300" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-200 text-sm mb-6 animate-slide-down">
              <span className="text-lg">💝</span>
              100% Donasi Disalurkan untuk Pembangunan
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Donasi & Dapatkan{" "}
              <span className="relative">
                <span className="relative z-10">Akses Premium</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-400/30 -z-10" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 animate-slide-up delay-100">
              Setiap rupiah donasi Anda membantu pembangunan pusat-pusat Islam di Blitar.
              Sebagai terima kasih, nikmati akses premium ILMUNA selamanya.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  tier.popular 
                    ? "ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/20 scale-105 z-10" 
                    : "shadow-xl shadow-gray-200/50"
                } ${tier.bg}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center py-2 text-sm font-medium">
                    ⭐ PALING POPULER
                  </div>
                )}
                
                <div className={`p-8 ${tier.popular ? "pt-14" : ""}`}>
                  {/* Header */}
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tier.gradient} mb-4`}>
                    {tier.name}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    {tier.period && (
                      <span className="text-gray-500 text-sm ml-2">/{tier.period}</span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-emerald-600 text-xs">✓</span>
                        </span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {tier.notIncluded.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm opacity-50">
                        <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-gray-400 text-xs">✗</span>
                        </span>
                        <span className="text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={tier.href} className="block">
                    <Button
                      className={`w-full h-12 text-base font-semibold ${
                        tier.popular
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30"
                          : tier.name === "GOLD"
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-lg shadow-amber-500/30"
                          : ""
                      }`}
                      variant={tier.popular || tier.name === "GOLD" ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crowdfunding Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              🕌 Proyek Crowdfunding
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bantu Bangun <span className="gradient-text-gold">Pusat Islam</span> di Blitar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih proyek yang ingin Anda dukung. Semua donasi 100% disalurkan tanpa potongan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {crowdfunding.map((project) => {
              const percentage = Math.round((project.current / project.target) * 100);
              return (
                <div 
                  key={project.name} 
                  className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100/50 hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-2/5 h-48 md:h-auto">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{project.desc}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-emerald-600">{percentage}%</span>
                          <span className="text-gray-500">{project.donors} donatur</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>Rp {(project.current / 1000000).toFixed(0)} jt terkumpul</span>
                          <span>Target Rp {(project.target / 1000000).toFixed(0)} jt</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                        Donasi untuk Proyek Ini
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Kenapa Donasi di ILMUNA?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🔒", title: "Aman & Terenkripsi", desc: "Transaksi dilindungi enkripsi SSL" },
              { icon: "📊", title: "100% Transparan", desc: "Laporan penggunaan dana setiap bulan" },
              { icon: "💯", title: "Tanpa Potongan", desc: "Semua donasi langsung ke proyek" },
              { icon: "🎁", title: "Bonus Premium", desc: "Akses fitur premium selamanya" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 border-t bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 mb-6 font-medium">Metode Pembayaran</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {["QRIS", "Bank Transfer", "GoPay", "OVO", "DANA", "ShopeePay", "Kitabisa"].map((method) => (
              <div key={method} className="px-4 py-2 bg-white rounded-lg shadow-sm text-gray-600 font-medium">
                {method}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Pertanyaan Umum
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Apakah donasi bisa dikembalikan?", a: "Donasi bersifat sukarela dan tidak dapat dikembalikan. Namun, akses premium Anda berlaku selamanya." },
              { q: "Bagaimana cara mendapat akses premium?", a: "Setelah donasi terverifikasi, akun Anda otomatis di-upgrade ke tier sesuai jumlah donasi dalam 1x24 jam." },
              { q: "Apakah ada bukti penyaluran donasi?", a: "Ya, kami menerbitkan laporan penyaluran donasi setiap bulan yang bisa diakses di website." },
              { q: "Bisakah donasi untuk proyek tertentu?", a: "Tentu! Pilih proyek yang ingin Anda dukung saat melakukan donasi." },
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
