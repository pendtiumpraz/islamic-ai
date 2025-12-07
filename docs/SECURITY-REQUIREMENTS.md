# 🛡️ SECURITY & ANTI-ABUSE REQUIREMENTS - ILMUNA

> **Version**: 1.0.0-MVP
> **Last Updated**: December 2024
> **Priority**: CRITICAL

---

## 📖 Table of Contents

1. [Overview](#1-overview)
2. [Threat Model](#2-threat-model)
3. [Multi-Layer Protection](#3-multi-layer-protection)
4. [Registration Security](#4-registration-security)
5. [Device Fingerprinting](#5-device-fingerprinting)
6. [Rate Limiting](#6-rate-limiting)
7. [Email & Phone Verification](#7-email--phone-verification)
8. [Tenant-Specific Security](#8-tenant-specific-security)
9. [Database Schema](#9-database-schema)
10. [API Implementation](#10-api-implementation)
11. [Monitoring & Alerting](#11-monitoring--alerting)
12. [Incident Response](#12-incident-response)

---

## 1. Overview

### 1.1 Security Goals

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY OBJECTIVES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎯 PRIMARY GOALS:                                              │
│  ├── Prevent mass fake registrations                           │
│  ├── Block automated bot attacks                               │
│  ├── Protect against database injection                        │
│  ├── Ensure 1 user = 1 real person                             │
│  └── Give tenant admins full control over their users          │
│                                                                 │
│  🎯 SECONDARY GOALS:                                            │
│  ├── Maintain good user experience for legitimate users        │
│  ├── Minimize false positives                                  │
│  ├── Provide audit trail for security events                   │
│  └── Enable quick response to attacks                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Indonesia-Specific Considerations

```
┌─────────────────────────────────────────────────────────────────┐
│              INDONESIA THREAT LANDSCAPE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ⚠️ Common Attack Patterns:                                    │
│  ├── Mass registration with fake emails                        │
│  ├── VPN/proxy usage to bypass IP limits                       │
│  ├── Disposable email services (tempmail, guerrillamail)       │
│  ├── Bot scripts for automated registration                    │
│  ├── Social engineering attempts                               │
│  └── "Iseng" attacks (trolling/vandalism)                      │
│                                                                 │
│  ⚠️ Technical Challenges:                                       │
│  ├── Shared IP addresses (mobile carriers, offices)            │
│  ├── Dynamic IP assignments                                    │
│  ├── Low smartphone diversity (similar fingerprints)           │
│  └── Limited phone number verification adoption                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Threat Model

### 2.1 Identified Threats

| Threat | Severity | Likelihood | Impact |
|--------|----------|------------|--------|
| Mass fake registration | HIGH | HIGH | Database bloat, resource drain |
| Bot attacks | HIGH | HIGH | Service disruption |
| Account takeover | MEDIUM | MEDIUM | Data breach |
| API abuse | HIGH | HIGH | Cost increase (AI API) |
| Spam content | MEDIUM | HIGH | Platform reputation |
| Data scraping | LOW | MEDIUM | Content theft |
| DDoS | MEDIUM | LOW | Service downtime |

### 2.2 Attack Vectors

```
┌─────────────────────────────────────────────────────────────────┐
│                    ATTACK VECTORS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  REGISTRATION ATTACKS:                                          │
│  ├── Automated scripts creating thousands of accounts          │
│  ├── Disposable email services                                 │
│  ├── VPN rotation to bypass IP limits                          │
│  ├── Virtual machines to bypass device limits                  │
│  └── Fake tenant registrations                                 │
│                                                                 │
│  API ABUSE:                                                     │
│  ├── Excessive AI API calls (cost attack)                      │
│  ├── Scraping Islamic content                                  │
│  ├── Brute force authentication                                │
│  └── Token/session hijacking                                   │
│                                                                 │
│  SOCIAL ENGINEERING:                                            │
│  ├── Phishing tenant admins                                    │
│  ├── Impersonating support                                     │
│  └── Fake donation claims                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Multi-Layer Protection

### 3.1 Defense in Depth

```
┌─────────────────────────────────────────────────────────────────┐
│                 SECURITY LAYERS                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LAYER 1: EDGE PROTECTION                                       │
│  ├── Cloudflare/Vercel WAF                                     │
│  ├── DDoS protection                                           │
│  ├── Bot detection                                             │
│  └── Geographic restrictions (optional)                        │
│                                                                 │
│  LAYER 2: APPLICATION FIREWALL                                  │
│  ├── reCAPTCHA v3 (invisible)                                  │
│  ├── Honeypot fields                                           │
│  ├── Request validation                                        │
│  └── CSRF protection                                           │
│                                                                 │
│  LAYER 3: RATE LIMITING                                         │
│  ├── IP-based limits                                           │
│  ├── User-based limits                                         │
│  ├── Endpoint-specific limits                                  │
│  └── Tenant-based limits                                       │
│                                                                 │
│  LAYER 4: IDENTITY VERIFICATION                                 │
│  ├── Device fingerprinting                                     │
│  ├── Email verification                                        │
│  ├── Phone verification (optional)                             │
│  └── Admin approval (tenant-specific)                          │
│                                                                 │
│  LAYER 5: BEHAVIORAL ANALYSIS                                   │
│  ├── Suspicious pattern detection                              │
│  ├── Anomaly alerting                                          │
│  └── Automatic blocking                                        │
│                                                                 │
│  LAYER 6: AUDIT & MONITORING                                    │
│  ├── Comprehensive logging                                     │
│  ├── Real-time dashboards                                      │
│  └── Incident response procedures                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Protection Matrix

| Attack Type | L1 Edge | L2 App | L3 Rate | L4 Identity | L5 Behavior |
|-------------|---------|--------|---------|-------------|-------------|
| Bot registration | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mass signup | ⚪ | ✅ | ✅ | ✅ | ✅ |
| API abuse | ✅ | ⚪ | ✅ | ⚪ | ✅ |
| Fake accounts | ⚪ | ⚪ | ⚪ | ✅ | ✅ |
| DDoS | ✅ | ⚪ | ✅ | ⚪ | ⚪ |

---

## 4. Registration Security

### 4.1 Registration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│               SECURE REGISTRATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User visits registration page                                  │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Step 1: Client-side Checks                             │   │
│  │  ├── Load reCAPTCHA                                     │   │
│  │  ├── Generate device fingerprint                        │   │
│  │  ├── Check honeypot fields                              │   │
│  │  └── Validate form client-side                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Step 2: Server-side Validation                         │   │
│  │  ├── Verify reCAPTCHA token                             │   │
│  │  ├── Check IP against blocklist                         │   │
│  │  ├── Check device against blocklist                     │   │
│  │  ├── Verify IP rate limit                               │   │
│  │  ├── Verify device limit                                │   │
│  │  ├── Check email domain                                 │   │
│  │  └── Validate all input data                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ├── Any check fails → Log & Reject                     │
│         │                                                       │
│         ▼ All checks pass                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Step 3: Create Account                                 │   │
│  │  ├── Hash password (Argon2id)                           │   │
│  │  ├── Store device fingerprint                           │   │
│  │  ├── Store registration IP                              │   │
│  │  ├── Generate verification token                        │   │
│  │  ├── Set status = PENDING_VERIFICATION                  │   │
│  │  └── Log successful registration                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Step 4: Email Verification                             │   │
│  │  ├── Send verification email                            │   │
│  │  ├── User clicks link                                   │   │
│  │  ├── Verify token (expires in 24h)                      │   │
│  │  └── Set status = ACTIVE or PENDING_APPROVAL            │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                                                       │
│         ▼ (If tenant requires approval)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Step 5: Admin Approval                                 │   │
│  │  ├── Notify tenant admin                                │   │
│  │  ├── Admin reviews request                              │   │
│  │  ├── Approve → Set status = ACTIVE                      │   │
│  │  └── Reject → Set status = REJECTED                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Registration Rules

```yaml
# Registration Security Rules

ip_limits:
  max_registrations_per_ip_per_day: 3
  max_pending_per_ip: 5
  block_duration_hours: 24
  
device_limits:
  max_accounts_per_device: 1
  allow_reregistration_after_days: 30
  
email_rules:
  require_verification: true
  verification_expiry_hours: 24
  blocked_domains:
    - tempmail.com
    - guerrillamail.com
    - mailinator.com
    - throwaway.email
    - 10minutemail.com
    - fakeinbox.com
    - trashmail.com
    - sharklasers.com
    - yopmail.com
    # ... extended list
  
captcha:
  provider: "recaptcha_v3"
  min_score: 0.5
  
password_policy:
  min_length: 8
  require_uppercase: false  # Simplified for Indonesian users
  require_number: true
  require_special: false
  
auto_block_triggers:
  failed_attempts_per_hour: 10
  failed_captcha_per_hour: 5
  suspicious_patterns:
    - rapid_sequential_registrations
    - identical_passwords_different_emails
    - similar_usernames_pattern
```

---

## 5. Device Fingerprinting

### 5.1 Fingerprint Components

```typescript
// Device fingerprint composition

interface DeviceFingerprint {
  // Browser signals
  userAgent: string;
  language: string;
  languages: string[];
  platform: string;
  
  // Screen
  screenResolution: string;      // "1920x1080"
  availableResolution: string;   // "1920x1040"
  colorDepth: number;
  pixelRatio: number;
  
  // Hardware
  hardwareConcurrency: number;   // CPU cores
  deviceMemory?: number;         // RAM in GB
  
  // Time
  timezone: string;
  timezoneOffset: number;
  
  // Canvas fingerprint
  canvasHash: string;
  
  // WebGL
  webglVendor: string;
  webglRenderer: string;
  
  // Audio fingerprint
  audioHash: string;
  
  // Fonts (hashed list)
  fontsHash: string;
  
  // Storage
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  
  // Plugins (hashed)
  pluginsHash: string;
}
```

### 5.2 Fingerprint Implementation

```typescript
// lib/fingerprint.ts

import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Initialize on app load
let fpAgent: any = null;

export async function initFingerprint() {
  if (!fpAgent) {
    fpAgent = await FingerprintJS.load();
  }
  return fpAgent;
}

export async function getDeviceFingerprint(): Promise<{
  visitorId: string;
  confidence: number;
  components: Record<string, any>;
}> {
  const fp = await initFingerprint();
  const result = await fp.get();
  
  return {
    visitorId: result.visitorId,
    confidence: result.confidence.score,
    components: result.components,
  };
}

// Enhanced fingerprint with additional signals
export async function getEnhancedFingerprint(): Promise<string> {
  const { visitorId, components } = await getDeviceFingerprint();
  
  // Add extra signals that FingerprintJS might miss
  const extraSignals = [
    navigator.hardwareConcurrency,
    (navigator as any).deviceMemory,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].filter(Boolean);
  
  // Combine and hash
  const combined = visitorId + '|' + extraSignals.join('|');
  return await sha256(combined);
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### 5.3 Server-side Fingerprint Validation

```typescript
// lib/services/fingerprint.service.ts

export async function validateDeviceFingerprint(
  fingerprint: string,
  userId?: string
): Promise<{
  isValid: boolean;
  reason?: string;
  existingUserId?: string;
}> {
  // Check if fingerprint is in blocklist
  const blocked = await prisma.blockedEntity.findFirst({
    where: {
      type: 'DEVICE',
      value: fingerprint,
      OR: [
        { isPermanent: true },
        { expiresAt: { gt: new Date() } },
      ],
    },
  });
  
  if (blocked) {
    return {
      isValid: false,
      reason: 'Device is blocked: ' + blocked.reason,
    };
  }
  
  // Check if device already has an active account
  const existingUser = await prisma.user.findFirst({
    where: {
      deviceFingerprint: fingerprint,
      status: { in: ['ACTIVE', 'PENDING_APPROVAL'] },
      id: userId ? { not: userId } : undefined,
    },
  });
  
  if (existingUser) {
    return {
      isValid: false,
      reason: 'Device already has an active account',
      existingUserId: existingUser.id,
    };
  }
  
  return { isValid: true };
}

// Detect suspicious fingerprint patterns
export async function detectSuspiciousDevice(
  fingerprint: string,
  ip: string
): Promise<{ suspicious: boolean; reasons: string[] }> {
  const reasons: string[] = [];
  
  // Check for fingerprint reuse across IPs
  const ipCount = await prisma.user.groupBy({
    by: ['registrationIp'],
    where: { deviceFingerprint: fingerprint },
    _count: true,
  });
  
  if (ipCount.length > 3) {
    reasons.push('Fingerprint used from multiple IPs');
  }
  
  // Check for rapid registrations
  const recentAttempts = await prisma.registrationAttempt.count({
    where: {
      deviceFingerprint: fingerprint,
      createdAt: { gt: new Date(Date.now() - 60 * 60 * 1000) },
    },
  });
  
  if (recentAttempts > 5) {
    reasons.push('Too many registration attempts');
  }
  
  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}
```

---

## 6. Rate Limiting

### 6.1 Rate Limit Configuration

```typescript
// lib/rate-limit.ts

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Different limiters for different actions
export const rateLimiters = {
  // Registration: 3 per IP per day
  registration: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '24 h'),
    prefix: 'ratelimit:registration',
    analytics: true,
  }),
  
  // Login attempts: 5 per IP per 15 minutes
  login: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    prefix: 'ratelimit:login',
    analytics: true,
  }),
  
  // Password reset: 3 per email per hour
  passwordReset: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    prefix: 'ratelimit:password-reset',
    analytics: true,
  }),
  
  // AI Chat: Based on tier
  aiChat: {
    FREE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '24 h'),
      prefix: 'ratelimit:ai:free',
    }),
    BRONZE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '24 h'),
      prefix: 'ratelimit:ai:bronze',
    }),
    SILVER: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, '24 h'),
      prefix: 'ratelimit:ai:silver',
    }),
    GOLD: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(500, '24 h'),
      prefix: 'ratelimit:ai:gold',
    }),
    PATRON: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1000, '24 h'),
      prefix: 'ratelimit:ai:patron',
    }),
  },
  
  // Hafalan submission: Based on tier
  hafalan: {
    FREE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '24 h'),
      prefix: 'ratelimit:hafalan:free',
    }),
    BRONZE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '24 h'),
      prefix: 'ratelimit:hafalan:bronze',
    }),
    // ... similar for other tiers
  },
  
  // API general: 100 per minute per user
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    prefix: 'ratelimit:api',
  }),
};

// Rate limit check helper
export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<{
  success: boolean;
  remaining: number;
  reset: number;
}> {
  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
```

### 6.2 Rate Limit Middleware

```typescript
// middleware/rate-limit.ts

import { NextRequest, NextResponse } from 'next/server';
import { rateLimiters } from '@/lib/rate-limit';

export async function rateLimitMiddleware(
  request: NextRequest,
  action: keyof typeof rateLimiters
) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const limiter = rateLimiters[action];
  if (!limiter || typeof limiter.limit !== 'function') {
    return null; // Skip if limiter not found
  }
  
  const result = await limiter.limit(ip);
  
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toString(),
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }
  
  return null; // Continue processing
}
```

---

## 7. Email & Phone Verification

### 7.1 Email Verification Flow

```typescript
// lib/services/verification.service.ts

import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { generateToken, hashToken } from '@/lib/crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  userId: string,
  email: string
): Promise<boolean> {
  // Generate token
  const token = generateToken(32);
  const hashedToken = await hashToken(token);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  // Store token
  await prisma.verificationToken.upsert({
    where: { userId },
    create: {
      userId,
      token: hashedToken,
      type: 'EMAIL',
      expiresAt,
    },
    update: {
      token: hashedToken,
      expiresAt,
    },
  });
  
  // Send email
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}&userId=${userId}`;
  
  try {
    await resend.emails.send({
      from: 'ILMUNA <noreply@ilmuna.ai>',
      to: email,
      subject: 'Verifikasi Email Anda - ILMUNA',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #22c55e;">Assalamu'alaikum!</h1>
          <p>Terima kasih telah mendaftar di ILMUNA.</p>
          <p>Klik tombol di bawah untuk memverifikasi email Anda:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; background: #22c55e; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 8px;
                    margin: 16px 0;">
            Verifikasi Email
          </a>
          <p style="color: #666; font-size: 14px;">
            Link ini akan kadaluarsa dalam 24 jam.
          </p>
          <p style="color: #666; font-size: 14px;">
            Jika Anda tidak mendaftar di ILMUNA, abaikan email ini.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          <p style="color: #999; font-size: 12px;">
            ILMUNA - Platform Pendidikan Islam Berbasis AI
          </p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return false;
  }
}

export async function verifyEmail(
  userId: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  const hashedToken = await hashToken(token);
  
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      userId,
      token: hashedToken,
      type: 'EMAIL',
      expiresAt: { gt: new Date() },
    },
  });
  
  if (!verificationToken) {
    return { success: false, error: 'Invalid or expired token' };
  }
  
  // Update user status
  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerified: true,
      status: 'ACTIVE', // or PENDING_APPROVAL if tenant requires it
    },
  });
  
  // Delete used token
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });
  
  return { success: true };
}
```

### 7.2 Phone Verification (Optional - WhatsApp OTP)

```typescript
// lib/services/whatsapp-otp.service.ts

// Using Fonnte or similar WhatsApp API provider

export async function sendWhatsAppOTP(
  phone: string
): Promise<{ success: boolean; error?: string }> {
  const otp = generateOTP(6);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  
  // Store OTP
  await prisma.otpVerification.create({
    data: {
      phone,
      otp: await hashToken(otp),
      expiresAt,
    },
  });
  
  // Send via WhatsApp
  try {
    await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': process.env.FONNTE_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: phone,
        message: `Kode OTP ILMUNA Anda: ${otp}\n\nJangan bagikan kode ini kepada siapapun.\nKadaluarsa dalam 5 menit.`,
      }),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to send OTP' };
  }
}

function generateOTP(length: number): string {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}
```

---

## 8. Tenant-Specific Security

### 8.1 Registration Modes

```typescript
// Tenant registration configuration

enum RegistrationMode {
  OPEN = 'OPEN',                    // Anyone can register
  DOMAIN_RESTRICTED = 'DOMAIN_RESTRICTED',  // Only specific email domains
  INVITE_ONLY = 'INVITE_ONLY',      // Only via invitation
  APPROVAL_REQUIRED = 'APPROVAL_REQUIRED',  // Requires admin approval
  DISABLED = 'DISABLED',            // No new registrations
}

interface TenantSecuritySettings {
  registrationMode: RegistrationMode;
  allowedEmailDomains?: string[];   // For DOMAIN_RESTRICTED
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  requireAdminApproval: boolean;
  maxUsersPerDevice: number;
  sessionTimeout: number;           // minutes
  allowMultipleSessions: boolean;
}
```

### 8.2 Invite-Only System

```typescript
// lib/services/invitation.service.ts

export async function createInvitation(
  tenantId: string,
  invitedBy: string,
  email: string,
  role: string = 'STUDENT',
  expiresInDays: number = 7
): Promise<{ success: boolean; invitation?: any; error?: string }> {
  // Check tenant user limit
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: { _count: { select: { users: true } } },
  });
  
  if (!tenant) {
    return { success: false, error: 'Tenant not found' };
  }
  
  if (tenant._count.users >= tenant.maxUsers) {
    return { success: false, error: 'User limit reached' };
  }
  
  // Check if already invited
  const existing = await prisma.invitation.findUnique({
    where: { tenantId_email: { tenantId, email } },
  });
  
  if (existing && existing.expiresAt > new Date()) {
    return { success: false, error: 'Already invited' };
  }
  
  // Create invitation
  const token = generateToken(32);
  const invitation = await prisma.invitation.upsert({
    where: { tenantId_email: { tenantId, email } },
    create: {
      tenantId,
      email,
      role,
      token,
      invitedBy,
      expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    },
    update: {
      token,
      expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    },
  });
  
  // Send invitation email
  await sendInvitationEmail(email, tenant.name, token);
  
  return { success: true, invitation };
}

export async function acceptInvitation(
  token: string,
  userData: { name: string; password: string; deviceFingerprint: string }
): Promise<{ success: boolean; user?: any; error?: string }> {
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { tenant: true },
  });
  
  if (!invitation) {
    return { success: false, error: 'Invalid invitation' };
  }
  
  if (invitation.expiresAt < new Date()) {
    return { success: false, error: 'Invitation expired' };
  }
  
  if (invitation.usedAt) {
    return { success: false, error: 'Invitation already used' };
  }
  
  // Create user
  const user = await prisma.user.create({
    data: {
      email: invitation.email,
      name: userData.name,
      password: await hashPassword(userData.password),
      tenantId: invitation.tenantId,
      deviceFingerprint: userData.deviceFingerprint,
      emailVerified: true, // Already verified via invitation
      status: 'ACTIVE',
    },
  });
  
  // Mark invitation as used
  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { usedAt: new Date() },
  });
  
  return { success: true, user };
}
```

### 8.3 Domain-Restricted Registration

```typescript
// Check if email domain is allowed for tenant

