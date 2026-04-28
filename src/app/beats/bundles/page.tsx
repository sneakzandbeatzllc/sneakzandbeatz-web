import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { STRIPE_LINKS } from "@/data/stripe-links";

export const metadata = {
  title: "Beat Bundles — Sneakz & Beatz",
  description:
    "Three tiers. 100 mastered beats. MP3 + WAV + stems. Built for artists who move different.",
};

type Tier = {
  slug: string;
  name: string;
  tagline: string;
  priceUSD: number;
  anchorUSD: number;
  isFeatured?: boolean;
  bullets: string[];
  bonusValue?: number;
  ctaLabel: string;
  ctaHref: string; // Live Stripe Checkout URL — see src/data/stripe-links.ts
};

const TIERS: Tier[] = [
  {
    slug: "starter",
    name: "Starter",
    tagline: "Get Your Foot In",
    priceUSD: 47,
    anchorUSD: 1249,
    bullets: [
      "25 curated beats from the catalog",
      "MP3 only delivery",
      "1 music video license per beat",
      "100K stream cap",
      "Email support",
    ],
    ctaLabel: "Get Starter — $47",
    ctaHref: STRIPE_LINKS.starterBundle,
  },
  {
    slug: "standard",
    name: "Standard",
    tagline: "Your Whole Year of Drops",
    priceUSD: 79,
    anchorUSD: 2500,
    isFeatured: true,
    bullets: [
      "100 beats — the FULL bundle",
      "MP3 + WAV + trackouts (mixable stems)",
      "500K stream cap",
      "3 music videos per beat",
      "ALL future drops next 6 months",
      "BRMG drum kits + sample pack",
      "15-min mix consultation Zoom",
      "Priority email support",
    ],
    bonusValue: 2500,
    ctaLabel: "Get Standard — $79",
    ctaHref: STRIPE_LINKS.standardBundle,
  },
  {
    slug: "exclusive",
    name: "Exclusive",
    tagline: "Own The Sound",
    priceUSD: 497,
    anchorUSD: 1497,
    bullets: [
      "Everything in Standard, plus:",
      "5 fully exclusive beats — your pick (those beats get bought out)",
      "Lifetime updates — every beat we ever release",
      "Producer credit waived (full ownership of those 5)",
      "Direct DM access for custom requests",
      "DistroKid affiliate kit",
    ],
    ctaLabel: "Get Exclusive — $497",
    ctaHref: STRIPE_LINKS.exclusiveBundle,
  },
];

