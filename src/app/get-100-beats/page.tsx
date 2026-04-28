import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRIPE_LINKS } from "@/data/stripe-links";

export const metadata = {
  title: "Get 100 Mastered Beats For $79 — Sneakz & Beatz",
  description:
    "100 mastered beats. MP3 + WAV + Stems. Drum kit + sample pack. 15-minute mix consult. Six months of future drops. $2,500 perceived value, $79 today.",
};

const VALUE_STACK = [
  { item: "100 mastered beats — full curated catalog",                value: 1200 },
  { item: "BRMG drum kits + sample pack",                              value: 300 },
  { item: "15-minute 1-on-1 mix consultation (Zoom)",                  value: 150 },
  { item: "6 months of future beat drops added to your library",       value: 600 },
  { item: "Producer community access (private group)",                 value: 250 },
];

const PROBLEMS = [
  {
    pain: "Tired of paying $30 per beat",
    fix: "$0.79 per beat when you grab the bundle. The math is comically in your favor.",
  },
  {
    pain: "Tired of beats that won't get cleared",
    fix: "Every beat in this catalog is owned by BRMG. No uncleared samples, no surprise takedowns. Producer credit is the only requirement.",
  },
  {
    pain: "Tired of producers ghosting you mid-project",
    fix: "30-day money-back guarantee on the bundle, MP3 + WAV + stems delivered instantly, and a real human reply within 24 hours if anything goes wrong.",
  },
];

const FAQ = [
  {
    q: "Is this a subscription?",
    a: "No. One-time payment of $79. You own the licenses forever. The 6 months of future drops are added to your account automatically — also one-time, no recurring charge.",
  },
  {
    q: "Why is it so cheap?",
    a: "Because we want you actually using the beats, putting them on DSPs, building your catalog. Beats sitting on someone's hard drive don't grow our brand. Beats in your tracks do.",
  },
  {
    q: "What's the catch?",
    a: "Producer credit on the tracks (\"Prod. by Sneakz & Beatz\"). 50/50 publishing split on the underlying composition (you keep 100% of the master + streaming). Stream cap of 500K per track. If a track blows up past 500K you upgrade — your $79 credits toward the upgrade. That's the catch. There isn't a hidden one.",
  },
  {
    q: "What if I don't like them?",
    a: "30-day money-back guarantee. Email blackroyalmusicmedia@gmail.com within 30 days, full refund, no questions, no clawbacks. We'd rather you be happy than have your $79.",
  },
  {
    q: "Is this an exclusive?",
    a: "No. The bundle gives you a Premium Lease license on each beat — multiple artists can lease the same beat. If you want to OWN a beat (nobody else can use it), see the Exclusive tier on /beats/bundles ($497) or email us about per-beat exclusives.",
  },
  {
    q: "What format are the files?",
    a: "MP3 master + WAV master (24-bit, 44.1 kHz) + trackouts (separate stems for drums, melody, bass, etc. so you can re-mix at your end). Delivered as a single zip via your purchase email.",
  },
];

