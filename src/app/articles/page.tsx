import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getArticleIndex,
  formatPublished,
  type ArticleIndexItem,
  type PillarKey,
} from "@/lib/articles";

export const metadata = {
  title: "Articles",
  description:
    "Every Sneakz & Beatz article — sneakers, hip-hop, anime, gaming. Black-culture-first editorial coverage. Search by keyword or browse by pillar.",
  alternates: { canonical: "/articles" },
  openGraph: {
    url: "https://www.sneakzandbeatz.com/articles",
    title: "Articles — Sneakz & Beatz",
    description:
      "Every Sneakz & Beatz article. Sneakers, hip-hop, anime, gaming. Black-culture-first editorial coverage.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const PILLAR_LABELS: Record<PillarKey, { label: string; href: string }> = {
  sneakers: { label: "Sneakers", href: "/sneakers" },
  hiphop: { label: "Hip-Hop", href: "/hiphop" },
  anime: { label: "Anime", href: "/anime" },
  gaming: { label: "Gaming", href: "/gaming" },
};

// Cheap, deterministic substring filter. No external search dep — articles
// volume is small enough (<1000) for a linear scan to stay fast.
function filterArticles(items: ArticleIndexItem[], q: string): ArticleIndexItem[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return items;
  return items.filter((a) => {
    const hay = [
      a.headline,
      a.subhead,
      a.tldr,
      a.pillar,
      ...(a.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(needle);
  });
}

type SearchParams = Promise<{ q?: string; pillar?: string }>;

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", pillar: pillarFilter } = (await searchParams) || {};
  const all = getArticleIndex();
  const byPillar =
    pillarFilter && pillarFilter in PILLAR_LABELS
      ? all.filter((a) => a.pillar === pillarFilter)
      : all;
  const filtered = filterArticles(byPillar, q);

  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Articles · The Archive</span>
          <h1 className="legal-title">
            Every Sneakz &amp; Beatz Article.
            <br />
            <span className="accent">Sneakers. Hip-Hop. Anime. Gaming.</span>
          </h1>
          <p className="lead legal-lead">
            Black-culture-first editorial coverage across the four pillars. Search
            by keyword or jump straight into a pillar.
          </p>

          <form
            action="/articles"
            method="get"
            role="search"
            style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search articles…"
              aria-label="Search articles"
              style={{
                flex: "1 1 280px",
                minWidth: 240,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1.5px solid #2a2a30",
                background: "#0F0F12",
                color: "#fff",
                fontSize: 15,
              }}
            />
            <button type="submit" className="btn btn-primary btn-arrow">
              Search
            </button>
          </form>
        </header>

        <nav
          aria-label="Browse by pillar"
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            margin: "20px 0 28px",
          }}
        >
          <Link
            href="/articles"
            className="btn btn-ghost"
            aria-current={!pillarFilter ? "page" : undefined}
          >
            All
          </Link>
          {(Object.keys(PILLAR_LABELS) as PillarKey[]).map((p) => (
            <Link
              key={p}
              href={`/articles?pillar=${p}`}
              className="btn btn-ghost"
              aria-current={pillarFilter === p ? "page" : undefined}
            >
              {PILLAR_LABELS[p].label}
            </Link>
          ))}
        </nav>

        {filtered.length === 0 ? (
          <p style={{ opacity: 0.7 }}>
            No articles matched <strong>{q || pillarFilter || "your filter"}</strong>.
            <br />
            <Link href="/articles">Clear filter →</Link>
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
          >
            {filtered.map((a) => (
              <li
                key={`${a.pillar}/${a.slug}`}
                style={{
                  border: "1px solid #2a2a30",
                  borderRadius: 14,
                  padding: 18,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <Link
                  href={`/articles/${a.pillar}/${a.slug}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className="eyebrow"
                    style={{ display: "inline-block", marginBottom: 8 }}
                  >
                    {PILLAR_LABELS[a.pillar as PillarKey]?.label || a.pillar} ·{" "}
                    {formatPublished(a.publishedAt)}
                  </span>
                  <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem", lineHeight: 1.25 }}>
                    {a.headline}
                  </h3>
                  {a.subhead && (
                    <p style={{ margin: 0, opacity: 0.8, fontSize: "0.95rem" }}>
                      {a.subhead}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p style={{ marginTop: 32, opacity: 0.6, fontSize: "0.9rem" }}>
          Showing {filtered.length} of {all.length} articles.
        </p>
      </section>

      <Footer />
    </>
  );
}
