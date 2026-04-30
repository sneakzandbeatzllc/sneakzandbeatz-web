import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getArticle,
  getAllArticleParams,
  getArticlesForPillar,
  formatPublished,
  type PillarKey,
} from "@/lib/articles";

export const dynamicParams = true;
export const revalidate = 600;

const PILLAR_LABELS: Record<PillarKey, { label: string; href: string }> = {
  sneakers: { label: "Sneakers", href: "/sneakers" },
  hiphop: { label: "Hip-Hop", href: "/hiphop" },
  anime: { label: "Anime", href: "/anime" },
  gaming: { label: "Gaming", href: "/gaming" },
};

export async function generateStaticParams() {
  return getAllArticleParams();
}

type Params = { pillar: PillarKey; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { pillar, slug } = await params;
  const article = getArticle(pillar, slug);
  if (!article) return { title: "Article — Sneakz & Beatz" };
  return {
    title: `${article.headline} — Sneakz & Beatz`,
    description: article.tldr || article.subhead,
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { pillar, slug } = await params;
  const article = getArticle(pillar, slug);
  if (!article) notFound();

  const pillarMeta = PILLAR_LABELS[pillar];
  const related = getArticlesForPillar(pillar, 4).filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />

      <article className="article-page">
        <header className="container article-hero">
          <div className="article-breadcrumb">
            <Link href={pillarMeta.href}>{pillarMeta.label}</Link>
            <span> · </span>
            <span>{formatPublished(article.publishedAt)}</span>
          </div>
          <h1 className="article-headline">{article.headline}</h1>
          <p className="article-subhead">{article.subhead}</p>
          {article.tags?.length > 0 && (
            <ul className="article-tags">
              {article.tags.map((t) => (
                <li key={t} className="article-tag">{t}</li>
              ))}
            </ul>
          )}
        </header>

        <section className="container article-body">
          {article.body.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i} className="article-h2">{block.text}</h2>;
            }
            if (block.type === "pullquote") {
              return (
                <blockquote key={i} className="article-pullquote">
                  <span>&ldquo;</span>
                  {block.text}
                  <span>&rdquo;</span>
                </blockquote>
              );
            }
            return <p key={i} className="article-p">{block.text}</p>;
          })}

          {article.source && article.source.url && (
            <div className="article-source">
              <span className="article-source-label">Source / further reading</span>
              <a href={article.source.url} target="_blank" rel="noopener" className="article-source-link">
                {article.source.title}
                {article.source.platform && ` — ${article.source.platform}`}
              </a>
            </div>
          )}
        </section>

        {related.length > 0 && (
          <section className="container article-related">
            <h3 className="article-related-h">More in {pillarMeta.label}</h3>
            <div className="article-related-grid">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/articles/${r.pillar}/${r.slug}`}
                  className="article-related-card"
                >
                  <span className="article-related-date">{formatPublished(r.publishedAt)}</span>
                  <h4 className="article-related-title">{r.headline}</h4>
                  {r.subhead && <p className="article-related-subhead">{r.subhead}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </>
  );
}
