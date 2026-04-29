import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BEATS } from "@/data/beats";

export const metadata = {
  title: "Free Beats — Sneakz & Beatz",
  description:
    "Download any beat tagged Free under our Free Standard License. MP3, voice-tag-free, with the contract auto-attached. One Substack signup unlocks the catalog.",
};

export default function FreeBeatsPage({
  searchParams,
}: {
  searchParams?: { beat?: string };
}) {
  const requestedSlug = searchParams?.beat ?? "";
  const requested = BEATS.find(
    (b) => b.slug === requestedSlug && b.isFree,
  );
  const freeCount = BEATS.filter((b) => b.isFree).length;

  return (
    <>
      <Header />

      <main className="container free-beats">
        <section className="free-hero">
          <span className="eyebrow">Free Beats · Free Standard License</span>
          <h1 className="free-title">
            {requested ? (
              <>
                <span className="accent">"{requested.title}"</span> — yours,
                free.
              </>
            ) : (
              <>
                {freeCount} mastered beats. <span className="accent">$0.</span>
              </>
            )}
          </h1>
          <p className="free-lead">
            Every beat tagged Free in the catalog ships under our Free Standard
            License (MP3 only, 50K stream cap, 1 video, no sync). The contract
            auto-attaches to your download. One Substack signup unlocks every
            free beat going forward.
          </p>
        </section>

        <section className="free-steps">
          <article className="free-step">
            <span className="free-step-num">1</span>
            <h2 className="free-step-h">Download the license first</h2>
            <p className="free-step-p">
              By downloading any free beat, you accept this contract. Read it
              once — we wrote it in plain English. Caps, splits, what you can
              and can't do. No fine print games.
            </p>
            <a
              href="/licenses/free-standard-license.md"
              download
              className="btn btn-primary btn-arrow"
            >
              Download Free Standard License (.md)
            </a>
          </article>

          <article className="free-step">
            <span className="free-step-num">2</span>
            <h2 className="free-step-h">Subscribe — beat lands in inbox</h2>
            <p className="free-step-p">
              We deliver free beat MP3s through Substack so we can stay in
              touch when new ones drop. Drop your email, confirm, and the beat
              link is in your welcome email within minutes.
            </p>
            <a
              href={
                requested
                  ? `https://sneakzandbeatz.substack.com/subscribe?utm_source=site&utm_medium=free-beat&utm_content=${encodeURIComponent(
                      requested.slug,
                    )}`
                  : "https://sneakzandbeatz.substack.com/subscribe?utm_source=site&utm_medium=free-beat"
              }
              target="_blank"
              rel="noopener"
              className="btn btn-ghost btn-arrow"
            >
              Subscribe + grab the beat →
            </a>
          </article>

          <article className="free-step">
            <span className="free-step-num">3</span>
            <h2 className="free-step-h">
              Want WAV stems + sync rights? Bundle.
            </h2>
            <p className="free-step-p">
              Every free beat is also part of the Producer Bundle — $79 for
              all 96 beats with WAV, trackouts, drum kit, and a license that
              actually allows sync placements. Same beat, real license.
            </p>
            <Link
              href="/beats/bundles"
              className="btn btn-ghost btn-arrow"
            >
              See bundle pricing →
            </Link>
          </article>
        </section>

        <section className="free-reminder">
          <h2 className="free-reminder-h">Quick reminders before you ship</h2>
          <ul className="free-reminder-list">
            <li>
              <strong>Producer credit is required:</strong>{" "}
              <code>Prod. by Sneakz &amp; Beatz</code> in DSP metadata, video
              credits, social caps. Drop the credit, license voids.
            </li>
            <li>
              <strong>Caps:</strong> 50K streams, 2K paid units, 1 music
              video, no sync. Crossing a cap means you upgrade — email{" "}
              <a href="mailto:licensing@sneakzandbeatz.com">
                licensing@sneakzandbeatz.com
              </a>{" "}
              and we credit the free tier toward the upgrade.
            </li>
            <li>
              <strong>Splits:</strong> 100% master to you. 50/50 publishing on
              the underlying composition (same as a paid lease).
            </li>
            <li>
              <strong>What you can't do:</strong> resell the bare beat,
              register it without listing BRMG as co-publisher, or use it in
              hateful / minor-sexualized content. License voids on first
              breach.
            </li>
          </ul>
          <p className="free-reminder-foot">
            Full breakdown:{" "}
            <Link href="/licensing">/licensing</Link>. Questions:{" "}
            <a href="mailto:licensing@sneakzandbeatz.com">
              licensing@sneakzandbeatz.com
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
