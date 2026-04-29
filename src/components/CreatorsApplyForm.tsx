"use client";

/**
 * CreatorsApplyForm
 *
 * Application form for the S&B UGC Creator Program (/creators).
 * Posts to Web3Forms (key embedded as default — public per their docs).
 * Submissions land in sneakzandbeatzllc@gmail.com.
 *
 * Tracking: every application is also logged into the Tax_Records flow
 * downstream (the email gets archived, and the contract pdf for any
 * accepted creator goes into Business_Filings/.../Creator_Program/contracts/).
 */

import { useState, FormEvent } from "react";

// Partnerships-routed Web3Forms key — submissions land in
// partnerships@sneakzandbeatz.com (Google Workspace), NOT the default
// sneakzandbeatzllc@gmail.com inbox.
//
// Setup: create a Web3Forms account at https://web3forms.com using
// partnerships@sneakzandbeatz.com as the destination email. Paste the
// access key here OR set NEXT_PUBLIC_WEB3FORMS_KEY_PARTNERSHIPS in
// Vercel env. Falls back to the main key during the wire-up transition.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY_PARTNERSHIPS ||
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "9c1680e8-7853-4d17-866c-b897371a6587";

const NICHES = [
  "Sneakers / streetwear",
  "Athletic / fitness / wellness",
  "MOPAR / car culture (Scatpack, Hellcat, Trackhawk)",
  "Bodybuilding / pro fitness",
  "Hip-hop / music",
  "Anime / cosplay-adjacent",
  "Lifestyle / fashion",
];

// Air Jordan Retros 1-17 — the only models we shoot in.
const JORDAN_MODELS = [
  "AJ1", "AJ2", "AJ3", "AJ4", "AJ5", "AJ6",
  "AJ7", "AJ8", "AJ9", "AJ10", "AJ11", "AJ12",
  "AJ13", "AJ14", "AJ15", "AJ16", "AJ17",
];

const TIERS = [
  "Tier 1 — 5K–7K (Starter)",
  "Tier 2 — 7K–10K (Top of band)",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
  "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY","Not US",
];

type Status = "idle" | "sending" | "error" | "success";

