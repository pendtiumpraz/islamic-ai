# 🎨 FRONTEND REQUIREMENTS - ILMUNA MVP

> **Version**: 1.0.0-MVP
> **Last Updated**: December 2024

---

## 📖 Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [Design System](#3-design-system)
4. [Page & Route Structure](#4-page--route-structure)
5. [Component Library](#5-component-library)
6. [State Management](#6-state-management)
7. [Internationalization (i18n)](#7-internationalization-i18n)
8. [AI Chat Interface](#8-ai-chat-interface)
9. [Hafalan Recording System](#9-hafalan-recording-system)
10. [LMS Interface](#10-lms-interface)
11. [Responsive Design](#11-responsive-design)
12. [Accessibility](#12-accessibility)
13. [Performance Optimization](#13-performance-optimization)
14. [Testing Strategy](#14-testing-strategy)

---

## 1. Technology Stack

### 1.1 Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | Framework (App Router) |
| React | 18.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | Component Library |
| Framer Motion | 10.x | Animations |

### 1.2 State & Data
| Technology | Purpose |
|------------|---------|
| Zustand | Global state |
| TanStack Query | Server state & caching |
| React Hook Form | Form handling |
| Zod | Validation |

### 1.3 Additional Libraries
| Library | Purpose |
|---------|---------|
| next-intl | Internationalization |
| next-themes | Dark/light mode |
| lucide-react | Icons |
| recharts | Charts & analytics |
| react-markdown | Markdown rendering |
| date-fns | Date formatting |

---

## 2. Project Structure

```
src/
├── app/
│   ├── [locale]/                    # Locale wrapper
│   │   ├── (auth)/                  # Auth layout group
│   │   │   ├── signin/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/                  # Main app layout group
│   │   │   ├── page.tsx             # Dashboard/Home
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx         # Module selection
│   │   │   │   └── [moduleSlug]/
│   │   │   │       ├── page.tsx     # Chat interface
│   │   │   │       └── [sessionId]/page.tsx
│   │   │   ├── learn/
│   │   │   │   ├── page.tsx         # Course catalog
│   │   │   │   ├── [courseSlug]/
│   │   │   │   │   ├── page.tsx     # Course overview
│   │   │   │   │   └── [lessonId]/page.tsx
│   │   │   │   └── certificates/page.tsx
│   │   │   ├── hafalan/
│   │   │   │   ├── page.tsx         # Matan selection
│   │   │   │   ├── [matanSlug]/
│   │   │   │   │   ├── page.tsx     # Matan overview
│   │   │   │   │   └── [sectionId]/page.tsx
│   │   │   │   └── murajaah/page.tsx
│   │   │   ├── research/
│   │   │   │   ├── page.tsx         # Research tools
│   │   │   │   ├── ideas/page.tsx
│   │   │   │   ├── literature/page.tsx
│   │   │   │   └── projects/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [projectId]/page.tsx
│   │   │   ├── donate/
│   │   │   │   ├── page.tsx         # Projects list
│   │   │   │   └── [projectSlug]/page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   └── layout.tsx           # Main layout
│   │   ├── layout.tsx               # Root locale layout
│   │   └── not-found.tsx
│   ├── api/                         # API routes
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ModuleCard.tsx
│   │   └── StreamingMessage.tsx
│   ├── learn/
│   │   ├── CourseCard.tsx
│   │   ├── LessonContent.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuizComponent.tsx
│   │   └── CertificateCard.tsx
│   ├── hafalan/
│   │   ├── MatanCard.tsx
│   │   ├── SectionCard.tsx
│   │   ├── AudioRecorder.tsx
│   │   ├── EvaluationResult.tsx
│   │   ├── MurajaahCalendar.tsx
│   │   └── StreakCounter.tsx
│   ├── research/
│   │   ├── IdeaGenerator.tsx
│   │   ├── LiteratureSearch.tsx
│   │   ├── CitationCard.tsx
│   │   └── ProjectCard.tsx
│   ├── donate/
│   │   ├── ProjectCard.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── DonorWall.tsx
│   │   └── PaymentOptions.tsx
│   ├── quran/
│   │   ├── AyahDisplay.tsx
│   │   ├── SurahList.tsx
│   │   ├── TafsirPanel.tsx
│   │   └── AudioPlayer.tsx
│   ├── shared/
│   │   ├── ArabicText.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── EmptyState.tsx
│   │   └── ConfirmDialog.tsx
│   └── providers/
│       ├── ThemeProvider.tsx
│       ├── QueryProvider.tsx
│       ├── AuthProvider.tsx
│       └── ToastProvider.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   ├── useAudioRecorder.ts
│   ├── useProgress.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
├── lib/
│   ├── api.ts                       # API client
│   ├── utils.ts                     # Utility functions
│   ├── constants.ts
│   └── validators.ts
├── stores/
│   ├── chatStore.ts
│   ├── audioStore.ts
│   └── uiStore.ts
├── types/
│   └── index.ts
├── messages/                        # i18n translations
│   ├── ar.json
│   ├── en.json
│   └── id.json
└── styles/
    └── arabic.css                   # Arabic typography
```

---

## 3. Design System

### 3.1 Color Palette

```typescript
// tailwind.config.ts

const colors = {
  // Primary - Islamic Green
  primary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",  // Main
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  
  // Secondary - Gold/Amber (Islamic art inspired)
  secondary: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",  // Main
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  
  // Accent - Deep Teal
  accent: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",  // Main
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  
  // Semantic
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  
  // Tiers
  tier: {
    free: "#6b7280",
    bronze: "#cd7f32",
    silver: "#c0c0c0",
    gold: "#ffd700",
    patron: "#e5e4e2",
  },
};
```

### 3.2 Typography

```css
/* styles/arabic.css */

/* Arabic font stack */
@font-face {
  font-family: 'Amiri';
  src: url('/fonts/Amiri-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Amiri';
  src: url('/fonts/Amiri-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Amiri Quran';
  src: url('/fonts/AmiriQuran-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Typography classes */
.font-arabic {
  font-family: 'Amiri', 'Traditional Arabic', serif;
  direction: rtl;
}

.font-quran {
  font-family: 'Amiri Quran', 'Amiri', serif;
  direction: rtl;
  line-height: 2.5;
}

.text-arabic-lg {
  font-size: 1.5rem;
  line-height: 2.5;
}

.text-arabic-xl {
  font-size: 2rem;
  line-height: 2.5;
}

.text-arabic-2xl {
  font-size: 2.5rem;
  line-height: 2.5;
}

/* Quran-specific styling */
.quran-text {
  font-family: 'Amiri Quran', serif;
  font-size: 1.75rem;
  line-height: 3;
  text-align: justify;
  direction: rtl;
}

.ayah-number {
  font-family: 'Amiri', serif;
  font-size: 0.875rem;
  color: var(--primary-600);
  margin: 0 0.25rem;
}
```

### 3.3 Spacing & Layout

```typescript
// tailwind.config.ts

const spacing = {
  // Custom spacing for Islamic geometric patterns
  'safe-top': 'env(safe-area-inset-top)',
  'safe-bottom': 'env(safe-area-inset-bottom)',
};

const borderRadius = {
  'islamic': '0.75rem', // Slightly rounded for Islamic aesthetic
};
```

### 3.4 Component Variants

```typescript
// components/ui/button.tsx variants

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-islamic font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
        outline: "border border-primary-600 text-primary-600 hover:bg-primary-50",
        ghost: "hover:bg-primary-100 text-primary-700",
        destructive: "bg-error text-white hover:bg-red-600",
        tier: {
          bronze: "bg-tier-bronze text-white",
          silver: "bg-tier-silver text-gray-900",
          gold: "bg-tier-gold text-gray-900",
          patron: "bg-gradient-to-r from-tier-gold to-tier-patron text-gray-900",
        },
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
```

---

## 4. Page & Route Structure

### 4.1 Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Marketing page |
| `/about` | About | Project info |
| `/donate` | Projects | Donation projects |
| `/donate/[slug]` | Project Detail | Single project |

### 4.2 Auth Pages
| Route | Page | Description |
|-------|------|-------------|
| `/signin` | Sign In | Google OAuth |
| `/auth/error` | Auth Error | Error handling |

### 4.3 App Pages (Protected)
| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Main hub |
| `/chat` | Modules | AI module selection |
| `/chat/[module]` | Chat | Chat interface |
| `/learn` | Courses | Course catalog |
| `/learn/[course]` | Course | Course detail |
| `/learn/[course]/[lesson]` | Lesson | Lesson content |
| `/hafalan` | Matan List | Hafalan selection |
| `/hafalan/[matan]` | Matan | Matan detail |
| `/hafalan/[matan]/[section]` | Practice | Recording interface |
| `/hafalan/murajaah` | Murajaah | Review schedule |
| `/research` | Research | Research tools |
| `/research/ideas` | Ideas | Thesis generator |
| `/research/projects` | Projects | User projects |
| `/profile` | Profile | User profile |
| `/profile/settings` | Settings | Preferences |

### 4.2 Layout Structure

```tsx
// app/[locale]/(main)/layout.tsx

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar className="hidden lg:block w-64 fixed left-0 top-16 h-[calc(100vh-4rem)]" />
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          {children}
        </main>
      </div>
      <MobileNav className="lg:hidden fixed bottom-0 left-0 right-0" />
    </div>
  );
}
```

---

## 5. Component Library

### 5.1 Core UI Components (shadcn/ui)
```bash
# Required shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add slider
```

### 5.2 Custom Components

#### ArabicText Component
```tsx
// components/shared/ArabicText.tsx

interface ArabicTextProps {
  children: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  type?: "normal" | "quran" | "hadith";
  showTransliteration?: boolean;
  showTranslation?: boolean;
  translation?: string;
  transliteration?: string;
  className?: string;
}

export function ArabicText({
  children,
  size = "lg",
  type = "normal",
  showTransliteration = false,
  showTranslation = false,
  translation,
  transliteration,
  className,
}: ArabicTextProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
    "2xl": "text-4xl",
  };

  const typeClasses = {
    normal: "font-arabic",
    quran: "font-quran quran-text",
    hadith: "font-arabic text-primary-800",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p
        dir="rtl"
        lang="ar"
        className={cn(
          typeClasses[type],
          sizeClasses[size],
          "leading-loose"
        )}
      >
        {children}
      </p>
      
      {showTransliteration && transliteration && (
        <p className="text-gray-600 italic text-sm">
          {transliteration}
        </p>
      )}
      
      {showTranslation && translation && (
        <p className="text-gray-700">
          {translation}
        </p>
      )}
    </div>
  );
}
```

#### ModuleCard Component
```tsx
// components/chat/ModuleCard.tsx

interface ModuleCardProps {
  module: {
    id: string;
    slug: string;
    name: { ar: string; en: string; id: string };
    description: { ar: string; en: string; id: string };
    icon: string;
    category: string;
    requiredTier: string;
  };
  userTier: string;
  locale: string;
}

export function ModuleCard({ module, userTier, locale }: ModuleCardProps) {
  const hasAccess = checkTierAccess(userTier, module.requiredTier);
  const t = useTranslations("chat");
  
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all hover:shadow-lg",
      !hasAccess && "opacity-75"
    )}>
      {!hasAccess && (
        <div className="absolute top-2 right-2">
          <Badge variant={module.requiredTier.toLowerCase()}>
            {module.requiredTier}
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <Icon name={module.icon} className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <CardTitle className="text-lg">
              {module.name[locale]}
            </CardTitle>
            <p className="text-sm text-gray-500 font-arabic" dir="rtl">
              {module.name.ar}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 text-sm line-clamp-2">
          {module.description[locale]}
        </p>
      </CardContent>
      
      <CardFooter>
        {hasAccess ? (
          <Button asChild className="w-full">
            <Link href={`/chat/${module.slug}`}>
              {t("startChat")}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" asChild>
            <Link href="/donate">
              <Lock className="w-4 h-4 mr-2" />
              {t("upgrade")}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
```

#### ProgressTracker Component
```tsx
// components/donate/ProgressTracker.tsx

interface ProgressTrackerProps {
  project: {
    name: string;
    location: string;
    targetAmount: number;
    currentAmount: number;
    donorCount: number;
    images: string[];
  };
}

export function ProgressTracker({ project }: ProgressTrackerProps) {
  const percentage = (project.currentAmount / project.targetAmount) * 100;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          <span className="text-sm text-gray-500">{project.location}</span>
        </div>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              {formatCurrency(project.currentAmount)}
            </span>
            <span className="text-gray-500">
              {formatCurrency(project.targetAmount)}
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          <p className="text-sm text-gray-500 text-center">
            {percentage.toFixed(1)}% tercapai
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex justify-around pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">
              {project.donorCount}
            </p>
            <p className="text-sm text-gray-500">Donatur</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">
              {Math.ceil((project.targetAmount - project.currentAmount) / 100000)}
            </p>
            <p className="text-sm text-gray-500">Hari Lagi</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" size="lg">
          <Heart className="w-5 h-5 mr-2" />
          Donasi Sekarang
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 6. State Management

### 6.1 Zustand Stores

#### Chat Store
```typescript
// stores/chatStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface ChatSession {
  id: string;
  moduleSlug: string;
  title: string;
  messages: Message[];
}

interface ChatStore {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isStreaming: boolean;
  
  // Actions
  setActiveSession: (id: string) => void;
  addMessage: (sessionId: string, message: Message) => void;
  updateLastMessage: (sessionId: string, content: string) => void;
  createSession: (moduleSlug: string) => string;
  deleteSession: (id: string) => void;
  setStreaming: (streaming: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,
      isStreaming: false,
      
      setActiveSession: (id) => set({ activeSessionId: id }),
      
      addMessage: (sessionId, message) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId
              ? { ...s, messages: [...s.messages, message] }
              : s
          ),
        })),
      
      updateLastMessage: (sessionId, content) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: s.messages.map((m, i) =>
                    i === s.messages.length - 1
                      ? { ...m, content }
                      : m
                  ),
                }
              : s
          ),
        })),
      
      createSession: (moduleSlug) => {
        const id = crypto.randomUUID();
        set((state) => ({
          sessions: [
            ...state.sessions,
            {
              id,
              moduleSlug,
              title: "New Chat",
              messages: [],
            },
          ],
          activeSessionId: id,
        }));
        return id;
      },
      
      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
          activeSessionId:
            state.activeSessionId === id ? null : state.activeSessionId,
        })),
      
      setStreaming: (streaming) => set({ isStreaming: streaming }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        sessions: state.sessions.slice(-10), // Keep last 10 sessions
      }),
    }
  )
);
```

#### Audio Store (Hafalan)
```typescript
// stores/audioStore.ts

