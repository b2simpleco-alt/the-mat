import type { Metadata } from "next"
import { StubPage } from "@/components/site/stub-page"

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Give the game that never closes. The Mat gift cards launch soon.",
}

export default function Page() {
  return (
    <StubPage
      title="Gift Cards"
      desc="Give the game that never closes. The Mat gift cards go live at launch — leave your email and we'll let you know the moment they're available."
      source="stub-gift-cards"
    />
  )
}