export default function CreatorsApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append(
      "subject",
      "🎤 S&B Creator Program — New Application"
    );
    formData.append("from_name", "Creators Apply");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data?.message || "Submission failed. Try again or email partnerships@sneakzandbeatz.com.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Try again or email partnerships@sneakzandbeatz.com.");
    }
  }

  if (status === "success") {
    return (
      <div className="creators-success">
        <span className="creators-success-tag">✓ Application received</span>
        <h3 className="creators-success-h">You&rsquo;re in the queue.</h3>
        <p className="creators-success-body">
          We respond to qualified applicants within 5 business days. If you
          don&rsquo;t hear back from us in that window, you didn&rsquo;t make
          this round — we keep the email and tap in if a future brief fits
          your niche.
        </p>
        <p className="creators-success-body">
          While you wait, the Discord is the fastest way to stay close to
          what we&rsquo;re cooking.{" "}
          <a href="/community">Join here</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="creators-form" onSubmit={handleSubmit}>
      {/* Honeypot — bots fill this, humans don't see it */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <fieldset className="submit-fieldset">
        <legend>1. About you</legend>

        <label className="submit-field">
          <span className="submit-label">
            Full name <span className="submit-req">*</span>
          </span>
          <input type="text" name="full_name" required maxLength={120} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Email <span className="submit-req">*</span>
          </span>
          <input type="email" name="email" required />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Phone (optional)
            <span className="submit-helper">
              For shoot scheduling once you&rsquo;re booked. Stays private.
            </span>
          </span>
          <input type="tel" name="phone" maxLength={32} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            State / region <span className="submit-req">*</span>
          </span>
          <select name="state" required defaultValue="">
            <option value="" disabled>Select…</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset className="submit-fieldset">
        <legend>2. Your handles + reach</legend>

        <label className="submit-field">
          <span className="submit-label">
            Instagram handle <span className="submit-req">*</span>
          </span>
          <input type="text" name="ig_handle" required placeholder="@yourhandle" maxLength={64} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Instagram followers <span className="submit-req">*</span>
            <span className="submit-helper">Round number is fine. We verify before booking.</span>
          </span>
          <input type="number" name="ig_followers" required min={0} max={1000000} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            TikTok handle (optional)
          </span>
          <input type="text" name="tiktok_handle" placeholder="@yourhandle" maxLength={64} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            TikTok followers (optional)
          </span>
          <input type="number" name="tiktok_followers" min={0} max={1000000} />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Average engagement rate (%) <span className="submit-req">*</span>
            <span className="submit-helper">
              (Total engagements / followers) × 100, last 12 posts. Be honest —
              we run the numbers ourselves before greenlighting.
            </span>
          </span>
          <input type="number" name="engagement_rate" required min={0} max={50} step="0.1" />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Tier you&rsquo;re applying for <span className="submit-req">*</span>
          </span>
          <select name="tier" required defaultValue="">
            <option value="" disabled>Select…</option>
            {TIERS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset className="submit-fieldset">
        <legend>3. Your Jordan collection (Retros 1-17 only)</legend>

        <p className="submit-helper" style={{ marginBottom: 14 }}>
          We only shoot in <strong>Air Jordan Retros 1 through 17</strong>.
          You bring your own pairs — S&B does not ship or reimburse Jordans.
          Tick every model you own. Then list the specific colorways below
          so we can match the merch we send.
        </p>

        <div className="creators-jordans-grid">
          {JORDAN_MODELS.map((m) => (
            <label key={m} className="creators-jordan-pill">
              <input type="checkbox" name={`owns_${m}`} value={m} />
              <span>{m}</span>
            </label>
          ))}
        </div>

        <label className="submit-field" style={{ marginTop: 18 }}>
          <span className="submit-label">
            Colorways you own <span className="submit-req">*</span>
            <span className="submit-helper">
              One per line. Be specific so we can match the merch — e.g.
              &ldquo;AJ1 Bred · AJ4 White Cement · AJ11 Concord · AJ12 Playoffs.&rdquo;
              Off-list / rare colorways are encouraged — they unlock unique briefs.
            </span>
          </span>
          <textarea
            name="jordan_colorways"
            required
            rows={5}
            placeholder="AJ1 Bred&#10;AJ4 White Cement&#10;AJ11 Concord&#10;AJ12 Playoffs"
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "10px 14px",
              color: "var(--text)",
              fontFamily: "inherit",
              fontSize: 14,
              resize: "vertical",
            }}
          />
        </label>
      </fieldset>

      <fieldset className="submit-fieldset">
        <legend>4. Your style + niche</legend>

        <p className="submit-helper" style={{ marginBottom: 14 }}>
          Tick everything that fits. Multi-niche is fine — it&rsquo;s actually
          a plus.
        </p>

        {NICHES.map((n, i) => (
          <label key={n} className="submit-checkbox-field">
            <input type="checkbox" name={`niche_${i}`} value={n} />
            <span>{n}</span>
          </label>
        ))}

        <label className="submit-field" style={{ marginTop: 14 }}>
          <span className="submit-label">
            2 sample posts that represent your style <span className="submit-req">*</span>
            <span className="submit-helper">
              Public IG / TikTok URLs. Pick what you&rsquo;d want us to budget against.
            </span>
          </span>
          <input
            type="url"
            name="sample_url_1"
            required
            placeholder="https://instagram.com/p/…"
          />
          <input
            type="url"
            name="sample_url_2"
            required
            placeholder="https://tiktok.com/@…/video/…"
            style={{ marginTop: 8 }}
          />
        </label>

        <label className="submit-field">
          <span className="submit-label">
            Anything else we should know? (optional)
            <span className="submit-helper">
              Wardrobe specialty, signature aesthetic, big follower-count drop
              we should know about, anything that helps us slot you into the
              right brief.
            </span>
          </span>
          <textarea
            name="notes"
            rows={4}
            maxLength={800}
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "10px 14px",
              color: "var(--text)",
              fontFamily: "inherit",
              fontSize: 14,
              resize: "vertical",
            }}
          />
        </label>
      </fieldset>

      <fieldset className="submit-fieldset">
        <legend>5. Confirmations</legend>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_18" required value="yes" />
          <span>
            I am at least 18 years old. <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_terms" required value="yes" />
          <span>
            I&rsquo;ve read the <strong>Terms &amp; Conduct</strong> above and
            agree to the content guidelines (athletic / lifestyle /
            streetwear only — no suggestive, lingerie, bedroom, or bathroom
            content). <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_authentic" required value="yes" />
          <span>
            My follower count and engagement rate are authentic — no purchased
            followers or bot inflation. I understand S&B verifies before
            booking. <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_jordans" required value="yes" />
          <span>
            I confirm I own <strong>authentic Air Jordan Retros 1–17</strong> in
            the colorways I listed above, and I understand S&B does NOT
            provide or reimburse Jordans — I bring my own pair to every shoot,
            color-matched to the brief. <span className="submit-req">*</span>
          </span>
        </label>

        <label className="submit-checkbox-field">
          <input type="checkbox" name="confirm_ftc" required value="yes" />
          <span>
            I understand FTC requires <strong>#ad</strong> or{" "}
            <strong>#sponsored</strong> when posting paid S&B content on my own
            grid. <span className="submit-req">*</span>
          </span>
        </label>
      </fieldset>

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
        {status === "sending" ? "Sending…" : "Send The Application"}
      </button>

      <p className="submit-trust">
        We respond to qualified applicants within 5 business days.
      </p>
    </form>
  );
}
