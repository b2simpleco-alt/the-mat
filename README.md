# The Mat — Coming Soon / Founding-Member Site

North Georgia's members-only indoor golf club (Gainesville · Hall County). A premium pre-launch site whose single job is capturing **founding members** — email (+ optional phone) — and driving toward the **August 1 founding-rate reveal**.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind v4 · GSAP/ScrollTrigger · Lenis · Framer Motion (`motion`) · Lucide · qrcode.react.**

---

## Run locally

```bash
cd the-mat-next
npm install
npm run dev          # http://localhost:3000  (Claude preview uses -p 3010)
```

Other scripts: `npm run build` · `npm start` · `npm run typecheck` · `npm run lint` · `npm run format`.

## Deploy to Vercel

The client owns the Vercel account; it just needs linking:

```bash
cd the-mat-next
npx vercel login       # one-time, in an interactive terminal
npx vercel link        # link this folder to a Vercel project
npx vercel --prod      # deploy
```

Set env vars in the Vercel dashboard (see below). No secrets are committed.

### Environment variables (Vercel → Settings → Environment Variables)
| Var | Purpose | Status |
|---|---|---|
| `RESEND_API_KEY` | [resend.com](https://resend.com) key — emails every lead to the inbox | **Add before launch** |
| `LEAD_EMAIL` | Where leads go. Defaults to `inquire@golfatthemat.com` | optional |
| `FROM_EMAIL` | Verified sender, e.g. `The Mat <leads@thematgolf.com>` | recommended |
| `ESP_API_KEY` | Optional — also add leads to a Klaviyo/Mailchimp list | optional |

Every form on the site (hero, founding, events, final CTA, journal, stubs) POSTs to `app/api/join/route.ts`, which emails the lead to `inquire@golfatthemat.com` via Resend. Until `RESEND_API_KEY` is set, leads are only saved to `data/signups.json` in dev (Vercel's serverless FS is read-only) — **so add the key before driving real traffic** or leads won't be captured in production. To send from `@thematgolf.com`, verify that domain in Resend first.

---

## Editing content — everything lives in **`lib/content.ts`**

One file controls all copy and launch config:

- `config.announceDate` — the **countdown target** (Aug 1 founding-rate reveal).
- `config.openingText` — opening date text (TODO: real date).
- `config.foundingSpots` / `config.foundingClaimed` — the **scarcity counter**.
- `site.*` — name, phone, region, url, social links, JSON-LD.
- `hero`, `vision`, `founding`, `memberships`, `whatsComing`, `gallery`, `faq`, `finalCta` — section copy.
- `memberships.tiers` — the **3 membership types** (Individual · Day Pass · Corporate/Group). **Pricing is intentionally "Revealed Aug 1"** — drop real numbers into `priceTBD`/tiers when the client sets them.

## Structure

```
app/
  layout.tsx            fonts (Cinzel + Outfit), metadata, JSON-LD
  page.tsx              home — composes all sections
  api/join/route.ts     founding-member capture endpoint (+ ESP TODO)
  sitemap.ts robots.ts  SEO
  memberships/ book/ gift-cards/ shop/ gallery/ reviews/   routed launch stubs
components/site/         Header, Hero, Vision, FoundingOffer, Memberships,
                         WhatsComing (pinned horizontal), Gallery, Faq,
                         FinalCta, Footer, EmailCapture, Countdown, Spots,
                         Marquee, Wordmark, Magnetic, SectionHeading, StubPage
components/providers/    SmoothScroll (Lenis + GSAP reveals + anchor scroll)
lib/content.ts           ← all copy & config
public/brand/            logo + slanted wordmarks (see ASSETS-NEEDED.md)
public/openart/          AI hero video + imagery (flag: replace with real media)
public/build/            drop real build-in-public photos here
public/llms.txt og.png   AI-discovery + social share
```

## Design system
- **Palette:** forest green + warm cream + gold (tokens in `app/globals.css` `@theme`). Sections alternate green/cream.
- **Type:** Cinzel (engraved small-caps display) + Outfit (body).
- **Motion:** hero video Ken-Burns drift, GSAP scroll reveals, pinned horizontal "What's Coming", infinite marquee, magnetic buttons, 3D tilt membership cards. All respect `prefers-reduced-motion`.

## Conversion
One goal per screen — the email capture. Capture points: hero, founding section, final CTA, and every stub page. Success state confirms "You're in — founding spot held." Countdown + spots-remaining are editable in `lib/content.ts`.

See **COMPETITOR-RESEARCH.md** for the strategy and **ASSETS-NEEDED.md** for what the client still owes.
