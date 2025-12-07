# ILMUNA - Public Pages Requirements

## Overview

Dokumentasi lengkap untuk semua halaman publik platform ILMUNA.
Desain elegant, modern, dengan nuansa Islami yang profesional.

---

## 1. Site Structure

```
PUBLIC PAGES:
├── / (Landing Page)
├── /about
├── /pricing
├── /features
├── /contact
├── /terms
├── /privacy
├── /faq
├── /blog (future)
└── /crowdfunding (Bangun Masjid)

AUTH PAGES:
├── /login
├── /register
└── /forgot-password
```

---

## 2. Navigation Menu

### 2.1 Header Navigation

```tsx
const navigation = {
  main: [
    { name: 'Beranda', href: '/' },
    { name: 'Fitur', href: '/features' },
    { name: 'Harga', href: '/pricing' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ],
  cta: [
    { name: 'Masuk', href: '/login', variant: 'ghost' },
    { name: 'Daftar Gratis', href: '/register', variant: 'primary' },
  ]
};
```

### 2.2 Footer Navigation

```tsx
const footerNavigation = {
  platform: [
    { name: 'Fitur', href: '/features' },
    { name: 'Harga', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kontak', href: '/contact' },
    { name: 'Karir', href: '/careers' },
    { name: 'Mitra', href: '/partners' },
  ],
  legal: [
    { name: 'Syarat & Ketentuan', href: '/terms' },
    { name: 'Kebijakan Privasi', href: '/privacy' },
    { name: 'Kebijakan Cookie', href: '/cookies' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com/ilmuna.ai', icon: 'Instagram' },
    { name: 'YouTube', href: 'https://youtube.com/@ilmuna', icon: 'Youtube' },
    { name: 'WhatsApp', href: 'https://wa.me/6281319504441', icon: 'MessageCircle' },
  ],
};
```

---

## 3. Landing Page (/)

### 3.1 Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (Sticky)                                                │
│  Logo | Beranda | Fitur | Harga | Tentang | Kontak | [Masuk]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO SECTION                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  "Platform Pendidikan Islam                             │   │
│  │   Berbasis AI Pertama di Indonesia"                     │   │
│  │                                                         │   │
│  │  Belajar Al-Quran, Hadits, dan Ilmu Islam dengan       │   │
│  │  pendamping AI yang memahami konteks dan maqashid      │   │
│  │                                                         │   │
│  │  [Mulai Gratis]  [Lihat Demo]                          │   │
│  │                                                         │   │
│  │  ✓ 36+ Modul AI  ✓ 3 Mode Belajar  ✓ Gratis Selamanya  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  [Image: Muslim students learning with technology]              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SUPPORTED BY SECTION                                           │
│  "Didukung oleh:"                                               │
│  [Logo: Kesamben Mengaji] [Logo: Blitar Mengaji]               │
│  [Logo: Yayasan Sanggrahan Tunas Mulia]                        │
│  [Logo: Yayasan Imam Syafii Blitar]                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FEATURES SECTION                                               │
│  "Tiga Mode Pembelajaran Terintegrasi"                         │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ 📚 LEARN     │ │ 🎙️ HAFIDZ   │ │ ✍️ WRITE     │            │
│  │ MODE         │ │ MODE         │ │ MODE         │            │
│  │              │ │              │ │              │            │
│  │ Belajar      │ │ Setoran      │ │ Buat konten  │            │
│  │ terstruktur  │ │ hafalan      │ │ Islami       │            │
│  │ dengan AI    │ │ dengan AI    │ │ dengan AI    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AI MODULES SHOWCASE                                            │
│  "36+ Modul AI Spesialis"                                      │
│                                                                 │
│  [Grid of module cards with icons]                             │
│  - Tafsir Al-Quran        - Hadits Explorer                    │
│  - Fiqih Kontemporer      - Akidah & Tauhid                    │
│  - Sirah Nabawiyah        - Bahasa Arab                        │
│  - Dan 30+ modul lainnya...                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HOW IT WORKS                                                   │
│  "Bagaimana ILMUNA Bekerja?"                                   │
│                                                                 │
│  1️⃣ Daftar Gratis → 2️⃣ Pilih Mode → 3️⃣ Mulai Belajar          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TESTIMONIALS                                                   │
│  "Apa Kata Mereka?"                                            │
│                                                                 │
│  [Carousel of testimonials]                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRICING PREVIEW                                                │
│  "Pilih Paket Sesuai Kebutuhan"                                │
│                                                                 │
│  [3 pricing cards: Gratis | Donatur | Patron]                  │
│  [Link: Lihat semua paket →]                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CROWDFUNDING CTA                                               │
│  "Bantu Bangun Pusat Pendidikan Islam"                         │
│                                                                 │
│  [Progress bar: Rp 500M / Rp 2.95B]                            │
│  [Button: Lihat Program →]                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FINAL CTA                                                      │
│  "Siap Memulai Perjalanan Ilmu?"                               │
│                                                                 │
│  [Daftar Gratis Sekarang]                                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FOOTER                                                         │
│  [Logo] [Navigation] [Contact] [Social] [Legal]                │
│  © 2024 ILMUNA. Hak Cipta Dilindungi.                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Hero Section Images (Unsplash)

