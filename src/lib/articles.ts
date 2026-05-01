/**
 * articles.ts
 *
 * Server-side helpers for reading the AI-generated article system.
 * The Python article_generator.py writes articles to:
 *   public/articles/{pillar}/{slug}.json
 * and an index of all articles to:
 *   public/articles-index.json
 *
 * Read filesystem-direct (process.cwd()) — works fine in Next.js
 * server components on Vercel since these files are bundled with the
 * deployment.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "image"; url: string; alt?: string; caption?: string; prompt?: string }
  | {
      type: "substack";
      headline: string;
      body: string;
      cta_label: string;
      cta_url: string;
    };

export type ArticleSource = {
  title: string;
  url: string;
  platform: string;
};

export type ArticleHeroImage = {
  url: string;
  alt?: string;
  prompt?: string;
};

export type Article = {
  schema?: number;
  pillar: PillarKey;
  slug: string;
  headline: string;
  subhead: string;
  heroImage?: ArticleHeroImage | null;
  body: ArticleBlock[];
  tags: string[];
  tldr: string;
  publishedAt: string;
  source?: ArticleSource;
};

export type ArticleIndexItem = {
  pillar: PillarKey;
  slug: string;
  headline: string;
  subhead: string;
  publishedAt: string;
  tags: string[];
  tldr: string;
  heroImage?: string | null;
};

export type PillarKey = "sneakers" | "hiphop" | "anime" | "gaming";

const ARTICLES_ROOT = join(process.cwd(), "public", "articles");
const INDEX_PATH = join(process.cwd(), "public", "articles-index.json");

/** Read the master article index. Returns [] if missing/corrupt. */
export function getArticleIndex(): ArticleIndexItem[] {
  try {
    if (!existsSync(INDEX_PATH)) return [];
    const data = JSON.parse(readFileSync(INDEX_PATH, "utf-8"));
    if (!Array.isArray(data?.items)) return [];
    return data.items as ArticleIndexItem[];
  } catch {
    return [];
  }
}

/** Get the latest N articles for a given pillar. */
export function getArticlesForPillar(pillar: PillarKey, limit = 6): ArticleIndexItem[] {
  return getArticleIndex()
    .filter((it) => it.pillar === pillar)
    .slice(0, limit);
}

/** Load a single article by pillar + slug. Returns null if not found. */
export function getArticle(pillar: PillarKey, slug: string): Article | null {
  try {
    const path = join(ARTICLES_ROOT, pillar, `${slug}.json`);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8")) as Article;
  } catch {
    return null;
  }
}

/** All article slugs across all pillars — used for static path generation. */
export function getAllArticleParams(): { pillar: PillarKey; slug: string }[] {
  const params: { pillar: PillarKey; slug: string }[] = [];
  const pillars: PillarKey[] = ["sneakers", "hiphop", "anime", "gaming"];
  for (const pillar of pillars) {
    const dir = join(ARTICLES_ROOT, pillar);
    if (!existsSync(dir)) continue;
    try {
      const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
      for (const f of files) {
        params.push({ pillar, slug: f.replace(/\.json$/, "") });
      }
    } catch {
      // pillar dir doesn't exist or unreadable — skip
    }
  }
  return params;
}

/** Format a publishedAt ISO date for human display. */
export function formatPublished(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}
