import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
          Kebijakan Privasi
        </h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-500 mb-8">
            Terakhir diperbarui: Desember 2024
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Pendahuluan</h2>
            <p className="text-gray-600">
              ILMUNA berkomitmen untuk melindungi privasi pengguna. Kebijakan privasi ini
              menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
              pribadi Anda saat menggunakan platform kami.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Informasi yang Kami Kumpulkan</h2>
            <p className="text-gray-600">Kami mengumpulkan informasi berikut:</p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li><strong>Informasi Akun:</strong> Nama, email, foto profil (dari Google OAuth)</li>
              <li><strong>Data Penggunaan:</strong> Riwayat chat, setoran hafalan, progress belajar</li>
              <li><strong>Informasi Teknis:</strong> Alamat IP, jenis browser, perangkat</li>
              <li><strong>Informasi Donasi:</strong> Jumlah donasi, metode pembayaran (tanpa detail kartu)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Penggunaan Informasi</h2>
            <p className="text-gray-600">Informasi Anda digunakan untuk:</p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Menyediakan dan meningkatkan layanan</li>
              <li>Personalisasi pengalaman belajar</li>
              <li>Mengirim notifikasi terkait layanan</li>
              <li>Memproses donasi dan memberikan akses premium</li>
              <li>Menganalisis penggunaan untuk peningkatan platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Penyimpanan Data</h2>
            <p className="text-gray-600">
              Data Anda disimpan di server yang aman dengan enkripsi. Kami menggunakan layanan
              cloud terpercaya (Vercel, Neon Database) yang memenuhi standar keamanan industri.
              Data chat dan hafalan disimpan sesuai dengan tier akun Anda.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Berbagi Informasi</h2>
            <p className="text-gray-600">
              Kami <strong>tidak menjual</strong> informasi pribadi Anda. Informasi hanya dibagikan dengan:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Penyedia layanan pihak ketiga yang membantu operasional (payment gateway)</li>
              <li>Otoritas hukum jika diwajibkan oleh hukum</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Keamanan Data</h2>
            <p className="text-gray-600">
              Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Enkripsi data dalam transit (HTTPS)</li>
              <li>Enkripsi data tersimpan</li>
              <li>Autentikasi aman via Google OAuth</li>
              <li>Pembatasan akses internal</li>
              <li>Monitoring keamanan rutin</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Hak Pengguna</h2>
            <p className="text-gray-600">Anda memiliki hak untuk:</p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Mengakses data pribadi Anda</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan akun dan data</li>
              <li>Mengunduh data Anda (data portability)</li>
            </ul>
            <p className="text-gray-600 mt-2">
              Untuk menggunakan hak-hak ini, silakan hubungi kami melalui email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookie</h2>
            <p className="text-gray-600">
              Kami menggunakan cookie untuk autentikasi dan preferensi pengguna. Cookie esensial
              diperlukan untuk fungsi dasar platform. Anda dapat mengatur browser untuk menolak
              cookie, namun ini mungkin mempengaruhi fungsionalitas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Anak-anak</h2>
            <p className="text-gray-600">
              ILMUNA dapat digunakan oleh anak-anak di bawah pengawasan orang tua. Kami tidak
              secara sengaja mengumpulkan data dari anak di bawah 13 tahun tanpa persetujuan
              orang tua.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Perubahan Kebijakan</h2>
            <p className="text-gray-600">
              Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan
              akan diberitahukan melalui email atau notifikasi di platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Kontak</h2>
            <p className="text-gray-600">
              Untuk pertanyaan tentang privasi, hubungi kami di:
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
            <Link href="/terms" className="hover:text-emerald-600">Syarat & Ketentuan</Link>
            <Link href="/contact" className="hover:text-emerald-600">Kontak</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
