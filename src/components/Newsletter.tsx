"use client";

import { useState } from "react";
import { subscribeToSubstack } from "@/lib/substack";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribeToSubstack(email);
      setStatus("ok");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("err");
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-row">
        <div>
          <span className="platform-tag">Substack · Free + Paid Tiers</span>
          <h2>Stay Locked In.</h2>
          <p>
            The latest drops, beats, and culture delivered straight to your inbox.
            Free for everyone. Paid tier unlocks early access to drops, beat-pack
            discounts, and the PHRHX Show ad-free.
          </p>
        </div>
        <div>
          <form className="subscribe-form" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Joining…" : "Join The List"}
            </button>
          </form>
          {status === "ok" && (
            <p style={{ color: "var(--accent)", fontSize: 13, marginTop: 8 }}>
              Locked in. Check your inbox to confirm.
            </p>
          )}
          {status === "err" && (
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>
              Something went wrong — try again in a sec.
            </p>
          )}
          <div className="value-props">
            <div className="value-prop">
              <span className="check">✓</span> Exclusive content + early drops
            </div>
            <div className="value-prop">
              <span className="check">✓</span> Beat-pack discounts you can&apos;t get anywhere else
            </div>
            <div className="value-prop">
              <span className="check">✓</span> No spam. Just culture.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