export async function checkEmailDomainAllowed(
  tenantId: string,
  email: string
): Promise<boolean> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { 
      securitySettings: true,
    },
  });
  
  if (!tenant) return false;
  
  const settings = tenant.securitySettings as TenantSecuritySettings;
  
  if (settings.registrationMode !== 'DOMAIN_RESTRICTED') {
    return true; // Not restricted
  }
  
  const emailDomain = email.split('@')[1].toLowerCase();
  const allowedDomains = settings.allowedEmailDomains || [];
  
  return allowedDomains.some(domain => 
    emailDomain === domain.toLowerCase() ||
    emailDomain.endsWith('.' + domain.toLowerCase())
  );
}
```

---

## 9. Database Schema

### 9.1 Security-Related Tables

```prisma
// prisma/schema.prisma - Security Models

// ==================== USER SECURITY ====================

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  password          String?   // Hashed with Argon2id
  name              String
  
  // Verification
  emailVerified     Boolean   @default(false)
  phoneVerified     Boolean   @default(false)
  phone             String?
  
  // Security tracking
  registrationIp    String?
  lastLoginIp       String?
  deviceFingerprint String?
  
  // Status
  status            UserStatus @default(PENDING_VERIFICATION)
  statusReason      String?
  
  // Tenant
  tenantId          String?
  tenant            Tenant?   @relation(fields: [tenantId], references: [id])
  
  // Sessions
  sessions          Session[]
  
  // Security events
  securityEvents    SecurityEvent[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLoginAt       DateTime?
  
  @@index([deviceFingerprint])
  @@index([registrationIp])
  @@index([status])
}

