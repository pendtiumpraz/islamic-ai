"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    value: "pendtiumpraz@gmail.com",
    href: "mailto:pendtiumpraz@gmail.com",
    desc: "Respons dalam 1x24 jam",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: "📱",
    title: "WhatsApp",
    value: "+62 813-1950-4441",
    href: "https://wa.me/6281319504441",
    desc: "Chat langsung dengan tim",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: "📍",
    title: "Lokasi",
    value: "Blitar, Jawa Timur",
    href: null,
    desc: "Indonesia 🇮🇩",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: "⏰",
    title: "Jam Operasional",
    value: "09:00 - 17:00 WIB",
    href: null,
    desc: "Senin - Jumat",
    color: "from-amber-500 to-orange-500",
  },
];

const faqs = [
  {
    q: "Apakah ILMUNA benar-benar gratis?",
    a: "Ya! ILMUNA menyediakan akses gratis dengan kuota harian. Untuk akses unlimited, Anda bisa berdonasi yang 100% akan disalurkan untuk pembangunan pusat Islam.",
  },
  {
    q: "Bagaimana cara mendaftar?",
    a: "Cukup klik tombol 'Masuk' dan login dengan akun Google Anda. Proses pendaftaran otomatis dan hanya butuh beberapa detik.",
  },
  {
    q: "Apakah AI ILMUNA akurat?",
    a: "AI kami dilatih berdasarkan sumber-sumber Islam yang terpercaya. Namun untuk masalah fiqih kompleks, kami sarankan berkonsultasi dengan ulama.",
  },
  {
    q: "Bagaimana cara berdonasi?",
    a: "Kunjungi halaman Donasi dan pilih tier yang diinginkan. Kami menerima berbagai metode pembayaran termasuk QRIS, transfer bank, dan e-wallet.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Absolut. Kami menggunakan enkripsi tingkat industri dan tidak pernah menjual data pengguna kepada pihak ketiga.",
  },
  {
    q: "Bagaimana cara menghapus akun?",
    a: "Hubungi kami melalui email atau WhatsApp untuk permintaan penghapusan akun. Data akan dihapus dalam 7 hari kerja.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
            alt="Contact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-teal-800/90" />
        </div>
        <div className="absolute inset-0 pattern-islamic opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-emerald-200 text-sm mb-6 animate-slide-down">
              <span>💬</span>
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Ada Pertanyaan?<br />
              <span className="text-emerald-300">Kami Siap Membantu</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 animate-slide-up delay-100">
              Tim support kami selalu siap menjawab pertanyaan dan membantu Anda
              memaksimalkan pengalaman belajar di ILMUNA.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="p-6 bg-white rounded-2xl shadow-xl shadow-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-2xl">{method.icon}</span>
                </div>
                <p className="text-gray-500 text-sm">{method.title}</p>
                {method.href ? (
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-900 hover:text-emerald-600 transition-colors block mt-1"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="font-bold text-gray-900 mt-1">{method.value}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Form */}
            <div className="order-2 lg:order-1">
              <div className="p-10 bg-white rounded-3xl shadow-2xl shadow-gray-100/50 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan</h2>
                <p className="text-gray-600 mb-8">Isi form di bawah dan kami akan membalas secepatnya.</p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <Input
                        placeholder="Ahmad Abdullah"
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="ahmad@email.com"
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjek
                    </label>
                    <Input
                      placeholder="Tentang apa pesan Anda?"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan
                    </label>
                    <textarea
                      className="w-full min-h-[150px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none transition-colors"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30"
                  >
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>

            {/* Info */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                Butuh Bantuan Cepat?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Chat dengan Tim Support Kami
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Untuk respons tercepat, hubungi kami langsung via WhatsApp.
                Tim kami siap membantu menjawab pertanyaan seputar penggunaan
                platform, donasi, atau kendala teknis.
              </p>

              <a
                href="https://wa.me/6281319504441"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
              >
                <span className="text-2xl">📱</span>
                Chat via WhatsApp
              </a>

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-800 mb-3">🕐 Jam Respons</h3>
                <div className="space-y-2 text-emerald-700">
                  <p className="flex justify-between">
                    <span>WhatsApp:</span>
                    <span className="font-semibold">&lt; 1 jam</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-semibold">&lt; 24 jam</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Form Kontak:</span>
                    <span className="font-semibold">&lt; 48 jam</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              ❓ FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600">
              Temukan jawaban untuk pertanyaan umum tentang ILMUNA
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Tidak menemukan jawaban yang dicari?</p>
            <Link href="https://wa.me/6281319504441" target="_blank">
              <Button variant="outline" size="lg">
                Tanya Langsung via WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=500&fit=crop"
              alt="Blitar, East Java"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <div className="max-w-lg">
                <p className="text-emerald-400 font-medium mb-2">📍 Lokasi Kami</p>
                <h3 className="text-4xl font-bold text-white mb-2">Blitar, Jawa Timur</h3>
                <p className="text-gray-300">
                  Kota kecil dengan semangat besar untuk pendidikan Islam.
                  Tempat lahirnya ILMUNA dan 6 proyek crowdfunding kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
