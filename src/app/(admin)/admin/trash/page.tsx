"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminTrashPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Trash</h1>
        <p className="text-gray-400">Item yang sudah dihapus (soft delete)</p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Deleted Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <span className="text-6xl block mb-4">🗑️</span>
            <p className="text-gray-400">No deleted items</p>
            <p className="text-gray-500 text-sm mt-2">Items dihapus akan muncul di sini dan bisa di-restore</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
