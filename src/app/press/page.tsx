import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Press — Sneakz & Beatz",
  description:
    "Press kit, brand assets, key facts, and media contact for Sneakz & Beatz / Black Royal Music Media LLC.",
};

export default function PressPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">Press &amp; Media</span>
          <h1 className="legal-title">
            Press Kit.
            <br />
            <span className="accent">Story Assets &amp; Quick Facts.</span>
          </h1>
          <p className="lead legal-lead">
            Everything you need to write about, broadcast, or interview Sneakz &amp; Beatz —
            brand boilerplate, founder quotes, logo files, and the right inbox to reach. We
            try to reply to media within 24 hours.
          </p>
          <p className="legal-effective">
            Press contact: <a href={mailto(EMAILS.press, "Press Inquiry")}>{EMAILS.press}</a>
            {" "}· Booking: <a href={mailto(EMAILS.booking, "Booking")}>{EMAILS.booking}</a>
          </p>
        </header>

        <section className="legal-section">
          <h2>Boilerplate (use as-is)</h2>
          <p>
            <strong>Sneakz &amp; Beatz</strong> is a culture media brand at the intersection
            of sneakers, hip-hop, anime, and gaming, operated by Black Royal Music Media
            LLC, a California-based independent label and production company. Founded by
            Raymond Miller (PHRHX) in 2025, Sneakz &amp; Beatz produces a daily newsletter,
            a long-form interview podcast (The PHRHX Show), and a beat catalog of 96+
            mastered productions used by independent artists across DSPs.
          </p>
        </section>

        <section className="legal-section">
          <h2>Quick facts</h2>
          <ul>
            <li><strong>Operator:</strong> Black Royal Music Media LLC (California)</li>
            <li><strong>Brands:</strong> Sneakz &amp; Beatz · Black Royal Music Media · The PHRHX Show</li>
            <li><strong>Founder:</strong> Raymond Miller — stage name <strong>PHRHX</strong></li>
            <li><strong>Headquarters:</strong> San Diego, California</li>
            <li><strong>Newsletter:</strong> sneakzandbeatz.substack.com — daily drops on culture, hip-hop, sneakers, anime, gaming</li>
            <li><strong>Podcast:</strong> The PHRHX Show — long-form interviews with cultural figures, weekly</li>
            <li><strong>Beat Catalog:</strong> 96 mastered beats live at sneakzandbeatz.com/beats — leases from $29.99, exclusive licenses from $497, full bundle of 100 + stems for $79</li>
            <li><strong>Founded:</strong> 2025</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Founder bio (PHRHX)</h2>
          <p>
            Raymond Miller, who records and produces under the name <strong>PHRHX</strong>,
            is the founder of Black Royal Music Media LLC and the operator of the Sneakz
            &amp; Beatz brand. PHRHX is a multi-disciplinary creator working across hip-hop
            production, cultural commentary, and independent media. He hosts The PHRHX Show,
            curates the daily newsletter at sneakzandbeatz.substack.com, and produces the
            beats that ship under the BRMG masters.
          </p>
        </section>

        <section className="legal-section">
          <h2>What we cover (story angles)</h2>
          <ul>
            <li>Independent music economics — bundle pricing strategy, beat-leasing models, beat producer's path-to-revenue</li>
            <li>Sneaker culture — release-day reporting, retro returns, collab heat-checks, drop-day data</li>
            <li>Hip-hop — release reporting, scene reporting (East Coast / West Coast / Trap / Rage / Drill), interviews</li>
            <li>Anime &amp; gaming culture — releases, fandom shifts, and how those communities cross-pollinate with hip-hop</li>
            <li>Building a media company in 2026 — operator perspective on AI, content pipelines, and creator economies</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Logo files + brand assets</h2>
          <p>
            Logo PNGs, the master wordmark in SVG, and approved color swatches (red
            <strong> #C8262C</strong>, cream <strong>#F0E8D8</strong>, black
            <strong> #000000</strong>) are available on request — email{" "}
            <a href={mailto(EMAILS.press, "Press Kit Asset Request")}>{EMAILS.press}</a> with
            the subject "Press Kit Asset Request" and tell us what you're publishing in.
            We'll send a Dropbox link with everything in print + web sizes.
          </p>
        </section>

        <section className="legal-section">
          <h2>Suggested pull quotes</h2>
          <p>
            These are pre-cleared founder quotes — use them as-is, paraphrase, or request a
            new quote on a specific topic via the press inbox.
          </p>
          <ul>
            <li>
              <em>"Beats For Artists Who Move Different — that's the whole brief. We make
              production for people who don't want a paint-by-numbers track. The catalog
              reflects that. The bundle reflects that. Even the licensing terms reflect
              that — we keep most of the splits with the artist on purpose."</em>
            </li>
            <li>
              <em>"There's no point pretending the four pillars — sneakers, hip-hop, anime,
              gaming — are separate. The same kid showing up for a Jordan release is the
              one waiting on a Carti rage cut and an anime finale. The audience has been
              telling us this for a decade. We just stopped pretending we don't see it."</em>
            </li>
            <li>
              <em>"Independent label economics in 2026 mean fewer middlemen and more direct
              revenue paths to the artist. We sell beats with a 30-day money-back guarantee
              — try doing that as a major label A&amp;R."</em>
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Booking + interviews</h2>
          <p>
            For a written interview, podcast appearance, or live mix booking, email{" "}
            <a href={mailto(EMAILS.booking, "Interview / Booking Request")}>
              {EMAILS.booking}
            </a>
            {" "}with the publication or show name, intended air/publish date, recording
            method (in-person, Zoom, async), and any specific topic angle. We confirm
            within 24 hours and can usually schedule within 1–2 weeks.
          </p>
        </section>

        <section className="legal-section">
          <h2>Past coverage</h2>
          <p>
            <em>Coverage list will populate as features publish. Recent placements get
            archived here with dates, outlets, and links.</em>
          </p>
        </section>

        <p className="legal-foot">
          Press: <a href={mailto(EMAILS.press)}>{EMAILS.press}</a> ·{" "}
          Booking: <a href={mailto(EMAILS.booking)}>{EMAILS.booking}</a> ·{" "}
          <Link href="/contact">All Other Inquiries</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