import { create } from "zustand";

interface AudioStore {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  
  // Evaluation results
  evaluationResult: {
    overallScore: number;
    fluencyScore: number;
    accuracyScore: number;
    makhrajScore: number;
    harakatScore: number;
    mistakes: Array<{
      word: string;
      expected: string;
      spoken: string;
      correction: string;
    }>;
    feedback: string;
  } | null;
  isEvaluating: boolean;
  
  // Actions
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  setAudioBlob: (blob: Blob) => void;
  setEvaluationResult: (result: any) => void;
  setEvaluating: (evaluating: boolean) => void;
  reset: () => void;
  incrementTime: () => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  isRecording: false,
  isPaused: false,
  recordingTime: 0,
  audioBlob: null,
  audioUrl: null,
  evaluationResult: null,
  isEvaluating: false,
  
  startRecording: () =>
    set({ isRecording: true, isPaused: false, recordingTime: 0 }),
  
  stopRecording: () =>
    set({ isRecording: false, isPaused: false }),
  
  pauseRecording: () =>
    set({ isPaused: true }),
  
  resumeRecording: () =>
    set({ isPaused: false }),
  
  setAudioBlob: (blob) =>
    set({
      audioBlob: blob,
      audioUrl: URL.createObjectURL(blob),
    }),
  
