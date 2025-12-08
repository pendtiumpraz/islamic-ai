"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "📊",
    exact: true,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "👥",
  },
  {
    title: "AI Modules",
    href: "/admin/modules",
    icon: "🤖",
  },
  {
    title: "Donations",
    href: "/admin/donations",
    icon: "💰",
  },
  {
    title: "Hafalan",
    href: "/admin/hafalan",
    icon: "📖",
  },
  {
    title: "Trash",
    href: "/admin/trash",
    icon: "🗑️",
  },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <div>
            <span className="text-xl font-bold text-white">ILMUNA</span>
            <Badge className="ml-2 bg-red-500/20 text-red-400 text-xs">Admin</Badge>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 mx-4 mt-4 bg-gray-800 rounded-xl">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "Admin"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{user?.name?.[0] || "A"}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Menu Admin
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              isActive(item.href, item.exact)
                ? "bg-red-500/20 text-red-400"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}

        <div className="pt-6">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Lainnya
          </p>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span className="text-xl">🏠</span>
            <span>User Dashboard</span>
          </Link>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span className="text-xl">🌐</span>
            <span>Website</span>
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <span className="mr-3">🚪</span>
          Logout
        </Button>
      </div>
    </div>
  );
}
