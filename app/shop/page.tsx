import type { Metadata } from "next"
import { StubPage } from "@/components/site/stub-page"

export const metadata: Metadata = {
  title: "Pro Shop",
  description: "The Mat hats, shirts and essentials — coming at launch.",
}

export default function Page() {
  return (
    <StubPage
      title="Pro Shop"
      desc="The Mat hats, shirts, and clubhouse essentials are on the way. Members get pro-shop pricing. Drop your email to shop first."
      source="stub-shop"
    />
  )
}
