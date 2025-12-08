import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
            <Link href="/pricing" className="text-gray-600 hover:text-emerald-600 transition">Donasi</Link>
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-800">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=400&fit=crop"
            alt="Privacy"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-emerald-300 text-sm uppercase tracking-wider mb-2">Legal</p>
            <h1 className="text-4xl font-bold text-white mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-emerald-100">
              Terakhir diperbarui: Desember 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-gray max-w-none">
              
              <section className="mb-10 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-emerald-800 m-0">
                  <strong>🔒 Komitmen Kami:</strong> Kami sangat menghargai privasi Anda. Kami tidak
                  menjual data pribadi Anda kepada pihak ketiga. Data Anda digunakan hanya untuk
                  meningkatkan pengalaman belajar Anda di ILMUNA.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">1</span>
                  Informasi yang Kami Kumpulkan
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">Kami mengumpulkan informasi berikut:</p>
                <div className="grid gap-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-1">👤 Informasi Akun</p>
                    <p className="text-gray-600 text-sm">Nama, email, foto profil (dari Google OAuth)</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-1">📊 Data Penggunaan</p>
                    <p className="text-gray-600 text-sm">Riwayat chat, setoran hafalan, progress belajar</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-1">🔧 Informasi Teknis</p>
                    <p className="text-gray-600 text-sm">Alamat IP, jenis browser, perangkat</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-1">💳 Informasi Donasi</p>
                    <p className="text-gray-600 text-sm">Jumlah donasi, metode pembayaran (tanpa detail kartu)</p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">2</span>
                  Penggunaan Informasi
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">Informasi Anda digunakan untuk:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Menyediakan dan meningkatkan layanan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Personalisasi pengalaman belajar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Mengirim notifikasi terkait layanan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Memproses donasi dan memberikan akses premium
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">3</span>
                  Keamanan Data
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Kami menerapkan langkah-langkah keamanan industri:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="font-semibold text-emerald-800">🔐 Enkripsi HTTPS</p>
                    <p className="text-emerald-700 text-sm">Data dalam transit terenkripsi</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="font-semibold text-emerald-800">🛡️ Database Aman</p>
                    <p className="text-emerald-700 text-sm">Data tersimpan terenkripsi</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="font-semibold text-emerald-800">🔑 OAuth Secure</p>
                    <p className="text-emerald-700 text-sm">Login via Google yang aman</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="font-semibold text-emerald-800">👁️ Monitoring</p>
                    <p className="text-emerald-700 text-sm">Pemantauan keamanan 24/7</p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">4</span>
                  Hak Pengguna
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">Anda memiliki hak untuk:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <strong>Akses:</strong> Melihat data pribadi Anda
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <strong>Koreksi:</strong> Meminta perbaikan data yang tidak akurat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <strong>Hapus:</strong> Meminta penghapusan akun dan data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <strong>Portabilitas:</strong> Mengunduh data Anda
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Untuk menggunakan hak-hak ini, hubungi kami melalui email.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">5</span>
                  Berbagi Informasi
                </h2>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-4">
                  <p className="text-red-800 font-semibold">
                    ❌ Kami TIDAK menjual informasi pribadi Anda
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Informasi hanya dibagikan dengan:
                </p>
                <ul className="space-y-2 text-gray-600 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    Penyedia layanan pihak ketiga (payment gateway) untuk memproses donasi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    Otoritas hukum jika diwajibkan oleh undang-undang
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">6</span>
                  Kontak Privasi
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Untuk pertanyaan tentang privasi, hubungi:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    📧 Email: <a href="mailto:pendtiumpraz@gmail.com" className="text-emerald-600 hover:underline">pendtiumpraz@gmail.com</a><br />
                    📱 WhatsApp: <a href="https://wa.me/6281319504441" className="text-emerald-600 hover:underline">+62 813-1950-4441</a>
                  </p>
                </div>
              </section>

            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t mt-8">
              <Link href="/terms" className="text-emerald-600 hover:underline">
                ← Syarat & Ketentuan
              </Link>
              <Link href="/contact" className="text-emerald-600 hover:underline">
                Hubungi Kami →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 ILMUNA. Platform Pendidikan Islam Berbasis AI.</p>
        </div>
      </footer>
    </div>
  );
}
