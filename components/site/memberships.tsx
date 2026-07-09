"use client"

import { useRef } from "react"
import { Check } from "lucide-react"
import { memberships } from "@/lib/content"
import { SectionHeading } from "./section-heading"

function TiltCard({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  function move(e: React.MouseEvent) {
    const el = ref.current
    if (!el || window.matchMedia("(pointer: coarse)").matches) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"
  }
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`reveal group relative flex flex-col rounded-2xl border p-7 transition-[transform,box-shadow] duration-300 ${
        featured
          ? "border-gold/50 bg-forest-900 text-cream shadow-2xl"
          : "border-forest-900/15 bg-white/60 text-forest-900"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}

export function Memberships() {
  return (
    <section id="memberships" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={memberships.eyebrow}
          title={memberships.title}
          intro={memberships.intro}
          variant="onCream"
          align="center"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {memberships.tiers.map((t) => (
            <TiltCard key={t.name} featured={t.featured}>
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-ink">
                  Most Popular
                </span>
              )}
              <span className={`text-[11px] uppercase tracking-[0.24em] ${t.featured ? "text-gold-soft" : "text-forest-800/50"}`}>
                {t.for}
              </span>
              <h3 className={`mt-2 font-display text-2xl uppercase tracking-wide ${t.featured ? "text-cream" : "text-forest-900"}`}>
                {t.name}
              </h3>

              <div className={`mt-4 flex items-baseline gap-2 border-b pb-5 ${t.featured ? "border-cream/15" : "border-forest-900/10"}`}>
                <span className={`font-display text-3xl ${t.featured ? "text-gold-soft" : "text-forest-900"}`}>
                  {memberships.priceTBD}
                </span>
              </div>

              <p className={`mt-4 text-sm leading-relaxed ${t.featured ? "text-cream/75" : "text-forest-800/70"}`}>{t.blurb}</p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-gold" : "text-forest-600"}`} strokeWidth={2.5} />
                    <span className={t.featured ? "text-cream/85" : "text-forest-800/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#founding"
                className={`mt-7 inline-flex justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.16em] transition ${
                  t.featured ? "btn-gold" : "btn-ghost border-forest-900/30 text-forest-900 hover:bg-forest-900 hover:text-cream"
                }`}
              >
                Reserve My Spot
              </a>
            </TiltCard>
          ))}
        </div>
        <p className="reveal mt-8 text-center text-xs text-forest-800/50">
          Founding rates announced August 1. Reserve now to lock your first month.
        </p>
      </div>
    </section>
  )
}
