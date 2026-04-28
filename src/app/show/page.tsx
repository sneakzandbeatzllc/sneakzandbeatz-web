import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "The PHRHX Show — Sneakz & Beatz",
  description:
    "Long-form interviews with the people moving culture — sneakers, hip-hop, anime, gaming. Hosted by PHRHX. Watch on YouTube, listen everywhere.",
};

const EPISODES: { num: string; title: string; runtime: string; tease: string }[] = [
  { num: "EP. 12", title: "The State of Sneaker Culture",        runtime: "45:18", tease: "Why retros run streetwear in 2026 and what's wrong with the resale market." },
  { num: "EP. 11", title: "Hip-Hop's Influence on Fashion",      runtime: "38:22", tease: "From Run-DMC's adidas to Drake's NOCTA — the playbook for a rapper-led brand." },
  { num: "EP. 10", title: "Anime's Global Takeover",             runtime: "32:47", tease: "Why anime stopped being niche, and which arcs are leading the next wave." },
  { num: "EP. 09", title: "Gaming Meets Street Culture",         runtime: "41:03", tease: "Travis x Fortnite was a turning point. What's the next one?" },
  { num: "EP. 08", title: "Building An Independent Label",       runtime: "47:55", tease: "Beat economics, leases vs. exclusives, and why the indie path is back." },
  { num: "EP. 07", title: "AI in Music Production",              runtime: "39:11", tease: "What it actually changes for producers, and what's overhyped." },
];

export default function ShowPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">The PHRHX Show</span>
          <h1 className="legal-title">
            Real Conversations.
            <br />
            <span className="accent">Zero Filter.</span>
          </h1>
          <p className="lead legal-lead">
            Long-form interviews with the people moving culture — sneakers, hip-hop, anime,
            gaming. Hosted by PHRHX, recorded weekly, released across YouTube, Spotify, and
            Apple Podcasts. Average run-time: 35–50 minutes. No fluff intros, no
            advertorial pivots.
          </p>
          <div className="hero-ctas">
            <a
              href="https://youtube.com/@SneakzandBeatz"
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-arrow"
            >
              Watch On YouTube
            </a>
            <a
              href={mailto(EMAILS.booking, "PHRHX Show — Guest Pitch")}
              className="btn btn-ghost btn-arrow"
            >
              Pitch A Guest
            </a>
          </div>
        </header>

        <section className="legal-section">
          <h2>Where to listen</h2>
          <ul>
            <li><strong>YouTube</strong> — full-video episodes at <a href="https://youtube.com/@SneakzandBeatz" target="_blank" rel="noopener">@SneakzandBeatz</a></li>
            <li><strong>Spotify</strong> — audio-only episodes (search "The PHRHX Show")</li>
            <li><strong>Apple Podcasts</strong> — same audio feed, also indexed (search "The PHRHX Show")</li>
            <li><strong>RSS</strong> — coming once we host our own audio. For now use Spotify or Apple.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Recent episodes</h2>
          <div className="show-episodes">
            {EPISODES.map((e) => (
              <article key={e.num} className="show-episode">
                <div className="show-episode-meta">
                  <span className="show-episode-num">{e.num}</span>
                  <span className="show-episode-runtime">{e.runtime}</span>
                </div>
                <h3 className="show-episode-title">{e.title}</h3>
                <p className="show-episode-tease">{e.tease}</p>
              </article>
            ))}
          </div>
          <p className="legal-effective" style={{ marginTop: 24 }}>
            <em>Episode archive view + transcript search is shipping Q3 2026. For now,
            the YouTube channel is the canonical archive.</em>
          </p>
        </section>

        <section className="legal-section">
          <h2>Pitch a guest or be on the show</h2>
          <p>
            We pre-record — usually 30–60 minutes of conversation, edited down to ~40
            minutes. Looking for: producers with a perspective, artists at any stage if you
            have a real story, founders building in this space, sneaker historians, anime
            critics, and esports operators.
          </p>
          <p>
            Email <a href={mailto(EMAILS.booking, "PHRHX Show — Guest Pitch")}>{EMAILS.booking}</a> with: who you are, what you'd want to talk about, the
            shortest version of why you'd be interesting on this show. We respond within
            48 hours and usually book within 1–2 weeks.
          </p>
        </section>

        <section className="legal-section">
          <h2>Sponsor an episode</h2>
          <p>
            60-second mid-roll, full-episode title sponsorship, or season-long brand
            partnerships. We turn down sponsors that don't fit the audience —
            sports-betting, get-rich schemes, anything off-brand. See{" "}
            <Link href="/work-with-us">/work-with-us</Link> for the full media kit, or
            email <a href={mailto(EMAILS.partnerships)}>{EMAILS.partnerships}</a>.
          </p>
        </section>

        <p className="legal-foot">
          <Link href="/press">Press kit</Link> ·{" "}
          <Link href="/work-with-us">Sponsor an episode</Link> ·{" "}
          <a href={mailto(EMAILS.booking)}>Pitch a guest</a>
        </p>
      </section>

      <Footer />
    </>
  );
}