model Session {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  token           String    @unique
  deviceFingerprint String?
  ip              String?
  userAgent       String?
  
  expiresAt       DateTime
  createdAt       DateTime  @default(now())
  lastActiveAt    DateTime  @default(now())
  
  @@index([userId])
  @@index([token])
}

// ==================== VERIFICATION ====================

model VerificationToken {
  id              String    @id @default(cuid())
  userId          String
  token           String    // Hashed
  type            VerificationType
  expiresAt       DateTime
  createdAt       DateTime  @default(now())
  
  @@unique([userId, type])
  @@index([token])
}

model OtpVerification {
  id              String    @id @default(cuid())
  phone           String
  otp             String    // Hashed
  attempts        Int       @default(0)
  expiresAt       DateTime
  createdAt       DateTime  @default(now())
  
  @@index([phone])
}

// ==================== ANTI-ABUSE ====================

model RegistrationAttempt {
  id                String    @id @default(cuid())
  
  ip                String
  deviceFingerprint String?
  email             String?
  tenantId          String?
  
  status            AttemptStatus
  failReason        String?
  
  // Request metadata
  userAgent         String?
  captchaScore      Float?
  
  createdAt         DateTime  @default(now())
  
  @@index([ip])
  @@index([deviceFingerprint])
  @@index([createdAt])
}

