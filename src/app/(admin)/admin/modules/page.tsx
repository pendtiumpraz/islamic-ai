"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Module {
  id: string;
  slug: string;
  name: string;
  nameAr: string | null;
  description: string;
  category: string;
  icon: string | null;
  minTier: string;
  isActive: boolean;
  systemPrompt: string;
  temperature: number;
  deletedAt: string | null;
  createdAt: string;
  _count: { chatSessions: number };
}

const CATEGORIES = ["QURAN_TAFSIR", "HADITS", "FIQIH", "AKIDAH_SEJARAH"];
const TIERS = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];

const categoryLabels: Record<string, string> = {
  QURAN_TAFSIR: "Quran & Tafsir",
  HADITS: "Hadits",
  FIQIH: "Fiqih",
  AKIDAH_SEJARAH: "Akidah & Sejarah"
};

const tierColors: Record<string, string> = {
  FREE: "bg-gray-600",
  BRONZE: "bg-amber-700",
  SILVER: "bg-gray-400",
  GOLD: "bg-yellow-500",
  PATRON: "bg-purple-600"
};

export default function AdminModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [stats, setStats] = useState<Record<string, number>>({});

  const fetchModules = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter) params.set("category", categoryFilter);
      if (showDeleted) params.set("includeDeleted", "true");

      const res = await fetch(`/api/admin/modules?${params}`);
      const data = await res.json();
      setModules(data.modules || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, showDeleted]);

  const handleToggleActive = async (module: Module) => {
    try {
      await fetch(`/api/admin/modules/${module.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !module.isActive })
      });
      fetchModules();
    } catch (error) {
      console.error("Failed to toggle module:", error);
    }
  };

  const handleUpdateTier = async (module: Module, newTier: string) => {
    try {
      await fetch(`/api/admin/modules/${module.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minTier: newTier })
      });
      fetchModules();
    } catch (error) {
      console.error("Failed to update tier:", error);
    }
  };

  const handleDelete = async (moduleId: string) => {
    if (!confirm("Hapus module ini? (soft delete)")) return;
    try {
      await fetch(`/api/admin/modules/${moduleId}`, { method: "DELETE" });
      fetchModules();
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  };

  const handleRestore = async (moduleId: string) => {
    try {
      await fetch(`/api/admin/modules/${moduleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deletedAt: null })
      });
      fetchModules();
    } catch (error) {
      console.error("Failed to restore module:", error);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Modules</h1>
        <p className="text-gray-400">Kelola {modules.length} modul AI platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {CATEGORIES.map((cat) => (
          <Card key={cat} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-white">{stats[cat] || 0}</p>
              <p className="text-xs text-gray-400">{categoryLabels[cat]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{categoryLabels[cat]}</option>
          ))}
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

      {/* Modules Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Module List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : modules.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No modules found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">Module</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Tier</th>
                    <th className="pb-3 font-medium">Sessions</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {modules.map((module) => (
                    <tr key={module.id} className={module.deletedAt ? "opacity-50" : ""}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{module.icon || "📚"}</span>
                          <div>
                            <p className="font-medium text-white">{module.name}</p>
                            <p className="text-xs text-gray-500">{module.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-300">
                          {categoryLabels[module.category]}
                        </span>
                      </td>
                      <td className="py-4">
                        <select
                          value={module.minTier}
                          onChange={(e) => handleUpdateTier(module, e.target.value)}
                          className={`px-2 py-1 text-xs rounded text-white ${tierColors[module.minTier]}`}
                          disabled={!!module.deletedAt}
                        >
                          {TIERS.map((tier) => (
                            <option key={tier} value={tier}>{tier}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 text-gray-300">
                        {module._count.chatSessions}
                      </td>
                      <td className="py-4">
                        {module.deletedAt ? (
                          <span className="px-2 py-1 text-xs rounded bg-red-900 text-red-300">Deleted</span>
                        ) : module.isActive ? (
                          <span className="px-2 py-1 text-xs rounded bg-emerald-900 text-emerald-300">Active</span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded bg-yellow-900 text-yellow-300">Inactive</span>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          {module.deletedAt ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRestore(module.id)}
                              className="text-emerald-400 border-emerald-800 hover:bg-emerald-900"
                            >
                              Restore
                            </Button>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggleActive(module)}
                                className="text-gray-400 border-gray-700 hover:bg-gray-800"
                              >
                                {module.isActive ? "Disable" : "Enable"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(module.id)}
                                className="text-red-400 border-red-800 hover:bg-red-900"
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
