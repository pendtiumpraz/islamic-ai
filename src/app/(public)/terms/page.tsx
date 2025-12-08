import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=400&fit=crop"
            alt="Terms"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-emerald-400 text-sm uppercase tracking-wider mb-2">Legal</p>
            <h1 className="text-4xl font-bold text-white mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-gray-300">
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
                  <strong>Ringkasan:</strong> Dengan menggunakan ILMUNA, Anda setuju untuk menggunakan
                  platform secara bertanggung jawab sesuai nilai-nilai Islam. Donasi bersifat sukarela
                  dan tidak dapat dikembalikan.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">1</span>
                  Penerimaan Syarat
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Dengan mengakses dan menggunakan platform ILMUNA, Anda menyetujui untuk terikat
                  oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian apapun dari
                  syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">2</span>
                  Deskripsi Layanan
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ILMUNA adalah platform pendidikan Islam berbasis AI yang menyediakan:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Konsultasi dengan AI tentang ilmu Islam
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Program hafalan Al-Quran dengan evaluasi AI
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Modul pembelajaran berbagai cabang ilmu Islam
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Crowdfunding untuk pembangunan pusat Islam
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">3</span>
                  Akun Pengguna
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Untuk menggunakan layanan kami, Anda harus membuat akun dengan informasi yang
                  akurat dan lengkap. Anda bertanggung jawab untuk menjaga keamanan akun dan
                  password Anda. Segala aktivitas yang terjadi di akun Anda adalah tanggung jawab Anda.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-sm font-bold">4</span>
                  Penggunaan yang Dilarang
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">Anda dilarang untuk:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Menyebarkan konten yang bertentangan dengan ajaran Islam
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Menggunakan platform untuk tujuan ilegal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Mencoba meretas atau mengganggu sistem
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Membuat akun palsu atau spam
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Menyalahgunakan fitur AI untuk tujuan yang tidak pantas
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">5</span>
                  Donasi
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Donasi yang diberikan bersifat sukarela dan <strong>tidak dapat dikembalikan</strong>.
                  100% donasi akan disalurkan untuk pembangunan pusat Islam di Blitar sesuai yang dijanjikan.
                  Sebagai ucapan terima kasih, donatur akan mendapatkan akses premium sesuai tier donasi.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 text-sm font-bold">6</span>
                  Batasan AI
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  AI ILMUNA dirancang untuk memberikan informasi pendidikan berdasarkan sumber-sumber
                  Islam yang terpercaya. Namun, <strong>AI dapat membuat kesalahan</strong>. Untuk
                  masalah fiqih yang kompleks atau fatwa, pengguna disarankan untuk berkonsultasi
                  dengan ulama yang kompeten.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">7</span>
                  Kontak
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Jika ada pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami:
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
              <Link href="/privacy" className="text-emerald-600 hover:underline">
                ← Kebijakan Privasi
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
