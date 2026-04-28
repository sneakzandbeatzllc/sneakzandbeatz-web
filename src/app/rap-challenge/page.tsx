import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRIPE_LINKS } from "@/data/stripe-links";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "The $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Submit a rap over a Sneakz & Beatz beat. Grand prize: $2,500 cash + PS5 Pro + $500 StockX + custom sneaker + monthly exclusive beats + paid IG promo + merch + more. Bundle and challenge entry are separate — enter the challenge by opting in.",
};

const STEPS = [
  {
    n: "01",
    h: "Get a beat",
    body: "Pick any beat from the Sneakz & Beatz catalog ($29.99 lease) or grab the Standard Bundle ($79) for 100 mastered beats + drum kits + sample pack + a t-shirt. The bundle is a standalone product — buying it does NOT auto-enter you in the challenge (see step 03).",
  },
  {
    n: "02",
    h: "Record your rap",
    body: "Drop a verse, hook, or full song. Mixed, mastered, your call. 60 seconds minimum, 4 minutes max. No uncleared samples, no AI vocals.",
  },
  {
    n: "03",
    h: "Opt in + submit your entry",
    body: "Go to the entry form. You explicitly opt into the challenge with a checkbox (separate from any bundle purchase). Entry requires: $25 standalone fee OR proof of bundle purchase OR free mailed-in entry (AMOE). You also confirm you follow @sneakz_beatz on IG/TikTok/X/YouTube AND you're in the Discord.",
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
      "$2,500 CASH (paid via Cash App, Zelle, or check — winner's choice)",
      "Sony PS5 Pro + 2 AAA games",
      "$500 StockX Gift Card",
      "Custom 1-of-1 painted sneaker (commissioned for the winner)",
      "Anime exclusive box — rare manga, vinyl OST, figurine, archive piece",
      "1 free exclusive beat per month for the rest of 2026 (full exclusive license, untagged WAVs)",
      "10 vocal kits + 5 drum kits + 5 melody loop packs (Logic / Pro Tools / FL / Ableton)",
      "PHRHX Custom Beat — Raymond produces a 1-of-1 for your next track",
      "$500 paid IG ad spend co-promo pushing YOUR next release",
      "Sneakz & Beatz merch drop — t-shirt + hoodie + hat in winner's size",
      "The PHRHX Show winner episode (full feature)",
      "Cypher tape opener slot (track #1)",
    ],
  },
  {
    place: "2nd Place",
    perceivedValue: "$3,000+",
    headline: "The Producer Pack",
    items: [
      "$500 CASH (Cash App / Zelle / check)",
      "$250 StockX Gift Card",
      "5 vocal kits + 1 drum kit + sample pack",
      "Sneakz & Beatz t-shirt + hat",
      "Cypher tape feature track (slots #5-10)",
      "Behind-the-scenes mention on the PHRHX Show winner episode",
    ],
  },
  {
    place: "3rd Place",
    perceivedValue: "$1,000+",
    headline: "The Starter Pack",
    items: [
      "$200 CASH (Cash App / Zelle / check)",
      "$100 StockX Gift Card",
      "Standard Bundle (100 mastered beats + t-shirt)",
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
      "Sneakz & Beatz t-shirt",
      "Standard Bundle at 50% off ($39) if you didn't already buy",
      "Sneakz & Beatz follow + 1 promo Reel mention",
    ],
  },
];

