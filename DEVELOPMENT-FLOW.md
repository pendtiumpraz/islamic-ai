# ILMUNA - Development Flow & Roadmap

## Development Philosophy

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT ORDER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. DATABASE    →  2. API/BACKEND  →  3. FRONTEND              │
│   (Prisma)          (Route Handlers)    (Components/Pages)      │
│                                                                 │
│   ⚠️ WAJIB sebelum commit/push:                                 │
│      npx tsc --noEmit                                           │
│      npm run lint                                               │
│      npm run build (untuk production check)                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase Overview

| Phase | Name | Duration | Status |
|-------|------|----------|--------|
| 0 | Project Setup | 1 day | 🟡 In Progress |
| 1 | Auth & User Management | 2 days | ⚪ Pending |
| 2 | AI Chat Core | 3 days | ⚪ Pending |
| 3 | Hafidz Mode | 3 days | ⚪ Pending |
| 4 | Public Pages | 2 days | ⚪ Pending |
| 5 | Dashboard & Profile | 2 days | ⚪ Pending |
| 6 | Admin Panel | 2 days | ⚪ Pending |
| 7 | Testing & Polish | 2 days | ⚪ Pending |

**Total Estimated: ~17 days (MVP)**

---

## Phase 0: Project Setup ✅

### 0.1 Database Setup
- [x] Initialize Prisma
- [x] Create schema with soft delete
- [ ] Setup Neon PostgreSQL
- [ ] Run migrations
- [ ] Seed initial data (AI modules)

### 0.2 Project Structure
- [x] Next.js 14 + TypeScript
- [x] Tailwind CSS
- [x] Install dependencies
- [ ] Setup lib utilities (cn, prisma client)
- [ ] Setup environment variables
- [ ] Configure shadcn/ui

### 0.3 Files to Create
```
src/
├── lib/
│   ├── prisma.ts          # Prisma client with soft delete middleware
│   ├── utils.ts           # cn() and utilities
│   ├── auth.ts            # NextAuth config
│   └── gemini.ts          # Gemini AI client
├── types/
│   └── index.ts           # TypeScript types
└── middleware.ts          # Auth middleware
```

---

## Phase 1: Auth & User Management

### 1.1 Database
- [ ] Verify User, Account, Session models
- [ ] Add indexes for performance

### 1.2 API Endpoints
```
POST   /api/auth/[...nextauth]  # NextAuth handler
GET    /api/user/profile        # Get current user
PATCH  /api/user/profile        # Update profile
GET    /api/user/usage          # Get daily usage stats
```

### 1.3 Frontend
- [ ] Login page (/login)
- [ ] Auth callback handling
- [ ] User context/provider
- [ ] Protected route wrapper

### 1.4 Checklist Before Next Phase
```bash
npx tsc --noEmit  # Must pass
npm run lint      # Must pass
# Test: Login with Google works
# Test: User created in database
# Test: Session persists
```

---

## Phase 2: AI Chat Core

### 2.1 Database
- [ ] Verify AIModule, ChatSession, ChatMessage models
- [ ] Seed 36 AI modules
- [ ] Create module categories

### 2.2 API Endpoints
```
GET    /api/modules                    # List all modules
GET    /api/modules/:slug              # Get module detail
POST   /api/chat/sessions              # Create session
GET    /api/chat/sessions              # List user sessions
GET    /api/chat/sessions/:id          # Get session + messages
DELETE /api/chat/sessions/:id          # Soft delete session
POST   /api/chat/sessions/:id/messages # Send message (streaming)
```

### 2.3 Gemini Integration
- [ ] Setup Gemini 2.0 Flash client
- [ ] Implement streaming response
- [ ] Handle system prompts per module
- [ ] Rate limiting per tier

### 2.4 Frontend
- [ ] Module selection grid
- [ ] Chat interface component
- [ ] Message streaming display
- [ ] Chat history sidebar

### 2.5 Checklist Before Next Phase
```bash
npx tsc --noEmit
npm run lint
# Test: Can select module
# Test: Chat streaming works
# Test: History saved to DB
# Test: Rate limit enforced
```

---

## Phase 3: Hafidz Mode

### 3.1 Database
- [ ] Verify HafalanItem, HafalanSubmission, HafalanProgress models
- [ ] Seed Quran data (Juz Amma)
- [ ] Seed sample Hadits/Matan

### 3.2 API Endpoints
```
GET    /api/hafalan/items              # List hafalan items
GET    /api/hafalan/items/:id          # Get item detail
POST   /api/hafalan/submit             # Submit audio for evaluation
GET    /api/hafalan/progress           # Get user progress
GET    /api/hafalan/history            # Get submission history
```

### 3.3 Audio Processing
- [ ] Setup audio recording (WebM)
- [ ] Send to Gemini for Speech-to-Text
- [ ] Evaluate and generate feedback
- [ ] Return structured response

### 3.4 Frontend
- [ ] Hafalan item browser
- [ ] Audio recorder component
- [ ] Result display card
- [ ] Progress tracker

