"use client";

/**
 * RapChallengeSubmitForm
 *
 * Client component. Submits the Rap Challenge entry form to Web3Forms via
 * client-side fetch (no page redirect to web3forms.com — stays on our domain
 * the whole time). Shows inline status:
 *   • "idle"     — initial state, form rendered
 *   • "sending"  — submit pressed, fetch in flight, button disabled
 *   • "success"  — fetch returned ok; we redirect to /rap-challenge/submit/thanks
 *   • "error"    — fetch failed or returned non-ok; show retry
 */

import Link from "next/link";
import { useState, FormEvent } from "react";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "9c1680e8-7853-4d17-866c-b897371a6587";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
  "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY",
];

type Status = "idle" | "sending" | "error";

export default function RapChallengeSubmitForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "🎤 Rap Challenge Entry — Sneakz & Beatz");
    formData.append("from_name", "Rap Challenge Submission");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        // Stay on our domain; redirect to /thanks for the polished post-submit state.
        window.location.href = "/rap-challenge/submit/thanks";
      } else {
        setStatus("error");
        setErrorMsg(
          data?.message ||
            "Submission failed. Please try again or email info@sneakzandbeatz.com."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Network error. Check your connection and try again. If it keeps failing, email info@sneakzandbeatz.com."
      );
    }
  }

  return (
    <form className="submit-form" onSubmit={handleSubmit} noValidate={false}>
      {/* Honeypot — bots fill this, humans don't see it */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* SECTION 1 */}
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
              Required for prize fulfillment + tax compliance. Stays private.
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
              bundle with (or paid the entry fee with).
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

      {/* SECTION 2 */}
      <fieldset className="submit-fieldset">
        <legend>2. How you&rsquo;re entering</legend>

        <label className="submit-field">
          <span className="submit-label">
            Entry method <span className="submit-req">*</span>
          </span>
          <select name="entry_method" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option value="paid_entry">$25 standalone entry fee</option>
            <option value="bundle_proof">
              I bought the Standard Bundle (waives the $25)
            </option>
            <option value="amoe">Mailed-in free entry (AMOE)</option>
          </select>
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Order / receipt ID
            <span className="submit-helper">
              Stripe receipt ID (bundle path), $25 entry payment ID, or AMOE postmark
              date. Skippable but makes verification 10× faster.
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

      {/* SECTION 3 */}
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

      {/* SECTION 4 — social + Discord verification */}
      <fieldset className="submit-fieldset">
        <legend>4. Social + Discord verification (required)</legend>

        <p className="submit-helper" style={{ marginBottom: 14 }}>
          All entrants must follow Sneakz & Beatz on every active platform AND be a
          verified member of the Discord. We audit finalists before announcing.
        </p>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="follow_ig" required value="yes" />
          <span>
            I follow <strong>@sneakz_beatz</strong> on Instagram.{" "}
            <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="follow_tiktok" required value="yes" />
          <span>
            I follow <strong>@SneakzandBeatzOfficial</strong> on TikTok.{" "}
            <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="follow_x" required value="yes" />
          <span>
            I follow <strong>@sneakzandbeatz</strong> on X (Twitter).{" "}
            <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="follow_youtube" required value="yes" />
          <span>
            I&rsquo;m subscribed to <strong>The PHRHX Show</strong> on YouTube.{" "}
            <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-field">
          <span className="submit-label">
            My Discord username <span className="submit-req">*</span>
            <span className="submit-helper">
              Must already be in the Sneakz & Beatz Discord. Format:{" "}
              <code>username</code> or <code>username#0000</code>. Used for
              vote-eligibility verification.
            </span>
          </span>
          <input
            type="text"
            name="discord_username"
            required
            placeholder="username"
            maxLength={64}
          />
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_discord_member" required value="yes" />
          <span>
            I confirm I am a verified member of the Sneakz & Beatz Discord with the
            username above. <span className="submit-req">*</span>
          </span>
        </label>
      </fieldset>

      {/* SECTION 5 — competition opt-in */}
      <fieldset className="submit-fieldset submit-fieldset-optin">
        <legend>5. Competition opt-in</legend>

        <p className="submit-helper" style={{ marginBottom: 14 }}>
          This is the explicit opt-in. Without this, you have not entered the
          Promotion regardless of any bundle purchase or fee paid.
        </p>

        <label className="submit-checkbox-field submit-checkbox-emphasis">
          <input type="checkbox" name="confirm_opt_in" required value="yes" />
          <span>
            <strong>
              YES — I am opting in to enter the $10K Rap Challenge with the recording
              above.
            </strong>{" "}
            I understand the bundle (if I bought one) and the challenge are separate
            products and that my bundle purchase by itself does not enter me.{" "}
            <span className="submit-req">*</span>
          </span>
        </label>
      </fieldset>

      {/* SECTION 6 — confirmations */}
      <fieldset className="submit-fieldset">
        <legend>6. Confirmations + legal</legend>

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
            the community-vote round, and that doing so disqualifies my entry.{" "}
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

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_w9" required value="yes" />
          <span>
            I understand that if I win a prize tier valued at $600 or more I will be
            required to complete and return IRS Form W-9 before any prize (cash or
            non-cash) is delivered, and that I will receive a Form 1099-MISC for tax
            reporting. <span className="submit-req">*</span>
          </span>
        </label>
      </fieldset>

      {/* Inline status */}
      {status === "error" && (
        <div className="submit-error" role="alert">
          ✗ {errorMsg}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-arrow submit-cta"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Submit My Entry"}
      </button>

      <p className="submit-trust">
        You&rsquo;ll get a confirmation email within 5 minutes. If you don&rsquo;t,
        check spam, then email{" "}
        <a href="mailto:info@sneakzandbeatz.com?subject=Rap%20Challenge%20-%20Submission%20issue">
          info@sneakzandbeatz.com
        </a>
        .
      </p>
    </form>
  );
}