```typescript
const heroImages = {
  primary: {
    url: 'https://images.unsplash.com/photo-1585036156171-384164a8c675', // Muslim reading Quran
    alt: 'Muslim membaca Al-Quran',
    credit: 'Unsplash'
  },
  secondary: [
    {
      url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae', // Islamic architecture
      alt: 'Arsitektur Masjid'
    },
    {
      url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53', // Students learning
      alt: 'Santri belajar'
    },
    {
      url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769', // Mosque interior
      alt: 'Interior Masjid'
    }
  ]
};

// Feature section images
const featureImages = {
  learnMode: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8', // Studying
  hafidzMode: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae', // Quran recitation
  writeMode: 'https://images.unsplash.com/photo-1455390582262-044cdead277a', // Writing
};

// Background patterns
const islamicPatterns = {
  geometric: '/patterns/islamic-geometric.svg',
  arabesque: '/patterns/arabesque.svg',
};
```

### 3.3 Color Scheme

```typescript
const colors = {
  // Primary - Emerald Green (Islamic)
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    900: '#064e3b',
  },
  // Secondary - Gold (Premium)
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
  // Accent - Deep Blue (Trust)
  accent: {
    500: '#3b82f6',
    600: '#2563eb',
  },
  // Neutral
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    900: '#18181b',
  }
};
```

---

## 4. About Page (/about)

### 4.1 Content Structure

```markdown
# Tentang ILMUNA

## Visi Kami
Menjadi platform pendidikan Islam berbasis AI terdepan yang membantu 
umat Muslim di seluruh Indonesia mengakses ilmu agama berkualitas 
dengan mudah dan terjangkau.

## Misi Kami
1. Menyediakan akses pendidikan Islam berkualitas untuk semua kalangan
2. Memanfaatkan teknologi AI untuk membantu proses belajar-mengajar
3. Membangun komunitas pembelajar yang saling mendukung
4. Mendukung pembangunan sarana pendidikan Islam di daerah

## Cerita Kami
ILMUNA lahir dari keprihatinan terhadap minimnya akses pendidikan 
Islam berkualitas di daerah-daerah. Dengan memanfaatkan kecerdasan 
buatan (AI), kami berkomitmen untuk mendemokratisasi ilmu agama...

## Tim Kami
[Photo & Bio of team members]

## Didukung Oleh

### Kesamben Mengaji
Komunitas mengaji di Kecamatan Kesamben, Blitar yang aktif 
mengembangkan pendidikan Al-Quran untuk masyarakat.

### Blitar Mengaji
Gerakan literasi Al-Quran se-Kabupaten Blitar yang telah 
membina ribuan santri.

### Yayasan Sanggrahan Tunas Mulia
Yayasan pendidikan Islam di Sanggrahan yang fokus pada 
pengembangan generasi Qurani.

### Yayasan Imam Syafii Blitar
Yayasan yang bergerak di bidang dakwah dan pendidikan Islam 
dengan manhaj Ahlussunnah wal Jamaah.

## Kontak
Untuk informasi lebih lanjut, silakan hubungi kami.
```

### 4.2 Supporters Section

```tsx
const supporters = [
  {
    name: 'Kesamben Mengaji',
    description: 'Komunitas mengaji di Kecamatan Kesamben, Blitar',
    logo: '/images/supporters/kesamben-mengaji.png',
    website: null,
  },
  {
    name: 'Blitar Mengaji',
    description: 'Gerakan literasi Al-Quran se-Kabupaten Blitar',
    logo: '/images/supporters/blitar-mengaji.png',
    website: null,
  },
  {
    name: 'Yayasan Sanggrahan Tunas Mulia',
    description: 'Yayasan pendidikan Islam di Sanggrahan',
    logo: '/images/supporters/sanggrahan-tunas-mulia.png',
    website: null,
  },
  {
    name: 'Yayasan Imam Syafii Blitar',
    description: 'Yayasan dakwah dan pendidikan Islam',
    logo: '/images/supporters/imam-syafii-blitar.png',
    website: null,
  },
];
```

---

## 5. Contact Page (/contact)

### 5.1 Contact Information

```tsx
const contactInfo = {
  name: 'Galih',
  role: 'Founder & Developer',
  email: 'pendtiumpraz@gmail.com',
  phone: '+62 813-1950-4441',
  whatsapp: '6281319504441',
  
  address: {
    street: 'Blitar, Jawa Timur',
    city: 'Blitar',
    province: 'Jawa Timur',
    country: 'Indonesia',
    postalCode: '66152',
  },
  
  socialMedia: {
    instagram: '@ilmuna.ai',
    youtube: '@ilmuna',
    tiktok: '@ilmuna.ai',
  },
  
  businessHours: {
    weekdays: '08:00 - 17:00 WIB',
    saturday: '08:00 - 12:00 WIB',
    sunday: 'Libur',
  }
};
```

