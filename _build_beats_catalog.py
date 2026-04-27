#!/usr/bin/env python3
"""
_build_beats_catalog.py

Walks the 96 mastered beats in BRMG/Production/MASTERED BEATS, extracts metadata
(title, BPM, category), converts each WAV to a 60-second 96kbps stereo MP3
preview saved into 08_WEBSITE_NEXTJS/public/beats/audio/, and writes a typed
TypeScript catalog to src/data/beats.ts.

Idempotent — skips MP3 conversions that already exist (so you can re-run the
script after adding new beats and only the new ones get converted).

Usage:
    python3 _build_beats_catalog.py
    python3 _build_beats_catalog.py --force      # reconvert even existing MP3s
    python3 _build_beats_catalog.py --dry-run    # parse and print plan, no writes
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from dataclasses import dataclass, asdict
from pathlib import Path

# ---------- paths ------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
NEXT_PROJECT = SCRIPT_DIR
MASTER_OS_ROOT = SCRIPT_DIR.parent
SRC_DIR = MASTER_OS_ROOT / "BRMG" / "Production" / "MASTERED BEATS"
OUT_AUDIO_DIR = NEXT_PROJECT / "public" / "beats" / "audio"
OUT_TS_FILE = NEXT_PROJECT / "src" / "data" / "beats.ts"

# ---------- ffmpeg settings --------------------------------------------------

PREVIEW_DURATION_SEC = 60
PREVIEW_BITRATE = "96k"

# ---------- categorization ---------------------------------------------------

CATEGORY_MAP = {
    "EAST COAST BEATS": ("east-coast", "East Coast", "Boom-bap, lyrical, Brooklyn-leaning."),
    "WEST COAST BEATS": ("west-coast", "West Coast", "G-funk, hyphy, sun-soaked low-end."),
    "TRAP BEATS":       ("trap",       "Trap",       "Hi-hats, 808s, Atlanta-coded."),
    "RAGE BEATS":       ("rage",       "Rage",       "Carti-coded, distorted, mosh-ready."),
    "FREE BEATS":       ("free",       "Free Beats", "On the house. Email signup unlocks the download."),
}

# Pricing: free beats are $0 (gated by Substack signup), everything else $49.99 lease.
PRICE_PAID = 49.99
PRICE_FREE = 0.0


# ---------- helpers ----------------------------------------------------------


@dataclass
class Beat:
    id: str
    slug: str
    title: str
    category: str             # slug, e.g. "trap"
    categoryLabel: str        # human label
    bpm: int | None
    durationSec: float | None
    previewUrl: str           # /beats/audio/<slug>.mp3
    sourceWav: str            # absolute path on disk (not shipped to web)
    isFree: bool
    priceUSD: float
    fileSizeMb: float | None  # source WAV size for reference


_bpm_re = re.compile(r"(\d{2,3})\s*B?P?M\b", re.IGNORECASE)
_garbage_tokens = re.compile(
    r"(eMastered_|_HD|_FINAL|FINAL|MASTER|MASTERED|MIXED|mixed|HD|"
    r"\(Prod\.\s*@?BlkRoyalMG\)|\(Prod\..*?\))",
    re.IGNORECASE,
)
_strip_chars = re.compile(r"[^a-zA-Z0-9 \-]+")


def _slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    text = re.sub(r"-+", "-", text)
    return text[:80]


def _clean_title(filename_no_ext: str, bpm: int | None) -> str:
    s = filename_no_ext
    s = _garbage_tokens.sub(" ", s)
    if bpm is not None:
        s = re.sub(rf"\b{bpm}\s*B?P?M\b", " ", s, flags=re.IGNORECASE)
    s = s.replace("_", " ")
    s = _strip_chars.sub(" ", s)
    s = re.sub(r"\s+", " ", s).strip()
    # Title case looks cleaner in the catalog than ALL CAPS or mixed case
    s = s.title()
    # 'X' as the type-beat collab joiner gets prettified
    s = re.sub(r"\bX\b", "×", s)
    return s or filename_no_ext


def _extract_bpm(filename_no_ext: str) -> int | None:
    m = _bpm_re.search(filename_no_ext)
    if not m:
        return None
    try:
        n = int(m.group(1))
        if 50 <= n <= 220:
            return n
    except ValueError:
        pass
    return None


def _ffprobe_duration(path: Path) -> float | None:
    try:
        out = subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
            stderr=subprocess.DEVNULL,
        )
        return float(out.decode().strip())
    except Exception:
        return None


def _convert_to_mp3(src: Path, dest: Path, force: bool) -> bool:
    """Convert WAV to 60s mp3 preview at 96kbps stereo. Returns True if (re)converted."""
    if dest.exists() and not force:
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-i", str(src),
        "-t", str(PREVIEW_DURATION_SEC),
        "-vn",
        "-acodec", "libmp3lame",
        "-b:a", PREVIEW_BITRATE,
        "-ac", "2",   # stereo
        "-ar", "44100",
        str(dest),
    ]
    subprocess.check_call(cmd)
    return True


# ---------- main -------------------------------------------------------------


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--force", action="store_true", help="reconvert MP3s even if they exist")
    ap.add_argument("--dry-run", action="store_true", help="parse + print, don't convert or write")
    args = ap.parse_args()

    if not SRC_DIR.exists():
        print(f"ERROR: source dir not found: {SRC_DIR}", file=sys.stderr)
        return 2

    beats: list[Beat] = []
    seen_slugs: set[str] = set()
    converted_count = 0
    skipped_count = 0
    skipped_no_bpm = 0

    # Walk each category folder. Subfolders inside (e.g. RAW BEATS/MIX AND MASTERED)
    # are excluded — only direct .wav/.mp3/.m4a files in the 5 main category folders.
    for cat_folder in sorted(SRC_DIR.iterdir()):
        if not cat_folder.is_dir():
            continue
        cat_key = cat_folder.name.upper()
        if cat_key not in CATEGORY_MAP:
            print(f"  skip non-category folder: {cat_folder.name}")
            continue
        cat_slug, cat_label, _ = CATEGORY_MAP[cat_key]

        for f in sorted(cat_folder.iterdir()):
            if not f.is_file():
                continue
            ext = f.suffix.lower()
            if ext not in (".wav", ".mp3", ".m4a", ".aiff", ".flac"):
                continue
            stem = f.stem
            bpm = _extract_bpm(stem)
            title = _clean_title(stem, bpm)
            slug = _slugify(f"{cat_slug}-{title}")
            # Disambiguate collisions
            base_slug = slug
            n = 2
            while slug in seen_slugs:
                slug = f"{base_slug}-{n}"
                n += 1
            seen_slugs.add(slug)

            preview_filename = f"{slug}.mp3"
            preview_dest = OUT_AUDIO_DIR / preview_filename
            duration = _ffprobe_duration(f)
            file_size_mb = round(f.stat().st_size / (1024 * 1024), 2)

            is_free = cat_slug == "free"

            if not args.dry_run:
                try:
                    converted = _convert_to_mp3(f, preview_dest, force=args.force)
                    if converted:
                        converted_count += 1
                    else:
                        skipped_count += 1
                except subprocess.CalledProcessError as e:
                    print(f"  ✗ ffmpeg failed for {f.name}: {e}", file=sys.stderr)
                    continue

            beats.append(Beat(
                id=slug,
                slug=slug,
                title=title,
                category=cat_slug,
                categoryLabel=cat_label,
                bpm=bpm,
                durationSec=round(duration, 1) if duration else None,
                previewUrl=f"/beats/audio/{preview_filename}",
                sourceWav=str(f),
                isFree=is_free,
                priceUSD=PRICE_FREE if is_free else PRICE_PAID,
                fileSizeMb=file_size_mb,
            ))

            if bpm is None:
                skipped_no_bpm += 1

    # Sort: paid first by category-then-title, free last
    beats.sort(key=lambda b: (b.isFree, b.category, b.title))

    print(f"\nCatalog: {len(beats)} beats")
    print(f"  converted: {converted_count}")
    print(f"  skipped (mp3 already exists): {skipped_count}")
    print(f"  no BPM in filename: {skipped_no_bpm}")
    by_cat: dict[str, int] = {}
    for b in beats:
        by_cat[b.categoryLabel] = by_cat.get(b.categoryLabel, 0) + 1
    for k, v in sorted(by_cat.items()):
        print(f"    {k:14s} {v:>3d}")

    if args.dry_run:
        for b in beats[:5]:
            print(json.dumps(asdict(b), indent=2))
        print("(dry-run)")
        return 0

    # Write TypeScript catalog
    OUT_TS_FILE.parent.mkdir(parents=True, exist_ok=True)
    ts_lines: list[str] = []
    ts_lines.append("// AUTOGENERATED by _build_beats_catalog.py — do not hand-edit.")
    ts_lines.append("// Re-run that script (from 08_WEBSITE_NEXTJS/) to refresh.")
    ts_lines.append("")
    ts_lines.append("export type Beat = {")
    ts_lines.append("  id: string;")
    ts_lines.append("  slug: string;")
    ts_lines.append("  title: string;")
    ts_lines.append("  category: \"east-coast\" | \"west-coast\" | \"trap\" | \"rage\" | \"free\";")
    ts_lines.append("  categoryLabel: string;")
    ts_lines.append("  bpm: number | null;")
    ts_lines.append("  durationSec: number | null;")
    ts_lines.append("  previewUrl: string;")
    ts_lines.append("  isFree: boolean;")
    ts_lines.append("  priceUSD: number;")
    ts_lines.append("  fileSizeMb: number | null;")
    ts_lines.append("};")
    ts_lines.append("")
    ts_lines.append("export type BeatCategory = {")
    ts_lines.append("  slug: string;")
    ts_lines.append("  label: string;")
    ts_lines.append("  description: string;")
    ts_lines.append("};")
    ts_lines.append("")
    ts_lines.append("export const CATEGORIES: BeatCategory[] = [")
    for cat_key, (slug, label, desc) in CATEGORY_MAP.items():
        ts_lines.append(f"  {{ slug: \"{slug}\", label: \"{label}\", description: \"{desc}\" }},")
    ts_lines.append("];")
    ts_lines.append("")
    ts_lines.append("export const BEATS: Beat[] = [")
    for b in beats:
        d = asdict(b)
        d.pop("sourceWav", None)  # don't leak local filesystem paths to web bundle
        # Manually format so we get readable, consistent TS output
        ts_lines.append("  {")
        ts_lines.append(f"    id: {json.dumps(d['id'])},")
        ts_lines.append(f"    slug: {json.dumps(d['slug'])},")
        ts_lines.append(f"    title: {json.dumps(d['title'])},")
        ts_lines.append(f"    category: {json.dumps(d['category'])},")
        ts_lines.append(f"    categoryLabel: {json.dumps(d['categoryLabel'])},")
        ts_lines.append(f"    bpm: {('null' if d['bpm'] is None else d['bpm'])},")
        ts_lines.append(f"    durationSec: {('null' if d['durationSec'] is None else d['durationSec'])},")
        ts_lines.append(f"    previewUrl: {json.dumps(d['previewUrl'])},")
        ts_lines.append(f"    isFree: {'true' if d['isFree'] else 'false'},")
        ts_lines.append(f"    priceUSD: {d['priceUSD']},")
        ts_lines.append(f"    fileSizeMb: {('null' if d['fileSizeMb'] is None else d['fileSizeMb'])},")
        ts_lines.append("  },")
    ts_lines.append("];")
    ts_lines.append("")
    ts_lines.append("export function getBeatBySlug(slug: string): Beat | undefined {")
    ts_lines.append("  return BEATS.find(b => b.slug === slug);")
    ts_lines.append("}")
    ts_lines.append("")
    ts_lines.append("export function getBeatsByCategory(slug: string): Beat[] {")
    ts_lines.append("  return BEATS.filter(b => b.category === slug);")
    ts_lines.append("}")

    OUT_TS_FILE.write_text("\n".join(ts_lines))
    print(f"\nWrote: {OUT_TS_FILE}")
    print(f"Audio dir: {OUT_AUDIO_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
