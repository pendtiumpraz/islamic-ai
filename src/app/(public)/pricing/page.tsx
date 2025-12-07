import Link from "next/link";
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
  },
  {
    name: "BRONZE",
    price: "Rp 50.000",
    period: "donasi minimal",
    description: "Akses lebih banyak fitur",
    features: [
      "30 chat/hari dengan AI",
      "15 setoran hafalan/hari",
      "Juz 29-30 (48 surah)",
      "Semua modul AI",
      "Riwayat chat 30 hari",
      "Prioritas support",
    ],
    cta: "Donasi Sekarang",
    href: "/donate?tier=bronze",
    popular: false,
  },
  {
    name: "SILVER",
    price: "Rp 150.000",
    period: "donasi minimal",
    description: "Untuk penghafal serius",
    features: [
      "100 chat/hari dengan AI",
      "50 setoran hafalan/hari",
      "Juz 26-30 (69 surah)",
      "Semua modul AI",
      "Riwayat chat 90 hari",
      "Prioritas support",
      "Badge donatur",
    ],
    cta: "Donasi Sekarang",
    href: "/donate?tier=silver",
    popular: true,
  },
  {
    name: "GOLD",
    price: "Rp 500.000",
    period: "donasi minimal",
    description: "Akses penuh selamanya",
    features: [
      "Unlimited chat dengan AI",
      "Unlimited setoran hafalan",
      "Semua 114 surah (30 Juz)",
      "Semua modul AI",
      "Riwayat chat selamanya",
      "Prioritas support",
      "Badge donatur emas",
      "Nama di halaman donatur",
    ],
    cta: "Donasi Sekarang",
    href: "/donate?tier=gold",
    popular: false,
  },
];

const crowdfunding = [
  { name: "Pondok Pesantren Al-Hikmah Blitar", target: 50000000, current: 12500000 },
  { name: "Masjid Nurul Iman Blitar", target: 30000000, current: 8000000 },
  { name: "TPQ Al-Falah Blitar", target: 20000000, current: 5000000 },
  { name: "Yayasan Yatim Piatu Blitar", target: 40000000, current: 15000000 },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            ILMUNA
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-gray-600 hover:text-emerald-600">
              Tentang
            </Link>
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Donasi & Dapatkan Akses Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            100% donasi Anda akan disalurkan untuk pembangunan 6 pusat Islam di Blitar.
            Sebagai terima kasih, Anda mendapat akses premium ILMUNA.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${tier.popular ? "border-emerald-500 border-2 shadow-lg" : ""}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500">
                  Populer
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-gray-500 text-sm ml-1">/{tier.period}</span>
                  )}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href}>
                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Crowdfunding */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            🕌 Crowdfunding Pusat Islam Blitar
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Donasi Anda membantu pembangunan 6 pusat Islam di Blitar, Jawa Timur
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {crowdfunding.map((project) => {
              const percentage = Math.round((project.current / project.target) * 100);
              return (
                <div key={project.name} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-emerald-500 h-3 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 font-medium">
                      Rp {project.current.toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-500">
                      dari Rp {project.target.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/donate">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Donasi Sekarang
              </Button>
            </Link>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Metode Pembayaran
          </h3>
          <div className="flex justify-center gap-8 text-gray-500">
            <span>QRIS</span>
            <span>Bank Transfer</span>
            <span>Kitabisa</span>
            <span>GoPay</span>
            <span>OVO</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 ILMUNA. Platform Pendidikan Islam Berbasis AI.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/terms" className="hover:text-emerald-600">Syarat & Ketentuan</Link>
            <Link href="/privacy" className="hover:text-emerald-600">Kebijakan Privasi</Link>
            <Link href="/contact" className="hover:text-emerald-600">Kontak</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
