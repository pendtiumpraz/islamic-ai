"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Donation {
  id: string;
  amount: number;
  tier: string | null;
  donorName: string | null;
  donorEmail: string | null;
  isAnonymous: boolean;
  message: string | null;
  paymentMethod: string | null;
  paymentStatus: string;
  transactionId: string | null;
  paidAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  } | null;
}

interface Stats {
  totalAmount: number;
  completedCount: number;
  pendingCount: number;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-900 text-yellow-300",
  COMPLETED: "bg-emerald-900 text-emerald-300",
  FAILED: "bg-red-900 text-red-300",
  REFUNDED: "bg-purple-900 text-purple-300"
};

const tierColors: Record<string, string> = {
  FREE: "text-gray-400",
  BRONZE: "text-amber-500",
  SILVER: "text-gray-300",
  GOLD: "text-yellow-400",
  PATRON: "text-purple-400"
};

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [stats, setStats] = useState<Stats>({ totalAmount: 0, completedCount: 0, pendingCount: 0 });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchDonations = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (statusFilter) params.set("status", statusFilter);
      if (showDeleted) params.set("includeDeleted", "true");

      const res = await fetch(`/api/admin/donations?${params}`);
      const data = await res.json();
      setDonations(data.donations || []);
      setStats(data.stats || { totalAmount: 0, completedCount: 0, pendingCount: 0 });
      setPagination(data.pagination || { page: 1, totalPages: 1 });
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, showDeleted]);

  const handleUpdateStatus = async (donationId: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/donations/${donationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newStatus })
      });
      fetchDonations(pagination.page);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (donationId: string) => {
    if (!confirm("Hapus donasi ini? (soft delete)")) return;
    try {
      await fetch(`/api/admin/donations/${donationId}`, { method: "DELETE" });
      fetchDonations(pagination.page);
    } catch (error) {
      console.error("Failed to delete donation:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Donations</h1>
        <p className="text-gray-400">Kelola donasi dan pembayaran</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-emerald-900 to-emerald-950 border-emerald-800">
          <CardContent className="p-4">
            <p className="text-sm text-emerald-300">Total Terkumpul</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalAmount)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-400">Donasi Sukses</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.completedCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-400">Menunggu Verifikasi</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
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

      {/* Donations Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Donation List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No donations found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">Donor</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Tier</th>
                    <th className="pb-3 font-medium">Method</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {donations.map((donation) => (
                    <tr key={donation.id} className={donation.deletedAt ? "opacity-50" : ""}>
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-white">
                            {donation.isAnonymous ? "Anonymous" : (donation.user?.name || donation.donorName || "Unknown")}
                          </p>
                          <p className="text-xs text-gray-500">
                            {!donation.isAnonymous && (donation.user?.email || donation.donorEmail)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-emerald-400">{formatCurrency(donation.amount)}</span>
                      </td>
                      <td className="py-4">
                        {donation.tier && (
                          <span className={`font-medium ${tierColors[donation.tier]}`}>
                            {donation.tier}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-gray-300">
                        {donation.paymentMethod || "-"}
                      </td>
                      <td className="py-4">
                        <select
                          value={donation.paymentStatus}
                          onChange={(e) => handleUpdateStatus(donation.id, e.target.value)}
                          className={`px-2 py-1 text-xs rounded ${statusColors[donation.paymentStatus]}`}
                          disabled={!!donation.deletedAt}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="FAILED">FAILED</option>
                          <option value="REFUNDED">REFUNDED</option>
                        </select>
                      </td>
                      <td className="py-4 text-gray-400 text-sm">
                        {new Date(donation.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4">
                        {!donation.deletedAt && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(donation.id)}
                            className="text-red-400 border-red-800 hover:bg-red-900"
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchDonations(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="border-gray-700"
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchDonations(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="border-gray-700"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
