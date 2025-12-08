"use client";

import Link from "next/link";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const dataTypes = [
  { icon: "👤", title: "Informasi Akun", desc: "Nama, email, foto profil dari Google OAuth" },
  { icon: "💬", title: "Data Penggunaan", desc: "Riwayat chat, setoran hafalan, progress belajar" },
  { icon: "🔧", title: "Informasi Teknis", desc: "Alamat IP, jenis browser, perangkat" },
  { icon: "💳", title: "Informasi Donasi", desc: "Jumlah donasi, metode pembayaran (tanpa detail kartu)" },
];

const security = [
  { icon: "🔐", title: "Enkripsi HTTPS", desc: "Semua data dalam transit terenkripsi" },
  { icon: "🛡️", title: "Database Aman", desc: "Data tersimpan dengan enkripsi AES-256" },
  { icon: "🔑", title: "OAuth Secure", desc: "Login aman via Google, tanpa password tersimpan" },
  { icon: "👁️", title: "Monitoring 24/7", desc: "Sistem keamanan dipantau terus-menerus" },
];

const rights = [
  { title: "Hak Akses", desc: "Melihat semua data pribadi yang kami simpan" },
  { title: "Hak Koreksi", desc: "Meminta perbaikan data yang tidak akurat" },
  { title: "Hak Hapus", desc: "Meminta penghapusan akun dan semua data" },
  { title: "Hak Portabilitas", desc: "Mengunduh salinan data Anda" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-emerald-900 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-white/10 text-emerald-200 rounded-full text-sm font-medium mb-6">
              🔒 Privasi
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-emerald-100">
              Terakhir diperbarui: Desember 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Commitment */}
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 mb-12">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🔒</span>
                <div>
                  <h2 className="text-xl font-bold text-emerald-800 mb-2">Komitmen Kami</h2>
                  <p className="text-emerald-700">
                    Kami sangat menghargai privasi Anda. <strong>Kami TIDAK menjual data pribadi
                    Anda kepada pihak ketiga.</strong> Data Anda hanya digunakan untuk meningkatkan
                    pengalaman belajar Anda di ILMUNA.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Collection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-sm font-bold">1</span>
                Informasi yang Kami Kumpulkan
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {dataTypes.map((type) => (
                  <div key={type.title} className="p-5 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{type.icon}</span>
                      <h3 className="font-semibold text-gray-900">{type.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Usage */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-sm font-bold">2</span>
                Penggunaan Informasi
              </h2>
              <p className="text-gray-600 mb-4">Informasi Anda digunakan untuk:</p>
              <ul className="space-y-3">
                {[
                  "Menyediakan dan meningkatkan layanan platform",
                  "Personalisasi pengalaman belajar sesuai kebutuhan Anda",
                  "Mengirim notifikasi penting terkait layanan",
                  "Memproses donasi dan memberikan akses premium",
                  "Menganalisis penggunaan untuk peningkatan platform",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-sm font-bold">3</span>
                Keamanan Data
              </h2>
              <p className="text-gray-600 mb-6">
                Kami menerapkan langkah-langkah keamanan tingkat industri untuk melindungi data Anda:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {security.map((item) => (
                  <div key={item.title} className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-semibold text-emerald-800">{item.title}</h3>
                    </div>
                    <p className="text-emerald-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-sm font-bold">4</span>
                Hak Anda
              </h2>
              <p className="text-gray-600 mb-6">Sebagai pengguna, Anda memiliki hak penuh atas data Anda:</p>
              <div className="space-y-4">
                {rights.map((right, i) => (
                  <div key={right.title} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{right.title}</h3>
                      <p className="text-gray-600 text-sm">{right.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Untuk menggunakan hak-hak ini, hubungi kami melalui email atau WhatsApp.
              </p>
            </div>

            {/* No Selling Data */}
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 mb-12">
              <div className="flex items-start gap-4">
                <span className="text-3xl">❌</span>
                <div>
                  <h3 className="font-bold text-red-800 mb-2">Kami TIDAK Menjual Data Anda</h3>
                  <p className="text-red-700">
                    Informasi pribadi Anda tidak pernah dan tidak akan pernah dijual kepada pihak ketiga.
                    Data hanya dibagikan dengan penyedia layanan (seperti payment gateway) yang
                    diperlukan untuk operasional platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-sm font-bold">5</span>
                Cookie & Penyimpanan Lokal
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Kami menggunakan cookie untuk autentikasi dan menyimpan preferensi pengguna.
                Cookie esensial diperlukan untuk fungsi dasar platform. Anda dapat mengatur
                browser untuk menolak cookie, namun ini mungkin mempengaruhi fungsionalitas tertentu.
              </p>
            </div>

            {/* Contact */}
            <div className="p-8 bg-gray-50 rounded-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📧 Pertanyaan tentang Privasi?
              </h2>
              <p className="text-gray-600 mb-4">
                Jika ada pertanyaan atau kekhawatiran tentang privasi Anda, silakan hubungi:
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
              <Link href="/terms" className="text-emerald-600 hover:underline flex items-center gap-2">
                ← Syarat & Ketentuan
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
