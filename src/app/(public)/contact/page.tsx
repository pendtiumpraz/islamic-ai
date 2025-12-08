import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "pendtiumpraz@gmail.com",
    href: "mailto:pendtiumpraz@gmail.com",
    description: "Respons dalam 24 jam",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+62 813-1950-4441",
    href: "https://wa.me/6281319504441",
    description: "Chat langsung dengan tim",
  },
  {
    icon: "📍",
    label: "Lokasi",
    value: "Blitar, Jawa Timur",
    href: null,
    description: "Indonesia",
  },
];

const faqs = [
  {
    question: "Apakah ILMUNA gratis?",
    answer: "Ya, ILMUNA menyediakan akses gratis dengan batasan tertentu. Untuk akses penuh, Anda bisa berdonasi yang 100% akan disalurkan untuk pembangunan pusat Islam di Blitar.",
  },
  {
    question: "Bagaimana cara berdonasi?",
    answer: "Anda bisa berdonasi melalui halaman Pricing dengan berbagai metode: QRIS, transfer bank, GoPay, OVO, DANA, atau melalui Kitabisa.",
  },
  {
    question: "Apakah AI ILMUNA akurat?",
    answer: "AI ILMUNA dirancang berdasarkan sumber Islam terpercaya. Namun, untuk masalah fiqih kompleks atau fatwa, kami sarankan berkonsultasi dengan ulama.",
  },
  {
    question: "Bagaimana cara menghapus akun?",
    answer: "Hubungi kami melalui email atau WhatsApp untuk permintaan penghapusan akun. Data Anda akan dihapus dalam 7 hari kerja.",
  },
];

export default function ContactPage() {
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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
            alt="Contact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-800/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-emerald-100">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Tim kami siap membantu Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Informasi Kontak
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.label} className="hover:shadow-lg transition">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{info.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-semibold text-emerald-600 hover:underline text-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-gray-900 text-lg">{info.value}</p>
                        )}
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 bg-emerald-50 border-emerald-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-emerald-800 mb-2">⏰ Jam Operasional</h3>
                  <p className="text-emerald-700">
                    Senin - Jumat: 09:00 - 17:00 WIB<br />
                    Sabtu - Minggu: Libur (chat via WhatsApp)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                  <CardDescription>
                    Isi form di bawah dan kami akan membalas secepatnya.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap
                        </label>
                        <Input placeholder="Ahmad Abdullah" className="h-12" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input type="email" placeholder="ahmad@email.com" className="h-12" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subjek
                      </label>
                      <Input placeholder="Tentang apa pesan Anda?" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pesan
                      </label>
                      <textarea
                        className="w-full min-h-[150px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700">
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ❓ Pertanyaan Umum
            </h2>
            <p className="text-gray-600">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=400&fit=crop"
              alt="Blitar, East Java"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm uppercase tracking-wider mb-2 text-emerald-300">Lokasi Kami</p>
              <h3 className="text-3xl font-bold">Blitar, Jawa Timur</h3>
              <p className="text-gray-300 mt-2">Indonesia 🇮🇩</p>
            </div>
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
