import type { Metadata } from "next"
import { StubPage } from "@/components/site/stub-page"

export const metadata: Metadata = {
  title: "Book Tee Times",
  description: "Reserve the room at The Mat — 24/7 booking opens at launch.",
}

export default function Page() {
  return (
    <StubPage
      title="Book The Room"
      desc="24/7 booking opens when the doors do. Founding members get the earliest booking window and first pick of prime times. Reserve your spot to be first in line."
      source="stub-book"
    />
  )
}
