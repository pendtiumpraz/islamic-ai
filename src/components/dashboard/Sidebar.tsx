"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
    exact: true,
  },
  {
    title: "AI Chat",
    href: "/dashboard/chat",
    icon: "💬",
  },
  {
    title: "Hafidz Mode",
    href: "/dashboard/hafidz",
    icon: "📖",
  },
  {
    title: "Write Mode",
    href: "/dashboard/write",
    icon: "✍️",
    soon: true,
  },
];

const accountNavItems = [
  {
    title: "Profil Saya",
    href: "/dashboard/profile",
    icon: "👤",
  },
  {
    title: "Pengaturan",
    href: "/dashboard/settings",
    icon: "⚙️",
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const tierColors = {
    FREE: "bg-gray-100 text-gray-700",
    BRONZE: "bg-amber-100 text-amber-700",
    SILVER: "bg-slate-200 text-slate-700",
    GOLD: "bg-yellow-100 text-yellow-700",
    PATRON: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-white font-bold text-lg">ع</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ILMUNA</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 mx-4 mt-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-bold">
                {user?.name?.[0] || "U"}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user?.name || "Guest"}
            </p>
            <Badge className={`text-xs ${tierColors[user?.tier || "FREE"]}`}>
              {user?.tier || "FREE"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Menu Utama
        </p>
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.soon ? "#" : item.href}
            onClick={item.soon ? (e) => e.preventDefault() : onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              isActive(item.href, item.exact)
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : item.soon
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
            {item.soon && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Segera
              </Badge>
            )}
          </Link>
        ))}

        <div className="pt-6">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Akun
          </p>
          {accountNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Upgrade Banner */}
      {user?.tier === "FREE" && (
        <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
          <p className="text-sm font-medium text-amber-800 mb-2">
            🌟 Upgrade ke Premium
          </p>
          <p className="text-xs text-amber-600 mb-3">
            Akses unlimited chat & hafalan
          </p>
          <Link href="/pricing">
            <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Lihat Paket
            </Button>
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <span className="mr-3">🚪</span>
          Keluar
        </Button>
      </div>
    </div>
  );
}
