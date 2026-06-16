/**
 * HomeV3.tsx — "Shop × Channel" homepage sections (2026-06 redesign).
 *
 * One room, one customer: boutique zones + broadcast spine. Every section
 * is wired to the existing systems — nothing here is static-only:
 *   · OnAirBar / ProgramGuide  → fetchYouTubeVideos (live channel RSS, cached)
 *   · TheFeedV3                → public/drops.json (SOC engine, 2-hour rebuild)
 *   · BeatLabV3 / AdBreak      → STRIPE_LINKS (live checkout)
 *   · MerchZone                → MERCH_PRODUCTS + MERCH_LAUNCH_DATE (merch.ts)
 *   · GirlsZone                → /creators application flow
 * All server components — zero client JS added.
 */

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { fetchYouTubeVideos, formatPublishedAgo } from "@/lib/youtube";
import { isBannedItem } from "@/lib/soc-engine";
import { STRIPE_LINKS } from "@/data/stripe-links";
import { MERCH_PRODUCTS, MERCH_LAUNCH_DATE } from "@/data/merch";
import SneakerOfTheDay from "./SneakerOfTheDay";

/* ---------------------------------------------------------------- drops */

type Pillar = "sneakers" | "hiphop" | "anime" | "gaming";

interface Drop {
  id: string;
  pillar: Pillar;
  title: string;
  source: string;
  source_url: string;
  thumbnail: string | null;
  relative_time: string;
  is_placeholder?: boolean;
}

