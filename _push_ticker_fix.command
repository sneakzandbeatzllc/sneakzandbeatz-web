#!/bin/bash
# Double-click to push the ticker-quality fix to GitHub.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging soc-engine.ts + this script…"
git add src/lib/soc-engine.ts _push_ticker_fix.command

echo "→ Committing…"
git commit -m "Trending ticker: replace IGN, add deal/gift-guide denylist

Problem: IGN's all-feed includes deals + Mother's Day gift guides +
Amazon affiliate listicles which leaked into the homepage trending bar
('% Off Anker SOLIX', 'Mother's Day Gift for a Crafty Mom', etc).
Way off-brand for a sneakers/hip-hop/anime/gaming culture site.

Fix:
- Replaced IGN with Polygon + Kotaku for gaming (editorial only).
- Doubled feed coverage to 8 sources, 2 per pillar:
  Sneakers — Hypebeast Footwear + Sneaker News.
  Hip-Hop — HipHopDX + XXL.
  Anime — Anime News Network + Crunchyroll.
  Gaming — Polygon + Kotaku.
- Added TITLE_DENYLIST regex array that drops any item with: deal/deals,
  N% off, save \$X, gift idea/guide, Mother's/Father's/Valentine's Day,
  Black Friday, Cyber Monday, Prime Day, discount, coupon, Best Buy,
  Amazon Prime, affordable, under \$X, cheapest, sponsored, promo code.
- Pull 10 items per feed, filter denylist, then trim to ITEMS_PER_FEED.
  So a feed whose first items are commerce junk still contributes its
  real editorial pieces."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild in ~30-90s."
echo ""
read -p "Press enter to close…" _
