#!/bin/bash
# Double-click to push the SOC engine ↔ site wiring.
set -e
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks…"
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null || true

echo "→ Staging…"
git add \
  src/lib/soc-engine.ts \
  public/ticker.json \
  _push_soc_engine_wired.command

echo "→ Committing…"
git commit -m "Wire ticker to SOC engine payload (with RSS fallback)

Trending bar now reads /ticker.json first — the slim, scored, deduped
payload produced by the local SOC engine running on the operator's Mac
(cron'd daily at 6 AM PT via LaunchAgent). If the payload is missing,
malformed, empty, or older than 36 hours, the website falls back to
live RSS via the same 8-feed denylisted setup we shipped before.

This is Option 1 of the SOC engine integration plan:
  Mac LaunchAgent runs trend_ingest → soc_scorer → variant_generator →
  build_site_payload → git push, Vercel rebuilds.

- public/ticker.json is the seed payload from a local smoke run of the
  pipeline against today's RSS (5 scored cycles). Daily LaunchAgent
  refreshes this in place.
- soc-engine.ts now has a two-tier fetchTrending: tries the engine
  payload at /ticker.json (5-min ISR, age-filtered at 36h) and only
  falls back to direct RSS scraping if the engine hasn't pushed.
- All denylist + interleave logic on the engine side mirrors the
  website's denylist so the same junk is filtered in both places."

echo "→ Pushing to GitHub…"
git push origin main

echo ""
echo "✓ Pushed. Vercel will rebuild in ~60s."
echo ""
echo "Next: install the LaunchAgent so the Mac runs the engine daily."
echo "  Double-click: $(cd "$(dirname "$0")/.." && pwd)/07_AUTOMATION_OS/install_launch_agent.command"
echo ""
read -p "Press enter to close…" _
