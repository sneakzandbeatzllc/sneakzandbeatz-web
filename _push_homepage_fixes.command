#!/bin/bash
# Double-click this file to push the homepage data fixes to GitHub.
# Vercel will auto-deploy when GitHub receives the push.
set -e
cd "$(dirname "$0")"
echo "→ Pushing homepage data fixes (real catalog beats + live RSS trending + BRMG eyebrow)…"
git push origin main
echo ""
echo "✓ Pushed. Vercel will rebuild in ~30-90s."
echo "  Check: https://vercel.com/sneakzandbeatzllc/sneakzandbeatz-web"
echo ""
read -p "Press enter to close…" _
