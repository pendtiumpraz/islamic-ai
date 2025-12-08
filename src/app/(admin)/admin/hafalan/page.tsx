"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHafalanPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Hafalan Management</h1>
        <p className="text-gray-400">Kelola item hafalan dan progress</p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Hafalan Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">🚧</span>
            <p className="text-gray-400">Coming Soon</p>
            <p className="text-gray-500 text-sm mt-2">Fitur ini sedang dalam pengembangan</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
