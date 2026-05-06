import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorsApplyForm from "@/components/CreatorsApplyForm";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "S&B Girls Program — Sneakz & Beatz",
  description:
    "S&B Girls is the contracted ambassador program for the Sneakz & Beatz brand. Body-confident lifestyle content in S&B merch + matching Jordan retros. $500–$1K per month, 90 or 180-day contract term, 18+ only.",
};

export default function CreatorsPage() {
  return (
    <>
      <Header />

      <main className="creators-page">
        {/* HERO — re-confirm the opportunity */}
        <section className="creators-hero">
          <div className="container">
            <span className="creators-eyebrow">⚡ S&B Girls Program</span>
            <h1 className="creators-h1">
              Be an S&B Girl.
              <br />
              <span className="accent">Sign the contract. Wear the drop.</span>
            </h1>
            <p className="creators-lead">
              S&B Girls is the contracted ambassador program for the brand.
              Body-confident lifestyle content — fitted styling, mirror shots,
              the S&B merch, your matching Jordan retros. Monthly retainer,
              clear obligations, signed contract. <strong>18+ only.</strong>
            </p>
          </div>
        </section>

        {/* THE FIT */}
        <section className="container creators-block">
          <h2 className="creators-h2">The Fit</h2>
          <p className="creators-helper">Who this brief is for.</p>
          <ul className="creators-bullets">
            <li>
              <strong>18 or older.</strong> Verified at contract signing.
              Non-negotiable. No exceptions.
            </li>
            <li>Female-identifying creator</li>
            <li>
              <strong>5,000–10,000 followers</strong> on Instagram or TikTok —
              the band where engagement is highest before agencies start
              gatekeeping
            </li>
            <li>
              <strong>Engagement rate 3%+</strong> (we verify before booking)
            </li>
            <li>
              Confident on camera, fluent in body-confident lifestyle content
              — fitted styling, mirror shots, fitted sets / biker shorts /
              crop top looks
            </li>
            <li>US-based preferred, not required</li>
          </ul>
        </section>

        {/* THE LOOK — what S&B Girls shoot */}
        <section className="container creators-block">
          <h2 className="creators-h2">The Look</h2>
          <p className="creators-helper">
            This is the S&B Girls aesthetic. Read it carefully — if this isn&rsquo;t
            your lane, it&rsquo;s not your brief, no offense taken.
          </p>
          <ul className="creators-bullets">
            <li>
              <strong>Body-confident lifestyle content</strong> — fitted
              styling, the merch + the Js + the energy as the focal point.
              Editorial-leaning, on-brand.
            </li>
            <li>
              <strong>Mirror shots, bedroom-set shots, fitted full-length
              shots</strong> are part of the format. Plus outdoor / studio /
              clean wall for variety.
            </li>
            <li>
              <strong>S&B merch is the wardrobe.</strong> We ship the fit free,
              you keep it. Colorway is set per brief. (See &ldquo;What we ship&rdquo;
              below for the exact merch line.)
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
            <li>Vertical 9:16 native, natural light or clean studio.</li>
          </ul>
        </section>

        {/* THE MERCH — body-confident athleisure line we ship */}
        <section className="container creators-block">
          <h2 className="creators-h2">What We Ship</h2>
          <p className="creators-helper">
            The S&B merch line is built specifically for this content lane —
            fitted athleisure / streetwear that reads well on camera, holds
            shape, and pairs with Jordan retros. The merch line itself is the
            next phase of the business — these are the categories you&rsquo;ll
            be shooting in.
          </p>
          <ul className="creators-bullets">
            <li><strong>Biker shorts</strong> — high-rise, ribbed, multiple colorways. The S&B core.</li>
            <li><strong>Fitted matching sets</strong> — ribbed top + biker / cycling short, color-matched</li>
            <li><strong>Crop tops</strong> — baby tee, ribbed tank, racerback, cropped hoodie</li>
            <li><strong>Low-rise track pants + sweats</strong> — fitted, cuffed ankle</li>
            <li><strong>Athletic sets</strong> — sports bra + shorts, color-blocked to match Js</li>
            <li><strong>Tank tops</strong> — ribbed, cropped, fitted at waist</li>
            <li><strong>Headwear</strong> — low fitted cap, trucker, dad hat with S&B mark</li>
            <li><strong>Socks + slides</strong> — for off-foot Jordan shots</li>
          </ul>
          <p className="creators-helper" style={{ marginTop: 16, fontSize: 13 }}>
            <em>Merch ships pre-launch to S&B Girls only. The general public
            store goes live on the merch launch date — until then the program
            is the exclusive distribution channel.</em>
          </p>
        </section>

        {/* S&B GIRLS CONTRACT OBLIGATIONS */}
        <section className="container creators-block">
          <h2 className="creators-h2">The Contract</h2>
          <p className="creators-helper">
            S&B Girls is a monthly-retainer program with a written contract.
            Plain language, fair obligations, no fine-print games.
          </p>
          <ul className="creators-bullets">
            <li>
              <strong>Contract term: 90 or 180 days</strong> (3 or 6 months)
              for the starter program. We pick the term up front based on the
              brief — most launch contracts run 90 days; ambassador contracts
              are 180 days. Renewable in 90/180-day increments after the first
              term.
            </li>
            <li>
              <strong>Signed contract before first month&rsquo;s payout.</strong>{" "}
              S&B provides the template; you review with your own counsel if
              you want, sign electronically, then we ship the merch and start
              the retainer.
            </li>
            <li>
              <strong>Monthly retainer pay</strong> ($500/mo Tier 1, $750/mo
              Tier 2, or $1,000/mo Tier 3) sent on the 1st of each month via
              Stripe for the duration of the contract term. Direct deposit
              to your bank or your debit card.
            </li>
            <li>
              <strong>Monthly content quota:</strong>
              <ul style={{ marginTop: 8 }}>
                <li>Tier 1 ($500): <strong>8 grid posts</strong> on your own + <strong>16 stories</strong> + <strong>1 photo pack</strong> (15 photos) to S&B</li>
                <li>Tier 2 ($750): <strong>12 grid posts</strong> + <strong>16 stories</strong> + <strong>1 photo pack</strong> (20 photos) + <strong>2 raw reels</strong> to S&B</li>
                <li>Tier 3 ($1,000): <strong>16 grid posts</strong> (4+ reels) + <strong>16 stories</strong> + <strong>2 photo packs</strong> (15 photos each) + <strong>3 raw reels</strong> + repost rights on @sneakzandbeatz</li>
              </ul>
              All content features S&B merch + your Jordan retros. Modeled on
              the Fashion Nova ambassador rhythm — 4 posts and 4 stories per
              week is the baseline.
            </li>
            <li>
              <strong>Tag + disclosure</strong> on every grid post:{" "}
              <strong>@sneakzandbeatz</strong>, <strong>#ad #SBGirls</strong>{" "}
              (FTC compliance is non-negotiable).
            </li>
            <li>
              <strong>Quota check is end-of-month.</strong> If you hit quota,
              next month&rsquo;s retainer ships on the 1st. If you miss, the
              retainer pauses until the makeup posts go up — we don&rsquo;t
              dock you, we just pause.
            </li>
            <li>
              <strong>Exclusivity window:</strong> while on retainer, no
              competing body-confident lifestyle content for direct streetwear /
              sneaker / athleisure brands (Fashion Nova, Skims, Lounge, etc.)
              without S&B&rsquo;s written sign-off.
            </li>
            <li>
              <strong>Bonus paid shoots</strong> available on top of the
              retainer when S&B briefs special campaigns (lookbook, launch,
              campaign hero) — paid separately, $250–$500 per shoot.
            </li>
            <li>
              <strong>Either side can terminate</strong> with 14 days written
              notice. Final retainer paid pro-rated through termination date.
            </li>
            <li>
              <strong>Independent contractor relationship</strong> — not
              employment. You handle your own taxes; we&rsquo;ll send a 1099
              if total annual pay clears the IRS threshold.
            </li>
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
            Three tiers — <strong>$500, $750, $1,000 per month</strong> — on a{" "}
            <strong>90 or 180-day contract term</strong> (3 or 6 months). Built
            on the Fashion Nova ambassador model — modest retainer, free
            product, predictable monthly content rhythm. Each piece pays out
            at roughly $20 — right at the entry-level UGC rate band — and the
            free merch + Jordan-matched fits + ambassador status makes the
            full package worth the time.
          </p>

          <div className="creators-rates-grid">
            <article className="creators-tier">
              <header className="creators-tier-head">
                <span className="creators-tier-num">Tier 1</span>
                <span className="creators-tier-label">Starter · 5K–7K followers</span>
              </header>
              <ul className="creators-tier-rates">
                <li>
                  <span>Monthly retainer</span>
                  <strong>$500/mo</strong>
                </li>
                <li>
                  <span>8 grid posts on your own (mix photos + reels)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>1 raw photo pack to S&B (15 photos)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Stories: 4/week (16/month) wearing S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Free S&B merch shipment + you keep it</span>
                  <strong>included</strong>
                </li>
              </ul>
            </article>

            <article className="creators-tier">
              <header className="creators-tier-head">
                <span className="creators-tier-num">Tier 2</span>
                <span className="creators-tier-label">Builder · 6K–8K followers</span>
              </header>
              <ul className="creators-tier-rates">
                <li>
                  <span>Monthly retainer</span>
                  <strong>$750/mo</strong>
                </li>
                <li>
                  <span>12 grid posts on your own (mix photos + reels)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>1 raw photo pack to S&B (20 photos)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>2 raw reels to S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Stories: 4/week (16/month) wearing S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Free S&B merch shipment + you keep it</span>
                  <strong>included</strong>
                </li>
              </ul>
            </article>

            <article className="creators-tier creators-tier-top">
              <header className="creators-tier-head">
                <span className="creators-tier-num">Tier 3</span>
                <span className="creators-tier-label">Top of band · 8K–10K followers</span>
              </header>
              <ul className="creators-tier-rates">
                <li>
                  <span>Monthly retainer</span>
                  <strong>$1,000/mo</strong>
                </li>
                <li>
                  <span>16 grid posts on your own (4+ must be reels)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>2 raw photo packs to S&B (15 photos each = 30)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>3 raw reels to S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Stories: 4/week (16/month) wearing S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Free S&B merch shipment + you keep it</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Repost rights on @sneakzandbeatz across IG + TikTok</span>
                  <strong>included</strong>
                </li>
              </ul>
            </article>
          </div>
          <p className="creators-helper" style={{ marginTop: 16, fontSize: 13 }}>
            <em>Launch retainers, anchored to Fashion Nova&rsquo;s early
            ambassador model — modest cash + real product + ambassador status.
            Once the 5K–10K follower band proves out, the next band (10K–25K
            followers) opens at a higher rate card.</em>
          </p>

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
            <li>
              <strong>18 or older.</strong> ID verification required at
              contract signing. No exceptions.
            </li>
            <li>
              <strong>Independent contractor</strong> relationship — not
              employment.
            </li>
            <li>
              <strong>Likeness + usage rights:</strong> creator retains likeness
              rights. S&B receives the right to repost / reuse retainer content
              on @sneakzandbeatz channels and in paid ads while the contract
              is active and 12 months after.
            </li>
            <li>
              <strong>Wardrobe stays on-brand:</strong> no other branded apparel
              visible in frame except S&B and Jordans.
            </li>
            <li>
              <strong>Content lane:</strong> body-confident lifestyle aesthetic —
              fitted styling, body-forward posing, mirror shots, and
              bedroom-set / clean-interior backgrounds are all permitted and
              expected. <strong>No nudity, no nipple/genital exposure, no
              explicit sexual acts.</strong> S&B reviews every deliverable and
              reserves the right to request a free reshoot for content that
              crosses those specific lines.
            </li>
            <li>
              <strong>Revision rounds:</strong> 1 round included on raw bundles;
              additional rounds <strong>$75 each</strong>.
            </li>
            <li>
              <strong>Payment:</strong> monthly retainer paid on the 1st via
              Stripe. Bonus shoot bookings paid 50% on confirmation, 50% on
              approved delivery.
            </li>
            <li>
              <strong>Raw bundle delivery:</strong> within 14 days of merch
              shipment unless we agree otherwise in writing.
            </li>
            <li>
              <strong>Exclusivity:</strong> while on retainer, no competing
              body-confident lifestyle content for direct streetwear / sneaker /
              athleisure brands without S&B&rsquo;s written sign-off.
            </li>
            <li>
              <strong>Termination:</strong> either party may cancel with 14
              days written notice. Final retainer paid pro-rated.
            </li>
            <li>
              <strong>FTC compliance:</strong> <strong>#ad #SBGirls</strong>{" "}
              required on every grid post that features S&B merch.
            </li>
            <li>
              <strong>Governing law:</strong> State of California. Disputes
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
