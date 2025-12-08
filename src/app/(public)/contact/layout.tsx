import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi tim ILMUNA. Email, WhatsApp, dan informasi kontak lainnya.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
