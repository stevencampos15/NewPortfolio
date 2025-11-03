import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Generate a per-request nonce and pass it through to the app via a request header
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...Array.from(bytes)));
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-csp-nonce", nonce);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // Legacy clickjacking defense complements CSP frame-ancestors
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Content-Security-Policy", "frame-ancestors 'self';");
  // Strengthen resource isolation (safe default)
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // Enforce CSP with nonce; keep 'unsafe-inline' transitional to avoid breakage.
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    // Permit app scripts and Turnstile. Keep 'unsafe-inline' transitional; nonce applied to our dynamic scripts.
    `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' blob: https://challenges.cloudflare.com`,
    // Allow Turnstile frames explicitly
    "frame-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com",
    // Styles
    "style-src 'self' 'unsafe-inline'",
    // Assets
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "font-src 'self' https: data:",
    // Network
    "connect-src 'self' https:",
    // Form action (contact form posts to self)
    "form-action 'self'",
    // Report endpoint for violations
    "report-uri /api/csp-report",
  ].join("; ");
  res.headers.set("Content-Security-Policy", csp);

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


