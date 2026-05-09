import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";
import { SOCIAL } from "@/data/social";
import { jsonLd, phrhxPerson, breadcrumbList } from "@/lib/schema";

export const metadata = {
  title: "Press · Founder — Sneakz & Beatz",
  description:
    "Press kit, founder bio, and media inquiries for Sneakz & Beatz — Black-owned culture media brand at the intersection of sneakers, hip-hop, anime, and gaming. Operated by Sneakz & Beatz LLC.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press — Sneakz & Beatz",
    description:
      "Black-owned culture media brand. Founder PHRHX. Sneakers, hip-hop, anime, gaming under one roof.",
    url: "https://www.sneakzandbeatz.com/press",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
};

const FACTS: Array<[string, string]> = [
  ["Brand", "Sneakz & Beatz"],
  ["Operating company", "Sneakz & Beatz LLC"],
  ["Entity #", "B20260195169 (California)"],
  ["EIN", "42-2192032"],
  ["Founded", "April 23, 2026"],
  ["Headquarters", "San Diego, California"],
  ["Founder · CEO", "PHRHX (Raymond Miller)"],
  ["Team", "Founder + Trend Researcher + Social Media Manager + Video Editor"],
  ["Pillars", "Sneakers · Hip-Hop · Anime · Gaming"],
  ["Audience", "Sneakerheads who live hip-hop, anime, and gaming (1.6–2.3M global TAM)"],
  ["Products", "$10K Rap Challenge · The PHRHX Show · 96-beat catalog · $79 Vault Bundle · Sneakz Pass ($12/mo, launches Oct 1, 2026)"],
  ["Channels", "sneakzandbeatz.com · IG @sneakz_beatz · TikTok @SneakzandBeatzOfficial · YouTube The PHRHX Show · Substack · Discord"],
];

export default function PressPage() {
  return (
    <>
      {/* JSON-LD: Person (PHRHX) + BreadcrumbList. Press surfaces are the
          highest-leverage page for AI engines and journalists scraping
          founder facts — entity must be airtight here. Organization graph
          is referenced by @id from the homepage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(phrhxPerson())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbList([
            { name: "Home", url: "https://www.sneakzandbeatz.com" },
            { name: "Press", url: "https://www.sneakzandbeatz.com/press" },
          ]),
        )}
      />
      <Header />

      <main className="press-page">
        <section className="container press-hero">
          <span className="press-eyebrow">Press · Founder</span>
          <h1 className="press-h1">
            Sneakz &amp; Beatz —
            <br />
            <span className="accent">Built for the culture.</span>
          </h1>
          <p className="press-lead">
            Independent media company. Producer-led. Black-owned. Covering
            sneakers, hip-hop, anime, and gaming as one continuous audience —
            not four siloed verticals.
          </p>
        </section>

        <section className="container press-block">
          <h2 className="press-h2">About</h2>
          <p className="press-p">
            Sneakz &amp; Beatz is operated by <strong>Sneakz &amp; Beatz LLC</strong>,
            a California limited liability company (Entity #B20260195169) headquartered
            in San Diego. The brand publishes a daily culture feed at sneakzandbeatz.com,
            runs a producer-grade 96-beat catalog (the Beat Store with $34.99 leases +
            $79 Vault Bundle + $10K Rap Challenge), hosts <em>The PHRHX Show</em> on
            YouTube, and operates a Discord community for producers, sneakerheads, anime
            lifers, and gaming heads.
          </p>
          <p className="press-p">
            The thesis: sneakerheads who live hip-hop, anime, and gaming have
            never had an editorial home. Hypebeast doesn&rsquo;t do anime. Joe Budden
            doesn&rsquo;t do sneakers. RDC World does sketch comedy, not editorial
            commerce. The lane is empty. Sneakz &amp; Beatz fills it. The voice is
            direct, culturally fluent, Black-culture-first, no corporate hedging —
            sneakerhead literacy assumed.
          </p>
        </section>

        <section className="container press-block">
          <h2 className="press-h2">Founder</h2>
          <p className="press-p">
            <strong>PHRHX</strong> (Raymond Miller) is the founder, host, and
            producer behind Sneakz &amp; Beatz. He hosts The PHRHX Show, produced
            the 96-beat S&amp;B catalog, and leads the editorial voice of the
            brand. The company runs a four-person in-house team — founder, trend
            researcher, social media manager, and video editor — with a UGC
            creator program (S&amp;B Models) opening 2027 and rotating guest
            judges powering the brand&rsquo;s quarterly $10K Rap Challenge.
          </p>
          <p className="press-p">
            For interviews, podcast guest spots, or panel appearances, contact{" "}
            <a href={mailto(EMAILS.partnerships, "PHRHX — interview / appearance")}>
              {EMAILS.partnerships}
            </a>
            .
          </p>
        </section>

        <section className="container press-block">
          <h2 className="press-h2">Brand Assets</h2>
          <p className="press-p">
            High-res logos, founder portraits, and approved imagery are
            provided to verified press and partners on request. Email{" "}
            <a href={mailto(EMAILS.press, "Press kit request")}>
              {EMAILS.press}
            </a>{" "}
            with your outlet, the piece you&rsquo;re working on, and your
            deadline. We respond within 5 business days.
          </p>
        </section>

        <section className="container press-block">
          <h2 className="press-h2">Quick Facts</h2>
          <dl className="press-facts">
            {FACTS.map(([k, v]) => (
              <div key={k} className="press-fact-row">
                <dt className="press-fact-key">{k}</dt>
                <dd className="press-fact-val">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="container press-block press-cta">
          <h2 className="press-h2">Press &amp; Partnership Inquiries</h2>
          <ul className="press-contact-list">
            <li>
              <strong>Press / interviews:</strong>{" "}
              <a href={mailto(EMAILS.press, "Press inquiry")}>{EMAILS.press}</a>
            </li>
            <li>
              <strong>Brand partnerships / sponsorships:</strong>{" "}
              <a href={mailto(EMAILS.partnerships, "Partnership inquiry")}>
                {EMAILS.partnerships}
              </a>
            </li>
            <li>
              <strong>The PHRHX Show booking:</strong>{" "}
              <a href={mailto(EMAILS.booking, "PHRHX Show — Guest Pitch")}>
                {EMAILS.booking}
              </a>
            </li>
            <li>
              <strong>General:</strong>{" "}
              <a href={mailto(EMAILS.info)}>{EMAILS.info}</a>
            </li>
          </ul>
          <p className="press-helper" style={{ marginTop: 18 }}>
            We respond within 5 business days. Faster on{" "}
            <a href={SOCIAL.instagram.url} target="_blank" rel="noopener">
              IG DMs
            </a>{" "}
            for time-sensitive press windows.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
