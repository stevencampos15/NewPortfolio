import { NextRequest } from "next/server";
import { getOpenAIClient } from "@/lib/openai";
import { embedText } from "@/lib/embeddings";
import { getPineconeNamespace, type RetrievalMatch } from "@/lib/pinecone";

export const runtime = "nodejs";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const MIN_SCORE = 0.6;
const TOP_K = 12;

const buildSystemPrompt = (sources: RetrievalMatch[]): string => {
  const citations = sources
    .map((m, i) => {
      const src = (m.metadata as any)?.source ?? `doc-${i + 1}`;
      const heading = (m.metadata as any)?.heading ? ` – ${(m.metadata as any).heading}` : "";
      return `- ${src}${heading}`;
    })
    .join("\n");

  return [
    "You are a concise, accurate assistant for Steven Campos' portfolio website.",
    "Answer questions about Steven's career, projects, certifications, and this website using the provided context only.",
    "If information is missing or unclear, ask a brief clarifying question rather than guessing.",
    "Where useful, reference the source filenames in parentheses.",
    citations ? `\nAvailable sources:\n${citations}` : "",
  ]
    .filter(Boolean)
    .join("\n");
};

const buildContext = (sources: RetrievalMatch[]): string => {
  const lines: string[] = [];
  for (const m of sources) {
    const meta = (m.metadata as any) ?? {};
    const src = meta.source ?? "unknown";
    const heading = meta.heading ? `\n# ${meta.heading}` : "";
    const text = meta.text ?? "";
    lines.push(`\n[Source: ${src}]${heading}\n${text}`);
  }
  return lines.join("\n\n");
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = (body?.messages as ChatMessage[] | undefined) ?? [];
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const userText = lastUser?.content?.trim() ?? "";
    if (!userText) {
      return new Response("Missing user message.", { status: 400 });
    }

    const queryVec = await embedText(userText);
    if (!queryVec.length) {
      return new Response("Embedding failed.", { status: 500 });
    }

    const ns = getPineconeNamespace();
    const result = await ns.query({
      vector: queryVec,
      topK: TOP_K,
      includeMetadata: true,
    });

    const matches = (result.matches ?? []) as RetrievalMatch[];
    const strong = matches.filter((m) => (m.score ?? 0) >= MIN_SCORE);
    // Fallback: if nothing crosses threshold, take the best few results
    const selected = strong.length > 0 ? strong : matches.slice(0, Math.min(5, matches.length));

    const context = buildContext(selected);
    const systemPrompt = buildSystemPrompt(selected);

    const ragIntro = context
      ? `Use ONLY the following context to answer. If insufficient, ask a brief clarifying question.\n\n${context}`
      : `No context available. Ask a brief clarifying question to better understand what the user needs.`;

    const trimmedHistory = messages.slice(-10).filter((m) => m.role !== "system");
    const finalMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "system", content: ragIntro },
      ...trimmedHistory,
    ];

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.2,
      messages: finalMessages,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const part of completion) {
            const token = part.choices?.[0]?.delta?.content ?? "";
            if (token) controller.enqueue(encoder.encode(token));
          }
        } catch (err) {
          controller.error(err);
          return;
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    const message = err?.message ?? "Unexpected error";
    return new Response(message, { status: 500 });
  }
}


