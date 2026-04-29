import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MerchInterestForm from "@/components/MerchInterestForm";
import { MERCH_PRODUCTS, MERCH_LAUNCH_DATE } from "@/data/merch";

export const metadata = {
  title: "Shop — Sneakz & Beatz",
  description:
    "S&B merch — heavyweight tee, hoodie, dad cap, track shorts. 8 colorways color-matched to Air Jordan Retros 1-17. Pre-order interest list opens August 1, 2026.",
};

export default function ShopPage() {
  const launch = new Date(MERCH_LAUNCH_DATE);
  const launchLabel = launch.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Header />

      <main className="shop-page">
        <section className="shop-hero">
          <div className="container">
            <span className="shop-eyebrow">⚡ Shop · Pre-launch</span>
            <h1 className="shop-h1">
              Built to ship with the Js. <br />
              <span className="accent">Color-matched. Heavyweight. Cut for camera.</span>
            </h1>
            <p className="shop-lead">
              Four pieces. Eight colorways. Each one built to pair with a specific
              Air Jordan Retro 1-17 colorway, so the brand fit is always head-to-toe.
              Pre-order interest list opens <strong>{launchLabel}</strong> — drop your
              email below and pick what you want first.
            </p>
          </div>
        </section>

        {/* Catalog — visible now so creators can see what they'll be picking from */}
        <section className="container shop-block">
          <h2 className="shop-h2">The catalog</h2>
          <div className="shop-grid">
            {MERCH_PRODUCTS.map((p) => (
              <article key={p.slug} className="shop-card">
                <div className="shop-card-image">
                  {p.imagePath ? (
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
                          style={{ background: `linear-gradient(90deg, ${c.swatch.from}, ${c.swatch.to})` }}
                          title={`${c.name} · pairs with ${c.pairsWith}`}
                          aria-label={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="shop-card-status">
                    Pre-order opens {launchLabel}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive merch picker / interest form */}
        <section id="interest" className="container shop-block shop-interest-block">
          <h2 className="shop-h2">Reserve your colorway</h2>
          <p className="shop-helper">
            Pick what you want, pick the colorway, drop your email. When pre-orders
            open <strong>{launchLabel}</strong>, you get first crack — emailed 24
            hours before the public link goes live. Creators on the program get
            priority pull from this list when matching merch to your Jordan colorways.
          </p>
          <MerchInterestForm />
        </section>

        {/* Footer info */}
        <section className="container shop-block shop-foot">
          <h3 className="shop-foot-h">Why color-matched merch?</h3>
          <p>
            S&B&rsquo;s visual signature is head-to-toe color story — the tee,
            the hoodie, the cap, the shorts, all paired to the colorway of your
            Air Jordan Retros 1-17. It reads cleaner on camera, holds up in
            campaign cuts, and stops the brand from looking generic. See the{" "}
            <Link href="/creators#match">Merch × Jordan Color Match guide</Link>{" "}
            for which J colorways pair with each merch colorway.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
