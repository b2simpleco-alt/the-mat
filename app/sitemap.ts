import type { MetadataRoute } from "next"
import { site, journal } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url
  const routes = ["", "/memberships", "/book", "/gift-cards", "/shop", "/gallery", "/reviews", "/journal"]
  const now = new Date()
  const pages = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.6,
  }))
  const posts = journal.posts.map((p) => ({
    url: `${base}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))
  return [...pages, ...posts]
}
