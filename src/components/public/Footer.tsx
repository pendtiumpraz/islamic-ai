import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ع</span>
              </div>
              <span className="text-2xl font-bold text-white">ILMUNA</span>
            </Link>
            <p className="text-gray-500 leading-relaxed mb-6">
              Platform pendidikan Islam berbasis AI yang membantu umat Muslim belajar
              Al-Quran, Hadits, dan ilmu Islam dengan mudah.
            </p>
            <div className="flex gap-4">
              {["instagram", "youtube", "twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-sm">📱</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Platform</h4>
            <ul className="space-y-4">
              {[
                { href: "/dashboard/chat", label: "AI Chat Islami" },
                { href: "/dashboard/hafidz", label: "Hafidz Mode" },
                { href: "/pricing", label: "Donasi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Perusahaan</h4>
            <ul className="space-y-4">
              {[
                { href: "/about", label: "Tentang Kami" },
                { href: "/contact", label: "Kontak" },
                { href: "/terms", label: "Syarat & Ketentuan" },
                { href: "/privacy", label: "Kebijakan Privasi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-emerald-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500">📧</span>
                <a href="mailto:pendtiumpraz@gmail.com" className="hover:text-emerald-400 transition-colors">
                  pendtiumpraz@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500">📱</span>
                <a href="https://wa.me/6281319504441" className="hover:text-emerald-400 transition-colors">
                  +62 813-1950-4441
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500">📍</span>
                <span>Blitar, Jawa Timur, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 ILMUNA. Dibuat dengan ❤️ untuk umat Islam.
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Semua sistem berjalan normal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
