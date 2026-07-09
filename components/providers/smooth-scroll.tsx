"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.documentElement.classList.add("js-ready")

    gsap.registerPlugin(ScrollTrigger)

    let lenis: Lenis | undefined
    let raf = 0

    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 })
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
      lenis.on("scroll", ScrollTrigger.update)

      // Smooth anchor-link scrolling
      const onClick = (e: Event) => {
        const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
        if (!a) return
        const id = a.getAttribute("href")!
        if (id.length > 1) {
          const el = document.querySelector(id)
          if (el) {
            e.preventDefault()
            lenis!.scrollTo(el as HTMLElement, { offset: -80 })
          }
        }
      }
      document.addEventListener("click", onClick)
      ;(lenis as unknown as { __onClick?: (e: Event) => void }).__onClick = onClick

      const loop = (time: number) => {
        lenis?.raf(time * 1000)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    // Global scroll reveals
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".reveal, .reveal-clip", { clearProps: "all", opacity: 1, y: 0 })
        return
      }
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, overwrite: true }),
      })
      ScrollTrigger.batch(".reveal-clip", {
        start: "top 85%",
        onEnter: (els) =>
          gsap.to(els, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out", stagger: 0.1, overwrite: true }),
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    const t = setTimeout(refresh, 300)
    window.addEventListener("load", refresh)

    return () => {
      clearTimeout(t)
      window.removeEventListener("load", refresh)
      cancelAnimationFrame(raf)
      const oc = (lenis as unknown as { __onClick?: (e: Event) => void })?.__onClick
      if (oc) document.removeEventListener("click", oc)
      lenis?.destroy()
      ctx.revert()
    }
  }, [])

  return <>{children}</>
}
