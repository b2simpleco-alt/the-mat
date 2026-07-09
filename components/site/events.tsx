import Image from "next/image"
import { Gift, ArrowRight } from "lucide-react"
import { events } from "@/lib/content"
import { EmailCapture } from "./email-capture"

export function Events() {
  return (
    <section id="events" className="aurora relative overflow-hidden bg-forest-950 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — the pitch + ladder */}
          <div>
            <div className="reveal mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">{events.eyebrow}</span>
            </div>
            <h2 className="reveal display-caps text-4xl text-cream sm:text-5xl lg:text-6xl">
              {events.title.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="reveal mt-5 max-w-lg text-base leading-relaxed text-sage">{events.intro}</p>

            <div className="mt-9 space-y-3">
              {events.ladder.map((s) => (
                <div key={s.step} className="reveal glass flex items-start gap-4 rounded-2xl p-4">
                  <span className="font-display text-xl text-gold-soft">{s.step}</span>
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-wide text-cream">{s.title}</h3>
                    <p className="mt-1 text-sm text-sage">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — free hook + types + capture */}
          <div className="reveal">
            <div className="glass-gold overflow-hidden rounded-3xl">
              <div className="editorial relative h-40 sm:h-48">
                <Image src="/openart/tile-friends-1.jpg" alt="A night at The Mat" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-gold-soft">
                  <Gift className="h-5 w-5" />
                  <span className="text-sm uppercase tracking-[0.18em]">First session free</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {events.types.map((t) => (
                    <span key={t} className="rounded-full border border-cream/15 px-3 py-1.5 text-xs text-cream/80">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7 border-t border-cream/10 pt-6">
                  <EmailCapture source="events" cta={events.cta} note={events.note} variant="onDark" />
                </div>
              </div>
            </div>
            <p className="reveal mt-4 flex items-center gap-2 text-xs text-sage">
              <ArrowRight className="h-3.5 w-3.5 text-gold" />
              Groups convert to members — that&apos;s why the first one&apos;s on us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
