#!/bin/bash
# Push the audit MEDIUM fixes: Substack RSS reader, /rap-challenge, beats shuffle, pillar pages.
set -e
cd "$(dirname "$0")"

echo "→ Clearing stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add \
  src/lib/substack.ts \
  src/components/FromTheCulture.tsx \
  src/components/PillarHub.tsx \
  src/data/beats.ts \
  src/app/beats/page.tsx \
  src/app/sneakers/page.tsx \
  src/app/hiphop/page.tsx \
  src/app/anime/page.tsx \
  src/app/gaming/page.tsx \
  src/app/rap-challenge/page.tsx \
  src/app/globals.css \
  _push_audit_medium_fixes.command

echo "→ Committing…"
git commit -m "Audit MEDIUM fixes: Substack RSS, rap challenge, beats shuffle

Substack RSS:
- New src/lib/substack.ts — fetches sneakzandbeatz.substack.com/feed,
  parses posts, auto-detects pillar from tags + title keywords. ISR
  revalidate 5 min.
- FromTheCulture.tsx — replaced 6 empty placeholder cards with actual
  Substack post cards. Section auto-hides when feed is empty (currently
  only 1 post live, will populate as posts publish).
- PillarHub.tsx — pillar pages now show 3 most-recent matching Substack
  posts in 'Latest From The Newsletter' section. Falls back to the old
  subscribe-CTA stub when no posts match the pillar.
- All four pillar pages updated to pass pillarKey for filtering.

/rap-challenge:
- New /rap-challenge landing page for the \$10K Rap Challenge campaign
  (referenced in Instagram bio). Hero, 4-step how-it-works, prize pool
  (1st \$10K + exclusive license + PHRHX Show interview, 2nd-3rd cash +
  bundle for life, top 25 producer credit on cypher tape), bundle hook
  (buy bundle = entry waived), 7-item FAQ, dual waitlist signup forms
  posting to Substack subscribe endpoint. Built as waitlist pre-launch
  to validate demand + capture emails before committing the prize pool.

/beats shuffle:
- New getBeatsForDisplay() helper in src/data/beats.ts that round-robin
  interleaves beats by category (East Coast → Trap → West Coast → Rage
  → Free → repeat) so the unfiltered catalog opens with variety instead
  of 16 East Coast beats in a row. /beats/page.tsx uses the helper.
- Comment in code flagging the future swap for sort-by-releasedAt-desc
  when each beat gets a release date.

Styles:
- New .rap-* style block for /rap-challenge (hero with radial gradient,
  step cards, prize table with winner highlight, bundle promo band,
  waitlist signup form).
- New .pillar-posts-grid + .pillar-post-card for newsletter sections.
- New .culture-tile-img + .culture-tile-tag + .culture-followline for
  the upgraded From The Culture homepage block."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel rebuilds — live in ~60s."
echo ""
read -p "Press enter to close…" _