const PILLAR_LABEL: Record<Pillar, string> = {
  sneakers: "Drop watch",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

const ZONE_FALLBACK: Record<Pillar, string> = {
  sneakers: "/photos/sb-urban-clothesline.jpg",
  hiphop: "/photos/sb-studio-keys.jpg",
  anime: "/photos/sb-neon-street.jpg",
  gaming: "/photos/sb-arcade-joystick.jpg",
};

function loadDrops(): Drop[] {
  try {
    const file = path.join(process.cwd(), "public", "drops.json");
    const payload = JSON.parse(fs.readFileSync(file, "utf-8"));
    const items: Drop[] = (payload.items ?? []).filter(
      (d: Drop) => !d.is_placeholder && !isBannedItem(d)
    );
    return items;
  } catch {
    return [];
  }
}

/** Best item per pillar, sneakers first — one rack, no aisles. */
function pickFeed(): Drop[] {
  const items = loadDrops();
  const order: Pillar[] = ["sneakers", "hiphop", "anime", "gaming"];
  const picked: Drop[] = [];
  for (const p of order) {
    const hit = items.find(
      (d) => d.pillar === p && !picked.some((x) => x.id === d.id)
    );
    if (hit) picked.push(hit);
  }
  // second sneakers item if available (Jordan-first editorial rule)
  const second = items.find(
    (d) => d.pillar === "sneakers" && !picked.some((x) => x.id === d.id)
  );
  if (second) picked.push(second);
  return picked;
}

/* ---------------------------------------------------------------- ON AIR */

export async function OnAirBar() {
  const [latest] = await fetchYouTubeVideos(undefined, 1);
  return (
    <div className="onairbar">
      <span className="onairbar-live">
        <i /> ON AIR
      </span>
      <a
        className="onairbar-now"
        href={latest ? latest.url : "/show"}
        target={latest ? "_blank" : undefined}
        rel={latest ? "noopener noreferrer" : undefined}
      >
        {latest
          ? `The PHRHX Show — “${latest.title}” · ${formatPublishedAgo(latest.publishedAt)}`
          : "The PHRHX Show — new episodes weekly"}
      </a>
    </div>
  );
}

/* ------------------------------------------------------------- ROOM HERO */

const ZONES = [
  { img: "/photos/sb-urban-clothesline.jpg", tag: "Sneakz of the Day", href: "/sneakers", span: true },
  { img: "/photos/sb-producer-monitors.jpg", tag: "The Beat Lab", href: "/beats" },
  { img: "/merch/girls-crop-pink-sb.jpg", tag: "S&B Girls", href: "/creators", pos: "center 28%" },
  { img: "/photos/pillars/gaming.webp", tag: "The Arcade Corner", href: "/gaming" },
  { img: "/the-frames-james-okoro.png", tag: "The Frames", href: "/anime" },
];

export function RoomHero() {
  return (
    <section className="roomhero">
      <div className="roomhero-bg" aria-hidden="true">
        {[
          "/photos/pillars/sneakers.webp",
          "/photos/pillars/hiphop.jpg",
          "/photos/pillars/anime.png",
          "/photos/pillars/gaming.webp",
        ].map((src) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={src} src={src} alt="" loading="eager" />
        ))}
      </div>
      <div className="container">
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ flex: "1 1 440px", minWidth: 300 }}>
        <span className="eyebrow">One shop · One customer · Your whole world</span>
        <h1 className="display roomhero-h1">
          Sneakz &amp; Beatz —<br />
          walk in. it&rsquo;s <em>all</em> here.
        </h1>
        <p className="roomhero-sub">
          Kicks on the wall. Beats in the back. Anime in the frames. A PS5
          that actually works. Built by one producer for the people who never
          had to pick a lane.
        </p>
        <div className="roomhero-ctas">
          <a href="/beats/bundles" className="btn btn-primary btn-arrow">
            Get The $79 Vault — 100 Beats
          </a>
          <a href="/show" className="btn-link">
            ▶ Watch The Show
          </a>
        </div>
        </div>
        <div style={{ flex: "0 0 300px", maxWidth: 320, width: "100%" }}>
          <SneakerOfTheDay />
        </div>
        </div>

        <div className="roomgrid">
          {ZONES.map((z) => (
            <Link
              key={z.tag}
              href={z.href}
              className={"roomzone" + (z.span ? " roomzone-tall" : "")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={z.img} alt={z.tag} loading="lazy" style={(z as { pos?: string }).pos ? { objectPosition: (z as { pos?: string }).pos } : undefined} />
              <span className="roomzone-tag">
                <b>●</b> {z.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- PROGRAM GUIDE */

export async function ProgramGuide() {
  const [latest] = await fetchYouTubeVideos(undefined, 1);
  const [topDrop] = pickFeed();
  const slots = [
    {
      k: "Now",
      h: latest ? latest.title : "The PHRHX Show",
      p: "Long-form · zero filter",
      href: latest ? latest.url : "/show",
      ext: !!latest,
    },
    {
      k: "Drop watch",
      h: topDrop ? topDrop.title : "This week's heat",
      p: topDrop ? `${topDrop.source} · ${topDrop.relative_time}` : "Calendar + sources",
      href: topDrop ? topDrop.source_url : "/sneakers",
      ext: !!topDrop,
    },
    {
      k: "In rotation",
      h: "100-beat Vault catalog",
      p: "Lease $34.99 · Vault $79",
      href: "/beats",
      ext: false,
    },
    {
      k: "Up next",
      h: "$10K Rap Challenge",
      p: "Waitlist open — 250 unlocks it",
      href: "/rap-challenge",
      ext: false,
    },
  ];
  return (
    <div className="pguide">
      <div className="container pguide-row">
        {slots.map((s) => (
          <a
            key={s.k}
            className="pguide-slot"
            href={s.href}
            target={s.ext ? "_blank" : undefined}
            rel={s.ext ? "noopener noreferrer" : undefined}
          >
            <small>{s.k}</small>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- THE FEED */

export function TheFeedV3() {
  const drops = pickFeed();
  const sizes = ["c-lg", "c-md", "c-md", "c-sm", "c-sm"];
  return (
    <section className="feedv3">
      <div className="container">
        <div className="feedv3-head">
          <h2 className="display">No aisles. One rack.</h2>
          <span className="feedv3-sub">
            Drops, beats, anime, gaming — one stream, the way your brain
            already holds it. Tap a card, we link you to the source.
          </span>
        </div>
        <div className="feedv3-stream">
          {drops.map((d, i) => (
            <a
              key={d.id}
              className={`feedv3-card ${sizes[i] ?? "c-sm"}`}
              href={d.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.thumbnail || ZONE_FALLBACK[d.pillar]}
                alt=""
                loading="lazy"
              />
              <span className="feedv3-in">
                <small>{PILLAR_LABEL[d.pillar]}</small>
                <h3>{d.title}</h3>
                <em>
                  {d.source} · {d.relative_time} ↗
                </em>
              </span>
            </a>
          ))}
          <Link className="feedv3-card c-sm feedv3-house" href="/rap-challenge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/sb-studio-keys.jpg" alt="" loading="lazy" />
            <span className="feedv3-in">
              <small>Challenge</small>
              <h3>$10K Rap Challenge — waitlist heating up</h3>
              <em>Sneakz &amp; Beatz · house rules</em>
            </span>
          </Link>
        </div>
        <p className="feedv3-disclaimer">
          Headlines link out to the original publishers. Sneakz &amp; Beatz
          aggregates the culture — we don&rsquo;t republish.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- BEAT LAB */

export function BeatLabV3() {
  return (
    <section className="beatlab">
      <div className="container beatlab-grid">
        <div className="beatlab-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/sb-producer-monitors.jpg" alt="The Beat Lab" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/beat-lab-promo.jpg"
            alt="The Vault — 100 mastered beats for $79"
            loading="lazy"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <span className="eyebrow">The back room · Beat Lab</span>
          <h2 className="display beatlab-h2">
            The shelf you
            <br />
            leave with.
          </h2>
          <p className="beatlab-p">
            100 mastered beats made in this room. Untagged WAVs, stems, drum
            kits — the same catalog the $10K Rap Challenge runs on. One
            license, one price, no aisle-hopping.
          </p>
          <div className="beatlab-price">
            <div>
              <span className="beatlab-n">$79</span>
              <small>The Vault · all 100 beats</small>
            </div>
            <a className="btn btn-primary" href={STRIPE_LINKS.standardBundle}>
              Unlock It
            </a>
          </div>
          <p className="beatlab-alt">
            Want one beat? <Link href="/beats">Browse the catalog</Link> —
            leases are $34.99.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- MERCH ZONE */

export function MerchZone() {
  const launch = new Date(MERCH_LAUNCH_DATE).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const HOME_ORDER = ["sb-hoodie", "sb-cap", "sb-snapback", "beats-crop-hoodie"];
  const products = MERCH_PRODUCTS.filter(
    (p) => p.status !== "draft" && p.imagePath
  )
    .sort((a, b) => HOME_ORDER.indexOf(a.slug) - HOME_ORDER.indexOf(b.slug))
    .slice(0, 4);
  return (
    <section className="merchzone">
      <div className="container">
        <span className="eyebrow">The front rack · Pre-orders open {launch}</span>
        <h2 className="display merchzone-h2">Match your fit to your Js.</h2>
        <p className="merchzone-p">
          Four pieces, eight colorways — every one built to pair with a
          specific Jordan Retro 1–17, head-to-toe. Reserve your colorway and
          get first crack 24 hours before public.
        </p>
        <div className="merchzone-grid">
          {products.map((p) => (
            <Link key={p.slug} href={`/merch#${p.slug}`} className="merchzone-card">
              <div className="merchzone-ph">
                {p.imagePath ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={p.imagePath} alt={p.name} loading="lazy" />
                ) : (
                  <span className="display">{p.type}</span>
                )}
              </div>
              <h3>{p.name}</h3>
              <div className="merchzone-pr display">${p.priceUSD}</div>
              <div className="merchzone-swatches">
                {p.colorways.slice(0, 4).map((c) => (
                  <i
                    key={c.slug}
                    title={c.name}
                    style={{
                      background: `linear-gradient(135deg, ${c.swatch.from}, ${c.swatch.to})`,
                    }}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="merchzone-cta">
          <Link className="btn btn-ghost" href="/merch">
            Reserve Your Colorway
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- S&B GIRLS */

export function GirlsZone() {
  return (
    <section className="girlszone">
      <div className="container girlszone-grid">
        <div>
          <span className="eyebrow">⚡ S&amp;B Girls · Contracted ambassadors · 18+</span>
          <h2 className="display girlszone-h2">
            We ship the fit.
            <br />
            You match the Js.
            <br />
            <em>You get the bag.</em>
          </h2>
          <p className="girlszone-p">
            Signed-contract retainer program. Monthly pay on the 1st via
            Stripe, merch ships free, matching Jordan retros. Honest launch
            retainers that scale as the program proves out.
          </p>
          <div className="girlszone-tiers">
            <div className="girlszone-tier">
              <span className="display">$500</span>
              <small>/month · Tier 1</small>
            </div>
            <div className="girlszone-tier">
              <span className="display">$750</span>
              <small>/month · Tier 2</small>
            </div>
            <div className="girlszone-tier">
              <span className="display">$1K</span>
              <small>/month · Tier 3</small>
            </div>
          </div>
          <Link className="btn btn-primary" href="/creators">
            Pull Up — Apply
          </Link>
          <p className="girlszone-fine">
            90/180-day terms · written agreement covers deliverables, content
            rights &amp; required FTC disclosures.
          </p>
        </div>
        <div className="girlszone-ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/merch/girls-crop-pink-sb.jpg" alt="S&B Girls creator program — beats. crop hoodie" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- COMMERCIAL BREAK */

export function AdBreak() {
  return (
    <section className="adbreak">
      <div className="container adbreak-grid">
        <div>
          <h2 className="display">The commercial break is us.</h2>
          <p>
            No sponsors interrupting your stream — just the Vault. 100
            mastered beats, WAVs, stems, kits. The catalog every challenge
            verse runs on.
          </p>
          <a className="btn adbreak-btn" href={STRIPE_LINKS.standardBundle}>
            Unlock The Vault — $79
          </a>
        </div>
        <div className="adbreak-price display">
          $79
          <small>One time · 100 beats</small>
        </div>
      </div>
    </section>
  );
}
