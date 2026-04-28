#!/bin/bash
# Double-click to push the 7 fleshed-out pages + new /get-100-beats funnel.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add \
  src/components/PillarHub.tsx \
  src/components/BeatStore.tsx \
  src/app/sneakers/page.tsx \
  src/app/hiphop/page.tsx \
  src/app/anime/page.tsx \
  src/app/gaming/page.tsx \
  src/app/about/page.tsx \
  src/app/show/page.tsx \
  src/app/producer-kits/page.tsx \
  src/app/get-100-beats/page.tsx \
  src/app/globals.css \
  _push_pillar_pages.command

echo "→ Committing…"
git commit -m "Replace 7 ComingSoon stubs + add /get-100-beats sales funnel

Pages built out from ComingSoon stubs:

- /sneakers — Pillar 01 hub: drop reports, retro returns, heat checks
- /hiphop — Pillar 02 hub: new music, scene reports, producer spotlights
- /anime — Pillar 03 hub: releases, manga, hip-hop crossover
- /gaming — Pillar 04 hub: releases, patches, indies + crossover
- /about — Founder story (PHRHX), brand mission, four pillars, what we
  operate, the company (BRMG LLC), how to reach each topic-specific inbox
- /show — The PHRHX Show landing: where to listen, recent episodes (last
  6), guest pitch flow via booking@, sponsor flow via partnerships@
- /producer-kits — BRMG drum kit + sample pack listing, 4 kit cards,
  available-via-bundle path, custom-kit inquiry route

New page:

- /get-100-beats — single-product sales funnel for the Standard Bundle
  (\$79). Hard-sell layout with hero, problem agitation, what's included
  (9 checkmarks), value stack table summing to \$2,500 vs. \$79 today,
  30-day guarantee callout, FAQ accordion, final CTA. Homepage Beat Store
  bundle promo card now routes here instead of /beats/bundles. The 3-tier
  compare page (/beats/bundles) still exists for users who want to see
  Starter / Standard / Exclusive side-by-side.

Components:

- New PillarHub.tsx — reusable pillar-page layout used by all 4 culture
  pages so they share consistent header, covers grid, and newsletter CTA.

Styles:

- .pillar-* styles for the 4 culture pages (covers grid, newsletter
  block)
- .show-episodes + .show-episode card styles for /show
- .funnel-* styles for /get-100-beats (hero with radial gradient, value
  stack table, problem cards, guarantee callout)
- All mobile-responsive."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild — should be live in ~60s."
echo ""
read -p "Press enter to close…" _
