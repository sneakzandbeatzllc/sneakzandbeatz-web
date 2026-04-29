import Link from "next/link";
import { SOCIAL } from "@/data/social";

/**
 * /bundle/thank-you — final post-purchase confirmation page
 *
 * Reached after either accepting the upsell, declining the upsell, or as
 * the success_url for the Exclusive Bundle Stripe link directly.
 *
 * Job of this page:
 *  1. Confirm the purchase ("you're locked in")
 *  2. Show next steps — Stripe receipt, license PDF, Discord invite
 *  3. Auto-link to the bundle license MD so they have the contract before
 *     the Stripe receipt email lands
 *  4. Set up a referral / share moment (low-key, no spam)
 */
export const metadata = {
  title: "You're In — Welcome to the Bundle | Sneakz & Beatz",
  description:
    "Your Producer Bundle purchase is confirmed. Download links and license are on the way. Here's what to do next.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS: Array<{
  num: number;
  h: string;
  p: string;
  cta?: { href: string; label: string; download?: boolean; external?: boolean };
}> = [
  {
    num: 1,
    h: "Check your inbox in the next 60 seconds",
    p: "Stripe sends the receipt with your master download link within seconds. If you don't see it in 5 minutes, check Promotions / Spam — Gmail filters it sometimes — and email licensing@sneakzandbeatz.com if it's still missing. We answer every one of those personally.",
  },
  {
    num: 2,
    h: "Save the bundle license to your records",
    p: "Plain-English contract: 50/50 publishing on the underlying composition, 100% master to you, 500K stream cap per beat, 3 videos per beat. Auto-attached to your Stripe receipt — also downloadable here:",
    cta: {
      href: "/licenses/producer-bundle-license.md",
      label: "Download Producer Bundle License (.md)",
      download: true,
    },
  },
  {
    num: 3,
    h: "Drop into the Beatmakers Discord channel",
    p: "Buyer-only. Share your tracks, get feedback, hear about the next bundle expansion before everyone else. PHRHX is in there daily.",
    cta: {
      href: SOCIAL.discord.enabled && SOCIAL.discord.url
        ? SOCIAL.discord.url
        : "/community",
      label: "Open Discord →",
      external: SOCIAL.discord.enabled,
    },
  },
  {
    num: 4,
    h: "Book your 15-minute mix consult (Standard + Exclusive only)",
    p: "Bring an in-progress track. PHRHX gives you mix notes — frequencies, levels, glue, the cut your record needs. Recorded so you can go back to it.",
    cta: {
      href: "mailto:licensing@sneakzandbeatz.com?subject=Bundle%20Mix%20Consult%20Booking&body=Hey%20PHRHX%20—%20I%20just%20bought%20the%20Producer%20Bundle%20and%20want%20to%20book%20my%2015-minute%20mix%20consult.%20Here%27s%20the%20track:%20%5Battach%20a%20rough%20mix%5D",
      label: "Email to book consult →",
    },
  },
  {
    num: 5,
    h: "Tag us when you ship",
    p: "When the track drops, tag @sneakz_beatz on IG / @SneakzandBeatzOfficial on TikTok. We repost the heat. Producer credit is required ('Prod. by Sneakz & Beatz') in DSP metadata + video credits — that's the deal.",
  },
];

export default function BundleThankYouPage() {
  return (
    <main className="bundle-funnel bundle-thanks">
      <div className="bundle-urgency bundle-urgency-success">
        ✓ Purchase confirmed · You're in
      </div>

      <section className="bundle-hero bundle-thanks-hero">
        <span className="bundle-eyebrow">
          Welcome to the Producer Bundle
        </span>
        <h1 className="bundle-h1">
          Locked in. <span className="accent">Let's get you producing.</span>
        </h1>
        <p className="bundle-subhead">
          The whole catalog is yours. Stems, drum kit, mix consult, six
          months of future drops, and the license — all in one transaction.
          Five quick things below to set you up. Read them once, then go
          cook.
        </p>
      </section>

      <section className="bundle-steps">
        {NEXT_STEPS.map((s) => (
          <article key={s.num} className="bundle-step">
            <span className="bundle-step-num">{s.num}</span>
            <div className="bundle-step-body">
              <h3 className="bundle-step-h">{s.h}</h3>
              <p className="bundle-step-p">{s.p}</p>
              {s.cta &&
                (s.cta.external ? (
                  <a
                    href={s.cta.href}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-primary btn-arrow"
                  >
                    {s.cta.label}
                  </a>
                ) : s.cta.download ? (
                  <a
                    href={s.cta.href}
                    download
                    className="btn btn-primary btn-arrow"
                  >
                    {s.cta.label}
                  </a>
                ) : s.cta.href.startsWith("mailto:") ? (
                  <a
                    href={s.cta.href}
                    className="btn btn-ghost btn-arrow"
                  >
                    {s.cta.label}
                  </a>
                ) : (
                  <Link
                    href={s.cta.href}
                    className="btn btn-primary btn-arrow"
                  >
                    {s.cta.label}
                  </Link>
                ))}
            </div>
          </article>
        ))}
      </section>

      <section className="bundle-share">
        <h2 className="bundle-h2-tight">Know a producer who'd want this?</h2>
        <p className="bundle-share-p">
          No affiliate program (yet). But if a friend grabs the bundle this
          week, mention it in the Discord — first 5 referrals each get a
          free exclusive-beat upgrade on the house. Quiet rollout, just for
          early bundle buyers.
        </p>
        <p className="bundle-foot-fine">
          Questions: <a href="mailto:licensing@sneakzandbeatz.com">licensing@sneakzandbeatz.com</a>{" "}
          · <Link href="/licensing">Full license terms</Link> ·{" "}
          <Link href="/">Back to home</Link>
        </p>
      </section>
    </main>
  );
}
