import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

/**
 * Founding-member + lead capture endpoint.
 *
 * Every submission (hero / founding / events / final / journal / stubs) hits here.
 * It (1) saves the lead locally in dev, and (2) emails the lead to the business
 * inbox so nothing is missed.
 *
 * SETUP for production (in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  — from resend.com (free tier fine). Required to send lead emails.
 *   LEAD_EMAIL      — where leads go. Defaults to inquire@golfatthemat.com.
 *   FROM_EMAIL      — verified sender, e.g. "The Mat <leads@thematgolf.com>".
 *                     (Verify the sending domain in Resend first.)
 *   ESP_API_KEY     — optional: also add the email to a Klaviyo/Mailchimp list
 *                     for the marketing sequence (see addToEspList()).
 *
 * Until RESEND_API_KEY is set the site still works — leads are saved to
 * data/signups.json in dev; add the key before driving real traffic.
 */

const DATA_FILE = path.join(process.cwd(), "data", "signups.json")
const LEAD_EMAIL = process.env.LEAD_EMAIL || "inquire@golfatthemat.com"
const FROM_EMAIL = process.env.FROM_EMAIL || "The Mat <leads@thematgolf.com>"

type Signup = { email: string; phone?: string; source?: string; ts: string; ua?: string }

const esc = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

async function readAll(): Promise<Signup[]> {
  try {
    return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as Signup[]
  } catch {
    return []
  }
}

/** Email the lead to the business inbox via Resend. No-op until RESEND_API_KEY is set. */
async function notifyLead(s: Signup) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  const html = `
    <h2 style="font-family:sans-serif">New lead — The Mat</h2>
    <table style="font-family:sans-serif;font-size:14px">
      <tr><td><strong>Email</strong></td><td>${esc(s.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${esc(s.phone) || "—"}</td></tr>
      <tr><td><strong>Source</strong></td><td>${esc(s.source)}</td></tr>
      <tr><td><strong>When</strong></td><td>${esc(s.ts)}</td></tr>
    </table>`
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [LEAD_EMAIL],
        reply_to: s.email,
        subject: `New ${s.source} lead — ${s.email}`,
        html,
      }),
    })
  } catch {
    // best-effort — never block the signup UX on email delivery
  }
}

/** Optional: add the lead to a marketing list (Klaviyo/Mailchimp). No-op until configured. */
async function addToEspList(_s: Signup) {
  const key = process.env.ESP_API_KEY
  if (!key) return
  // TODO(launch): POST to your ESP's subscribe endpoint here.
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const email = String(body.email ?? "").trim().toLowerCase()
    const phone = String(body.phone ?? "").trim()
    const source = String(body.source ?? "unknown").slice(0, 40)

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 })
    }

    const signup: Signup = {
      email,
      phone: phone || undefined,
      source,
      ts: new Date().toISOString(),
      ua: req.headers.get("user-agent") ?? undefined,
    }

    // Best-effort local persistence (works in dev; serverless FS is read-only).
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
      const all = await readAll()
      if (!all.some((s) => s.email === email)) all.push(signup)
      await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2))
    } catch {
      // ignore — email notification is the source of truth in production
    }

    await Promise.allSettled([notifyLead(signup), addToEspList(signup)])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