### 5.2 Contact Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO                                                           │
│  "Hubungi Kami"                                                │
│  Ada pertanyaan atau saran? Kami senang mendengar dari Anda    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────┐  ┌────────────────────────────┐    │
│  │                        │  │                            │    │
│  │  CONTACT FORM          │  │  CONTACT INFO              │    │
│  │                        │  │                            │    │
│  │  Nama: [__________]    │  │  📧 Email                  │    │
│  │                        │  │  pendtiumpraz@gmail.com    │    │
│  │  Email: [__________]   │  │                            │    │
│  │                        │  │  📱 WhatsApp               │    │
│  │  Subjek: [__________]  │  │  +62 813-1950-4441         │    │
│  │                        │  │                            │    │
│  │  Pesan:                │  │  👤 Contact Person         │    │
│  │  [________________]    │  │  Galih                     │    │
│  │  [________________]    │  │                            │    │
│  │  [________________]    │  │  📍 Lokasi                 │    │
│  │                        │  │  Blitar, Jawa Timur        │    │
│  │  [Kirim Pesan]         │  │                            │    │
│  │                        │  │  🕐 Jam Operasional        │    │
│  └────────────────────────┘  │  Senin-Jumat: 08:00-17:00  │    │
│                              │  Sabtu: 08:00-12:00        │    │
│                              │                            │    │
│                              └────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QUICK CONTACT BUTTONS                                          │
│                                                                 │
│  [💬 Chat WhatsApp]  [📧 Kirim Email]  [📞 Telepon]            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FAQ PREVIEW                                                    │
│  "Pertanyaan yang Sering Diajukan"                             │
│                                                                 │
│  [Accordion FAQ items]                                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Contact Form Schema

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: 'general' | 'partnership' | 'support' | 'feedback' | 'bug_report';
  message: string;
  newsletter: boolean;
}

