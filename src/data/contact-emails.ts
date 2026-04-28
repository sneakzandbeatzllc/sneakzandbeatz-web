/**
 * contact-emails.ts
 *
 * Single source of truth for the topic-specific email aliases configured in
 * Google Workspace at sneakzandbeatz.com. Pages reference these by name so
 * if an alias ever changes you update it once here, not across 12 mailto:
 * links in the codebase.
 *
 * All of these forward to blackroyalmusicmedia@gmail.com today, but they're
 * filterable in Gmail by To: address — so support@ goes to one label,
 * licensing@ to another, etc.
 */

export const EMAILS = {
  support:      "support@sneakzandbeatz.com",
  info:         "info@sneakzandbeatz.com",
  privacy:      "privacy@sneakzandbeatz.com",
  terms:        "terms@sneakzandbeatz.com",
  legal:        "legal@sneakzandbeatz.com",
  dmca:         "dmca@sneakzandbeatz.com",
  press:        "press@sneakzandbeatz.com",
  licensing:    "licensing@sneakzandbeatz.com",
  booking:      "booking@sneakzandbeatz.com",
  partnerships: "partnerships@sneakzandbeatz.com",
  // The catch-all that we still keep for legacy / personal correspondence.
  fallback:     "blackroyalmusicmedia@gmail.com",
} as const;

export function mailto(address: string, subject?: string): string {
  if (!subject) return `mailto:${address}`;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
