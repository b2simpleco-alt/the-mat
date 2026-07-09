"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { faq } from "@/lib/content"
import { SectionHeading } from "./section-heading"

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative bg-cream py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq.schema) }} />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} variant="onCream" align="center" />
        <div className="mt-14 divide-y divide-forest-900/10 border-y border-forest-900/10">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="reveal">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg uppercase tracking-wide text-forest-900">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-[15px] leading-relaxed text-forest-800/75">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
