#!/bin/bash
# Double-click to push the social-link audit fixes.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add \
  src/data/social.ts \
  src/components/Footer.tsx \
  src/components/FromTheCulture.tsx \
  src/app/show/page.tsx \
  _push_social_link_fix.command

echo "→ Committing…"
git commit -m "Fix every social link on the site (audit punch list HIGH 1-7)

Audit found that 4 of 5 footer social links + the homepage IG link +
the /show YouTube links were all pointing at @SneakzandBeatz, which
isn't the actual handle on most platforms (canonical was taken or
locked). Real handles:
  IG       — @sneakz_beatz (underscore)
  TikTok   — @SneakzandBeatzOfficial (added 'Official')
  X        — @sneakzandbeatz (got the canonical)
  YouTube  — channel UCtVh1hqxxEj7dfQlv7bOEZw ('The PHRHX Show')
  Threads  — reserved for S&B Girls UGC roster, not yet live

Changes:
- New src/data/social.ts — single source of truth, like contact-emails.
  All links + handles + labels in one place; rename now happens in 1 file.
- Footer.tsx — pulls from SOCIAL registry, drops the broken Threads icon
  (will re-add when S&B Girls launches).
- FromTheCulture.tsx — homepage 'Follow on Instagram' link now points at
  /sneakz_beatz with the right handle text.
- /show — both 'Watch on YouTube' button and 'Where to listen' link now
  point at the channel-ID URL (more stable than @ handles, which YT can
  reassign)."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild — links live in ~60s."
echo ""
read -p "Press enter to close…" _
