import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // Legacy clickjacking defense complements CSP frame-ancestors
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Content-Security-Policy", "frame-ancestors 'self';");
  // Strengthen resource isolation (safe default)
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // Baseline CSP in Report-Only to monitor before enforcing
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    // Allow scripts from self; inline allowed for now (monitor then replace with nonces)
    "script-src 'self' 'unsafe-inline' blob: https:",
    // Styles may be inline due to frameworks
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "font-src 'self' https: data:",
    "connect-src 'self' https:",
  ].join("; ");
  res.headers.set("Content-Security-Policy-Report-Only", csp);

  // Enable HSTS only when behind HTTPS
  if (req.headers.get("x-forwarded-proto") === "https") {
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  return res;
}

export const config = {
  // Exclude Next.js internals and static files
  matcher: ["/((?!_next|.*\\..*).*)"],
};


