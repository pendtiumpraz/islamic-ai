import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            ILMUNA
          </Link>
          <Link href="/login">
            <Button>Masuk</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Syarat & Ketentuan
        </h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-500 mb-8">
            Terakhir diperbarui: Desember 2024
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Penerimaan Syarat</h2>
            <p className="text-gray-600">
              Dengan mengakses dan menggunakan platform ILMUNA, Anda menyetujui untuk terikat
              oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian apapun dari
              syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Deskripsi Layanan</h2>
            <p className="text-gray-600">
              ILMUNA adalah platform pendidikan Islam berbasis AI yang menyediakan:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Konsultasi dengan AI tentang ilmu Islam</li>
              <li>Program hafalan Al-Quran dengan evaluasi AI</li>
              <li>Modul pembelajaran berbagai cabang ilmu Islam</li>
              <li>Crowdfunding untuk pembangunan pusat Islam</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Akun Pengguna</h2>
            <p className="text-gray-600">
              Untuk menggunakan layanan kami, Anda harus membuat akun dengan informasi yang
              akurat dan lengkap. Anda bertanggung jawab untuk menjaga keamanan akun dan
              password Anda.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Penggunaan yang Dilarang</h2>
            <p className="text-gray-600">Anda dilarang untuk:</p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Menyebarkan konten yang bertentangan dengan ajaran Islam</li>
              <li>Menggunakan platform untuk tujuan ilegal</li>
              <li>Mencoba meretas atau mengganggu sistem</li>
              <li>Membuat akun palsu atau spam</li>
              <li>Menyalahgunakan fitur AI untuk tujuan yang tidak pantas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Donasi</h2>
            <p className="text-gray-600">
              Donasi yang diberikan bersifat sukarela dan tidak dapat dikembalikan. 100% donasi
              akan disalurkan untuk pembangunan pusat Islam di Blitar sesuai yang dijanjikan.
              Sebagai ucapan terima kasih, donatur akan mendapatkan akses premium sesuai tier donasi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Batasan AI</h2>
            <p className="text-gray-600">
              AI ILMUNA dirancang untuk memberikan informasi pendidikan berdasarkan sumber-sumber
              Islam yang terpercaya. Namun, AI dapat membuat kesalahan. Untuk masalah fiqih yang
              kompleks atau fatwa, pengguna disarankan untuk berkonsultasi dengan ulama yang kompeten.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Hak Kekayaan Intelektual</h2>
            <p className="text-gray-600">
              Seluruh konten di platform ILMUNA, termasuk teks, grafis, logo, dan perangkat lunak,
              adalah milik ILMUNA atau pemberi lisensi kami. Konten Al-Quran dan Hadits bersifat
              publik dan dapat digunakan untuk tujuan pendidikan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Penghentian</h2>
            <p className="text-gray-600">
              Kami berhak untuk menangguhkan atau menghentikan akun Anda jika melanggar syarat
              dan ketentuan ini tanpa pemberitahuan sebelumnya.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Perubahan Syarat</h2>
            <p className="text-gray-600">
              Kami dapat mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan
              diumumkan melalui platform dan berlaku setelah diposting.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Kontak</h2>
            <p className="text-gray-600">
              Jika ada pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:
              <br />
              Email: pendtiumpraz@gmail.com
              <br />
              WhatsApp: +62 813-1950-4441
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 ILMUNA. Platform Pendidikan Islam Berbasis AI.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:text-emerald-600">Kebijakan Privasi</Link>
            <Link href="/contact" className="hover:text-emerald-600">Kontak</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
