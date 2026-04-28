import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Sneakz & Beatz",
  description:
    "How Sneakz & Beatz / Black Royal Music Media LLC collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Privacy Policy</span>
          <h1 className="legal-title">
            Privacy Policy.
            <br />
            <span className="accent">Plain English. No Tricks.</span>
          </h1>
          <p className="lead legal-lead">
            This page explains what information sneakzandbeatz.com collects, why we collect
            it, who we share it with, and how to remove your data. We try to write it the
            way we'd want it written for us — short paragraphs, real specifics.
          </p>
          <p className="legal-effective">
            Effective: April 1, 2026 · Operator: Black Royal Music Media LLC, San Diego, CA
            {" "}· Contact: <a href="mailto:privacy@sneakzandbeatz.com">privacy@sneakzandbeatz.com</a>
          </p>
        </header>

        <section className="legal-section">
          <h2>1. Who we are</h2>
          <p>
            "Sneakz &amp; Beatz" is a brand operated by Black Royal Music Media LLC ("BRMG",
            "we", "us"), a California limited liability company. This Privacy Policy applies
            to the website at sneakzandbeatz.com and to email newsletters, beat-store
            transactions, and customer-support correspondence we conduct under the Sneakz
            &amp; Beatz brand.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information we collect</h2>
          <h3>Information you provide</h3>
          <ul>
            <li><strong>Email address</strong> — when you subscribe to the newsletter or buy a beat or bundle.</li>
            <li><strong>Name + billing address</strong> — collected by our payment processor, Stripe, when you complete a purchase. We see only what Stripe forwards to us in order fulfillment.</li>
            <li><strong>Customer-support correspondence</strong> — anything you email us at privacy@sneakzandbeatz.com.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Server logs</strong> — IP address, user agent, requested URL, timestamp. Used for security, debugging, and abuse prevention. Retained 90 days.</li>
            <li><strong>Audio-preview analytics</strong> — when a beat preview is played we may record an anonymous play count, but we do not link plays to your email or identity.</li>
            <li><strong>Aggregate analytics</strong> — page views and referrers via Vercel Analytics in privacy-preserving mode (no cookies, no fingerprinting, IP truncated).</li>
          </ul>
          <h3>What we don't collect</h3>
          <p>
            We don't collect credit card numbers, bank account numbers, or government IDs.
            Payment information is entered directly on Stripe-hosted checkout pages and never
            transits our servers. We don't run third-party advertising trackers or sell data
            to third parties.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. How we use it</h2>
          <ul>
            <li>To deliver the beat or bundle you purchased (download links, license summary, customer-support replies)</li>
            <li>To send the email newsletter you subscribed to (you can unsubscribe at any time via the footer link in every issue)</li>
            <li>To detect and prevent fraud, abuse, or DDoS against the site</li>
            <li>To comply with legal obligations (tax records, response to lawful subpoenas)</li>
          </ul>
          <p>
            We will not use your email for marketing other products without your explicit consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Who we share it with</h2>
          <p>We share data with the minimum set of vendors needed to operate the site:</p>
          <ul>
            <li><strong>Stripe</strong> — payment processing. Stripe receives your name, email, billing address, and payment details directly from you on their hosted checkout. <a href="https://stripe.com/privacy" target="_blank" rel="noopener">Stripe's Privacy Policy</a>.</li>
            <li><strong>Vercel</strong> — website hosting and analytics. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">Vercel's Privacy Policy</a>.</li>
            <li><strong>Substack</strong> — newsletter delivery for sneakzandbeatz.substack.com. <a href="https://substack.com/privacy" target="_blank" rel="noopener">Substack's Privacy Policy</a>.</li>
            <li><strong>Klaviyo / Mailchimp</strong> — transactional and marketing email (only if you specifically opt into a campaign list).</li>
            <li><strong>Our customer-support email</strong> — Gmail, hosted by Google, used for privacy@sneakzandbeatz.com correspondence. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a>.</li>
          </ul>
          <p>
            We do not sell your personal information to anyone. We do not share your email
            address with other newsletters or producers.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Cookies + similar technologies</h2>
          <p>
            sneakzandbeatz.com uses only the cookies strictly necessary to keep the site
            running (e.g., a session cookie that remembers which beat preview is currently
            playing while you scroll). We do not use advertising cookies, third-party
            tracking pixels, or cross-site identifiers. Your browser's "Do Not Track" signal
            is honored — we do not adjust behavior based on it because we do not track to
            begin with.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Your rights (CCPA, GDPR, and everyone else)</h2>
          <p>Regardless of where you live, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — get a copy of the personal information we have about you</li>
            <li><strong>Correct</strong> — update inaccurate or outdated information</li>
            <li><strong>Delete</strong> — have us erase your information (subject to legal record-keeping; e.g., transaction records retained 7 years for tax purposes)</li>
            <li><strong>Port</strong> — receive your information in a portable, machine-readable format</li>
            <li><strong>Opt-out of email</strong> — unsubscribe at any time via the footer link or email privacy@sneakzandbeatz.com</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href="mailto:privacy@sneakzandbeatz.com">privacy@sneakzandbeatz.com</a>{" "}
            with the subject line "Privacy Request" and we'll respond within 30 days. We may
            ask you to verify your identity (e.g., reply from the email associated with the
            account) before processing.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Data retention</h2>
          <ul>
            <li><strong>Order records:</strong> 7 years (US tax + accounting requirements)</li>
            <li><strong>Newsletter subscriber list:</strong> until you unsubscribe</li>
            <li><strong>Server logs:</strong> 90 days</li>
            <li><strong>Customer-support email threads:</strong> 24 months, then deleted</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. Children's privacy</h2>
          <p>
            sneakzandbeatz.com is not directed to children under 13. We do not knowingly
            collect personal information from children under 13. If a parent or guardian
            believes their child has provided us with personal information, they should
            contact us at privacy@sneakzandbeatz.com and we will delete it.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. International transfers</h2>
          <p>
            Our servers and most of our vendors are based in the United States. If you visit
            us from outside the U.S., your information is transferred to and processed in the
            U.S. By using the site, you consent to that transfer.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Changes to this policy</h2>
          <p>
            We update this policy when we add new vendors, launch new features, or are
            required to by law. The "Effective" date at the top reflects the most recent
            change. Material changes (e.g., new tracking, new data sharing) will be announced
            via the newsletter at least 14 days before they take effect.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contact</h2>
          <p>
            Questions about this policy or how your information is handled? Email{" "}
            <a href="mailto:privacy@sneakzandbeatz.com">privacy@sneakzandbeatz.com</a>.
            We respond to privacy-related correspondence within 5 business days.
          </p>
          <p>
            Mailing address (for legal notices):<br />
            <strong>Black Royal Music Media LLC</strong><br />
            <em>(Address on file with the California Secretary of State — see{" "}
            <Link href="/contact">contact</Link>.)</em>
          </p>
        </section>

        <p className="legal-foot">
          See also: <Link href="/terms">Terms of Service</Link> ·{" "}
          <Link href="/licensing">Beat Licensing Terms</Link> ·{" "}
          <Link href="/contact">Contact &amp; Support</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