const subjectOptions = [
  { value: 'general', label: 'Pertanyaan Umum' },
  { value: 'partnership', label: 'Kerjasama / Partnership' },
  { value: 'support', label: 'Bantuan Teknis' },
  { value: 'feedback', label: 'Saran & Masukan' },
  { value: 'bug_report', label: 'Laporan Bug' },
];
```

---

## 6. Pricing Page (/pricing)

### 6.1 Pricing Tiers

```tsx
const pricingTiers = [
  {
    id: 'free',
    name: 'GRATIS',
    nameEn: 'Free',
    price: 0,
    priceDisplay: 'Rp 0',
    period: 'selamanya',
    description: 'Untuk individu yang ingin mulai belajar',
    badge: null,
    features: [
      { text: 'Akses 10 modul AI dasar', included: true },
      { text: 'Learn Mode (terbatas)', included: true },
      { text: 'Hafidz Mode (5 setoran/hari)', included: true },
      { text: 'Write Mode (3 konten/hari)', included: true },
      { text: 'Riwayat 7 hari', included: true },
      { text: 'Dukungan komunitas', included: true },
      { text: 'Semua modul AI', included: false },
      { text: 'Tanpa batas setoran', included: false },
      { text: 'Export konten', included: false },
      { text: 'Dukungan prioritas', included: false },
    ],
    cta: 'Mulai Gratis',
    ctaVariant: 'outline',
    popular: false,
  },
  {
    id: 'bronze',
    name: 'BRONZE',
    nameEn: 'Bronze Donator',
    price: 50000,
    priceDisplay: 'Rp 50.000',
    period: 'sekali donasi',
    description: 'Untuk pendukung dengan akses lebih',
    badge: '🥉',
    features: [
      { text: 'Semua fitur GRATIS', included: true },
      { text: 'Akses 20 modul AI', included: true },
      { text: 'Learn Mode (penuh)', included: true },
      { text: 'Hafidz Mode (15 setoran/hari)', included: true },
      { text: 'Write Mode (10 konten/hari)', included: true },
      { text: 'Riwayat 30 hari', included: true },
      { text: 'Badge Donatur Bronze', included: true },
      { text: 'Semua modul AI', included: false },
      { text: 'Tanpa batas setoran', included: false },
      { text: 'Dukungan prioritas', included: false },
    ],
    cta: 'Donasi Sekarang',
    ctaVariant: 'default',
    popular: false,
  },
  {
    id: 'silver',
    name: 'SILVER',
    nameEn: 'Silver Donator',
    price: 150000,
    priceDisplay: 'Rp 150.000',
    period: 'sekali donasi',
    description: 'Akses penuh dengan fitur premium',
    badge: '🥈',
    features: [
      { text: 'Semua fitur BRONZE', included: true },
      { text: 'Akses SEMUA 36+ modul AI', included: true },
      { text: 'Hafidz Mode (50 setoran/hari)', included: true },
      { text: 'Write Mode (30 konten/hari)', included: true },
      { text: 'Riwayat 90 hari', included: true },
      { text: 'Export PDF & Word', included: true },
      { text: 'Badge Donatur Silver', included: true },
      { text: 'Akses beta fitur baru', included: true },
      { text: 'Tanpa batas setoran', included: false },
      { text: 'Dukungan prioritas', included: false },
    ],
    cta: 'Donasi Sekarang',
    ctaVariant: 'default',
    popular: true,
  },
  {
    id: 'gold',
    name: 'GOLD',
    nameEn: 'Gold Donator',
    price: 500000,
    priceDisplay: 'Rp 500.000',
    period: 'sekali donasi',
    description: 'Untuk pendukung setia dengan akses penuh',
    badge: '🥇',
    features: [
      { text: 'Semua fitur SILVER', included: true },
      { text: 'TANPA BATAS setoran hafalan', included: true },
      { text: 'TANPA BATAS konten Write', included: true },
      { text: 'Riwayat selamanya', included: true },
      { text: 'Dukungan prioritas', included: true },
      { text: 'Badge Donatur Gold', included: true },
      { text: 'Nama di halaman donatur', included: true },
      { text: 'Akses grup eksklusif', included: true },
      { text: 'Request fitur prioritas', included: true },
      { text: 'Early access update', included: true },
    ],
    cta: 'Donasi Sekarang',
    ctaVariant: 'default',
    popular: false,
  },
  {
    id: 'patron',
    name: 'PATRON',
    nameEn: 'Patron',
    price: 2000000,
    priceDisplay: 'Rp 2.000.000',
    period: 'sekali donasi',
    description: 'Donatur utama pembangunan masjid',
    badge: '👑',
    features: [
      { text: 'Semua fitur GOLD', included: true },
      { text: 'Nama di prasasti masjid*', included: true },
      { text: 'Sertifikat apresiasi', included: true },
      { text: 'Konsultasi langsung developer', included: true },
      { text: 'Custom feature request', included: true },
      { text: 'Akses seumur hidup', included: true },
      { text: 'Mention di media sosial', included: true },
      { text: 'Undangan acara offline', included: true },
      { text: 'Laporan progress masjid', included: true },
      { text: 'Doa khusus dari santri', included: true },
    ],
    cta: 'Jadi Patron',
    ctaVariant: 'gold',
    popular: false,
    note: '*Untuk donasi pembangunan masjid'
  },
];
```

### 6.2 Pricing Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO                                                           │
│  "Pilih Paket Sesuai Kebutuhan"                                │
│  Semua donasi digunakan untuk pengembangan platform            │
│  dan pembangunan pusat pendidikan Islam                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRICING CARDS                                                  │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ GRATIS  │ │ BRONZE  │ │ SILVER  │ │  GOLD   │ │ PATRON  │  │
│  │         │ │   🥉    │ │   🥈    │ │   🥇    │ │   👑    │  │
│  │  Rp 0   │ │ Rp 50K  │ │ Rp 150K │ │ Rp 500K │ │  Rp 2M  │  │
│  │         │ │         │ │ POPULAR │ │         │ │         │  │
│  │ [List]  │ │ [List]  │ │ [List]  │ │ [List]  │ │ [List]  │  │
│  │         │ │         │ │         │ │         │ │         │  │
│  │ [Mulai] │ │[Donasi] │ │[Donasi] │ │[Donasi] │ │ [Jadi]  │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TENANT/ORGANIZATION PRICING                                    │
│  "Untuk Pesantren, Sekolah & Organisasi"                       │
│                                                                 │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐         │
│  │   STARTER     │ │    GROWTH     │ │ PROFESSIONAL  │         │
│  │   30 users    │ │   100 users   │ │   500 users   │         │
│  │  Rp 300K/bln  │ │  Rp 750K/bln  │ │  Rp 2.5M/bln  │         │
│  └───────────────┘ └───────────────┘ └───────────────┘         │
│                                                                 │
│  [Hubungi untuk Enterprise →]                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COMPARISON TABLE                                               │
│  [Toggle: Individual / Organization]                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Fitur          │ Gratis │ Bronze │ Silver │ Gold │ Patron│   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ Modul AI       │   10   │   20   │  36+   │ 36+  │  36+  │   │
│  │ Setoran/hari   │    5   │   15   │   50   │  ∞   │   ∞   │   │
│  │ Write/hari     │    3   │   10   │   30   │  ∞   │   ∞   │   │
│  │ Riwayat        │  7 hr  │ 30 hr  │ 90 hr  │  ∞   │   ∞   │   │
│  │ Export         │   ❌   │   ❌   │   ✅   │  ✅  │   ✅  │   │
│  │ Prioritas      │   ❌   │   ❌   │   ❌   │  ✅  │   ✅  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FAQ PRICING                                                    │
│  [Accordion with common questions]                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PAYMENT METHODS                                                │
│  "Metode Pembayaran"                                           │
│  [Kitabisa] [QRIS] [Bank Transfer] [E-Wallet]                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Tenant/Organization Pricing

```tsx
const tenantPricing = [
  {
    id: 'free_tenant',
    name: 'FREE',
    price: 0,
    priceDisplay: 'Gratis',
    maxUsers: 5,
    features: [
      '5 pengguna',
      'Fitur dasar',
      'Branding ILMUNA',
      'Support komunitas',
    ],
  },
  {
    id: 'starter',
    name: 'STARTER',
    price: 300000,
    priceDisplay: 'Rp 300.000',
    period: '/bulan',
    maxUsers: 30,
    features: [
      '30 pengguna',
      'Semua modul AI',
      'Dashboard admin',
      'Laporan progress',
      'Support email',
    ],
  },
  {
    id: 'growth',
    name: 'GROWTH',
    price: 750000,
    priceDisplay: 'Rp 750.000',
    period: '/bulan',
    maxUsers: 100,
    popular: true,
    features: [
      '100 pengguna',
      'Semua fitur Starter',
      'Custom branding',
      'API access',
      'Support prioritas',
      'Training online',
    ],
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    price: 2500000,
    priceDisplay: 'Rp 2.500.000',
    period: '/bulan',
    maxUsers: 500,
    features: [
      '500 pengguna',
      'Semua fitur Growth',
      'Subdomain khusus',
      'SSO integration',
      'Dedicated support',
      'Training onsite',
      'Custom report',
    ],
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    price: null,
    priceDisplay: 'Hubungi Kami',
    maxUsers: 1000,
    features: [
      '1000+ pengguna',
      'Semua fitur Professional',
      'Self-hosted option',
      'Custom development',
      'SLA guarantee',
      'Account manager',
    ],
  },
];
```

---

## 7. Features Page (/features)

### 7.1 Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO                                                           │
│  "Fitur Lengkap untuk Perjalanan Ilmu Anda"                    │
│  [Image: Feature showcase]                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  THREE MODES DETAIL                                             │
│                                                                 │
│  ═══════════════════════════════════════════════════════════   │
│  📚 LEARN MODE                                                  │
│  ═══════════════════════════════════════════════════════════   │
│  [Image]                                                       │
│  Belajar terstruktur dengan kurikulum lengkap dari dasar       │
│  hingga mahir. AI membimbing Anda langkah demi langkah.        │
│                                                                 │
│  ✓ Kurikulum 4 level (Tamhidi → Takhassus)                     │
│  ✓ AI tutor yang sabar dan teliti                              │
│  ✓ Quiz dan assessment otomatis                                │
│  ✓ Progress tracking                                           │
│  ✓ Sertifikat kelulusan                                        │
│                                                                 │
│  ═══════════════════════════════════════════════════════════   │
│  🎙️ HAFIDZ MODE                                                │
│  ═══════════════════════════════════════════════════════════   │
│  [Image]                                                       │
│  Setoran hafalan Al-Quran, Hadits, dan Matan dengan            │
│  evaluasi AI yang akurat dan feedback yang membangun.          │
│                                                                 │
│  ✓ Evaluasi real-time dengan Speech-to-Text                    │
│  ✓ Feedback detail per ayat/hadits                             │
│  ✓ History setoran tersimpan                                   │
│  ✓ Progress per surah/kitab                                    │
│  ✓ Jadwal muraja'ah otomatis                                   │
│                                                                 │
│  ═══════════════════════════════════════════════════════════   │
│  ✍️ WRITE MODE                                                  │
│  ═══════════════════════════════════════════════════════════   │
│  [Image]                                                       │
│  Buat konten Islami berkualitas dengan bantuan AI.             │
│  Khutbah, artikel, ceramah, dan materi dakwah.                 │
│                                                                 │
│  ✓ Generator khutbah Jumat                                     │
│  ✓ Pencari dalil otomatis                                      │
│  ✓ Penyusun materi kajian                                      │
│  ✓ Export ke PDF/Word                                          │
│  ✓ Template siap pakai                                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  36+ AI MODULES                                                 │
│  "Modul AI Spesialis"                                          │
│                                                                 │
│  [Grid of all modules with categories]                         │
│                                                                 │
│  📖 QURAN & TAFSIR (9 modules)                                 │
│  📚 HADITS & ULUMUL HADITS (8 modules)                         │
│  ⚖️ FIQIH & USHUL FIQIH (10 modules)                           │
│  🕌 AKIDAH & SEJARAH (9 modules)                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FOR ORGANIZATIONS                                              │
│  "Fitur untuk Pesantren & Sekolah"                             │
│                                                                 │
│  [Multi-tenant features showcase]                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CTA                                                            │
│  "Siap Mencoba?"                                               │
│  [Daftar Gratis]                                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Terms of Service (/terms)

### 8.1 Content

```markdown
# Syarat dan Ketentuan Layanan ILMUNA

