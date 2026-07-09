import Image from "next/image"

/** The Mat slanted script wordmark (upward-right, Sprite-style). */
export function Wordmark({
  tone = "cream",
  className = "",
  priority = false,
}: {
  tone?: "cream" | "green"
  className?: string
  priority?: boolean
}) {
  const src = tone === "green" ? "/brand/wordmark-green-slanted.png" : "/brand/wordmark-cream-slanted.png"
  return (
    <Image
      src={src}
      alt="The Mat"
      width={884}
      height={530}
      priority={priority}
      sizes="(max-width: 640px) 60vw, 400px"
      className={`w-auto ${className}`}
    />
  )
}
