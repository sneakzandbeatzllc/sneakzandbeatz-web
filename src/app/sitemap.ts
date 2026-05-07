/**
 * sitemap.ts — Next.js auto-generated XML sitemap.
 *
 * Indexed for Google, Bing, and AI engines (GPTBot, ClaudeBot,
 * PerplexityBot, etc.). Pulls dynamic routes from the beats catalog
 * and the articles index.
 */

import type { MetadataRoute } from "next";
import { BEATS } from "@/data/beats";

const BASE = "https://www.sneakzandbeatz.com";

// Static routes — order is approximately by importance.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",                  priority: 1.0, changeFrequency: "daily" },
  { path: "/show",             priority: 0.95, changeFrequency: "weekly" },
  { path: "/beats",            priority: 0.9, changeFrequency: "weekly" },
  { path: "/bundle",           priority: 0.9, changeFrequency: "weekly" },
  { path: "/beats/bundles",    priority: 0.9, changeFrequency: "weekly" },
  { path: "/shop",             priority: 0.85, changeFrequency: "weekly" },
  { path: "/rap-challenge",    priority: 0.9, changeFrequency: "weekly" },
  { path: "/rap-challenge/rules",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/rap-challenge/submit",  priority: 0.7, changeFrequency: "weekly" },
  { path: "/sneakz-pass",      priority: 0.85, changeFrequency: "weekly" },
  { path: "/the-lane",         priority: 0.85, changeFrequency: "monthly" },
  { path: "/links",            priority: 0.7,  changeFrequency: "weekly" },
  { path: "/sneakers",         priority: 0.85, changeFrequency: "daily" },
  { path: "/hiphop",           priority: 0.85, changeFrequency: "daily" },
  { path: "/anime",            priority: 0.8, changeFrequency: "daily" },
  { path: "/gaming",           priority: 0.8, changeFrequency: "daily" },
  { path: "/community",        priority: 0.7, changeFrequency: "weekly" },
  { path: "/creators",         priority: 0.7, changeFrequency: "weekly" },
  { path: "/work-with-us",     priority: 0.6, changeFrequency: "monthly" },
  { path: "/press",            priority: 0.5, changeFrequency: "monthly" },
  { path: "/about",            priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact",          priority: 0.5, changeFrequency: "monthly" },
  { path: "/licensing",        priority: 0.7, changeFrequency: "monthly" },
  { path: "/beats/free",       priority: 0.7, changeFrequency: "weekly" },
  { path: "/get-100-beats",    priority: 0.75, changeFrequency: "weekly" },
  { path: "/producer-kits",    priority: 0.7, changeFrequency: "weekly" },
  { path: "/articles",         priority: 0.8, changeFrequency: "daily" },
  { path: "/privacy",          priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms",            priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy",    priority: 0.3, changeFrequency: "yearly" },
  { path: "/dmca",             priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // One entry per beat detail page.
  const beatEntries: MetadataRoute.Sitemap = BEATS.map((b) => ({
    url: `${BASE}/beats/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...beatEntries];
}
