import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali ILMUNA - Platform pendidikan Islam berbasis AI. Visi, misi, dan tim di balik ILMUNA.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
