/**
 * /merch — the dedicated merch shop.
 *
 * Beats live at /beats and /shop keeps a merch teaser for cross-sell;
 * this page is the full merch experience: The Classics (unisex) +
 * beats. (the women's line), accurate prices from src/data/merch.ts,
 * colorway galleries, and the reserve flow. When a product flips to
 * status "live" with stripeLinks, the card CTA becomes a checkout link.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MerchInterestForm from "@/components/MerchInterestForm";
import { MERCH_PRODUCTS, MERCH_LAUNCH_DATE } from "@/data/merch";

export const metadata = {
  title: "Merch — The Classics + beats. | Sneakz & Beatz",
  description:
    "S&B merch built to pair with your Js. The Classics (unisex hoodies, tees, caps, shorts) and beats. — the women's line. Color-matched to Jordan Retros 1–17. Pre-orders open August 15, 2026.",
  alternates: { canonical: "https://www.sneakzandbeatz.com/merch" },
};

const CLASSIC_GALLERY: [string, string][] = [
  ["/merch/classic-black.jpg", "Black"],
  ["/merch/classic-cream.jpg", "Cream"],
  ["/merch/classic-navy.jpg", "Navy"],
  ["/merch/classic-red.jpg", "Red"],
  ["/merch/classic-grey.jpg", "Grey"],
];

const HAT_GALLERY: [string, string][] = [
  ["/merch/hat-black-snapback.jpg", "Black Snapback"],
  ["/merch/hat-black-dad.jpg", "Black Dad Cap"],
  ["/merch/hat-red-snapback.jpg", "Red Snapback"],
];

const BEATS_GALLERY: [string, string][] = [
  ["/merch/girls-crop-pink-sb.jpg", "Arctic Pink Crop — S&B graphic"],
  ["/merch/girls-crop-pink-minimal.jpg", "Arctic Pink Crop — beats."],
  ["/merch/girls-crop-pink-dope2.jpg", "Arctic Pink Crop — dope."],
  ["/merch/hoodie-white-fco.jpg", "For The Culture Only — White"],
];

export default function MerchPage() {
  const launchLabel = new Date(MERCH_LAUNCH_DATE).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const classics = MERCH_PRODUCTS.filter((p) => p.slug.startsWith("sb-"));
  const beatsLine = MERCH_PRODUCTS.filter((p) => p.slug.startsWith("beats-"));

  const renderCard = (p: (typeof MERCH_PRODUCTS)[number]) => {
    const live = p.status === "live" && p.stripeLinks;
    return (
      <article key={p.slug} id={p.slug} className="shop-card" style={{ scrollMarginTop: 90 }}>
        <div className="shop-card-image">
          {p.imagePath ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={p.imagePath} alt={p.name} loading="lazy" />
          ) : (
            <div className="shop-card-placeholder">
              <span>{p.name}</span>
              <small>image dropping {launchLabel}</small>
            </div>
          )}
        </div>
        <div className="shop-card-body">
          <header className="shop-card-head">
            <h3 className="shop-card-name">{p.name}</h3>
            <span className="shop-card-price">${p.priceUSD}</span>
          </header>
          <p className="shop-card-desc">{p.description}</p>
          <div className="shop-card-meta">
            <span className="shop-card-meta-label">Sizes</span>
            <div className="shop-card-sizes">
              {p.sizes.map((s) => (
                <span key={s} className="shop-card-size-pill">{s}</span>
              ))}
            </div>
          </div>
          <div className="shop-card-meta">
            <span className="shop-card-meta-label">Colorways</span>
            <div className="shop-card-colorways">
              {p.colorways.map((c) => (
                <span
                  key={c.slug}
                  className="shop-color-swatch"
                  title={`${c.name} — pairs with ${c.pairsWith}`}
                  style={{ background: `linear-gradient(90deg, ${c.swatch.from}, ${c.swatch.to})` }}
                />
              ))}
            </div>
          </div>
          {live ? (
            <a className="btn btn-primary" href={Object.values(p.stripeLinks!)[0]}>
              Buy — ${p.priceUSD}
            </a>
          ) : (
            <a className="btn btn-ghost" href="#interest">
              Reserve — pre-order opens {launchLabel}
            </a>
          )}
        </div>
      </article>
    );
  };

  return (
    <>
      <Header />
      <main className="shop-page merch-page">
        {/* HERO */}
        <section className="container shop-block merch-hero">
          <span className="eyebrow">The front rack · Pre-orders open {launchLabel}</span>
          <h1 className="display merch-h1">
            Match your fit<br />to your Js.
          </h1>
          <p className="shop-helper" style={{ maxWidth: "62ch" }}>
            Every piece is built to pair with a specific Air Jordan Retro 1–17
            colorway, head-to-toe. Two lines, one closet: <strong>The
            Classics</strong> (unisex) and <strong>beats.</strong> — the
            women&rsquo;s line. Reserve now, get first crack 24 hours before
            public.
          </p>
          <a className="btn btn-primary" href="#interest">Reserve Your Colorway</a>
        </section>

        {/* THE CLASSICS */}
        <section className="container shop-block">
          <span className="eyebrow">Line 01 · The Classics · Unisex</span>
          <h2 className="shop-h2" style={{ marginTop: 10 }}>One graphic. Every colorway.</h2>
          <div className="classicrow-grid">
            {CLASSIC_GALLERY.map(([src, name]) => (
              <figure key={name} className="classicrow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`S&B Classic Hoodie — ${name}`} loading="lazy" />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="shop-grid" style={{ marginTop: 26 }}>
            {classics.map(renderCard)}
          </div>
          <h3 className="shop-foot-h" style={{ marginTop: 40 }}>Headwear, both ways</h3>
          <div className="classicrow-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {HAT_GALLERY.map(([src, name]) => (
              <figure key={name} className="classicrow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`S&B ${name}`} loading="lazy" />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* beats. */}
        <section className="container shop-block beatsline">
          <div className="beatsline-grid">
            <div>
              <span className="eyebrow">Line 02 · beats. · The women&rsquo;s line</span>
              <h2 className="shop-h2" style={{ marginTop: 10 }}>
                Arctic Pink first.<br />The whole line behind it.
              </h2>
              <p className="shop-helper">
                Heavyweight crop hoodies — Arctic Pink, Heather Grey, Cream,
                and Black. Embroidered &ldquo;beats.&rdquo; and
                &ldquo;dope.&rdquo; The crop leads the launch; the full line
                drops behind it.
              </p>
              <a className="btn btn-primary" href="#interest" style={{ marginTop: 18 }}>
                Reserve The beats. Crop
              </a>
            </div>
            <div className="beatsline-ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/merch/girls-crop-pink-minimal.jpg" alt="beats. crop hoodie — Arctic Pink" loading="lazy" />
            </div>
          </div>
          <div className="shop-grid" style={{ marginTop: 26 }}>
            {beatsLine.map(renderCard)}
          </div>
          <div className="classicrow-grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginTop: 26 }}>
            {BEATS_GALLERY.map(([src, name]) => (
              <figure key={name} className="classicrow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={name} loading="lazy" />
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* RESERVE */}
        <section id="interest" className="container shop-block shop-interest-block">
          <h2 className="shop-h2">Reserve your colorway</h2>
          <p className="shop-helper">
            Pick what you want, pick the colorway, drop your email. When
            pre-orders open <strong>{launchLabel}</strong>, you get first crack —
            emailed 24 hours before the public link goes live.
          </p>
          <MerchInterestForm />
        </section>

        {/* CROSS-SELL */}
        <section className="container shop-block shop-foot">
          <h3 className="shop-foot-h">Here for beats?</h3>
          <p className="shop-helper">
            The catalog lives at <a href="/beats">/beats</a> — 100 mastered
            beats, $34.99 leases, the $79 Vault. Merch pairs with the music;
            buy both, match everything.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
