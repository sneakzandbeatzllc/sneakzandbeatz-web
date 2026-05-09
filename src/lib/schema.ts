/**
 * schema.ts — Schema.org JSON-LD builders.
 *
 * Centralized so every page references the same Organization / Person IDs,
 * and so AI engines (ChatGPT, Claude, Perplexity, Gemini) see consistent
 * entity strings everywhere on the site.
 *
 * Pattern: each page imports the builder it needs, calls it with the
 * page's data, then renders the result as a single
 *   <script type="application/ld+json" dangerouslySetInnerHTML={...} />
 *
 * The Organization + WebSite + PodcastSeries graph lives in src/app/page.tsx
 * (homepage). Other pages reference IDs back to it instead of repeating.
 */

import { SOCIAL } from "@/data/social";

const SITE = "https://www.sneakzandbeatz.com";
const ORG_ID = `${SITE}/#organization`;
const PHRHX_ID = `${SITE}/#phrhx`;

/** Render a script tag's inner HTML — used with dangerouslySetInnerHTML. */
export function jsonLd<T extends object>(data: T): { __html: string } {
  return { __html: JSON.stringify(data) };
}

// ---------------------------------------------------------------------------
// Person — PHRHX
// ---------------------------------------------------------------------------

export function phrhxPerson() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PHRHX_ID,
    name: "PHRHX",
    alternateName: "Raymond Miller",
    givenName: "Raymond",
    familyName: "Miller",
    jobTitle: "Founder, Host, Producer",
    description:
      "Founder of Sneakz & Beatz LLC. Hip-hop producer, podcast host of The PHRHX Show, and editorial operator across sneakers, hip-hop, anime, and gaming.",
    url: `${SITE}/about`,
    image: `${SITE}/logo-mark-512.png`,
    worksFor: { "@id": ORG_ID },
    knowsAbout: [
      "Hip-hop production",
      "Sneaker culture",
      "Black culture media",
      "Anime",
      "Gaming",
      "Editorial operations",
      "Music licensing",
    ],
    sameAs: [
      SOCIAL.instagram.url,
      SOCIAL.tiktok.url,
      SOCIAL.x.url,
      SOCIAL.youtube.url,
    ],
  };
}

// ---------------------------------------------------------------------------
// Article — for /the-lane and any future Lane essays
// ---------------------------------------------------------------------------

export function articleSchema(input: {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: input.image || `${SITE}/og-image.png`,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { "@id": PHRHX_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    url: input.url,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    keywords: input.keywords?.join(", "),
  };
}

// ---------------------------------------------------------------------------
// PodcastEpisode list — for /show
// ---------------------------------------------------------------------------

export function podcastEpisodeList(
  episodes: Array<{ id: string; title: string; url: string; embedUrl: string; thumbnail: string; publishedAt?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The PHRHX Show — Episodes",
    itemListElement: episodes.map((ep, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "PodcastEpisode",
        "@id": `${SITE}/show#${ep.id}`,
        name: ep.title,
        url: ep.url,
        partOfSeries: { "@id": `${SITE}/#podcast` },
        associatedMedia: {
          "@type": "MediaObject",
          contentUrl: ep.embedUrl,
        },
        thumbnailUrl: ep.thumbnail,
        ...(ep.publishedAt ? { datePublished: ep.publishedAt } : {}),
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Beat catalog — ItemList of MusicRecording with offers
// ---------------------------------------------------------------------------

export function beatCatalogItemList(
  beats: Array<{
    id: string;
    slug: string;
    title: string;
    bpm?: number;
    durationSec?: number;
    isFree: boolean;
    priceUsd?: number;
    categoryLabel?: string;
  }>,
  limit = 30,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sneakz & Beatz Beat Catalog",
    description:
      "Producer-grade hip-hop instrumentals — East Coast, West Coast, Trap, Rage, Free.",
    numberOfItems: beats.length,
    itemListElement: beats.slice(0, limit).map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: beatProduct(b),
    })),
  };
}

export function beatProduct(b: {
  id: string;
  slug: string;
  title: string;
  bpm?: number;
  durationSec?: number;
  isFree: boolean;
  priceUsd?: number;
  categoryLabel?: string;
}) {
  return {
    "@type": "MusicRecording",
    "@id": `${SITE}/beats/${b.slug}`,
    name: b.title,
    url: `${SITE}/beats/${b.slug}`,
    byArtist: { "@id": PHRHX_ID },
    inAlbum: {
      "@type": "MusicAlbum",
      name: "Sneakz & Beatz Catalog",
      byArtist: { "@id": PHRHX_ID },
    },
    ...(b.categoryLabel ? { genre: b.categoryLabel } : {}),
    ...(b.durationSec
      ? { duration: `PT${Math.floor(b.durationSec / 60)}M${Math.round(b.durationSec % 60)}S` }
      : {}),
    offers: {
      "@type": "Offer",
      price: b.isFree ? "0.00" : (b.priceUsd ?? 34.99).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE}/beats/${b.slug}`,
      seller: { "@id": ORG_ID },
    },
  };
}

// ---------------------------------------------------------------------------
// Event + Offers — for /rap-challenge
// ---------------------------------------------------------------------------

export function rapChallengeEvent() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE}/rap-challenge#event`,
    name: "The Sneakz & Beatz $10K Rap Challenge",
    description:
      "Skill-based rap contest. Submit a verse, hook, or full song over a Sneakz & Beatz beat. Grand prize: $2,500 cash + Sony PS5 Pro + $500 StockX + custom 1-of-1 sneaker + a year of exclusive beats + paid IG promo + merch + more. Free with the $79 Vault Bundle. Free via mailed-in AMOE.",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    location: {
      "@type": "VirtualLocation",
      url: `${SITE}/rap-challenge`,
    },
    organizer: { "@id": ORG_ID },
    image: `${SITE}/og-image.png`,
    url: `${SITE}/rap-challenge`,
    offers: [
      {
        "@type": "Offer",
        name: "Standard Entry",
        price: "35.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE}/rap-challenge`,
        category: "Contest entry — Standard",
      },
      {
        "@type": "Offer",
        name: "Verified Entry — priority judging + written feedback from PHRHX",
        price: "99.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE}/rap-challenge`,
        category: "Contest entry — Verified",
      },
      {
        "@type": "Offer",
        name: "Free with Standard Vault Bundle ($79)",
        price: "79.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE}/bundle`,
        category: "Contest entry included with bundle",
      },
      {
        "@type": "Offer",
        name: "Free via mailed-in AMOE",
        price: "0.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE}/rap-challenge/rules`,
        category: "Contest entry — AMOE (no purchase necessary)",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// FAQPage — generic
// ---------------------------------------------------------------------------

export function faqPage(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
