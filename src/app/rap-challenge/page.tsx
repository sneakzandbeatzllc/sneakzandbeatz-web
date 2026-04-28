import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRIPE_LINKS } from "@/data/stripe-links";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "The $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Submit a rap over a Sneakz & Beatz beat. Winner takes home a $10,000 prize package — PS5 Pro, $500 StockX gift card, custom 1-of-1 sneaker, anime exclusive box, lifetime beats, and more. Entry is free with the $79 Standard Bundle.",
};

const STEPS = [
  {
    n: "01",
    h: "Get a beat",
    body: "Pick any beat from the Sneakz & Beatz catalog. The Standard Bundle ($79) gets you all 100 + your entry fee waived. Entry without bundle is $25.",
  },
  {
    n: "02",
    h: "Record your rap",
    body: "Drop a verse, hook, or full song. Mixed, mastered, your call. 60 seconds minimum, 4 minutes max. No samples we didn't clear, no AI vocals.",
  },
  {
    n: "03",
    h: "Submit before the deadline",
    body: "Upload to your platform of choice (SoundCloud, YouTube, Audiomack, IG Reel, TikTok). Tag @sneakz_beatz and use #SBRapChallenge. We pull every submission into the judging pool.",
  },
  {
    n: "04",
    h: "Judging + community vote",
    body: "Top 25 finalists reviewed by Sneakz & Beatz + guest judges (TBA). Community votes in the Discord — one vote per member, self-votes blocked by the bot. Final score: 70% panel + 30% community. Winner announced live on The PHRHX Show.",
  },
];

type PrizeTier = {
  place: string;
  perceivedValue: string;
  headline: string;
  items: string[];
  isWinner?: boolean;
};

const PRIZES: PrizeTier[] = [
  {
    place: "1st Place",
    perceivedValue: "$10,000+",
    headline: "The Whole Pack",
    isWinner: true,
    items: [
      "Sony PS5 Pro + 2 AAA games",
      "$500 StockX Gift Card",
      "Custom 1-of-1 painted sneaker (commissioned for the winner)",
      "Anime exclusive box — rare manga, vinyl OST, figurine, archive piece",
      "Sneakz & Beatz Lifetime Pass — every beat we ever release, forever",
      "10 vocal kits + 5 drum kits + 5 melody loop packs (Logic / Pro Tools / FL / Ableton)",
      "PHRHX Custom Beat — Raymond produces a 1-of-1 for your next track",
      "Inner Circle 12-month pass (private group, voice-note Q&As, early drops)",
      "The PHRHX Show winner episode",
      "Cypher tape opener slot (track #1)",
    ],
  },
  {
    place: "2nd Place",
    perceivedValue: "$3,000+",
    headline: "The Producer Pack",
    items: [
      "$250 StockX Gift Card",
      "5 vocal kits + drum kit + sample pack",
      "Sneakz & Beatz Lifetime Pass",
      "Cypher tape feature track (slots #5-10)",
      "Behind-the-scenes mention on the PHRHX Show winner episode",
    ],
  },
  {
    place: "3rd Place",
    perceivedValue: "$1,000+",
    headline: "The Starter Pack",
    items: [
      "$100 StockX Gift Card",
      "Standard Bundle (100 mastered beats)",
      "2 vocal kits",
      "Cypher tape feature track (slots #15-25)",
    ],
  },
  {
    place: "Top 25 Finalists",
    perceivedValue: "$300+ each",
    headline: "The Cypher",
    items: [
      "Producer credit on \"Sneakz & Beatz Cypher Vol. 1\" — released to all DSPs (Spotify, Apple Music, Tidal, Amazon Music)",
      "30% of streaming royalties on YOUR track on the cypher tape",
      "Standard Bundle at 50% off ($39) if you didn't already buy",
      "Sneakz & Beatz follow + 1 promo Reel mention",
    ],
  },
];

const FAQ = [
  {
    q: "How is entry actually free with the bundle?",
    a: "The Standard Bundle is $79 either way. When you buy it, your purchase email is auto-added to the entry list — no extra fee. If you don't want the bundle, entry alone is $25. The math is wildly in your favor on the bundle path.",
  },
  {
    q: "Do I have to use a Sneakz & Beatz beat to enter?",
    a: "Yes. The whole point of the challenge is to put eyes on the catalog. Use any of the 96 mastered beats from /beats or any beat from the Standard Bundle. You can lease individually for $29.99 if you only need one.",
  },
  {
    q: "Who actually judges this?",
    a: "Sneakz & Beatz / PHRHX is permanent panel. Guest judges (3) rotate per challenge — names announced 2 weeks before voting opens. Public vote on Instagram Reels + TikTok counts for 30%; panel scores count for 70%.",
  },
  {
    q: "Can I submit more than once?",
    a: "Yes — each submission is its own entry, and each requires either the bundle or a $25 entry fee. Pick your strongest verse; quantity isn't a tie-breaker, quality is.",
  },
  {
    q: "When are sign-ups open?",
    a: "Waitlist is open right now (form below). Submissions open when we hit critical mass — minimum 250 waitlist signups so the prize pool is funded ethically. We'll email everyone on the list 7 days before submissions open with the official rules + judging panel.",
  },
  {
    q: "What if you don't hit critical mass?",
    a: "We'll either delay the deadline + keep marketing, or refund any pre-paid entries and announce the date for the next cycle. Either way you keep your beats — the bundle isn't refunded.",
  },
  {
    q: "Where does the prize money come from?",
    a: "Bundle revenue + entry fees. We're transparent about this: every Standard Bundle sale during the campaign window contributes to the prize pool. The challenge runs once we have funding lined up, not on a fixed date.",
  },
];

