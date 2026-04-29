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
          <span className="creators-cta-eyebrow">⚡ S&B UGC Creator Program</span>
          <h2 className="creators-cta-h2">
            Get paid to <span className="accent">wear the drop.</span>
          </h2>
          <p className="creators-cta-sub">
            Real money for real creators. S&B merch, matching Jordans, your
            following, our brief.
          </p>

          <ul className="creators-cta-bullets">
            <li>We ship the fit.</li>
            <li>You match the Js.</li>
            <li>You keep the check.</li>
          </ul>

          <p className="creators-cta-paragraph">
            You&rsquo;ve already been styling these in your head — biker shorts,
            fitted set, hat low, fresh Js on. We&rsquo;re paying creators between
            5K and 10K to bring that energy to camera. Tiered rates, clear
            deliverables, no clout-currency nonsense. If your feed reads
            athletic-lifestyle-streetwear and your engagement is real, this brief
            was written for you.
          </p>

          <Link href="/creators" className="btn btn-primary btn-arrow creators-cta-btn">
            Pull Up
          </Link>
        </div>
      </div>
    </section>
  );
}
