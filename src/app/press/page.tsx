import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Press · Founder — Sneakz & Beatz",
  description:
    "Press kit, founder bio, and media inquiries for Sneakz & Beatz — the culture-media brand at the intersection of sneakers, hip-hop, anime, and gaming. A property of The PHRHX Company.",
};

const FACTS: Array<[string, string]> = [
  ["Brand", "Sneakz & Beatz"],
  ["Operating company", "The PHRHX Company"],
  ["Beat catalog + publishing", "Black Royal Music Media Group Inc."],
  ["Founded", "April 2026"],
  ["Headquarters", "Los Angeles County, California"],
  ["Founder · CEO", "PHRHX"],
  ["Team", "Editorial · Design · Video · Community"],
  ["Pillars", "Sneakers · Hip-Hop · Anime · Gaming"],
  ["Channels", "sneakzandbeatz.com · IG @sneakz_beatz · TikTok @SneakzandBeatzOfficial · YouTube The PHRHX Show · Substack · Discord"],
];

export default function PressPage() {
  return (
    <>
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
            Sneakz &amp; Beatz is a property of{" "}
            <strong>The PHRHX Company</strong>, an independent California
            culture-media company. The brand publishes a daily culture feed at
            sneakzandbeatz.com, runs a producer beat catalog (the Beat Store,
            $29.99 leases + bundles), hosts <em>The PHRHX Show</em> on YouTube,
            and operates a Discord community for producers, sneakerheads, anime
            lifers, and gaming heads. The beat catalog and publishing are
            powered by <strong>Black Royal Music Media Group Inc.</strong>
          </p>
          <p className="press-p">
            The thesis is simple — the same audience shows up for all four
            pillars, and nobody&rsquo;s covering them honestly under one roof.
            S&amp;B operates at the intersection. The voice is direct, culturally
            fluent, no corporate hedging — Black nerd / backpacker
            demographic emphasis, sneakerhead literacy assumed.
          </p>
        </section>

        <section className="container press-block">
          <h2 className="press-h2">Founder</h2>
          <p className="press-p">
            <strong>PHRHX</strong> is a producer, writer, and the founder of
            Sneakz &amp; Beatz. He&rsquo;s the host of The PHRHX Show, the
            producer behind the S&amp;B beat catalog, and the editorial voice
            of the brand&rsquo;s daily culture feed. The company runs a small
            in-house team across editorial, design, video, and community, with
            a UGC creator program opening March 2027 and rotating guest judges
            powering the brand&rsquo;s yearly $10K Rap Challenge.
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
