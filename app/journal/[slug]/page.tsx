import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { EmailCapture } from "@/components/site/email-capture"
import { journal, site } from "@/lib/content"

export function generateStaticParams() {
  return journal.posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = journal.posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover], type: "article" },
  }
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = journal.posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "The Mat" },
    publisher: { "@type": "Organization", name: "The Mat" },
    mainEntityOfPage: `${site.url}/journal/${post.slug}`,
  }

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden bg-forest-950 pb-14 pt-36 sm:pt-44">
          <div className="editorial absolute inset-0 opacity-40">
            <Image src={post.cover} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/60" />
          <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
            <Link href="/journal" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold-soft hover:underline">
              <ArrowLeft className="h-4 w-4" /> The Journal
            </Link>
            <div className="mt-6 mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-sage">
              <span className="rounded-full border border-gold/30 px-3 py-1 text-gold-soft">{post.tag}</span>
              <span>{fmt(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              <span>{post.read}</span>
            </div>
            <h1 className="display-caps text-4xl leading-[1.05] text-cream sm:text-5xl">{post.title}</h1>
          </div>
        </div>

        {/* Article */}
        <article className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <p className="mb-8 border-l-2 border-gold pl-5 font-display text-xl leading-snug text-forest-900">
              {post.excerpt}
            </p>
            {post.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="mt-10 mb-3 font-display text-2xl uppercase tracking-wide text-forest-900">
                  {b.text}
                </h2>
              ) : (
                <p key={i} className="mb-5 text-[17px] leading-relaxed text-forest-800/85">
                  {b.text}
                </p>
              )
            )}
          </div>

          {/* CTA */}
          <div className="mx-auto mt-14 max-w-2xl px-5 sm:px-8">
            <div className="glass-gold rounded-3xl bg-forest-950 p-7 sm:p-9">
              <p className="eyebrow">Before you go</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-cream">Reserve your founding spot</h3>
              <p className="mt-2 mb-5 text-sm text-sage">
                Free to hold. First to see the founding rate on August 1. No card required.
              </p>
              <EmailCapture source={`journal-${post.slug}`} cta="Claim My Founding Spot" variant="onDark" />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
