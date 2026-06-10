/**
 * /rap-challenge/entry-completion
 *
 * Post-bundle-purchase landing page. Buyer who ticked "Enter the Rap Challenge"
 * at checkout lands here from their Stripe receipt email + the Substack
 * "Entry Started" automation. Walks through the 4 steps required to
 * COMPLETE the entry. Until all 4 are done, the entry is pending.
 *
 * The Stripe webhook (when wired) tags the buyer in Substack as
 * `rap_challenge_started` and emails them this URL.
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Complete Your Rap Challenge Entry — Sneakz & Beatz",
  description:
    "Your bundle is on the way. Your entry is started — but not complete. Here are the 4 steps to lock in your shot at the $10K Rap Challenge prize package.",
  alternates: { canonical: "/rap-challenge/entry-completion" },
  robots: { index: false, follow: false }, // private flow page; doesn't need to be in search
};

const STEPS = [
  {
    n: "01",
    h: "Follow us on every platform",
    body: "Required for entry. The Promotion verifies follows during finalist selection — accounts that aren't following all platforms are disqualified.",
    cta: "Follow on:",
    actions: [
      { label: "Instagram (@sneakz_beatz)", href: "https://www.instagram.com/sneakz_beatz" },
      { label: "TikTok (@SneakzandBeatzOfficial)", href: "https://www.tiktok.com/@SneakzandBeatzOfficial" },
      { label: "X / Twitter (@sneakzandbeatz)", href: "https://x.com/sneakzandbeatz" },
      { label: "YouTube (@sneakzandbeatz — The PHRHX Show)", href: "https://www.youtube.com/@sneakzandbeatz" },
    ],
  },
  {
    n: "02",
    h: "Join the Sneakz & Beatz Discord",
    body: "Required for entry. The community vote (30% of your final score) happens in Discord. You also can't get vote credit if you joined less than 7 days before voting opens, so join now to lock in eligibility.",
    cta: "Join Discord:",
    actions: [
      { label: "Open Discord invite", href: SOCIAL.discord.url || "/community" },
    ],
    note: "Use your real Discord username — we cross-verify against your entry to prevent self-votes.",
  },
  {
    n: "03",
    h: "Record + upload your video",
    body: "60 seconds minimum, 4 minutes maximum. Use any beat from the bundle. Mixed, mastered, your call. No uncleared samples, no AI vocals, no vocals from anyone other than you.",
    cta: "Then upload to:",
    actions: [
      { label: "YouTube (recommended — Public, not Unlisted)", href: "https://studio.youtube.com" },
    ],
    note: "Title your video format: \"[Your Name] — [Beat Name] — Sneakz & Beatz Rap Challenge\". Tag @sneakzandbeatz in the description.",
  },
  {
    n: "04",
    h: "Submit + acknowledge the rules",
    body: "Final step. Drop your YouTube URL + your Discord username in the entry form. You'll acknowledge you've read the Official Rules. Once submitted, your entry is COMPLETE and locked in for the next judging round.",
    cta: "Submit your entry:",
    actions: [
      { label: "Open entry form", href: "/rap-challenge/submit" },
    ],
  },
];

export default function EntryCompletionPage() {
  return (
    <>
      <Header />

      <main className="container" style={{ paddingBottom: "80px" }}>
        <header style={{ paddingTop: "48px", paddingBottom: "24px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FF6A1A",
              marginBottom: "12px",
            }}
          >
            ⚡ Entry Started · Not Yet Complete
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.15 }}>
            You&rsquo;re in motion.
            <br />
            <span style={{ color: "#FF6A1A" }}>Now lock it in.</span>
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.55, maxWidth: "640px", margin: "0 auto", color: "var(--muted, #888)" }}>
            Your bundle download link is in your inbox. Your Rap Challenge entry has{" "}
            <strong>started</strong> — but it&rsquo;s not complete until you finish the four
            steps below.
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.55, maxWidth: "640px", margin: "12px auto 0" }}>
            <strong>You have 14 calendar days from your purchase to complete all four steps</strong> or your
            entry is forfeited.
          </p>
        </header>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "780px",
            margin: "0 auto",
          }}
        >
          {STEPS.map((step) => (
            <article
              key={step.n}
              style={{
                border: "1px solid var(--rule, #2a2a30)",
                borderRadius: "16px",
                padding: "24px 28px",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FF6A1A", letterSpacing: "0.08em" }}>
                  STEP {step.n}
                </span>
                <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>{step.h}</h2>
              </div>
              <p style={{ fontSize: "1rem", lineHeight: 1.55, marginBottom: "12px" }}>{step.body}</p>
              <p style={{ fontSize: "0.92rem", fontWeight: 600, marginBottom: "8px" }}>{step.cta}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px" }}>
                {step.actions.map((action) => (
                  <li key={action.label} style={{ marginBottom: "6px" }}>
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#FF6A1A",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                      }}
                    >
                      → {action.label}
                    </a>
                  </li>
                ))}
              </ul>
              {step.note && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted, #888)",
                    fontStyle: "italic",
                    marginTop: "8px",
                    paddingTop: "8px",
                    borderTop: "1px dashed var(--rule, #2a2a30)",
                  }}
                >
                  💡 {step.note}
                </p>
              )}
            </article>
          ))}
        </section>

        <section
          style={{
            maxWidth: "780px",
            margin: "32px auto 0",
            padding: "24px 28px",
            border: "1.5px solid rgba(255, 106, 26, 0.5)",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(255, 106, 26, 0.08), rgba(200, 38, 44, 0.04))",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 8px" }}>
            🎫 Want free entry to every round?
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.55, margin: "0 0 12px" }}>
            <strong>Sneakz Pass</strong> ($12/mo) members get free entry to every
            future Rap Challenge — entry fee waived + written feedback from PHRHX after results +
            finalist shoutout if you make the cut. Plus 2 bonus episodes/month, members-only
            Discord, monthly free exclusive beat, and 10% off every drop forever.
          </p>
          <Link
            href="/sneakz-pass"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#FF6A1A",
              color: "#fff",
              fontWeight: 700,
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            See Sneakz Pass →
          </Link>
        </section>

        <section style={{ maxWidth: "780px", margin: "32px auto 0", textAlign: "center" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" }}>
            Questions?
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--muted, #888)" }}>
            Read the{" "}
            <Link href="/rap-challenge/rules" style={{ color: "#FF6A1A", textDecoration: "underline" }}>
              Official Rules
            </Link>
            {" "}or email{" "}
            <a href="mailto:rap-challenge@sneakzandbeatz.com" style={{ color: "#FF6A1A", textDecoration: "underline" }}>
              rap-challenge@sneakzandbeatz.com
            </a>
            . Reply within 5 business days.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
