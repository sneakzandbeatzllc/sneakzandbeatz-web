import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorsApplyForm from "@/components/CreatorsApplyForm";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "S&B UGC Creator Program — Sneakz & Beatz",
  description:
    "Get paid to wear the drop. Tiered rates ($200–$900) for IG/TikTok creators with 10K–50K followers. S&B merch + matching Jordans, athletic-lifestyle briefs, real money — not exposure.",
};

export default function CreatorsPage() {
  return (
    <>
      <Header />

      <main className="creators-page">
        {/* HERO — re-confirm the opportunity */}
        <section className="creators-hero">
          <div className="container">
            <span className="creators-eyebrow">⚡ S&B UGC Creator Program</span>
            <h1 className="creators-h1">
              Tiered pay. Clear briefs.
              <br />
              <span className="accent">Real rates that scale with you.</span>
            </h1>
            <p className="creators-lead">
              Read the fit, the look, the rate card. Pull up if it lands.
            </p>
          </div>
        </section>

        {/* THE FIT */}
        <section className="container creators-block">
          <h2 className="creators-h2">The Fit</h2>
          <p className="creators-helper">Who this brief is for.</p>
          <ul className="creators-bullets">
            <li>Female-identifying creator</li>
            <li>
              <strong>10,000–50,000 followers</strong> on Instagram or TikTok —
              sweet spot 15K–35K
            </li>
            <li>
              <strong>Engagement rate 3%+</strong> (we verify before booking)
            </li>
            <li>Confident on camera, fluent in athletic-lifestyle styling</li>
            <li>US-based preferred, not required</li>
          </ul>
        </section>

        {/* THE LOOK */}
        <section className="container creators-block">
          <h2 className="creators-h2">The Look</h2>
          <p className="creators-helper">
            This is S&B&rsquo;s signature — not a list of demands.
          </p>
          <ul className="creators-bullets">
            <li>Head-to-toe styled around the Js + the S&B fit</li>
            <li>
              <strong>S&B merch</strong> — we ship free. You keep what we send.
              Color of the merch is selected per brief.
            </li>
            <li>
              <strong>Your own Jordan Retros, 1 through 17.</strong> Non-negotiable
              — must be authentic Air Jordan Retro models 1-17. We do NOT ship
              Jordans, we don&rsquo;t reimburse for them. Bring what&rsquo;s in
              your collection.
            </li>
            <li>
              <strong>Colorway must match the merch.</strong> When we book you,
              we send the merch color first. You confirm a Jordan Retro 1-17
              colorway from your collection that pairs. See the
              <a href="#match"> match guide</a> below.
            </li>
            <li>
              Active-lifestyle wardrobe rotates per brief: biker shorts, track
              shorts, athletic sets, swim — chosen by the shoot brief, not
              freelanced
            </li>
            <li>Vertical 9:16 native, natural light or clean studio</li>
          </ul>
        </section>

        {/* MERCH × JORDAN COLOR MATCH GUIDE */}
        <section id="match" className="container creators-block">
          <h2 className="creators-h2">Merch × Jordan Color Match</h2>
          <p className="creators-helper">
            We tell you the merch colorway when we book. You tell us which
            Retro 1-17 in your collection lines up. Below is the guide we work
            from. If your collection isn&rsquo;t on this chart, we&rsquo;ll
            still figure it out — but the closer the match the faster the
            booking.
          </p>

          <div className="match-grid">
            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#000,#c8262c)" }} aria-hidden />
              <div className="match-meta">
                <h3>Black / Red merch</h3>
                <p>AJ1 Bred · AJ4 Bred · AJ6 Infrared · AJ11 Bred · AJ12 Flu Game · AJ13 Bred · AJ14 Last Shot · AJ15 Black/Red</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#fff,#000)" }} aria-hidden />
              <div className="match-meta">
                <h3>White / Black merch</h3>
                <p>AJ1 Shadow · AJ3 Black Cement · AJ4 White Cement · AJ5 Oreo · AJ11 Concord · AJ12 Playoffs · AJ13 He Got Game · AJ14 Oreo</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "#0a0a0a" }} aria-hidden />
              <div className="match-meta">
                <h3>All-black merch</h3>
                <p>AJ1 Black Toe · AJ4 Royalty · AJ5 Metallic Black · AJ11 72-10 · AJ13 Cap & Gown · AJ16 All-Star</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#fff,#fff)", border: "1px solid var(--line)" }} aria-hidden />
              <div className="match-meta">
                <h3>All-white merch</h3>
                <p>AJ1 Triple White · AJ4 Pure Money · AJ11 Platinum Tint · AJ12 Wings · AJ14 White Sport Royal · AJ17 White</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#1a3d8f,#fff)" }} aria-hidden />
              <div className="match-meta">
                <h3>Royal / Navy merch</h3>
                <p>AJ1 Royal · AJ4 Military Blue · AJ5 Stealth · AJ11 Midnight Navy · AJ12 French Blue · AJ13 French Blue · AJ14 Hyper Royal</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#3a7a3a,#fff)" }} aria-hidden />
              <div className="match-meta">
                <h3>Green / Olive merch</h3>
                <p>AJ1 Pine Green · AJ3 Pine Green · AJ4 Cool Grey/Olive · AJ5 Oregon Ducks · AJ11 Win Like &lsquo;96 (variants) · AJ13 Lucky Green</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#aaa,#444)" }} aria-hidden />
              <div className="match-meta">
                <h3>Grey / Cement merch</h3>
                <p>AJ3 Cool Grey · AJ4 Cool Grey · AJ5 Cool Grey · AJ11 Cool Grey · AJ12 Stealth · AJ13 Atmosphere Grey · AJ17 Trophy Room</p>
              </div>
            </article>

            <article className="match-row">
              <span className="match-swatch" style={{ background: "linear-gradient(90deg,#f5b8c1,#fff)" }} aria-hidden />
              <div className="match-meta">
                <h3>Pink / Cream merch</h3>
                <p>AJ1 Atmosphere Pink · AJ4 Pink Oreo · AJ5 Quai 54 (cream) · AJ12 Easter · AJ13 Wheat · AJ14 Light Bone</p>
              </div>
            </article>
          </div>

          <p className="creators-helper" style={{ marginTop: 24 }}>
            Have something off-list that you swear pairs?{" "}
            <strong>List it on the application.</strong> If it works, we book the brief around it.
          </p>
        </section>

        {/* RATE CARD */}
        <section className="container creators-block">
          <h2 className="creators-h2">The Rate Card</h2>
          <p className="creators-helper">
            Three tiers, scales with your audience. Add-ons listed below — fully
            transparent, no surprises.
          </p>

          <div className="creators-rates-grid">
            <article className="creators-tier">
              <header className="creators-tier-head">
                <span className="creators-tier-num">Tier 1</span>
                <span className="creators-tier-label">Starter · 10K–20K</span>
              </header>
              <ul className="creators-tier-rates">
                <li><span>Single video (15–45s)</span><strong>$200</strong></li>
                <li><span>Photo set (5 images)</span><strong>$125</strong></li>
                <li><span>Standard bundle (1 video + 5 photos)</span><strong>$275</strong></li>
                <li><span>Premium bundle (2 videos + 8 photos)</span><strong>$475</strong></li>
              </ul>
            </article>

            <article className="creators-tier creators-tier-mid">
              <header className="creators-tier-head">
                <span className="creators-tier-num">Tier 2</span>
                <span className="creators-tier-label">Established · 20K–35K</span>
              </header>
              <ul className="creators-tier-rates">
                <li><span>Single video</span><strong>$300</strong></li>
                <li><span>Photo set</span><strong>$175</strong></li>
                <li><span>Standard bundle</span><strong>$400</strong></li>
                <li><span>Premium bundle</span><strong>$675</strong></li>
              </ul>
            </article>

            <article className="creators-tier creators-tier-top">
              <header className="creators-tier-head">
                <span className="creators-tier-num">Tier 3</span>
                <span className="creators-tier-label">Top of band · 35K–50K</span>
              </header>
              <ul className="creators-tier-rates">
                <li><span>Single video</span><strong>$425</strong></li>
                <li><span>Photo set</span><strong>$225</strong></li>
                <li><span>Standard bundle</span><strong>$550</strong></li>
                <li><span>Premium bundle</span><strong>$900</strong></li>
              </ul>
            </article>
          </div>

          <div className="creators-addons">
            <h3 className="creators-addons-h">Add-ons</h3>
            <ul className="creators-bullets">
              <li><strong>Paid ad usage rights</strong> on S&B accounts, 90 days: <strong>+30% of base</strong></li>
              <li><strong>Whitelisting</strong> (S&B runs ads from creator&rsquo;s handle, 30 days): <strong>+30% of base</strong></li>
              <li><strong>Rush delivery</strong> (&lt;7 days): <strong>+25% of base</strong></li>
              <li><strong>Creator posts to her own grid</strong> in addition to delivering raw: <strong>+25% of base</strong></li>
              <li><strong>Bundle deal</strong>: 3+ shoots in 60 days = <strong>15% off total</strong></li>
            </ul>
          </div>
        </section>

        {/* TERMS & CONDUCT */}
        <section className="container creators-block">
          <h2 className="creators-h2">Terms &amp; Conduct</h2>
          <p className="creators-helper">Plain language. Audit-clean.</p>
          <ul className="creators-bullets creators-terms">
            <li>Independent contractor relationship — not employment.</li>
            <li>
              Creator retains likeness rights; S&B receives content usage rights
              as defined in the booking tier.
            </li>
            <li>
              Wardrobe stays on-brand: no other branded apparel visible in
              frame except S&B and Jordans.
            </li>
            <li>
              Content style is <strong>athletic / lifestyle / streetwear ONLY</strong>.
              No sexually suggestive posing, no lingerie, no nudity, no bedroom
              or bathroom settings. S&B reviews every deliverable and reserves
              the right to reject and request a free reshoot for any content
              that doesn&rsquo;t match brand guidelines.
            </li>
            <li>1 revision round included; additional rounds <strong>$75 each</strong>.</li>
            <li>
              Payment: <strong>50% on booking confirmation, 50% on final approved
              delivery</strong> via Stripe.
            </li>
            <li>
              Delivery deadline: <strong>14 days from product receipt</strong> unless
              rush selected.
            </li>
            <li>
              Exclusivity: creator agrees not to create paid content for direct
              sneaker or streetwear competitors within <strong>30 days of delivery</strong>.
            </li>
            <li>
              Either party may cancel before product ships, full refund.
            </li>
            <li>
              FTC compliance: creator must use <strong>#ad</strong> or{" "}
              <strong>#sponsored</strong> when posting S&B content on her own
              grid.
            </li>
            <li>
              Governing law: <strong>State of California</strong>. Disputes
              resolved in Los Angeles County.
            </li>
          </ul>
        </section>

        {/* APPLICATION FORM */}
        <section id="apply" className="container creators-block creators-form-block">
          <h2 className="creators-h2">Send The Application</h2>
          <p className="creators-helper">
            We respond to qualified applicants within 5 business days. If you
            don&rsquo;t hear back, you didn&rsquo;t make the band — we&rsquo;ll save the email
            anyway and tap in if a future brief fits.
          </p>
          <CreatorsApplyForm />
        </section>

        {/* FOOTER LINKS */}
        <section className="container creators-block creators-foot">
          <p>
            Questions before you apply?{" "}
            <a href={mailto(EMAILS.partnerships, "Creator Program — Question")}>
              {EMAILS.partnerships}
            </a>{" "}
            ·{" "}
            <Link href="/community">Join the Discord</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
