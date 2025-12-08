"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalModules: number;
  totalDonations: number;
  donationCount: number;
  totalChats: number;
  totalHafalan: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  tier: string;
  role: string;
  createdAt: string;
}

interface TierDistribution {
  tier: string;
  count: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [tierDistribution, setTierDistribution] = useState<TierDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data.stats);
        setRecentUsers(data.recentUsers);
        setTierDistribution(data.tierDistribution);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-800 rounded w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      title: "Total Users", 
      value: stats?.totalUsers || 0, 
      icon: "👥", 
      color: "from-blue-500 to-indigo-600",
      subtitle: `${stats?.activeUsers || 0} active this week`
    },
    { 
      title: "AI Modules", 
      value: stats?.totalModules || 0, 
      icon: "🤖", 
      color: "from-emerald-500 to-teal-600",
      subtitle: "Active modules"
    },
    { 
      title: "Total Donations", 
      value: formatCurrency(stats?.totalDonations || 0), 
      icon: "💰", 
      color: "from-amber-500 to-orange-600",
      subtitle: `${stats?.donationCount || 0} transactions`
    },
    { 
      title: "Chat Sessions", 
      value: stats?.totalChats || 0, 
      icon: "💬", 
      color: "from-purple-500 to-pink-600",
      subtitle: "Total conversations"
    },
  ];

  const tierColors: Record<string, string> = {
    FREE: "bg-gray-600",
    BRONZE: "bg-amber-600",
    SILVER: "bg-slate-400",
    GOLD: "bg-yellow-500",
    PATRON: "bg-purple-500",
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Overview platform ILMUNA
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-3 bg-gray-800 rounded-xl">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-400">{user.name[0]}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{user.name}</p>
                    <p className="text-sm text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full text-white ${tierColors[user.tier] || "bg-gray-600"}`}>
                      {user.tier}
                    </span>
                    {user.role !== "USER" && (
                      <span className="block mt-1 text-xs text-red-400">{user.role}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tier Distribution */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Tier Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tierDistribution.map((tier) => {
                const total = tierDistribution.reduce((acc, t) => acc + t.count, 0);
                const percentage = total > 0 ? Math.round((tier.count / total) * 100) : 0;
                return (
                  <div key={tier.tier}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${tierColors[tier.tier] || "bg-gray-600"}`} />
                        <span className="text-gray-300">{tier.tier}</span>
                      </div>
                      <span className="text-white font-medium">{tier.count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${tierColors[tier.tier] || "bg-gray-600"}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-400">{stats?.totalHafalan || 0}</p>
                  <p className="text-sm text-gray-400 mt-1">Total Setoran</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-xl text-center">
                  <p className="text-3xl font-bold text-emerald-400">{stats?.activeUsers || 0}</p>
                  <p className="text-sm text-gray-400 mt-1">Active Users</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800 mt-6">
        <CardHeader>
          <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "View Users", href: "/admin/users", icon: "👥" },
              { title: "View Modules", href: "/admin/modules", icon: "🤖" },
              { title: "View Donations", href: "/admin/donations", icon: "💰" },
              { title: "View Trash", href: "/admin/trash", icon: "🗑️" },
            ].map((action) => (
              <a
                key={action.title}
                href={action.href}
                className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-center group"
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <span className="text-gray-300 text-sm">{action.title}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
