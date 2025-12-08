"use client";

import Link from "next/link";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const sections = [
  {
    id: 1,
    title: "Penerimaan Syarat",
    content: "Dengan mengakses dan menggunakan platform ILMUNA, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian apapun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.",
  },
  {
    id: 2,
    title: "Deskripsi Layanan",
    content: "ILMUNA adalah platform pendidikan Islam berbasis AI yang menyediakan:",
    list: [
      "Konsultasi dengan AI tentang ilmu Islam (tafsir, hadits, fiqih, dll)",
      "Program hafalan Al-Quran dengan evaluasi AI",
      "Modul pembelajaran berbagai cabang ilmu Islam",
      "Crowdfunding untuk pembangunan pusat Islam",
    ],
  },
  {
    id: 3,
    title: "Akun Pengguna",
    content: "Untuk menggunakan layanan kami, Anda harus membuat akun dengan informasi yang akurat dan lengkap. Anda bertanggung jawab untuk menjaga keamanan akun dan password Anda. Segala aktivitas yang terjadi di akun Anda adalah tanggung jawab Anda sepenuhnya.",
  },
  {
    id: 4,
    title: "Penggunaan yang Dilarang",
    content: "Anda dilarang keras untuk:",
    list: [
      "Menyebarkan konten yang bertentangan dengan ajaran Islam",
      "Menggunakan platform untuk tujuan ilegal atau kriminal",
      "Mencoba meretas atau mengganggu sistem keamanan",
      "Membuat akun palsu atau melakukan spam",
      "Menyalahgunakan fitur AI untuk tujuan yang tidak pantas",
      "Menyebarkan informasi palsu atau menyesatkan",
    ],
    isWarning: true,
  },
  {
    id: 5,
    title: "Donasi & Pembayaran",
    content: "Donasi yang diberikan bersifat sukarela dan TIDAK DAPAT DIKEMBALIKAN. 100% donasi akan disalurkan untuk pembangunan pusat Islam di Blitar sesuai yang dijanjikan. Sebagai ucapan terima kasih, donatur akan mendapatkan akses premium sesuai tier donasi yang berlaku selamanya.",
  },
  {
    id: 6,
    title: "Batasan AI",
    content: "AI ILMUNA dirancang untuk memberikan informasi pendidikan berdasarkan sumber-sumber Islam yang terpercaya (kitab tafsir, hadits shahih, dll). Namun, AI DAPAT MEMBUAT KESALAHAN. Untuk masalah fiqih yang kompleks atau fatwa, pengguna WAJIB berkonsultasi dengan ulama yang kompeten.",
    isWarning: true,
  },
  {
    id: 7,
    title: "Hak Kekayaan Intelektual",
    content: "Seluruh konten di platform ILMUNA, termasuk teks, grafis, logo, dan perangkat lunak, adalah milik ILMUNA atau pemberi lisensi kami. Konten Al-Quran dan Hadits bersifat publik dan dapat digunakan untuk tujuan pendidikan non-komersial.",
  },
  {
    id: 8,
    title: "Penghentian Layanan",
    content: "Kami berhak untuk menangguhkan atau menghentikan akun Anda tanpa pemberitahuan sebelumnya jika terdeteksi pelanggaran terhadap syarat dan ketentuan ini. Keputusan penghentian bersifat final dan tidak dapat diganggu gugat.",
  },
  {
    id: 9,
    title: "Perubahan Syarat",
    content: "Kami dapat mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan signifikan akan diumumkan melalui email atau notifikasi di platform dan berlaku segera setelah diposting.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-6">
              📜 Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-gray-400">
              Terakhir diperbarui: Desember 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Summary */}
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 mb-12">
              <p className="text-emerald-800">
                <strong>📋 Ringkasan:</strong> Dengan menggunakan ILMUNA, Anda setuju untuk menggunakan
                platform secara bertanggung jawab sesuai nilai-nilai Islam. Donasi bersifat sukarela
                dan tidak dapat dikembalikan, serta 100% disalurkan untuk pembangunan pusat Islam.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.id} className="group">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      section.isWarning 
                        ? "bg-red-100 text-red-600" 
                        : "bg-emerald-100 text-emerald-600"
                    } font-bold`}>
                      {section.id}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                      {section.list && (
                        <ul className="mt-4 space-y-2">
                          {section.list.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className={section.isWarning ? "text-red-500" : "text-emerald-500"}>
                                {section.isWarning ? "✗" : "✓"}
                              </span>
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📧 Hubungi Kami
              </h2>
              <p className="text-gray-600 mb-4">
                Jika ada pertanyaan tentang syarat dan ketentuan ini, silakan hubungi:
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-emerald-500">📧</span>
                  <a href="mailto:pendtiumpraz@gmail.com" className="text-emerald-600 hover:underline">
                    pendtiumpraz@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-500">📱</span>
                  <a href="https://wa.me/6281319504441" className="text-emerald-600 hover:underline">
                    +62 813-1950-4441
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-12 mt-12 border-t">
              <Link href="/privacy" className="text-emerald-600 hover:underline flex items-center gap-2">
                ← Kebijakan Privasi
              </Link>
              <Link href="/contact" className="text-emerald-600 hover:underline flex items-center gap-2">
                Hubungi Kami →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
