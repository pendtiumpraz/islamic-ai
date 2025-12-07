# 📋 ISLAMIC AI EDUCATION PLATFORM - MVP REQUIREMENTS

> **Codename**: ILMUNA (عِلْمُنَا) - "Ilmu Kita"
> **Version**: 1.0.0-MVP
> **Last Updated**: December 2024

---

## 📖 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Vision](#2-project-vision)
3. [Core Features](#3-core-features)
4. [Module Categories](#4-module-categories)
5. [User Tiers & Access](#5-user-tiers--access)
6. [Multi-Tenant Architecture](#6-multi-tenant-architecture)
7. [Technical Stack](#7-technical-stack)
8. [Database Schema Overview](#8-database-schema-overview)
9. [External Integrations](#9-external-integrations)
10. [Security & Anti-Abuse](#10-security--anti-abuse)
11. [Localization](#11-localization)
12. [MVP Scope & Timeline](#12-mvp-scope--timeline)
13. [Success Metrics](#13-success-metrics)

---

## 1. Executive Summary

**ILMUNA** adalah platform pendidikan Islam berbasis AI yang menggabungkan:
- 🤖 **36+ AI Chat Modules** untuk berbagai topik keislaman
- 🎓 **Learning Management System (LMS)** dengan kurikulum ala Universitas Islam Madinah
- 🎙️ **Hafalan Matan System** dengan Speech-to-Text AI evaluation
- 🔬 **Research Tools** untuk membantu skripsi, tesis, dan disertasi
- 💰 **Crowdfunding** untuk pembangunan Islamic Center di berbagai daerah

---

## 2. Project Vision

### 2.1 Mission Statement
```
Demokratisasi pendidikan Islam berkualitas tinggi dengan metodologi Salaf
untuk seluruh umat Muslim, di mana saja, kapan saja, dengan bantuan AI.
```

### 2.2 Goals
- Menyediakan akses gratis ke ilmu Islam dasar
- Membangun kurikulum terstruktur dari pemula hingga mahir
- Menggunakan AI untuk personalized learning
- Mengumpulkan dana untuk pembangunan Islamic Center

### 2.3 Target Locations (Crowdfunding)
| No | Lokasi | Target Dana |
|----|--------|-------------|
| 1 | Kesamben, Blitar | Rp 500.000.000 |
| 2 | Wlingi, Blitar | Rp 500.000.000 |
| 3 | Talun, Blitar | Rp 400.000.000 |
| 4 | Tugurante, Blitar | Rp 450.000.000 |
| 5 | Jimbe Kademangan, Blitar | Rp 600.000.000 |
| 6 | Garum, Blitar | Rp 500.000.000 |
| **Total** | | **Rp 2.950.000.000** |

---

## 3. Core Features

### 3.1 AI Chat Modules (36 Modules)
Chatbot AI untuk berbagai topik keislaman dengan sumber dari kitab-kitab Salaf.

### 3.2 Learning Management System (LMS)
- Kurikulum terstruktur 4 level: Tamhidi → Mutawassith → Mutaqaddim → Takhassus
- Progress tracking & certificates
- Adaptive learning path

### 3.3 Hafalan Matan System
- Speech-to-Text dengan Gemini 2.0 Flash
- Real-time evaluation (accuracy, makhraj, harakat)
- Spaced repetition untuk muraja'ah
- 16+ classical mutun

### 3.4 Research Tools
- Thesis/Skripsi idea generator
- Literature review assistant
- Citation & reference finder
- Academic writing assistant

### 3.5 Donation & Crowdfunding
- Integration dengan Kitabisa
- QRIS payment
- Bank transfer (Rekening Yayasan)
- Real-time progress tracking per lokasi

### 3.6 Islamic Content Library
- Quran dengan multiple tafsir
- Hadith database (Kutub Sittah+)
- Kitab klasik dari Shamela
- Fatwa database

---

## 4. Module Categories

### 4.1 Kategori 1: Ibadah Harian (8 Modules)
| ID | Module | Description | Tier |
|----|--------|-------------|------|
| M01 | Sholat Guide | Panduan sholat lengkap + jadwal | FREE |
| M02 | Doa & Dzikir | Kumpulan doa + dzikir counter | FREE |
| M03 | Quran Explorer | Baca Quran + tafsir + audio | FREE |
| M04 | Tafsir Al-Quran | Tafsir mendalam multi-kitab | BRONZE |
| M05 | Tahsin & Tajwid | Belajar tajwid + koreksi | BRONZE |
| M06 | Ramadhan Assistant | Panduan puasa + itikaf | FREE |
| M07 | Haji & Umrah | Manasik + doa + checklist | SILVER |
| M08 | Zakat Calculator | Hitung zakat + nisab live | FREE |

### 4.2 Kategori 2: Ilmu Syar'i (8 Modules)
| ID | Module | Description | Tier |
|----|--------|-------------|------|
| M09 | Hadith Search | Cari hadits + takhrij + derajat | FREE |
| M10 | Fiqh Assistant | Tanya jawab fiqh 4 madzhab | BRONZE |
| M11 | Aqidah Guide | Aqidah Ahlus Sunnah | FREE |
| M12 | Ushul Fiqh | Kaidah fiqhiyah | SILVER |
| M13 | Musthalah Hadits | Ilmu hadits + rijal | SILVER |
| M14 | Matan Kitab | Baca matan + syarah | BRONZE |
| M15 | Kutub Ulama | Library kitab digital | SILVER |
| M16 | Dalil Finder | Cari dalil per masalah | BRONZE |

### 4.3 Kategori 3: Keluarga & Kehidupan (10 Modules)
| ID | Module | Description | Tier |
|----|--------|-------------|------|
| M17 | Nikah Islami | Panduan pernikahan Islam | BRONZE |
| M18 | Parenting Islami | Mendidik anak Islami | BRONZE |
| M19 | Anak Muslim | Konten Islam untuk anak | FREE |
| M20 | Wanita Muslimah | Fiqh wanita lengkap | BRONZE |
| M21 | Nama Islami | Generator nama + arti | FREE |
| M22 | Muamalah | Hukum bisnis & jual beli | SILVER |
| M23 | Waris Islam | Kalkulator waris | SILVER |
| M24 | Kurban & Aqiqah | Panduan kurban/aqiqah | FREE |
| M25 | Jenazah Guide | Tajhiz jenazah lengkap | FREE |
| M26 | Ruqyah Guide | Ruqyah syar'iyyah | BRONZE |

### 4.4 Kategori 4: Dakwah & Kreativitas (10 Modules)
| ID | Module | Description | Tier |
|----|--------|-------------|------|
| M27 | Khutbah Generator | Generate khutbah + dalil | SILVER |
| M28 | Khatib & Imam | Tips khutbah + adab imam | BRONZE |
| M29 | Dakwah Book Writer | AI bantu tulis buku | GOLD |
| M30 | Dakwah Daerah | Konten dakwah lokal | BRONZE |
| M31 | Islamic Q&A | Tanya jawab umum Islam | FREE |
| M32 | Islamic Quiz | Quiz interaktif + leaderboard | FREE |
| M33 | Sirah Nabawiyah | Sejarah Nabi interaktif | FREE |
| M34 | Kisah Al-Quran | Kisah dalam Al-Quran | FREE |
| M35 | Biografi Ulama | Database ulama Salaf | BRONZE |
| M36 | Adab Islami | Akhlak & adab sehari-hari | FREE |

---

## 5. User Tiers & Access

### 5.1 Tier Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  TIER         │  DONASI      │  AKSES                          │
├─────────────────────────────────────────────────────────────────┤
│  🆓 FREE      │  Rp 0        │  • 18 modul FREE                │
│               │              │  • 5 AI chat/hari               │
│               │              │  • 1 matan hafalan              │
│               │              │  • Basic LMS                    │
├─────────────────────────────────────────────────────────────────┤
│  🥉 BRONZE    │  Rp 50.000   │  • 28 modul                     │
│               │              │  • 20 AI chat/hari              │
│               │              │  • 5 matan hafalan              │
│               │              │  • Research: Idea Generator     │
├─────────────────────────────────────────────────────────────────┤
│  🥈 SILVER    │  Rp 150.000  │  • 34 modul                     │
│               │              │  • 50 AI chat/hari              │
│               │              │  • 12 matan hafalan             │
│               │              │  • Full Research Tools          │
│               │              │  • Download PDF                 │
├─────────────────────────────────────────────────────────────────┤
│  🥇 GOLD      │  Rp 500.000  │  • Semua 36 modul               │
│               │              │  • Unlimited AI chat            │
│               │              │  • Semua 16+ matan              │
│               │              │  • Priority AI response         │
│               │              │  • Certificates                 │
├─────────────────────────────────────────────────────────────────┤
│  💎 PATRON    │  Rp 1.000.000+│ • Gold + Request features      │
│               │              │  • Nama di Donor Wall           │
│               │              │  • Exclusive updates            │
│               │              │  • 1-on-1 muraja'ah session     │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Usage Limits per Tier
| Feature | FREE | BRONZE | SILVER | GOLD | PATRON |
|---------|------|--------|--------|------|--------|
| AI Chat/day | 5 | 20 | 50 | ∞ | ∞ |
| Hafalan Submit/day | 3 | 10 | 30 | ∞ | ∞ |
| Research Projects | 0 | 2 | 5 | ∞ | ∞ |
| Download PDF | ❌ | ❌ | ✅ | ✅ | ✅ |
| Certificates | ❌ | ❌ | ❌ | ✅ | ✅ |
| Leaderboard | View | View | Participate | Participate | Featured |

---

## 6. Multi-Tenant Architecture

### 6.1 Overview
Platform ini menggunakan arsitektur **Multi-Tenant B2B2C** dimana:
- Sekolah/Pesantren/Organisasi (Tenant) dapat mendaftar dan mengelola user mereka
- Setiap Tenant mendapat subdomain sendiri atau path-based URL
- User (Santri/Siswa) terdaftar di bawah Tenant

### 6.2 Role Hierarchy
```
┌─────────────────────────────────────────────────────────────────┐
│                      ROLE STRUCTURE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔴 SUPER ADMIN (Platform Owner)                               │
│  ├── Manage all tenants                                        │
│  ├── Platform settings & pricing                               │
│  ├── Default Gemini API key (for free tier)                    │
│  └── View all analytics                                        │
│                                                                 │
│  🟠 TENANT ADMIN (Sekolah/Pesantren)                           │
│  ├── Manage their users (students/teachers)                    │
│  ├── Own Gemini API key (paid plans)                           │
│  ├── Customize branding (logo, colors)                         │
│  └── View tenant analytics                                     │
│                                                                 │
│  🟢 TEACHER/USTADZ (Optional role)                             │
│  ├── Monitor student progress                                  │
│  ├── Grade hafalan submissions                                 │
│  └── Create assignments                                        │
│                                                                 │
│  🔵 USER/STUDENT (End user)                                    │
│  ├── Access assigned courses & matan                           │
│  └── Use AI features (with tenant/admin API key)               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 API Key Hierarchy
```
User Request → Check User API Key (Enterprise) 
            → Check Tenant API Key (Paid)
            → Use Admin API Key (Free)
```

### 6.4 Tenant Pricing
| Plan | Max Users | Price/Month | Features |
|------|-----------|-------------|----------|
| FREE | 5 | Rp 0 | Basic, Admin API key |
| STARTER | 30 | Rp 300.000 | Tenant API key, Basic analytics |
| GROWTH | 100 | Rp 750.000 | Custom branding, Advanced analytics |
| PROFESSIONAL | 500 | Rp 2.500.000 | Custom domain, API access |
| ENTERPRISE | 1000+ | Custom | White-label, User own API keys |

### 6.5 URL Structure (MVP - Path-based)
```
ilmuna.ai/t/{tenant-slug}/dashboard    # Tenant dashboard
ilmuna.ai/t/{tenant-slug}/lms          # LMS
ilmuna.ai/t/{tenant-slug}/hafalan      # Hafalan
```

### 6.6 URL Structure (Future - Subdomain)
```
{tenant-slug}.ilmuna.ai/dashboard      # Requires Vercel Pro
{custom-domain}.com                     # Enterprise only
```

---

## 7. Technical Stack

### 7.1 Frontend
```
Framework       : Next.js 14 (App Router)
Styling         : Tailwind CSS + shadcn/ui
Animation       : Framer Motion
State           : Zustand / React Query
Forms           : React Hook Form + Zod
i18n            : next-intl (AR/EN/ID)
Audio           : Web Audio API + MediaRecorder
```

### 6.2 Backend
```
Runtime         : Next.js API Routes / Route Handlers
Database        : PostgreSQL (Neon/Supabase)
ORM             : Prisma
Auth            : NextAuth.js (Google OAuth)
AI              : Gemini 2.0 Flash (text + audio)
File Storage    : Cloudinary / Uploadthing
Cache           : Redis (Upstash)
```

### 6.3 External Services
```
Payment         : Kitabisa Widget + QRIS + Bank Transfer
AI Provider     : Google Gemini 2.0 Flash
Quran API       : quran.com / alquran.cloud
Hadith API      : sunnah.com / dorar.net
Images          : Unsplash API
Email           : Resend
Analytics       : Vercel Analytics / PostHog
```

### 6.4 Deployment
```
Hosting         : Vercel
Database        : Neon PostgreSQL / Supabase
Domain          : ilmuna.ai (TBD)
CDN             : Vercel Edge
```

---

## 7. Database Schema Overview

### 7.1 Core Entities
```
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE ENTITIES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  USER MANAGEMENT                                                │
│  ├── User (id, email, name, googleId, tier, totalDonation)     │
│  ├── Donation (id, userId, amount, projectId, method, status)  │
│  └── Achievement (id, userId, type, earnedAt)                  │
│                                                                 │
│  AI CHAT SYSTEM                                                 │
│  ├── Module (id, slug, name, category, requiredTier)           │
│  ├── ChatSession (id, userId, moduleId, title)                 │
│  └── ChatMessage (id, sessionId, role, content)                │
│                                                                 │
│  LEARNING MANAGEMENT                                            │
│  ├── Course (id, slug, title, level, category)                 │
│  ├── Lesson (id, courseId, title, content, videoUrl)           │
│  ├── Enrollment (id, userId, courseId, status)                 │
│  ├── LearningProgress (id, userId, lessonId, completed)        │
│  ├── Quiz (id, lessonId, questions, passingScore)              │
│  └── Certificate (id, userId, courseId, issuedAt)              │
│                                                                 │
│  HAFALAN SYSTEM                                                 │
│  ├── Matan (id, slug, title, author, category, level)          │
│  ├── MatanSection (id, matanId, arabicText, translation)       │
│  ├── MatanProgress (id, userId, matanId, completedSections)    │
│  ├── HafalanSubmission (id, userId, sectionId, scores)         │
│  └── MurajaahSchedule (id, userId, sectionId, nextReviewDate)  │
│                                                                 │
│  RESEARCH TOOLS                                                 │
│  ├── ResearchProject (id, userId, title, type, field)          │
│  └── SavedReference (id, projectId, citation, source)          │
│                                                                 │
│  CROWDFUNDING                                                   │
│  ├── Project (id, name, location, targetAmount, currentAmount) │
│  └── ProjectUpdate (id, projectId, title, content, images)     │
│                                                                 │
│  CONTENT LIBRARY                                                │
│  ├── IslamicContent (id, type, source, arabicText, translation)│
│  └── GalleryImage (id, url, description, source, tags)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Key Relationships
```
User ─┬─── Donation ────── Project
      ├─── ChatSession ─── ChatMessage
      ├─── Enrollment ──── Course ─── Lesson ─── Quiz
      ├─── LearningProgress
      ├─── Certificate
      ├─── MatanProgress ── Matan ─── MatanSection
      ├─── HafalanSubmission
      ├─── MurajaahSchedule
      ├─── ResearchProject ─── SavedReference
      └─── Achievement
```

---

## 8. External Integrations

### 8.1 AI - Gemini 2.0 Flash
| Feature | Capability |
|---------|------------|
| Text Generation | Islamic Q&A, Khutbah, Content |
| Web Search | Grounding with online sources |
| Audio Input | Speech-to-Text for Hafalan |
| Multi-turn Chat | Context-aware conversations |
| Multi-language | AR/EN/ID responses |

### 8.2 Islamic Data Sources
| Source | Data Type | Method |
|--------|-----------|--------|
| quran.com | Quran + Tafsir + Audio | Official API |
| sunnah.com | Hadith Kutub Sittah | Official API |
| dorar.net | Hadith Encyclopedia | Web Scraping |
| shamela.ws | 10,000+ Kitab | API/Scraping |
| islamqa.info | Fatwa Database | Web Scraping |
| binbaz.org.sa | Fatwa Syaikh Bin Baz | Web Scraping |
| aladhan.com | Prayer Times | Official API |

### 8.3 Payment Integration
| Method | Provider | Notes |
|--------|----------|-------|
| Crowdfunding Widget | Kitabisa | Embed campaign |
| QRIS | Bank/Fintech | Static QR |
| Bank Transfer | Yayasan Account | Manual verification |

---

## 9. Security & Anti-Abuse

> ⚠️ **CRITICAL**: Lihat [SECURITY-REQUIREMENTS.md](./SECURITY-REQUIREMENTS.md) untuk dokumentasi lengkap.

### 9.1 Overview
Platform ini memiliki sistem keamanan multi-layer untuk mencegah:
- Mass fake registration
- Bot attacks
- API abuse (cost attack on Gemini API)
- Spam content
- Data scraping

### 9.2 Protection Layers
```
┌─────────────────────────────────────────────────────────────────┐
│                 SECURITY LAYERS                                 │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: CAPTCHA (reCAPTCHA v3)                               │
│  Layer 2: IP Rate Limiting (3 registrations/IP/24h)            │
│  Layer 3: Device Fingerprinting (1 device = 1 account)         │
│  Layer 4: Email Verification (required)                        │
│  Layer 5: Tenant Admin Approval (optional per tenant)          │
│  Layer 6: Behavioral Analysis & Auto-blocking                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Registration Modes (Per Tenant)
| Mode | Description |
|------|-------------|
| OPEN | Anyone can register (with verification) |
| DOMAIN_RESTRICTED | Only specific email domains allowed |
| INVITE_ONLY | Only via admin invitation |
| APPROVAL_REQUIRED | Requires admin approval |
| DISABLED | No new registrations |

### 9.4 Blocklist Types
- IP addresses & ranges
- Device fingerprints
- Email addresses & domains
- Phone number prefixes

### 9.5 Security Events Tracked
- Registration attempts (success/failed)
- Login attempts
- Password resets
- Suspicious activities
- API abuse detection

### 9.6 Emergency Response
- Auto-block on suspicious patterns
- Emergency mode (disable all registrations)
- Mass IP blocking capability
- Unverified account purging

---

## 10. Localization

### 10.1 Supported Languages
| Code | Language | Direction | Priority |
|------|----------|-----------|----------|
| id | Bahasa Indonesia | LTR | Primary |
| ar | العربية (Arabic) | RTL | Secondary |
| en | English | LTR | Tertiary |

### 10.2 Content Localization
- UI strings: All 3 languages
- Islamic content: Arabic original + ID/EN translation
- AI responses: Based on user preference
- Audio: Arabic (Quran/Matan), Indonesian (explanations)

### 10.3 RTL Support
- Full RTL layout for Arabic interface
- Bi-directional text support for mixed content
- Arabic typography optimization

---

## 11. MVP Scope & Timeline

### 11.1 MVP Features (8 Weeks)
```
PHASE 1: Foundation (Week 1-2)
├── Project setup (Next.js, Prisma, PostgreSQL)
├── Google OAuth authentication
├── Basic UI layout & navigation
├── Landing page + donation info
└── Database schema & migrations

PHASE 2: Core AI Modules (Week 3-4)
├── Gemini 2.0 Flash integration
├── 5 priority AI modules:
│   ├── Quran Explorer
│   ├── Hadith Search
│   ├── Islamic Q&A
│   ├── Doa & Dzikir
│   └── Sholat Guide
├── Chat history & sessions
└── Usage limit system

PHASE 3: LMS Basic (Week 5-6)
├── Course & Lesson structure
├── 1 complete course (Aqidah Tamhidi)
├── Progress tracking
├── Basic quiz system
└── Hafalan Matan (1 matan: Tsalatsatul Ushul)
    └── Speech-to-Text evaluation

PHASE 4: Donation & Polish (Week 7-8)
├── Kitabisa widget integration
├── QRIS + Bank transfer info
├── Donation progress dashboard
├── Tier system activation
├── Multi-language (ID primary, AR/EN partial)
├── Testing & bug fixes
└── 🚀 MVP LAUNCH
```

### 11.2 Post-MVP Roadmap
```
v1.1 (Month 3)
├── Complete 36 AI modules
├── 3 more courses
└── 5 more mutun

v1.2 (Month 4)
├── Research tools (basic)
├── Certificate system
└── Mobile optimization

v1.3 (Month 5)
├── Full research suite
├── Community features
└── Advanced analytics

v2.0 (Month 6+)
├── Mobile app (React Native)
├── Offline mode
└── Live muraja'ah sessions
```

### 11.3 MVP Modules Priority
| Priority | Module | Reason |
|----------|--------|--------|
| P0 | Quran Explorer | Daily use, high traffic |
| P0 | Islamic Q&A | Broad appeal, viral |
| P0 | Hadith Search | Unique AI value |
| P1 | Doa & Dzikir | Daily use, emotional |
| P1 | Sholat Guide | Essential, 5x/day |
| P2 | Hafalan Matan | Killer feature, differentiator |

---

## 12. Success Metrics

### 12.1 User Metrics
| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Registered Users | 5,000 | 25,000 |
| Daily Active Users | 500 | 2,500 |
| Paid Users (Bronze+) | 500 | 2,500 |
| Course Completions | 200 | 1,000 |
| Matan Completions | 100 | 500 |

### 12.2 Engagement Metrics
| Metric | Target |
|--------|--------|
| Avg. Session Duration | > 10 minutes |
| AI Chats per User/Day | > 3 |
| Return Rate (7-day) | > 40% |
| Course Completion Rate | > 30% |

### 12.3 Donation Metrics
| Metric | Target (Year 1) |
|--------|-----------------|
| Total Donations | Rp 500.000.000 |
| Avg. Donation | Rp 100.000 |
| Recurring Donors | 500 |
| Patron Tier | 50 |

### 12.4 Technical Metrics
| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds |
| API Response Time | < 500ms |
| Uptime | > 99.5% |
| Error Rate | < 1% |

---

## 📎 Related Documents

- [Backend Requirements](./BACKEND-REQUIREMENTS.md)
- [Frontend Requirements](./FRONTEND-REQUIREMENTS.md)
- [Security Requirements](./SECURITY-REQUIREMENTS.md) ⚠️ **CRITICAL**
- [Database Schema](./DATABASE-SCHEMA.md)
- [API Documentation](./API-DOCS.md)

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial MVP requirements |

---

> **Bismillah, semoga platform ini menjadi amal jariyah yang pahalanya terus mengalir.**
