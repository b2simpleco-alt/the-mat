"use client"

import { useState } from "react"
import { Check, Loader2, ArrowRight } from "lucide-react"
import { Magnetic } from "./magnetic"

type Variant = "onDark" | "onCream"

export function EmailCapture({
  source,
  cta = "Claim My Founding Spot",
  note,
  variant = "onDark",
  compact = false,
}: {
  source: string
  cta?: string
  note?: string
  variant?: Variant
  compact?: boolean
}) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [showPhone, setShowPhone] = useState(false)
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")

  const onCream = variant === "onCream"

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState("error")
      return
    }
    setState("loading")
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, source }),
      })
      if (!res.ok) throw new Error("bad")
      setState("done")
    } catch {
      // Still celebrate — capture is best-effort in pre-launch.
      setState("done")
    }
  }

  if (state === "done") {
    return (
      <div
        className={`flex items-start gap-3 rounded-2xl border px-5 py-4 ${
          onCream ? "border-forest-800/30 bg-forest-900/5 text-forest-900" : "border-gold/40 bg-forest-950/60 text-cream"
        }`}
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <div>
          <p className="font-display text-lg tracking-wide">You&apos;re in.</p>
          <p className={`text-sm ${onCream ? "text-forest-800/70" : "text-sage"}`}>
            Founding spot held. Watch your inbox — the founding rate drops August 1.
          </p>
        </div>
      </div>
    )
  }

  const fieldBase =
    "w-full rounded-full px-5 py-3.5 text-[15px] outline-none transition placeholder:opacity-60 focus:ring-2"
  const fieldStyle = onCream
    ? "bg-white/70 text-forest-900 placeholder:text-forest-800/50 ring-forest-700/30 focus:ring-forest-600 border border-forest-800/15"
    : "bg-cream/[0.07] text-cream placeholder:text-cream/50 ring-gold/30 focus:ring-gold border border-cream/15"

  return (
    <form onSubmit={submit} className="w-full">
      <div className={`flex flex-col gap-3 ${compact ? "" : "sm:flex-row"}`}>
        <div className="flex-1">
          <input
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === "error") setState("idle")
            }}
            className={`${fieldBase} ${fieldStyle}`}
            aria-label="Email address"
          />
        </div>
        <Magnetic strength={0.25}>
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn-gold inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 sm:w-auto"
          >
            {state === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {cta}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </Magnetic>
      </div>

      {showPhone ? (
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Phone (optional — for opening-day text)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${fieldBase} ${fieldStyle} mt-3`}
          aria-label="Phone number (optional)"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowPhone(true)}
          className={`mt-2.5 text-xs underline-offset-4 hover:underline ${onCream ? "text-forest-800/60" : "text-sage"}`}
        >
          + Add phone for opening-day text (optional)
        </button>
      )}

      {state === "error" && (
        <p className="mt-2 text-xs text-gold-soft">Please enter a valid email address.</p>
      )}
      {note && state !== "error" && (
        <p className={`mt-2.5 text-xs ${onCream ? "text-forest-800/60" : "text-sage"}`}>{note}</p>
      )}
    </form>
  )
}
