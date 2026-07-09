import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { journal } from "@/lib/content"

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Notes from The Mat — indoor golf, North Georgia, founding membership, and corporate events in Gainesville / Hall County.",
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default function JournalIndex() {
  return (
    <>
      <Header />
      <main className="aurora relative min-h-screen overflow-hidden bg-forest-950 pb-24 pt-36 sm:pt-40">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">{journal.eyebrow}</span>
          </div>
          <h1 className="display-caps text-5xl text-cream sm:text-6xl lg:text-7xl">{journal.title}</h1>
          <p className="mt-5 max-w-xl text-base text-sage">{journal.intro}</p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {journal.posts.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                className="lift group flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-forest-900/50"
              >
                <div className="editorial relative aspect-[16/10] overflow-hidden">
                  <Image src={p.cover} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-forest-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-sage">
                    <span>{fmt(p.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    <span>{p.read}</span>
                  </div>
                  <h2 className="font-display text-xl leading-tight text-cream transition group-hover:text-gold-soft">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-sage">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-gold">
                    Read <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
