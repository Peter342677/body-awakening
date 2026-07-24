# Body Awakening

The website for Body Awakening — the massage therapy and somatic coaching practice of Jason Gentrup. Next.js (App Router) + TypeScript + Tailwind, with GSAP/Lenis-driven scroll storytelling, a custom inverted cursor, and a booking flow ready to be wired to Stripe and Google Calendar.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3120](http://localhost:3120) (port is fixed in `package.json` so it can run alongside sibling projects in this workspace).

```bash
npm run build   # production build (also runs next-sitemap via postbuild)
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you have. Every integration below is feature-flagged: the site builds and runs fully — including a working demo booking flow — with none of these set.

| Variable | Used for |
| --- | --- |
| `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Real payments at checkout |
| `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Pulling real free/busy availability into the booking calendar |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (loads only after a visitor accepts the cookie banner) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console `<meta>` verification tag |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Contact form + newsletter signup emails |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG/JSON-LD |

## Plugging in each integration

**Stripe** — set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. `POST /api/checkout` (`app/api/checkout/route.ts`) will start creating real Checkout Sessions instead of the mock "instant confirm" flow. Set `STRIPE_WEBHOOK_SECRET` and point a Stripe webhook at `/api/stripe/webhook` to receive `checkout.session.completed` events — that's where the Google Calendar event and confirmation email should be created (see the `TODO`-style comment in that route).

**Google Calendar** — create a service account with access to Jason's calendar, share the calendar with the service account email, then set `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (keep the `\n` escapes in the private key as a single-line env value). `lib/calendar.ts` will start reading real free/busy data; until then, `/book` reads mock slots from `content/availability.json`. If Google's setup is a blocker, swap `BookingWidget`'s calendar step for a Cal.com/Calendly embed — the step is isolated in `components/BookingWidget.tsx`.

**GA4** — set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. `components/AnalyticsGate.tsx` shows a cookie banner and only loads `@next/third-parties`' `GoogleAnalytics` component after a visitor accepts. Custom events already firing: `book_click`, `checkout_start`, `booking_complete`, `contact_submit` (see `lib/analytics.ts`).

**Search Console** — set `NEXT_PUBLIC_GSC_VERIFICATION`; the meta tag is injected in `app/layout.tsx`. `sitemap.xml`/`robots.txt` are generated at build time by `next-sitemap` (config in `next-sitemap.config.js`).

**Email** — set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. The contact form (`/api/contact`) and newsletter signup (`/api/newsletter`) both call the Resend REST API directly; without a key they log to the server console instead of failing.

## Adding the hero video

Drop an optimized MP4 (and optionally a WebM) at:

```
public/media/hero.mp4
public/media/hero.webm
public/media/hero-poster.jpg
```

`components/VideoHero.tsx` already points at those paths. Until a real clip is added, the hero shows a tasteful brand-gradient fallback instead of a broken video, so the section always looks finished.

## Design system

Tokens live as CSS custom properties in `app/globals.css` (and are mirrored into Tailwind's `@theme` block for utility classes like `bg-cream` or `text-mauve`). Fonts are Cormorant Garamond (display) and Jost (body), self-hosted via `next/font`. Motion primitives — `Reveal`, `Magnetic`, `Cursor`, `SmoothScrollProvider`, `ScrollProgress` — all respect `prefers-reduced-motion`.

## Deploying

**Vercel** (recommended) — push to a repo and import it in Vercel; set the environment variables above in the project settings.

**Docker** — a `Dockerfile` is included for portability:

```bash
docker build -t body-awakening .
docker run -p 3120:3120 --env-file .env.local body-awakening
```
