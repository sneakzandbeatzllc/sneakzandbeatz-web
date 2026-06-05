/**
 * /api/indexnow
 *
 * POST a JSON body { "urls": ["https://...", ...] } and this fans the URLs
 * out to the IndexNow API (Bing + Yandex + Seznam + DuckDuckGo via Bing).
 *
 * Use when you publish a new Lane essay, when the article generator (if it
 * ever comes back, which it shouldn't) adds new content, or when you want
 * to nudge a specific URL into the index ahead of crawl schedule.
 *
 * Auth: pass the IndexNow key as the `x-indexnow-key` header. This is the
 * same key that's verified at /<KEY>.txt. Without it, the route returns
 * 401 — prevents random people from spamming the IndexNow endpoint on
 * your behalf.
 *
 * Example:
 *   curl -X POST https://www.sneakzandbeatz.com/api/indexnow \
 *     -H "Content-Type: application/json" \
 *     -H "x-indexnow-key: 98f2853719ae05a58c82baae8a0acbc6" \
 *     -d '{"urls":["https://www.sneakzandbeatz.com/the-lane/black-owned-editorial-commerce"]}'
 */

const KEY = "98f2853719ae05a58c82baae8a0acbc6";
const HOST = "www.sneakzandbeatz.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function POST(req: Request) {
  const headerKey = req.headers.get("x-indexnow-key");
  if (headerKey !== KEY) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { urls?: string[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const urls = (body.urls || []).filter(
    (u) => typeof u === "string" && u.startsWith(`https://${HOST}`),
  );
  if (urls.length === 0) {
    return new Response(
      JSON.stringify({ error: "no valid sneakzandbeatz.com URLs in body" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // IndexNow caps payloads at 10,000 URLs. Way more than we'll ever submit.
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await res.text().catch(() => "");

  return new Response(
    JSON.stringify({
      status: res.status,
      ok: res.ok,
      submitted: urls.length,
      indexnowResponse: text || null,
    }),
    {
      status: res.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    },
  );
}

// Allow OPTIONS for CORS preflight — keep it strict to the key header.
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-indexnow-key",
    },
  });
}
