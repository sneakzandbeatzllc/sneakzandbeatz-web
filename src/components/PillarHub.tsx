import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import DropsFeed from "./DropsFeed";
import { fetchSubstackPostsForPillar, type SubstackPost } from "@/lib/substack";
import { jsonLd, pillarCollectionPage } from "@/lib/schema";
import { LANE_ESSAYS } from "@/data/lane-essays";

const SITE = "https://www.sneakzandbeatz.com";

// Map pillar key → human label for the schema's `pillarLabel` field.
const PILLAR_LABEL: Record<NonNullable<SubstackPost["pillar"]>, string> = {
  sneakers: "Sneakers",
  hiphop: "Hip-Hop",
  anime: "Anime",
  gaming: "Gaming",
};

export type PillarCard = {
  tag: string;       // chip label e.g. "Drop Reports"
  heading: string;   // card title
  body: string;      // short description
};

export type PillarCta = {
  label: string;
  href: string;
};

export type PillarHubProps = {
  /** "01 / Pillar" etc */
  pillarNumber: string;
  /** Big top-of-page name e.g. "SNEAKERS" */
  pillarName: string;
  /** Coloured second line e.g. "STREET CULTURE." */
  pillarTagline: string;
  /** 2-3 short paragraph lead */
  lead: string;
  /** "What we cover" cards (3 recommended) */
  covers: PillarCard[];
  /** Optional pillar-specific CTA buttons (max 2) */
  primaryCta?: PillarCta;
  secondaryCta?: PillarCta;
  /** Pillar key — used to fetch matching Substack posts. */
  pillarKey?: NonNullable<SubstackPost["pillar"]>;
  /** Optional pillar-specific section rendered after "What We Cover".
      Used by /hiphop to inject the tailored Beat Store + Bundle block. */
  extraSection?: React.ReactNode;
  /** Hide the "What We Cover" cards (e.g. /anime). Defaults to shown. */
  showCovers?: boolean;
};

export default async function PillarHub({
  pillarNumber,
  pillarName,
  pillarTagline,
  lead,
  covers,
  primaryCta = {
    label: "Subscribe On Substack",
    href: "https://sneakzandbeatz.substack.com",
  },
  secondaryCta,
  pillarKey,
  extraSection,
  showCovers = true,
}: PillarHubProps) {
  const posts = pillarKey ? await fetchSubstackPostsForPillar(pillarKey, 3) : [];
  const ctaIsExternal = primaryCta.href.startsWith("http");
  const pillarLabel = pillarKey ? PILLAR_LABEL[pillarKey] : pillarName;
  const pillarArticles = pillarKey ? LANE_ESSAYS.filter((e) => e.pillar === pillarKey) : [];
  return (
    <>
      {/* JSON-LD: CollectionPage schema. AI engines + Google use this to
          identify each pillar page as a curated collection under the
          Sneakz & Beatz Organization @id. */}
      {pillarKey && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(
            pillarCollectionPage({
              url: `${SITE}/${pillarKey}`,
              name: `${pillarLabel} — Sneakz & Beatz`,
              description: lead,
              pillarLabel,
            }),
          )}
        />
      )}
      <Header />

      <section className="container pillar-page">
        <header className="pillar-hero">
          <span className="eyebrow">{pillarNumber}</span>
          <h1 className="pillar-title">
            {pillarName}.
            <br />
            <span className="accent">{pillarTagline}</span>
          </h1>
          <p className="lead pillar-lead">{lead}</p>
          <div className="hero-ctas">
            <a
              href={primaryCta.href}
              target={ctaIsExternal ? "_blank" : undefined}
              rel={ctaIsExternal ? "noopener" : undefined}
              className="btn btn-primary btn-arrow"
            >
              {primaryCta.label}
            </a>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn-ghost btn-arrow">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </header>

        {pillarArticles.length > 0 && (
          <section className="pillar-covers">
            <h2 className="pillar-section-h">Latest {pillarLabel} Articles</h2>
            <div className="pillar-covers-grid">
              {pillarArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/the-lane/${a.slug}`}
                  className="pillar-cover-card"
                  style={{ textDecoration: "none" }}
                >
                  {a.heroImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.heroImage}
                      alt={a.title}
                      loading="lazy"
                      style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 12, marginBottom: 14 }}
                    />
                  )}
                  <span className="pillar-cover-tag">
                    {new Date(a.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="pillar-cover-h">{a.title}</h3>
                  <p className="pillar-cover-body">{a.subhead}</p>
                  {a.heroCredit && (
                    <span style={{ fontSize: "0.72rem", opacity: 0.5 }}>
                      Photo: {a.heroCredit}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
        {/* DropsFeed — Path A. Link aggregation across the pillar, sorted
            by SOC score, with outbound links to the original publishers.
            We don't republish — we curate the cultural pulse. */}
        {pillarKey && (
          <DropsFeed
            pillar={pillarKey}
            title={`What's dropping in ${pillarName.toLowerCase()}`}
            subtitle="Sourced from the publishers we trust most. Tap any card to read it at the source."
            limit={9}
          />
        )}

        {showCovers && (
          <section className="pillar-covers">
            <h2 className="pillar-section-h">What We Cover</h2>
            <div className="pillar-covers-grid">
              {covers.map((c, i) => (
                <article key={i} className="pillar-cover-card">
                  <span className="pillar-cover-tag">{c.tag}</span>
                  <h3 className="pillar-cover-h">{c.heading}</h3>
                  <p className="pillar-cover-body">{c.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Optional pillar-specific section (e.g. Hip-Hop's Beat Store + Bundle block) */}
        {extraSection}

        {/* Old "Today's Drops" cycles section removed — DropsFeed above
            covers that now with a better UX (thumbs + outbound links). */}

        <section className="pillar-newsletter">
          <h2 className="pillar-section-h">Latest From The Newsletter</h2>
          {posts.length > 0 ? (
            <>
              <div className="pillar-posts-grid">
                {posts.map((p) => (
                  <a
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="pillar-post-card"
                  >
                    {p.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.imageUrl}
                        alt={`${p.title} — ${pillarLabel}`}
                        className="pillar-post-img"
                      />
                    )}
                    <div className="pillar-post-body">
                      <h3 className="pillar-post-title">{p.title}</h3>
                      {p.excerpt && (
                        <p className="pillar-post-excerpt">{p.excerpt}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
              <a
                href="https://sneakzandbeatz.substack.com"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-arrow"
                style={{ marginTop: 24 }}
              >
                Read All On Substack
              </a>
            </>
          ) : (
            <>
              <p className="pillar-newsletter-sub">
                Daily drops covering this pillar live in the newsletter at{" "}
                <a
                  href="https://sneakzandbeatz.substack.com"
                  target="_blank"
                  rel="noopener"
                >
                  sneakzandbeatz.substack.com
                </a>
                . Subscribe to get them in your inbox the moment they publish.
              </p>
              <a
                href="https://sneakzandbeatz.substack.com"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-arrow"
              >
                Subscribe Free
              </a>
            </>
          )}
        </section>

      </section>

      <Footer />
    </>
  );
}

// PillarArticleThumb removed — replaced by DropsFeed (Path A).
