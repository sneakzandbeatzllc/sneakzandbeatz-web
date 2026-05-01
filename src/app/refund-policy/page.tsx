import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy — Sneakz & Beatz",
  description:
    "Sneakz & Beatz refund and cancellation terms for beats, bundles, and merch. Plain-English digital-goods policy.",
};

export default function RefundPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Refund Policy</span>
          <h1 className="legal-title">
            Refunds.
            <br />
            <span className="accent">When We Will. When We Won&rsquo;t.</span>
          </h1>
          <p className="lead legal-lead">
            Beats and bundles are digital downloads — once you have the file, the
            sale is final. Here&rsquo;s the short list of exceptions, plus the
            pre-launch merch policy for when that drops.
          </p>
          <p className="legal-effective">
            Effective: April 1, 2026 · Operator: Black Royal Music Media Group Inc., San Diego, CA
            {" "}· Contact: <a href="mailto:support@sneakzandbeatz.com">support@sneakzandbeatz.com</a>
          </p>
        </header>

        <section className="legal-section">
          <h2>1. Digital goods — beats, bundles, exclusives</h2>
          <p>
            All beat sales (Free Standard download, $29.99 Single Beat Lease,
            $79+ Vault bundle, $497 Exclusive) are <strong>final once the
            download link is delivered</strong>. This is industry-standard for
            digital audio and matches Stripe + most card-network expectations
            for non-tangible goods.
          </p>

          <h3>Exceptions — we WILL refund when:</h3>
          <ul>
            <li>
              <strong>Duplicate purchase.</strong> If you accidentally bought
              the same beat or bundle twice within 24 hours, email us and we
              refund the duplicate immediately.
            </li>
            <li>
              <strong>Technical failure.</strong> If your download link is
              broken, the file is corrupted, or the WAV/MP3 won&rsquo;t play in
              standard software (Logic, FL Studio, Ableton, Pro Tools), email us
              within 7 days. We&rsquo;ll either send a fresh link or refund.
            </li>
            <li>
              <strong>Unauthorized charge.</strong> If a Sneakz &amp; Beatz
              charge appears on your card and you didn&rsquo;t make the
              purchase, email us first before disputing — most cases are
              resolved in under 24 hours.
            </li>
          </ul>

          <h3>What we WON&rsquo;T refund:</h3>
          <ul>
            <li>Buyer&rsquo;s remorse / change of mind after download</li>
            <li>Beats you decided you don&rsquo;t want to use after listening to the full untagged WAV</li>
            <li>Bundles where you&rsquo;ve already downloaded any portion of the catalog</li>
            <li>Exclusive beat purchases after the WAV + stems have been delivered (the beat is then taken off the market for the buyer&rsquo;s exclusive use)</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. Subscription and recurring charges</h2>
          <p>
            Sneakz &amp; Beatz does not currently sell subscription products.
            Every transaction is a one-time charge. If a recurring charge
            appears on your statement claiming to be from us, it is fraudulent —
            email <a href="mailto:support@sneakzandbeatz.com">support@sneakzandbeatz.com</a>
            {" "}immediately and we will help you dispute it.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Merch (when it launches)</h2>
          <p>
            Physical merch is print-on-demand and made-to-order. Once we
            officially launch (target: August 1, 2026), the merch refund policy
            will be:
          </p>
          <ul>
            <li>
              <strong>Defective or damaged on arrival</strong> — full refund or
              replacement. Send a photo within 14 days of delivery to{" "}
              <a href="mailto:support@sneakzandbeatz.com">support@sneakzandbeatz.com</a>.
            </li>
            <li>
              <strong>Wrong item shipped</strong> — full refund + we cover the
              return shipping.
            </li>
            <li>
              <strong>Sizing exchange</strong> — exchange allowed within 14
              days of delivery, subject to inventory. Buyer covers outbound
              return shipping; we cover the replacement shipping.
            </li>
            <li>
              <strong>Buyer&rsquo;s remorse</strong> — no refund. Print-on-demand
              means each piece was custom-produced for you.
            </li>
          </ul>
          <p>
            <em>This section will be updated when merch goes live. Pre-order
            interest list signups have no purchase obligation.</em>
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Rap Challenge entry fees</h2>
          <p>
            Rap Challenge entry fees are non-refundable once submission is
            received. See the{" "}
            <Link href="/rap-challenge/rules">Official Sweepstakes Rules</Link>
            {" "}for the full eligibility, judging, and prize-distribution terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. How to request a refund</h2>
          <ol>
            <li>
              Email <a href="mailto:support@sneakzandbeatz.com">support@sneakzandbeatz.com</a>
              {" "}from the email address you used to make the purchase.
            </li>
            <li>
              Include the order number (in your Stripe receipt) and a sentence
              about the issue.
            </li>
            <li>
              We respond within 2 business days. Approved refunds reach your
              card or bank in 5-10 business days, depending on your bank.
            </li>
          </ol>
          <p>
            If we deny a refund and you still believe you&rsquo;re entitled to
            one, you may dispute the charge with your card issuer. Card-network
            chargebacks for digital goods are typically denied unless you can
            show a technical failure.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Beat license terms apply separately</h2>
          <p>
            A refund returns your money. It does <strong>not</strong> reset
            license usage retroactively — if you&rsquo;ve already published a
            song using a refunded beat, you must take down the song or purchase
            the lease again. The full lease terms live at{" "}
            <Link href="/licensing">/licensing</Link>.
          </p>
        </section>

        <p className="legal-foot">
          See also: <Link href="/terms">Terms of Service</Link> ·{" "}
          <Link href="/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/licensing">Beat Licensing Terms</Link> ·{" "}
          <Link href="/dmca">DMCA Policy</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
