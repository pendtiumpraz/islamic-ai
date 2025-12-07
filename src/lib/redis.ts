import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Redis client
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Rate limiters per tier
export const rateLimiters = {
  // Chat rate limits (per day)
  chat: {
    FREE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 d"), // 10 per day
      analytics: true,
      prefix: "ratelimit:chat:free",
    }),
    BRONZE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 d"),
      analytics: true,
      prefix: "ratelimit:chat:bronze",
    }),
    SILVER: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 d"),
      analytics: true,
      prefix: "ratelimit:chat:silver",
    }),
    GOLD: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1000, "1 d"), // effectively unlimited
      analytics: true,
      prefix: "ratelimit:chat:gold",
    }),
    PATRON: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1000, "1 d"),
      analytics: true,
      prefix: "ratelimit:chat:patron",
    }),
  },
  // Hafalan rate limits (per day)
  hafalan: {
    FREE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 d"),
      analytics: true,
      prefix: "ratelimit:hafalan:free",
    }),
    BRONZE: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(15, "1 d"),
      analytics: true,
      prefix: "ratelimit:hafalan:bronze",
    }),
    SILVER: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, "1 d"),
      analytics: true,
      prefix: "ratelimit:hafalan:silver",
    }),
    GOLD: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1000, "1 d"),
      analytics: true,
      prefix: "ratelimit:hafalan:gold",
    }),
    PATRON: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(1000, "1 d"),
      analytics: true,
      prefix: "ratelimit:hafalan:patron",
    }),
  },
};

// Helper to check rate limit
export async function checkRateLimit(
  type: "chat" | "hafalan",
  tier: keyof typeof rateLimiters.chat,
  identifier: string
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const limiter = rateLimiters[type][tier];
  const result = await limiter.limit(identifier);
  
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

// Cache helpers
export async function cacheGet<T>(key: string): Promise<T | null> {
  return redis.get<T>(key);
}

export async function cacheSet(
  key: string,
  value: unknown,
  expirationSeconds?: number
): Promise<void> {
  if (expirationSeconds) {
    await redis.set(key, value, { ex: expirationSeconds });
  } else {
    await redis.set(key, value);
  }
}

export async function cacheDelete(key: string): Promise<void> {
  await redis.del(key);
}
