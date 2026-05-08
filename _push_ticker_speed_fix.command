#!/bin/bash
# Slow the trending ticker so it's actually readable.
# Stash-aware so it doesn't bail on unstaged work.

set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Pre-flight typecheck…"
if command -v npx >/dev/null 2>&1; then
  npx --no-install tsc --noEmit || {
    echo "✗ tsc failed. Aborting."
    read -p "Press enter to close…" _
    exit 1
  }
fi

echo "→ Staging the two ticker files explicitly…"
git add src/components/TrendingTicker.tsx src/app/globals.css _push_ticker_speed_fix.command

# Stash anything else still unstaged so the rebase is clean.
STASHED=0
if ! git diff --quiet || git ls-files --others --exclude-standard | grep -q .; then
  echo "→ Stashing other unstaged work…"
  git stash push --keep-index --include-untracked -m "auto-stash before ticker-speed push" || true
  STASHED=1
fi

echo "→ Committing…"
git commit -m "fix(ticker): scale duration to item count + pause on hover

The trending ticker was scrolling at ~272 px/sec with 32 drops in the
feed (80s duration over a ~21,800px doubled track). Anything over
~120 px/sec is unreadable.

- TrendingTicker.tsx now sets --ticker-duration inline based on item
  count (≈7s per item, floored at 120s, capped at 600s).
- globals.css uses var(--ticker-duration, 240s) instead of hardcoded
  80s, and pauses the animation when the ticker is hovered so readers
  can read a headline that catches their eye and click through.

Net: 32 items now scroll at ~97 px/sec — readable, and the speed
stays sane as drops are added or removed."

echo "→ Pulling remote (rebase)…"
git pull --rebase origin main

echo "→ Pushing…"
git push origin main

if [ "$STASHED" = "1" ]; then
  echo "→ Restoring stash…"
  git stash pop || {
    echo "⚠ Stash pop conflict. Run 'git status' to fix; your work is in 'git stash list'."
    read -p "Press enter to close…" _
    exit 1
  }
fi

echo ""
echo "✓ Pushed. Vercel will redeploy. Refresh the site in ~60s."
echo ""
read -p "Press enter to close…" _
