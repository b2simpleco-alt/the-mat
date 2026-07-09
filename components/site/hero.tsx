import { hero, config, site } from "@/lib/content"
import { EmailCapture } from "./email-capture"
import { Countdown } from "./countdown"
import { SpotsRemaining } from "./spots"
import { Wordmark } from "./wordmark"

/** Flip to true once /public/openart/hero.mp4 exists (OpenArt loop). */
const HERO_VIDEO = true

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 sm:pt-28"
    >
      {/* Background — editorially graded video */}
      <div className="editorial absolute inset-0 z-0">
        {HERO_VIDEO ? (
          <video
            className="kenburns h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/openart/hero-poster.jpg"
          >
            <source src="/openart/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/openart/hero-a.jpg" alt="" className="kenburns h-full w-full object-cover" />
        )}
      </div>
      {/* scrims + aurora */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-forest-950 via-forest-950/70 to-forest-950/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-forest-950 via-transparent to-forest-950/60" />
      <div className="aurora pointer-events-none absolute inset-0 z-[1] opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-glow" />
              Open 24/7
            </span>
            <span className="chip">Members Only</span>
            <span className="chip">{site.region.split(" · ")[0]} · North GA</span>
          </div>

          <Wordmark tone="cream" priority className="mt-7 h-14 w-auto sm:h-20" />

          <h1 className="mt-6 display-caps text-[3.25rem] leading-[0.92] text-cream sm:text-7xl lg:text-[5.5rem]">
            <span className="block">Open When</span>
            <span className="block">You Are.</span>
            <span className="block text-gold-gradient">24/7.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">{hero.subtitle}</p>

          {/* Glass capture panel */}
          <div className="glass-gold mt-8 max-w-xl rounded-3xl p-5 sm:p-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-gold-soft">{hero.cta}</p>
            <EmailCapture source="hero" cta={hero.cta} note={hero.ctaNote} variant="onDark" />
            <div className="mt-6 flex flex-col gap-6 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-gold-soft">
                  {config.announceLabel} in
                </p>
                <Countdown variant="onDark" />
              </div>
              <div className="hidden h-12 w-px bg-cream/10 sm:block" />
              <SpotsRemaining variant="onDark" />
            </div>
          </div>
        </div>
      </div>

      <div className="cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </div>
    </section>
  )
}
