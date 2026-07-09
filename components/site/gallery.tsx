import Image from "next/image"
import { gallery } from "@/lib/content"
import { SectionHeading } from "./section-heading"

export function Gallery() {
  return (
    <section className="relative bg-forest-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} intro={gallery.intro} variant="onDark" />

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4">
          {gallery.images.map((img, i) => {
            const big = i === 0
            const wide = i === 3
            const sizes = big
              ? "(max-width: 1024px) 100vw, 50vw"
              : wide
                ? "50vw"
                : "(max-width: 1024px) 50vw, 25vw"
            return (
            <div
              key={img.src}
              className={`editorial reveal-clip group relative overflow-hidden rounded-lg ${
                big ? "col-span-2 row-span-2" : wide ? "lg:col-span-2" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={sizes}
                quality={90}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-forest-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-soft backdrop-blur-sm">
                {img.tag}
              </span>
            </div>
            )
          })}
        </div>
        <p className="reveal mt-6 text-center text-xs text-sage">
          Renders shown while we build. Real photos drop here as the room comes together.
        </p>
      </div>
    </section>
  )
}
