import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Work With Us — Sneakz & Beatz",
  description:
    "Brand partnerships, sponsorships, UGC creator collabs, and apparel collaborations with Sneakz & Beatz / Black Royal Music Media Group Inc..",
};

const TRACKS: { tag: string; heading: string; body: string; bullets: string[]; subject: string }[] = [
  {
    tag: "Sponsorships",
    heading: "Sponsor a newsletter, podcast, or beat drop",
    body: "Reach our culture-engaged audience across the daily newsletter, The PHRHX Show, and the Beat Store. We work with brands that match the audience we built.",
    bullets: [
      "Newsletter sponsorship — 1 dedicated section per drop",
      "PHRHX Show — 60-second mid-roll or full-episode title sponsor",
      "Beat-store integration — sponsored beat releases or sample packs",
      "Cross-channel launches with Substack post + IG + TikTok push",
    ],
    subject: "Sponsorship Inquiry",
  },
  {
    tag: "Brand Partnerships",
    heading: "Co-branded products, drops, and apparel collabs",
    body: "Sneaker brands, streetwear labels, anime distributors, and gaming peripherals — we co-create. Limited drops, audience-fit alignment, story-first launches.",
    bullets: [
      "Co-branded sneaker / streetwear capsule",
      "Anime or gaming x music crossover beat packs",
      "PHRHX Show special episodes around your launch",
      "Long-term ambassador arrangements (multi-quarter)",
    ],
    subject: "Brand Partnership",
  },
  {
    tag: "UGC Creators",
    heading: "Apparel modeling + content creator roster",
    body: "We're building a creator roster for upcoming Sneakz & Beatz apparel drops. Content creators in sneaker, hip-hop, anime, and gaming spaces — paid + product collabs.",
    bullets: [
      "Lookbook + social-content shoots for new drops",
      "TikTok / Reels / Shorts creators (1K+ engaged followers — quality over quantity)",
      "Affiliate program for high-performing creators",
      "Featured creator spotlight on the newsletter + PHRHX Show",
    ],
    subject: "UGC Creator Application",
  },
  {
    tag: "Roles",
    heading: "Hiring: editors, designers, cutters",
    body: "We're building a small but talented internal team. Send a 30-second pitch + portfolio if you fit any of the below — we read everything.",
    bullets: [
      "Editorial — sneaker, hip-hop, anime, or gaming verticals (writer)",
      "Video editor — short-form (Reels / TikTok) + long-form (PHRHX Show cuts)",
      "Designer — visual identity for drops, social, packaging",
      "Producer — additional beat production for the BRMG catalog",
    ],
    subject: "Hiring — [your role]",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Work With Us · Partnerships</span>
          <h1 className="legal-title">
            Build With Us.
            <br />
            <span className="accent">Sponsorships, Collabs, Roles.</span>
          </h1>
          <p className="lead legal-lead">
            Sneakz &amp; Beatz works with brands, creators, and operators who match the
            audience we've built — culture-first, taste-led, no-fluff. Pick the lane that
            fits and we'll get back within 48 hours with a media kit + the next steps.
          </p>
          <p className="legal-effective">
            Partnerships: <a href={mailto(EMAILS.partnerships)}>{EMAILS.partnerships}</a>
            {" "}· Press: <a href={mailto(EMAILS.press)}>{EMAILS.press}</a>
          </p>
        </header>

        <div className="contact-grid">
          {TRACKS.map((t) => (
            <a
              key={t.tag}
              href={mailto(EMAILS.partnerships, t.subject)}
              className="contact-card"
            >
              <span className="contact-card-tag">{t.tag}</span>
              <h2 className="contact-card-h">{t.heading}</h2>
              <p className="contact-card-body">{t.body}</p>
              <ul className="work-track-bullets">
                {t.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <span className="contact-card-cta">
                {EMAILS.partnerships} →
              </span>
            </a>
          ))}
        </div>

        <section className="legal-section">
          <h2>Audience snapshot</h2>
          <p>
            Brand partners ask for this constantly so we keep it visible. Numbers update
            monthly; email partnerships@ for the current media kit with full charts +
            engagement breakdowns.
          </p>
          <ul>
            <li><strong>Newsletter:</strong> Daily drops via Substack — culture-engaged hip-hop / sneaker / anime / gaming subscribers</li>
            <li><strong>The PHRHX Show:</strong> Long-form podcast — episode 12 latest at time of writing</li>
            <li><strong>Beat catalog:</strong> 96+ tracks, used by independent artists across DSPs</li>
            <li><strong>Geographic skew:</strong> US-heavy with strong CA / NY / TX clusters; growing UK + JP secondary</li>
            <li><strong>Demo skew:</strong> 18-34 male-leaning, music + gaming-first, sneaker-second</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>What we do not do</h2>
          <ul>
            <li>Sponsorships from gambling / sports-betting brands (audience compliance)</li>
            <li>Listicle-style "best deals" or affiliate spam content (off-brand)</li>
            <li>Pay-to-play beat plugs in the editorial newsletter (we keep editorial separate from sponsorships)</li>
            <li>Exclusive partnerships that lock us out of working with adjacent brands</li>
          </ul>
        </section>

        <p className="legal-foot">
          Partnerships: <a href={mailto(EMAILS.partnerships)}>{EMAILS.partnerships}</a> ·{" "}
          Press: <a href={mailto(EMAILS.press)}>{EMAILS.press}</a> ·{" "}
          <Link href="/contact">All Other Inquiries</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
