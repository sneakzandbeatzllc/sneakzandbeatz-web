import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RapChallengeSubmitForm from "@/components/RapChallengeSubmitForm";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Submit Your Entry — $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Submit your rap entry for the Sneakz & Beatz $10K Rap Challenge. Upload your recording link, confirm your beat, follow socials, opt in explicitly, agree to the official rules.",
};

// FLAG: flip to true once the funding threshold (250 waitlist signups) is hit
// AND the official judges + dates are locked + Discord is live.
const SUBMISSIONS_OPEN = false;

export default function RapChallengeSubmitPage() {
  return (
    <>
      <Header />

      <main className="submit-page">
        <section className="container submit-hero">
          <Link href="/rap-challenge" className="submit-back">
            ← Back to Rap Challenge
          </Link>

          {!SUBMISSIONS_OPEN ? (
            <div className="submit-closed">
              <span className="submit-closed-tag">⚡ Submissions not open yet</span>
              <h1 className="submit-h1">We&rsquo;re still on the waitlist phase</h1>
              <p className="submit-sub">
                Submissions open once we hit the <strong>250-signup funding threshold</strong>
                {" "}(the prize pool — $3,200 cash + ~$18K in product/credits — has to be
                fully funded before we run the contest, no exceptions). Everyone on the
                waitlist gets emailed seven days before the form goes live with the official
                judges + voting dates locked in.
              </p>
              <p className="submit-sub">
                In the meantime, lock your bundle (if you want it — bundle is{" "}
                <strong>separate from the challenge</strong>) and join the community Discord
                — that&rsquo;s where the public-vote round happens, plus early bonus drops
                and listening parties along the way.
              </p>
              <div className="submit-cta-row">
                <Link href="/rap-challenge" className="btn btn-primary btn-arrow">
                  Get On The Waitlist
                </Link>
                {SOCIAL.discord.enabled && SOCIAL.discord.url && (
                  <a
                    href={SOCIAL.discord.url}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ghost btn-arrow"
                  >
                    Join Discord
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              <h1 className="submit-h1">Submit your entry</h1>
              <p className="submit-sub">
                Read carefully — incomplete entries get auto-rejected. The bundle and the
                challenge are <strong>two separate things</strong>: buying the bundle does
                NOT enter you. To enter, you fill this form, opt in explicitly at section 5,
                follow on all platforms, and verify your Discord membership.
              </p>
            </>
          )}
        </section>

        {SUBMISSIONS_OPEN && (
          <section className="container submit-form-block">
            <RapChallengeSubmitForm />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
