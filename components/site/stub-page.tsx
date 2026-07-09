import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone } from "lucide-react"
import { site } from "@/lib/content"
import { EmailCapture } from "./email-capture"
import { Wordmark } from "./wordmark"
import { Footer } from "./footer"

export function StubPage({
  title,
  eyebrow = "Coming at launch",
  desc,
  source,
}: {
  title: string
  eyebrow?: string
  desc: string
  source: string
}) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-forest-950/80 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="The Mat — home">
            <Wordmark tone="cream" className="h-8 w-auto" />
          </Link>
          <a href={site.phoneHref} className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream/80 hover:text-gold">
            <Phone className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{site.phone}</span>
          </a>
        </div>
      </header>

      <main className="relative flex min-h-screen items-center overflow-hidden py-32">
        <Image src="/openart/hero-b.jpg" alt="" fill sizes="100vw" className="pointer-events-none absolute inset-0 object-cover opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/80 to-forest-950" />
        <div className="pointer-events-none absolute inset-0 vignette" />

        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 display-caps text-5xl text-cream sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">{desc}</p>

          <div className="mx-auto mt-9 max-w-lg">
            <EmailCapture
              source={source}
              cta="Notify Me At Launch"
              note="We'll email you the moment this goes live — plus the founding rate on Aug 1."
              variant="onDark"
            />
          </div>

          <Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm text-gold-soft underline-offset-4 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to The Mat
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