  setEvaluationResult: (result) =>
    set({ evaluationResult: result, isEvaluating: false }),
  
  setEvaluating: (evaluating) =>
    set({ isEvaluating: evaluating }),
  
  reset: () =>
    set({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      audioBlob: null,
      audioUrl: null,
      evaluationResult: null,
      isEvaluating: false,
    }),
  
  incrementTime: () =>
    set((state) => ({ recordingTime: state.recordingTime + 1 })),
}));
```

### 6.2 React Query Setup

```typescript
// lib/api.ts

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// API functions
export const api = {
  // Chat
  getModules: () => fetch("/api/chat/modules").then((r) => r.json()),
  sendMessage: (sessionId: string, content: string) =>
    fetch(`/api/chat/sessions/${sessionId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
  
  // Learn
  getCourses: () => fetch("/api/learn/courses").then((r) => r.json()),
  getCourse: (slug: string) =>
    fetch(`/api/learn/courses/${slug}`).then((r) => r.json()),
  
  // Hafalan
  getMatanList: () => fetch("/api/hafalan/matan").then((r) => r.json()),
  submitHafalan: (sectionId: string, audio: Blob) => {
    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("sectionId", sectionId);
    return fetch("/api/hafalan/submit", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());
  },
  
  // Research
  generateIdeas: (params: any) =>
    fetch("/api/research/ideas", {
      method: "POST",
      body: JSON.stringify(params),
    }).then((r) => r.json()),
};
```

---

## 7. Internationalization (i18n)

### 7.1 Setup with next-intl

```typescript
// i18n.ts

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["id", "ar", "en"] as const;
export const defaultLocale = "id" as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

### 7.2 Translation Files

```json
// messages/id.json
{
  "common": {
    "appName": "ILMUNA",
    "tagline": "Platform Pendidikan Islam Berbasis AI",
    "login": "Masuk",
    "logout": "Keluar",
    "dashboard": "Beranda",
    "learn": "Belajar",
    "chat": "Tanya AI",
    "hafalan": "Hafalan",
    "research": "Riset",
    "donate": "Donasi",
    "profile": "Profil",
    "settings": "Pengaturan",
    "loading": "Memuat...",
    "error": "Terjadi kesalahan",
    "retry": "Coba lagi",
    "save": "Simpan",
    "cancel": "Batal",
    "delete": "Hapus",
    "edit": "Edit",
    "view": "Lihat",
    "search": "Cari",
    "filter": "Filter",
    "sort": "Urutkan",
    "all": "Semua",
    "next": "Selanjutnya",
    "previous": "Sebelumnya",
    "finish": "Selesai"
  },
  "auth": {
    "signInTitle": "Masuk ke ILMUNA",
    "signInDescription": "Akses ribuan konten Islam dan fitur AI",
    "signInWithGoogle": "Masuk dengan Google",
    "signOutConfirm": "Yakin ingin keluar?"
  },
  "dashboard": {
    "welcome": "Assalamu'alaikum, {name}",
    "todayProgress": "Progress Hari Ini",
    "continueLearn": "Lanjutkan Belajar",
    "todayMurajaah": "Muraja'ah Hari Ini",
    "quickAccess": "Akses Cepat",
    "recentChats": "Chat Terakhir",
    "streak": "Streak",
    "days": "hari"
  },
  "chat": {
    "selectModule": "Pilih Modul",
    "startChat": "Mulai Chat",
    "newChat": "Chat Baru",
    "typeMessage": "Ketik pertanyaan...",
    "send": "Kirim",
    "thinking": "Sedang berpikir...",
    "upgrade": "Upgrade untuk akses",
    "dailyLimit": "Batas harian tercapai",
    "categories": {
      "ibadah": "Ibadah Harian",
      "ilmuSyari": "Ilmu Syar'i",
      "keluarga": "Keluarga & Kehidupan",
      "dakwah": "Dakwah & Kreativitas"
    }
  },
  "learn": {
    "courses": "Daftar Kursus",
    "enrolled": "Terdaftar",
    "completed": "Selesai",
    "progress": "Progress",
    "lessons": "Pelajaran",
    "duration": "Durasi",
    "level": "Level",
    "enroll": "Daftar",
    "continue": "Lanjutkan",
    "startLesson": "Mulai Pelajaran",
    "completeLesson": "Tandai Selesai",
    "takeQuiz": "Kerjakan Quiz",
    "certificate": "Sertifikat",
    "levels": {
      "tamhidi": "Tamhidi (Pemula)",
      "mutawassith": "Mutawassith (Menengah)",
      "mutaqaddim": "Mutaqaddim (Lanjutan)",
      "takhassus": "Takhassus (Spesialisasi)"
    }
  },
  "hafalan": {
    "matanList": "Daftar Matan",
    "sections": "Bagian",
    "practice": "Latihan",
    "startRecording": "Mulai Rekam",
    "stopRecording": "Berhenti",
    "submit": "Kirim Setoran",
    "evaluating": "Mengevaluasi...",
    "result": "Hasil Evaluasi",
    "score": "Skor",
    "fluency": "Kelancaran",
    "accuracy": "Ketepatan",
    "makhraj": "Makhraj",
    "harakat": "Harakat",
    "mistakes": "Kesalahan",
    "feedback": "Saran",
    "retry": "Ulangi",
    "nextSection": "Bagian Selanjutnya",
    "murajaah": "Muraja'ah",
    "todayReview": "Review Hari Ini",
    "streak": "Streak Hafalan"
  },
  "donate": {
    "projects": "Program Donasi",
    "progress": "Progress",
    "target": "Target",
    "collected": "Terkumpul",
    "donors": "Donatur",
    "donateNow": "Donasi Sekarang",
    "paymentMethod": "Metode Pembayaran",
    "amount": "Jumlah",
    "message": "Pesan (opsional)",
    "anonymous": "Sembunyikan nama saya",
    "donorWall": "Dinding Donatur",
    "thankYou": "Jazakallahu Khairan",
    "tiers": {
      "free": "Gratis",
      "bronze": "Bronze",
      "silver": "Silver",
      "gold": "Gold",
      "patron": "Patron"
    }
  },
  "research": {
    "ideaGenerator": "Generator Ide Penelitian",
    "field": "Bidang",
    "level": "Jenjang",
    "interest": "Minat/Topik",
    "generate": "Generate Ide",
    "literature": "Pencarian Literatur",
    "citations": "Sitasi & Referensi",
    "projects": "Proyek Saya",
    "createProject": "Buat Proyek Baru"
  }
}
```

```json
// messages/ar.json
{
  "common": {
    "appName": "عِلْمُنَا",
    "tagline": "منصة التعليم الإسلامي بالذكاء الاصطناعي",
    "login": "تسجيل الدخول",
    "logout": "تسجيل الخروج",
    "dashboard": "الرئيسية",
    "learn": "تعلم",
    "chat": "اسأل الذكاء",
    "hafalan": "الحفظ",
    "research": "البحث",
    "donate": "تبرع",
    "profile": "الملف الشخصي",
    "settings": "الإعدادات"
  },
  "auth": {
    "signInTitle": "تسجيل الدخول إلى عِلْمُنَا",
    "signInDescription": "الوصول إلى آلاف المحتويات الإسلامية وميزات الذكاء الاصطناعي",
    "signInWithGoogle": "تسجيل الدخول بـ Google"
  }
}
```

### 7.3 RTL Support

```tsx
// app/[locale]/layout.tsx

import { getMessages, getTranslations } from "next-intl/server";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        locale === "ar" && "font-arabic"
      )}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## 8. AI Chat Interface

