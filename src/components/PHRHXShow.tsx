import Link from "next/link";

type Episode = {
  number: string;
  title: string;
  runtime: string;
  href: string;
  latest?: boolean;
};

const EPISODES: Episode[] = [
  { number: "EP. 12", title: "The State of Sneaker Culture",    runtime: "45:18", href: "#", latest: true },
  { number: "EP. 11", title: "Hip-Hop's Influence on Fashion",  runtime: "38:22", href: "#" },
  { number: "EP. 10", title: "Anime's Global Takeover",         runtime: "32:47", href: "#" },
  { number: "EP. 09", title: "Gaming Meets Street Culture",     runtime: "41:03", href: "#" },
];

export default function PHRHXShow() {
  return (
    <section className="show-section" id="show">
      <div className="container show-grid">
        <div>
          <span className="eyebrow">The PHRHX Show</span>
          <h2>Real Conversations. Zero Filter.</h2>
          <p className="show-meta">
            The PHRHX Show dives into the moments, movements, and minds shaping
            our culture. Weekly episodes across sneakers, hip-hop, anime, and
            gaming.
          </p>
          <Link href="/show" className="btn btn-ghost btn-arrow">
            Watch All Episodes
          </Link>
          <div className="show-platforms">
            <span className="pill">Spotify</span>
            <span className="pill">Apple Podcasts</span>
            <span className="pill">YouTube</span>
            <span className="pill">RSS</span>
          </div>
        </div>
        <div className="episodes">
          {EPISODES.map((ep, i) => (
            <a key={ep.number} href={ep.href} className={`episode${i === 0 ? " featured" : ""}`}>
              <div className="thumb"></div>
              {ep.latest && <span className="latest-tag">Latest</span>}
              <div className="play">
                <div className="play-icon">▶</div>
              </div>
              <div className="meta">
                <div>
                  <span className="ep-num">{ep.number}</span>
                  <h4>{ep.title}</h4>
                </div>
                <span className="runtime">{ep.runtime}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
