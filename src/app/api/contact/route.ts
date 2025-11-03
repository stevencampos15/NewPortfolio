import { NextRequest } from "next/server";
import { checkCombinedLimits, getClientIdentifier } from "@/lib/rateLimit";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  turnstileToken?: string;
};

export async function POST(req: NextRequest) {
  try {
    // Rate limit to deter abuse
    const id = getClientIdentifier(req);
    const { allowed, headers } = await checkCombinedLimits(id);
    if (!allowed) {
      return new Response(JSON.stringify({ ok: false, reason: "rate_limited" }), {
        status: 429,
        headers,
      });
    }

    const body = (await req.json().catch(() => ({}))) as Partial<ContactPayload>;
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const turnstileToken = String(body?.turnstileToken ?? "");
    // Verify Cloudflare Turnstile token
    const tsSecret = process.env.TURNSTILE_SECRET_KEY;
    const debug = process.env.TURNSTILE_DEBUG === "true" || process.env.NODE_ENV !== "production";
    if (!tsSecret) {
      return new Response(JSON.stringify({ ok: false, reason: "server_not_configured" }), { status: 500, headers });
    }
    if (!turnstileToken) {
      return new Response(JSON.stringify({ ok: false, reason: "turnstile_missing" }), { status: 400, headers });
    }
    const remoteIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: tsSecret,
        response: turnstileToken,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      } as any),
    });
    const tsJson = (await tsRes.json().catch(() => ({}))) as any;
    if (!tsJson?.success) {
      const body = debug ? { ok: false, reason: "turnstile_invalid", errorCodes: tsJson?.["error-codes"] ?? null } : { ok: false, reason: "turnstile_invalid" };
      return new Response(JSON.stringify(body), { status: 400, headers });
    }


    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, reason: "missing" }), {
        status: 400,
        headers,
      });
    }

    // Basic size limits to keep costs bounded
    if (name.length > 120 || email.length > 320 || message.length > 5000) {
      return new Response(JSON.stringify({ ok: false, reason: "too_large" }), {
        status: 400,
        headers,
      });
    }

    // Server-side EmailJS proxy (no client secrets exposure)
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY; // EmailJS expects this as user_id
    if (!serviceId || !templateId || !publicKey) {
      return new Response(JSON.stringify({ ok: false, reason: "email_service_not_configured" }), {
        status: 500,
        headers,
      });
    }

    const emailPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        reply_to: email,
        message,
        site_name: "Steven Campos Portfolio",
      },
    };

    const origin = req.headers.get("origin") || undefined;
    const ej = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(origin ? { Origin: origin } : {}),
      },
      body: JSON.stringify(emailPayload),
    });

    if (!ej.ok) {
      const debug = process.env.TURNSTILE_DEBUG === "true" || process.env.NODE_ENV !== "production";
      const detail = await ej.text().catch(() => "");
      const body = debug ? { ok: false, reason: "email_failed", detail } : { ok: false, reason: "email_failed" };
      return new Response(JSON.stringify(body), { status: 502, headers });
    }

    const successHeaders = new Headers(headers);
    successHeaders.set("Cache-Control", "no-store");
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: successHeaders });
  } catch {
    return new Response(JSON.stringify({ ok: false, reason: "internal" }), { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}


