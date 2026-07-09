"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Menu, X } from "lucide-react"
import { nav, site } from "@/lib/content"
import { Wordmark } from "./wordmark"
import { Magnetic } from "./magnetic"

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const cls =
    "group relative text-[11px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-cream"
  const inner = (
    <>
      {label}
      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
    </>
  )
  return href.startsWith("/") ? (
    <Link href={href} onClick={onClick} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} onClick={onClick} className={cls}>
      {inner}
    </a>
  )
}

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const home = pathname === "/"
  // On sub-pages, hash links must point back to the home page.
  const resolve = (href: string) => (href.startsWith("#") && !home ? `/${href}` : href)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`relative flex w-full max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-6 ${
          solid ? "glass py-2.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]" : "border border-transparent py-3"
        }`}
      >
        <Link href="/#top" aria-label="The Mat — home" className="flex shrink-0 items-center">
          <Wordmark tone="cream" priority className="h-8 w-auto sm:h-9" />
        </Link>

        {/* Centered nav (absolute so it never crowds the logo) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex">
          {nav.map((n) => (
            <NavLink key={n.href} href={resolve(n.href)} label={n.label} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cream/70 transition hover:text-gold lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {site.phone}
          </a>
          <Magnetic strength={0.2}>
            <a href={resolve("#founding")} className="btn-gold hidden px-5 py-2.5 sm:inline-flex">
              Founding Member
            </a>
          </Magnetic>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition hover:border-gold hover:text-gold xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={`absolute inset-x-3 top-[calc(100%+0.25rem)] overflow-hidden rounded-3xl border border-gold/20 bg-forest-950 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-400 xl:hidden ${
          open ? "max-h-[30rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-5">
          {nav.map((n) => (
            <NavLink key={n.href} href={resolve(n.href)} label={n.label} onClick={() => setOpen(false)} />
          ))}
          <a href={site.phoneHref} className="mt-3 flex items-center gap-2 text-sm text-gold-soft">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <a href={resolve("#founding")} onClick={() => setOpen(false)} className="btn-gold mt-3 justify-center px-5 py-3 text-center">
            Founding Member
          </a>
        </nav>
      </div>
    </header>
  )
}
