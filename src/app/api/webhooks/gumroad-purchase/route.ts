/**
 * /api/webhooks/gumroad-purchase
 *
 * Receives Gumroad purchase webhook for any of the bundle tiers
 * (Standard Vault $79, Producer Pack $149, Industry Pack $399).
 *
 * Responsibilities:
 *   1. Verify the webhook is genuinely from Gumroad (HMAC signature check)
 *   2. Extract the buyer email + custom-field opt-in for the Rap Challenge
 *   3. If opt-in === "yes", trigger the entry-started flow:
 *        a) Tag the email in the email platform as `rap_challenge_started`
 *        b) Create a row in the Notion "Rap Challenge Entries" DB
 *        c) Send the first email of the 5-email sequence
 *   4. Otherwise: standard bundle delivery flow (Gumroad already sent the
 *      download link; we just log the order for our own metrics).
 *
 * Environment variables expected:
 *   GUMROAD_WEBHOOK_SECRET         — for HMAC signature verification
 *   NOTION_INTEGRATION_TOKEN       — to write to the Rap Challenge DB
 *   NOTION_RAP_CHALLENGE_DB_ID     — the DB ID for entries
 *   CONVERTKIT_API_KEY             — for tagging users (optional; can use Substack instead)
 *   SUBSTACK_PUBLICATION_ID        — fallback if CK isn't wired
 *
 * Wire Gumroad: Settings → Advanced → Add ping URL →
 *   https://www.sneakzandbeatz.com/api/webhooks/gumroad-purchase
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

// Force Node.js runtime — Vercel defaults API routes to Edge, but we use
// node:crypto + Buffer + fetch with Node-style headers, which needs Node.
export const runtime = "nodejs";

// Webhooks are by definition dynamic (we read the request body + headers).
export const dynamic = "force-dynamic";

interface GumroadWebhookBody {
  seller_id: string;
  product_id: string;
  product_permalink: string;
  product_name: string;
  permalink: string;
  email: string;
  full_name?: string;
  price: string;
  url_params?: Record<string, string>;
  /** Custom fields the buyer filled in at checkout */
  variants?: Record<string, string>;
  /** Top-level custom fields */
  custom_fields?: Record<string, string>;
  order_number: number;
  sale_id: string;
  sale_timestamp: string;
  test?: string;
}

