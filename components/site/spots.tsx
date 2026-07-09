"use client"

import { useEffect, useRef, useState } from "react"
import { config } from "@/lib/content"

export function SpotsRemaining({ variant = "onDark" }: { variant?: "onDark" | "onCream" }) {
  const remaining = config.foundingSpots - config.foundingClaimed
  const pct = Math.round((config.foundingClaimed / config.foundingSpots) * 100)
  const [n, setN] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const onCream = variant === "onCream"

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1400
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(eased * remaining))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [remaining])

  return (
    <div ref={ref} className="w-full max-w-xs">
      <div className="flex items-baseline gap-2">
        <span className={`font-display text-4xl tabular-nums ${onCream ? "text-forest-900" : "text-cream"}`}>
          {n}
        </span>
        <span className={`text-sm ${onCream ? "text-forest-800/70" : "text-sage"}`}>
          of {config.foundingSpots} founding spots left
        </span>
      </div>
      <div className={`mt-2 h-1.5 w-full overflow-hidden rounded-full ${onCream ? "bg-forest-900/10" : "bg-cream/10"}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
