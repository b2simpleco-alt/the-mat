"use client"

import { useEffect, useState } from "react"
import { CalendarPlus } from "lucide-react"
import { config } from "@/lib/content"

function diff(target: number) {
  const t = Math.max(0, target - Date.now())
  return {
    d: Math.floor(t / 86400000),
    h: Math.floor((t / 3600000) % 24),
    m: Math.floor((t / 60000) % 60),
    s: Math.floor((t / 1000) % 60),
  }
}

const gcalUrl = (() => {
  const start = new Date(config.announceDate)
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "")
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: "The Mat — Founding Rate Reveal",
    details: "The Mat reveals its founding membership rate. Founders lock it in. thematgolf.com",
    dates: `${fmt(start)}/${fmt(end)}`,
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
})()

export function Countdown({ variant = "onDark" }: { variant?: "onDark" | "onCream" }) {
  const target = new Date(config.announceDate).getTime()
  const [time, setTime] = useState(() => diff(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const onCream = variant === "onCream"
  const units = [
    { v: time.d, l: "Days" },
    { v: time.h, l: "Hrs" },
    { v: time.m, l: "Min" },
    { v: time.s, l: "Sec" },
  ]

  return (
    <div className="flex flex-col items-center gap-3 sm:items-start">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {units.map((u, i) => (
          <div key={u.l} className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`font-display text-3xl tabular-nums sm:text-4xl ${onCream ? "text-forest-900" : "text-cream"}`}
                suppressHydrationWarning
              >
                {mounted ? String(u.v).padStart(2, "0") : "--"}
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] ${onCream ? "text-forest-800/50" : "text-sage"}`}>
                {u.l}
              </span>
            </div>
            {i < units.length - 1 && <span className="mb-4 text-gold/60">:</span>}
          </div>
        ))}
      </div>
      <a
        href={gcalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-xs underline-offset-4 hover:underline ${onCream ? "text-forest-800/70" : "text-gold-soft"}`}
      >
        <CalendarPlus className="h-3.5 w-3.5" />
        Add the Aug 1 reveal to your calendar
      </a>
    </div>
  )
}
