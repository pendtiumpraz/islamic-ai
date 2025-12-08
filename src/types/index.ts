import { Tier, Language, Role, HafalanType, HafalanStatus, SubmissionMode, ModuleCategory } from "@prisma/client";

// Re-export Prisma enums
export { Tier, Language, Role, HafalanType, HafalanStatus, SubmissionMode, ModuleCategory };

// NextAuth session extension
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tier: Tier;
      role: Role;
      totalDonation: number;
      preferredLang: Language;
      dailyChatCount: number;
      dailyHafalanCount: number;
      dailyWriteCount: number;
    };
  }

  interface User {
    id: string;
    tier: Tier;
    role: Role;
    totalDonation: number;
    preferredLang: Language;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Chat types
export interface ChatMessage {
  id: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  title: string | null;
  moduleId: string;
  module: {
    name: string;
    slug: string;
    icon: string | null;
  };
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// AI Module types
export interface AIModule {
  id: string;
  slug: string;
  name: string;
  nameAr: string | null;
  description: string;
  category: ModuleCategory;
  icon: string | null;
  minTier: Tier;
  isActive: boolean;
}

// Hafalan types
export interface HafalanItem {
  id: string;
  type: HafalanType;
  title: string;
  arabicText: string;
  translation: string | null;
  transliteration: string | null;
  audioUrl: string | null;
  surahNumber: number | null;
  ayahStart: number | null;
  ayahEnd: number | null;
  orderIndex: number;
}

export interface HafalanEvaluationRequest {
  itemId: string;
  itemType: HafalanType;
  mode: SubmissionMode;
  audioBlob: Blob;
}

export interface HafalanEvaluationResponse {
  type: "hafalan_evaluation";
  score: number;
  passed: boolean;
  scoreBreakdown?: {
    accuracy: number;
    tajwid?: number;
    fluency: number;
  };
  feedback: {
    summary: string;
    corrections: string[];
    tips: string[];
    encouragement: string;
  };
  progress: {
    canProceed: boolean;
    attemptNumber: number;
    bestScore: number;
  };
}

export interface HafalanProgress {
  id: string;
  itemId: string;
  itemType: HafalanType;
  status: HafalanStatus;
  canProceed: boolean;
  bestScore: number;
  totalAttempts: number;
  lastAttemptAt: Date | null;
  firstPassedAt: Date | null;
}

// Donation types
export interface DonationTier {
  id: Tier;
  name: string;
  price: number;
  features: string[];
}

// User types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  tier: Tier;
  totalDonation: number;
  preferredLang: Language;
  createdAt: Date;
}

export interface UserStats {
  totalChats: number;
  totalHafalan: number;
  hafalanPassed: number;
  currentStreak: number;
}
