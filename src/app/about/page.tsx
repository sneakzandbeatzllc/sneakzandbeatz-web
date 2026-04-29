import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "About — Sneakz & Beatz",
  description:
    "About Sneakz & Beatz / Black Royal Music Media Group Inc. — the brand, the founder PHRHX, and the four pillars (sneakers, hip-hop, anime, gaming).",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">About · The Story</span>
          <h1 className="legal-title">
            Built For The Culture.
            <br />
            <span className="accent">Operated From San Diego.</span>
          </h1>
          <p className="lead legal-lead">
            Sneakz &amp; Beatz is a culture media brand operated by Black Royal Music Media
            LLC, an independent California label and content company. We cover sneakers,
            hip-hop, anime, and gaming because the same audience shows up for all four —
            and nobody's covering them honestly under one roof.
          </p>
        </header>

        <section className="legal-section">
          <h2>The brand</h2>
          <p>
            Most "culture" outlets in 2026 are vertically siloed — sneaker sites
            don't talk about anime, anime sites don't talk about hip-hop, and the bigger
            culture publications are too busy chasing affiliate revenue to do real reporting.
            Sneakz &amp; Beatz exists to flip that.
          </p>
          <p>
            We treat the four pillars — sneakers, hip-hop, anime, gaming — as one
            conversation. The Jordan-release crowd is the Travis-Scott-cosign crowd is the
            Jujutsu-Kaisen-finale crowd is the Valorant-patch crowd. We write for that
            person. We make beats for that person. We build the show for that person.
          </p>
        </section>

        <section className="legal-section">
          <h2>The founder — PHRHX</h2>
          <p>
            <strong>PHRHX</strong> is the founder of <strong>The PHRHX Company</strong>,
            which operates Sneakz &amp; Beatz. The beat catalog and publishing run through{" "}
            <strong>Black Royal Music Media Group Inc.</strong> PHRHX is a multi-disciplinary
            creator: hip-hop producer, podcast host (The PHRHX Show), and editorial operator.
            He produced the catalog, designed the brand, and leads a small in-house team
            across editorial, design, video, and community.
          </p>
        </section>

        <section className="legal-section">
          <h2>What we operate</h2>
          <ul>
            <li>
              <strong>The newsletter</strong> at{" "}
              <a href="https://sneakzandbeatz.substack.com" target="_blank" rel="noopener">sneakzandbeatz.substack.com</a>
              {" "}— daily drops covering the four pillars
            </li>
            <li>
              <strong>The PHRHX Show</strong> — long-form interview podcast at{" "}
              <Link href="/show">/show</Link>
            </li>
            <li>
              <strong>The Beat Store</strong> at{" "}
              <Link href="/beats">/beats</Link>
              {" "}— 96 mastered tracks across East Coast, West Coast, Trap, Rage, and Free
            </li>
            <li>
              <strong>Beat Bundles</strong> at{" "}
              <Link href="/beats/bundles">/beats/bundles</Link>
              {" "}— three tiers from $47 starter to $497 exclusive
            </li>
            <li>
              <strong>Producer Kits</strong> at{" "}
              <Link href="/producer-kits">/producer-kits</Link>
              {" "}— BRMG drum kits, sample packs, melody loops (rolling out)
            </li>
            <li>
              <strong>Apparel</strong> — UGC collabs and capsule drops in development. See{" "}
              <Link href="/work-with-us">/work-with-us</Link> if you're a creator.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>The four pillars</h2>
          <ul>
            <li>
              <Link href="/sneakers"><strong>01 — Sneakers.</strong></Link> Drop reports,
              retro returns, collab heat-checks. No deal listicles, no affiliate spam.
            </li>
            <li>
              <Link href="/hiphop"><strong>02 — Hip-Hop &middot; Beatz.</strong></Link> New
              music, scene reports, producer spotlights. Plus our own beat catalog.
            </li>
            <li>
              <Link href="/anime"><strong>03 — Anime.</strong></Link> Releases, manga arcs,
              industry shifts, hip-hop crossover.
            </li>
            <li>
              <Link href="/gaming"><strong>04 — Gaming.</strong></Link> Releases, patches,
              indies, gaming-meets-streetwear coverage.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>The company</h2>
          <p>
            <strong>Black Royal Music Media Group Inc.</strong> is the operating entity behind the
            Sneakz &amp; Beatz brand. We're a California limited liability company
            headquartered in San Diego.
          </p>
          <p>
            BRMG owns the beat catalog masters, the brand trademarks, and operates all
            commercial activity. The Sneakz &amp; Beatz brand is the consumer-facing
            wordmark. You'll see both used — they're the same thing.
          </p>
        </section>

        <section className="legal-section">
          <h2>How to reach us</h2>
          <ul>
            <li>General: <a href={mailto(EMAILS.info)}>{EMAILS.info}</a></li>
            <li>Customer support: <a href={mailto(EMAILS.support)}>{EMAILS.support}</a></li>
            <li>Press: <a href={mailto(EMAILS.press)}>{EMAILS.press}</a> (or see <Link href="/press">/press</Link>)</li>
            <li>Partnerships: <a href={mailto(EMAILS.partnerships)}>{EMAILS.partnerships}</a> (or see <Link href="/work-with-us">/work-with-us</Link>)</li>
            <li>Licensing: <a href={mailto(EMAILS.licensing)}>{EMAILS.licensing}</a> (or see <Link href="/licensing">/licensing</Link>)</li>
          </ul>
        </section>

        <p className="legal-foot">
          <Link href="/contact">Full contact directory</Link> ·{" "}
          <Link href="/press">Press kit</Link> ·{" "}
          <Link href="/work-with-us">Partnerships</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
