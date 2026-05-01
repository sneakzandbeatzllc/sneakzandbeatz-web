import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MerchInterestForm from "@/components/MerchInterestForm";
import { MERCH_PRODUCTS, MERCH_LAUNCH_DATE } from "@/data/merch";
import { BEATS } from "@/data/beats";

export const metadata = {
  title: "Shop — Beats & Merch — Sneakz & Beatz",
  description:
    "S&B Shop — producer-grade beats ($29.99 lease, The Vault bundle starting at $79, exclusive ownership) and color-matched merch (heavyweight tee, hoodie, dad cap, track shorts). Beats live now. Merch pre-order opens August 1, 2026.",
};

export default function ShopPage() {
  const launch = new Date(MERCH_LAUNCH_DATE);
  const launchLabel = launch.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Featured beats for the compact preview — first 6 paid beats
  const featuredBeats = BEATS.filter((b) => !b.isFree).slice(0, 6);
  const totalBeats = BEATS.filter((b) => !b.isFree).length;

  return (
    <>
      <Header />

      <main className="shop-page">
        <section className="shop-hero">
          <div className="container">
            <span className="shop-eyebrow">⚡ Shop</span>
            <h1 className="shop-h1">
              Everything Sneakz & Beatz sells. <br />
              <span className="accent">One shop. Beats live now. Merch pre-launch.</span>
            </h1>
            <p className="shop-lead">
              Producer-grade beats ready to license today, plus color-matched merch
              built to pair with your Js head-to-toe. Pick your lane.
            </p>
          </div>
        </section>

        {/* BEATS section — live and selling */}
        <section className="container shop-block shop-beats-block">
          <div className="shop-block-head">
            <h2 className="shop-h2">Beats</h2>
            <span className="shop-block-status shop-block-status--live">Live · Instant download</span>
          </div>
          <p className="shop-helper">
            For rappers ready to drop. Free Standard license to test the waters,
            $29.99 lease per beat for unlimited uses, or grab the full bundle for
            the price of a couple beats with full ownership terms.
          </p>

          <div className="shop-beats-tiers">
            <article className="shop-tier">
              <h3 className="shop-tier-name">Free Standard</h3>
              <span className="shop-tier-price">$0</span>
              <p className="shop-tier-desc">
                Try before you buy. Tagged demo with credit-required terms.
                Perfect for SoundCloud / freestyle drops.
              </p>
              <Link href="/beats/free" className="btn btn-ghost btn-arrow">Get free beat</Link>
            </article>

            <article className="shop-tier shop-tier--hero">
              <span className="shop-tier-flag">No-brainer</span>
              <h3 className="shop-tier-name">The Vault</h3>
              <span className="shop-tier-price-row">
                <span className="shop-tier-price-prefix">Starting at</span>
                <span className="shop-tier-price">$79</span>
              </span>
              <p className="shop-tier-desc">
                100 beats. Untagged WAVs. Stems for select tracks. Full lease rights.
                Build a whole project — never touch a credit card for beats again.
              </p>
              <Link href="/bundle" className="btn btn-primary btn-arrow">Unlock The Vault</Link>
            </article>

            <article className="shop-tier">
              <h3 className="shop-tier-name">Single Beat Lease</h3>
              <span className="shop-tier-price">$29.99</span>
              <p className="shop-tier-desc">
                Pick one. Untagged WAV + lease license, instant download.
                Use it on streaming, distribution, all platforms.
              </p>
              <Link href="/beats" className="btn btn-ghost btn-arrow">Browse beats</Link>
            </article>
          </div>

          <div className="shop-beats-cta-row">
            <Link href="/beats" className="btn btn-primary btn-arrow">
              Browse the full beat catalog
            </Link>
            <Link href="/licensing" className="btn btn-ghost btn-arrow">
              Compare licenses
            </Link>
          </div>
        </section>

        {/* Beat store preview — compact rectangle showing featured beats */}
        <section className="container shop-block shop-beats-preview-block">
          <div className="shop-beats-preview">
            <div className="shop-beats-preview-head">
              <div>
                <span className="shop-beats-preview-eyebrow">Beat Store · Featured</span>
                <h3 className="shop-beats-preview-h">A taste from the catalog</h3>
              </div>
              <Link href="/beats" className="btn btn-ghost btn-arrow shop-beats-preview-cta">
                See all {totalBeats}
              </Link>
            </div>
            <div className="shop-beats-preview-grid">
              {featuredBeats.map((beat) => (
                <Link
                  key={beat.id}
                  href={`/beats#${beat.slug}`}
                  className="shop-beat-tile"
                >
                  <span className="shop-beat-tile-cat">{beat.categoryLabel}</span>
                  <span className="shop-beat-tile-title">{beat.title}</span>
                  <span className="shop-beat-tile-meta">
                    {beat.bpm ? `${beat.bpm} BPM` : ""}
                    {beat.bpm && beat.priceUSD ? " · " : ""}
                    ${beat.priceUSD}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* MERCH section */}
        <section className="container shop-block">
          <div className="shop-block-head">
            <h2 className="shop-h2">Merch</h2>
            <span className="shop-block-status">Pre-order opens {launchLabel}</span>
          </div>
          <p className="shop-helper">
            Four pieces. Eight colorways. Each one built to pair with a specific
            Air Jordan Retro 1-17 colorway, so the brand fit is always head-to-toe.
            Drop your email on the interest list and you get first crack 24 hours
            before public.
          </p>
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