### 8.1 Chat Interface Component

```tsx
// components/chat/ChatInterface.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { StreamingMessage } from "./StreamingMessage";

interface ChatInterfaceProps {
  moduleSlug: string;
  sessionId?: string;
}

export function ChatInterface({ moduleSlug, sessionId }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isLoading,
    isStreaming,
    streamingContent,
    sendMessage,
    error,
  } = useChat(moduleSlug, sessionId);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.createdAt}
          />
        ))}
        
        {isStreaming && (
          <StreamingMessage content={streamingContent} />
        )}
        
        {isLoading && !isStreaming && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sedang berpikir...</span>
          </div>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      
      {/* Input */}
      <div className="border-t p-4">
        <ChatInput
          onSend={sendMessage}
          disabled={isLoading || isStreaming}
          placeholder="Ketik pertanyaan Anda..."
        />
      </div>
    </div>
  );
}
```

### 8.2 Streaming Hook

```typescript
// hooks/useChat.ts

import { useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useChat(moduleSlug: string, sessionId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Start streaming
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullContent += chunk;
        setStreamingContent(fullContent);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fullContent,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  }, [sessionId]);

  return {
    messages,
    isLoading: false,
    isStreaming,
    streamingContent,
    sendMessage,
    error: null,
  };
}
```

