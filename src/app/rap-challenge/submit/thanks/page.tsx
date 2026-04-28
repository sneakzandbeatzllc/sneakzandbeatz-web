import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Entry received — $10K Rap Challenge — Sneakz & Beatz",
  description: "Your Rap Challenge entry has been received. Check your inbox for confirmation.",
};

export default function RapChallengeThanksPage() {
  return (
    <>
      <Header />

      <main className="submit-page">
        <section className="container submit-thanks">
          <span className="submit-thanks-tag">⚡ Entry received</span>
          <h1 className="submit-h1">You&rsquo;re in. We&rsquo;ve got the verse.</h1>
          <p className="submit-sub">
            Confirmation email is on its way (check spam if you don&rsquo;t see it in 5 min).
            We&rsquo;ll review every submission once the window closes — finalist
            notifications go out by email + a callout in the Discord.
          </p>

          <div className="submit-thanks-next">
            <h2 className="submit-thanks-h2">What happens next</h2>
            <ol className="submit-thanks-list">
              <li>
                <strong>Submission window closes.</strong> Sponsor + judges review every entry,
                top 25 finalists picked.
              </li>
              <li>
                <strong>Public-vote round opens in Discord</strong> for 7 days. Anyone in the
                community can vote — but you cannot vote for yourself, and the bot blocks
                self-votes automatically.
              </li>
              <li>
                <strong>Final scoring:</strong> 70% judges&rsquo; panel + 30% community vote.
              </li>
              <li>
                <strong>Winner announced live</strong> on The PHRHX Show.
              </li>
            </ol>
          </div>

          <div className="submit-thanks-cta">
            {SOCIAL.discord.enabled && SOCIAL.discord.url && (
              <a
                href={SOCIAL.discord.url}
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-arrow"
              >
                Join the Discord
              </a>
            )}
            <Link href="/rap-challenge" className="btn btn-ghost btn-arrow">
              Back to Challenge Page
            </Link>
          </div>

          <p className="submit-trust" style={{ marginTop: 32 }}>
            Want to enter again with a different recording?{" "}
            <Link href="/rap-challenge/submit">Submit another entry</Link> — each entry needs
            its own bundle purchase or $25 entry fee or AMOE submission.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
