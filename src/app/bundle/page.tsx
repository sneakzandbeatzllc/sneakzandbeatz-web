import Link from "next/link";
import { STRIPE_LINKS } from "@/data/stripe-links";
import { BEATS } from "@/data/beats";

/**
 * /bundle — squeeze / VSL landing page (Russell Brunson-style funnel entry)
 *
 * Intentionally NO Header / Footer / nav. The whole point of a squeeze page
 * is one-decision: keep watching the VSL and then click the buy button, or
 * leave. Distractions kill conversion.
 *
 * Flow: /bundle → Stripe Checkout → /bundle/upsell → /bundle/thank-you
 * Stripe payment-link success URL must point at /bundle/upsell for the OTO
 * to fire after purchase. Configure this in the Stripe dashboard for the
 * "Standard Bundle — $79" payment link.
 */
export const metadata = {
  title: "Producer Bundle — All 96 Beats For $79 | Sneakz & Beatz",
  description:
    "All 96 mastered beats. WAV stems, drum kit, mix consultation, and 6 months of future drops. Was $2,500. Today: $79. Bundle license auto-delivered.",
  openGraph: {
    title: "All 96 Beats. $79. — Sneakz & Beatz Producer Bundle",
    description:
      "All 96 mastered beats — including the free ones — with WAV stems, drum kit, mix consult, and 6 months of future drops. Bundle license auto-attached.",
    url: "https://sneakzandbeatz.com/bundle",
    siteName: "Sneakz & Beatz",
    type: "website",
    images: [
      {
        url: "/og-bundle.png",
        width: 1200,
        height: 630,
        alt: "Sneakz & Beatz Producer Bundle — All 96 beats for $79",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All 96 Beats. $79.",
    description:
      "Sneakz & Beatz Producer Bundle. WAV + stems + drum kit + mix consult + 6 mo of future drops.",
    images: ["/og-bundle.png"],
  },
};

const PROOF_POINTS = [
  ["96", "mastered beats included"],
  ["$0.82", "per beat (regular $29.99)"],
  ["6 mo", "of future drops included"],
  ["50/50", "publishing — same as a label"],
];

const FAQ: Array<[string, string]> = [
  [
    "Are the free beats really included?",
    "Yes. All 96 beats currently in the catalog — including the 70 tagged 'Free' on the public store — ship with the bundle. The Free Standard License only covers MP3, no sync, low caps. The Bundle license unlocks WAV + stems + sync rights on every single beat. Same beats, real license.",
  ],
  [
    "What if I already grabbed a free beat?",
    "Nothing changes. Your free download stays under the Free Standard License. When you buy the bundle, you get the upgraded license + WAV + stems on that same beat (plus all 95 others).",
  ],
  [
    "When do I get the files?",
    "Stripe sends the receipt within seconds. The receipt includes the master download link and the Producer Bundle license PDF. You're producing tonight.",
  ],
  [
    "Refund policy?",
    "30-day satisfaction guarantee. Email licensing@sneakzandbeatz.com inside 30 days, full refund, no interrogation. You agree to delete the files if you take the refund — that's the only ask.",
  ],
  [
    "What's the catch with the price?",
    "There isn't one. The bundle is intentionally under-priced for the launch window because we'd rather have a thousand producers using these beats than a hundred who could afford the catalog at retail. Price will move up as the catalog grows past 100 beats.",
  ],
  [
    "Can I sell the bare beat to someone else?",
    "No. Bundle license covers your usage in your music. Reselling the audio file as-is is not allowed. Use it on your tracks, license to other artists who want exclusive rights only after talking to us.",
  ],
];

export default function BundleSqueezePage() {
  const totalBeats = BEATS.length;

  return (
    <main className="bundle-funnel">
      {/* Sticky urgency bar */}
      <div className="bundle-urgency">
        <strong>Launch pricing</strong> — first 100 producers · auto-delivers
        the bundle license with checkout
      </div>

      <section className="bundle-hero">
        <span className="bundle-eyebrow">
          Sneakz &amp; Beatz · Producer Bundle · v2026
        </span>

        <h1 className="bundle-h1">
          All <span className="accent">{totalBeats} beats</span>.
          <br />
          One license.
          <br />
          <span className="accent">$79.</span>
        </h1>

        <p className="bundle-subhead">
          Stop renting beats one at a time. Get the entire Sneakz &amp; Beatz
          catalog — mastered, voice-tag-free, with WAV stems, the drum kit, a
          mix consultation, and 6 months of every new drop added to your
          library at no extra charge.
        </p>

        {/* VSL placeholder — replace with the YouTube embed when ready */}
        <div className="bundle-vsl-frame" aria-label="Sales video">
          <div className="bundle-vsl-inner">
            <span className="bundle-vsl-label">▶ Sales Video — Coming Soon</span>
            <p className="bundle-vsl-helper">
              Raymond walks you through every beat in the catalog, the
              license, and exactly what you can do with it. Watch this once
              before you buy. (Embed slot — drop the YouTube unlisted URL
              into <code>BUNDLE_VSL_URL</code> in <code>page.tsx</code>.)
            </p>
          </div>
        </div>

        {/* Anchor + price reveal */}
        <div className="bundle-price-block">
          <div className="bundle-price-anchor">
            <span className="bundle-price-anchor-label">If you bought it piece by piece:</span>
            <span className="bundle-price-anchor-amount">$2,879.04</span>
            <span className="bundle-price-anchor-detail">
              {totalBeats} beats × $29.99 + drum kit ($60) + mix consult ($35)
            </span>
          </div>
          <div className="bundle-price-today">
            <span className="bundle-price-today-label">Today, one-time:</span>
            <span className="bundle-price-today-amount">$79</span>
            <span className="bundle-price-today-detail">
              That's <strong>$0.82 per beat</strong>, fully licensed.
            </span>
          </div>
        </div>

        <a
          href={STRIPE_LINKS.standardBundle}
          className="bundle-cta"
          aria-label="Get the producer bundle for 79 dollars"
        >
          GET THE BUNDLE — $79
          <span className="bundle-cta-sub">
            Secure Stripe checkout · 30-day refund · license auto-attached
          </span>
        </a>

        <p className="bundle-trust">
          🔒 Stripe-secured checkout · No subscription, one-time payment ·
          You own the lease the second you check out
        </p>
      </section>

      {/* Proof points */}
      <section className="bundle-proof">
        {PROOF_POINTS.map(([n, label], i) => (
          <article key={i} className="bundle-proof-card">
            <span className="bundle-proof-num">{n}</span>
            <span className="bundle-proof-label">{label}</span>
          </article>
        ))}
      </section>

      {/* What's inside */}
      <section className="bundle-stack">
        <h2 className="bundle-h2">
          What you actually get for <span className="accent">$79</span>
        </h2>

        <div className="bundle-stack-grid">
          <article className="bundle-stack-card bundle-stack-card-feature">
            <span className="bundle-stack-tag">Core deliverable</span>
            <h3 className="bundle-stack-h">{totalBeats} mastered beats</h3>
            <p className="bundle-stack-p">
              Every single beat on sneakzandbeatz.com — East Coast,
              West Coast, Trap, Rage, and the 70 tagged "Free." MP3 + WAV +
              full trackouts (drums, melody, bass, FX as separate stems).
              Mastered and voice-tag-free.
            </p>
            <p className="bundle-stack-value">Stand-alone value: $2,879</p>
          </article>

          <article className="bundle-stack-card">
            <span className="bundle-stack-tag">Bonus #1</span>
            <h3 className="bundle-stack-h">BRMG drum kit + sample pack</h3>
            <p className="bundle-stack-p">
              The same one-shots, processing chains, and loops used to make
              the catalog. Drop them in your DAW and start cooking
              immediately.
            </p>
            <p className="bundle-stack-value">Stand-alone value: $60</p>
          </article>

          <article className="bundle-stack-card">
            <span className="bundle-stack-tag">Bonus #2</span>
            <h3 className="bundle-stack-h">15-min mix consult Zoom</h3>
            <p className="bundle-stack-p">
              Bring a track. Raymond gives you mix notes — frequencies,
              levels, glue, the cut your record needs. Recorded so you can
              go back to it.
            </p>
            <p className="bundle-stack-value">Stand-alone value: $35</p>
          </article>

          <article className="bundle-stack-card">
            <span className="bundle-stack-tag">Bonus #3</span>
            <h3 className="bundle-stack-h">6 months of future drops</h3>
            <p className="bundle-stack-p">
              Every beat we release in the next 6 months is added to your
              library automatically. New drops every week — by month 6 you
              have a meaningfully bigger catalog than you started with.
            </p>
            <p className="bundle-stack-value">Stand-alone value: $300+</p>
          </article>

          <article className="bundle-stack-card">
            <span className="bundle-stack-tag">Bonus #4</span>
            <h3 className="bundle-stack-h">Producer Bundle license (PDF)</h3>
            <p className="bundle-stack-p">
              Plain-English contract: 50/50 publishing, 100% master to you,
              500K stream cap per track, 3 videos per beat, sync income
              50/50. Auto-attached to your purchase email.{" "}
              <Link href="/licenses/producer-bundle-license.md">Read it now ↗</Link>
            </p>
            <p className="bundle-stack-value">Stand-alone value: included</p>
          </article>

          <article className="bundle-stack-card">
            <span className="bundle-stack-tag">Bonus #5</span>
            <h3 className="bundle-stack-h">Discord — Beatmakers channel</h3>
            <p className="bundle-stack-p">
              Buyer-only channel. Share your tracks, get feedback, hear
              about the next bundle expansion before everyone else. Raymond
              is in there daily.
            </p>
            <p className="bundle-stack-value">Stand-alone value: priceless</p>
          </article>
        </div>

        <div className="bundle-total-line">
          <span>Total stand-alone value:</span>
          <span className="bundle-total-strike">$3,274+</span>
          <span className="bundle-total-arrow">→</span>
          <span className="bundle-total-now">$79 today</span>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bundle-guarantee">
        <span className="bundle-guarantee-tag">🛡 30-day refund guarantee</span>
        <h2 className="bundle-h2-tight">
          If the bundle doesn't slap, take your $79 back.
        </h2>
        <p className="bundle-guarantee-p">
          Email <a href="mailto:licensing@sneakzandbeatz.com">licensing@sneakzandbeatz.com</a>{" "}
          inside 30 days, full refund. You agree to stop using the files,
          that's the only condition. We'd rather lose the $79 than have
          someone using the catalog who isn't feeling it.
        </p>
      </section>

      {/* FAQ */}
      <section className="bundle-faq">
        <h2 className="bundle-h2">Questions before you check out</h2>
        <div className="bundle-faq-list">
          {FAQ.map(([q, a], i) => (
            <details key={i} className="bundle-faq-item">
              <summary className="bundle-faq-q">{q}</summary>
              <p className="bundle-faq-a">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bundle-bottom-cta">
        <h2 className="bundle-h2">Ready?</h2>
        <p className="bundle-bottom-line">
          {totalBeats} beats. WAV + stems. Drum kit. Mix consult. 6 months of
          future drops. License auto-delivered. $79.
        </p>
        <a
          href={STRIPE_LINKS.standardBundle}
          className="bundle-cta"
          aria-label="Lock in the producer bundle"
        >
          LOCK IN THE BUNDLE — $79
          <span className="bundle-cta-sub">
            Stripe-secured · auto-deliver · 30-day refund
          </span>
        </a>

        <p className="bundle-foot-link">
          Want even more? <Link href="/beats/bundles">See Starter / Standard / Exclusive →</Link>
        </p>
        <p className="bundle-foot-fine">
          Producer of record: Black Royal Music Media LLC, Los Angeles County, CA
          ·{" "}
          <Link href="/licensing">Full license terms</Link> ·{" "}
          <Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link>
        </p>
      </section>
    </main>
  );
}
