import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SOCIAL } from "@/data/social";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Submit Your Entry — $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Submit your rap entry for the Sneakz & Beatz $10K Rap Challenge. Upload your recording link, confirm your beat, agree to the official rules.",
};

// Web3Forms access key (free, unlimited form submissions, no signup-friction backend).
// Get a key at https://web3forms.com — paste it here, redeploy. Submissions land in
// the email tied to the key. Until the real key is set, the form will gracefully
// show the "saved as draft" UI but no submission goes through.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function RapChallengeSubmitPage() {
  const submissionsOpen = false; // Flip to true once funding threshold (250 waitlist) is hit + dates are set
  const formAction = WEB3FORMS_KEY
    ? "https://api.web3forms.com/submit"
    : "";

  return (
    <>
      <Header />

      <main className="submit-page">
        {/* HERO */}
        <section className="container submit-hero">
          <Link href="/rap-challenge" className="submit-back">
            ← Back to Rap Challenge
          </Link>

          {!submissionsOpen ? (
            <div className="submit-closed">
              <span className="submit-closed-tag">⚡ Submissions not open yet</span>
              <h1 className="submit-h1">We&rsquo;re still on the waitlist phase</h1>
              <p className="submit-sub">
                Submissions open once we hit the <strong>250-signup funding threshold</strong>.
                Everyone on the waitlist gets emailed seven days before the form goes live with
                the official judges + voting dates locked in.
              </p>
              <p className="submit-sub">
                In the meantime, lock your bundle and join the community Discord — that&rsquo;s
                where we&rsquo;ll drop early hints, host listening parties, and run the public
                vote when the time comes.
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
                Read carefully — incomplete entries get auto-rejected. One submission per form
                send. To enter again with a different recording, just fill the form again.
              </p>
            </>
          )}
        </section>

        {/* FORM — only renders when submissions are open */}
        {submissionsOpen && (
          <section className="container submit-form-block">
            <form
              className="submit-form"
              action={formAction}
              method="POST"
            >
              {/* Web3Forms config */}
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input
                type="hidden"
                name="subject"
                value="🎤 Rap Challenge Entry — Sneakz & Beatz"
              />
              <input
                type="hidden"
                name="from_name"
                value="Rap Challenge Submission"
              />
              <input
                type="hidden"
                name="redirect"
                value="https://sneakzandbeatz.com/rap-challenge/submit/thanks"
              />
              {/* Honeypot — bots fill this, humans don't see it */}
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* SECTION: Your info */}
              <fieldset className="submit-fieldset">
                <legend>1. Your info</legend>

                <label className="submit-field">
                  <span className="submit-label">
                    Artist name <span className="submit-req">*</span>
                  </span>
                  <input
                    type="text"
                    name="artist_name"
                    required
                    placeholder="The name on your tracks"
                    maxLength={80}
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Legal first + last name <span className="submit-req">*</span>
                    <span className="submit-helper">
                      Required for prize fulfillment + sweepstakes compliance. Stays private.
                    </span>
                  </span>
                  <input
                    type="text"
                    name="legal_name"
                    required
                    placeholder="As it appears on your ID"
                    maxLength={120}
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Email <span className="submit-req">*</span>
                    <span className="submit-helper">
                      Where we email if you&rsquo;re a finalist. Use the same one you bought the
                      bundle with (or paid the entry fee with) — that&rsquo;s how we verify
                      entry method.
                    </span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Date of birth <span className="submit-req">*</span>
                    <span className="submit-helper">
                      Must be 18+ to enter (or age of majority in your state).
                    </span>
                  </span>
                  <input type="date" name="date_of_birth" required />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    State of residence <span className="submit-req">*</span>
                  </span>
                  <select name="state" required defaultValue="">
                    <option value="" disabled>
                      Select your state
                    </option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </fieldset>

              {/* SECTION: Entry method */}
              <fieldset className="submit-fieldset">
                <legend>2. How you entered</legend>

                <label className="submit-field">
                  <span className="submit-label">
                    Entry method <span className="submit-req">*</span>
                  </span>
                  <select name="entry_method" required defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option value="standard_bundle">
                      Standard Bundle ($79) — entry waived
                    </option>
                    <option value="paid_entry">$25 standalone entry</option>
                    <option value="amoe">Mailed-in free entry (AMOE)</option>
                  </select>
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Order / receipt ID
                    <span className="submit-helper">
                      Stripe receipt ID, order number, or AMOE postmark date. Skippable but
                      makes verification 10× faster.
                    </span>
                  </span>
                  <input
                    type="text"
                    name="order_id"
                    placeholder="ch_3PXX… or AMOE postmark 2026-MM-DD"
                    maxLength={120}
                  />
                </label>
              </fieldset>

              {/* SECTION: The recording */}
              <fieldset className="submit-fieldset">
                <legend>3. Your recording</legend>

                <label className="submit-field">
                  <span className="submit-label">
                    Track title <span className="submit-req">*</span>
                  </span>
                  <input
                    type="text"
                    name="track_title"
                    required
                    placeholder="e.g., Late Night (SB Challenge)"
                    maxLength={120}
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Public link to recording <span className="submit-req">*</span>
                    <span className="submit-helper">
                      SoundCloud, YouTube (unlisted OK if link works), Audiomack, IG Reel, or
                      TikTok. Must stay live until winners are announced.
                    </span>
                  </span>
                  <input
                    type="url"
                    name="recording_url"
                    required
                    placeholder="https://soundcloud.com/your-handle/your-track"
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Beat used <span className="submit-req">*</span>
                    <span className="submit-helper">
                      Title or slug from <Link href="/beats">/beats</Link> (e.g., &ldquo;Brooklyn
                      Drift&rdquo;) or &ldquo;Bundle — track 47&rdquo;.
                    </span>
                  </span>
                  <input
                    type="text"
                    name="beat_used"
                    required
                    placeholder="Beat title or bundle track number"
                    maxLength={120}
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Length of recording (seconds) <span className="submit-req">*</span>
                    <span className="submit-helper">Min 60, max 240.</span>
                  </span>
                  <input
                    type="number"
                    name="duration_seconds"
                    required
                    min={60}
                    max={240}
                    placeholder="e.g., 180"
                  />
                </label>

                <label className="submit-field">
                  <span className="submit-label">
                    Tagged @sneakz_beatz with #SBRapChallenge?{" "}
                    <span className="submit-req">*</span>
                  </span>
                  <select name="tagged" required defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option value="yes">Yes — tagged on the post</option>
                    <option value="amoe">N/A — AMOE entry (no public post)</option>
                  </select>
                </label>
              </fieldset>

              {/* SECTION: Originality + agreements */}
              <fieldset className="submit-fieldset">
                <legend>4. Confirmations</legend>

                <label className="submit-checkbox-field">
                  <input type="checkbox" name="confirm_original" required value="yes" />
                  <span>
                    I confirm this is my <strong>original work</strong>, performed by me, with
                    no uncleared samples and no AI-generated vocals.{" "}
                    <span className="submit-req">*</span>
                  </span>
                </label>

                <label className="submit-checkbox-field">
                  <input type="checkbox" name="confirm_rules" required value="yes" />
                  <span>
                    I have read and agree to the{" "}
                    <Link href="/rap-challenge/rules" target="_blank">
                      Official Rules
                    </Link>{" "}
                    of the $10K Rap Challenge. <span className="submit-req">*</span>
                  </span>
                </label>

                <label className="submit-checkbox-field">
                  <input type="checkbox" name="confirm_18" required value="yes" />
                  <span>
                    I am at least 18 years old (or the age of majority in my state).{" "}
                    <span className="submit-req">*</span>
                  </span>
                </label>

                <label className="submit-checkbox-field">
                  <input type="checkbox" name="confirm_no_self_vote" required value="yes" />
                  <span>
                    I understand that <strong>I cannot vote for my own submission</strong> in
                    the public-vote round, and that doing so disqualifies my entry.{" "}
                    <span className="submit-req">*</span>
                  </span>
                </label>

                <label className="submit-checkbox-field">
                  <input type="checkbox" name="confirm_keep_live" required value="yes" />
                  <span>
                    I will keep the recording at the link above publicly accessible until
                    winners are announced. <span className="submit-req">*</span>
                  </span>
                </label>

                <label className="submit-checkbox-field submit-optional">
                  <input type="checkbox" name="join_discord" value="yes" />
                  <span>
                    Add me to the email-list for Discord community drops + voting-window
                    reminders. (Optional but recommended.)
                  </span>
                </label>
              </fieldset>

              <button type="submit" className="btn btn-primary btn-arrow submit-cta">
                Submit My Entry
              </button>

              <p className="submit-trust">
                You&rsquo;ll get a confirmation email within 5 minutes. If you don&rsquo;t,
                check spam, then email{" "}
                <a href={mailto(EMAILS.info, "Rap Challenge — Submission issue")}>
                  {EMAILS.info}
                </a>
                .
              </p>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
  "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY",
];
