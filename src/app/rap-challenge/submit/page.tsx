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
              <span className="submit-closed-tag">🔒 Entry path closed — waitlist only</span>
              <h1 className="submit-h1">
                Submissions are <span className="accent">not open yet.</span>
              </h1>
              <p className="submit-sub">
                If you got here trying to enter today: <strong>we&rsquo;re not
                accepting entries.</strong> The contest only opens after three
                things lock in: (1) the 250-signup waitlist threshold, (2) the
                full prize pool funded ($3,200 cash + ~$18K in product/credits),
                and (3) the guest judging panel + voting window dates published
                14 days in advance. None of those are done yet. Trying to push a
                verse through right now would be wasted effort.
              </p>
              <p className="submit-sub">
                <strong>What to do instead:</strong> drop your email on the
                waitlist below — when entry goes live, you get a 7-day heads-up
                with the official rules + judges + dates. Then jump in the
                Discord and start cooking. The vote happens there too, so being
                in the server early is a real edge.
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
              <p className="submit-trust" style={{ marginTop: 24 }}>
                Want to know when it goes live? The waitlist email is the
                fastest way. The Discord is where the heads-up gets posted
                first.
              </p>
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