**Terakhir diperbarui: [Tanggal]**

## 1. Penerimaan Syarat

Dengan mengakses dan menggunakan platform ILMUNA (selanjutnya disebut 
"Platform", "Kami", atau "Layanan"), Anda menyetujui untuk terikat 
oleh syarat dan ketentuan ini.

## 2. Deskripsi Layanan

ILMUNA adalah platform pendidikan Islam berbasis kecerdasan buatan (AI) 
yang menyediakan:
- Modul pembelajaran Islam interaktif
- Fitur setoran hafalan dengan evaluasi AI
- Pembuatan konten Islami dengan bantuan AI
- Layanan multi-tenant untuk organisasi

## 3. Pendaftaran Akun

### 3.1 Persyaratan
- Usia minimal 13 tahun
- Informasi yang diberikan harus akurat
- Satu akun per individu

### 3.2 Keamanan Akun
- Pengguna bertanggung jawab menjaga kerahasiaan password
- Segera laporkan jika ada aktivitas mencurigakan

## 4. Penggunaan yang Diizinkan

Pengguna DIIZINKAN untuk:
- Mengakses materi pembelajaran untuk kepentingan pribadi
- Menggunakan fitur AI sesuai paket yang dipilih
- Berbagi konten yang dihasilkan dengan atribusi

## 5. Penggunaan yang DILARANG

