import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "FREE",
    price: "Gratis",
    description: "Mulai belajar Islam dengan AI",
    features: [
      "10 chat/hari dengan AI",
      "5 setoran hafalan/hari",
      "Juz 30 (37 surah) + Ayat Kursi",
      "13 modul AI dasar",
      "Riwayat chat 7 hari",
    ],
    cta: "Mulai Gratis",
    href: "/login",
    popular: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "BRONZE",
    price: "Rp 50K",
    period: "donasi",
    description: "Akses lebih banyak fitur",
    features: [
      "30 chat/hari dengan AI",
      "15 setoran hafalan/hari",
      "Juz 29-30 (48 surah)",
      "Semua modul AI",
      "Riwayat chat 30 hari",
      "Badge donatur",
    ],
    cta: "Donasi Sekarang",
    href: "/donate?tier=bronze",
    popular: false,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "SILVER",
    price: "Rp 150K",
    period: "donasi",
    description: "Untuk penghafal serius",
    features: [
      "100 chat/hari dengan AI",
      "50 setoran hafalan/hari",
      "Juz 26-30 (69 surah)",
      "Semua modul AI",
      "Riwayat chat 90 hari",
      "Prioritas support",
      "Badge donatur perak",
    ],
    cta: "Donasi Sekarang",
    href: "/donate?tier=silver",
    popular: true,
    gradient: "from-slate-400 to-slate-600",
  },
  {
    name: "GOLD",
    price: "Rp 500K",
    period: "donasi",
    description: "Akses penuh selamanya",
    features: [
      "Unlimited chat dengan AI",
      "Unlimited setoran hafalan",
      "Semua 114 surah (30 Juz)",
      "Semua modul AI",
      "Riwayat chat selamanya",
      "Prioritas support VIP",
      "Badge donatur emas",
      "Nama di hall of fame",
    ],
    cta: "Donasi Sekarang",
    href: "/donate?tier=gold",
    popular: false,
    gradient: "from-yellow-400 to-amber-500",
  },
];

const crowdfunding = [
  { name: "Pondok Pesantren Al-Hikmah", target: 50000000, current: 12500000, image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400&h=300&fit=crop" },
  { name: "Masjid Nurul Iman", target: 30000000, current: 8000000, image: "https://images.unsplash.com/photo-1545167496-c1e092d383a2?w=400&h=300&fit=crop" },
  { name: "TPQ Al-Falah", target: 20000000, current: 5000000, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
  { name: "Panti Asuhan Yatim", target: 40000000, current: 15000000, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            ILMUNA
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition">Tentang</Link>
            <Link href="/contact" className="text-gray-600 hover:text-emerald-600 transition">Kontak</Link>
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&h=600&fit=crop"
            alt="Islamic pattern"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              💝 100% Donasi Disalurkan
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Donasi & Dapatkan <span className="text-emerald-600">Akses Premium</span>
            </h1>
            <p className="text-xl text-gray-600">
              Setiap rupiah donasi Anda membantu pembangunan pusat-pusat Islam di Blitar.
              Sebagai terima kasih, nikmati akses premium ILMUNA selamanya.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  tier.popular ? "ring-2 ring-emerald-500 shadow-lg scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                    POPULER
                  </div>
                )}
                <div className={`h-2 bg-gradient-to-r ${tier.gradient}`} />
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && (
                      <span className="text-gray-500 text-sm ml-1">/{tier.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.href} className="block">
                    <Button
                      className={`w-full ${tier.popular ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crowdfunding Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🕌 Proyek Crowdfunding
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bantu kami membangun pusat-pusat Islam di Blitar, Jawa Timur.
              Setiap donasi membawa berkah untuk Anda dan masyarakat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crowdfunding.map((project) => {
              const percentage = Math.round((project.current / project.target) * 100);
              return (
                <Card key={project.name} className="overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-40">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-white text-sm">{project.name}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-emerald-600 font-semibold">{percentage}%</span>
                      <span className="text-gray-500">tercapai</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Rp {(project.current / 1000000).toFixed(1)}jt</span>
                      <span>Target: Rp {(project.target / 1000000).toFixed(0)}jt</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/donate">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8">
                Donasi untuk Semua Proyek
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-600 text-sm">Pembayaran terenkripsi, data Anda aman bersama kami</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparan</h3>
              <p className="text-gray-600 text-sm">Laporan penggunaan donasi dipublikasikan setiap bulan</p>
            </div>
            <div>
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Disalurkan</h3>
              <p className="text-gray-600 text-sm">Tidak ada potongan, semua donasi langsung ke proyek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 mb-4">Metode Pembayaran</p>
          <div className="flex justify-center items-center gap-8 flex-wrap text-gray-400">
            <span className="font-medium">QRIS</span>
            <span className="font-medium">Bank Transfer</span>
            <span className="font-medium">GoPay</span>
            <span className="font-medium">OVO</span>
            <span className="font-medium">DANA</span>
            <span className="font-medium">Kitabisa</span>
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
                <li><Link href="/contact" className="hover:text-emerald-400 transition">Kontak</Link></li>
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
                <li>📍 Blitar, Jawa Timur</li>
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
