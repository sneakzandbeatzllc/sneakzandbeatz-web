/**
 * /sneakz-pass — paid Substack tier landing page.
 *
 * Status: PRE-LAUNCH. Page is live but the Subscribe CTA points to a
 * waitlist form until the paid tier is enabled in Substack on Oct 1, 2026.
 *
 * To switch to live mode after Oct 1:
 *   1. Enable the paid tier in Substack dashboard (Settings → Subscriptions)
 *   2. Replace WAITLIST_URL below with the Substack subscribe URL
 *   3. Set IS_LAUNCHED = true
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sneakz Pass — $12/mo · Members-only access — Sneakz & Beatz",
  description:
    "Sneakz Pass is the $12/mo membership for the Sneakz & Beatz audience. Members get bonus episodes, members-only Discord, exclusive monthly beat, 10% off merch, and 24-hour first crack on every drop.",
  alternates: {
    canonical: "/sneakz-pass",
  },
  openGraph: {
    title: "Sneakz Pass — Members-only access for Sneakz & Beatz",
    description:
      "Bonus episodes, members-only Discord, exclusive monthly beat, 10% off merch, first crack on every drop.",
    url: "https://www.sneakzandbeatz.com/sneakz-pass",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneakz Pass — $12/mo membership",
    description:
      "Bonus episodes, members-only Discord, exclusive monthly beat, 10% off merch, first crack on every drop.",
  },
};

// Sneakz Pass uses Stripe Subscription Checkout (one product, two prices).
// Setting IS_LAUNCHED = true on Oct 1 turns the CTA into a live subscribe link.
const IS_LAUNCHED = false;
const WAITLIST_URL = "https://sneakzandbeatz.substack.com";
const SUBSCRIBE_URL_MONTHLY = "https://buy.stripe.com/eVq4gs2nq8TI6sMfQ43Nm08";
const SUBSCRIBE_URL_YEARLY  = "https://buy.stripe.com/cNi14g2nq3zo5oIdHW3Nm09";
const SUBSCRIBE_URL = SUBSCRIBE_URL_MONTHLY;

const PERKS = [
  {
    icon: "▶",
    h: "2 bonus episodes per month",
    p: "Members-only PHRHX Show drops — unreleased footage, hot takes, longer interviews. Not on the public YouTube.",
  },
  {
    icon: "💬",
    h: "Members-only Discord lounge",
    p: "Private channel inside the Sneakz Discord. Direct access to PHRHX. Insider drop intel.",
  },
  {
    icon: "🎵",
    h: "Free exclusive beat — every month",
    p: "One untagged WAV beat each month, members-only. Never released to the public catalog.",
  },
  {
    icon: "🛒",
    h: "10% off merch + bundles, forever",
    p: "Auto-applied at checkout while your membership is active. Stacks on launch promos.",
  },
  {
    icon: "⏰",
    h: "24-hour first crack on every drop",
    p: "New merch, new beat tiers, new bundles — members shop a full day before public.",
  },
  {
    icon: "🎤",
    h: "Free Verified Entry to every Rap Challenge",
    p: "Skip the $35 standard fee. Get priority judging + written feedback from PHRHX.",
  },
  {
    icon: "🎙️",
    h: "Quarterly live AMA",
    p: "Members-only Q&A — 60 minutes, audio + video. Ask anything, no topic off-limits.",
  },
];

const FAQ = [
  {
    q: "When does Sneakz Pass go live?",
    a: "October 1, 2026. The waitlist is open now — get on the list and you'll be the first to know when the paid tier opens. Founding members will get a discount that won't be offered again.",
  },
  {
    q: "How much does it cost?",
    a: "$12/month or $108/year (10% annual discount, that's $9/month effectively). Cancel anytime. We don't lock you in.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. We offer a 30-day refund on the first month of any new membership, no questions asked. After 30 days, cancellations stop future renewals but the current month is non-refundable.",
  },
  {
    q: "What happens to the free newsletter when I become a member?",
    a: "You keep getting it. Members get the free newsletter PLUS the members-only content. Nothing is taken away — only added.",
  },
  {
    q: "Is the Discord access tied to my Pass?",
    a: "Yes. The members-only Discord channels unlock when your Pass is active. If you cancel, you stay in the public Discord but lose the members-only channels.",
  },
  {
    q: "Do members get free beats?",
    a: "Members get one exclusive untagged WAV beat each month — never released to the public catalog. You also keep getting the 70 free beats from the public catalog plus standard previews.",
  },
];

export default function SneakzPassPage() {
  return (
    <>
      <Header />

      <main className="container sneakz-pass">
        <header className="legal-hero">
          <span className="eyebrow">Sneakz Pass · Members-only · $12/mo</span>
          <h1 className="legal-title">
            Inside The Culture.
            <br />
            <span className="accent">$12/mo.</span>
          </h1>
          <p className="lead legal-lead">
            The membership for the audience that shows up every Tuesday — bonus
            episodes, members-only Discord, exclusive monthly beat, 10% off merch
            forever, first crack on every drop. Built for the Black sneakerhead
            who lives hip-hop, anime, and gaming. Cancel anytime.
          </p>
          <div className="hero-ctas">
            <a
              href={IS_LAUNCHED ? SUBSCRIBE_URL : WAITLIST_URL}
              className="btn btn-primary btn-arrow"
              target="_blank"
              rel="noopener"
            >
              {IS_LAUNCHED ? "Subscribe — $12/mo" : "Get on the waitlist"}
            </a>
            {!IS_LAUNCHED && (
              <Link href="/" className="btn btn-ghost btn-arrow">
                Browse the free side first
              </Link>
            )}
          </div>
          {!IS_LAUNCHED && (
            <p
              style={{
                marginTop: "12px",
                fontSize: "0.9rem",
                color: "var(--muted, #888)",
              }}
            >
              Sneakz Pass launches <strong>October 1, 2026</strong>. Waitlist
              members get a founding-member discount that won't be offered
              again.
            </p>
          )}
        </header>

        <section className="legal-section">
          <h2>What you get</h2>
          <div className="sneakz-pass-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "12px" }}>
            {PERKS.map((perk) => (
              <div key={perk.h} className="sneakz-pass-perk" style={{ padding: "18px", border: "1px solid var(--rule, #2a2a30)", borderRadius: "12px" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>{perk.icon}</div>
                <h3 style={{ margin: "0 0 6px", fontSize: "1.05rem", fontWeight: 700 }}>{perk.h}</h3>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>{perk.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="legal-section">
          <h2>The math</h2>
          <p>
            $12/month gets you the equivalent of: 2 bonus episodes ($0 — they
            don't exist publicly), one exclusive untagged WAV beat per month
            (worth $34.99 standalone), 10% off your next merch purchase (worth
            ~$8 on a hoodie), free Verified Entry to the Rap Challenge ($99 if
            bought standalone), and the members-only Discord lounge.
          </p>
          <p>
            <strong>If you buy one piece of merch and one beat in a year, the
            membership pays for itself</strong> — and you keep everything else
            for free.
          </p>
        </section>

        <section className="legal-section">
          <h2>Frequently asked</h2>
          {FAQ.map((item) => (
            <details key={item.q} className="contact-faq" style={{ marginBottom: "10px" }}>
              <summary style={{ fontWeight: 600, cursor: "pointer" }}>{item.q}</summary>
              <p style={{ marginTop: "6px" }}>{item.a}</p>
            </details>
          ))}
        </section>

        <section className="legal-section">
          <h2>Ready to ride?</h2>
          <p>
            Sneakz Pass launches October 1, 2026. Get on the waitlist now and
            you'll be first in when the paid tier opens, with a founding-member
            discount that won't come back.
          </p>
          <a
            href={IS_LAUNCHED ? SUBSCRIBE_URL : WAITLIST_URL}
            className="btn btn-primary btn-arrow"
            target="_blank"
            rel="noopener"
          >
            {IS_LAUNCHED ? "Subscribe — $12/mo" : "Get on the waitlist"}
          </a>
        </section>

        {/* JSON-LD: Product schema for the Pass */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Sneakz Pass",
              description:
                "Members-only subscription for Sneakz & Beatz. Bonus episodes, members-only Discord, exclusive monthly beat, 10% off merch, first crack on every drop.",
              brand: { "@type": "Brand", name: "Sneakz & Beatz" },
              offers: {
                "@type": "Offer",
                price: "12.00",
                priceCurrency: "USD",
                availability: IS_LAUNCHED
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
                url: "https://www.sneakzandbeatz.com/sneakz-pass",
              },
            }),
          }}
        />
      </main>

      <Footer />
    </>
  );
}