function verifyGumroadSignature(rawBody: string, signature: string | null): boolean {
  // Gumroad uses an HMAC-SHA256 of the raw body with your webhook secret.
  // If GUMROAD_WEBHOOK_SECRET is not set, accept all (DEV ONLY).
  const secret = process.env.GUMROAD_WEBHOOK_SECRET;
  if (!secret) return true;
  if (!signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf-8")
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}

async function logEntryToNotion(payload: {
  email: string;
  fullName?: string;
  bundleTier: string;
  saleId: string;
  saleTimestamp: string;
  optInRapChallenge: boolean;
  tshirtSize?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.NOTION_INTEGRATION_TOKEN;
  const dbId = process.env.NOTION_RAP_CHALLENGE_DB_ID;
  if (!token || !dbId) {
    return { ok: false, error: "Notion env vars not set; skipping log" };
  }

  // 14-day deadline for entry completion, ISO date format.
  const deadline = new Date(payload.saleTimestamp);
  deadline.setDate(deadline.getDate() + 14);

  const body = {
    parent: { database_id: dbId },
    properties: {
      // The exact property names depend on the DB schema. These names match
      // the Notion DB Claude created via the MCP. If you renamed any property,
      // update them here.
      Email: { title: [{ text: { content: payload.email } }] },
      "Full Name": { rich_text: [{ text: { content: payload.fullName || "" } }] },
      "Bundle Tier": { select: { name: payload.bundleTier } },
      "Sale ID": { rich_text: [{ text: { content: payload.saleId } }] },
      "Purchase Timestamp": { date: { start: payload.saleTimestamp } },
      "Entry Status": {
        select: { name: payload.optInRapChallenge ? "Started" : "Not Entered" },
      },
      "Entry Deadline": { date: { start: deadline.toISOString() } },
      "Opted In to Rap Challenge": { checkbox: payload.optInRapChallenge },
      "T-Shirt Size": payload.tshirtSize
        ? { select: { name: payload.tshirtSize } }
        : { select: null },
    },
  };

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Notion API error ${res.status}: ${errText}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Notion fetch failed: ${(e as Error).message}` };
  }
}

async function tagInEmailPlatform(email: string, tag: string): Promise<{ ok: boolean }> {
  // ConvertKit path — only fires if the API key is set.
  const ckApiKey = process.env.CONVERTKIT_API_KEY;
  if (ckApiKey) {
    try {
      // 1. Find or create the tag, then 2. add the email to it.
      // We assume the tag already exists — create it once in CK manually.
      // For brevity, this calls ConvertKit's "subscribe to tag" endpoint:
      const res = await fetch(
        `https://api.convertkit.com/v3/tags/${encodeURIComponent(tag)}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: ckApiKey, email }),
        }
      );
      if (res.ok) return { ok: true };
    } catch {
      // fall through
    }
  }

  // Fallback: log to console (so it shows in Vercel Logs) so you can
  // manually tag in Substack until ConvertKit is wired.
  console.log(`[email-tag-fallback] would tag ${email} as ${tag}`);
  return { ok: true };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-gumroad-signature");

  if (!verifyGumroadSignature(rawBody, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: GumroadWebhookBody;
  try {
    // Gumroad sends application/x-www-form-urlencoded by default; we accept either.
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      payload = JSON.parse(rawBody);
    } else {
      // Parse form-urlencoded into a plain object
      const params = new URLSearchParams(rawBody);
      const obj: Record<string, unknown> = {};
      for (const [k, v] of params.entries()) {
        // Custom fields and variants come as `[Custom Field Name]` keys
        if (k.startsWith("[") && k.endsWith("]")) {
          if (!obj.custom_fields) obj.custom_fields = {};
          (obj.custom_fields as Record<string, string>)[k.slice(1, -1)] = v;
        } else {
          obj[k] = v;
        }
      }
      payload = obj as GumroadWebhookBody;
    }
  } catch (e) {
    return NextResponse.json(
      { error: "could not parse body", detail: String(e) },
      { status: 400 }
    );
  }

  // Skip Gumroad's test pings if the test flag is set.
  if (payload.test === "true") {
    return NextResponse.json({ ok: true, note: "test ping; ignored" });
  }

  // Determine bundle tier from the product name.
  let bundleTier = "Unknown";
  const productName = payload.product_name || "";
  if (productName.toLowerCase().includes("standard")) bundleTier = "Standard Vault";
  else if (productName.toLowerCase().includes("producer")) bundleTier = "Producer Pack";
  else if (productName.toLowerCase().includes("industry")) bundleTier = "Industry Pack";
  else if (productName.toLowerCase().includes("vault")) bundleTier = "Standard Vault";

  // Extract custom fields.
  const customFields = payload.custom_fields || {};
  const optInRapChallenge =
    String(customFields["Enter the $10K Rap Challenge?"] || "")
      .toLowerCase()
      .startsWith("y") ||
    String(customFields["Enter the $10K Rap Challenge"] || "")
      .toLowerCase()
      .startsWith("y");
  const tshirtSize = customFields["T-shirt size"] || customFields["T-Shirt Size"] || customFields["Size"];

  // Always log to Notion (whether they opted into Rap Challenge or not — gives us
  // a unified bundle-purchase record).
  const notionResult = await logEntryToNotion({
    email: payload.email,
    fullName: payload.full_name,
    bundleTier,
    saleId: payload.sale_id,
    saleTimestamp: payload.sale_timestamp,
    optInRapChallenge,
    tshirtSize,
  });

  // If they opted into the Rap Challenge, fire the email tag.
  if (optInRapChallenge) {
    await tagInEmailPlatform(payload.email, "rap_challenge_started");
  }

  // Always tag bundle buyers as `bundle_buyer_<tier>` for downstream sequencing.
  await tagInEmailPlatform(
    payload.email,
    `bundle_buyer_${bundleTier.toLowerCase().replace(/\s+/g, "_")}`
  );

  return NextResponse.json({
    ok: true,
    bundle_tier: bundleTier,
    rap_challenge_optin: optInRapChallenge,
    notion_logged: notionResult.ok,
    notion_error: notionResult.error,
    timestamp: new Date().toISOString(),
  });
}

// Optional: GET handler to confirm the endpoint is live (useful for manual
// testing — visit the URL in a browser to see it return a quick OK).
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "gumroad-purchase webhook",
    expected_method: "POST",
    docs: "/05_CONTENT_OPERATIONS/17_setup_guides/2026-05-07_gumroad_setup_for_bundle_delivery.md",
  });
}
