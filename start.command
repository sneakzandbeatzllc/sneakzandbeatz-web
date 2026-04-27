#!/usr/bin/env bash
# start.command — one-click launcher for the Sneakz & Beatz Next.js dev server.
# Double-click in Finder. First run installs dependencies (~60-90s), subsequent
# runs jump straight to the dev server. Auto-opens http://localhost:3000 in
# your default browser once the server is ready.

set -e
cd "$(dirname "$0")"

clear
echo "===================================================="
echo "  Sneakz & Beatz — Next.js dev server"
echo "===================================================="
echo

# --- Node check ---------------------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  echo "✗  Node.js is not installed on this Mac."
  echo
  echo "   Install it one of these ways, then run this script again:"
  echo
  echo "   • Homebrew (recommended):"
  echo "       brew install node@20"
  echo
  echo "   • Or download the installer from:"
  echo "       https://nodejs.org/en/download"
  echo
  echo "   Once installed, double-click this file again."
  echo
  read -p "Press enter to close..."
  exit 1
fi

NODE_VER=$(node --version)
echo "✓  Node $NODE_VER detected"
echo

# --- Dependency install (idempotent) -----------------------------------------
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
  echo "==> First run — installing dependencies. This takes 60-90 seconds."
  echo
  npm install
  echo
  echo "✓  Dependencies installed."
  echo
fi

# --- Auto-open browser once server is up -------------------------------------
# Backgrounds an `open` command that fires after Next.js has had time to
# boot. If port 3000 is already in use, Next.js will pick 3001 — adjust here
# if you want a different default.
(
  for i in {1..30}; do
    sleep 1
    if curl -s --max-time 1 http://localhost:3000 >/dev/null 2>&1; then
      open http://localhost:3000
      exit 0
    fi
  done
) &

echo "==> Starting dev server..."
echo "    Open http://localhost:3000  (will auto-launch in your browser)"
echo "    Press Ctrl+C in this window to stop the server."
echo
exec npm run dev
