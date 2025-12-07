import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = "id-ID"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string, locale: string = "id-ID"): string {
  return new Date(date).toLocaleString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Tier limits
export const TIER_LIMITS = {
  FREE: {
    dailyChat: 10,
    dailyHafalan: 5,
    dailyWrite: 3,
    modules: 10,
    historyDays: 7,
  },
  BRONZE: {
    dailyChat: 30,
    dailyHafalan: 15,
    dailyWrite: 10,
    modules: 20,
    historyDays: 30,
  },
  SILVER: {
    dailyChat: 100,
    dailyHafalan: 50,
    dailyWrite: 30,
    modules: 36,
    historyDays: 90,
  },
  GOLD: {
    dailyChat: Infinity,
    dailyHafalan: Infinity,
    dailyWrite: Infinity,
    modules: 36,
    historyDays: Infinity,
  },
  PATRON: {
    dailyChat: Infinity,
    dailyHafalan: Infinity,
    dailyWrite: Infinity,
    modules: 36,
    historyDays: Infinity,
  },
} as const;

export type Tier = keyof typeof TIER_LIMITS;

export function canUseFeature(
  tier: Tier,
  feature: keyof (typeof TIER_LIMITS)["FREE"],
  currentUsage: number
): boolean {
  const limit = TIER_LIMITS[tier][feature];
  return limit === Infinity || currentUsage < limit;
}
