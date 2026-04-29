import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Press · Brand Assets — Sneakz & Beatz",
  description:
    "Press kit, brand assets, founder bio, and media inquiries for Sneakz & Beatz — the culture-media brand at the intersection of sneakers, hip-hop, anime, and gaming. Operated by Black Royal Music Media LLC.",
};

const LOGOS = [
  {
    file: "sneakz-beatz-logo-primary.png",
    name: "Primary mark",
    use: "Default for press, mastheads, light or dark backgrounds",
    size: "2048×2048 PNG",
  },
  {
    file: "sneakz-beatz-logo-hiphop.png",
    name: "Hip-Hop variant",
    use: "Use on hip-hop pillar features or producer-focused press",
    size: "1024×1536 PNG",
  },
  {
    file: "sneakz-beatz-logo-hiphop-darkbg.png",
    name: "Hip-Hop · dark background",
    use: "When placing on a fully black/dark layout",
    size: "1024×1536 PNG",
  },
  {
    file: "sneakz-beatz-logo-anime-gaming.png",
    name: "Anime · Gaming variant",
    use: "Anime / gaming-focused features or co-branded crossover content",
    size: "1024×1536 PNG",
  },
];

const FACTS: Array<[string, string]> = [
  ["Brand", "Sneakz & Beatz"],
  ["Operating entity", "Sneakz and Beatz LLC (California)"],
  ["Parent company", "Black Royal Music Media LLC"],
  ["EIN", "42-2192032"],
  ["Founded", "April 2026"],
  ["Headquarters", "Los Angeles County, California"],
  ["Founder · CEO", "Raymond Miller (PHRHX)"],
  ["Pillars", "Sneakers · Hip-Hop · Anime · Gaming"],
  ["Channels", "sneakzandbeatz.com · IG @sneakz_beatz · TikTok @SneakzandBeatzOfficial · YouTube The PHRHX Show · Substack · Discord"],
];

const COLORS = [
  { name: "S&B Red (accent)", hex: "#C8262C", note: "Primary brand action / highlight color" },
  { name: "Highlight Cream",  hex: "#F5E6D3", note: "Type contrast on red, sticker / print elements" },
  { name: "Backbone Black",   hex: "#0A0A0A", note: "Default canvas. Site, merch, video lower-thirds" },
  { name: "Editorial Soft",   hex: "#2B2A2C", note: "Card backgrounds, secondary surfaces" },
];

export default function PressPage() {
  return (
    <>
      <Header />

      <main className="press-page">
        <section className="container press-hero">
          <span className="press-eyebrow">Press · Brand Assets · Founder</span>
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
            Sneakz &amp; Beatz is a culture-media brand operated by{" "}
            <strong>Black Royal Music Media LLC</strong>, an independent
            California label and content company. The brand publishes a daily
            culture feed at sneakzandbeatz.com, runs a producer beat catalog
            (the Beat Store, $29.99 leases + bundles), hosts <em>The PHRHX
            Show</em> on YouTube, and operates a Discord community for
            producers, sneakerheads, anime lifers, and gaming heads.
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
            <strong>Raymond Miller (PHRHX)</strong> is a producer, writer, and the
            founder of Sneakz &amp; Beatz. He&rsquo;s the host of The PHRHX Show,
            the producer behind the S&amp;B beat catalog, and the editorial voice
            of the brand&rsquo;s daily culture feed. The brand is solo-led
            with selective collaboration: a small Discord moderator team, a
            UGC creator program opening March 2027, and rotating guest judges
            for the brand&rsquo;s yearly $10K Rap Challenge.
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
          <p className="press-helper">
            Click Download to save the high-res PNG. Use the variant that best
            fits your layout. Don&rsquo;t recolor or add effects without permission.
          </p>
          <div className="press-logos-grid">
            {LOGOS.map((l) => (
              <article key={l.file} className="press-logo-card">
                <div className="press-logo-frame">
                  <Image
                    src={`/press/logos/${l.file}`}
                    alt={l.name}
                    width={400}
                    height={400}
                    className="press-logo-img"
                  />
                </div>
                <div className="press-logo-meta">
                  <h3 className="press-logo-h">{l.name}</h3>
                  <p className="press-logo-use">{l.use}</p>
                  <p className="press-logo-size">{l.size}</p>
                  <a
                    href={`/press/logos/${l.file}`}
                    download
                    className="press-logo-dl"
                  >
                    Download PNG ↓
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container press-block">
          <h2 className="press-h2">Brand Colors</h2>
          <div className="press-colors-grid">
            {COLORS.map((c) => (
              <article key={c.hex} className="press-color-card">
                <div
                  className="press-color-swatch"
                  style={{ background: c.hex }}
                  aria-hidden="true"
                />
                <div className="press-color-meta">
                  <h3 className="press-color-name">{c.name}</h3>
                  <p className="press-color-hex">
                    <code>{c.hex}</code>
                  </p>
                  <p className="press-color-note">{c.note}</p>
                </div>
              </article>
            ))}
          </div>
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
