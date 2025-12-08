import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ILMUNA - Platform Pendidikan Islam Berbasis AI",
    template: "%s | ILMUNA",
  },
  description: "Platform pendidikan Islam #1 di Indonesia dengan AI. Belajar Al-Quran, Hadits, Fiqih, dan ilmu Islam lainnya dengan mudah dan interaktif.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
