import Link from "next/link";
import { LANE_ESSAYS } from "@/data/lane-essays";

const PILLAR_LABEL: Record<string, string> = {
  sneakers: "Sneakers",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

// Fallback cover per pillar when an article has no hero image yet (operator
// drops real shoe pics later → heroImage overrides this).
const PILLAR_FALLBACK: Record<string, string> = {
  sneakers: "/photos/pillars/sneakers.webp",
  hiphop: "/photos/pillars/hiphop.jpg",
  anime: "/photos/pillars/anime.png",
  gaming: "/photos/pillars/gaming.webp",
};

/**
 * LaneFeedHome — homepage feed of OUR articles, styled like the "No aisles.
 * One rack." stream (reuses the .feedv3 grid: big hero card + mediums +
 * smalls, large image thumbnails with overlaid title). Only pillar-tagged
 * articles the desk writes appear here; cornerstone essays are excluded.
 */
export default function LaneFeedHome() {
  const articles = [...LANE_ESSAYS]
    .filter((e) => e.pillar)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 5);

  if (articles.length === 0) return null;

  const sizes = ["c-lg", "c-md", "c-md", "c-sm", "c-sm"];

  return (
    <section className="feedv3">
      <div className="container">
        <div className="feedv3-head">
          <h2 className="display">Latest articles.</h2>
          <span className="feedv3-sub">
            Written by PHRHX &amp; the Sneakz desk — every one ours. New drops daily.
          </span>
        </div>
        <div className="feedv3-stream">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              className={`feedv3-card ${sizes[i] ?? "c-sm"}`}
              href={`/the-lane/${a.slug}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  a.heroImage ||
                  PILLAR_FALLBACK[a.pillar as string] ||
                  "/photos/pillars/sneakers.webp"
                }
                alt=""
                loading="lazy"
              />
              <span className="feedv3-in">
                <small>{PILLAR_LABEL[a.pillar as string] ?? "The Lane"}</small>
                <h3>{a.title}</h3>
                <em>
                  {a.heroCredit ? `Photo: ${a.heroCredit}` : "Sneakz & Beatz"} ·{" "}
                  {new Date(a.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </em>
              </span>
            </Link>
          ))}
          <Link className="feedv3-card c-sm feedv3-house" href="/the-lane">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/sb-studio-keys.jpg" alt="" loading="lazy" />
            <span className="feedv3-in">
              <small>The Lane</small>
              <h3>All articles — the full desk</h3>
              <em>Sneakz &amp; Beatz · editorial</em>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
