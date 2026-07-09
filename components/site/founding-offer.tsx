import Image from "next/image"
import { Check } from "lucide-react"
import { founding, config } from "@/lib/content"
import { SectionHeading } from "./section-heading"
import { EmailCapture } from "./email-capture"
import { Countdown } from "./countdown"
import { FoundingCard } from "./founding-card"

export function FoundingOffer() {
  return (
    <section id="founding" className="relative overflow-hidden bg-forest-950 py-24 sm:py-32">
      {/* ambient haze */}
      <Image
        src="/openart/haze.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/70 to-forest-950" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — the pitch */}
          <div>
            <SectionHeading eyebrow={founding.eyebrow} title={founding.title} variant="onDark" />
            <p className="reveal mt-5 max-w-lg text-base leading-relaxed text-sage">{founding.lede}</p>
            <ul className="mt-8 space-y-3.5">
              {founding.perks.map((perk) => (
                <li key={perk} className="reveal flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-snug text-cream/90">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — the card + capture */}
          <div className="reveal">
            <div className="glass-gold rounded-3xl p-6 sm:p-8">
              <div className="mb-7">
                <FoundingCard number="001" />
              </div>

              <p className="mb-1.5 text-[11px] uppercase tracking-[0.24em] text-gold-soft">
                {config.announceLabel} in
              </p>
              <div className="mb-6">
                <Countdown variant="onDark" />
              </div>

              <EmailCapture source="founding" cta={founding.cta} note={founding.reassure} variant="onDark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
