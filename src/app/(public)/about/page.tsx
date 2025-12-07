import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Modul AI", value: "13+" },
  { label: "Surah Al-Quran", value: "114" },
  { label: "Hadits Arbain", value: "42" },
  { label: "Pengguna", value: "1000+" },
];

const team = [
  {
    name: "Galih",
    role: "Founder & Developer",
    bio: "Software Engineer dengan passion di pendidikan Islam dan AI.",
  },
];

const supporters = [
  "Pondok Pesantren Al-Hikmah Blitar",
  "Masjid Nurul Iman Blitar",
  "TPQ Al-Falah Blitar",
  "Yayasan Yatim Piatu Blitar",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            ILMUNA
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-600 hover:text-emerald-600">
              Donasi
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
            Tentang ILMUNA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Platform pendidikan Islam berbasis AI untuk membantu umat Muslim
            belajar Al-Quran, Hadits, dan ilmu Islam dengan lebih mudah.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Visi</h2>
              <p className="text-gray-600">
                Menjadi platform pendidikan Islam terdepan yang memanfaatkan
                teknologi AI untuk mempermudah umat Muslim di seluruh dunia
                dalam mempelajari dan mengamalkan ajaran Islam.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Misi</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Menyediakan akses pendidikan Islam berkualitas untuk semua</li>
                <li>• Memanfaatkan AI untuk pembelajaran yang personal</li>
                <li>• Mendukung program hafalan Al-Quran</li>
                <li>• Membangun pusat-pusat Islam di daerah</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            📖 Cerita Kami
          </h2>
          <div className="max-w-3xl mx-auto text-gray-600 space-y-4">
            <p>
              ILMUNA lahir dari keprihatinan terhadap minimnya akses pendidikan
              Islam berkualitas, terutama di daerah-daerah terpencil. Dengan
              memanfaatkan teknologi AI, kami ingin memberikan &quot;ustadz virtual&quot;
              yang bisa diakses kapan saja dan di mana saja.
            </p>
            <p>
              Nama ILMUNA berasal dari bahasa Arab &quot;ilmu&quot; (علم) yang berarti
              pengetahuan, dan &quot;-na&quot; yang berarti &quot;kita&quot;. ILMUNA berarti
              &quot;ilmu kita bersama&quot; - sebuah wadah untuk berbagi dan menimba
              ilmu agama bersama-sama.
            </p>
            <p>
              100% dari donasi yang terkumpul akan disalurkan untuk pembangunan
              6 pusat Islam di Blitar, Jawa Timur - termasuk pondok pesantren,
              masjid, TPQ, dan panti asuhan.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            👥 Tim Kami
          </h2>
          <div className="flex justify-center">
            {team.map((member) => (
              <Card key={member.name} className="max-w-sm">
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supporters */}
        <div className="bg-emerald-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            🤝 Mitra & Pendukung
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supporters.map((supporter) => (
              <div
                key={supporter}
                className="bg-white rounded-lg p-4 text-center text-gray-700"
              >
                {supporter}
              </div>
            ))}
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
