/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DeletedUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  tier: string;
  role: string;
  deletedAt: string;
  deletedBy: string | null;
  deleteReason: string | null;
}

interface DeletedModule {
  id: string;
  name: string;
  slug: string;
  category: string;
  deletedAt: string;
}

interface DeletedDonation {
  id: string;
  amount: number;
  donorName: string | null;
  paymentStatus: string;
  deletedAt: string;
  deletedBy: string | null;
  deleteReason: string | null;
}

interface DeletedChat {
  id: string;
  title: string | null;
  deletedAt: string;
  deletedBy: string | null;
  user: { name: string; email: string };
  module: { name: string };
}

interface DeletedHafalan {
  id: string;
  score: number;
  passed: boolean;
  deletedAt: string;
  user: { name: string };
  item: { title: string };
}

interface Stats {
  users: number;
  modules: number;
  donations: number;
  chats: number;
  hafalan: number;
}

type TabType = "users" | "modules" | "donations" | "chats" | "hafalan";

export default function AdminTrashPage() {
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ users: 0, modules: 0, donations: 0, chats: 0, hafalan: 0 });
  const [users, setUsers] = useState<DeletedUser[]>([]);
  const [modules, setModules] = useState<DeletedModule[]>([]);
  const [donations, setDonations] = useState<DeletedDonation[]>([]);
  const [chats, setChats] = useState<DeletedChat[]>([]);
  const [hafalan, setHafalan] = useState<DeletedHafalan[]>([]);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/trash");
      const data = await res.json();
      setStats(data.stats || { users: 0, modules: 0, donations: 0, chats: 0, hafalan: 0 });
      setUsers(data.users || []);
      setModules(data.modules || []);
      setDonations(data.donations || []);
      setChats(data.chats || []);
      setHafalan(data.hafalan || []);
    } catch (error) {
      console.error("Failed to fetch trash:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (type: string, id: string) => {
    try {
      await fetch("/api/admin/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id })
      });
      fetchTrash();
    } catch (error) {
      console.error("Failed to restore:", error);
    }
  };

  const handlePermanentDelete = async (type: string, id: string) => {
    if (!confirm("HAPUS PERMANEN? Data tidak bisa dikembalikan!")) return;
    try {
      await fetch(`/api/admin/trash?type=${type}&id=${id}`, { method: "DELETE" });
      fetchTrash();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
  };

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: "users", label: "Users", icon: "👤" },
    { key: "modules", label: "Modules", icon: "📚" },
    { key: "donations", label: "Donations", icon: "💰" },
    { key: "chats", label: "Chats", icon: "💬" },
    { key: "hafalan", label: "Hafalan", icon: "🎙️" }
  ];

  const totalDeleted = stats.users + stats.modules + stats.donations + stats.chats + stats.hafalan;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Trash</h1>
        <p className="text-gray-400">
          {totalDeleted} item dihapus (soft delete) - bisa di-restore
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {tabs.map((tab) => (
          <Card
            key={tab.key}
            className={`cursor-pointer transition-all ${
              activeTab === tab.key
                ? "bg-red-900/50 border-red-700"
                : "bg-gray-900 border-gray-800 hover:border-gray-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{tab.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-white">{stats[tab.key]}</p>
                  <p className="text-xs text-gray-400">{tab.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <span>{tabs.find(t => t.key === activeTab)?.icon}</span>
            Deleted {tabs.find(t => t.key === activeTab)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : (
            <>
              {/* Users Tab */}
              {activeTab === "users" && (
                users.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img src={user.image} alt="" className="w-10 h-10 rounded-full" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                              {user.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            {user.deleteReason && (
                              <p className="text-xs text-red-400">Reason: {user.deleteReason}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(user.deletedAt).toLocaleDateString("id-ID")}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleRestore("user", user.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Restore
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Modules Tab */}
              {activeTab === "modules" && (
                modules.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-3">
                    {modules.map((module) => (
                      <div key={module.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{module.name}</p>
                          <p className="text-sm text-gray-400">{module.slug} • {module.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleRestore("module", module.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePermanentDelete("module", module.id)}
                            className="text-red-400 border-red-800 hover:bg-red-900"
                          >
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Donations Tab */}
              {activeTab === "donations" && (
                donations.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-3">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{formatCurrency(donation.amount)}</p>
                          <p className="text-sm text-gray-400">
                            {donation.donorName || "Anonymous"} • {donation.paymentStatus}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleRestore("donation", donation.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePermanentDelete("donation", donation.id)}
                            className="text-red-400 border-red-800 hover:bg-red-900"
                          >
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Chats Tab */}
              {activeTab === "chats" && (
                chats.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-3">
                    {chats.map((chat) => (
                      <div key={chat.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{chat.title || "Untitled Chat"}</p>
                          <p className="text-sm text-gray-400">
                            {chat.user.name} • {chat.module.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleRestore("chat", chat.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePermanentDelete("chat", chat.id)}
                            className="text-red-400 border-red-800 hover:bg-red-900"
                          >
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Hafalan Tab */}
              {activeTab === "hafalan" && (
                hafalan.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-3">
                    {hafalan.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{sub.item.title}</p>
                          <p className="text-sm text-gray-400">
                            {sub.user.name} • Score: {sub.score} • {sub.passed ? "LULUS" : "BELUM"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleRestore("hafalan", sub.id)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePermanentDelete("hafalan", sub.id)}
                            className="text-red-400 border-red-800 hover:bg-red-900"
                          >
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <span className="text-6xl block mb-4">✨</span>
      <p className="text-gray-400">Tidak ada item yang dihapus</p>
      <p className="text-gray-500 text-sm mt-1">Semua data aman!</p>
    </div>
  );
}
