import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Initialize Redis client from environment
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Define two sliding window limiters
const perMinute = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  prefix: "chat:pm:",
});

const perDay = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(200, "1 d"),
  prefix: "chat:pd:",
});

export const getClientIdentifier = (req: NextRequest): string => {
  // Prefer the first IP in x-forwarded-for; fallback to x-real-ip
  const xff = req.headers.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip;
};

type LimitResult = {
  allowed: boolean;
  headers: Headers;
};

export const checkCombinedLimits = async (id: string): Promise<LimitResult> => {
  const [m, d] = await Promise.all([perMinute.limit(id), perDay.limit(id)]);
  const allowed = m.success && d.success;

  const earliestResetMs = Math.min(m.reset, d.reset);
  const remaining = Math.min(m.remaining, d.remaining);

  const headers = new Headers({
    "X-RateLimit-Limit": "minute=10, day=200",
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.floor(earliestResetMs / 1000)),
  });

  if (!allowed) {
    const retryAfter = Math.max(0, Math.ceil((earliestResetMs - Date.now()) / 1000));
    headers.set("Retry-After", String(retryAfter));
  }

  return { allowed, headers };
};


