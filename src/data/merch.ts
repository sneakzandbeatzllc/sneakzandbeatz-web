/**
 * merch.ts
 *
 * Source-of-truth catalog for the S&B merch store. Products mirror the
 * "Merch × Jordan Color Match" guide on /creators so creators can pick
 * a colorway that pairs with the Jordans they own.
 *
 * Stripe price IDs are placeholders — replace with real ones once you've
 * created the products in Stripe Dashboard.
 *
 * Status:
 *   "live"     — purchasable
 *   "preorder" — visible, "Reserve Yours" CTA, no Stripe yet
 *   "draft"    — hidden from /shop entirely (use for WIP designs)
 */

export type MerchType = "tee" | "hoodie" | "hat" | "shorts";
export type MerchSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "OS";
export type MerchStatus = "live" | "preorder" | "draft";

export type MerchColorway = {
  /** Slug — used for the URL and as the React key */
  slug: string;
  /** Display name — "Bred", "White Cement", etc. — should match the J colorway */
  name: string;
  /** Tailwind-style hex pair for the swatch (start, end) */
  swatch: { from: string; to: string };
  /** Which Jordan Retros pair with this — quick reference */
  pairsWith: string;
};

export type MerchProduct = {
  slug: string;
  name: string;
  type: MerchType;
  description: string;
  /** Base USD price */
  priceUSD: number;
  sizes: MerchSize[];
  colorways: MerchColorway[];
  /** When status === "live" this maps colorway-slug -> Stripe payment link URL */
  stripeLinks?: Record<string, string>;
  status: MerchStatus;
  /** Optional path to product image in /public/photos/merch/ */
  imagePath?: string;
};

// Merch + UGC bookings both go live March 2027 — that's when the
// creator program ramps up and we can ship merch in matched colorways.
export const MERCH_LAUNCH_DATE = "2027-03-01";

export const MERCH_COLORWAYS: MerchColorway[] = [
  { slug: "bred",          name: "Bred",          swatch: { from: "#000000", to: "#c8262c" }, pairsWith: "AJ1 Bred · AJ4 Bred · AJ11 Bred · AJ12 Flu Game · AJ13 Bred" },
  { slug: "cement",        name: "White Cement",  swatch: { from: "#ffffff", to: "#0a0a0a" }, pairsWith: "AJ1 Shadow · AJ3 Black Cement · AJ4 White Cement · AJ11 Concord" },
  { slug: "all-black",     name: "Triple Black",  swatch: { from: "#0a0a0a", to: "#0a0a0a" }, pairsWith: "AJ1 Black Toe · AJ4 Royalty · AJ11 72-10" },
  { slug: "all-white",     name: "Triple White",  swatch: { from: "#ffffff", to: "#ffffff" }, pairsWith: "AJ1 Triple White · AJ4 Pure Money · AJ11 Platinum Tint" },
  { slug: "royal",         name: "Royal",         swatch: { from: "#1a3d8f", to: "#ffffff" }, pairsWith: "AJ1 Royal · AJ11 Midnight Navy · AJ12 French Blue" },
  { slug: "pine",          name: "Pine Green",    swatch: { from: "#3a7a3a", to: "#ffffff" }, pairsWith: "AJ1 Pine Green · AJ3 Pine Green · AJ13 Lucky Green" },
  { slug: "cool-grey",     name: "Cool Grey",     swatch: { from: "#aaaaaa", to: "#444444" }, pairsWith: "AJ3/4/5/11 Cool Grey · AJ12 Stealth · AJ17 Trophy Room" },
  { slug: "atmosphere",    name: "Atmosphere",    swatch: { from: "#f5b8c1", to: "#ffffff" }, pairsWith: "AJ1 Atmosphere · AJ4 Pink Oreo · AJ12 Easter" },
];

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    slug: "sb-tee",
    name: "S&B Signature Tee",
    type: "tee",
    description:
      "Heavyweight 240gsm cotton, dropped shoulder, screen-printed S&B mark on the chest. Cut for movement — biker-shorts, fitted-set, athletic-set styling.",
    priceUSD: 39,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colorways: MERCH_COLORWAYS,
    status: "preorder",
  },
  {
    slug: "sb-hoodie",
    name: "S&B Heavyweight Hoodie",
    type: "hoodie",
    description:
      "400gsm fleece-back. Embroidered S&B mark left chest, blank back ready for graphic drops. Boxy fit — works over the matching tee.",
    priceUSD: 79,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorways: MERCH_COLORWAYS,
    status: "preorder",
  },
  {
    slug: "sb-cap",
    name: "S&B Dad Cap",
    type: "hat",
    description:
      "Low-profile washed cotton, embroidered S&B mark front, brass buckle adjuster. Fits clean under a hood or pulled low solo.",
    priceUSD: 32,
    sizes: ["OS"],
    colorways: MERCH_COLORWAYS.filter((c) =>
      ["bred", "all-black", "all-white", "cool-grey"].includes(c.slug)
    ),
    status: "preorder",
  },
  {
    slug: "sb-shorts",
    name: "S&B Track Shorts",
    type: "shorts",
    description:
      "5-inch inseam, ribbed waistband, side-stripe S&B detail. Athletic cut for the on-camera fit.",
    priceUSD: 45,
    sizes: ["XS", "S", "M", "L", "XL"],
    colorways: MERCH_COLORWAYS.filter((c) =>
      ["bred", "all-black", "royal", "cool-grey"].includes(c.slug)
    ),
    status: "preorder",
  },
];
