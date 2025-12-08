"use client";

import { useEffect, useState } from "react";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "default" | "success" | "error" | "warning";
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

export function toast({ title, description, type = "default" }: Omit<Toast, "id">) {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { id, title, description, type };
  toasts = [...toasts, newToast];
  toastListeners.forEach((listener) => listener(toasts));

  // Auto remove after 4 seconds
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    toastListeners.forEach((listener) => listener(toasts));
  }, 4000);
}

export function Toaster() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastListeners.push(setCurrentToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setCurrentToasts);
    };
  }, []);

  const typeStyles = {
    default: "bg-gray-900 border-gray-800",
    success: "bg-emerald-900 border-emerald-800",
    error: "bg-red-900 border-red-800",
    warning: "bg-amber-900 border-amber-800",
  };

  const typeIcons = {
    default: "💬",
    success: "✅",
    error: "❌",
    warning: "⚠️",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {currentToasts.map((t) => (
        <div
          key={t.id}
          className={`${typeStyles[t.type || "default"]} border rounded-xl p-4 shadow-xl animate-slide-up`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{typeIcons[t.type || "default"]}</span>
            <div className="flex-1">
              <p className="font-medium text-white">{t.title}</p>
              {t.description && (
                <p className="text-sm text-gray-400 mt-1">{t.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
