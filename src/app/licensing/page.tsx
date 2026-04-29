import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Beat Licensing — Sneakz & Beatz",
  description:
    "Lease, Premium Lease, and Exclusive licensing terms for every beat in the Sneakz & Beatz / Black Royal Music Media catalog.",
};

export default function LicensingPage() {
  return (
    <>
      <Header />

      <section className="container licensing">
        <div className="licensing-hero">
          <span className="eyebrow">Licensing · Black Royal Music Media</span>
          <h1 className="licensing-title">
            Lease Terms.<br />
            <span className="accent">Built To Protect You + Us.</span>
          </h1>
          <p className="lead licensing-lead">
            Plain-English breakdown of what you can and can't do with every beat licensed
            from Sneakz &amp; Beatz / Black Royal Music Media (BRMG). Four tiers — pick the
            one that matches the project. Buy any beat, keep your masters, keep most of your
            royalties, no surprises.
          </p>
          <p className="licensing-effective">
            Effective: April 1, 2026 · Producer of record: Black Royal Music Media Group Inc.,
            Los Angeles County, CA. Questions: <a href="mailto:licensing@sneakzandbeatz.com">licensing@sneakzandbeatz.com</a>
          </p>
          <div className="licensing-callout">
            <strong>Read this once:</strong> All <strong>96 beats</strong> on the site —
            including the <strong>70 tagged "Free"</strong> — are part of the Producer
            Bundle ($79). The "Free" tag means you can also download those beats at no
            cost under the <em>Free Standard License</em> below (MP3 only, lower caps).
            One catalog, four tiers, no fine print.
          </div>
        </div>

        {/* Compare-at-a-glance table */}
        <div className="licensing-compare">
          <div className="licensing-compare-row licensing-compare-head">
            <span>Right</span>
            <span>Free Standard</span>
            <span>Lease ($29.99)</span>
            <span>Bundle ($79+)</span>
            <span>Exclusive ($497+)</span>
          </div>
          {COMPARE_ROWS.map((r, i) => (
            <div key={i} className="licensing-compare-row">
              <span className="licensing-compare-label">{r.label}</span>
              <span>{r.free}</span>
              <span>{r.lease}</span>
              <span>{r.premium}</span>
              <span>{r.exclusive}</span>
            </div>
          ))}
        </div>

        {/* Per-tier full terms */}
        {TIERS.map((tier) => (
          <article key={tier.slug} className="licensing-tier">
            <header className="licensing-tier-head">
              <span className="licensing-tier-tag">{tier.priceLabel}</span>
              <h2 className="licensing-tier-h">{tier.name}</h2>
              <p className="licensing-tier-sub">{tier.summary}</p>
            </header>

            <div className="licensing-tier-body">
              {tier.sections.map((sec, i) => (
                <section key={i} className="licensing-section">
                  <h3>{sec.heading}</h3>
                  {sec.paragraphs?.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {sec.bullets && (
                    <ul>
                      {sec.bullets.map((b, k) => (
                        <li key={k}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="licensing-tier-cta">
              <Link href={tier.ctaHref} className="btn btn-primary btn-arrow">
                {tier.ctaLabel}
              </Link>
              {tier.licenseHref && (
                <a
                  href={tier.licenseHref}
                  download
                  className="licensing-download"
                >
                  ↓ Download {tier.slug.replace(/-/g, " ")} license (.md)
                </a>
              )}
            </div>
          </article>
        ))}

        {/* Universal terms — apply to all tiers */}
        <article className="licensing-universal">
          <h2>Universal Terms (All Tiers)</h2>

          <section className="licensing-section">
            <h3>1. Ownership of the underlying composition</h3>
            <p>
              Black Royal Music Media Group Inc. ("BRMG") owns the underlying musical composition
              (melody, drums, arrangement) of every beat. A lease grants you a non-exclusive
              right to use the composition under the terms below; an Exclusive purchase
              transfers that right to you on a per-beat basis as defined in that tier.
            </p>
            <p>
              The recording you create on top of the beat (your vocals, your additional
              production) is owned 100% by you, the artist. We never claim rights to your
              vocal performance or master recording.
            </p>
          </section>

          <section className="licensing-section">
            <h3>2. Royalty splits</h3>
            <p>
              Lease and Premium tiers: BRMG retains 50% of the underlying-composition
              publishing royalties (writer share + publisher share combined). You keep 100% of
              the master recording royalties (streaming income paid to the artist, sync income
              paid for placement of your master).
            </p>
            <p>
              Exclusive tier: 100% of publishing transfers to you on a per-beat basis once the
              exclusive purchase clears, with the credit waiver described in that tier.
            </p>
          </section>

          <section className="licensing-section">
            <h3>3. Producer credit (Lease + Premium)</h3>
            <p>
              You agree to credit the producer as <strong>"Prod. by Sneakz &amp; Beatz"</strong>
              {" "}in DSP metadata (Spotify, Apple Music, Tidal, Amazon Music, YouTube Music),
              physical-release liner notes, and any visual credit roll on official music
              videos. This credit is waived for Exclusive purchases on a per-beat basis.
            </p>
          </section>

          <section className="licensing-section">
            <h3>4. Stream + sales caps (Lease only)</h3>
            <p>
              The Lease tier allows up to 100,000 audio-stream equivalents across all DSPs and
              up to 5,000 paid digital or physical units for the licensed track. Once a track
              exceeds either cap, you must upgrade to a Premium / Bundle license (which
              extends the cap to 500,000 streams) or an Exclusive (uncapped). Upgrade credits
              your Lease price toward the new tier.
            </p>
          </section>

          <section className="licensing-section">
            <h3>5. Allowed uses (all tiers)</h3>
            <ul>
              <li>Streaming on commercial DSPs (subject to caps where applicable)</li>
              <li>Music videos on YouTube, TikTok, Reels, Shorts, etc.</li>
              <li>Live performances, including non-profit and ticketed</li>
              <li>Terrestrial radio + internet radio</li>
              <li>Sync placements you arrange yourself in TV, film, advertising, or games (Lease + Premium tiers split sync 50/50; Exclusive keeps 100%)</li>
            </ul>
          </section>

          <section className="licensing-section">
            <h3>6. Prohibited uses (all tiers)</h3>
            <ul>
              <li>You may not resell, redistribute, or relicense the bare beat (with no vocal performance) to any third party.</li>
              <li>You may not register the beat with any rights-management organization (BMI, ASCAP, SESAC, PRS, SOCAN, etc.) under your name without listing BRMG as co-publisher in the tiers that retain publishing.</li>
              <li>You may not use the beat in content that promotes hate speech, terrorism, or sexualized content involving minors. We reserve the right to revoke any license used for such content with no refund.</li>
              <li>You may not claim the beat as a fully original composition you wrote alone — the producer credit and split must remain accurate to the tier you bought.</li>
            </ul>
          </section>

          <section className="licensing-section">
            <h3>7. Delivery + ownership of files</h3>
            <p>
              On successful payment via Stripe, you'll receive an immediate download link via
              email containing the file types appropriate to your tier (MP3 for Starter; MP3,
              WAV, and trackouts for Premium and Exclusive). Files are licensed, not sold;
              redistribution of the raw audio files outside your own master recording is
              prohibited under section 6.
            </p>
          </section>

          <section className="licensing-section">
            <h3>8. Refunds + 30-day satisfaction guarantee</h3>
            <p>
              Beat leases and bundles include a 30-day satisfaction guarantee. Email
              licensing@sneakzandbeatz.com within 30 days of purchase for a full refund of
              the bundle or lease, no questions asked. By accepting the refund you forfeit any
              license rights granted under the purchase and agree to delete the delivered files
              and any derivative works that have been published. Exclusive purchases are
              refundable only if the beat has not yet been registered to you with a rights
              organization.
            </p>
          </section>

          <section className="licensing-section">
            <h3>9. Termination</h3>
            <p>
              BRMG may terminate any Lease or Premium license that is in material breach of
              these terms (e.g., redistribution of bare beats, exceeding stream caps without
              upgrade, prohibited uses) by written notice via email. Termination requires the
              licensee to remove the offending content from public distribution within 30 days.
              Exclusive purchases are not terminable except by mutual written agreement.
            </p>
          </section>

          <section className="licensing-section">
            <h3>10. Governing law + dispute resolution</h3>
            <p>
              This agreement is governed by the laws of the State of California, USA. Any
              dispute that cannot be resolved by good-faith email correspondence within 30
              days will be settled by binding arbitration in San Diego County, California,
              under the rules of the American Arbitration Association. Each party bears its
              own legal fees unless the arbitrator awards otherwise.
            </p>
          </section>

          <section className="licensing-section">
            <h3>11. Acceptance</h3>
            <p>
              Completing checkout for any Lease, Premium / Bundle, or Exclusive product
              constitutes acceptance of the terms above as well as the tier-specific terms
              earlier on this page. The version of these terms in effect at the time of
              your purchase governs that purchase; later edits to this page do not retroactively
              modify previously-issued licenses.
            </p>
          </section>

          <p className="licensing-foot">
            Questions before buying? Email{" "}
            <a href="mailto:licensing@sneakzandbeatz.com">licensing@sneakzandbeatz.com</a>.
            Happy to walk through any clause, especially the splits.
          </p>
        </article>
      </section>

      <Footer />
    </>
  );
}

const COMPARE_ROWS = [
  { label: "Price",                    free: "$0",                     lease: "$29.99",                premium: "$47–$79",                  exclusive: "$497+" },
  { label: "File delivery",            free: "MP3",                    lease: "MP3 + WAV",             premium: "MP3 + WAV + Stems",        exclusive: "MP3 + WAV + Stems" },
  { label: "Audio streams",            free: "50K",                    lease: "100K",                  premium: "500K",                     exclusive: "Unlimited" },
  { label: "Paid units (digital + physical)", free: "2K",             lease: "5K",                    premium: "25K",                      exclusive: "Unlimited" },
  { label: "Music videos",             free: "1",                      lease: "1",                     premium: "3",                        exclusive: "Unlimited" },
  { label: "Live performances",        free: "Yes",                    lease: "Yes",                   premium: "Yes",                      exclusive: "Yes" },
  { label: "Radio + non-profit",       free: "Yes",                    lease: "Yes",                   premium: "Yes",                      exclusive: "Yes" },
  { label: "Sync (TV / film / ads / games)", free: "Not allowed",    lease: "50/50",                 premium: "50/50",                    exclusive: "100% you" },
  { label: "Producer credit required", free: "Yes",                    lease: "Yes",                   premium: "Yes",                      exclusive: "Waived" },
  { label: "Publishing split",         free: "50/50",                  lease: "50/50",                 premium: "50/50",                    exclusive: "100% you" },
  { label: "Same beat sold to others", free: "Yes (non-exclusive)",   lease: "Yes (non-exclusive)",   premium: "Yes (non-exclusive)",      exclusive: "No — bought out" },
  { label: "Auto-delivered contract",  free: "free-standard-license.md", lease: "single-beat-lease.md", premium: "producer-bundle-license.md", exclusive: "producer-bundle-license.md + custom rider" },
];

const TIERS = [
  {
    slug: "free-standard",
    name: "Free Standard — $0",
    priceLabel: "Free Tier · $0",
    summary:
      "70 of the 96 beats on the site are tagged 'Free' and download free of charge under this license. MP3 only, lower caps, no sync rights. Great for demo cuts, mixtape work, or testing how a record lands before going wide.",
    sections: [
      {
        heading: "How to grab one",
        paragraphs: [
          "Hit the 'Get →' button on any beat tagged Free in the catalog. We deliver the MP3 + this license document via Substack email. One signup unlocks every free beat going forward.",
        ],
      },
      {
        heading: "What you get",
        bullets: [
          "Mastered MP3 (320 kbps, voice-tag-free)",
          "This license document (the contract you're reading) auto-delivered with the file",
          "Substack confirmation email with the download link",
        ],
      },
      {
        heading: "Caps (Free Standard tier)",
        paragraphs: [
          "Up to 50,000 audio-stream equivalents across all DSPs combined for the licensed track. Up to 2,000 paid units (digital + physical). Up to 1 official music video. NO sync placements at this tier — upgrade to a paid Lease ($29.99) or Bundle ($79+) before licensing the song to TV, film, ads, or video games.",
        ],
      },
      {
        heading: "Producer credit",
        paragraphs: [
          'You must credit "Prod. by Sneakz & Beatz" in DSP metadata, liner notes, music-video credit rolls, and on social-media track captions. Credit is the price of the free license — drop the credit, the license voids.',
        ],
      },
      {
        heading: "Splits",
        paragraphs: [
          "Same as Lease: 50/50 publishing on the underlying composition, 100% master to you. Sync income disabled — you have to upgrade before the first placement.",
        ],
      },
      {
        heading: "Free beats are also IN the bundle",
        paragraphs: [
          "Important — every free beat on the site is also part of the Producer Bundle ($79). If you want WAV stems, higher caps, or sync rights on any free beat, the cleanest path is the bundle, not the lease. Bundle adds nothing to your $0 free download — it's a separate license that unlocks the upgraded rights.",
        ],
      },
    ],
    ctaLabel: "Browse Free Beats →",
    ctaHref: "/beats",
    licenseHref: "/licenses/free-standard-license.md",
  },
  {
    slug: "lease",
    name: "Lease — $29.99",
    priceLabel: "Single Beat · $29.99",
    summary:
      "Single-beat license for one project. MP3 + WAV master delivered instantly after Stripe checkout. Multiple artists may license the same beat.",
    sections: [
      {
        heading: "What you get",
        paragraphs: [
          "Instant delivery (within minutes of checkout) of the mastered MP3 and WAV via your purchase-confirmation email.",
        ],
        bullets: [
          "MP3 master (full quality, voice-tag-free)",
          "WAV master (24-bit, 44.1 kHz)",
          "License to release on all DSPs under the caps below",
          "Email support for any delivery issue",
        ],
      },
      {
        heading: "Stream + sales caps",
        paragraphs: [
          "Up to 100,000 audio-stream equivalents across all DSPs combined for the licensed track. Up to 5,000 total paid units (digital downloads + physical CDs/vinyl). Up to 1 official music video. Once a track exceeds any of these caps you must upgrade to Premium or Exclusive — your $29.99 lease price is credited toward the upgrade.",
        ],
      },
      {
        heading: "Producer credit",
        paragraphs: [
          'You must credit "Prod. by Sneakz & Beatz" in your DSP metadata, liner notes, and on-screen credits in any official music video.',
        ],
      },
      {
        heading: "Splits",
        paragraphs: [
          "BRMG keeps 50% of publishing (writer + publisher) on the underlying composition. You keep 100% of the master recording. Streaming royalties paid to the artist (master share) flow to you in full; publishing royalties are split 50/50.",
        ],
      },
      {
        heading: "Non-exclusive",
        paragraphs: [
          "Other artists may also lease this beat. The beat remains in the catalog after your purchase. If you want to be the only artist who can use this beat, see the Exclusive tier.",
        ],
      },
    ],
    ctaLabel: "Browse Beats →",
    ctaHref: "/beats",
    licenseHref: "/licenses/single-beat-lease.md",
  },
  {
    slug: "premium",
    name: "Producer Bundle — $79",
    priceLabel: "Bundle · $47 / $79 / $497",
    summary:
      "Standard Bundle ($79) covers ALL 96 beats on the site — including the 70 tagged 'Free.' Starter ($47) is 25 of your choice. Exclusive ($497) is everything in Standard plus 5 fully exclusive beats pulled from the public catalog. Higher caps, full stems, drum kit + samples, mix consult.",
    sections: [
      {
        heading: "What you get",
        bullets: [
          "ALL 96 beats (Standard) — yes, the 70 Free ones are bundled in too",
          "25 beats of your pick (Starter)",
          "Standard + 5 fully exclusive beats removed from the catalog (Exclusive)",
          "MP3 + WAV + trackouts (separate stems for drums, melody, bass, etc.)",
          "BRMG drum kit + sample pack",
          "15-minute mix consultation Zoom (Standard tier only)",
          "All future drops added to your library for 6 months (Standard tier)",
        ],
      },
      {
        heading: "Stream + sales caps",
        paragraphs: [
          "Up to 500,000 audio-stream equivalents per track. Up to 25,000 paid units per track. Up to 3 music videos per beat. Limits apply per beat, not across the whole bundle.",
        ],
      },
      {
        heading: "Producer credit",
        paragraphs: [
          'Credit "Prod. by Sneakz & Beatz" remains required across all beats in the bundle.',
        ],
      },
      {
        heading: "Splits",
        paragraphs: [
          "Same as Lease: 50/50 publishing on the underlying composition, 100% master to you. Sync placements split 50/50.",
        ],
      },
      {
        heading: "Non-exclusive",
        paragraphs: [
          "Bundle beats remain available to other artists. To buy a beat out entirely, upgrade individual tracks via the Exclusive tier.",
        ],
      },
    ],
    ctaLabel: "See Bundle Pricing →",
    ctaHref: "/beats/bundles",
    licenseHref: "/licenses/producer-bundle-license.md",
  },
  {
    slug: "exclusive",
    name: "Exclusive — $497+",
    priceLabel: "Exclusive · $497 (5 beats)",
    summary:
      "Buy a beat out — it leaves the catalog and nobody else can use it. Available as part of the Exclusive Bundle (5 of your choice) or per-beat by request.",
    sections: [
      {
        heading: "What you get",
        bullets: [
          "Everything in the Standard Bundle, plus:",
          "5 fully exclusive beats — your pick from the entire catalog",
          "Each exclusive beat is removed from the public catalog after purchase",
          "Lifetime updates — every beat we ever release is yours, free",
          "Producer credit waived on the 5 exclusive beats",
          "Direct DM / email access for custom requests + sample-flip ideas",
          "DistroKid affiliate kit so you can release your projects efficiently",
        ],
      },
      {
        heading: "Stream + sales caps",
        paragraphs: [
          "No caps on the 5 exclusive beats. Stream and sell as much as you want. Standard-bundle caps still apply to the 95 non-exclusive beats included in the bundle.",
        ],
      },
      {
        heading: "Producer credit",
        paragraphs: [
          "Waived on the 5 exclusive beats. You may credit yourself as sole producer or use a co-producer credit, your call. Producer credit on the other 95 bundle beats remains required.",
        ],
      },
      {
        heading: "Splits",
        paragraphs: [
          "On the 5 exclusive beats: 100% publishing transfers to you, 100% master is yours, 100% of sync income is yours. On the other 95 bundle beats: same splits as the Standard Bundle (50/50 publishing, 100% master).",
        ],
      },
      {
        heading: "Per-beat exclusive purchases",
        paragraphs: [
          "Need exclusive rights on a specific beat without the bundle? Email licensing@sneakzandbeatz.com with the beat title — exclusive pricing is typically $250–$1,500 per beat depending on demand and is negotiated case-by-case. Once an exclusive sells, the beat is permanently removed from the public catalog.",
        ],
      },
    ],
    ctaLabel: "Get Exclusive Bundle →",
    ctaHref: "/beats/bundles",
    licenseHref: "/licenses/producer-bundle-license.md",
  },
];
