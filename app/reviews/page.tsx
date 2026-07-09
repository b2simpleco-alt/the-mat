import type { Metadata } from "next"
import { StubPage } from "@/components/site/stub-page"

export const metadata: Metadata = {
  title: "Reviews",
  description: "What founding members are saying about The Mat — coming soon.",
}

export default function Page() {
  return (
    <StubPage
      title="Reviews"
      desc="The founding members are just getting started. Their stories land here soon. Want to be one of them? Reserve your spot below."
      source="stub-reviews"
    />
  )
}
