"use client"

import { useRef } from "react"

/** Wraps children and nudges them toward the cursor (desktop only). */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el || window.matchMedia("(pointer: coarse)").matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "translate(0,0)"
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ display: "inline-block", transition: "transform .35s cubic-bezier(.2,.8,.2,1)" }}
    >
      {children}
    </span>
  )
}
