import Image from "next/image"
import { finalCta } from "@/lib/content"
import { EmailCapture } from "./email-capture"
import { SpotsRemaining } from "./spots"
import { Wordmark } from "./wordmark"

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-28 sm:py-36">
      <Image src="/openart/hero-b.jpg" alt="" fill sizes="100vw" className="pointer-events-none absolute inset-0 object-cover opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/85 to-forest-950" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="reveal eyebrow">{finalCta.eyebrow}</p>
        <h2 className="reveal mt-5 display-caps text-5xl text-cream sm:text-6xl lg:text-7xl">
          {finalCta.title.split("\n").map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-base text-cream/80 sm:text-lg">{finalCta.sub}</p>

        <div className="reveal mx-auto mt-9 max-w-xl">
          <EmailCapture source="final" cta={finalCta.cta} variant="onDark" />
        </div>
        <div className="reveal mt-10 flex justify-center">
          <SpotsRemaining variant="onDark" />
        </div>

        <div className="reveal mt-14 flex justify-center opacity-80">
          <Wordmark tone="cream" className="h-12 w-auto" />
        </div>
      </div>
    </section>
  )
}
