#!/usr/bin/env bash
# One-off script to unblock the Vercel deploy.
# - Forces git to use gh CLI (sneakzandbeatzllc identity) for github.com auth
# - Wipes the stale macOS keychain entry that's been pushing as the wrong user
# - Makes a fresh empty commit with a new SHA so Vercel sees something new to build
# - Pushes
# Safe to delete after one successful run.

set -e
cd "$(dirname "$0")"

echo "==> 1. Setting gh as git credential helper (single-quoted to dodge zsh history expansion)..."
git config --global 'credential.https://github.com.helper' '!gh auth git-credential'

echo
echo "==> 2. Erasing stale macOS Keychain credential for github.com..."
printf 'protocol=https\nhost=github.com\n\n' | git credential-osxkeychain erase 2>/dev/null || true

echo
echo "==> 3. Confirming git remote..."
git remote -v

echo
echo "==> 4. Empty commit with correct author identity (gives Vercel a new SHA)..."
git -c user.email="blackroyalmusicmedia@gmail.com" -c user.name="Raymond Miller / PHRHX" \
    commit --allow-empty -m "Rebuild trigger via sneakzandbeatzllc identity"

echo
echo "==> 5. Pushing..."
git push

echo
echo "===================================================="
echo "  PUSHED. New SHA on main."
echo "  Vercel will auto-trigger a fresh build in ~10s."
echo "===================================================="