model BlockedEntity {
  id              String    @id @default(cuid())
  
  type            BlockType
  value           String
  reason          String
  
  blockedBy       String?   // Admin user ID
  expiresAt       DateTime?
  isPermanent     Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  
  @@unique([type, value])
  @@index([type, value])
}

model SecurityEvent {
  id              String    @id @default(cuid())
  userId          String?
  user            User?     @relation(fields: [userId], references: [id])
  
  type            SecurityEventType
  severity        Severity
  
  ip              String?
  deviceFingerprint String?
  userAgent       String?
  
  details         Json?
  
  createdAt       DateTime  @default(now())
  
  @@index([userId])
  @@index([type])
  @@index([createdAt])
}

// ==================== INVITATION ====================

model Invitation {
  id              String    @id @default(cuid())
  tenantId        String
  tenant          Tenant    @relation(fields: [tenantId], references: [id])
  
  email           String
  role            String    @default("STUDENT")
  token           String    @unique
  
  invitedBy       String
  expiresAt       DateTime
  usedAt          DateTime?
  
  createdAt       DateTime  @default(now())
  
  @@unique([tenantId, email])
  @@index([token])
}

// ==================== ENUMS ====================

enum UserStatus {
  PENDING_VERIFICATION
  PENDING_APPROVAL
  ACTIVE
  SUSPENDED
  BANNED
}