export default function BundlesPage() {
  return (
    <>
      <Header />

      <section className="bundles-hero">
        <div className="container">
          <span className="eyebrow">Beat Bundles · Limited Drop</span>
          <h1 className="bundles-headline">
            100 Mastered Beats. <span className="accent">One Year of Drops.</span>
            <br />
            Pick Your Path.
          </h1>
          <p className="lead bundles-lead">
            Lease beats individually at $29.99 — or grab the whole catalog plus 6 months of new
            drops for less than 3 leases. Math wins, every time.
          </p>
          <div className="bundles-trust">
            <span className="bundles-trust-item">⚡ Instant download</span>
            <span className="bundles-trust-item">🛡️ 30-day money-back guarantee</span>
            <span className="bundles-trust-item">📧 Producer credit only — keep your royalties</span>
          </div>
        </div>
      </section>

      <section className="container bundles-section">
        <div className="bundles-grid">
          {TIERS.map((tier) => (
            <div
              key={tier.slug}
              className={"bundle-tier" + (tier.isFeatured ? " featured" : "")}
            >
              {tier.isFeatured && <span className="bundle-tier-badge">⭐ Most Popular</span>}

              <span className="bundle-tier-name">{tier.name}</span>
              <p className="bundle-tier-tagline">{tier.tagline}</p>

              <div className="bundle-tier-pricing">
                <div className="bundle-tier-anchor">
                  Was{" "}
                  <span className="bundle-tier-anchor-value">
                    ${tier.anchorUSD.toLocaleString()}
                  </span>
                </div>
                <div className="bundle-tier-price">
                  <span className="bundle-tier-currency">$</span>
                  {tier.priceUSD}
                </div>
                <div className="bundle-tier-price-sub">one-time, instant access</div>
              </div>

              {tier.bonusValue && (
                <div className="bundle-tier-bonus">
                  <strong>+ ${tier.bonusValue.toLocaleString()} in bonuses</strong> stacked into
                  the price
                </div>
              )}

              <ul className="bundle-tier-bullets">
                {tier.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="bundle-tier-check">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href={tier.ctaHref}
                className={
                  "btn btn-arrow bundle-tier-cta " +
                  (tier.isFeatured ? "btn-primary" : "btn-ghost")
                }
              >
                {tier.ctaLabel}
              </a>

              <p className="bundle-tier-foot">
                Or pay over 4 with Klarna / Afterpay (added at Stripe checkout).
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Value-stack section */}
      <section className="container bundles-value-stack">
        <h2 className="bundles-value-h">Why The Standard Bundle Is The Move.</h2>
        <p className="bundles-value-sub">
          Perceived value: <s>$2,500</s>. Today: <strong>$79</strong>. Same beats other producers
          are charging hundreds for.
        </p>
        <div className="bundles-value-table">
          <div className="bundles-value-row">
            <span>100 mastered beats (curated catalog)</span>
            <span>$1,200</span>
          </div>
          <div className="bundles-value-row">
            <span>BRMG drum kits + sample pack</span>
            <span>$300</span>
          </div>
          <div className="bundles-value-row">
            <span>15-min 1-on-1 mix consultation</span>
            <span>$150</span>
          </div>
          <div className="bundles-value-row">
            <span>6 months of future beat drops</span>
            <span>$600</span>
          </div>
          <div className="bundles-value-row">
            <span>Producer community access</span>
            <span>$250</span>
          </div>
          <div className="bundles-value-row total">
            <span>Perceived total value</span>
            <span>$2,500</span>
          </div>
          <div className="bundles-value-row today">
            <span>Today, all-in</span>
            <span>$79</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container bundles-faq">
        <h2 className="bundles-faq-h">Quick Answers.</h2>
        <details className="bundles-faq-item">
          <summary>What's the difference between leasing and exclusive?</summary>
          <p>
            A lease lets you use the beat with limits (stream cap, music video count). Multiple
            artists can lease the same beat. Exclusive = you own that beat forever; nobody else
            can lease or buy it. Standard bundle is leases. Exclusive tier swaps 5 of those leases
            into actual full ownership.
          </p>
        </details>
        <details className="bundles-faq-item">
          <summary>What's included in the file delivery?</summary>
          <p>
            Starter: MP3 master only. Standard + Exclusive: MP3 master, WAV master, and trackouts
            (separate files for drums, melody, bass, etc.) so you can re-mix at your end.
          </p>
        </details>
        <details className="bundles-faq-item">
          <summary>How do "future drops" work?</summary>
          <p>
            Standard subscribers get every new beat we drop in the 6 months after purchase added to
            their download library automatically. Exclusive tier extends that to lifetime — every
            beat we ever release, free for you.
          </p>
        </details>
        <details className="bundles-faq-item">
          <summary>What's the producer credit requirement?</summary>
          <p>
            Standard tier requires "Prod. by Sneakz &amp; Beatz" in your track credits / DSP
            metadata. Exclusive tier waives this — when you buy out a beat, you can credit yourself.
          </p>
        </details>
        <details className="bundles-faq-item">
          <summary>30-day money-back guarantee — how does it work?</summary>
          <p>
            Email us within 30 days of purchase, get a full refund, no questions. We'd rather you
            be happy than have your money. (We've never had to use it, but it's there.)
          </p>
        </details>
        <details className="bundles-faq-item">
          <summary>Can I split the payment?</summary>
          <p>
            Yes. Stripe Checkout offers Klarna and Afterpay at checkout — you'll see them as
            options after clicking the buy button. Pay 25% today, 25% every 2 weeks.
          </p>
        </details>
      </section>

      <Footer />
    </>
  );
}
