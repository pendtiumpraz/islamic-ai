"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const error = searchParams.get("error");

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image & Info */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-600 to-teal-700 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200&h=1600&fit=crop"
            alt="Islamic Education"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 pattern-islamic opacity-10" />
        
        {/* Decorative Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">ع</span>
            </div>
            <span className="text-3xl font-bold">ILMUNA</span>
          </Link>
          
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Belajar Islam dengan<br />Kecerdasan Buatan
          </h1>
          
          <p className="text-lg text-emerald-100 mb-8 max-w-md">
            Platform pendidikan Islam berbasis AI yang membantu Anda memahami
            Al-Quran, Hadits, dan ilmu Islam dengan mudah dan interaktif.
          </p>
          
          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: "💬", text: "13+ Modul AI Spesialis" },
              { icon: "📖", text: "114 Surah Al-Quran" },
              { icon: "🎙️", text: "Hafidz Mode dengan Evaluasi AI" },
              { icon: "✨", text: "Gratis Selamanya" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-emerald-100">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-xl font-arabic leading-loose mb-3" dir="rtl">
              مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ
            </p>
            <p className="text-emerald-200 text-sm">
              &quot;Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah mudahkan baginya jalan menuju surga.&quot;
              <span className="block mt-1 text-emerald-300">— HR. Muslim</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">ع</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">ILMUNA</span>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Assalamu&apos;alaikum! 👋
            </h2>
            <p className="text-gray-600">
              Masuk atau daftar untuk mulai belajar
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">
                {error === "OAuthAccountNotLinked"
                  ? "Email sudah terdaftar dengan metode login lain."
                  : "Terjadi kesalahan. Silakan coba lagi."}
              </p>
            </div>
          )}

          {/* Login Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50">
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-14 text-base font-medium border-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Lanjutkan dengan Google
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Login & Register dalam 1 klik
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-medium text-emerald-800 mb-1">Aman & Cepat</p>
                  <p className="text-sm text-emerald-600">
                    Kami menggunakan Google OAuth untuk keamanan maksimal. 
                    Tidak ada password yang disimpan.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              {[
                "Akses gratis ke 13+ modul AI",
                "Setoran hafalan dengan evaluasi AI",
                "Progress tersimpan di cloud",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 text-xs">✓</span>
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Dengan melanjutkan, Anda menyetujui{" "}
            <Link href="/terms" className="text-emerald-600 hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="text-emerald-600 hover:underline">
              Kebijakan Privasi
            </Link>
          </p>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors"
            >
              <span>←</span>
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">ع</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