enum VerificationType {
  EMAIL
  PHONE
  PASSWORD_RESET
}

enum AttemptStatus {
  SUCCESS
  FAILED_CAPTCHA
  FAILED_RATE_LIMIT
  FAILED_DEVICE_LIMIT
  FAILED_BLOCKED_IP
  FAILED_BLOCKED_DEVICE
  FAILED_INVALID_EMAIL
  FAILED_VALIDATION
}

enum BlockType {
  IP
  IP_RANGE
  DEVICE
  EMAIL
  EMAIL_DOMAIN
  PHONE_PREFIX
}

enum SecurityEventType {
  REGISTRATION_SUCCESS
  REGISTRATION_FAILED
  LOGIN_SUCCESS
  LOGIN_FAILED
  PASSWORD_RESET_REQUEST
  PASSWORD_CHANGED
  EMAIL_VERIFIED
  ACCOUNT_SUSPENDED
  ACCOUNT_BANNED
  SUSPICIOUS_ACTIVITY
  API_ABUSE_DETECTED
}

enum Severity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

---

## 10. API Implementation

### 10.1 Secure Registration Endpoint

```typescript
// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { validateDeviceFingerprint, detectSuspiciousDevice } from '@/lib/services/fingerprint.service';
import { sendVerificationEmail } from '@/lib/services/verification.service';
import { hashPassword } from '@/lib/crypto';
import { logSecurityEvent } from '@/lib/services/security.service';

const registerSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s\-']+$/),
  password: z.string().min(8).max(100),
  captchaToken: z.string(),
  deviceFingerprint: z.string().length(64),
  tenantSlug: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let ip = 'unknown';
  let deviceFingerprint = '';
  let email = '';
  
  try {
    // Extract IP
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         request.headers.get('x-real-ip') || 
         'unknown';
    
    // Parse and validate body
    const body = await request.json();
    const data = registerSchema.parse(body);
    deviceFingerprint = data.deviceFingerprint;
    email = data.email.toLowerCase();
    
    // ========== LAYER 1: CAPTCHA VERIFICATION ==========
    const captchaResult = await verifyRecaptcha(data.captchaToken);
    if (!captchaResult.success || captchaResult.score < 0.5) {
      await logAttempt(ip, deviceFingerprint, email, 'FAILED_CAPTCHA', {
        captchaScore: captchaResult.score,
      });
      return errorResponse('Verifikasi captcha gagal. Silakan coba lagi.', 400);
    }
    
    // ========== LAYER 2: CHECK BLOCKLISTS ==========
    const blockedCheck = await checkBlocklists(ip, deviceFingerprint, email);
    if (blockedCheck.blocked) {
      await logAttempt(ip, deviceFingerprint, email, blockedCheck.status);
      return errorResponse(blockedCheck.message, 403);
    }
    
    // ========== LAYER 3: IP RATE LIMIT ==========
    const ipRateLimit = await checkRateLimit(rateLimiters.registration, ip);
    if (!ipRateLimit.success) {
      await logAttempt(ip, deviceFingerprint, email, 'FAILED_RATE_LIMIT');
      return errorResponse(
        'Terlalu banyak percobaan pendaftaran. Silakan coba lagi dalam 24 jam.',
        429,
        { retryAfter: Math.ceil((ipRateLimit.reset - Date.now()) / 1000) }
      );
    }
    
    // ========== LAYER 4: DEVICE FINGERPRINT CHECK ==========
    const deviceCheck = await validateDeviceFingerprint(deviceFingerprint);
    if (!deviceCheck.isValid) {
      await logAttempt(ip, deviceFingerprint, email, 'FAILED_DEVICE_LIMIT');
      return errorResponse('Perangkat ini sudah memiliki akun terdaftar.', 400);
    }
    
    // ========== LAYER 5: SUSPICIOUS ACTIVITY DETECTION ==========
    const suspiciousCheck = await detectSuspiciousDevice(deviceFingerprint, ip);
    if (suspiciousCheck.suspicious) {
      await logSecurityEvent({
        type: 'SUSPICIOUS_ACTIVITY',
        severity: 'MEDIUM',
        ip,
        deviceFingerprint,
        details: { reasons: suspiciousCheck.reasons, email },
      });
      // Don't block, but flag for review
    }
    
    // ========== LAYER 6: EMAIL VALIDATION ==========
    const emailDomain = email.split('@')[1];
    if (await isDisposableEmail(emailDomain)) {
      await logAttempt(ip, deviceFingerprint, email, 'FAILED_INVALID_EMAIL');
      return errorResponse('Email sementara tidak diperbolehkan.', 400);
    }
    
    // ========== LAYER 7: TENANT VALIDATION (if applicable) ==========
    let tenantId: string | null = null;
    if (data.tenantSlug) {
      const tenantCheck = await validateTenantRegistration(data.tenantSlug, email);
      if (!tenantCheck.allowed) {
        return errorResponse(tenantCheck.message, 403);
      }
      tenantId = tenantCheck.tenantId;
    }
    
    // ========== LAYER 8: CHECK EXISTING USER ==========
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      // Security: Don't reveal if email exists
      // But log it for abuse detection
      await logAttempt(ip, deviceFingerprint, email, 'FAILED_VALIDATION', {
        reason: 'email_exists',
      });
      // Return same response as success to prevent enumeration
      return NextResponse.json({
        success: true,
        message: 'Silakan cek email Anda untuk verifikasi.',
      });
    }
    
    // ========== CREATE USER ==========
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email,
        name: data.name,
        password: hashedPassword,
        registrationIp: ip,
        deviceFingerprint,
        tenantId,
        status: 'PENDING_VERIFICATION',
      },
    });
    
    // Send verification email
    await sendVerificationEmail(user.id, email);
    
    // Log success
    await logAttempt(ip, deviceFingerprint, email, 'SUCCESS', {
      userId: user.id,
      duration: Date.now() - startTime,
    });
    
    await logSecurityEvent({
      type: 'REGISTRATION_SUCCESS',
      severity: 'LOW',
      userId: user.id,
      ip,
      deviceFingerprint,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil. Silakan cek email Anda untuk verifikasi.',
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      await logAttempt(ip, deviceFingerprint, email, 'FAILED_VALIDATION', {
        errors: error.errors,
      });
      return errorResponse('Data tidak valid.', 400);
    }
    
    return errorResponse('Pendaftaran gagal. Silakan coba lagi.', 500);
  }
}

// Helper functions
function errorResponse(message: string, status: number, extra?: object) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

async function logAttempt(
  ip: string,
  device: string,
  email: string,
  status: string,
  metadata?: object
) {
  await prisma.registrationAttempt.create({
    data: {
      ip,
      deviceFingerprint: device,
      email,
      status: status as any,
      failReason: status.startsWith('FAILED') ? status : null,
    },
  });
  
  // Check for auto-block triggers
  await checkAutoBlockTriggers(ip, device);
}

async function checkAutoBlockTriggers(ip: string, device: string) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  // Check IP failures
  const ipFailures = await prisma.registrationAttempt.count({
    where: {
      ip,
      status: { startsWith: 'FAILED' },
      createdAt: { gt: oneHourAgo },
    },
  });
  
  if (ipFailures >= 10) {
    await prisma.blockedEntity.upsert({
      where: { type_value: { type: 'IP', value: ip } },
      create: {
        type: 'IP',
        value: ip,
        reason: 'Auto-blocked: Too many failed registration attempts',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      update: {
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
  
  // Check device failures
  const deviceFailures = await prisma.registrationAttempt.count({
    where: {
      deviceFingerprint: device,
      status: { startsWith: 'FAILED' },
      createdAt: { gt: oneHourAgo },
    },
  });
  
  if (deviceFailures >= 5) {
    await prisma.blockedEntity.upsert({
      where: { type_value: { type: 'DEVICE', value: device } },
      create: {
        type: 'DEVICE',
        value: device,
        reason: 'Auto-blocked: Too many failed registration attempts',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      update: {
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }
}

async function checkBlocklists(ip: string, device: string, email: string) {
  const emailDomain = email.split('@')[1];
  
  const blocked = await prisma.blockedEntity.findFirst({
    where: {
      OR: [
        { type: 'IP', value: ip },
        { type: 'DEVICE', value: device },
        { type: 'EMAIL', value: email },
        { type: 'EMAIL_DOMAIN', value: emailDomain },
      ],
      AND: {
        OR: [
          { isPermanent: true },
          { expiresAt: { gt: new Date() } },
        ],
      },
    },
  });
  
  if (blocked) {
    const statusMap: Record<string, string> = {
      IP: 'FAILED_BLOCKED_IP',
      DEVICE: 'FAILED_BLOCKED_DEVICE',
      EMAIL: 'FAILED_INVALID_EMAIL',
      EMAIL_DOMAIN: 'FAILED_INVALID_EMAIL',
    };
    return {
      blocked: true,
      status: statusMap[blocked.type] || 'FAILED_BLOCKED_IP',
      message: 'Pendaftaran tidak dapat dilakukan saat ini.',
    };
  }
  
  return { blocked: false };
}

async function isDisposableEmail(domain: string): Promise<boolean> {
  const disposableDomains = [
    'tempmail.com', 'guerrillamail.com', 'mailinator.com',
    'throwaway.email', '10minutemail.com', 'fakeinbox.com',
    'trashmail.com', 'sharklasers.com', 'yopmail.com',
    'temp-mail.org', 'getnada.com', 'mohmal.com',
    // Add more as needed
  ];
  
  return disposableDomains.includes(domain.toLowerCase());
}

async function validateTenantRegistration(slug: string, email: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
  });
  
  if (!tenant) {
    return { allowed: false, message: 'Tenant tidak ditemukan.' };
  }
  
  const settings = tenant.securitySettings as any;
  
  switch (settings?.registrationMode) {
    case 'DISABLED':
      return { allowed: false, message: 'Pendaftaran ditutup.' };
      
    case 'INVITE_ONLY':
      const hasInvite = await prisma.invitation.findFirst({
        where: {
          tenantId: tenant.id,
          email,
          usedAt: null,
          expiresAt: { gt: new Date() },
        },
      });
      if (!hasInvite) {
        return { allowed: false, message: 'Anda memerlukan undangan untuk mendaftar.' };
      }
      break;
      
    case 'DOMAIN_RESTRICTED':
      const emailDomain = email.split('@')[1].toLowerCase();
      const allowedDomains = settings.allowedEmailDomains || [];
      if (!allowedDomains.some((d: string) => emailDomain === d.toLowerCase())) {
        return { allowed: false, message: 'Domain email tidak diizinkan.' };
      }
      break;
  }
  
  // Check user limit
  const userCount = await prisma.user.count({
    where: { tenantId: tenant.id, status: { in: ['ACTIVE', 'PENDING_APPROVAL'] } },
  });
  
  if (userCount >= tenant.maxUsers) {
    return { allowed: false, message: 'Batas pengguna tercapai.' };
  }
  
  return { allowed: true, tenantId: tenant.id };
}
```

