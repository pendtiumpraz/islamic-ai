# 🔧 BACKEND REQUIREMENTS - ILMUNA MVP

> **Version**: 1.0.0-MVP
> **Last Updated**: December 2024

---

## 📖 Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Database Design](#3-database-design)
4. [Authentication & Authorization](#4-authentication--authorization)
5. [API Endpoints](#5-api-endpoints)
6. [AI Integration](#6-ai-integration)
7. [External Services](#7-external-services)
8. [File Storage](#8-file-storage)
9. [Caching Strategy](#9-caching-strategy)
10. [Security Requirements](#10-security-requirements)
11. [Performance Requirements](#11-performance-requirements)
12. [Error Handling](#12-error-handling)
13. [Logging & Monitoring](#13-logging--monitoring)

---

## 1. Architecture Overview

### 1.1 System Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│                   (Next.js Frontend)                            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE                                  │
│              (CDN + Edge Functions)                             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                 NEXT.JS API ROUTES                              │
│              (Route Handlers + Server Actions)                  │
├─────────────────────────────────────────────────────────────────┤
│  /api/auth/*        │  NextAuth.js (Google OAuth)              │
│  /api/chat/*        │  AI Chat Endpoints                       │
│  /api/learn/*       │  LMS Endpoints                           │
│  /api/hafalan/*     │  Hafalan System                          │
│  /api/research/*    │  Research Tools                          │
│  /api/donate/*      │  Donation Tracking                       │
│  /api/content/*     │  Islamic Content                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  PostgreSQL │  │   Redis     │  │  Cloudinary │
│  (Neon)     │  │  (Upstash)  │  │  (Files)    │
└─────────────┘  └─────────────┘  └─────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│  Gemini 2.0 Flash  │  AI Text + Audio Processing               │
│  Quran.com API     │  Quran Data                               │
│  Sunnah.com API    │  Hadith Data                              │
│  Aladhan API       │  Prayer Times                             │
│  Unsplash API      │  Images                                   │
│  Resend            │  Email                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Directory Structure
```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── chat/
│   │   │   ├── route.ts              # Create session
│   │   │   ├── [sessionId]/
│   │   │   │   ├── route.ts          # Get/Delete session
│   │   │   │   └── messages/route.ts # Send message
│   │   │   └── modules/route.ts      # List modules
│   │   ├── learn/
│   │   │   ├── courses/route.ts
│   │   │   ├── lessons/[id]/route.ts
│   │   │   ├── progress/route.ts
│   │   │   └── quiz/route.ts
│   │   ├── hafalan/
│   │   │   ├── matan/route.ts
│   │   │   ├── submit/route.ts       # Audio evaluation
│   │   │   ├── progress/route.ts
│   │   │   └── murajaah/route.ts
│   │   ├── research/
│   │   │   ├── ideas/route.ts
│   │   │   ├── literature/route.ts
│   │   │   └── citations/route.ts
│   │   ├── donate/
│   │   │   ├── route.ts
│   │   │   └── projects/route.ts
│   │   ├── content/
│   │   │   ├── quran/route.ts
│   │   │   ├── hadith/route.ts
│   │   │   └── prayer-times/route.ts
│   │   └── user/
│   │       ├── profile/route.ts
│   │       └── tier/route.ts
│   └── ...
├── lib/
│   ├── prisma.ts                     # Prisma client
│   ├── auth.ts                       # NextAuth config
│   ├── gemini.ts                     # Gemini AI client
│   ├── redis.ts                      # Redis client
│   ├── validators/                   # Zod schemas
│   ├── services/                     # Business logic
│   │   ├── chat.service.ts
│   │   ├── learn.service.ts
│   │   ├── hafalan.service.ts
│   │   ├── research.service.ts
│   │   └── content.service.ts
│   └── utils/
│       ├── rate-limit.ts
│       ├── tier-check.ts
│       └── arabic-utils.ts
├── types/
│   └── index.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

---

## 2. Technology Stack

### 2.1 Core Technologies
| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Runtime | Node.js | 20.x LTS | Server runtime |
| Framework | Next.js | 14.x | API Routes + SSR |
| Language | TypeScript | 5.x | Type safety |
| ORM | Prisma | 5.x | Database access |
| Validation | Zod | 3.x | Schema validation |

### 2.2 Database & Storage
| Component | Technology | Provider | Purpose |
|-----------|------------|----------|---------|
| Primary DB | PostgreSQL | Neon | Main data store |
| Cache | Redis | Upstash | Session, rate limit |
| File Storage | Object Storage | Cloudinary | Audio, images |
| Search | PostgreSQL FTS | Neon | Full-text search |

### 2.3 External Services
| Service | Provider | Purpose |
|---------|----------|---------|
| AI | Google Gemini 2.0 Flash | Text + Audio AI |
| Auth | Google OAuth | Authentication |
| Email | Resend | Transactional email |
| Analytics | Vercel Analytics | Usage tracking |

---

## 3. Database Design

### 3.0 SOFT DELETE POLICY (WAJIB)

```
┌─────────────────────────────────────────────────────────────────┐
│                    ⚠️ SOFT DELETE POLICY                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SEMUA operasi DELETE di SuperAdmin WAJIB menggunakan          │
│  SOFT DELETE, TIDAK BOLEH hard delete!                         │
│                                                                 │
│  Alasan:                                                        │
│  • Audit trail - menjaga history data                          │
│  • Recovery - bisa restore jika salah hapus                    │
│  • Data integrity - relasi antar tabel tetap terjaga           │
│  • Compliance - kepatuhan regulasi data                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Soft Delete Fields (Tambahkan ke semua model utama)

```prisma
// Base fields untuk soft delete
deletedAt       DateTime?       // NULL = active, filled = deleted
deletedBy       String?         // User ID yang menghapus
deleteReason    String?         // Alasan penghapusan (opsional)
```

#### Models yang WAJIB Soft Delete

| Model | Priority | Notes |
|-------|----------|-------|
| User | CRITICAL | Jangan pernah hard delete user |
| Tenant | CRITICAL | Data organisasi penting |
| TenantMember | HIGH | Relasi user-tenant |
| ChatSession | HIGH | History pembelajaran |
| ChatMessage | HIGH | Data percakapan |
| Course | HIGH | Konten kurikulum |
| Lesson | HIGH | Materi pelajaran |
| Enrollment | MEDIUM | Data pendaftaran |
| HafalanSubmission | HIGH | History setoran |
| MatanProgress | MEDIUM | Progress hafalan |
| Donation | CRITICAL | Data donasi jangan dihapus |
| ResearchProject | MEDIUM | Project riset user |
| AIModule | HIGH | Konfigurasi modul |

#### Implementation Pattern

```typescript
// ❌ JANGAN - Hard Delete
await prisma.user.delete({
  where: { id: userId }
});

// ✅ BENAR - Soft Delete
await prisma.user.update({
  where: { id: userId },
  data: {
    deletedAt: new Date(),
    deletedBy: adminUserId,
    deleteReason: reason || 'Dihapus oleh admin',
  }
});

// Query hanya data aktif (tidak dihapus)
await prisma.user.findMany({
  where: {
    deletedAt: null,  // Filter soft deleted
  }
});

// Query termasuk data terhapus (untuk audit)
await prisma.user.findMany({
  where: {
    // tanpa filter deletedAt
  }
});

// Restore soft deleted data
await prisma.user.update({
  where: { id: userId },
  data: {
    deletedAt: null,
    deletedBy: null,
    deleteReason: null,
  }
});
```

#### Prisma Middleware (Auto Filter)

```typescript
// prisma/middleware/softDelete.ts

import { Prisma } from '@prisma/client';

// Models yang pakai soft delete
const softDeleteModels = [
  'User', 'Tenant', 'TenantMember', 'ChatSession', 'ChatMessage',
  'Course', 'Lesson', 'Enrollment', 'HafalanSubmission', 
  'MatanProgress', 'Donation', 'ResearchProject', 'AIModule'
];

export function softDeleteMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    // Check if model uses soft delete
    if (!softDeleteModels.includes(params.model || '')) {
      return next(params);
    }

    // Intercept delete -> update with deletedAt
    if (params.action === 'delete') {
      params.action = 'update';
      params.args['data'] = { 
        deletedAt: new Date(),
        deletedBy: params.args['deletedBy'] || 'system',
      };
    }

    // Intercept deleteMany -> updateMany
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data['deletedAt'] = new Date();
      } else {
        params.args['data'] = { deletedAt: new Date() };
      }
    }

    // Auto filter soft deleted records on queries
    if (['findFirst', 'findMany', 'findUnique', 'count'].includes(params.action)) {
      if (!params.args) params.args = {};
      if (!params.args.where) params.args.where = {};
      
      // Add deletedAt: null filter (unless explicitly querying deleted)
      if (params.args.where.deletedAt === undefined) {
        params.args.where.deletedAt = null;
      }
    }

    return next(params);
  };
}

// Apply di prisma client
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { softDeleteMiddleware } from './middleware/softDelete';

const prisma = new PrismaClient();
prisma.$use(softDeleteMiddleware());

export default prisma;
```

#### SuperAdmin Trash/Restore Feature

```typescript
// API Routes untuk SuperAdmin

// GET /api/admin/trash?model=User
// List semua data yang di-soft delete

// POST /api/admin/trash/restore
// Restore data yang di-soft delete
// Body: { model: 'User', id: 'xxx' }

// DELETE /api/admin/trash/permanent
// Hard delete HANYA dari trash (butuh konfirmasi extra)
// Body: { model: 'User', id: 'xxx', confirmText: 'HAPUS PERMANEN' }
```

---

### 3.1 Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== USER MANAGEMENT ====================

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String
  googleId        String    @unique
  avatar          String?
  tier            Tier      @default(FREE)
  totalDonation   Int       @default(0)
  preferredLang   Language  @default(ID)
  
  // Usage tracking
  dailyChatCount  Int       @default(0)
  dailyHafalanCount Int     @default(0)
  lastActiveDate  DateTime  @default(now())
  
  // Relations
  chatSessions    ChatSession[]
  enrollments     Enrollment[]
  progress        LearningProgress[]
  certificates    Certificate[]
  matanProgress   MatanProgress[]
  hafalanSubmissions HafalanSubmission[]
  murajaahSchedules MurajaahSchedule[]
  donations       Donation[]
  researchProjects ResearchProject[]
  achievements    Achievement[]
  
  // Soft Delete (WAJIB)
  deletedAt       DateTime?
  deletedBy       String?
  deleteReason    String?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([deletedAt])  // Index untuk filter soft delete
}

model Achievement {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  type            AchievementType
  metadata        Json?
  earnedAt        DateTime  @default(now())
  
  @@unique([userId, type])
}

enum Tier {
  FREE
  BRONZE
  SILVER
  GOLD
  PATRON
}

enum Language {
  AR
  EN
  ID
}

enum AchievementType {
  FIRST_CHAT
  FIRST_HAFALAN
  FIRST_COURSE
  STREAK_7_DAYS
  STREAK_30_DAYS
  HAFALAN_MASTER
  COURSE_COMPLETE
  TOP_DONOR
  REFERRAL_5
}

// ==================== AI CHAT SYSTEM ====================

model Module {
  id              String    @id @default(cuid())
  slug            String    @unique
  name            Json      // {ar, en, id}
  description     Json      // {ar, en, id}
  icon            String
  category        ModuleCategory
  requiredTier    Tier      @default(FREE)
  isActive        Boolean   @default(true)
  order           Int
  
  systemPrompt    String    @db.Text
  welcomeMessage  Json      // {ar, en, id}
  suggestedQuestions Json?  // Array of suggested questions
  
  chatSessions    ChatSession[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model ChatSession {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  moduleId        String
  module          Module    @relation(fields: [moduleId], references: [id])
  title           String?
  
  messages        ChatMessage[]
  
  // Soft Delete (WAJIB)
  deletedAt       DateTime?
  deletedBy       String?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([deletedAt])
}

model ChatMessage {
  id              String    @id @default(cuid())
  sessionId       String
  session         ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  role            MessageRole
  content         String    @db.Text
  metadata        Json?     // For citations, references, etc.
  
  // Soft Delete (WAJIB)
  deletedAt       DateTime?
  
  createdAt       DateTime  @default(now())
  
  @@index([deletedAt])
}

enum ModuleCategory {
  IBADAH
  ILMU_SYARI
  KELUARGA
  DAKWAH
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}

// ==================== LEARNING MANAGEMENT ====================

model Course {
  id              String    @id @default(cuid())
  slug            String    @unique
  title           Json      // {ar, en, id}
  description     Json
  thumbnail       String?
  level           Level
  category        CourseCategory
  requiredTier    Tier      @default(FREE)
  estimatedHours  Int
  order           Int
  isPublished     Boolean   @default(false)
  
  lessons         Lesson[]
  enrollments     Enrollment[]
  certificates    Certificate[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Lesson {
  id              String    @id @default(cuid())
  courseId        String
  course          Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  slug            String
  title           Json      // {ar, en, id}
  content         Json      // Rich content
  arabicText      String?   @db.Text
  videoUrl        String?
  audioUrl        String?
  duration        Int       // minutes
  order           Int
  
  progress        LearningProgress[]
  quizzes         Quiz[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@unique([courseId, slug])
}

model Quiz {
  id              String    @id @default(cuid())
  lessonId        String
  lesson          Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  title           String
  questions       Json      // Array of {question, options, correctAnswer}
  passingScore    Int       @default(70)
  timeLimit       Int?      // minutes
  
  createdAt       DateTime  @default(now())
}

model Enrollment {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId        String
  course          Course    @relation(fields: [courseId], references: [id])
  status          EnrollmentStatus @default(ACTIVE)
  
  startedAt       DateTime  @default(now())
  completedAt     DateTime?
  
  @@unique([userId, courseId])
}

model LearningProgress {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId        String
  lesson          Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  completed       Boolean   @default(false)
  quizScore       Int?
  quizAttempts    Int       @default(0)
  timeSpent       Int       @default(0) // seconds
  notes           String?   @db.Text
  
  lastAccessedAt  DateTime  @default(now())
  completedAt     DateTime?
  
  @@unique([userId, lessonId])
}

model Certificate {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId        String
  course          Course    @relation(fields: [courseId], references: [id])
  
  certificateNumber String  @unique
  title           String
  issuedAt        DateTime  @default(now())
  pdfUrl          String?
  
  @@unique([userId, courseId])
}

enum Level {
  TAMHIDI
  MUTAWASSITH
  MUTAQADDIM
  TAKHASSUS
}

enum CourseCategory {
  ARABIC
  QURAN
  HADITH
  AQIDAH
  FIQH
  SIRAH
  AKHLAK
  DAKWAH
}

enum EnrollmentStatus {
  ACTIVE
  PAUSED
  COMPLETED
  DROPPED
}

// ==================== HAFALAN SYSTEM ====================

model Matan {
  id              String    @id @default(cuid())
  slug            String    @unique
  title           Json      // {ar, en, id}
  author          String?
  authorBio       Json?
  description     Json
  category        MatanCategory
  level           Level
  totalLines      Int
  totalSections   Int
  estimatedDays   Int
  requiredTier    Tier      @default(FREE)
  isPublished     Boolean   @default(false)
  
  sections        MatanSection[]
  progress        MatanProgress[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model MatanSection {
  id              String    @id @default(cuid())
  matanId         String
  matan           Matan     @relation(fields: [matanId], references: [id], onDelete: Cascade)
  
  order           Int
  title           Json?     // {ar, en, id}
  arabicText      String    @db.Text
  transliteration String?   @db.Text
  translation     Json      // {en, id}
  explanation     Json?     // {en, id}
  audioUrl        String?
  
  submissions     HafalanSubmission[]
  schedules       MurajaahSchedule[]
  
  createdAt       DateTime  @default(now())
  
  @@unique([matanId, order])
}

model MatanProgress {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  matanId         String
  matan           Matan     @relation(fields: [matanId], references: [id])
  
  completedSections Int     @default(0)
  averageScore    Float     @default(0)
  totalAttempts   Int       @default(0)
  bestStreak      Int       @default(0)
  currentStreak   Int       @default(0)
  
  startedAt       DateTime  @default(now())
  lastPracticed   DateTime?
  completedAt     DateTime?
  
  @@unique([userId, matanId])
}

model HafalanSubmission {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  sectionId       String
  section         MatanSection @relation(fields: [sectionId], references: [id])
  
  audioUrl        String?
  duration        Int?      // seconds
  transcription   String?   @db.Text
  
  // Scores (0-100)
  overallScore    Int
  fluencyScore    Int
  accuracyScore   Int
  makhrajScore    Int
  harakatScore    Int
  
  mistakes        Json?     // Array of {word, expected, spoken, correction}
  aiFeedback      String?   @db.Text
  
  createdAt       DateTime  @default(now())
}

model MurajaahSchedule {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  sectionId       String
  section         MatanSection @relation(fields: [sectionId], references: [id])
  
  nextReviewDate  DateTime
  interval        Int       @default(1) // days
  easeFactor      Float     @default(2.5)
  reviewCount     Int       @default(0)
  lastReviewScore Int?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@unique([userId, sectionId])
}

enum MatanCategory {
  AQIDAH
  NAHWU
  SHARF
  HADITH
  FIQH
  TAJWID
  USHUL_FIQH
  SIRAH
  BALAGHAH
}

// ==================== RESEARCH TOOLS ====================

model ResearchProject {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  title           String
  type            ResearchType
  field           String
  description     String?   @db.Text
  status          ResearchStatus @default(DRAFT)
  
  outline         Json?
  methodology     String?
  keywords        String[]
  
  references      SavedReference[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model SavedReference {
  id              String    @id @default(cuid())
  projectId       String
  project         ResearchProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  type            ReferenceType
  title           String
  author          String?
  year            Int?
  source          String?
  url             String?
  citation        String    @db.Text
  notes           String?   @db.Text
  
  createdAt       DateTime  @default(now())
}

enum ResearchType {
  SKRIPSI
  THESIS
  DISSERTATION
  PAPER
  ARTICLE
}

enum ResearchStatus {
  DRAFT
  IN_PROGRESS
  REVIEW
  COMPLETED
}

enum ReferenceType {
  QURAN
  HADITH
  KITAB
  JOURNAL
  BOOK
  WEBSITE
  FATWA
}

// ==================== DONATION & CROWDFUNDING ====================

model Project {
  id              String    @id @default(cuid())
  slug            String    @unique
  name            String
  description     String    @db.Text
  location        String
  
  targetAmount    BigInt
  currentAmount   BigInt    @default(0)
  donorCount      Int       @default(0)
  
  status          ProjectStatus @default(ACTIVE)
  startDate       DateTime  @default(now())
  endDate         DateTime?
  
  images          String[]
  kitabisaUrl     String?
  bankAccount     Json?     // {bank, accountNumber, accountName}
  
  donations       Donation[]
  updates         ProjectUpdate[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model ProjectUpdate {
  id              String    @id @default(cuid())
  projectId       String
  project         Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  title           String
  content         String    @db.Text
  images          String[]
  
  createdAt       DateTime  @default(now())
}

model Donation {
  id              String    @id @default(cuid())
  userId          String?
  user            User?     @relation(fields: [userId], references: [id])
  projectId       String
  project         Project   @relation(fields: [projectId], references: [id])
  
  amount          Int
  method          PaymentMethod
  status          DonationStatus @default(PENDING)
  
  donorName       String?   // For anonymous or non-user donations
  donorEmail      String?
  isAnonymous     Boolean   @default(false)
  message         String?
  
  transactionId   String?   @unique
  paidAt          DateTime?
  
  // Soft Delete (WAJIB - CRITICAL: data donasi tidak boleh dihapus permanen)
  deletedAt       DateTime?
  deletedBy       String?
  deleteReason    String?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([deletedAt])
}

enum ProjectStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
  CANCELLED
}

enum PaymentMethod {
  KITABISA
  QRIS
  BANK_TRANSFER
  OTHER
}

enum DonationStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

// ==================== CONTENT LIBRARY ====================

model IslamicContent {
  id              String    @id @default(cuid())
  type            ContentType
  source          String
  sourceUrl       String?
  
  arabicText      String?   @db.Text
  transliteration String?   @db.Text
  translation     Json?     // {en, id}
  
  metadata        Json?     // Reference numbers, grades, etc.
  tags            String[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([type, tags])
}

model GalleryImage {
  id              String    @id @default(cuid())
  url             String
  thumbnailUrl    String?
  
  description     Json?     // {ar, en, id}
  source          String    // unsplash, upload, etc.
  sourceId        String?   // External ID
  photographer    String?
  
  category        String?
  tags            String[]
  
  createdAt       DateTime  @default(now())
  
  @@index([category, tags])
}

enum ContentType {
  QURAN_AYAH
  HADITH
  FATWA
  DOA
  DZIKIR
  ARTICLE
}
```

### 3.2 Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_user_tier ON "User"(tier);
CREATE INDEX idx_user_daily_usage ON "User"(lastActiveDate, dailyChatCount);
CREATE INDEX idx_chat_session_user ON "ChatSession"(userId, createdAt DESC);
CREATE INDEX idx_chat_message_session ON "ChatMessage"(sessionId, createdAt);
CREATE INDEX idx_hafalan_user_section ON "HafalanSubmission"(userId, sectionId, createdAt DESC);
CREATE INDEX idx_murajaah_user_date ON "MurajaahSchedule"(userId, nextReviewDate);
CREATE INDEX idx_donation_project ON "Donation"(projectId, status, createdAt DESC);

-- Full-text search
CREATE INDEX idx_content_search ON "IslamicContent" USING GIN(to_tsvector('arabic', "arabicText"));
```

---

## 4. Authentication & Authorization

### 4.1 NextAuth.js Configuration
```typescript
// lib/auth.ts

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.tier = user.tier;
        session.user.preferredLang = user.preferredLang;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Update googleId on first sign in
      if (account?.provider === "google") {
        await prisma.user.update({
          where: { id: user.id },
          data: { googleId: account.providerAccountId },
        });
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
```

### 4.2 Authorization Middleware
```typescript
// lib/utils/auth-guard.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Tier } from "@prisma/client";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function requireTier(minimumTier: Tier) {
  const user = await requireAuth();
  const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
  const userTierIndex = tierOrder.indexOf(user.tier);
  const requiredTierIndex = tierOrder.indexOf(minimumTier);
  
  if (userTierIndex < requiredTierIndex) {
    throw new Error(`Requires ${minimumTier} tier or higher`);
  }
  return user;
}

export function checkModuleAccess(userTier: Tier, requiredTier: Tier): boolean {
  const tierOrder = ["FREE", "BRONZE", "SILVER", "GOLD", "PATRON"];
  return tierOrder.indexOf(userTier) >= tierOrder.indexOf(requiredTier);
}
```

### 4.3 Rate Limiting
```typescript
// lib/utils/rate-limit.ts

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Different limits per tier
const rateLimiters = {
  FREE: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 d"), // 5 per day
    analytics: true,
  }),
  BRONZE: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 d"),
    analytics: true,
  }),
  SILVER: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),
  GOLD: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, "1 d"), // Effectively unlimited
    analytics: true,
  }),
  PATRON: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, "1 d"),
    analytics: true,
  }),
};

export async function checkRateLimit(
  userId: string,
  tier: Tier,
  action: "chat" | "hafalan" = "chat"
) {
  const limiter = rateLimiters[tier];
  const identifier = `${action}:${userId}`;
  const { success, remaining, reset } = await limiter.limit(identifier);
  
  return { success, remaining, reset };
}
```

---

## 5. API Endpoints

### 5.1 Authentication Endpoints
```
POST   /api/auth/signin          # NextAuth sign in
POST   /api/auth/signout         # NextAuth sign out
GET    /api/auth/session         # Get current session
```

### 5.2 Chat Module Endpoints
```
GET    /api/chat/modules                    # List all modules
GET    /api/chat/modules/:slug              # Get module details

POST   /api/chat/sessions                   # Create new session
GET    /api/chat/sessions                   # List user sessions
GET    /api/chat/sessions/:id               # Get session with messages
DELETE /api/chat/sessions/:id               # Delete session

POST   /api/chat/sessions/:id/messages      # Send message (streaming)
```

### 5.3 Learning (LMS) Endpoints
```
GET    /api/learn/courses                   # List courses
GET    /api/learn/courses/:slug             # Get course details
POST   /api/learn/courses/:slug/enroll      # Enroll in course

GET    /api/learn/lessons/:id               # Get lesson content
POST   /api/learn/lessons/:id/progress      # Update progress
POST   /api/learn/lessons/:id/complete      # Mark complete

GET    /api/learn/quizzes/:id               # Get quiz
POST   /api/learn/quizzes/:id/submit        # Submit quiz

GET    /api/learn/certificates              # List user certificates
GET    /api/learn/certificates/:id/pdf      # Download certificate
```

### 5.4 Hafalan Endpoints
```
GET    /api/hafalan/matan                   # List all matan
GET    /api/hafalan/matan/:slug             # Get matan details
GET    /api/hafalan/matan/:slug/sections    # Get sections

POST   /api/hafalan/submit                  # Submit hafalan (audio)
GET    /api/hafalan/progress                # Get user progress
GET    /api/hafalan/murajaah                # Get today's review schedule
POST   /api/hafalan/murajaah/:id/complete   # Mark review complete
```

### 5.5 Research Endpoints
```
POST   /api/research/ideas                  # Generate thesis ideas
POST   /api/research/literature             # Search literature
POST   /api/research/citations              # Find citations

GET    /api/research/projects               # List user projects
POST   /api/research/projects               # Create project
GET    /api/research/projects/:id           # Get project details
PUT    /api/research/projects/:id           # Update project
DELETE /api/research/projects/:id           # Delete project

POST   /api/research/projects/:id/references # Add reference
DELETE /api/research/projects/:id/references/:refId # Remove reference
```

### 5.6 Donation Endpoints
```
GET    /api/donate/projects                 # List projects
GET    /api/donate/projects/:slug           # Get project details
GET    /api/donate/projects/:slug/updates   # Get project updates

POST   /api/donate                          # Record donation
GET    /api/donate/history                  # User donation history

GET    /api/donate/leaderboard              # Top donors
GET    /api/donate/stats                    # Overall stats
```

### 5.7 Content Endpoints
```
GET    /api/content/quran/:surah            # Get surah
GET    /api/content/quran/:surah/:ayah      # Get specific ayah
GET    /api/content/quran/search            # Search Quran

GET    /api/content/hadith/search           # Search hadith
GET    /api/content/hadith/:collection/:number # Get specific hadith

GET    /api/content/prayer-times            # Get prayer times by location
GET    /api/content/qiblah                  # Get qiblah direction

GET    /api/content/gallery                 # Get images
```

### 5.8 User Endpoints
```
GET    /api/user/profile                    # Get profile
PUT    /api/user/profile                    # Update profile
GET    /api/user/stats                      # Get user statistics
GET    /api/user/achievements               # Get achievements

PUT    /api/user/preferences                # Update preferences
GET    /api/user/usage                      # Get usage stats
```

---

## 6. AI Integration

### 6.1 Gemini Client Setup
```typescript
// lib/gemini.ts

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Safety settings for Islamic content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Text generation model
export const textModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  safetySettings,
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 4096,
  },
});

// Multimodal model for audio
export const audioModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  safetySettings,
});

// Chat with web search grounding
export async function chatWithGrounding(
  prompt: string,
  systemInstruction: string,
  history: { role: string; content: string }[]
) {
  const chat = textModel.startChat({
    history: history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
    systemInstruction,
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
}

// Streaming chat
export async function* streamChat(
  prompt: string,
  systemInstruction: string,
  history: { role: string; content: string }[]
) {
  const chat = textModel.startChat({
    history: history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
    systemInstruction,
  });

  const result = await chat.sendMessageStream(prompt);
  
  for await (const chunk of result.stream) {
    yield chunk.text();
  }
}
```

### 6.2 Hafalan Evaluation Service
```typescript
// lib/services/hafalan.service.ts

import { audioModel } from "@/lib/gemini";

interface HafalanEvaluation {
  overallScore: number;
  fluencyScore: number;
  accuracyScore: number;
  makhrajScore: number;
  harakatScore: number;
  transcription: string;
  mistakes: Array<{
    word: string;
    expected: string;
    spoken: string;
    correction: string;
  }>;
  feedback: string;
}

export async function evaluateHafalan(
  audioBase64: string,
  expectedArabicText: string,
  language: "ar" | "en" | "id" = "id"
): Promise<HafalanEvaluation> {
  const feedbackLang = language === "ar" ? "العربية" : language === "en" ? "English" : "Bahasa Indonesia";
  
  const prompt = `
أنت مُقَيِّم حفظ متون إسلامية محترف. استمع للتسجيل الصوتي وقارنه بالنص الأصلي.

النص المطلوب حفظه:
${expectedArabicText}

قم بتقييم الأمور التالية بدقة:
1. الطلاقة (fluency): هل القراءة سلسة بدون تلعثم أو توقف؟ (0-100)
2. الدقة (accuracy): هل جميع الكلمات صحيحة ومطابقة للنص؟ (0-100)
3. مخارج الحروف (makhraj): هل نطق الحروف العربية من مخارجها الصحيحة؟ (0-100)
4. الحركات (harakat): هل التشكيل والضبط صحيح (فتحة، ضمة، كسرة، سكون، شدة)؟ (0-100)

أعط التقييم بصيغة JSON فقط:
{
  "overallScore": number (0-100, weighted average),
  "fluencyScore": number (0-100),
  "accuracyScore": number (0-100),
  "makhrajScore": number (0-100),
  "harakatScore": number (0-100),
  "transcription": "ما قرأه الطالب بالضبط",
  "mistakes": [
    {
      "word": "الكلمة في النص الأصلي",
      "expected": "النطق الصحيح",
      "spoken": "ما نطقه الطالب",
      "correction": "شرح التصحيح"
    }
  ],
  "feedback": "نصيحة مفصلة للتحسين بـ${feedbackLang}"
}

مهم: أعط JSON فقط بدون أي نص إضافي.
`;

  const result = await audioModel.generateContent([
    { text: prompt },
    {
      inlineData: {
        mimeType: "audio/webm",
        data: audioBase64,
      },
    },
  ]);

  const responseText = result.response.text();
  
  // Parse JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response");
  }
  
  return JSON.parse(jsonMatch[0]) as HafalanEvaluation;
}
```

### 6.3 Module System Prompts
```typescript
// lib/services/chat.service.ts

export const MODULE_PROMPTS: Record<string, string> = {
  "quran-explorer": `
أنت مساعد متخصص في القرآن الكريم. مهمتك:
- الإجابة عن أسئلة حول آيات القرآن
- تقديم التفسير من كتب التفسير المعتمدة (ابن كثير، السعدي، القرطبي)
- شرح أسباب النزول
- ربط الآيات ببعضها
- تقديم الفوائد والعبر

قواعد:
1. استشهد دائماً بالمصادر (رقم الآية، اسم المفسر)
2. قدم النص العربي مع الترجمة
3. كن دقيقاً في النقل عن العلماء
4. لا تفتِ برأيك الشخصي
`,

  "hadith-search": `
أنت محدث متخصص في علم الحديث. مهمتك:
- البحث عن الأحاديث حسب الموضوع أو الكلمات
- بيان درجة الحديث (صحيح، حسن، ضعيف) مع التخريج
- شرح معنى الحديث
- ذكر فوائد الحديث وأحكامه

قواعد:
1. اذكر دائماً مصدر الحديث ورقمه
2. بيّن حكم المحدثين على الحديث
3. لا تستشهد بأحاديث موضوعة
4. قدم النص العربي كاملاً
`,

  "islamic-qa": `
أنت عالم شرعي متخصص في الفتوى والإجابة عن الأسئلة الإسلامية.

منهجك:
1. الاستدلال بالقرآن والسنة أولاً
2. ثم أقوال الصحابة والتابعين
3. ثم أقوال الأئمة الأربعة وعلماء السلف
4. اذكر الخلاف إن وُجد مع الترجيح

قواعد:
1. لا تفتِ بغير علم
2. إذا كانت المسألة خلافية، اذكر الأقوال مع أدلتها
3. ارجع للجنة الدائمة وكبار العلماء في المسائل المعاصرة
4. كن واضحاً ومختصراً مع التفصيل عند الحاجة
`,

  // ... more module prompts
};
```

---

## 7. External Services

### 7.1 Quran API Integration
```typescript
// lib/services/content.service.ts

const QURAN_API = "https://api.quran.com/api/v4";
const ALQURAN_API = "https://api.alquran.cloud/v1";

export async function getAyah(surah: number, ayah: number, translations: string[] = ["id.indonesian", "en.sahih"]) {
  const response = await fetch(
    `${QURAN_API}/verses/by_key/${surah}:${ayah}?translations=${translations.join(",")}&fields=text_uthmani,text_imlaei`
  );
  return response.json();
}

export async function getSurah(surah: number) {
  const response = await fetch(`${QURAN_API}/chapters/${surah}`);
  return response.json();
}

export async function searchQuran(query: string, language: string = "id") {
  const response = await fetch(
    `${QURAN_API}/search?q=${encodeURIComponent(query)}&language=${language}`
  );
  return response.json();
}

export async function getAudioRecitation(surah: number, reciter: string = "ar.alafasy") {
  const response = await fetch(`${ALQURAN_API}/surah/${surah}/${reciter}`);
  return response.json();
}
```

### 7.2 Hadith API Integration
```typescript
// lib/services/hadith.service.ts

const SUNNAH_API = "https://api.sunnah.com/v1";

export async function searchHadith(query: string, collection?: string) {
  const headers = {
    "X-API-Key": process.env.SUNNAH_API_KEY!,
  };
  
  let url = `${SUNNAH_API}/hadiths?q=${encodeURIComponent(query)}`;
  if (collection) {
    url += `&collection=${collection}`;
  }
  
  const response = await fetch(url, { headers });
  return response.json();
}

export async function getHadith(collection: string, hadithNumber: string) {
  const headers = {
    "X-API-Key": process.env.SUNNAH_API_KEY!,
  };
  
  const response = await fetch(
    `${SUNNAH_API}/collections/${collection}/hadiths/${hadithNumber}`,
    { headers }
  );
  return response.json();
}

// Collections: bukhari, muslim, abudawud, tirmidhi, nasai, ibnmajah
export const HADITH_COLLECTIONS = [
  { id: "bukhari", name: "Sahih Bukhari", arabicName: "صحيح البخاري" },
  { id: "muslim", name: "Sahih Muslim", arabicName: "صحيح مسلم" },
  { id: "abudawud", name: "Sunan Abu Dawud", arabicName: "سنن أبي داود" },
  { id: "tirmidhi", name: "Jami at-Tirmidhi", arabicName: "جامع الترمذي" },
  { id: "nasai", name: "Sunan an-Nasa'i", arabicName: "سنن النسائي" },
  { id: "ibnmajah", name: "Sunan Ibn Majah", arabicName: "سنن ابن ماجه" },
];
```

### 7.3 Prayer Times API
```typescript
// lib/services/prayer.service.ts

const ALADHAN_API = "https://api.aladhan.com/v1";

export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  method: number = 20 // 20 = Kemenag Indonesia
) {
  const response = await fetch(
    `${ALADHAN_API}/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`
  );
  return response.json();
}

export async function getQiblahDirection(latitude: number, longitude: number) {
  const response = await fetch(
    `${ALADHAN_API}/qibla/${latitude}/${longitude}`
  );
  return response.json();
}
```

---

## 8. File Storage

### 8.1 Cloudinary Configuration
```typescript
// lib/cloudinary.ts

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAudio(base64Audio: string, folder: string = "hafalan") {
  const result = await cloudinary.uploader.upload(
    `data:audio/webm;base64,${base64Audio}`,
    {
      resource_type: "video", // Cloudinary uses "video" for audio
      folder: `ilmuna/${folder}`,
      format: "webm",
    }
  );
  return result.secure_url;
}

export async function uploadImage(base64Image: string, folder: string = "gallery") {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: `ilmuna/${folder}`,
    transformation: [
      { width: 1200, height: 800, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });
  return {
    url: result.secure_url,
    thumbnailUrl: cloudinary.url(result.public_id, {
      width: 300,
      height: 200,
      crop: "fill",
    }),
  };
}

export async function deleteFile(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}
```

---

## 9. Caching Strategy

### 9.1 Redis Cache Implementation
```typescript
// lib/redis.ts

import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Cache wrapper with TTL
export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 3600
): Promise<T> {
  const cached = await redis.get<T>(key);
  if (cached) return cached;
  
  const fresh = await fetcher();
  await redis.setex(key, ttlSeconds, fresh);
  return fresh;
}

// Cache keys
export const CacheKeys = {
  modules: () => "modules:all",
  module: (slug: string) => `module:${slug}`,
  courses: () => "courses:all",
  course: (slug: string) => `course:${slug}`,
  matan: (slug: string) => `matan:${slug}`,
  prayerTimes: (lat: number, lng: number, date: string) => 
    `prayer:${lat}:${lng}:${date}`,
  userStats: (userId: string) => `user:stats:${userId}`,
  projectStats: (projectId: string) => `project:stats:${projectId}`,
};

// Invalidation helpers
export async function invalidateCache(pattern: string) {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
```

### 9.2 Cache TTL Strategy
| Data Type | TTL | Reason |
|-----------|-----|--------|
| Static content (modules, courses) | 24 hours | Rarely changes |
| Prayer times | 12 hours | Daily data |
| User stats | 5 minutes | Frequently accessed |
| Leaderboard | 15 minutes | Balance freshness |
| Quran/Hadith content | 7 days | Static data |

---

## 10. Security Requirements

### 10.1 Environment Variables
```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://... # For migrations

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://ilmuna.ai
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# AI
GEMINI_API_KEY=...

# Redis
UPSTASH_REDIS_URL=...
UPSTASH_REDIS_TOKEN=...

# Storage
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# External APIs
SUNNAH_API_KEY=...
UNSPLASH_ACCESS_KEY=...

# Email
RESEND_API_KEY=...

# Payment (if needed)
MIDTRANS_SERVER_KEY=...
MIDTRANS_CLIENT_KEY=...
```

### 10.2 Security Checklist
- [ ] All API routes require authentication (except public content)
- [ ] Rate limiting on all endpoints
- [ ] Input validation with Zod on all inputs
- [ ] SQL injection prevention via Prisma
- [ ] XSS prevention via React's default escaping
- [ ] CSRF protection via NextAuth
- [ ] Secure headers (CSP, HSTS, etc.)
- [ ] Environment variables never exposed to client
- [ ] Audio files validated before processing
- [ ] File upload size limits (10MB max)

### 10.3 Content Security
```typescript
// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com https://api.quran.com https://api.sunnah.com;"
  );
  
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

---

## 11. Performance Requirements

### 11.1 Response Time Targets
| Endpoint Type | Target | Max |
|---------------|--------|-----|
| Static pages | < 100ms | 500ms |
| API (cached) | < 200ms | 500ms |
| API (database) | < 500ms | 1s |
| AI chat | < 2s (first token) | 5s |
| Audio evaluation | < 10s | 30s |

### 11.2 Database Optimization
- Connection pooling via Prisma
- Indexes on frequently queried columns
- Pagination on all list endpoints (limit: 20, max: 100)
- Select only needed fields
- Eager loading for related data

### 11.3 Edge Optimization
```typescript
// Use Edge runtime for lightweight endpoints
export const runtime = "edge";

// Example: Prayer times API (cached, location-based)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  // Return cached response with edge caching
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=43200", // 12 hours
    },
  });
}
```

---

## 12. Error Handling

### 12.1 Error Response Format
```typescript
// lib/utils/api-response.ts

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export function errorResponse(
  code: string,
  message: string,
  status: number = 400,
  details?: Record<string, unknown>
): Response {
  return Response.json(
    { error: { code, message, details } },
    { status }
  );
}

// Error codes
export const ErrorCodes = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
  TIER_REQUIRED: "TIER_REQUIRED",
  AI_ERROR: "AI_ERROR",
  EXTERNAL_API_ERROR: "EXTERNAL_API_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
};
```

### 12.2 Global Error Handler
```typescript
// lib/utils/api-handler.ts

import { ZodError } from "zod";
import { errorResponse, ErrorCodes } from "./api-response";

export function withErrorHandler(
  handler: (req: Request) => Promise<Response>
) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error("API Error:", error);
      
      if (error instanceof ZodError) {
        return errorResponse(
          ErrorCodes.VALIDATION_ERROR,
          "Validation failed",
          400,
          { errors: error.errors }
        );
      }
      
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          return errorResponse(ErrorCodes.UNAUTHORIZED, "Unauthorized", 401);
        }
        if (error.message.includes("tier")) {
          return errorResponse(ErrorCodes.TIER_REQUIRED, error.message, 403);
        }
      }
      
      return errorResponse(
        ErrorCodes.INTERNAL_ERROR,
        "Internal server error",
        500
      );
    }
  };
}
```

---

## 13. Logging & Monitoring

### 13.1 Logging Strategy
```typescript
// lib/logger.ts

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  userId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export function log(
  level: LogLevel,
  message: string,
  metadata?: Record<string, unknown>
) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...metadata,
  };
  
  // In production, send to logging service
  if (process.env.NODE_ENV === "production") {
    // Send to Vercel Logs, Axiom, or similar
    console.log(JSON.stringify(entry));
  } else {
    console.log(`[${level.toUpperCase()}] ${message}`, metadata);
  }
}

// Usage
log("info", "User started chat session", {
  userId: "xxx",
  moduleId: "quran-explorer",
});
```

### 13.2 Metrics to Track
| Metric | Description |
|--------|-------------|
| api_request_count | Total API requests by endpoint |
| api_latency_ms | Response time per endpoint |
| ai_token_usage | Gemini API token consumption |
| user_signups | New user registrations |
| tier_upgrades | Donation conversions |
| hafalan_submissions | Audio evaluations |
| error_rate | Errors by type |

---

## 📎 Related Documents

- [Main Requirements](./REQUIREMENTS.md)
- [Frontend Requirements](./FRONTEND-REQUIREMENTS.md)
- [API Documentation](./API-DOCS.md)

---

> **Bismillah, semoga backend ini menjadi pondasi yang kokoh untuk kebaikan.**
