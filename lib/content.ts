/**
 * THE MAT — single source of truth for copy + launch config.
 * Everything the client is likely to tweak lives here.
 * ────────────────────────────────────────────────────────────────
 *  TODO(client): confirm openingDate, foundingSpots, and pricing once
 *  the Aug 1 announcement is finalized. Prices are intentionally blank.
 */

export const config = {
  /** Countdown target = the Aug 1 founding-rate reveal. ISO w/ ET offset. */
  announceDate: "2026-08-01T09:00:00-04:00",
  announceLabel: "Founding rate revealed",
  /** Public opening — TODO(client): set real date; shown as text until then. */
  openingText: "Opening Fall 2026",
  /** Scarcity counter shown around the site. TODO(client): real number. */
  foundingSpots: 100,
  foundingClaimed: 37,
} as const

export const site = {
  name: "The Mat",
  tagline: "North Georgia's Members-Only Indoor Golf Club",
  phone: "(770) 618-9393",
  phoneHref: "tel:+17706189393",
  email: "inquire@golfatthemat.com",
  emailHref: "mailto:inquire@golfatthemat.com",
  region: "Gainesville · Hall County · North Georgia",
  url: "https://thematgolf.com",
  social: {
    instagram: "https://instagram.com/", // TODO(client)
    facebook: "https://facebook.com/", // TODO(client)
    tiktok: "https://tiktok.com/", // TODO(client)
  },
  get jsonLd() {
    return {
      "@context": "https://schema.org",
      "@type": ["GolfCourse", "LocalBusiness"],
      name: "The Mat",
      description:
        "Members-only indoor golf simulator club in Gainesville / Hall County, North Georgia. One private big-room bay, open 24/7.",
      url: this.url,
      telephone: "+17706189393",
      email: "inquire@golfatthemat.com",
      areaServed: "Gainesville, Hall County, North Georgia",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gainesville",
        addressRegion: "GA",
        addressCountry: "US",
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "$$$",
      sameAs: [] as string[],
    }
  },
}

/* ── Header nav ──────────────────────────────────────────────────── */
export const nav = [
  { label: "The Vision", href: "#vision" },
  { label: "Events", href: "#events" },
  { label: "Memberships", href: "#memberships" },
  { label: "What's Coming", href: "#coming" },
  { label: "Journal", href: "/journal" },
  { label: "FAQ", href: "#faq" },
]

/* ── Hero ────────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: config.openingText + " · " + "Gainesville, GA",
  titleLines: ["Open When", "You Are.", "24/7."],
  subtitle:
    "North Georgia's members-only golf club — one private big-room bay that's yours when you book it. Founding memberships are open for now.",
  cta: "Claim My Founding Spot",
  ctaNote: "No payment today. Reserve your spot & be first when the founding rate drops Aug 1.",
}

/* ── The Vision (value props) ────────────────────────────────────── */
export const vision = {
  eyebrow: "The Vision",
  title: "A Golf Club That\nNever Closes",
  intro:
    "Not a busy sim arcade. One meticulously built room, yours by the hour or by the month — the calm, private, members-first way to play in North Georgia.",
  props: [
    {
      title: "Open 24/7",
      body: "App unlock + QR door access. Early mornings, late nights, whenever the game calls — the room is always open for members.",
    },
    {
      title: "One Private Bay",
      body: "A single, pro-grade big-room bay. No crowds, no walk-ups, no waiting. When it's your time, the whole place is yours.",
    },
    {
      title: "More Than a Bay",
      body: "A real lounge, not a stall — comfortable seating, food and drinks, warm lighting. Come with your crew, bring a date, or play a quiet round on your own.",
    },
    {
      title: "Members First",
      body: "Leagues, member nights, and first pick of tee times. A small community built around the game — and the room.",
    },
  ],
}

/* ── Founding Offer (money section) ──────────────────────────────── */
export const founding = {
  eyebrow: "Founding Members",
  title: "Lock The Founding Rate\nFor Your First Month",
  lede: "Reserve your founding spot now. On August 1 we reveal the founding rate — and founders lock it in for their first month, free to hold your place today. Once the founding spots are gone, this door closes.",
  perks: [
    "First month locked at the special founding rate — revealed Aug 1",
    "Opening-day first access — book the room before the public can",
    "Your name on the Founders' Wall",
    "Guest passes to bring your crew",
    "First pick of prime tee times",
    "Founding-member-only nights & leagues",
  ],
  cta: "Hold My Founding Spot",
  reassure: "Free to reserve. No card required. We'll email you the moment the rate is live.",
}

