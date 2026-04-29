import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Contact & Support — Sneakz & Beatz",
  description:
    "Customer support, licensing questions, press inquiries, and general contact for Sneakz & Beatz / Black Royal Music Media Group Inc..",
};

const TOPICS: { tag: string; heading: string; body: string; email: string; subject: string }[] = [
  {
    tag: "Customer Support",
    heading: "Order, download, or refund question",
    body: "Bought a beat or bundle and need help with your download link, want to use the 30-day money-back guarantee, or need a duplicate receipt? This is the lane.",
    email: EMAILS.support,
    subject: "Customer Support",
  },
  {
    tag: "Licensing",
    heading: "Licensing, exclusives, or custom beats",
    body: "Want exclusive rights on a specific beat, need a custom production, or have a sync placement opportunity? Send the project details and we'll get back with terms.",
    email: EMAILS.licensing,
    subject: "Licensing Inquiry",
  },
  {
    tag: "Press",
    heading: "Press, media, podcast bookings",
    body: "Press kit requests, podcast bookings, journalist inquiries. See our /press page for the press kit before reaching out — most questions are answered there.",
    email: EMAILS.press,
    subject: "Press Inquiry",
  },
  {
    tag: "Partnerships",
    heading: "Sponsorships, brand deals, UGC",
    body: "Brand partnerships, sponsorship opportunities, UGC creator collabs, or apparel collaborations. Tell us what you're working on and what fit you see.",
    email: EMAILS.partnerships,
    subject: "Partnership Inquiry",
  },
  {
    tag: "Booking",
    heading: "PHRHX Show guests, performances",
    body: "Pitch yourself or a guest for The PHRHX Show, or book Sneakz & Beatz for an event, performance, or live mix.",
    email: EMAILS.booking,
    subject: "Booking",
  },
  {
    tag: "Privacy",
    heading: "CCPA / GDPR data requests, privacy",
    body: "Access, correction, deletion, or portability requests under California's CCPA or the EU's GDPR. We respond within 30 days.",
    email: EMAILS.privacy,
    subject: "Privacy Request",
  },
  {
    tag: "Legal",
    heading: "Contracts, ToS questions, legal notices",
    body: "Contract review, ToS or licensing-language questions, court filings, and any other legal correspondence outside DMCA.",
    email: EMAILS.legal,
    subject: "Legal",
  },
  {
    tag: "DMCA",
    heading: "Copyright takedown notices",
    body: "If content on sneakzandbeatz.com infringes your copyright, send a DMCA takedown notice with the required elements listed in our Terms of Service.",
    email: EMAILS.dmca,
    subject: "DMCA Notice",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Contact &amp; Support</span>
          <h1 className="legal-title">
            Get In Touch.
            <br />
            <span className="accent">We Actually Reply.</span>
          </h1>
          <p className="lead legal-lead">
            Pick the topic that fits — every card below routes to a dedicated inbox so the
            right person sees your message and can reply within one business day. General
            questions can also go to <a href={mailto(EMAILS.info)}>{EMAILS.info}</a>.
          </p>
          <p className="legal-effective">
            Hours: Mon–Fri, 9 AM – 6 PM Pacific · Typical reply: under 24 hours
            {" "}· Beat downloads &amp; refunds: same day
          </p>
        </header>

        <div className="contact-grid">
          {TOPICS.map((t) => (
            <a
              key={t.tag}
              href={mailto(t.email, t.subject)}
              className="contact-card"
            >
              <span className="contact-card-tag">{t.tag}</span>
              <h2 className="contact-card-h">{t.heading}</h2>
              <p className="contact-card-body">{t.body}</p>
              <span className="contact-card-cta">{t.email} →</span>
            </a>
          ))}
        </div>

        <section className="legal-section">
          <h2>Quick FAQs before you email</h2>
          <details className="contact-faq">
            <summary>I bought a beat but didn't get the download link</summary>
            <p>
              Stripe sends the receipt email instantly with a download link. If you don't see
              it, check spam (especially Gmail's Promotions tab). If it's truly missing, email
              us with the email address you used at checkout and the beat title — we'll resend
              within an hour during business hours.
            </p>
          </details>
          <details className="contact-faq">
            <summary>How does the 30-day refund work?</summary>
            <p>
              Email us within 30 days of purchase with your order email and the beat or
              bundle title. Refunds are issued to the original payment method within 5
              business days, no questions asked. By accepting the refund you agree to delete
              the delivered files and any derivative works that have been published. See{" "}
              <Link href="/licensing">licensing terms</Link> for full details.
            </p>
          </details>
          <details className="contact-faq">
            <summary>Can I get exclusive rights on a beat I already leased?</summary>
            <p>
              Yes — your $29.99 lease price is credited toward the exclusive purchase. Email
              with the beat title and we'll send a Stripe Checkout link with the credit
              applied. Exclusive pricing is typically $250–$1,500 per beat, negotiated based
              on the beat's catalog activity.
            </p>
          </details>
          <details className="contact-faq">
            <summary>How long until I hear back?</summary>
            <p>
              Customer support and order issues: same business day. Licensing and press: 24–48
              hours. Legal correspondence: 5 business days.
            </p>
          </details>
        </section>

        <section className="legal-section">
          <h2>Mailing address</h2>
          <p>
            <strong>Black Royal Music Media Group Inc.</strong><br />
            Mailing address on file with the California Secretary of State.<br />
            For legal notices, request the current address by emailing{" "}
            <a href={mailto(EMAILS.legal, "Mailing Address Request")}>{EMAILS.legal}</a>{" "}
            with subject "Mailing Address Request".
          </p>
        </section>

        <p className="legal-foot">
          See also: <Link href="/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/terms">Terms of Service</Link> ·{" "}
          <Link href="/licensing">Beat Licensing Terms</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
