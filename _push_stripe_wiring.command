#!/bin/bash
# Double-click this file to commit + push the Stripe wiring + lease agreements.
# Vercel will auto-deploy when GitHub receives the push.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging changes…"
git add \
  src/data/stripe-links.ts \
  src/app/beats/'[slug]'/page.tsx \
  src/app/beats/bundles/page.tsx \
  src/app/beats/page.tsx \
  src/app/globals.css \
  src/app/licensing/page.tsx \
  _push_homepage_fixes.command \
  _push_stripe_wiring.command

echo "→ Committing…"
git commit -m "Stripe wiring + bundle promo + lease agreements

- New src/data/stripe-links.ts — central registry of all 4 live Stripe
  Checkout URLs (Starter, Standard, Exclusive, shared Beat Lease).
  buildBeatLeaseUrl(slug) appends client_reference_id so we know which
  beat a lease checkout was for.
- Bundles page: mailto: ctaHref values replaced with real STRIPE_LINKS.
- Beat detail page: mailto: lease button replaced with shared Beat Lease
  Stripe URL plus the beat's slug as client_reference_id. Stream caps
  bumped to 100K to match licensing. Added 'Read full lease terms' link.
- /beats: added bundle promo banner above the catalog showing per-beat
  math (100 beats / \$79 = \$0.79 each) with anchor pricing.
- /licensing: replaced ComingSoon with a full, detailed lease agreement
  page. Three-tier compare table, full per-tier terms, plus 11 universal
  sections covering ownership, splits, caps, uses, refunds, governing
  law, and acceptance.
- globals.css: .bundle-promo, .beat-detail-checkout-note, full /licensing
  page styles."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild in ~30-90s."
echo "  Check: https://vercel.com/sneakzandbeatzllc/sneakzandbeatz-web"
echo ""
read -p "Press enter to close…" _
