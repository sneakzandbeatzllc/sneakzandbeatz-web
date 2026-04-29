import Link from "next/link";
import { STRIPE_LINKS } from "@/data/stripe-links";

/**
 * /bundle/upsell — One-Time-Offer page (Russell-Brunson-style OTO)
 *
 * This page is the success_url destination of the Standard Bundle Stripe
 * checkout. The buyer just paid $79 — they're committed. We show them ONE
 * upgrade offer they can only get on this page, right now: upgrade to the
 * Exclusive Bundle for the difference ($418 instead of full $497).
 *
 * If they accept → Stripe checkout for the upgrade → /bundle/thank-you
 * If they decline → /bundle/thank-you (they keep the $79 standard bundle)
 *
 * IMPORTANT (Stripe config): the Standard Bundle payment link must have its
 * success_url set to https://sneakzandbeatz.com/bundle/upsell. Configure in
 * Stripe Dashboard → Payment Links → Standard Bundle → Confirmation page →
 * "Don't show confirmation page" + custom URL.
 */
export const metadata = {
  title: "Upgrade to Exclusive — Save $79 | Sneakz & Beatz",
  description:
    "Today only — upgrade your Standard Bundle to Exclusive for $418 instead of $497. 5 beats removed from the catalog forever, full publishing transfer, lifetime updates.",
  robots: { index: false, follow: false },
};

const EXCLUSIVE_INCLUDES = [
  "Everything from your Standard Bundle (already in your inbox)",
  "5 fully exclusive beats — your pick — pulled from the public catalog forever",
  "100% publishing transfer on those 5 beats (no 50/50 split)",
  "100% sync income on those 5 beats — every TV, film, ad, game placement",
  "Producer credit waived on the 5 — credit yourself or co-credit anyone",
  "Lifetime updates — every beat we ever release added to your library, free",
  "Direct DM/email line to Raymond for custom requests + sample-flip ideas",
  "DistroKid affiliate kit — release your tracks the right way",
];

export default function BundleUpsellPage() {
  return (
    <main className="bundle-funnel bundle-oto">
      <div className="bundle-urgency bundle-urgency-warn">
        ⚠ ONE-TIME OFFER · Only available on this page · Expires when you leave
      </div>

      <section className="bundle-hero bundle-oto-hero">
        <span className="bundle-eyebrow">
          Wait — you just got Standard. Read this before you close the tab.
        </span>

        <h1 className="bundle-h1">
          Upgrade to <span className="accent">Exclusive</span> for{" "}
          <span className="accent">$418</span> instead of <s>$497</s>.
        </h1>

        <p className="bundle-subhead">
          You paid $79 for the Standard Bundle 60 seconds ago. Today only,
          on this page only, you can upgrade to the Exclusive tier for the
          difference. If you click off this page, the Exclusive Bundle goes
          back to its full $497. No fake countdown — once you navigate
          away, this offer is closed for good.
        </p>

        <div className="bundle-price-block">
          <div className="bundle-price-anchor">
            <span className="bundle-price-anchor-label">Exclusive Bundle (regular):</span>
            <span className="bundle-price-anchor-amount">$497</span>
            <span className="bundle-price-anchor-detail">
              Less your $79 already paid → $418 today
            </span>
          </div>
          <div className="bundle-price-today">
            <span className="bundle-price-today-label">Upgrade today:</span>
            <span className="bundle-price-today-amount">$418</span>
            <span className="bundle-price-today-detail">
              You save <strong>$79</strong> — exactly what you already paid
            </span>
          </div>
        </div>

        <a
          href={STRIPE_LINKS.exclusiveBundle}
          className="bundle-cta"
          aria-label="Upgrade to exclusive for 418 dollars"
        >
          YES — UPGRADE ME TO EXCLUSIVE ($418)
          <span className="bundle-cta-sub">
            Secure Stripe checkout · processed against the same card
          </span>
        </a>

        <p className="bundle-trust">
          🔒 Stripe-secured · One-time payment · No subscription
        </p>
      </section>

      <section className="bundle-stack">
        <h2 className="bundle-h2">
          What Exclusive adds on top of your Standard Bundle
        </h2>
        <ul className="bundle-oto-list">
          {EXCLUSIVE_INCLUDES.map((item, i) => (
            <li key={i} className="bundle-oto-item">
              <span className="bundle-oto-check" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bundle-guarantee">
        <span className="bundle-guarantee-tag">🛡 30-day refund — same as the Standard tier</span>
        <h2 className="bundle-h2-tight">
          Same refund window. Same plain-English terms.
        </h2>
        <p className="bundle-guarantee-p">
          The Exclusive upgrade carries the same 30-day satisfaction
          guarantee. The 5 exclusive beats are non-refundable only after
          they've been registered to you with a rights organization or
          released on a track — that's standard industry practice.
        </p>
      </section>

      <section className="bundle-bottom-cta">
        <h2 className="bundle-h2">Two options. Pick one.</h2>
        <a
          href={STRIPE_LINKS.exclusiveBundle}
          className="bundle-cta"
          aria-label="Lock in the upgrade"
        >
          LOCK IN THE UPGRADE — $418
          <span className="bundle-cta-sub">
            Or skip below — but you can never reopen this offer
          </span>
        </a>

        <Link href="/bundle/thank-you" className="bundle-decline">
          No thanks — keep my Standard Bundle and send me to my downloads →
        </Link>

        <p className="bundle-foot-fine">
          Producer of record: Black Royal Music Media Group Inc., Los Angeles County, CA
          ·{" "}
          <Link href="/licensing">Full license terms</Link>
        </p>
      </section>
    </main>
  );
}
