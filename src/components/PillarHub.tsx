import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { fetchSubstackPostsForPillar, type SubstackPost } from "@/lib/substack";
import { fetchPillarCycles } from "@/lib/soc-cycles";
import { getArticlesForPillar, formatPublished, type PillarKey, type ArticleIndexItem } from "@/lib/articles";

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
}: PillarHubProps) {
  const posts = pillarKey ? await fetchSubstackPostsForPillar(pillarKey, 3) : [];
  const cycles = pillarKey ? await fetchPillarCycles(pillarKey) : [];
  // Original AI-generated articles (Claude API → daily, one per pillar).
  // Surfaced ABOVE the SOC drops because these are S&B's actual editorial.
  const articles = pillarKey ? getArticlesForPillar(pillarKey as PillarKey, 6) : [];
  const ctaIsExternal = primaryCta.href.startsWith("http");
  return (
    <>
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

        {/* Articles FIRST — original S&B editorial, generated daily by
            article_generator.py. Per the engagement-first rule, fresh
            editorial sits above the static "What We Cover" section so
            the first scroll is something readers can click into. */}
        {articles.length > 0 ? (
          <section className="pillar-articles">
            <div className="pillar-drops-header">
              <h2 className="pillar-section-h">Latest Articles</h2>
              <span className="pillar-drops-meta">
                Original S&B editorial · refreshed daily 7 AM PT
              </span>
            </div>
            <div className="pillar-articles-grid">
              {articles.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.pillar}/${a.slug}`}
                  className={"pillar-article-card" + (i === 0 ? " pillar-article-card-feature" : "")}
                >
                  <PillarArticleThumb article={a} eager={i === 0} />
                  <div className="pillar-article-body">
                    <div className="pillar-article-meta">
                      <span className="pillar-article-date">{formatPublished(a.publishedAt)}</span>
                      {a.tags?.length > 0 && (
                        <span className="pillar-article-tag">{a.tags[0]}</span>
                      )}
                    </div>
                    <h3 className="pillar-article-headline">{a.headline}</h3>
                    {a.subhead && (
                      <p className="pillar-article-subhead">{a.subhead}</p>
                    )}
                    <span className="pillar-article-readmore">Read article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          // No articles yet — render a placeholder so the section still
          // exists visually instead of just disappearing. Drives a
          // newsletter signup while the pipeline catches up.
          <section className="pillar-articles">
            <div className="pillar-drops-header">
              <h2 className="pillar-section-h">Latest Articles</h2>
              <span className="pillar-drops-meta">
                Original S&B editorial · refreshed daily 7 AM PT
              </span>
            </div>
            <div className="pillar-articles-empty">
              <p>
                Fresh coverage on this pillar drops here every morning at 7 AM PT.
                Want it in your inbox the moment it publishes?
              </p>
              <a
                href="https://sneakzandbeatz.substack.com"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-arrow"
              >
                Subscribe On Substack
              </a>
            </div>
          </section>
        )}

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

        {/* Today's Drops — SOC engine output, refreshed daily at 6 AM PT */}
        {cycles.length > 0 && (
          <section className="pillar-drops">
            <div className="pillar-drops-header">
              <h2 className="pillar-section-h">Today&apos;s Drops</h2>
              <span className="pillar-drops-meta">
                Top {cycles.length} ranked by the SOC engine · refreshed daily
              </span>
            </div>
            <div className="pillar-drops-grid">
              {cycles.map((c) => (
                <a
                  key={c.url}
                  href={c.url}
                  target="_blank"
                  rel="noopener"
                  className="pillar-drop-card"
                >
                  <div className="pillar-drop-score-row">
                    <span className="pillar-drop-score">SOC {c.score.toFixed(2)}</span>
                  </div>
                  <h3 className="pillar-drop-title">{c.title}</h3>
                  {c.excerpt && (
                    <p className="pillar-drop-excerpt">{c.excerpt}</p>
                  )}
                  <span className="pillar-drop-source">Read source →</span>
                </a>
              ))}
            </div>
          </section>
        )}

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
                      <img src={p.imageUrl} alt="" className="pillar-post-img" />
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

/**
 * Pillar article thumbnail.
 * If the article has a real heroImage URL, render the <img>. Otherwise
 * render a pillar-themed CSS visual (gradient + pillar watermark + title
 * cue) so the card never ships with a blank rectangle. The fallback
 * looks designed, not broken.
 */
function PillarArticleThumb({
  article,
  eager,
}: {
  article: ArticleIndexItem;
  eager?: boolean;
}) {
  if (article.heroImage) {
    return (
      <div className="pillar-article-thumb">
        <img
          src={article.heroImage}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="pillar-article-thumb-img"
        />
        <span className="pillar-article-thumb-pillar">
          {article.pillar.toUpperCase()}
        </span>
      </div>
    );
  }
  // No real heroImage yet → render an ARTICLE-SPECIFIC fallback that
  // shows the article headline (not the pillar name) so the card is
  // about the article topic, not generic pillar branding. This is the
  // last-resort visual; the AI generator replaces it with a real
  // topic-specific Replicate Flux image when the generator runs.
  return (
    <div className={`pillar-article-thumb pillar-article-thumb-fallback pillar-article-thumb-${article.pillar}`}>
      <span className="pillar-article-thumb-headline">
        {article.headline}
      </span>
      <span className="pillar-article-thumb-pillar">
        {article.pillar.toUpperCase()}
      </span>
      <span className="pillar-article-thumb-image-pending">
        AI hero image pending
      </span>
    </div>
  );
}
