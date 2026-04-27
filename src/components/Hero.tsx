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
            <a href="#beatstore" className="btn btn-primary btn-arrow">
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

        {/*
          Hero photo zone. Replace this gradient + SVG placeholder with a real
          photograph in production — drop the file in /public and swap to <Image>.
        */}
        <div className="hero-art" aria-hidden="true">
          <div className="floating-mark">S&amp;B</div>
          <svg
            className="sneaker"
            viewBox="0 0 400 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <defs>
              <linearGradient id="sole" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#cccccc" />
              </linearGradient>
            </defs>
            <path
              d="M20 165 Q40 175 80 175 L320 175 Q360 175 380 165 L380 180 Q360 190 320 190 L80 190 Q40 190 20 180 Z"
              fill="url(#sole)"
            />
            <path
              d="M40 165 Q40 130 70 110 L120 95 Q140 80 175 75 L240 70 Q260 70 275 80 L320 100 Q360 115 380 165 Z"
              fill="#e51e2a"
            />
            <path
              d="M310 135 Q340 130 360 145 L360 165 Q345 160 320 162 Z"
              fill="#ffffff"
              fillOpacity="0.85"
            />
            <path
              d="M70 110 Q90 85 130 80 L160 85 Q150 100 130 110 L100 115 Z"
              fill="#ffffff"
            />
            <path
              d="M140 145 Q200 110 280 130"
              stroke="#ffffff"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M105 120 L155 105 M115 130 L165 115 M125 140 L175 125 M135 150 L185 135"
              stroke="#ffffff"
              strokeWidth="3"
            />
          </svg>
          <span className="placeholder-tag">
            [ Hero photo placeholder · replace with real shot ]
          </span>
        </div>
      </div>
    </section>
  );
}
