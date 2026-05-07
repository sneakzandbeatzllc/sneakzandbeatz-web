/**
 * /go/[id] — affiliate-link redirect.
 *
 * The drops feed and articles can link to /go/[id] instead of the raw
 * affiliate URL. This route looks up the destination from /public/drops.json
 * (or a separate /public/affiliate-links.json file once that's wired up)
 * and 302-redirects with proper UTM tagging + click logging headers.
 *
 * Why this matters:
 *   1. Server-side redirect = clean outbound, no client JS required
 *   2. Single redirect URL in source = easy to swap retailers later
 *   3. Allows tracking via server logs (Vercel Logs / our analytics)
 *   4. The drop card stays a single-link surface (no nested anchors)
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

interface Drop {
  id: string;
  affiliate_url?: string;
  source_url?: string;
}

function loadDrops(): { items: Drop[] } {
  try {
    const file = path.join(process.cwd(), "public", "drops.json");
    if (!fs.existsSync(file)) return { items: [] };
    const raw = fs.readFileSync(file, "utf-8");
    const data = JSON.parse(raw);
    return { items: Array.isArray(data?.items) ? data.items : [] };
  } catch {
    return { items: [] };
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const data = loadDrops();
  const drop = data.items.find((d) => d.id === id);

  if (!drop) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  // Prefer affiliate URL, fall back to source URL.
  const target = drop.affiliate_url || drop.source_url;
  if (!target) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  // Append UTM tagging if not already present.
  const targetUrl = new URL(target);
  if (!targetUrl.searchParams.has("utm_source")) {
    targetUrl.searchParams.set("utm_source", "sneakzandbeatz");
    targetUrl.searchParams.set("utm_medium", "drops_feed");
    targetUrl.searchParams.set("utm_campaign", id);
  }

  const response = NextResponse.redirect(targetUrl.toString(), 302);

  // No-cache headers so click counts stay accurate via Vercel Logs.
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("X-Sneakz-Drop", id);

  return response;
}