export default function Get100BeatsPage() {
  return (
    <>
      <Header />

      <main className="funnel">
        {/* HERO — Hard sell */}
        <section className="funnel-hero">
          <div className="container">
            <span className="funnel-eyebrow">⚡ Limited Drop · 100 Mastered Beats</span>
            <h1 className="funnel-headline">
              Get <span className="funnel-h-num">100</span> Mastered Beats.
              <br />
              <span className="accent">For $79. One Time.</span>
            </h1>
            <p className="funnel-sub">
              MP3 + WAV + Stems. Drum kit + sample pack. 15-minute mix consult.{" "}
              <strong>Six months of future drops.</strong> Built for artists who can do the
              math: that's <strong>79 cents per beat</strong>. The same beats other producers
              are charging $30 each for.
            </p>
            <a
              href={STRIPE_LINKS.standardBundle}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-arrow funnel-cta"
            >
              Get Instant Access — $79
            </a>
            <p className="funnel-trust">
              ⚡ Instant download · 🛡️ 30-day money-back · 📧 Producer credit only
            </p>
          </div>
        </section>

        {/* PROBLEM / AGITATE */}
        <section className="container funnel-block">
          <h2 className="funnel-h2">Sound Familiar?</h2>
          <div className="funnel-problems">
            {PROBLEMS.map((p, i) => (
              <article key={i} className="funnel-problem">
                <h3>"{p.pain}"</h3>
                <p>{p.fix}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="container funnel-block">
          <h2 className="funnel-h2">What's Inside The $79 Bundle</h2>
          <ul className="funnel-included">
            <li>✅ <strong>100 mastered beats</strong> — full curated catalog (East Coast, West Coast, Trap, Drill, Rage, R&B)</li>
            <li>✅ <strong>MP3 + WAV + Trackouts</strong> — separate stems for drums, melody, bass</li>
            <li>✅ <strong>BRMG drum kit</strong> — same drums on the masters, royalty-free for your tracks</li>
            <li>✅ <strong>Sample pack</strong> — 32 mixed soul loops, key + BPM tagged</li>
            <li>✅ <strong>15-minute mix consultation</strong> — 1-on-1 Zoom with the producer</li>
            <li>✅ <strong>6 months of future drops</strong> — every beat we release in the next 6 months, added to your library free</li>
            <li>✅ <strong>500K stream cap per track</strong> — sell up to 25K paid units per track</li>
            <li>✅ <strong>Producer community access</strong> — private group with other artists using the catalog</li>
            <li>✅ <strong>Priority email support</strong> — 24-hour response window</li>
          </ul>
        </section>

        {/* VALUE STACK */}
        <section className="container funnel-block">
          <h2 className="funnel-h2">Stack The Value</h2>
          <p className="funnel-stack-sub">
            Add it up at retail prices, then look at what we're charging today.
          </p>
          <div className="funnel-stack">
            {VALUE_STACK.map((row, i) => (
              <div key={i} className="funnel-stack-row">
                <span>{row.item}</span>
                <span className="funnel-stack-price">${row.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="funnel-stack-row funnel-stack-total">
              <span>Perceived total value</span>
              <span>$2,500</span>
            </div>
            <div className="funnel-stack-row funnel-stack-today">
              <span>Today, all-in</span>
              <span>$79</span>
            </div>
          </div>
          <a
            href={STRIPE_LINKS.standardBundle}
            target="_blank"
            rel="noopener"
            className="btn btn-primary btn-arrow funnel-cta"
            style={{ marginTop: 24 }}
          >
            Lock In $79 Now
          </a>
        </section>

        {/* GUARANTEE */}
        <section className="container funnel-block funnel-guarantee">
          <div className="funnel-guarantee-inner">
            <span className="funnel-guarantee-badge">30-Day Guarantee</span>
            <h2 className="funnel-h2">Use The Beats For 30 Days. If You Don't Love Them, Get Your $79 Back.</h2>
            <p>
              We've never had to use this clause but it's there. Email
              {" "}<a href="mailto:support@sneakzandbeatz.com">support@sneakzandbeatz.com</a>{" "}
              within 30 days of purchase, get a full refund, no questions asked. By
              accepting the refund you agree to delete the files. That's the only
              fine print.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="container funnel-block">
          <h2 className="funnel-h2">Quick Answers</h2>
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
        <section className="container funnel-block funnel-final">
          <h2 className="funnel-h2 funnel-final-h">Last Time We'll Ask.</h2>
          <p className="funnel-final-sub">
            100 mastered beats. $0.79 per beat. 30-day money-back. Plus stems, drum kits,
            mix consult, and 6 months of future drops. <strong>You'll lose more $79 to
            DoorDash this month.</strong>
          </p>
          <a
            href={STRIPE_LINKS.standardBundle}
            target="_blank"
            rel="noopener"
            className="btn btn-primary btn-arrow funnel-cta"
          >
            Yes — Get The Bundle
          </a>
          <p className="funnel-trust" style={{ marginTop: 16 }}>
            Or compare all three tiers on{" "}
            <Link href="/beats/bundles" style={{ color: "var(--highlight)", textDecoration: "underline" }}>
              /beats/bundles
            </Link>{" "}
            (Starter $47 · Standard $79 · Exclusive $497).
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
