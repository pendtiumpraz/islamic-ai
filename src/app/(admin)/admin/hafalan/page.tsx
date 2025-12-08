/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Submission {
  id: string;
  itemType: string;
  mode: string;
  score: number;
  passed: boolean;
  accuracyScore: number | null;
  tajwidScore: number | null;
  fluencyScore: number | null;
  feedbackSummary: string;
  attemptNumber: number;
  deletedAt: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    tier: string;
  };
  item: {
    id: string;
    title: string;
    type: string;
    surahNumber: number | null;
  };
}

interface Stats {
  passed: number;
  failed: number;
  byType: Record<string, number>;
}

const typeLabels: Record<string, string> = {
  QURAN: "Al-Quran",
  HADITS: "Hadits",
  MATAN: "Matan"
};

export default function AdminHafalanPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [passedFilter, setPassedFilter] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [stats, setStats] = useState<Stats>({ passed: 0, failed: 0, byType: {} });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchSubmissions = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (typeFilter) params.set("type", typeFilter);
      if (passedFilter) params.set("passed", passedFilter);
      if (showDeleted) params.set("includeDeleted", "true");

      const res = await fetch(`/api/admin/hafalan?${params}`);
      const data = await res.json();
      setSubmissions(data.submissions || []);
      setStats(data.stats || { passed: 0, failed: 0, byType: {} });
      setPagination(data.pagination || { page: 1, totalPages: 1 });
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, passedFilter, showDeleted]);

  const handleDelete = async (submissionId: string) => {
    if (!confirm("Hapus submission ini? (soft delete)")) return;
    try {
      await fetch(`/api/admin/hafalan/${submissionId}`, { method: "DELETE" });
      fetchSubmissions(pagination.page);
    } catch (error) {
      console.error("Failed to delete submission:", error);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Hafalan Submissions</h1>
        <p className="text-gray-400">Review setoran hafalan pengguna</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-emerald-900/50 border-emerald-800">
          <CardContent className="p-4">
            <p className="text-sm text-emerald-300">Lulus</p>
            <p className="text-2xl font-bold text-white">{stats.passed}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-900/50 border-red-800">
          <CardContent className="p-4">
            <p className="text-sm text-red-300">Belum Lulus</p>
            <p className="text-2xl font-bold text-white">{stats.failed}</p>
          </CardContent>
        </Card>
        {Object.entries(stats.byType).map(([type, count]) => (
          <Card key={type} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <p className="text-sm text-gray-400">{typeLabels[type] || type}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="">All Types</option>
          <option value="QURAN">Al-Quran</option>
          <option value="HADITS">Hadits</option>
          <option value="MATAN">Matan</option>
        </select>

        <select
          value={passedFilter}
          onChange={(e) => setPassedFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="">All Results</option>
          <option value="true">Passed</option>
          <option value="false">Failed</option>
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

      {/* Submissions Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Submission List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-6xl block mb-4">📝</span>
              <p className="text-gray-400">Belum ada setoran hafalan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Item</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Score</th>
                    <th className="pb-3 font-medium">Result</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className={sub.deletedAt ? "opacity-50" : ""}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {sub.user.image ? (
                            <img src={sub.user.image} alt="" className="w-8 h-8 rounded-full" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                              {sub.user.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{sub.user.name}</p>
                            <p className="text-xs text-gray-500">{sub.user.tier}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-white">{sub.item.title}</p>
                        {sub.item.surahNumber && (
                          <p className="text-xs text-gray-500">Surah #{sub.item.surahNumber}</p>
                        )}
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-300">
                          {typeLabels[sub.itemType]}
                        </span>
                      </td>
                      <td className="py-4">
                        <div>
                          <span className={`text-lg font-bold ${sub.score >= 70 ? "text-emerald-400" : "text-red-400"}`}>
                            {sub.score}
                          </span>
                          <span className="text-gray-500">/100</span>
                        </div>
                        {sub.accuracyScore !== null && (
                          <div className="text-xs text-gray-500 mt-1">
                            Acc: {sub.accuracyScore} | Tjw: {sub.tajwidScore} | Flu: {sub.fluencyScore}
                          </div>
                        )}
                      </td>
                      <td className="py-4">
                        {sub.passed ? (
                          <span className="px-2 py-1 text-xs rounded bg-emerald-900 text-emerald-300">LULUS</span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded bg-red-900 text-red-300">BELUM</span>
                        )}
                      </td>
                      <td className="py-4 text-gray-400 text-sm">
                        {new Date(sub.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4">
                        {!sub.deletedAt && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(sub.id)}
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
                onClick={() => fetchSubmissions(pagination.page - 1)}
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
                onClick={() => fetchSubmissions(pagination.page + 1)}
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
