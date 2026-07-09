import type { Metadata } from "next"
import { StubPage } from "@/components/site/stub-page"

export const metadata: Metadata = {
  title: "Memberships",
  description: "The Mat founding membership rates are revealed August 1. Reserve now to lock your first month.",
}

export default function Page() {
  return (
    <StubPage
      title="Memberships"
      desc="Founding rates are revealed August 1. Reserve your spot now and you'll be first to see them — and first to lock your first month at the founding rate."
      source="stub-memberships"
    />
  )
}
