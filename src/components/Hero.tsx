import HeroGallery from "@/components/HeroGallery";

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
            For Black sneakerheads who live hip-hop, anime, and gaming. Drops,
            beats, episodes, and the stories shaping the culture — before
            everyone else catches on.
          </p>
          <div className="hero-ctas">
            {/* Single primary CTA — most-monetizable wedge. */}
            <a href="/beats/bundles" className="btn btn-primary btn-arrow">
              Get The $79 Vault — 100 Beats
            </a>
            <a href="/show" className="btn-link">
              ▶ Watch The PHRHX Show
            </a>
          </div>
        </div>

        {/* Hero art: rotating gallery of /public/photos/ images.
            Drop new photos via the "Site Photos" Desktop shortcut.
            Falls back to the brand logo if 0 photos exist. */}
        <HeroGallery />
      </div>
    </section>
  );
}