---

## 9. Hafalan Recording System

### 9.1 Audio Recorder Component

```tsx
// components/hafalan/AudioRecorder.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "@/stores/audioStore";
import { Mic, Square, Play, Pause, RotateCcw, Send } from "lucide-react";

interface AudioRecorderProps {
  sectionId: string;
  expectedText: string;
  onSubmit: (blob: Blob) => Promise<void>;
}

export function AudioRecorder({
  sectionId,
  expectedText,
  onSubmit,
}: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    isEvaluating,
    startRecording: setRecording,
    stopRecording: setStopped,
    setAudioBlob,
    setEvaluating,
    reset,
    incrementTime,
  } = useAudioStore();

  // Timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(incrementTime, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused, incrementTime]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      setRecording();
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setStopped();
  };

  const handleSubmit = async () => {
    if (!audioBlob) return;
    setEvaluating(true);
    await onSubmit(audioBlob);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
      {/* Timer */}
      <div className="text-4xl font-mono font-bold text-primary-600">
        {formatTime(recordingTime)}
      </div>

      {/* Waveform visualization (placeholder) */}
      <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        {isRecording ? (
          <div className="flex items-center gap-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary-500 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 40 + 10}px`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        ) : audioUrl ? (
          <audio src={audioUrl} controls className="w-full" />
        ) : (
          <span className="text-gray-400">Tekan tombol untuk mulai merekam</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!isRecording && !audioBlob && (
          <Button
            size="lg"
            onClick={startRecording}
            className="w-20 h-20 rounded-full"
          >
            <Mic className="w-8 h-8" />
          </Button>
        )}

        {isRecording && (
          <Button
            size="lg"
            variant="destructive"
            onClick={stopRecording}
            className="w-20 h-20 rounded-full animate-pulse"
          >
            <Square className="w-8 h-8" />
          </Button>
        )}

        {audioBlob && !isRecording && (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={reset}
              className="w-16 h-16 rounded-full"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>

            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isEvaluating}
              className="w-20 h-20 rounded-full"
            >
              {isEvaluating ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <Send className="w-8 h-8" />
              )}
            </Button>
          </>
        )}
      </div>

      {/* Instructions */}
      <p className="text-sm text-gray-500 text-center">
        {isRecording
          ? "Sedang merekam... Baca teks di atas dengan jelas"
          : audioBlob
          ? "Dengarkan rekaman Anda, lalu kirim untuk evaluasi"
          : "Tekan tombol mikrofon untuk mulai merekam hafalan"}
      </p>
    </div>
  );
}
```

### 9.2 Evaluation Result Component

```tsx
// components/hafalan/EvaluationResult.tsx