/* ── Memberships (3 types — pricing TBD until Aug 1) ─────────────── */
export const memberships = {
  eyebrow: "Choose Your Way In",
  title: "Three Ways To Play",
  intro:
    "Pricing is announced August 1. Reserve now and you'll be first to see the founding rates — and first to lock them.",
  priceTBD: "Revealed Aug 1",
  tiers: [
    {
      name: "The Membership",
      for: "For the regular",
      blurb: "Unlimited-style access to the room for the player who wants it to be their second home.",
      features: ["24/7 app + QR access", "Member booking window", "Bring guests", "Member pro-shop pricing", "Leagues & member nights"],
      featured: true,
    },
    {
      name: "The Day Pass",
      for: "For date night",
      blurb: "One block, one room, all yours. The easiest way to try The Mat — perfect for a date or a one-off round.",
      features: ["Book a single block", "The whole room to yourselves", "No membership required", "Clubs available", "Add food & drink"],
      featured: false,
    },
    {
      name: "Corporate & Groups",
      for: "For parties, teams & schools",
      blurb: "Private events for companies, golf teams, schools, and celebrations. Custom packages, the room to yourselves.",
      features: ["Private buyouts", "Corporate & team packages", "School & youth programs", "Parties & celebrations", "Custom catering options"],
      featured: false,
    },
  ],
}

/* ── Events & Groups (B2B revenue driver) ────────────────────────── */
export const events = {
  eyebrow: "Events & Groups",
  title: "Your First Group\nSession Is On Us",
  intro:
    "Bring your people. Corporate teams, golf leagues, birthday & bachelor parties, schools and clubs — book the whole room to yourselves. Come once on the house, and we'll make sure it's not the last time.",
  ladder: [
    { step: "01", title: "Play on us", body: "Your group's first private session is free. No catch — just fall for the room." },
    { step: "02", title: "Everyone saves", body: "Your whole group unlocks a founding-member rate on personal memberships." },
    { step: "03", title: "Book back for less", body: "Standing discounts on every future event, league night, and tournament." },
  ],
  types: [
    "Corporate & team building",
    "Golf leagues & tournaments",
    "Birthday & bachelor parties",
    "Schools & youth programs",
    "Fundraisers & socials",
    "Holiday parties",
  ],
  cta: "Plan My Group Event",
  note: "Tell us about your group — we'll hold a date and send the details.",
}

/* ── What's Coming (routed stubs) ────────────────────────────────── */
export const whatsComing = {
  eyebrow: "At Launch",
  title: "The Full Experience,\nComing Soon",
  intro: "Everything below flips on when the doors open. Reserve your founding spot and you'll be first through each one.",
  cards: [
    { title: "Buy Memberships", desc: "Founding rates go live August 1.", href: "/memberships" },
    { title: "Book Tee Times", desc: "Reserve the room, 24/7, from your phone.", href: "/book" },
    { title: "Gift Cards", desc: "Give the game that never closes.", href: "/gift-cards" },
    { title: "Pro Shop", desc: "The Mat hats, shirts & essentials.", href: "/shop" },
    { title: "Photo Gallery", desc: "Step inside the room before you visit.", href: "/gallery" },
    { title: "Reviews", desc: "What founding members are saying.", href: "/reviews" },
  ],
}

/* ── Build-in-public gallery ─────────────────────────────────────── */
export const gallery = {
  eyebrow: "Built In Public",
  title: "Watch The Room\nCome Together",
  intro: "We're building The Mat in the open. Real progress, dropped here as it happens.",
  // TODO(client): replace with real build photos in /public/build
  images: [
    { src: "/openart/room-1.jpg", alt: "The bay taking shape", tag: "The Bay" },
    { src: "/openart/tile-lounge-1.jpg", alt: "Lounge seating", tag: "The Lounge" },
    { src: "/openart/tile-ball-1.jpg", alt: "Impact detail", tag: "The Tech" },
    { src: "/openart/room-2.jpg", alt: "The room at night", tag: "After Dark" },
    { src: "/openart/tile-friends-1.jpg", alt: "A night at The Mat", tag: "The Vibe" },
    { src: "/openart/hero-b.jpg", alt: "Sunset on the screen", tag: "The Screen" },
  ],
}

