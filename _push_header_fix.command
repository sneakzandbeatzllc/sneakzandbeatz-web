#!/bin/bash
# Double-click to push the Header /beatstore → /beats 404 fix.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add src/components/Header.tsx _push_header_fix.command

echo "→ Committing…"
git commit -m "Fix header Beat Store link: /beatstore → /beats (404 fix)

The Beat Store link in the main nav was pointing to /beatstore which
isn't a route — only /beats and /beats/[slug] exist. Anyone clicking
'Beat Store' in the header was hitting the Next.js 404 page. Repointed
to /beats. Browse Beats CTA in the same header was already correct."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild — 404 cleared in ~60s."
echo ""
read -p "Press enter to close…" _
