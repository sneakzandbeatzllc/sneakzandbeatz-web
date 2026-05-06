/**
 * CreatorsCTA.tsx
 *
 * Homepage teaser for the S&B UGC Creator Program. Sits between the
 * BrandPhotos section and the Newsletter — pure pull, no rates / rules /
 * disclaimers. The full brief lives at /creators.
 *
 * Conversion target: 8%+ CTR to /creators.
 */

import Link from "next/link";

export default function CreatorsCTA() {
  return (
    <section className="creators-cta">
      <div className="container creators-cta-inner">
        <div className="creators-cta-text">
          <span className="creators-cta-eyebrow">⚡ S&B Girls Program</span>
          <h2 className="creators-cta-h2">
            Be an <span className="accent">S&B Girl.</span>
          </h2>
          <p className="creators-cta-sub">
            Contracted ambassador program. Monthly retainer. S&B merch ships
            free. Matching Jordan retros. <strong>18+ only.</strong>
          </p>

          <ul className="creators-cta-bullets">
            <li>We ship the fit.</li>
            <li>You match the Js.</li>
            <li>You get the bag.</li>
          </ul>

          <p className="creators-cta-paragraph">
            S&B Girls is a signed-contract retainer program — body-confident
            lifestyle content lane: fitted styling, mirror shots, fitted set +
            biker shorts + Jordan retros. <strong>Three tiers — $500, $750,
            $1K per month</strong> on a 90 or 180-day term to start. We ship
            the merch line free, you keep what we send, you hit your monthly
            content quota, we pay on the 1st via Stripe. No clout-currency,
            no fake-flex agency math. We&rsquo;re a new brand and these are
            honest launch retainers — they scale up the moment the program
            proves out.
          </p>

          <Link href="/creators" className="btn btn-primary btn-arrow creators-cta-btn">
            Pull Up
          </Link>
        </div>
      </div>
    </section>
  );
}
