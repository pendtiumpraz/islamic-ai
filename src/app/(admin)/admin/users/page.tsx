"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  tier: string;
  role: string;
  totalDonation: number;
  dailyChatCount: number;
  dailyHafalanCount: number;
  lastActiveDate: string;
  deletedAt: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async (page = 1, currentSearch = search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(currentSearch && { search: currentSearch }),
        ...(tierFilter && { tier: tierFilter }),
        ...(roleFilter && { role: roleFilter }),
        ...(showDeleted && { includeDeleted: "true" }),
      });

      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tierFilter, roleFilter, showDeleted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, search);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Yakin ingin menghapus user ini? (Soft Delete)")) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Deleted by admin" }),
      });

      if (res.ok) {
        fetchUsers(pagination.page);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async (userId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/restore`, {
        method: "POST",
      });

      if (res.ok) {
        fetchUsers(pagination.page);
      }
    } catch (error) {
      console.error("Failed to restore user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        fetchUsers(pagination.page);
        setSelectedUser((prev) => prev ? { ...prev, role: newRole } : null);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTier = async (userId: string, newTier: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: newTier }),
      });

      if (res.ok) {
        fetchUsers(pagination.page);
        setSelectedUser((prev) => prev ? { ...prev, tier: newTier } : null);
      }
    } catch (error) {
      console.error("Failed to update tier:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const tierColors: Record<string, string> = {
    FREE: "bg-gray-600",
    BRONZE: "bg-amber-600",
    SILVER: "bg-slate-400",
    GOLD: "bg-yellow-500",
    PATRON: "bg-purple-500",
  };

  const roleColors: Record<string, string> = {
    USER: "bg-gray-600",
    ADMIN: "bg-blue-600",
    SUPER_ADMIN: "bg-red-600",
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">Kelola semua pengguna platform</p>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <Input
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" variant="secondary">Cari</Button>
            </form>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="">All Tiers</option>
              <option value="FREE">FREE</option>
              <option value="BRONZE">BRONZE</option>
              <option value="SILVER">SILVER</option>
              <option value="GOLD">GOLD</option>
              <option value="PATRON">PATRON</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="">All Roles</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>

            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                className="rounded"
              />
              Show Deleted
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center justify-between">
            <span>Users ({pagination.total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Tier</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Donation</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={`border-b border-gray-800 ${user.deletedAt ? "opacity-50" : ""}`}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
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
                            <div>
                              <p className="text-white font-medium">{user.name}</p>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${tierColors[user.tier]} text-white`}>
                            {user.tier}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${roleColors[user.role]} text-white`}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Rp {user.totalDonation.toLocaleString("id-ID")}
                        </td>
                        <td className="py-3 px-4">
                          {user.deletedAt ? (
                            <Badge variant="destructive">Deleted</Badge>
                          ) : (
                            <Badge className="bg-green-600">Active</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedUser(user)}
                              className="text-gray-400 hover:text-white"
                            >
                              Edit
                            </Button>
                            {user.deletedAt ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRestore(user.id)}
                                disabled={actionLoading}
                                className="text-green-400 hover:text-green-300"
                              >
                                Restore
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(user.id)}
                                disabled={actionLoading}
                                className="text-red-400 hover:text-red-300"
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                  <p className="text-gray-400 text-sm">
                    Page {pagination.page} of {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchUsers(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="border-gray-700"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchUsers(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="border-gray-700"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-white">Edit User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl">
                  {selectedUser.image ? (
                    <Image
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-lg">{selectedUser.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{selectedUser.name}</p>
                    <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["USER", "ADMIN", "SUPER_ADMIN"].map((role) => (
                      <Button
                        key={role}
                        variant={selectedUser.role === role ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateRole(selectedUser.id, role)}
                        disabled={actionLoading}
                        className={selectedUser.role === role ? roleColors[role] : "border-gray-700"}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Tier (License)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"].map((tier) => (
                      <Button
                        key={tier}
                        variant={selectedUser.tier === tier ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpdateTier(selectedUser.id, tier)}
                        disabled={actionLoading}
                        className={selectedUser.tier === tier ? tierColors[tier] : "border-gray-700 text-gray-400"}
                      >
                        {tier}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
