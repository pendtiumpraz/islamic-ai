"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const { status } = useSession();
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyProgress: true,
    newFeatures: false,
    promotions: false,
  });
  const [preferences, setPreferences] = useState({
    language: "id",
    theme: "light",
    fontSize: "medium",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600 mt-1">Sesuaikan pengalaman ILMUNA Anda</p>
      </div>

      <div className="grid gap-6">
        {/* Notification Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">🔔 Notifikasi</CardTitle>
            <CardDescription>Kelola notifikasi yang Anda terima</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Pengingat Harian</p>
                  <p className="text-sm text-gray-500">Ingatkan untuk belajar setiap hari</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, dailyReminder: !prev.dailyReminder }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.dailyReminder ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.dailyReminder ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Laporan Mingguan</p>
                  <p className="text-sm text-gray-500">Ringkasan progress setiap minggu</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, weeklyProgress: !prev.weeklyProgress }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.weeklyProgress ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.weeklyProgress ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Fitur Baru</p>
                  <p className="text-sm text-gray-500">Info tentang fitur dan pembaruan</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, newFeatures: !prev.newFeatures }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.newFeatures ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.newFeatures ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Promosi</p>
                  <p className="text-sm text-gray-500">Info tentang promo dan diskon donasi</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, promotions: !prev.promotions }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.promotions ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.promotions ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">🎨 Tampilan</CardTitle>
            <CardDescription>Sesuaikan tampilan aplikasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Bahasa
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "id", label: "🇮🇩 Indonesia" },
                    { value: "ar", label: "🇸🇦 العربية" },
                    { value: "en", label: "🇬🇧 English" },
                  ].map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setPreferences(prev => ({ ...prev, language: lang.value }))}
                      className={`px-4 py-2 rounded-xl border-2 transition-all ${
                        preferences.language === lang.value
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tema
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "light", label: "☀️ Terang", bg: "bg-white" },
                    { value: "dark", label: "🌙 Gelap", bg: "bg-gray-800" },
                    { value: "system", label: "💻 Sistem", bg: "bg-gradient-to-r from-white to-gray-800" },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setPreferences(prev => ({ ...prev, theme: theme.value }))}
                      className={`px-4 py-2 rounded-xl border-2 transition-all ${
                        preferences.theme === theme.value
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Mode gelap akan segera tersedia
                </p>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ukuran Teks
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "small", label: "Kecil" },
                    { value: "medium", label: "Sedang" },
                    { value: "large", label: "Besar" },
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setPreferences(prev => ({ ...prev, fontSize: size.value }))}
                      className={`px-4 py-2 rounded-xl border-2 transition-all ${
                        preferences.fontSize === size.value
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">🤖 Pengaturan AI</CardTitle>
            <CardDescription>Sesuaikan perilaku AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Response Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gaya Jawaban
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "concise", label: "Ringkas", desc: "Jawaban singkat" },
                    { value: "balanced", label: "Seimbang", desc: "Default" },
                    { value: "detailed", label: "Lengkap", desc: "Penjelasan detail" },
                  ].map((style) => (
                    <button
                      key={style.value}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        style.value === "balanced"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-medium">{style.label}</p>
                      <p className="text-xs text-gray-500">{style.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Madzhab Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferensi Madzhab (untuk Fiqih)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Syafi'i", "Hanafi", "Maliki", "Hanbali"].map((madzhab) => (
                    <button
                      key={madzhab}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        madzhab === "Syafi'i"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {madzhab}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  AI akan memprioritaskan pendapat madzhab pilihan Anda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">🔒 Data & Privasi</CardTitle>
            <CardDescription>Kelola data dan privasi Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Unduh Data Saya</p>
                  <p className="text-sm text-gray-500">Dapatkan salinan semua data Anda</p>
                </div>
                <Button variant="outline" size="sm">
                  Unduh
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">Hapus Riwayat Chat</p>
                  <p className="text-sm text-gray-500">Hapus semua percakapan dengan AI</p>
                </div>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  Hapus
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Hapus Riwayat Hafalan</p>
                  <p className="text-sm text-gray-500">Hapus semua riwayat setoran</p>
                </div>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  Hapus
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Batal</Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
