#!/usr/bin/env bash
# Splits the 65MB beat-store commit into 5 smaller commits and pushes each.
# GitHub's HTTP timeout chokes on a single 65MB push but sails through
# ~10-15MB chunks. Each chunk push takes ~10s.
#
# Safe to re-run: skips chunks that don't have unstaged files.

set -e
cd "$(dirname "$0")"

echo "==> 1. Resetting the failed monolithic commit (keeps files on disk)..."
# If HEAD's last commit message includes 'Real beats store' OR '96 mastered tracks', undo it.
LAST_MSG=$(git log -1 --pretty=%B)
if echo "$LAST_MSG" | grep -qiE "96 mastered tracks|Real beats store"; then
  git reset --mixed HEAD~1
  echo "  ✓ Reset last commit. Files are unstaged but on disk."
else
  echo "  (last commit was not the failed beats commit; skipping reset)"
fi
echo

push_chunk() {
  local label="$1"
  shift
  local files=("$@")
  echo "==> Adding chunk: $label"
  local added_any=0
  for pat in "${files[@]}"; do
    # shellcheck disable=SC2086
    if compgen -G "$pat" > /dev/null; then
      git add $pat
      added_any=1
    fi
  done
  if [ "$added_any" -eq 0 ]; then
    echo "  (no files matched, skipping)"
    return 0
  fi
  if git diff --cached --quiet; then
    echo "  (nothing staged after add, skipping)"
    return 0
  fi
  git -c user.email="blackroyalmusicmedia@gmail.com" \
      -c user.name="Raymond Miller / PHRHX" \
      commit -m "Beats: $label"
  echo "  pushing..."
  git push
  echo "  ✓ $label pushed"
  echo
}

# Chunk 1: code only (fast, ~100KB)
push_chunk "catalog UI + data + routes" \
  "src/data/beats.ts" \
  "src/components/BeatCatalog.tsx" \
  "src/app/beats/page.tsx" \
  "src/app/beats/[slug]/page.tsx" \
  "_build_beats_catalog.py"

# Chunk 2: east coast + west coast + trap + rage (~25 tracks, ~18MB)
push_chunk "East/West Coast + Trap + Rage audio (~25 tracks)" \
  "public/beats/audio/east-coast-*.mp3" \
  "public/beats/audio/west-coast-*.mp3" \
  "public/beats/audio/trap-*.mp3" \
  "public/beats/audio/rage-*.mp3"

# Chunk 3: Free A-F (~12 tracks, ~9MB)
push_chunk "Free A-F audio" \
  "public/beats/audio/free-a*.mp3" \
  "public/beats/audio/free-b*.mp3" \
  "public/beats/audio/free-c*.mp3" \
  "public/beats/audio/free-d*.mp3" \
  "public/beats/audio/free-e*.mp3" \
  "public/beats/audio/free-f*.mp3"

# Chunk 4: Free G-N (~20 tracks, ~14MB)
push_chunk "Free G-N audio" \
  "public/beats/audio/free-g*.mp3" \
  "public/beats/audio/free-h*.mp3" \
  "public/beats/audio/free-i*.mp3" \
  "public/beats/audio/free-j*.mp3" \
  "public/beats/audio/free-k*.mp3" \
  "public/beats/audio/free-l*.mp3" \
  "public/beats/audio/free-m*.mp3" \
  "public/beats/audio/free-n*.mp3"

# Chunk 5: Free O-Z + anything left (catch-all)
push_chunk "Free O-Z audio + remaining" \
  "public/beats/audio/free-*.mp3"

echo "===================================="
echo "  ✓ ALL CHUNKS PUSHED."
echo "  Vercel will auto-rebuild now."
echo "===================================="