---

## 11. Monitoring & Alerting

### 11.1 Security Dashboard

```typescript
// Admin security monitoring queries

export async function getSecurityStats(timeRange: '24h' | '7d' | '30d') {
  const startDate = getStartDate(timeRange);
  
  const [
    totalAttempts,
    successfulRegistrations,
    failedAttempts,
    blockedEntities,
    suspiciousEvents,
  ] = await Promise.all([
    prisma.registrationAttempt.count({
      where: { createdAt: { gte: startDate } },
    }),
    prisma.registrationAttempt.count({
      where: { createdAt: { gte: startDate }, status: 'SUCCESS' },
    }),
    prisma.registrationAttempt.count({
      where: { 
        createdAt: { gte: startDate }, 
        status: { startsWith: 'FAILED' },
      },
    }),
    prisma.blockedEntity.count({
      where: {
        OR: [
          { isPermanent: true },
          { expiresAt: { gt: new Date() } },
        ],
      },
    }),
    prisma.securityEvent.count({
      where: {
        createdAt: { gte: startDate },
        type: 'SUSPICIOUS_ACTIVITY',
      },
    }),
  ]);
  
  return {
    totalAttempts,
    successfulRegistrations,
    failedAttempts,
    successRate: totalAttempts > 0 
      ? (successfulRegistrations / totalAttempts * 100).toFixed(1) 
      : 0,
    blockedEntities,
    suspiciousEvents,
  };
}

export async function getRecentSecurityEvents(limit: number = 50) {
  return prisma.securityEvent.findMany({
    where: {
      severity: { in: ['HIGH', 'CRITICAL'] },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: { select: { id: true, email: true, name: true } },
    },
  });
}

export async function getTopBlockedIPs(limit: number = 20) {
  const attempts = await prisma.registrationAttempt.groupBy({
    by: ['ip'],
    where: {
      status: { startsWith: 'FAILED' },
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
    _count: true,
    orderBy: { _count: { ip: 'desc' } },
    take: limit,
  });
  
  return attempts.map(a => ({
    ip: a.ip,
    failedAttempts: a._count,
  }));
}
```