/* ── FAQ (+ used for FAQPage schema) ─────────────────────────────── */
export const faq = {
  eyebrow: "Questions",
  title: "Indoor Golf in\nGainesville, GA",
  intro: "Everything you might want to know about indoor golf at The Mat — the game, the room, memberships, and the founding offer.",
  items: [
    { q: "What is The Mat?", a: "The Mat is a members-only indoor golf club in Gainesville, Georgia. Instead of a row of crowded stalls, it's one private, pro-grade golf simulator bay inside a real lounge — book it by the block or access it anytime as a member. Play a full round, dial in your swing, or just hang out, year-round and any time of day." },
    { q: "Where is The Mat located?", a: "We're in Gainesville, serving Hall County and the greater North Georgia area. The exact address goes public with our opening — reserve your founding spot to be the first to know when and where the doors open." },
    { q: "How much does it cost to play indoor golf?", a: "Pricing is revealed on August 1. Around North Georgia, indoor golf simulators usually run about $45–$65 per hour to play, and memberships range from roughly $90 to $300+ a month depending on access. The Mat's founding rates land in that range and get locked in for founding members — reserve now (free) to see the numbers first and hold your first-month price." },
    { q: "Do you offer memberships, or can I just pay to play?", a: "Both. The Day Pass books the room for a single visit with no membership — perfect for a date night or a one-off round. The Membership gives you 24/7 access and member pricing. And Corporate & Group packages put the whole room in your hands for teams, parties, leagues, and schools." },
    { q: "Are you really open 24/7?", a: "Yes. Members unlock the door with an app and QR access, so the room is available around the clock — 5am before work, late nights after the kids are down, whenever the game calls. No waiting on daylight or tee-time availability." },
    { q: "How accurate are the golf simulators?", a: "Very. Pro-grade launch-monitor technology reads ball speed, launch angle, spin, and club data on every swing, with true-to-life ball flight on real courses. It's precise enough for serious practice and realistic enough to be a blast for a total beginner." },
    { q: "Do I need to bring my own clubs?", a: "Bring them if you have them — but you don't have to. Club rentals are available, so you can show up empty-handed and still play a full round. All you need is you." },
    { q: "Can beginners and kids play? Is it good for all skill levels?", a: "Absolutely — all ages and skill levels are welcome. A simulator is the easiest, lowest-pressure way to learn: no lost balls, instant feedback, and fun games like closest-to-the-pin and long-drive that level the field for beginners and kids alike." },
    { q: "How many people can play at once?", a: "When you book The Mat, the whole room is yours. Bring your foursome or a small group, share one big screen with lounge seating, and take turns — it's built to be played together. For larger parties, ask about private events." },
    { q: "How long does it take to play 18 holes?", a: "About 45 minutes to an hour per person, and faster in a group since there's no walking between holes. Short on time? Play 9, hit the driving range, or work your short game — all in one session." },
    { q: "Is there food and drinks?", a: "Yes — a real lounge with food and drinks is part of the experience, not an afterthought. Come play, then stay a while. Full menu details land at launch." },
    { q: "What courses can I play?", a: "A deep library of world-famous courses — Pebble Beach, St Andrews, TPC Sawgrass and dozens more — plus a driving range, practice modes, and games. Play a bucket-list course on a Tuesday night without leaving Gainesville." },
    { q: "Can I book The Mat for a party, corporate event, or date night?", a: "Yes — it's one of the best things about the room. Book it for birthdays, bachelor and bachelorette parties, corporate team building, golf leagues, fundraisers, or school groups, and the whole space is yours. Your group's first session is on us — see Events." },
    { q: "Do you offer golf lessons?", a: "Lessons and data-driven coaching arrive at launch. With launch-monitor numbers on every swing, it's one of the fastest ways to actually improve. Reserve your founding spot to be first to book." },
    { q: "What does founding membership cost, and what's the catch?", a: "The founding rate is announced August 1. Reserving now is free and holds your place — founders lock the special rate for their first month before it goes public. There's no catch: founding spots are limited and the rate won't come back. That's the whole deal." },
  ],
  get schema() {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: this.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    }
  },
}

/* ── Marquee strip ───────────────────────────────────────────────── */
export const marqueeWords = [
  "Open 24/7",
  "Members Only",
  "One Private Bay",
  "Founding Rates Aug 1",
  "North Georgia",
  "Book The Room",
  "Leagues & Nights",
  "Your Game, Your Hours",
]

export const finalCta = {
  eyebrow: "Last Call",
  title: "Founding Spots\nAre Going",
  sub: "The room opens once. The founding rate happens once. Put your name in before August 1.",
  cta: "Claim My Founding Spot",
}

