import type { Metadata, Viewport } from "next"
import { Cinzel, Outfit } from "next/font/google"

import "./globals.css"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { site } from "@/lib/content"
import { cn } from "@/lib/utils"

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cinzel" })
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-outfit" })

const url = site.url

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "The Mat — North Georgia's Members-Only Indoor Golf Club | 24/7 Golf Simulator, Gainesville",
    template: "%s · The Mat",
  },
  description:
    "The Mat is North Georgia's members-only indoor golf simulator club in Gainesville / Hall County — one private big-room bay, open 24/7. Founding memberships are open now: reserve your spot and lock the founding rate.",
  keywords: [
    "indoor golf Gainesville",
    "golf simulator Hall County",
    "North Georgia indoor golf",
    "24/7 golf simulator",
    "members golf club Gainesville GA",
    "The Mat golf",
  ],
  authors: [{ name: "The Mat" }],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: "The Mat — Members-Only Indoor Golf, Open 24/7 · North Georgia",
    description:
      "One private big-room bay. Open when you are — 24/7. Founding memberships are open for now. Reserve your spot before the founding rate is gone.",
    siteName: "The Mat",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The Mat — Members-Only Indoor Golf" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mat — Members-Only Indoor Golf, Open 24/7",
    description: "One private big-room bay in North Georgia. Founding memberships are open — for now.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0e2417",
  colorScheme: "dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(cinzel.variable, outfit.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(site.jsonLd) }}
        />
      </head>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
