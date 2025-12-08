"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login?callbackUrl=/admin");
      return;
    }

    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.status === 401) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [session, status, router]);

  if (status === "loading" || isAdmin === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">⚡</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            Anda tidak memiliki akses ke Admin Panel. Halaman ini hanya untuk Administrator.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Kembali ke Dashboard
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full px-4 py-2 text-gray-400 hover:text-white transition"
            >
              Ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