### 11.2 Alerting Rules

```typescript
// lib/services/security-alerts.service.ts

interface AlertRule {
  name: string;
  condition: () => Promise<boolean>;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
}

const alertRules: AlertRule[] = [
  {
    name: 'high_failure_rate',
    condition: async () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const [total, failed] = await Promise.all([
        prisma.registrationAttempt.count({
          where: { createdAt: { gte: oneHourAgo } },
        }),
        prisma.registrationAttempt.count({
          where: { 
            createdAt: { gte: oneHourAgo },
            status: { startsWith: 'FAILED' },
          },
        }),
      ]);
      return total > 100 && (failed / total) > 0.8;
    },
    severity: 'HIGH',
    message: 'High registration failure rate detected (>80%)',
  },
  {
    name: 'mass_registration_attempt',
    condition: async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const count = await prisma.registrationAttempt.count({
        where: { createdAt: { gte: fiveMinutesAgo } },
      });
      return count > 50;
    },
    severity: 'CRITICAL',
    message: 'Mass registration attempt detected (>50 in 5 minutes)',
  },
  {
    name: 'api_abuse',
    condition: async () => {
      // Check for unusual AI API usage
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const heavyUsers = await prisma.chatMessage.groupBy({
        by: ['sessionId'],
        where: { createdAt: { gte: oneHourAgo } },
        _count: true,
        having: { sessionId: { _count: { gt: 100 } } },
      });
      return heavyUsers.length > 0;
    },
    severity: 'HIGH',
    message: 'Potential API abuse detected',
  },
];

export async function runSecurityChecks() {
  for (const rule of alertRules) {
    try {
      const triggered = await rule.condition();
      if (triggered) {
        await sendSecurityAlert(rule);
      }
    } catch (error) {
      console.error(`Security check failed: ${rule.name}`, error);
    }
  }
}

async function sendSecurityAlert(rule: AlertRule) {
  // Log to database
  await prisma.securityEvent.create({
    data: {
      type: 'SUSPICIOUS_ACTIVITY',
      severity: rule.severity,
      details: { rule: rule.name, message: rule.message },
    },
  });
  
  // Send notification (email, Slack, etc.)
  if (rule.severity === 'CRITICAL' || rule.severity === 'HIGH') {
    await sendAlertNotification(rule);
  }
}
```

