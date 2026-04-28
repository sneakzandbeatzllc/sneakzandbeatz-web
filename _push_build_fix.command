#!/bin/bash
# Double-click to push the Vercel build fix.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add src/app/licensing/page.tsx _push_build_fix.command

echo "→ Committing…"
git commit -m "Fix Vercel build: optional-chain sec.paragraphs in licensing page

Vercel deploys 0d0bdb7 + 39f35a1 both errored with TS18048
('sec.paragraphs is possibly undefined') in src/app/licensing/page.tsx.
The Lease tier's first section only has paragraphs, but Premium and
Exclusive tiers' first sections only have bullets — TypeScript
correctly inferred paragraphs as optional. Switched to optional
chaining (sec.paragraphs?.map) so missing-paragraphs sections render
just their bullets. Build now passes tsc --noEmit clean."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild — should succeed this time."
echo ""
read -p "Press enter to close…" _
