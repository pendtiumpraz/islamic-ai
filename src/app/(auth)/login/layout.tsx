import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke ILMUNA untuk mulai belajar Islam dengan AI.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
