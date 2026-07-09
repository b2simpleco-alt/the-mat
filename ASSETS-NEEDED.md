# Assets & Info Needed From The Client

Everything on the site works today with AI-generated placeholders and sensible defaults. Swap these in as they're ready — each is isolated so nothing else changes.

## 🔴 Launch blockers (need before going live)
- [ ] **Real founding-rate numbers** for the 3 membership types — announced **Aug 1**. Drop into `lib/content.ts → memberships.tiers` (replace the "Revealed Aug 1" placeholder). Types set: **Individual membership · Day Pass · Corporate/Group**.
- [ ] **Opening date** — set `config.openingText` (currently "Opening Fall 2026").
- [ ] **Founding-spot count** — set `config.foundingSpots` / `config.foundingClaimed` (currently 100 / 37). These drive the scarcity counter.
- [ ] **ESP connection** — pick Klaviyo / Mailchimp / Base44, add `ESP_API_KEY` (+ `ESP_LIST_ID`) in Vercel, and finish `forwardToEsp()` in `app/api/join/route.ts`. Without this, production signups aren't captured.
- [ ] **Business email** — replace `site.email` placeholder (`hello@thematgolf.com`).
- [ ] **Real domain** — set `site.url` (currently `https://thematgolf.com`) so SEO/OG/sitemap/QR point correctly.

## 🟡 Media to replace (AI placeholders in place now)
All AI assets live in `public/openart/` and are flagged to swap for real client media:
- [ ] **Hero video** — `public/openart/hero.mp4` is an AI loop (golfer in a bay). Replace with real footage of the actual room when built. Poster: `hero-a.png`.
- [ ] **The room / bay photos** — `room-1.png`, `room-2.png` (interior), `tile-lounge-*`, `tile-friends-*`, `hero-a/b.png`. Replace with real photography once the space is finished.
- [ ] **Build-in-public photos** — drop real progress shots into `public/build/` and point `gallery.images` in `lib/content.ts` at them.
- [ ] **Membership card** — `card.png` is an AI mockup of the green/gold card; replace with the real card art when designed.
- [ ] **Founding badge** — `badge.png` (AI seal) if you want to use it in marketing.
- [ ] **Impact / detail shots** — `tile-ball-*.png`.

## 🟢 Logo (done — confirm you're happy)
- `public/brand/logo.png` — your real logo, **two white rivet dots removed**, transparent corners.
- `public/brand/wordmark-cream-slanted.png` / `wordmark-green-slanted.png` — "The Mat" script **slanted upward-to-the-right (Sprite/Miller style)**, used across the site. Cream on dark, green on cream.
- `logo-original.png` — your untouched original, for reference.
- If you want a different slant angle, it's a one-line change — just say the degree.

## Brand info captured (change if wrong)
- Name: **The Mat** · Phone: **(770) 618-9393** · Region: **Gainesville · Hall County · North Georgia**
- Palette: forest green + cream + gold · Type: Cinzel + Outfit
- Social links in `site.social` are **placeholders** — add real Instagram / Facebook / TikTok URLs.
- **Address intentionally omitted** for now (per request) — add to the footer + JSON-LD when the space is confirmed.

## Nice-to-have later
- [ ] Real testimonials/reviews for the `/reviews` page.
- [ ] Analytics (GA4 / Vercel Analytics).
- [ ] Favicon from the logo (currently the default).
