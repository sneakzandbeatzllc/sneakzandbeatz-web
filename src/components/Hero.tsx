import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Culture · Content · Community</span>
          <h1>
            Sneakz &amp; Beatz —<br />
            Where{" "}
            <span className="accent">
              Sneakers, Hip-Hop,
              <br />
              Anime &amp; Gaming
            </span>
            <br />
            Collide.
          </h1>
          <p className="lead">
            Stay ahead of the culture. Drops, beats, episodes, and the stories
            shaping sneaker, hip-hop, anime, and gaming culture — before everyone
            else catches on.
          </p>
          <div className="hero-ctas">
            <a href="/beats" className="btn btn-primary btn-arrow">
              Browse The Beat Store
            </a>
            <a href="/sneakers" className="btn btn-ghost btn-arrow">
              Explore The Culture
            </a>
            <a href="/show" className="btn-link">
              ▶ Watch The PHRHX Show
            </a>
          </div>
        </div>

        {/* Hero art: the primary brand logo as the centerpiece. Replace with editorial photography
            once available — drop a hero shot in /public and swap the <Image src> here. */}
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/logo-mark-512.png"
            alt="Sneakz & Beatz brand mark"
            className="logo-mark"
            width={512}
            height={512}
            priority
          />
        </div>
      </div>
    </section>
  );
}
