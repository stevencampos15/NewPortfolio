import { NextRequest } from "next/server";
import dns from "node:dns/promises";
import { extractDomainFromEmail, isDisposableDomain, isEmailSyntaxValid } from "@/lib/emailValidation";
import { checkCombinedLimits, getClientIdentifier } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Rate limit to protect DNS resolution from abuse
    const id = getClientIdentifier(req);
    const { allowed, headers } = await checkCombinedLimits(id);
    if (!allowed) {
      return Response.json({ ok: false, reason: "rate_limited" }, { status: 429, headers });
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim();
    if (!email) {
      return Response.json({ ok: false, reason: "missing" }, { status: 400 });
    }

    const syntaxValid = isEmailSyntaxValid(email);
    if (!syntaxValid) {
      return Response.json({ ok: false, syntaxValid, disposable: false, mxFound: false, reason: "syntax" }, { status: 200 });
    }

    const domain = extractDomainFromEmail(email);
    const disposable = isDisposableDomain(domain);

    let mxFound = false;
    if (domain) {
      try {
        const mx = await dns.resolveMx(domain);
        mxFound = Array.isArray(mx) && mx.length > 0;
        if (!mxFound) {
          // fallback: some domains accept mail on A record
          const a = await dns.resolve(domain);
          mxFound = Array.isArray(a) && a.length > 0;
        }
      } catch {
        mxFound = false;
      }
    }

    const ok = syntaxValid && mxFound && !disposable;
    // include rate-limit headers on success too
    return new Response(JSON.stringify({ ok, syntaxValid, disposable, mxFound }), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    return Response.json({ ok: false, reason: "error", message: err?.message ?? "unexpected" }, { status: 500 });
  }
}


