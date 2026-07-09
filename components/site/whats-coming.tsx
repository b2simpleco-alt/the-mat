"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { whatsComing } from "@/lib/content"

export function WhatsComing() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!
      const distance = t.scrollWidth - window.innerWidth + 96
      const tween = gsap.to(t, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => tween.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="coming" ref={wrap} className="relative overflow-hidden bg-forest-900 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">{whatsComing.eyebrow}</span>
        </div>
        <h2 className="max-w-2xl display-caps text-4xl text-cream sm:text-5xl lg:text-6xl">
          {whatsComing.title.split("\n").map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </h2>
        <p className="mt-5 max-w-xl text-sage">{whatsComing.intro}</p>
      </div>

      {/* Track: horizontal on desktop (pinned), swipe on mobile */}
      <div className="mt-14 overflow-x-auto px-5 sm:px-8 lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div ref={track} className="mx-auto flex w-max max-w-7xl gap-5 lg:mx-0 lg:pl-[max(2rem,calc((100vw-80rem)/2))]">
          {whatsComing.cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative flex h-64 w-72 shrink-0 flex-col justify-between rounded-2xl border border-cream/10 bg-forest-950/60 p-7 transition hover:border-gold/40 hover:bg-forest-950"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-soft">
                  Coming at launch
                </span>
                <ArrowUpRight className="h-5 w-5 text-cream/40 transition group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-cream">{c.title}</h3>
                <p className="mt-2 text-sm text-sage">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