interface EvaluationResultProps {
  result: {
    overallScore: number;
    fluencyScore: number;
    accuracyScore: number;
    makhrajScore: number;
    harakatScore: number;
    mistakes: Array<{
      word: string;
      expected: string;
      spoken: string;
      correction: string;
    }>;
    feedback: string;
  };
  onRetry: () => void;
  onNext: () => void;
}

export function EvaluationResult({
  result,
  onRetry,
  onNext,
}: EvaluationResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🌟";
    if (score >= 80) return "⭐";
    if (score >= 70) return "👍";
    return "📚";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="text-6xl mb-2">{getScoreEmoji(result.overallScore)}</div>
        <CardTitle className={cn("text-4xl", getScoreColor(result.overallScore))}>
          {result.overallScore}/100
        </CardTitle>
        <CardDescription>Skor Keseluruhan</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Score breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <ScoreItem
            label="Kelancaran"
            score={result.fluencyScore}
            icon={<Zap className="w-4 h-4" />}
          />
          <ScoreItem
            label="Ketepatan"
            score={result.accuracyScore}
            icon={<Target className="w-4 h-4" />}
          />
          <ScoreItem
            label="Makhraj"
            score={result.makhrajScore}
            icon={<Volume2 className="w-4 h-4" />}
          />
          <ScoreItem
            label="Harakat"
            score={result.harakatScore}
            icon={<Type className="w-4 h-4" />}
          />
        </div>

        {/* Mistakes */}
        {result.mistakes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Kesalahan yang Terdeteksi
            </h4>
            <div className="space-y-2">
              {result.mistakes.map((mistake, i) => (
                <div
                  key={i}
                  className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-arabic text-lg text-red-600">
                      {mistake.word}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="font-arabic text-lg text-green-600">
                      {mistake.expected}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{mistake.correction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <h4 className="font-semibold flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary-600" />
            Saran dari AI
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{result.feedback}</p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button variant="outline" onClick={onRetry} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Ulangi
        </Button>
        <Button onClick={onNext} className="flex-1">
          Lanjut
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function ScoreItem({
  label,
  score,
  icon,
}: {
  label: string;
  score: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Progress value={score} className="w-16 h-2" />
        <span className="font-semibold">{score}</span>
      </div>
    </div>
  );
}
```

---

## 10. LMS Interface

### 10.1 Course Card

```tsx
// components/learn/CourseCard.tsx

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    title: { ar: string; en: string; id: string };
    description: { ar: string; en: string; id: string };
    thumbnail: string;
    level: string;
    category: string;
    estimatedHours: number;
    lessonsCount: number;
    requiredTier: string;
  };
  enrollment?: {
    status: string;
    progress: number;
  };
  locale: string;
}

export function CourseCard({ course, enrollment, locale }: CourseCardProps) {
  const t = useTranslations("learn");
  
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={course.thumbnail || "/images/course-placeholder.jpg"}
          alt={course.title[locale]}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary">{t(`levels.${course.level.toLowerCase()}`)}</Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge>{course.category}</Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{course.title[locale]}</CardTitle>
        {locale !== "ar" && (
          <p className="text-sm font-arabic text-gray-500" dir="rtl">
            {course.title.ar}
          </p>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {course.description[locale]}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessonsCount} {t("lessons")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.estimatedHours} jam</span>
          </div>
        </div>

        {enrollment && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{t("progress")}</span>
              <span>{enrollment.progress}%</span>
            </div>
            <Progress value={enrollment.progress} />
          </div>
        )}
      </CardContent>

      <CardFooter>
        {enrollment ? (
          <Button asChild className="w-full">
            <Link href={`/learn/${course.slug}`}>
              {enrollment.progress > 0 ? t("continue") : t("startLesson")}
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            <Link href={`/learn/${course.slug}`}>
              {t("enroll")}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
```

### 10.2 Lesson Content

```tsx
// components/learn/LessonContent.tsx

interface LessonContentProps {
  lesson: {
    id: string;
    title: { ar: string; en: string; id: string };
    content: { ar: string; en: string; id: string };
    arabicText?: string;
    videoUrl?: string;
    audioUrl?: string;
    duration: number;
  };
  progress?: {
    completed: boolean;
    timeSpent: number;
  };
  locale: string;
  onComplete: () => void;
}

export function LessonContent({
  lesson,
  progress,
  locale,
  onComplete,
}: LessonContentProps) {
  const t = useTranslations("learn");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{lesson.title[locale]}</h1>
        {locale !== "ar" && lesson.title.ar && (
          <h2 className="text-xl font-arabic text-gray-600" dir="rtl">
            {lesson.title.ar}
          </h2>
        )}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {lesson.duration} menit
          </span>
          {progress?.completed && (
            <Badge variant="success">
              <Check className="w-3 h-3 mr-1" />
              {t("completed")}
            </Badge>
          )}
        </div>
      </div>

      {/* Video */}
      {lesson.videoUrl && (
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <video
            src={lesson.videoUrl}
            controls
            className="w-full h-full"
          />
        </div>
      )}

      {/* Arabic Text */}
      {lesson.arabicText && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Teks Arab</h3>
          <ArabicText size="xl" type="normal">
            {lesson.arabicText}
          </ArabicText>
          {lesson.audioUrl && (
            <div className="mt-4">
              <audio src={lesson.audioUrl} controls className="w-full" />
            </div>
          )}
        </Card>
      )}

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            // Custom Arabic text blocks
            blockquote: ({ children }) => (
              <blockquote className="font-arabic text-xl border-r-4 border-l-0 pr-4 pl-0" dir="rtl">
                {children}
              </blockquote>
            ),
          }}
        >
          {lesson.content[locale]}
        </ReactMarkdown>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-8 border-t">
        <Button variant="outline" asChild>
          <Link href="#">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Link>
        </Button>

        {!progress?.completed ? (
          <Button onClick={onComplete}>
            <Check className="w-4 h-4 mr-2" />
            {t("completeLesson")}
          </Button>
        ) : (
          <Button asChild>
            <Link href="#">
              Selanjutnya
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
```

---

## 11. Responsive Design

### 11.1 Breakpoints

```typescript
// tailwind.config.ts

const screens = {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
};
```

### 11.2 Mobile Navigation

```tsx
// components/layout/MobileNav.tsx

export function MobileNav() {
  const pathname = usePathname();
  const t = useTranslations("common");

  const navItems = [
    { href: "/dashboard", icon: Home, label: t("dashboard") },
    { href: "/chat", icon: MessageSquare, label: t("chat") },
    { href: "/learn", icon: BookOpen, label: t("learn") },
    { href: "/hafalan", icon: Mic, label: t("hafalan") },
    { href: "/profile", icon: User, label: t("profile") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t lg:hidden z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### 11.3 Responsive Grid

```tsx
// Example responsive grid for modules
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {modules.map((module) => (
    <ModuleCard key={module.id} module={module} />
  ))}
</div>
```

---

## 12. Accessibility

### 12.1 Requirements
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Color contrast ratios ≥ 4.5:1
- Skip links for main content
- ARIA labels for interactive elements

### 12.2 Implementation

```tsx
// Skip link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded"
>
  Skip to main content
</a>

// Main content landmark
<main id="main-content" tabIndex={-1}>
  {children}
</main>

// Accessible button with ARIA
<Button
  aria-label={isRecording ? "Stop recording" : "Start recording"}
  aria-pressed={isRecording}
>
  {isRecording ? <Square /> : <Mic />}
</Button>

// Live region for streaming messages
<div
  role="log"
  aria-live="polite"
  aria-label="Chat messages"
>
  {messages.map(...)}
</div>
```

---

## 13. Performance Optimization

### 13.1 Image Optimization

```tsx
// Using Next.js Image
import Image from "next/image";

<Image
  src={imageUrl}
  alt={description}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 13.2 Code Splitting

```tsx
// Dynamic imports for heavy components
const QuranPlayer = dynamic(() => import("@/components/quran/QuranPlayer"), {
  loading: () => <Skeleton className="h-40 w-full" />,
  ssr: false,
});

const ChartComponent = dynamic(() => import("@/components/charts/ProgressChart"), {
  loading: () => <Skeleton className="h-60 w-full" />,
});
```

### 13.3 Prefetching

```tsx
// Prefetch on hover
<Link href="/chat/quran-explorer" prefetch>
  <ModuleCard />
</Link>

// Prefetch data
const prefetchCourse = () => {
  queryClient.prefetchQuery({
    queryKey: ["course", slug],
    queryFn: () => api.getCourse(slug),
  });
};
```

### 13.4 Bundle Optimization

```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
    ],
  },
};
```

---

## 14. Testing Strategy

### 14.1 Testing Stack
| Tool | Purpose |
|------|---------|
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Playwright | E2E testing |
| MSW | API mocking |

### 14.2 Test Structure

```
__tests__/
├── unit/
│   ├── utils/
│   └── hooks/
├── components/
│   ├── chat/
│   ├── learn/
│   └── hafalan/
├── integration/
│   └── api/
└── e2e/
    ├── auth.spec.ts
    ├── chat.spec.ts
    ├── learn.spec.ts
    └── hafalan.spec.ts
```

### 14.3 Example Tests

```typescript
// __tests__/components/chat/ChatInput.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { ChatInput } from "@/components/chat/ChatInput";

describe("ChatInput", () => {
  it("calls onSend when form is submitted", () => {
    const onSend = vi.fn();
    render(<ChatInput onSend={onSend} disabled={false} />);

    const input = screen.getByPlaceholderText(/ketik pertanyaan/i);
    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.submit(input.closest("form")!);

    expect(onSend).toHaveBeenCalledWith("Test message");
  });

  it("disables input when disabled prop is true", () => {
    render(<ChatInput onSend={() => {}} disabled={true} />);

    const input = screen.getByPlaceholderText(/ketik pertanyaan/i);
    expect(input).toBeDisabled();
  });
});
```

---

## 📎 Related Documents

- [Main Requirements](./REQUIREMENTS.md)
- [Backend Requirements](./BACKEND-REQUIREMENTS.md)
- [Design System Guide](./DESIGN-SYSTEM.md)

---

> **Bismillah, semoga UI/UX ini memudahkan umat untuk belajar agama Islam.**
