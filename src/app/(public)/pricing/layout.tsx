import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donasi & Harga",
  description: "Donasi untuk pembangunan pusat Islam dan dapatkan akses premium ILMUNA. 100% donasi disalurkan.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
