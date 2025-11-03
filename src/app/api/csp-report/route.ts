import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));
    // Best-effort log; avoid throwing on stringify failures
    try {
      console.warn("CSP violation:", JSON.stringify(body));
    } catch {
      console.warn("CSP violation (unserializable)");
    }
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}


