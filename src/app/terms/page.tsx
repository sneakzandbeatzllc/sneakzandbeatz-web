import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Sneakz & Beatz",
  description:
    "Terms of service for sneakzandbeatz.com — site usage, beat purchases, refunds, and dispute resolution.",
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Terms of Service</span>
          <h1 className="legal-title">
            Terms of Service.
            <br />
            <span className="accent">The Rules of the Road.</span>
          </h1>
          <p className="lead legal-lead">
            By using sneakzandbeatz.com you agree to the terms below. We've kept it as short
            and concrete as a real legal document allows. For specifics on what you can do
            with a beat after you license it, read the{" "}
            <Link href="/licensing">Beat Licensing Terms</Link>.
          </p>
          <p className="legal-effective">
            Effective: April 1, 2026 · Operator: Black Royal Music Media LLC, San Diego, CA
            {" "}· Contact: <a href="mailto:terms@sneakzandbeatz.com">terms@sneakzandbeatz.com</a>
          </p>
        </header>

        <section className="legal-section">
          <h2>1. Agreement</h2>
          <p>
            These Terms of Service ("Terms") form a binding agreement between you and Black
            Royal Music Media LLC, a California limited liability company doing business as
            "Sneakz &amp; Beatz" ("BRMG", "we", "us"). They govern your use of
            sneakzandbeatz.com, related subdomains, our newsletter, and any beat or bundle
            you purchase from us. If you don't agree with any of the Terms, please do not use
            the site.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Eligibility</h2>
          <p>
            You must be at least 18 years old, or the age of legal majority in your
            jurisdiction, to make a purchase or enter into any license with us. By using the
            site you represent that you meet that requirement and that any information you
            provide (name, billing address, email) is accurate.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. The site + the catalog</h2>
          <p>
            We may update, change, or discontinue any part of the site without notice. We
            strive to keep the catalog accurate but do not guarantee that every beat title,
            BPM, or category label is error-free. Audio previews are 60-second clips intended
            to help you decide; the full master is delivered after purchase.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Purchases + payment</h2>
          <p>
            Payments are processed by Stripe. By completing checkout, you authorize Stripe
            to charge your selected payment method for the purchase total shown. Local taxes
            and currency conversions are handled by Stripe based on your billing address. All
            prices are listed in U.S. dollars unless otherwise noted.
          </p>
          <p>
            Klarna and Afterpay buy-now-pay-later options may appear at checkout where
            eligible — the agreement for those installments is between you and the
            respective provider.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. License — what you're actually buying</h2>
          <p>
            When you purchase a beat or bundle you are not buying the underlying composition.
            You are buying a license under one of three tiers (Lease, Premium / Bundle, or
            Exclusive) detailed in our{" "}
            <Link href="/licensing">Beat Licensing Terms</Link>. That document is
            incorporated into these Terms by reference. Read it before you purchase.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. 30-day satisfaction guarantee + refunds</h2>
          <p>
            All beat and bundle purchases include a 30-day satisfaction guarantee. To request
            a refund, email terms@sneakzandbeatz.com within 30 days of purchase with
            your order email and the beat or bundle title. Refunds are issued to the
            original payment method within 5 business days of approval. By accepting a refund
            you forfeit any license rights you were granted and agree to delete the
            delivered files and any derivative works that have been published. Exclusive
            purchases that have already been registered to you with a rights organization
            (BMI, ASCAP, etc.) are not refundable.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Acceptable use</h2>
          <p>You agree NOT to:</p>
          <ul>
            <li>Reverse-engineer, scrape at scale, or rate-limit-bust the site</li>
            <li>Attempt to bypass payment to download beats or bundle content</li>
            <li>Resell, redistribute, or relicense the bare beat audio (with no vocal performance) to third parties</li>
            <li>Use the beats in content that promotes hate speech, terrorism, or sexualized content involving minors</li>
            <li>Impersonate BRMG, the producers, or any other person</li>
            <li>Upload malware, viruses, or harmful code</li>
          </ul>
          <p>
            Violation of any of the above is grounds for immediate termination of your
            license without refund.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Intellectual property</h2>
          <p>
            All content on the site — beats, mockups, written editorial, photography, and
            visual design — is owned by BRMG or licensed to us, and is protected by U.S. and
            international copyright and trademark law. The "Sneakz &amp; Beatz" wordmark and
            logo are trademarks of BRMG. Other brand names and trademarks displayed on the
            site (sneakers, anime, gaming) belong to their respective owners; their mention
            does not imply endorsement.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. DMCA + copyright complaints</h2>
          <p>
            If you believe content on sneakzandbeatz.com infringes your copyright, send a
            takedown notice to{" "}
            <a href="mailto:dmca@sneakzandbeatz.com">dmca@sneakzandbeatz.com</a>
            {" "}with the subject "DMCA Notice" containing: (a) identification of the
            copyrighted work; (b) the URL of the allegedly infringing material; (c) your
            contact information; (d) a statement of good-faith belief that the use is
            unauthorized; (e) a statement under penalty of perjury that the information is
            accurate and you are authorized to act for the rights holder; and (f) your
            physical or electronic signature.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Disclaimers</h2>
          <p>
            The site is provided "as is" and "as available." We do not warrant that the site
            will be uninterrupted, error-free, or free of viruses. Audio file downloads
            depend on third-party CDNs and your internet connection, neither of which we
            control. To the maximum extent permitted by law, we disclaim all warranties,
            express or implied, including merchantability, fitness for a particular purpose,
            and non-infringement.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, BRMG's total liability to you for any
            claim arising out of or relating to these Terms or your use of the site is
            limited to the amount you paid us in the 12 months immediately preceding the
            claim. We are not liable for any indirect, incidental, consequential, special,
            exemplary, or punitive damages — including lost profits, lost revenue, or
            damaged reputation — even if we've been advised of the possibility.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless BRMG, its members, and its
            employees from any claims, losses, damages, liabilities, and expenses (including
            reasonable attorneys' fees) arising out of: (a) your violation of these Terms or
            the Beat Licensing Terms; (b) your use of the site; or (c) any content you
            create using a beat licensed from us, to the extent such content violates the
            license tier you purchased.
          </p>
        </section>

        <section className="legal-section">
          <h2>13. Governing law + dispute resolution</h2>
          <p>
            These Terms are governed by the laws of the State of California, U.S.A., without
            regard to its conflict-of-laws rules. Any dispute that cannot be resolved by
            good-faith email correspondence within 30 days will be settled by binding
            arbitration in San Diego County, California, under the rules of the American
            Arbitration Association. Each party bears its own legal fees unless the
            arbitrator awards otherwise. You and BRMG each waive any right to a jury trial
            or to participate in a class action.
          </p>
        </section>

        <section className="legal-section">
          <h2>14. Changes to these terms</h2>
          <p>
            We may update these Terms when we add features, change pricing, or are required
            to by law. Material changes are announced via the newsletter at least 14 days
            before they take effect. Continued use of the site after changes take effect
            constitutes acceptance.
          </p>
        </section>

        <section className="legal-section">
          <h2>15. Severability + entire agreement</h2>
          <p>
            If any provision of these Terms is held unenforceable, the remaining provisions
            stay in effect. These Terms, together with the{" "}
            <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/licensing">Beat Licensing Terms</Link>, constitute the entire
            agreement between you and BRMG regarding your use of the site and supersede
            any prior agreements.
          </p>
        </section>

        <section className="legal-section">
          <h2>16. Contact</h2>
          <p>
            Legal notices and questions:{" "}
            <a href="mailto:terms@sneakzandbeatz.com">terms@sneakzandbeatz.com</a>
            {" "}with subject "Legal" or "Terms".
          </p>
        </section>

        <p className="legal-foot">
          See also: <Link href="/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/licensing">Beat Licensing Terms</Link> ·{" "}
          <Link href="/contact">Contact &amp; Support</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
