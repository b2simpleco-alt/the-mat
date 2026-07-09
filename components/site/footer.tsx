"use client"

import { QRCodeSVG } from "qrcode.react"
import { Phone } from "lucide-react"
import { site, nav } from "@/lib/content"
import { Wordmark } from "./wordmark"

const IgIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const FbIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M14 9h2.5l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.2C16.7.1 15.8 0 14.7 0 12.3 0 11 1.4 11 4v2H8.5v3H11v9h3V9z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-ink py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_auto]">
          {/* Brand */}
          <div>
            <Wordmark tone="cream" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sage">
              {site.tagline}. Open when you are — 24/7. {site.region}.
            </p>
            <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 text-cream transition hover:text-gold">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <div className="mt-5 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition hover:border-gold hover:text-gold">
                <IgIcon className="h-4 w-4" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition hover:border-gold hover:text-gold">
                <FbIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-cream/70 transition hover:text-gold">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* QR to founding signup */}
          <div className="flex flex-col items-start gap-3">
            <p className="eyebrow">Scan to join</p>
            <div className="rounded-xl bg-cream p-3">
              <QRCodeSVG value={`${site.url}/#founding`} size={104} bgColor="#f4edd9" fgColor="#0e2417" level="M" />
            </div>
            <p className="max-w-[150px] text-xs text-sage">Point your camera here to hold a founding spot.</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Mat. All rights reserved.</p>
          {/* TODO(client): add address once the space is confirmed. */}
          <p>Gainesville · Hall County · North Georgia · Opening soon.</p>
        </div>
      </div>
    </footer>
  )
}
