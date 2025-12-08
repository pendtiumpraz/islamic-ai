import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ILMUNA - Platform Pendidikan Islam Berbasis AI",
    template: "%s | ILMUNA",
  },
  description: "Belajar Al-Quran, Hadits, dan Ilmu Islam dengan AI. 36+ modul pembelajaran, setoran hafalan dengan evaluasi AI, dan pembuatan konten Islami.",
  keywords: ["pendidikan islam", "belajar quran", "hafalan quran", "AI islam", "fiqih online", "hadits", "tafsir"],
  authors: [{ name: "ILMUNA Team" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ilmuna.ai",
    siteName: "ILMUNA",
    title: "ILMUNA - Platform Pendidikan Islam Berbasis AI",
    description: "Belajar Al-Quran, Hadits, dan Ilmu Islam dengan AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ILMUNA - Platform Pendidikan Islam Berbasis AI",
    description: "Belajar Al-Quran, Hadits, dan Ilmu Islam dengan AI",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
