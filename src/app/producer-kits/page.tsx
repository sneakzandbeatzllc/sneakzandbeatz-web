import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRIPE_LINKS } from "@/data/stripe-links";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Producer Kits — Sneakz & Beatz",
  description:
    "BRMG drum kits, sample packs, melody loops, and Serum presets — built by Sneakz & Beatz for the next generation of beatmakers.",
};

const KITS: { tag: string; title: string; tease: string; price: string }[] = [
  { tag: "Drum Kit",     title: "BRMG Volume 1 — The Foundation",  tease: "100+ kicks, snares, hats, claps, percs. Trap, Detroit, Drill, West Coast.", price: "Bundle Only" },
  { tag: "Sample Pack",  title: "Sneakz Vol. 1 — Soul Loops",      tease: "32 mixed soul loops, key + BPM tagged. Mostly minor, mostly looped 8 bars.", price: "Bundle Only" },
  { tag: "Melody Loops", title: "Late Night — Trap Melody Pack",   tease: "20 dark melodies + chord stacks for trap, drill, and rage. WAV + MIDI.",    price: "Coming Soon" },
  { tag: "Serum Presets",title: "Bay Area Bass — Serum Bank",      tease: "16 Serum presets covering hyphy bass, slap leads, and West Coast plucks.",  price: "Coming Soon" },
];

export default function ProducerKitsPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Producer Kits · BRMG</span>
          <h1 className="legal-title">
            Drum Kits.
            <br />
            <span className="accent">Sample Packs. Loops.</span>
          </h1>
          <p className="lead legal-lead">
            Built in the same studio as the Sneakz &amp; Beatz catalog. Drums you've heard
            on the masters, soul samples cut and tagged for chops, melody loops with
            chords + MIDI included. Ship as part of the Standard Bundle today; standalone
            sales are rolling out.
          </p>
          <div className="hero-ctas">
            <a
              href={STRIPE_LINKS.standardBundle}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-arrow"
            >
              Get Bundle ($79)
            </a>
            <Link href="/beats/bundles" className="btn btn-ghost btn-arrow">
              See All Bundles
            </Link>
          </div>
        </header>

        <section className="legal-section">
          <h2>Available kits</h2>
          <div className="contact-grid">
            {KITS.map((k) => (
              <article key={k.title} className="contact-card" style={{ cursor: "default" }}>
                <span className="contact-card-tag">{k.tag}</span>
                <h3 className="contact-card-h">{k.title}</h3>
                <p className="contact-card-body">{k.tease}</p>
                <span className="contact-card-cta">{k.price}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="legal-section">
          <h2>How to get them</h2>
          <ul>
            <li>
              <strong>Today:</strong> Get them as part of the{" "}
              <Link href="/beats/bundles">Standard Bundle</Link> ($79). The drum kit + sample
              pack are bundled in alongside 100 mastered beats and the mix consult.
            </li>
            <li>
              <strong>Standalone sales:</strong> Rolling out individually for $19–$29 each
              once the standalone delivery flow is built. Subscribe to the newsletter for
              the drop notification.
            </li>
            <li>
              <strong>Custom kits:</strong> Producer or label that wants a custom drum kit
              built to your sound? Email{" "}
              <a href={mailto(EMAILS.partnerships, "Custom Kit Inquiry")}>{EMAILS.partnerships}</a>.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>License terms (when you buy)</h2>
          <p>
            All kits include a royalty-free producer license — use the sounds in your
            commercial productions, no attribution required, no royalty splits, no caps.
            You may not redistribute the raw sounds (selling the kit yourself is
            prohibited) or repackage them into your own kit for resale.
          </p>
          <p>
            See <Link href="/licensing">Beat Licensing Terms</Link> for the full producer
            license language.
          </p>
        </section>

        <p className="legal-foot">
          <Link href="/beats/bundles">Get The Bundle</Link> ·{" "}
          <Link href="/beats">Browse Beats</Link> ·{" "}
          <a href={mailto(EMAILS.licensing)}>Custom Inquiries</a>
        </p>
      </section>

      <Footer />
    </>
  );
}