const FAQ = [
  {
    q: "Wait — does buying the bundle automatically enter me?",
    a: "No. The Standard Bundle ($79) is its own product — 100 mastered beats + drum kits + sample pack + a t-shirt. Plenty of people will buy the bundle just for the beats and have zero interest in the challenge. To ENTER the challenge you go to the entry form and explicitly opt in (checkbox), confirm you follow @sneakz_beatz on IG / TikTok / X / YouTube, and confirm you're in the Discord. Then you either pay the $25 entry fee, attach proof of bundle purchase, or use the free mailed-in entry (AMOE).",
  },
  {
    q: "What does the cash prize actually look like?",
    a: "1st place gets $2,500 cash via Cash App, Zelle, or a paper check (winner's choice). 2nd is $500. 3rd is $200. Plus all the rest — gift cards, custom sneaker, anime box, beats, kits, merch, co-promo. Cash + non-cash prizes get a 1099-MISC for any winner over $600 ARV in the year.",
  },
  {
    q: "Do I have to use a Sneakz & Beatz beat to enter?",
    a: "Yes. The whole point is to put eyes on the catalog. Use any beat from /beats ($29.99 lease) or any beat from the Standard Bundle. The beat MUST be ours.",
  },
  {
    q: "Who actually judges this?",
    a: "Sneakz & Beatz + PHRHX is the permanent panel. 3 guest judges rotate per cycle — names announced 14 days before voting opens. Final score: 70% panel + 30% community vote (held in the Discord with bot-enforced one-vote-per-member, self-votes blocked).",
  },
  {
    q: "Can I submit more than once?",
    a: "Yes — each submission is its own entry, and each requires its own paid path (bundle, $25 fee, or AMOE). Quality not quantity though — judges aren't going to score you 3 times because you sent 3 verses.",
  },
  {
    q: "When are submissions open?",
    a: "Waitlist is open right now (form below). Submissions open once we hit 250 waitlist signups so the prize pool is funded ethically. We email everyone on the list 7 days before submissions open with the official rules + judging panel + Discord invite.",
  },
  {
    q: "What if you don't hit critical mass?",
    a: "We extend the marketing window, OR refund any pre-paid entry fees and reschedule. Either way you keep your beats — the bundle is a separate product and is non-refundable.",
  },
  {
    q: "Is this legal in California?",
    a: "Yes. This is a SKILL-BASED contest — primary determination is judging on craft (lyricism, flow, originality, beat use, production), not chance. We provide a free mailed-in alternative method of entry (AMOE) so the contest doesn't satisfy the legal definition of a lottery in CA. Full official rules at /rap-challenge/rules.",
  },
  {
    q: "Where does the prize money come from?",
    a: "Bundle revenue + entry fees. Every Standard Bundle sale during the campaign window contributes to the prize pool. The challenge launches once we have the cash prize ($2,500 + $500 + $200 = $3,200) plus the gift-card and merch fulfillment budget secured.",
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
              <strong>$2,500 cash</strong> (Cash App / Zelle / check). <strong>PS5 Pro</strong>.{" "}
              <strong>$500 StockX gift card</strong>. Custom 1-of-1 sneaker. Anime exclusive
              box. 1 free exclusive beat per month for the rest of 2026. 10 vocal kits + 5
              drum kits + 5 melody loop packs. PHRHX custom beat. <strong>$500 IG ad spend</strong>
              {" "}co-promoting your next release. Merch drop. Cypher-tape opener slot. Entry is
              <strong> $25</strong> standalone (or waived if you bought the $79 bundle, or free
              via AMOE).
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
            Total prize-pool value: <strong>$14,000+</strong> with <strong>$3,200 in cash</strong>
            {" "}across the top three. Cash gets paid via Cash App, Zelle, or check —
            winner&rsquo;s choice. Every other prize is physical product, gift cards, kits we own
            and ship, or paid ad spend that actually runs. No fake collabs, no &ldquo;mystery
            features,&rdquo; no streaming-number promises we can&rsquo;t guarantee. Prizes ≥
            $600 ARV trigger a 1099-MISC at year-end (winners sign a W-9 before fulfillment).
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

        {/* BUNDLE PROMO — bundle and challenge are separate products */}
        <section className="container rap-block rap-bundle">
          <div className="rap-bundle-inner">
            <span className="rap-bundle-tag">⚡ Two separate things</span>
            <h2 className="rap-h2 rap-bundle-h">
              The bundle is its own product. The challenge is its own thing. Pick one or both.
            </h2>
            <p className="rap-bundle-sub">
              The <strong>Standard Bundle ($79)</strong> = 100 mastered beats + drum kits +
              sample pack + Sneakz & Beatz t-shirt. It is a standalone product. <strong>Buying
              it does not enter you in the challenge.</strong> Plenty of people will buy it
              just because they want the beats and the merch — that's fine, you get every
              dollar of value either way.
            </p>
            <p className="rap-bundle-sub">
              If you also want to enter the challenge, you use the entry form, opt in
              explicitly, follow us on socials, join the Discord, and either pay the
              <strong> $25 entry fee</strong>, show proof of bundle purchase to waive the fee,
              or use the free <strong>mailed-in entry (AMOE)</strong>.
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
            <Link href="/rap-challenge/submit" className="btn btn-ghost btn-arrow">
              Go To Entry Form
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