Pengguna DILARANG untuk:
- Menyebarkan konten yang bertentangan dengan ajaran Islam
- Menggunakan platform untuk penipuan atau spam
- Mencoba meretas atau mengganggu sistem
- Membuat akun palsu atau bot
- Menjual kembali akses tanpa izin
- Menggunakan AI untuk konten menyesatkan

## 6. Sistem Donasi

### 6.1 Sifat Donasi
- Donasi bersifat SUKARELA
- Donasi TIDAK DAPAT dikembalikan (non-refundable)
- Fitur premium diberikan sebagai bentuk apresiasi

### 6.2 Penggunaan Dana
Dana donasi digunakan untuk:
- Pengembangan dan pemeliharaan platform
- Pembangunan pusat pendidikan Islam
- Operasional dan server

## 7. Hak Kekayaan Intelektual

### 7.1 Milik ILMUNA
- Logo, desain, dan brand ILMUNA
- Algoritma dan teknologi AI
- Konten kurikulum original

### 7.2 Milik Pengguna
- Konten yang dibuat pengguna
- Data hafalan dan progress

### 7.3 Konten Islami
- Al-Quran dan terjemahan adalah milik umum
- Hadits dari sumber terpercaya dengan atribusi
- Pendapat ulama dengan rujukan yang jelas

## 8. Batasan Tanggung Jawab

### 8.1 Konten AI
- AI memberikan bantuan, BUKAN fatwa resmi
- Untuk masalah fiqih serius, konsultasikan dengan ulama
- ILMUNA tidak bertanggung jawab atas keputusan berdasarkan output AI

### 8.2 Ketersediaan Layanan
- Layanan disediakan "sebagaimana adanya"
- Kami berusaha menjaga uptime, namun tidak menjamin 100%

## 9. Penghentian Layanan

### 9.1 Oleh Pengguna
- Pengguna dapat menghapus akun kapan saja
- Data akan dihapus sesuai kebijakan privasi

### 9.2 Oleh ILMUNA
Kami berhak menangguhkan/menghentikan akun jika:
- Melanggar syarat dan ketentuan
- Melakukan aktivitas mencurigakan
- Menyebarkan konten terlarang

## 10. Perubahan Syarat

- Kami dapat mengubah syarat ini sewaktu-waktu
- Perubahan akan diumumkan melalui email/notifikasi
- Penggunaan berkelanjutan berarti menyetujui perubahan

## 11. Hukum yang Berlaku

Syarat ini tunduk pada hukum Republik Indonesia.

## 12. Penyelesaian Sengketa

Sengketa akan diselesaikan secara musyawarah mufakat. 
Jika tidak tercapai, akan diselesaikan melalui Pengadilan Negeri Blitar.

## 13. Kontak

Untuk pertanyaan tentang syarat ini:
- Email: pendtiumpraz@gmail.com
- WhatsApp: +62 813-1950-4441
```

---

## 9. Privacy Policy (/privacy)

### 9.1 Content

```markdown
# Kebijakan Privasi ILMUNA

**Terakhir diperbarui: [Tanggal]**

## 1. Pendahuluan

ILMUNA ("Kami") berkomitmen melindungi privasi pengguna. 
Kebijakan ini menjelaskan bagaimana kami mengumpulkan, 
menggunakan, dan melindungi data Anda.

## 2. Data yang Kami Kumpulkan

### 2.1 Data yang Anda Berikan
- **Data Akun**: Nama, email, nomor telepon
- **Data Profil**: Foto profil, bio, preferensi bahasa
- **Data Pembelajaran**: Progress, nilai, riwayat chat
- **Data Hafalan**: Rekaman audio (sementara), skor, feedback
- **Data Donasi**: Informasi pembayaran (diproses pihak ketiga)

### 2.2 Data Otomatis
- **Data Perangkat**: Jenis device, browser, OS
- **Data Penggunaan**: Halaman dikunjungi, waktu akses
- **Data Lokasi**: Negara/kota (dari IP address)
- **Cookies**: Preferensi dan sesi login

### 2.3 Data dari Pihak Ketiga
- **Google OAuth**: Nama, email, foto profil (jika login dengan Google)

## 3. Penggunaan Data

Kami menggunakan data Anda untuk:

### 3.1 Menyediakan Layanan
- Membuat dan mengelola akun
- Menyimpan progress pembelajaran
- Mengevaluasi setoran hafalan
- Menyediakan rekomendasi personal

### 3.2 Meningkatkan Layanan
- Analisis penggunaan platform
- Pengembangan fitur baru
- Perbaikan bug dan performa

### 3.3 Komunikasi
- Notifikasi penting tentang akun
- Newsletter (jika berlangganan)
- Respon pertanyaan/dukungan

### 3.4 Keamanan
- Mencegah penipuan dan penyalahgunaan
- Verifikasi identitas
- Kepatuhan hukum

## 4. Penyimpanan Data

### 4.1 Lokasi
- Data disimpan di server Vercel (global)
- Database di Neon PostgreSQL (cloud)
- File di Cloudinary (jika ada)

### 4.2 Durasi
- Data akun: Selama akun aktif + 30 hari setelah penghapusan
- Data pembelajaran: Sesuai paket (7 hari - selamanya)
- Data hafalan audio: TIDAK DISIMPAN permanen (hanya diproses)
- Log: 90 hari

