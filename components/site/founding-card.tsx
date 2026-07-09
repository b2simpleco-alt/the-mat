"use client"

import { useRef } from "react"
import { Flag } from "lucide-react"
import { Wordmark } from "./wordmark"

/** Coded founding-member card — premium, no AI render. Pointer-tracked sheen + tilt. */
export function FoundingCard({ number = "001" }: { number?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  function move(e: React.MouseEvent) {
    const el = ref.current
    if (!el || window.matchMedia("(pointer: coarse)").matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(1000px) rotateX(${(py - 0.5) * -10}deg) rotateY(${(px - 0.5) * 12}deg)`
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="group relative aspect-[1.6/1] w-full rounded-2xl transition-transform duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* metal body */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-gold/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
        style={{
          background:
            "radial-gradient(120% 140% at 15% 10%, #1c4a30 0%, #123322 42%, #0b1f16 100%)",
        }}
      >
        {/* gold hairline frame */}
        <div className="absolute inset-3 rounded-xl border border-gold/25" />

        {/* pointer sheen */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(220px 220px at var(--mx,50%) var(--my,0%), color-mix(in oklab, #dcc188 45%, transparent), transparent 60%)",
            mixBlendMode: "soft-light",
          }}
        />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            mixBlendMode: "overlay",
          }}
        />

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold-soft">Founding Member</span>
            <Flag className="h-4 w-4 text-gold-soft" />
          </div>

          <div className="flex items-center gap-4">
            {/* EMV-style chip */}
            <div
              className="h-9 w-12 shrink-0 rounded-md border border-gold/50"
              style={{ background: "linear-gradient(135deg, #dcc188, #9c7c3c)" }}
            >
              <div className="mx-auto mt-1 h-[3px] w-8 rounded bg-forest-950/30" />
              <div className="mx-auto mt-1.5 h-[3px] w-8 rounded bg-forest-950/30" />
              <div className="mx-auto mt-1.5 h-[3px] w-8 rounded bg-forest-950/30" />
            </div>
            <Wordmark tone="cream" className="h-9 w-auto sm:h-11" />
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-cream/45">Member</p>
              <p className="font-display text-lg tracking-[0.15em] text-cream">Nº {number}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.22em] text-cream/45">Est.</p>
              <p className="font-display text-lg tracking-[0.15em] text-gold-soft">2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
