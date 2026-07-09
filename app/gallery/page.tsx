import type { Metadata } from "next"
import { StubPage } from "@/components/site/stub-page"

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Step inside The Mat. Full photo gallery drops at launch.",
}

export default function Page() {
  return (
    <StubPage
      title="The Gallery"
      desc="The full walk-through of the room drops at launch. Until then, watch it come together on the home page. Leave your email for the reveal."
      source="stub-gallery"
    />
  )
}
