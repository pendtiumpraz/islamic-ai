# ILMUNA - Platform Pendidikan Islam Berbasis AI

<p align="center">
  <img src="/public/logo.png" alt="ILMUNA Logo" width="200" />
</p>

<p align="center">
  <strong>Belajar Al-Quran, Hadits, dan Ilmu Islam dengan AI</strong>
</p>

<p align="center">
  <a href="#fitur">Fitur</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#instalasi">Instalasi</a> •
  <a href="#development">Development</a> •
  <a href="#kontribusi">Kontribusi</a>
</p>

---

## Tentang ILMUNA

ILMUNA adalah platform pendidikan Islam berbasis kecerdasan buatan (AI) yang menyediakan berbagai modul pembelajaran Al-Quran, Hadits, Fiqih, dan ilmu Islam lainnya. Platform ini dikembangkan untuk membantu umat Muslim mengakses ilmu agama berkualitas dengan mudah dan terjangkau.

### Didukung Oleh

- Kesamben Mengaji
- Blitar Mengaji
- Yayasan Sanggrahan Tunas Mulia
- Yayasan Imam Syafii Blitar

---

## Fitur

### 🤖 AI Chat (36+ Modul)
Konsultasi dengan AI spesialis berbagai bidang ilmu Islam:
- **Quran & Tafsir**: Tafsir Al-Quran, Tajwid, Qiraat
- **Hadits**: Hadits Explorer, Takhrij, Mustalah
- **Fiqih**: Fiqih 4 Madzhab, Fiqih Kontemporer, Ushul Fiqih
- **Akidah & Sejarah**: Akidah Ahlussunnah, Sirah Nabawiyah, Tarikh Islam

### 🎙️ Hafidz Mode
Setoran hafalan dengan evaluasi AI:
- **Al-Quran**: Setoran per ayat/halaman dengan analisis tajwid
- **Hadits**: Hafalan hadits Arbain, Bulughul Maram, dll
- **Matan**: Hafalan matan Jazariyah, Tuhfatul Athfal, dll

### ✍️ Write Mode (Coming Soon)
Buat konten Islami dengan bantuan AI:
- Generator khutbah Jumat
- Pencari dalil otomatis
- Penyusun materi kajian

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Google OAuth)
- **AI**: Google Gemini 2.0 Flash
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand + React Query
- **Hosting**: Vercel

---

## Instalasi

### Prerequisites

- Node.js 18+
- npm atau pnpm
- PostgreSQL database (atau Neon account)
- Google Cloud Console project (untuk OAuth)
- Google AI Studio account (untuk Gemini API)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/islamic-ai.git
   cd islamic-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` dengan kredensial Anda:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

---

## Development

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── (public)/          # Public pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── chat/             # Chat components
│   ├── hafidz/           # Hafidz components
│   └── write/            # Write components
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth config
│   ├── gemini.ts         # Gemini client
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── types/                 # TypeScript types
```

### Development Flow

1. **Database First**: Ubah schema → migrate → generate
2. **API Second**: Buat endpoint di `/api`
3. **Frontend Last**: Buat components & pages

### Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes
npx prisma migrate dev   # Create migration
npx prisma studio        # Open database GUI

# Quality Check (WAJIB sebelum commit)
npx tsc --noEmit         # Type check
npm run lint             # Lint check
npm run build            # Build check
```

### Pre-Commit Checklist

Sebelum commit, WAJIB jalankan:

```bash
npx tsc --noEmit && npm run lint
```

---

## Struktur Database

### Soft Delete Policy

Semua operasi DELETE menggunakan **soft delete**:

```typescript
// ❌ JANGAN
await prisma.user.delete({ where: { id } });

// ✅ BENAR
await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date(), deletedBy: adminId }
});
```

### Main Models

- **User**: Data pengguna & autentikasi
- **AIModule**: Konfigurasi 36+ modul AI
- **ChatSession/Message**: History percakapan
- **HafalanItem**: Data hafalan (Quran/Hadits/Matan)
- **HafalanSubmission**: History setoran & feedback AI
- **Donation**: Data donasi

---

## API Endpoints

### Authentication
```
POST /api/auth/[...nextauth]   # NextAuth handler
```

### Chat
```
GET    /api/modules                    # List modules
POST   /api/chat/sessions              # Create session
GET    /api/chat/sessions/:id          # Get session
POST   /api/chat/sessions/:id/messages # Send message
DELETE /api/chat/sessions/:id          # Delete session
```

### Hafalan
```
GET    /api/hafalan/items              # List items
GET    /api/hafalan/items/:id          # Get item
POST   /api/hafalan/submit             # Submit evaluation
GET    /api/hafalan/progress           # Get progress
```

### Admin
```
GET    /api/admin/users                # List users
DELETE /api/admin/users/:id            # Soft delete user
POST   /api/admin/trash/restore        # Restore item
```

---

## Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy

### Environment Variables untuk Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://ilmuna.ai"
NEXTAUTH_SECRET="strong-random-secret"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GEMINI_API_KEY="..."
```

---

## Kontribusi

Kontribusi sangat diterima! Silakan buat issue atau pull request.

### Guidelines

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/fitur-baru`)
3. Commit changes (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

---

## Kontak

- **Developer**: Galih
- **Email**: pendtiumpraz@gmail.com
- **WhatsApp**: +62 813-1950-4441

---

## Lisensi

Hak Cipta © 2024 ILMUNA. All rights reserved.

---

<p align="center">
  <strong>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</strong>
  <br>
  Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
</p>
