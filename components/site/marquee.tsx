import { marqueeWords } from "@/lib/content"

export function Marquee({ variant = "onDark" }: { variant?: "onDark" | "onCream" }) {
  const onCream = variant === "onCream"
  const row = [...marqueeWords, ...marqueeWords]
  return (
    <div
      className={`relative overflow-hidden border-y py-5 ${
        onCream ? "border-forest-800/15 bg-parchment" : "border-cream/10 bg-forest-950"
      }`}
      aria-hidden
    >
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: "38s" }}>
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display uppercase tracking-[0.14em] text-lg sm:text-2xl ${onCream ? "text-forest-900/85" : "text-cream/90"}`}
            >
              {w}
            </span>
            <span className="mx-6 inline-block h-1.5 w-1.5 rotate-45 bg-gold sm:mx-9" />
          </span>
        ))}
      </div>
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r ${onCream ? "from-parchment" : "from-forest-950"} to-transparent`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l ${onCream ? "from-parchment" : "from-forest-950"} to-transparent`} />
    </div>
  )
}
