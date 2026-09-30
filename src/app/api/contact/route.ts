import { NextResponse } from "next/server";
import { CONTACT, SITE } from "@/data/content";
import { buildContactEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_AREAS = new Set<string>(CONTACT.areas);

// Límite básico por IP (por instancia; suficiente contra envíos repetidos).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { n: number; t: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > MAX_HITS;
}

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return fail(429, "rate_limited");

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "invalid_json");
  }

  // Señuelo: si viene lleno es un bot. Se responde "ok" sin enviar nada.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const areas = Array.isArray(body.areas)
    ? body.areas.filter((a): a is string => typeof a === "string" && ALLOWED_AREAS.has(a))
    : [];

  if (
    name.length < 2 ||
    name.length > 120 ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return fail(422, "invalid_fields");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  if (!apiKey || !from) {
    console.error("[contact] Faltan RESEND_API_KEY o CONTACT_FROM_EMAIL");
    return fail(503, "not_configured");
  }

  const { subject, html, text } = buildContactEmail({ name, email, message, areas });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, html, text }),
    });
    if (!res.ok) {
      console.error("[contact] Resend respondió", res.status, await res.text().catch(() => ""));
      return fail(502, "send_failed");
    }
  } catch (err) {
    console.error("[contact] Error de red con Resend", err);
    return fail(502, "send_failed");
  }

  return NextResponse.json({ ok: true });
}