---

## 12. Incident Response

### 12.1 Response Procedures

```yaml
# Incident Response Procedures

mass_registration_attack:
  detection:
    - >50 registrations in 5 minutes
    - >80% failure rate
    - Multiple IPs with same device fingerprint
  response:
    immediate:
      - Enable stricter rate limits
      - Block suspicious IP ranges
      - Enable manual approval mode
    investigation:
      - Analyze attack patterns
      - Identify source (bots, scripts, etc.)
      - Check for data exfiltration
    recovery:
      - Clean fake accounts
      - Update blocklists
      - Improve detection rules
      
api_abuse:
  detection:
    - Unusual AI API usage patterns
    - Single user >100 requests/hour
    - Scraping patterns detected
  response:
    immediate:
      - Rate limit specific user/tenant
      - Temporarily suspend suspicious accounts
    investigation:
      - Analyze usage patterns
      - Check for automated access
      - Review API key usage
    recovery:
      - Adjust rate limits
      - Update terms of service
      - Consider CAPTCHA for heavy usage
      
data_breach:
  detection:
    - Unusual database queries
    - Mass data export attempts
    - Unauthorized access detected
  response:
    immediate:
      - Isolate affected systems
      - Revoke compromised credentials
      - Enable maintenance mode if needed
    investigation:
      - Full security audit
      - Identify breach scope
      - Preserve evidence
    recovery:
      - Notify affected users
      - Reset all passwords
      - Implement additional security measures
      - Report to authorities if required
```

### 12.2 Emergency Actions

```typescript
// lib/services/emergency.service.ts

export async function enableEmergencyMode(reason: string) {
  // Disable all registrations
  await prisma.systemConfig.upsert({
    where: { key: 'registration_enabled' },
    create: { key: 'registration_enabled', value: 'false' },
    update: { value: 'false' },
  });
  
  // Enable strict rate limiting
  await prisma.systemConfig.upsert({
    where: { key: 'strict_mode' },
    create: { key: 'strict_mode', value: 'true' },
    update: { value: 'true' },
  });
  
  // Log emergency activation
  await prisma.securityEvent.create({
    data: {
      type: 'SUSPICIOUS_ACTIVITY',
      severity: 'CRITICAL',
      details: { 
        action: 'emergency_mode_enabled',
        reason,
      },
    },
  });
  
  // Notify admins
  await notifyAdmins('EMERGENCY MODE ENABLED', reason);
}

export async function disableEmergencyMode() {
  await prisma.systemConfig.updateMany({
    where: { key: { in: ['registration_enabled', 'strict_mode'] } },
    data: { value: 'true' },
  });
  
  await prisma.securityEvent.create({
    data: {
      type: 'SUSPICIOUS_ACTIVITY',
      severity: 'LOW',
      details: { action: 'emergency_mode_disabled' },
    },
  });
}

export async function massBlockIPs(ips: string[], reason: string, durationHours: number = 24) {
  const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);
  
  await prisma.blockedEntity.createMany({
    data: ips.map(ip => ({
      type: 'IP' as const,
      value: ip,
      reason,
      expiresAt,
    })),
    skipDuplicates: true,
  });
}

export async function purgeUnverifiedAccounts(olderThanHours: number = 48) {
  const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
  
  const deleted = await prisma.user.deleteMany({
    where: {
      status: 'PENDING_VERIFICATION',
      createdAt: { lt: cutoff },
    },
  });
  
  return deleted.count;
}
```

---

## 📎 Related Documents

- [Main Requirements](./REQUIREMENTS.md)
- [Backend Requirements](./BACKEND-REQUIREMENTS.md)
- [Frontend Requirements](./FRONTEND-REQUIREMENTS.md)

---

## 📝 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial security requirements |

---

> **"Dan janganlah kamu membuat kerusakan di muka bumi sesudah Allah memperbaikinya." (QS. Al-A'raf: 56)**
>
> Keamanan platform adalah amanah untuk menjaga integritas ilmu Islam yang disampaikan.
