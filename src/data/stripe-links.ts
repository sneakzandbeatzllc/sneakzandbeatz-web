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
  starterBundle:   "https://buy.stripe.com/8x25kw8LOc5U6sM6fu3Nm00",   // $47
  standardBundle:  "https://buy.stripe.com/14AbIUbY0gma7wQgU83Nm01",   // $79
  exclusiveBundle: "https://buy.stripe.com/3cI3coaTW4Dsg3mbzO3Nm02",   // $497
  beatLease:       "https://buy.stripe.com/eVq14gfacd9YaJ247m3Nm03",   // $29.99 per beat (shared product)
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
