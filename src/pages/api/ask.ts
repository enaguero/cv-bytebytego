import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";
import { asAssistantContext, profile } from "~/data/cv";

export const prerender = false;

// Simple in-memory rate limit. Resets when the serverless instance recycles —
// good enough for a CV demo, not for real production. Teach this.
const callsToday = new Map<string, { count: number; resetAt: number }>();
const DAILY_LIMIT = Number(import.meta.env.ASK_DAILY_LIMIT ?? 100);

function ipKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() ?? "anon";
  return ip;
}

function checkRate(key: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = callsToday.get(key);
  if (!entry || entry.resetAt < now) {
    callsToday.set(key, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return { ok: true, remaining: DAILY_LIMIT - 1 };
  }
  if (entry.count >= DAILY_LIMIT) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: DAILY_LIMIT - entry.count };
}

const SYSTEM_PROMPT = `You are a concise assistant grounded in ${profile.name}'s CV below. Answer questions about his background, teaching experience, and the tracks he wants to teach at ByteByteGo.

Rules:
- Only use facts from the CV. If asked something not covered, say so honestly and suggest what IS covered.
- Keep answers under 120 words unless asked for detail.
- Be direct, no fluff, no marketing-speak.
- If asked something off-topic (not about Erwin or ByteByteGo's tracks), gently redirect.

CV:
---
${asAssistantContext()}
---`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Missing ANTHROPIC_API_KEY. Set it in Vercel env vars (see README).",
      },
      { status: 503 },
    );
  }

  const rate = checkRate(ipKey(request));
  if (!rate.ok) {
    return Response.json(
      { error: "Daily limit reached for this demo. Try again tomorrow." },
      { status: 429 },
    );
  }

  let body: { messages?: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length < 2000,
  );

  if (messages.length === 0 || messages[messages.length - 1]!.role !== "user") {
    return Response.json(
      { error: "Need at least one user message." },
      { status: 400 },
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const completion = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    const reply = completion.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("\n")
      .trim();

    return Response.json({
      reply: reply || "(no reply)",
      remaining: rate.remaining,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error from Claude.";
    return Response.json(
      { error: `Claude API error: ${message}` },
      { status: 502 },
    );
  }
};
