/**
 * stripe-links.ts
 *
 * Central registry for all Stripe Checkout payment links the site uses.
 * These are LIVE links created via the Stripe MCP — purchases go straight
 * to the Sneakz & Beatz Stripe account.
 *
 * Bundle products are unique (each with its own price). The single beat
 * lease product is shared across all 26 paid beats — we tell Stripe which
 * beat the buyer was looking at via the `client_reference_id` query param,
 * which flows through to Checkout Session metadata and webhooks.
 *
 * If you regenerate any of these in Stripe, update the URLs here and
 * redeploy — there is no other place these are referenced.
 */

export const STRIPE_LINKS = {
  starterBundle:    "https://buy.stripe.com/8x25kw8LOc5U6sM6fu3Nm00",   // $47 (legacy starter)
  standardBundle:   "https://buy.stripe.com/14AbIUbY0gma7wQgU83Nm01",   // $79 Standard Vault
  producerPack:     "https://buy.stripe.com/aFa5kw8LO0nc7wQ33i3Nm04",   // $149 Producer Pack (NEW 2026-05-07)
  industryPack:     "https://buy.stripe.com/dRmaEQgegc5UaJ2avK3Nm05",   // $399 Industry Pack (NEW 2026-05-07)
  exclusiveBundle:  "https://buy.stripe.com/3cI3coaTW4Dsg3mbzO3Nm02",   // $399 (legacy Exclusive — kept for backward compat; new tier is industryPack)
  beatLease:        "https://buy.stripe.com/eVq14gfacd9YaJ247m3Nm03",   // $34.99 per beat (shared product)
  rapChallengeStandard: "https://buy.stripe.com/eVqfZa1jm7PEg3mavK3Nm07", // ⚠️ STILL $35 IN STRIPE — REGENERATE AT $25 BEFORE SUBMISSIONS OPEN
  rapChallengeVerified: "https://buy.stripe.com/aFa8wI8LOfi64kE7jy3Nm06", // ❌ DEPRECATED — Verified tier removed (legal: no paid judging advantage). Do not link.
  sneakzPassMonthly:    "https://buy.stripe.com/eVq4gs2nq8TI6sMfQ43Nm08", // $12/mo Sneakz Pass (NEW 2026-05-07)
  sneakzPassYearly:     "https://buy.stripe.com/cNi14g2nq3zo5oIdHW3Nm09", // $108/yr Sneakz Pass (NEW 2026-05-07)
} as const;

/**
 * Build a beat-specific lease checkout URL. We append client_reference_id
 * so Stripe shows the buyer which beat title they're checking out for, and
 * it flows through to our webhook so we know which file to deliver.
 */
export function buildBeatLeaseUrl(slug: string): string {
  // Stripe's client_reference_id must be alphanumeric + - / _ and ≤200 chars.
  // Our slugs already match this pattern, so no extra sanitization needed.
  return `${STRIPE_LINKS.beatLease}?client_reference_id=${encodeURIComponent(slug)}`;
}