### 3.5 Checklist Before Next Phase
```bash
npx tsc --noEmit
npm run lint
# Test: Audio recording works
# Test: AI evaluation returns score + feedback
# Test: Progress saved correctly
# Test: Can proceed to next item after passing
```

---

## Phase 4: Public Pages

### 4.1 Pages to Create
```
/                  # Landing page
/about             # About us
/pricing           # Pricing tiers
/features          # Feature showcase
/contact           # Contact form
/terms             # Terms of service
/privacy           # Privacy policy
/faq               # FAQ
```

### 4.2 Components
- [ ] Header (navigation)
- [ ] Footer
- [ ] Hero section
- [ ] Feature cards
- [ ] Pricing cards
- [ ] Contact form
- [ ] FAQ accordion

### 4.3 Checklist Before Next Phase
```bash
npx tsc --noEmit
npm run lint
npm run build     # Check SSG works
# Test: All pages render
# Test: Responsive on mobile
# Test: Contact form works
```

---

## Phase 5: Dashboard & Profile

### 5.1 Pages
```
/dashboard              # Main dashboard
/dashboard/chat         # Chat history
/dashboard/hafidz       # Hafidz progress
/dashboard/profile      # User profile
/dashboard/settings     # User settings
```

### 5.2 Components
- [ ] Dashboard layout
- [ ] Sidebar navigation
- [ ] Stats cards
- [ ] Progress charts
- [ ] Profile form

### 5.3 Checklist Before Next Phase
```bash
npx tsc --noEmit
npm run lint
# Test: Dashboard shows user stats
# Test: Can update profile
# Test: Progress displays correctly
```

---

## Phase 6: Admin Panel (SuperAdmin)

### 6.1 API Endpoints
```
GET    /api/admin/users           # List users (with soft deleted)
PATCH  /api/admin/users/:id       # Update user
DELETE /api/admin/users/:id       # Soft delete user
POST   /api/admin/users/:id/restore # Restore user

GET    /api/admin/modules         # List modules
POST   /api/admin/modules         # Create module
PATCH  /api/admin/modules/:id     # Update module
DELETE /api/admin/modules/:id     # Soft delete module

GET    /api/admin/trash           # List soft deleted items
POST   /api/admin/trash/restore   # Restore item
DELETE /api/admin/trash/permanent # Hard delete (with confirmation)

GET    /api/admin/stats           # Dashboard statistics
```

### 6.2 Pages
```
/admin                  # Admin dashboard
/admin/users            # User management
/admin/modules          # Module management
/admin/donations        # Donation tracking
/admin/trash            # Trash/restore
```

### 6.3 Checklist Before Next Phase
```bash
npx tsc --noEmit
npm run lint
# Test: Only admin can access
# Test: Soft delete works
# Test: Restore works
# Test: Stats accurate
```

---

## Phase 7: Testing & Polish

### 7.1 Testing
- [ ] Unit tests for utilities
- [ ] API endpoint tests
- [ ] E2E tests for critical flows

### 7.2 Performance
- [ ] Lighthouse audit (target: 90+)
- [ ] Image optimization
- [ ] Code splitting
- [ ] API response caching

### 7.3 Security
- [ ] Rate limiting check
- [ ] Input validation
- [ ] XSS prevention
- [ ] CSRF protection

### 7.4 Final Checklist
```bash
npx tsc --noEmit
npm run lint
npm run build
npm run test
# Lighthouse score > 90
# All features from REQUIREMENTS.md checked
```

---

## Pre-Commit Checklist

Every commit MUST pass:

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build (for major changes)
npm run build

# 4. Format (optional but recommended)
npx prettier --write .
```

---

## Requirement Tracking

After each phase, check against docs/REQUIREMENTS.md:

### MVP Features Status
| Feature | Phase | Status |
|---------|-------|--------|
| Google OAuth Login | 1 | ⚪ |
| AI Chat (36 modules) | 2 | ⚪ |
| Hafidz Mode (Quran) | 3 | ⚪ |
| Hafidz Mode (Hadits) | 3 | ⚪ |
| Hafidz Mode (Matan) | 3 | ⚪ |
| Landing Page | 4 | ⚪ |
| Pricing Page | 4 | ⚪ |
| User Dashboard | 5 | ⚪ |
| Admin Panel | 6 | ⚪ |
| Soft Delete | All | ⚪ |

### Post-MVP Features
| Feature | Priority |
|---------|----------|
| Learn Mode (structured curriculum) | HIGH |
| Write Mode (content creation) | MEDIUM |
| Multi-tenant | MEDIUM |
| Crowdfunding | LOW |

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl"

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Gemini AI
GEMINI_API_KEY="..."

# Optional
RESEND_API_KEY="..."
```

---

## Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma generate      # Generate client
npx prisma db push       # Push schema (dev)
npx prisma migrate dev   # Create migration
npx prisma studio        # Open Prisma Studio

# Build & Check
npx tsc --noEmit         # Type check
npm run lint             # ESLint
npm run build            # Production build

# Production
npm run start            # Start production server
```