## 5. Berbagi Data

### 5.1 TIDAK Kami Jual
Kami TIDAK PERNAH menjual data pengguna ke pihak ketiga.

### 5.2 Pihak Ketiga yang Dipercaya
Data mungkin dibagikan ke:
- **Google**: Untuk OAuth login
- **Vercel**: Hosting platform
- **Neon**: Database
- **Kitabisa**: Pembayaran donasi
- **Google Analytics**: Analisis (anonim)

### 5.3 Kewajiban Hukum
Data dapat dibagikan jika diwajibkan oleh hukum Indonesia.

## 6. Keamanan Data

Kami menerapkan:
- Enkripsi HTTPS untuk transmisi data
- Enkripsi database untuk data sensitif
- Akses terbatas ke data pengguna
- Audit keamanan berkala
- 2FA untuk akun admin

## 7. Hak Pengguna

Anda berhak untuk:

### 7.1 Akses
Meminta salinan data Anda yang kami simpan.

### 7.2 Koreksi
Memperbarui atau memperbaiki data yang tidak akurat.

### 7.3 Penghapusan
Meminta penghapusan akun dan data Anda.

### 7.4 Pembatasan
Membatasi penggunaan data tertentu.

### 7.5 Portabilitas
Meminta data dalam format yang dapat dibaca mesin.

### 7.6 Keberatan
Menolak penggunaan data untuk marketing.

Untuk menggunakan hak ini, hubungi: pendtiumpraz@gmail.com

## 8. Cookies

### 8.1 Jenis Cookies
- **Esensial**: Untuk fungsi dasar (login, sesi)
- **Preferensi**: Menyimpan pengaturan bahasa
- **Analitik**: Memahami penggunaan (Google Analytics)

### 8.2 Kontrol Cookies
Anda dapat mengatur cookies melalui browser. 
Menonaktifkan cookies esensial dapat mengganggu fungsi platform.

## 9. Anak-anak

- Platform untuk usia 13 tahun ke atas
- Kami tidak sengaja mengumpulkan data anak di bawah 13 tahun
- Jika ditemukan, data akan segera dihapus

## 10. Perubahan Kebijakan

- Kami dapat memperbarui kebijakan ini
- Perubahan signifikan akan diberitahukan via email
- Tanggal pembaruan terakhir tercantum di atas

## 11. Transfer Internasional

Data mungkin diproses di server di luar Indonesia 
(Vercel global network). Kami memastikan perlindungan 
yang memadai sesuai standar internasional.

## 12. Kontak

Untuk pertanyaan tentang privasi:

**Data Protection Contact**
- Nama: Galih
- Email: pendtiumpraz@gmail.com
- WhatsApp: +62 813-1950-4441
- Alamat: Blitar, Jawa Timur, Indonesia

## 13. Persetujuan

Dengan menggunakan ILMUNA, Anda menyetujui kebijakan privasi ini.
```

---

## 10. FAQ Page (/faq)

### 10.1 FAQ Categories

```tsx
const faqCategories = [
  {
    id: 'general',
    title: 'Umum',
    icon: 'HelpCircle',
    questions: [
      {
        q: 'Apa itu ILMUNA?',
        a: 'ILMUNA adalah platform pendidikan Islam berbasis AI yang menyediakan berbagai modul pembelajaran Al-Quran, Hadits, Fiqih, dan ilmu Islam lainnya dengan bantuan kecerdasan buatan.'
      },
      {
        q: 'Apakah ILMUNA gratis?',
        a: 'Ya! ILMUNA menyediakan paket GRATIS selamanya dengan akses ke 10 modul AI dasar. Untuk fitur lebih lengkap, Anda dapat berdonasi dan mendapatkan akses premium sebagai bentuk apresiasi.'
      },
      {
        q: 'Siapa yang membuat ILMUNA?',
        a: 'ILMUNA dikembangkan oleh tim yang didukung oleh komunitas mengaji di Blitar, termasuk Kesamben Mengaji, Blitar Mengaji, Yayasan Sanggrahan Tunas Mulia, dan Yayasan Imam Syafii Blitar.'
      },
    ]
  },
  {
    id: 'account',
    title: 'Akun',
    icon: 'User',
    questions: [
      {
        q: 'Bagaimana cara mendaftar?',
        a: 'Klik tombol "Daftar Gratis" di halaman utama, lalu login dengan akun Google Anda. Proses pendaftaran otomatis dan instan.'
      },
      {
        q: 'Apakah data saya aman?',
        a: 'Ya, kami menggunakan enkripsi dan mengikuti standar keamanan data. Baca Kebijakan Privasi kami untuk detail lengkap.'
      },
    ]
  },
  {
    id: 'features',
    title: 'Fitur',
    icon: 'Sparkles',
    questions: [
      {
        q: 'Apa itu Learn Mode?',
        a: 'Learn Mode adalah mode belajar terstruktur dengan kurikulum lengkap. AI akan membimbing Anda dari materi dasar hingga mahir dengan quiz dan assessment.'
      },
      {
        q: 'Apa itu Hafidz Mode?',
        a: 'Hafidz Mode adalah fitur untuk setoran hafalan Al-Quran, Hadits, atau Matan. Anda merekam bacaan, AI akan mengevaluasi dan memberikan feedback.'
      },
      {
        q: 'Apa itu Write Mode?',
        a: 'Write Mode membantu Anda membuat konten Islami seperti khutbah, artikel, atau materi kajian dengan bantuan AI.'
      },
    ]
  },
  {
    id: 'donation',
    title: 'Donasi',
    icon: 'Heart',
    questions: [
      {
        q: 'Kemana donasi disalurkan?',
        a: 'Donasi digunakan untuk: 1) Pengembangan platform, 2) Biaya server dan operasional, 3) Pembangunan pusat pendidikan Islam di 6 lokasi di Blitar.'
      },
      {
        q: 'Apakah donasi bisa dikembalikan?',
        a: 'Donasi bersifat sukarela dan tidak dapat dikembalikan (non-refundable). Fitur premium adalah bentuk apresiasi, bukan pembelian.'
      },
      {
        q: 'Metode pembayaran apa yang tersedia?',
        a: 'Kami menerima donasi melalui Kitabisa, QRIS, transfer bank, dan e-wallet.'
      },
    ]
  },
  {
    id: 'organization',
    title: 'Organisasi',
    icon: 'Building',
    questions: [
      {
        q: 'Apakah bisa untuk pesantren/sekolah?',
        a: 'Ya! Kami menyediakan paket khusus untuk organisasi mulai dari 5 hingga 1000+ pengguna dengan fitur manajemen dan laporan.'
      },
      {
        q: 'Bagaimana cara berlangganan untuk organisasi?',
        a: 'Hubungi kami melalui halaman Kontak atau WhatsApp untuk konsultasi dan penawaran khusus.'
      },
    ]
  },
];
```

---

## 11. Design Guidelines

### 11.1 Typography

```css
/* Arabic Text */
.font-arabic {
  font-family: 'Amiri', 'Traditional Arabic', serif;
  direction: rtl;
}

