import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

/**
 * Founding-member capture endpoint.
 * Pre-launch: appends signups to a local JSON file (data/signups.json).
 *
 * TODO(launch): forward to an ESP instead of / in addition to local storage.
 *   Set ESP_API_KEY (+ ESP_LIST_ID) in env and POST to Klaviyo / Mailchimp / Base44.
 *   Example wiring is stubbed in `forwardToEsp()` below.
 */

const DATA_FILE = path.join(process.cwd(), "data", "signups.json")

type Signup = { email: string; phone?: string; source?: string; ts: string; ua?: string }

async function readAll(): Promise<Signup[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8")
    return JSON.parse(raw) as Signup[]
  } catch {
    return []
  }
}

async function forwardToEsp(_signup: Signup) {
  const key = process.env.ESP_API_KEY
  if (!key) return // not configured yet — pre-launch mode
  // TODO(launch): implement provider call here, e.g.:
  // await fetch("https://a.klaviyo.com/api/...", { headers: { Authorization: `Klaviyo-API-Key ${key}` }, ... })
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

    // Best-effort local persistence (works locally; on Vercel prefer the ESP path).
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
      const all = await readAll()
      if (!all.some((s) => s.email === email)) all.push(signup)
      await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2))
    } catch {
      // Read-only FS (serverless) — rely on ESP forwarding instead.
    }

    await forwardToEsp(signup)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
