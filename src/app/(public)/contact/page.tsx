import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "pendtiumpraz@gmail.com",
    href: "mailto:pendtiumpraz@gmail.com",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+62 813-1950-4441",
    href: "https://wa.me/6281319504441",
  },
  {
    icon: "📍",
    label: "Lokasi",
    value: "Blitar, Jawa Timur, Indonesia",
    href: null,
  },
];

export default function ContactPage() {
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
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan, saran, atau ingin berkolaborasi? Kami senang mendengar dari Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informasi Kontak
            </h2>
            {contactInfo.map((info) => (
              <Card key={info.label}>
                <CardContent className="flex items-center gap-4 py-4">
                  <span className="text-3xl">{info.icon}</span>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium text-emerald-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900">{info.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="py-4">
                <p className="text-emerald-800">
                  <strong>Jam Operasional:</strong><br />
                  Senin - Jumat: 09:00 - 17:00 WIB<br />
                  Sabtu - Minggu: Libur
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>
                Isi form di bawah dan kami akan membalas secepatnya.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <Input placeholder="Nama lengkap Anda" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input type="email" placeholder="email@contoh.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjek
                  </label>
                  <Input placeholder="Tentang apa pesan Anda?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="py-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Apakah ILMUNA gratis?
                </h3>
                <p className="text-gray-600">
                  Ya, ILMUNA menyediakan akses gratis dengan batasan tertentu. Untuk akses penuh,
                  Anda bisa berdonasi yang 100% akan disalurkan untuk pembangunan pusat Islam di Blitar.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bagaimana cara berdonasi?
                </h3>
                <p className="text-gray-600">
                  Anda bisa berdonasi melalui halaman Pricing dengan berbagai metode pembayaran:
                  QRIS, transfer bank, GoPay, OVO, atau melalui Kitabisa.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Apakah AI ILMUNA akurat?
                </h3>
                <p className="text-gray-600">
                  AI ILMUNA dirancang untuk memberikan informasi berdasarkan sumber-sumber Islam
                  yang terpercaya. Namun, untuk masalah fiqih yang kompleks, kami sarankan untuk
                  berkonsultasi dengan ulama.
                </p>
              </CardContent>
            </Card>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
