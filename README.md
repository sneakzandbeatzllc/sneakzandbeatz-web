# Sneakz & Beatz — Website (Next.js)

Production rebuild of sneakzandbeatz.com on Next.js 14 (App Router). Replaces the WordPress + Elementor site once we're ready to cut over DNS.

This is the Path B build from the redesign plan. The mockup at `Website_Redesign_Mockup.html` was converted into React components with a 1:1 CSS port so the visual is identical — the design system stays locked.

## Quick start

```bash
# from /Users/macstudiohomefolder/Desktop/SneakzAndBeatz_MASTER_OS/08_WEBSITE_NEXTJS

npm install
npm run dev
```

Open http://localhost:3000 — you should see the full mockup rendering.

Requires Node 18.17+ (recommended Node 20 LTS). Check yours with `node -v`. If you don't have Node, install it:
- via Homebrew: `brew install node@20`
- or download from nodejs.org

## What's wired up

- ✅ **Visual parity with the mockup.** Every section renders identically.
- ✅ **TypeScript strict mode.** Type-safe.
- ✅ **CSS variables for theming** in `src/app/globals.css`. Change one value, the brand updates everywhere.
- ✅ **Component structure** — each homepage section is its own React component in `src/components/`.
- ✅ **Trending ticker** reads from a `TRENDS_FALLBACK` array right now. To wire it to your SOC engine, replace the import in `src/components/TrendingTicker.tsx` with a fetch from `/api/trending` (route stub provided).

## What still needs wiring (next session)

These are stub functions in `src/lib/`. Each one is documented inline — it returns sample data right now so the site renders, but in production you swap the body for a real API call.

| File | Becomes | Owner |
|---|---|---|
| `src/lib/soc-engine.ts` | Server-side fetch from your SOC engine's `cycles.json` (the trending bar) | You / Claude (next session) |
| `src/lib/substack.ts` | Substack subscribe POST handler | You / Substack publication first |
| `src/lib/beatstars.ts` | Beatstars storefront embed config | You — needs a Beatstars producer account |
| `src/lib/instagram.ts` | IG Graph API client for the "From the Culture" grid | You / Claude (you already have IG Graph wired) |

When you're ready to wire each one, ping me and I'll do it.

## Deployment to Vercel (when ready)

```bash
# 1. Commit the project to a new GitHub repo
cd /Users/macstudiohomefolder/Desktop/SneakzAndBeatz_MASTER_OS/08_WEBSITE_NEXTJS
git init
git add .
git commit -m "Initial Next.js scaffold — Sneakz & Beatz redesign"
gh repo create sneakzandbeatz-web --public --source=. --push
# (or push to a private repo via the GitHub web UI)

# 2. Connect the repo to Vercel
# Visit https://vercel.com/new, "Import" the repo. Vercel auto-detects Next.js.
# Click Deploy. ~90 seconds later you have a *.vercel.app URL.

# 3. Point sneakzandbeatz.com at Vercel
# In Vercel dashboard → your project → Domains → add sneakzandbeatz.com.
# Vercel gives you DNS records (an A record or CNAME). Copy them into your
# domain registrar (whoever sold you the .com) → DNS settings.
# Propagation: minutes to hours.

# 4. Decommission the WordPress site
# Once the Vercel deployment is live on sneakzandbeatz.com, the WP site at
# the old hosting becomes dormant. Don't delete immediately — keep it running
# 30 days as a fallback while you confirm nothing broke.
```

## Project layout

```
08_WEBSITE_NEXTJS/
├── README.md                    ← you are here
├── package.json                 ← deps + scripts
├── next.config.mjs              ← Next.js config (minimal)
├── tsconfig.json                ← TypeScript config
├── .gitignore
├── public/                      ← static assets (photos go here in production)
│   └── .gitkeep
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← root layout (loads fonts + globals)
│   │   ├── page.tsx             ← homepage (composes all sections)
│   │   └── globals.css          ← design tokens + every section's CSS
│   ├── components/
│   │   ├── Header.tsx           ← sticky nav
│   │   ├── Hero.tsx             ← hero with collide-headline + dual CTA
│   │   ├── TrendingTicker.tsx   ← red ticker bar (reads SOC engine trends)
│   │   ├── PillarsGrid.tsx      ← 4-pillar cards
│   │   ├── PHRHXShow.tsx        ← featured episode + 3 thumbnails
│   │   ├── BeatStore.tsx        ← 3 beat cards + bundle/funnel card
│   │   ├── Newsletter.tsx       ← Substack subscribe section
│   │   ├── FromTheCulture.tsx   ← IG grid placeholder
│   │   └── Footer.tsx           ← tri-section footer
│   └── lib/
│       ├── soc-engine.ts        ← stub: SOC engine trends fetch
│       ├── substack.ts          ← stub: Substack subscribe
│       ├── beatstars.ts         ← stub: Beatstars catalog
│       └── instagram.ts         ← stub: IG Graph media
```

## Why Next.js (not WP / Elementor)

| Metric | Current WP site | This Next.js build |
|---|---|---|
| First Contentful Paint | 11.1 s (audited 4/27) | < 1.5 s (typical Vercel + ISR) |
| SEO meta + OG tags | Default WP | Per-page programmatic, full control |
| Integration cost (Substack, Beatstars, IG Graph, SOC engine) | Plugin per integration | Direct fetch in components, no plugin layer |
| Performance over time | Degrades as plugins accumulate | Stays fast — render is server-controlled |

Path A (refactor existing Elementor site) was an option. Path B (this) is what makes the $800k/mo revenue plan actually deliverable — performance + SEO + clean integrations for the supporting layers.

## Brand tokens (edit once, reflects everywhere)

In `src/app/globals.css`:

```css
:root {
  --bg:        #0a0a0a;     /* page background */
  --surface:   #141414;     /* section backgrounds */
  --card:      #1a1a1a;     /* cards */
  --line:      #262626;     /* borders */
  --muted:     #8a8a8a;     /* tertiary text */
  --text:      #e7e7e7;     /* body text */
  --text-soft: #b9b9b9;     /* secondary text */
  --accent:    #e51e2a;     /* AJ Chicago red */
  --accent-2:  #b3151f;     /* hover red */
  --highlight: #ffffff;     /* headlines */
}
```

Change `--accent` and the entire site re-themes.

## License / authoring

Built by Claude (Cowork mode) on 2026-04-27 against the redesign mockup. Brand and content © Sneakz & Beatz LLC.
