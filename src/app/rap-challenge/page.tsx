import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRIPE_LINKS } from "@/data/stripe-links";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "The $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Submit a rap over a Sneakz & Beatz beat. Best track wins $10,000. Entry is free with the $79 Standard Bundle. Sign up for the waitlist — entries open soon.",
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
    h: "Judging + prize drop",
    body: "Top 25 reviewed by Sneakz & Beatz + a guest judge panel (TBA). Public vote weighs 30%, panel weighs 70%. Winner announced live on The PHRHX Show.",
  },
];

const PRIZES = [
  { place: "1st",  amount: "$10,000", extras: "+ exclusive license on the beat you used + The PHRHX Show interview" },
  { place: "2nd",  amount: "$1,500",  extras: "+ exclusive license + Standard Bundle for life (every beat we ever release)" },
  { place: "3rd",  amount: "$500",    extras: "+ Standard Bundle for life" },
  { place: "Top 25", amount: "Producer credit", extras: "On a Sneakz & Beatz cypher tape released to all DSPs" },
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
              Submit a rap over a <span className="accent">Sneakz &amp; Beatz</span> beat.
              <br />
              Best track wins <span className="rap-prize-num">$10,000</span>.
            </h1>
            <p className="rap-sub">
              Entry is <strong>free</strong> with the $79 Standard Bundle (you keep all 100
              beats either way). Or <strong>$25 standalone</strong>. Top 25 land on the
              cypher tape. Winner gets the bag, the exclusive on the beat they used, and an
              interview on The PHRHX Show.
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
          <div className="rap-prizes">
            {PRIZES.map((p) => (
              <div key={p.place} className={"rap-prize-row" + (p.place === "1st" ? " rap-prize-winner" : "")}>
                <span className="rap-prize-place">{p.place}</span>
                <span className="rap-prize-amount">{p.amount}</span>
                <span className="rap-prize-extras">{p.extras}</span>
              </div>
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
        </section>
      </main>

      <Footer />
    </>
  );
}
