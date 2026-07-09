import Image from "next/image"
import { vision } from "@/lib/content"
import { SectionHeading } from "./section-heading"

export function Vision() {
  return (
    <section id="vision" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow={vision.eyebrow} title={vision.title} intro={vision.intro} variant="onCream" />
          </div>

          {/* Offset photo collage */}
          <div className="reveal relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="editorial reveal-clip absolute inset-0 overflow-hidden rounded-lg shadow-2xl">
              <Image src="/openart/room-1.jpg" alt="Inside The Mat" fill sizes="(max-width: 1024px) 100vw, 480px" quality={90} className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden aspect-square w-40 overflow-hidden rounded-lg border-4 border-cream shadow-xl sm:block">
              <Image src="/openart/tile-ball-1.jpg" alt="Impact detail" fill sizes="200px" quality={90} className="object-cover" />
            </div>
            <div className="absolute -right-5 -top-5 rounded-full border border-gold/60 bg-forest-900 px-4 py-3 text-center shadow-lg">
              <span className="font-display text-2xl leading-none text-gold-soft">24/7</span>
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {vision.props.map((p, i) => (
            <div key={p.title} className="reveal">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <span className="h-px flex-1 bg-forest-900/15" />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wide text-forest-900">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-forest-800/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
