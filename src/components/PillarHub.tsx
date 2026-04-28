import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { fetchSubstackPostsForPillar, type SubstackPost } from "@/lib/substack";

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