export default function RapChallengePage() {
  return (
    <>
      <Header />

      <main className="rap-challenge">
        {/* HERO */}
        <section className="rap-hero">
          <div className="container">
            <span className="rap-eyebrow">⚡ The $10K Rap Challenge · Waitlist Open</span>
            <h1 className="rap-headline">
              Submit a rap. <span className="accent">Win a $10K prize package.</span>
            </h1>
            <p className="rap-sub">
              <strong>PS5 Pro</strong>. <strong>$500 StockX gift card</strong>. Custom 1-of-1
              sneaker. Anime exclusive box. Lifetime beat catalog access. 10 producer kits.
              Plus a custom beat from PHRHX, the cypher-tape opener slot, and 12 months of
              Inner Circle. <strong>Entry is free with the $79 Standard Bundle</strong>
              {" "}(you keep all 100 beats either way). Or $25 standalone. Top 25 land on the
              cypher tape with streaming royalties.
            </p>

            {/* Waitlist signup — Substack form, same backend as the newsletter */}
            <form
              className="rap-waitlist"
              action="https://sneakzandbeatz.substack.com/subscribe"
              method="post"
              target="_blank"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="rap-waitlist-input"
              />
              <button type="submit" className="btn btn-primary btn-arrow rap-waitlist-cta">
                Get On The Waitlist
              </button>
            </form>
            <p className="rap-trust">
              Free to join · We'll email you when submissions open · 250-signup minimum before launch
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="container rap-block">
          <h2 className="rap-h2">How It Works</h2>
          <div className="rap-steps">
            {STEPS.map((s) => (
              <article key={s.n} className="rap-step">
                <span className="rap-step-num">{s.n}</span>
                <h3 className="rap-step-h">{s.h}</h3>
                <p className="rap-step-body">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PRIZES */}
        <section className="container rap-block">
          <h2 className="rap-h2">The Prize Pool</h2>
          <p className="rap-prize-intro">
            Total perceived value across all tiers: <strong>$14,000+</strong>. Every prize is
            verifiable — physical product, gift cards, kits we own and ship, and credits that
            actually print. No fake collabs, no &ldquo;mystery features,&rdquo; no streaming-number
            promises we can&rsquo;t guarantee.
          </p>
          <div className="rap-prize-tiers">
            {PRIZES.map((tier) => (
              <article
                key={tier.place}
                className={"rap-prize-tier" + (tier.isWinner ? " rap-prize-tier-winner" : "")}
              >
                <header className="rap-prize-tier-head">
                  <span className="rap-prize-tier-place">{tier.place}</span>
                  <span className="rap-prize-tier-value">{tier.perceivedValue}</span>
                </header>
                <h3 className="rap-prize-tier-headline">{tier.headline}</h3>
                <ul className="rap-prize-tier-items">
                  {tier.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* BUNDLE PROMO */}
        <section className="container rap-block rap-bundle">
          <div className="rap-bundle-inner">
            <span className="rap-bundle-tag">⚡ Smartest path</span>
            <h2 className="rap-h2 rap-bundle-h">
              Buy the bundle. Skip the entry fee. Get 100 beats anyway.
            </h2>
            <p className="rap-bundle-sub">
              The Standard Bundle is <strong>$79</strong> either way — but when you buy it,
              your $25 Rap Challenge entry is waived AND you get every other tool you need:
              MP3 + WAV + stems, drum kits, sample pack, mix consult, and 6 months of future
              drops. Math: bundle <strong>without</strong> challenge = $79 for $2,500 of value.
              Bundle <strong>with</strong> challenge = same $79, plus a shot at $10K. Stupid
              not to.
            </p>
            <a
              href={STRIPE_LINKS.standardBundle}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-arrow"
            >
              Get The Bundle ($79)
            </a>
            <span style={{ display: "inline-block", width: 14 }}></span>
            <Link href="/beats" className="btn btn-ghost btn-arrow">
              Browse Beats First
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="container rap-block">
          <h2 className="rap-h2">Quick Answers</h2>
          <div className="funnel-faq">
            {FAQ.map((f, i) => (
              <details key={i} className="contact-faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="container rap-block rap-final">
          <h2 className="rap-h2 rap-final-h">Ready to put your bag where your bars are?</h2>
          <p className="rap-final-sub">
            Get on the waitlist. We email everyone on the list 7 days before submissions open.
          </p>
          <form
            className="rap-waitlist"
            action="https://sneakzandbeatz.substack.com/subscribe"
            method="post"
            target="_blank"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="rap-waitlist-input"
            />
            <button type="submit" className="btn btn-primary btn-arrow rap-waitlist-cta">
              Lock My Spot
            </button>
          </form>
          <p className="rap-trust" style={{ marginTop: 16 }}>
            Or <a href={mailto(EMAILS.info, "Rap Challenge — Question")}>email us</a> with questions.
          </p>
          <p className="rap-trust" style={{ marginTop: 8 }}>
            <Link href="/rap-challenge/rules">Read the official rules</Link> · NO PURCHASE
            NECESSARY · void where prohibited
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