/* ── Journal / Blog (SEO + lead gen) ─────────────────────────────── */
export type JournalBlock = { type: "p" | "h2"; text: string }
export type JournalPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  read: string
  tag: string
  cover: string
  body: JournalBlock[]
}

export const journal = {
  eyebrow: "The Journal",
  title: "Notes From The Mat",
  intro: "Indoor golf, North Georgia, and the making of a members' club worth belonging to.",
  posts: [
    {
      slug: "indoor-golf-gainesville-north-georgia",
      title: "Why Indoor Golf Is Taking Over North Georgia",
      excerpt:
        "Weather, daylight, and tee-time scarcity make the case for a room that never closes. Here's why Gainesville is ready for it.",
      date: "2026-07-18",
      read: "4 min read",
      tag: "The Game",
      cover: "/openart/room-1.jpg",
      body: [
        { type: "p", text: "Golf in North Georgia is a summer of humidity and a winter of short, cold afternoons. Between the two, the good tee times get booked before you've had coffee. Indoor golf quietly solves all three — and Gainesville is exactly the kind of town that's ready for it." },
        { type: "h2", text: "The game, on your schedule" },
        { type: "p", text: "A simulator bay doesn't care that it's 98 degrees or already dark at 6pm. You play Pebble Beach at 5am before work or run your numbers at 11pm after the kids are down. For members of The Mat, the room is open 24/7 — your bay, your hours." },
        { type: "h2", text: "Practice that actually improves your game" },
        { type: "p", text: "Launch monitors turn every swing into data: ball speed, launch angle, spin, carry. Instead of guessing on the range, you see exactly what's happening and fix it. That's why serious players are moving indoors — the feedback loop is faster than a bucket of range balls will ever be." },
        { type: "h2", text: "A third place, not just a driving range" },
        { type: "p", text: "The best indoor golf isn't a row of stalls — it's a room. Leather seating, a good pour, warm light, and the whole space to you and your crew. That's the version we're building in Gainesville, and founding members get first access." },
      ],
    },
    {
      slug: "what-founding-membership-means",
      title: "What It Means To Be a Founding Member",
      excerpt:
        "A founding spot isn't just an early login — it's a rate locked for life, a name on the wall, and a hand in shaping the room.",
      date: "2026-07-12",
      read: "3 min read",
      tag: "Membership",
      cover: "/openart/card.jpg",
      body: [
        { type: "p", text: "Every members' club has a first hundred people who believed in it before the doors opened. At The Mat, those are our founding members — and we're building the whole experience around rewarding them." },
        { type: "h2", text: "The rate that never comes back" },
        { type: "p", text: "On August 1 we reveal the founding membership rate. Founders lock it in — and it stays locked. When public pricing goes up, yours doesn't. That's the single biggest reason to reserve your spot now, while it's free to hold." },
        { type: "h2", text: "First in line, always" },
        { type: "p", text: "Opening-day access before the public. First pick of prime tee times. Guest passes for your crew. And a spot on the Founders' Wall that stays there as long as the lights are on." },
        { type: "h2", text: "A say in the room" },
        { type: "p", text: "Founders help shape what The Mat becomes — the leagues, the events, the little details. Reserve your spot and you're not just joining a club; you're helping build one." },
      ],
    },
    {
      slug: "corporate-events-team-building-gainesville",
      title: "The Best Corporate Team Building in Gainesville Is a Golf Bay",
      excerpt:
        "Why more North Georgia companies are trading the conference room for a private simulator — and how your first session is on us.",
      date: "2026-07-06",
      read: "3 min read",
      tag: "Events",
      cover: "/openart/tile-friends-1.jpg",
      body: [
        { type: "p", text: "Trust falls are out. A private golf bay, good food, and a little friendly competition are in. Here's why companies around Gainesville are booking The Mat for team building, client entertainment, and holiday parties." },
        { type: "h2", text: "Everyone can play" },
        { type: "p", text: "You don't need a handicap to have fun in a simulator. Closest-to-the-pin and long-drive contests level the field instantly — the intern beats the VP and everyone remembers it. That's the point." },
        { type: "h2", text: "The whole room, just your team" },
        { type: "p", text: "Book The Mat and the space is yours. No walk-ups, no strangers — just your people, the screen, and the lounge. Add catering and drinks and you've got a night nobody scrolls through." },
        { type: "h2", text: "Your first session is free" },
        { type: "p", text: "We mean it. Bring your team once on the house. If it lands the way we think it will, we'll set your company up with member rates and standing discounts on future events. Tell us about your group to hold a date." },
      ],
    },
  ] as JournalPost[],
}
