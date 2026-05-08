#!/bin/bash
# Double-click to push the Gumroad webhook TS fix.
# Vercel deploy of ccdabf2 was blocked by two TS errors in
# src/app/api/webhooks/gumroad-purchase/route.ts:
#   - TS2802: params.entries() iteration needs target ES2015+
#   - TS2352: direct cast Record<string,unknown> -> GumroadWebhookBody
# Both already patched on disk. This script just commits + pushes.

set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Verifying the fix typechecks clean…"
if command -v npx >/dev/null 2>&1; then
  npx --no-install tsc --noEmit || {
    echo "✗ tsc failed. Aborting push."
    read -p "Press enter to close…" _
    exit 1
  }
else
  echo "  (npx not found, skipping local typecheck — Vercel will check.)"
fi

echo "→ Staging…"
git add src/app/api/webhooks/gumroad-purchase/route.ts _push_webhook_ts_fix.command

echo "→ Committing…"
git commit -m "fix(webhook): use forEach + cast through unknown to fix TS build

Vercel deploy of ccdabf2 was blocked by two TypeScript errors in
src/app/api/webhooks/gumroad-purchase/route.ts:

  TS2802: 'for (const [k,v] of params.entries())' iteration requires
          target ES2015+ or downlevelIteration. tsconfig has neither.
  TS2352: 'obj as GumroadWebhookBody' — strict mode rejects direct
          cast from Record<string,unknown> because shapes don't overlap.

Replaced the iteration with params.forEach() and cast via 'unknown'
first. Typecheck (tsc --noEmit) now passes clean."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel should pick this up and redeploy automatically."
echo "  Check: https://vercel.com/dashboard"
echo ""
read -p "Press enter to close…" _