/* Headings */
.font-heading {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 700;
}

/* Body */
.font-body {
  font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
}
```

### 11.2 Unsplash Image Collection

```typescript
const unsplashImages = {
  hero: {
    main: 'https://images.unsplash.com/photo-1585036156171-384164a8c675',
    alt: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
  },
  features: {
    learn: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    hafidz: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
    write: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
  },
  about: {
    team: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
    mission: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
  backgrounds: {
    mosque: 'https://images.unsplash.com/photo-1564769625905-50e93615e769',
    quran: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
    students: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    islamic_art: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f',
  },
  testimonials: {
    avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    avatar2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    avatar3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  }
};
```

### 11.3 Component Library

```tsx
// Key components for public pages
const publicPageComponents = [
  'Header',
  'Footer',
  'Hero',
  'FeatureCard',
  'PricingCard',
  'TestimonialCard',
  'FAQAccordion',
  'ContactForm',
  'SupporterLogos',
  'CTASection',
  'StatsCounter',
  'ModuleGrid',
  'ComparisonTable',
];
```

---

## 12. SEO Requirements

### 12.1 Meta Tags per Page

```tsx
const pageSEO = {
  home: {
    title: 'ILMUNA - Platform Pendidikan Islam Berbasis AI',
    description: 'Belajar Al-Quran, Hadits, dan Ilmu Islam dengan AI. 36+ modul pembelajaran, setoran hafalan dengan evaluasi AI, dan pembuatan konten Islami.',
    keywords: 'pendidikan islam, belajar quran online, hafalan quran ai, ilmu islam, fiqih online',
  },
  about: {
    title: 'Tentang Kami - ILMUNA',
    description: 'ILMUNA adalah platform pendidikan Islam berbasis AI yang didukung oleh komunitas mengaji di Blitar.',
  },
  pricing: {
    title: 'Harga & Paket - ILMUNA',
    description: 'Pilih paket ILMUNA sesuai kebutuhan. Mulai GRATIS selamanya atau donasi untuk akses premium.',
  },
  contact: {
    title: 'Hubungi Kami - ILMUNA',
    description: 'Hubungi tim ILMUNA untuk pertanyaan, kerjasama, atau dukungan teknis.',
  },
  features: {
    title: 'Fitur Lengkap - ILMUNA',
    description: 'Jelajahi fitur Learn Mode, Hafidz Mode, Write Mode, dan 36+ modul AI di ILMUNA.',
  },
};
```

### 12.2 Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ILMUNA",
  "description": "Platform Pendidikan Islam Berbasis AI",
  "url": "https://ilmuna.ai",
  "logo": "https://ilmuna.ai/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-813-1950-4441",
    "contactType": "customer service",
    "email": "pendtiumpraz@gmail.com"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Blitar",
    "addressRegion": "Jawa Timur",
    "addressCountry": "ID"
  }
}
```

---

## 13. Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Summary

| Page | Priority | Complexity |
|------|----------|------------|
| Landing (/) | HIGH | High |
| Pricing | HIGH | Medium |
| About | MEDIUM | Low |
| Contact | MEDIUM | Low |
| Features | MEDIUM | Medium |
| Terms | LOW | Low |
| Privacy | LOW | Low |
| FAQ | LOW | Medium |
