export function SectionHeading({
  eyebrow,
  title,
  intro,
  variant = "onDark",
  align = "left",
}: {
  eyebrow?: string
  title: string
  intro?: string
  variant?: "onDark" | "onCream"
  align?: "left" | "center"
}) {
  const onCream = variant === "onCream"
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`reveal mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-gold/60" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2
        className={`reveal display-caps text-4xl sm:text-5xl lg:text-6xl ${onCream ? "text-forest-900" : "text-cream"}`}
      >
        {title.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>
      {intro && (
        <p className={`reveal mt-5 max-w-xl text-base leading-relaxed ${align === "center" ? "mx-auto" : ""} ${onCream ? "text-forest-800/75" : "text-sage"}`}>
          {intro}
        </p>
      )}
    </div>
  )
}
