#!/bin/bash
# Push the SOC-cycles-as-content wiring + new pillar payloads + 4 seed Substack drafts.
set -e
cd "$(dirname "$0")"

echo "→ Clearing stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add \
  src/lib/soc-cycles.ts \
  src/components/PillarHub.tsx \
  src/components/FromTheCulture.tsx \
  src/app/globals.css \
  public/ticker.json \
  public/pillar-sneakers.json \
  public/pillar-hiphop.json \
  public/pillar-anime.json \
  public/pillar-gaming.json \
  public/culture-mix.json \
  _push_pillar_drops.command

echo "→ Committing…"
git commit -m "Wire SOC engine cycles into pillar pages + homepage fallback

The site was 'fresh paint over a wireframe' — beautiful shell, no
editorial heartbeat. The SOC engine has been generating ranked cultural
trends every morning and writing them to ticker.json, but only the
trending bar consumed that data. Pillar pages had empty stubs.

Now:

build_site_payload.py (07_AUTOMATION_OS) extends to write 4 per-pillar
JSONs and a culture-mix.json:
  public/pillar-sneakers.json — top 9 ranked sneaker drops
  public/pillar-hiphop.json   — top 9 ranked hip-hop trends
  public/pillar-anime.json    — top 9 ranked anime stories
  public/pillar-gaming.json   — top 9 ranked gaming releases
  public/culture-mix.json     — cross-pillar top-6 for homepage fallback

Each card has title, source URL, SOC score, and an editorial excerpt
(extracted from the variant_generator's caption — it's already real
~150 character copy).

src/lib/soc-cycles.ts — new fetcher reading those payloads with 5-min
ISR + 36h staleness guard.

PillarHub.tsx — new 'Today's Drops' section between What We Cover and
the Newsletter. Renders the SOC cycles as article cards with score
badges, titles, excerpts, and source links. Section auto-hides when
the matching pillar payload is empty.

FromTheCulture.tsx — when Substack has fewer than 4 posts (it currently
has 1), falls back to merging Substack posts + SOC culture-mix cycles.
Section never goes empty again.

globals.css — new .pillar-drops* style block (3-col grid, hover lift,
score-badge pill, line-clamped excerpts).

Plus 4 seed Substack articles in 00_RAYMOND_PERSONAL/Substack_Drafts/
ready to copy-paste-and-publish. One per pillar, 400-500 words each,
operator-perspective voice tied to current trends. README explains
publishing flow + voice guidelines."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel rebuilds in ~60s. Pillar pages now show real cards."
echo ""
echo "Next: open 00_RAYMOND_PERSONAL/Substack_Drafts/ to see the 4 seed articles."
echo ""
read -p "Press enter to close…" _
