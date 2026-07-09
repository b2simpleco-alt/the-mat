import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Marquee } from "@/components/site/marquee"
import { Vision } from "@/components/site/vision"
import { FoundingOffer } from "@/components/site/founding-offer"
import { Memberships } from "@/components/site/memberships"
import { Events } from "@/components/site/events"
import { WhatsComing } from "@/components/site/whats-coming"
import { Gallery } from "@/components/site/gallery"
import { Faq } from "@/components/site/faq"
import { FinalCta } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee variant="onDark" />
        <Vision />
        <FoundingOffer />
        <Memberships />
        <Events />
        <WhatsComing />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
