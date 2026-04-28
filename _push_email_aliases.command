#!/bin/bash
# Double-click to push the email-alias wiring + new /press and /work-with-us pages.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add \
  src/data/contact-emails.ts \
  src/app/contact/page.tsx \
  src/app/privacy/page.tsx \
  src/app/terms/page.tsx \
  src/app/licensing/page.tsx \
  src/app/press/page.tsx \
  src/app/work-with-us/page.tsx \
  src/app/globals.css \
  _push_email_aliases.command

echo "→ Committing…"
git commit -m "Topic-specific email aliases + new /press, /work-with-us pages

User configured 10 alternate-email aliases on the Sneakz & Beatz Workspace
(support, info, privacy, terms, legal, dmca, press, licensing, booking,
partnerships) to triage inbound mail by topic. Wired the website to use
them everywhere a mailto link appears.

- New src/data/contact-emails.ts — single source of truth registry; pages
  import EMAILS.<key> and mailto(addr, subject) so any future alias
  rename happens in one file.
- /contact: 7 topic cards now route to the right alias each (support,
  licensing, press, partnerships, booking, privacy, legal, dmca).
- /privacy, /terms, /licensing: replaced catch-all gmail with
  privacy@/terms@/licensing@ + dmca@ for §9 takedown notices.
- New /press page: full press kit replacing the ComingSoon stub —
  boilerplate, quick facts, founder bio, story angles, brand assets,
  pull quotes, booking, past coverage placeholder.
- /work-with-us: replaced ComingSoon stub with real partnerships page —
  4 tracks (Sponsorships, Brand Partnerships, UGC Creators, Roles),
  audience snapshot, what-we-don't-do list. All cards route to
  partnerships@.
- globals.css: small .work-track-bullets style for the partnership
  card list.

Documentation: Business_Filings/02b_Sneakz_and_Beatz_LLC_CA/
Email_Aliases_Registry.md captures the full alias list, page→alias map,
compliance notes (CAN-SPAM, GDPR, DMCA), and setup history."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild — should be live in ~60s."
echo ""
read -p "Press enter to close…" _
