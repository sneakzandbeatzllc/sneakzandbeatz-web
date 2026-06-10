import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorsApplyForm from "@/components/CreatorsApplyForm";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "S&B Girls Program — Sneakz & Beatz",
  description:
    "S&B Girls is the contracted ambassador program for the Sneakz & Beatz brand. Body-confident lifestyle content in S&B merch + matching Jordan retros. $500–$1K per month, 90 or 180-day contract term, 18+ only.",
  alternates: { canonical: "/creators" },
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
              <strong>Monthly content quota — Reels-heavy:</strong>
              <ul style={{ marginTop: 8 }}>
                <li>Tier 1 ($500): <strong>4 Reels + 4 photo posts</strong> on your grid + 16 stories + <strong>2 raw Reels</strong> + 10-photo pack to S&B</li>
                <li>Tier 2 ($750): <strong>6 Reels + 6 photo posts</strong> on your grid + 16 stories + <strong>4 raw Reels</strong> + 15-photo pack to S&B</li>
                <li>Tier 3 ($1,000): <strong>10 Reels + 6 photo posts</strong> on your grid + 16 stories + <strong>6 raw Reels</strong> + 20-photo pack + featured-creator placement on @sneakzandbeatz</li>
              </ul>
              All content features S&B merch + your Jordan retros. Reels are
              prioritized because they out-reach static posts ~2-3x on IG and
              TikTok algorithms. 4 posts + 4 stories per week is the rhythm.
            </li>
            <li>
              <strong>Content license to S&B:</strong> by signing the contract
              you grant S&B a paid, royalty-free, worldwide, non-exclusive
              license to use every piece of content produced under this program
              — your raw deliverables AND the posts you publish to your own grid
              — across all S&B owned channels and paid placements. That means:
              <ul style={{ marginTop: 8 }}>
                <li><strong>S&B social channels:</strong> Instagram, TikTok, X, YouTube, Threads, Facebook, Discord (current and future)</li>
                <li><strong>S&B properties:</strong> sneakzandbeatz.com, /sb link-in-bio, email newsletter, Substack</li>
                <li><strong>Paid advertising:</strong> Meta Ads, TikTok Ads, Google, retargeting</li>
                <li><strong>Print + retail:</strong> packaging, lookbook, in-store displays once we launch retail</li>
              </ul>
              S&B can crop, color-grade, add overlays, splice into compilations,
              and translate. License runs through the contract term plus a{" "}
              <strong>12-month tail period</strong> after termination so we can
              keep using campaigns we already published. After that period, all
              archive content comes down at your written request within 30 days.
              Full license terms are spelled out in the signed contract.
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
            <strong>90 or 180-day contract term</strong> (3 or 6 months).{" "}
            <strong>Reels-heavy</strong> by design — Reels carry the most reach
            on IG and TikTok right now, so every tier is weighted toward video.
            Modeled on Fashion Nova&rsquo;s early ambassador playbook: modest
            retainer, free product, predictable monthly content rhythm, real
            ambassador status.
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
                  <span><strong>4 Reels</strong> on your own grid</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>4 photo posts on your own grid</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>16 stories/month (4/week) wearing S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span><strong>2 raw Reels</strong> delivered to S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>1 raw photo pack to S&B (10 photos)</span>
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
                  <span><strong>6 Reels</strong> on your own grid</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>6 photo posts on your own grid</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>16 stories/month (4/week) wearing S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span><strong>4 raw Reels</strong> delivered to S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>1 raw photo pack to S&B (15 photos)</span>
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
                  <span><strong>10 Reels</strong> on your own grid</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>6 photo posts on your own grid</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>16 stories/month (4/week) wearing S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span><strong>6 raw Reels</strong> delivered to S&B</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>1 raw photo pack to S&B (20 photos)</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Free S&B merch shipment + you keep it</span>
                  <strong>included</strong>
                </li>
                <li>
                  <span>Featured-creator placement on @sneakzandbeatz channels</span>
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
              <strong>18 or older.</strong> Verified through{" "}
              <strong>Stripe Identity</strong> (gov ID + selfie) before any
              contract is sent. Stripe holds the documents on their secure
              infrastructure — S&B never sees or stores your ID. We only
              receive a &ldquo;verified yes&rdquo; confirmation and your DOB
              for 18+ proof. No exceptions.
            </li>
            <li>
              <strong>Independent contractor</strong> relationship — not
              employment.
            </li>
            <li>
              <strong>Content license to S&B (broad, but bounded):</strong>{" "}
              creator retains underlying ownership of her likeness and
              copyrights. By signing, creator grants S&B a paid, royalty-free,
              worldwide, non-exclusive license to use ALL content produced
              under the contract (raw deliverables + posts on creator&rsquo;s
              own grid) on all S&B owned channels (IG, TikTok, X, YouTube,
              Threads, Discord, sneakzandbeatz.com, /sb link-in-bio, email,
              Substack, packaging, retail displays) and in paid advertising
              (Meta, TikTok, Google, retargeting). License term: contract term
              plus a 12-month tail. S&B may crop, edit, color-grade, splice,
              and translate; S&B may NOT sublicense to third parties without
              creator&rsquo;s written consent, and may NOT use creator&rsquo;s
              likeness in defamatory, NSFW, or political contexts.
            </li>
            <li>
              <strong>Takedown rights:</strong> after the 12-month tail, all
              archive content comes down at creator&rsquo;s written request
              within 30 days. During the active contract + tail, creator may
              request takedown of any specific piece for a compelling personal
              reason and S&B will comply within 14 days.
            </li>
            <li>
              <strong>Creator credit:</strong> S&B will tag{" "}
              <strong>@her_handle</strong> on every grid repost. Behind-the-
              scenes / paid-ad usage doesn&rsquo;t require a tag.
            </li>
            <li>
              <strong>Creator reps & warranties:</strong> creator confirms she
              is 18+, all content is original to her, no third-party rights are
              infringed (no copyrighted music, no other people in frame
              without release, no trademarked logos other than S&B and Jordan),
              and she has the legal right to grant the license above.
            </li>
            <li>
              <strong>S&B reps & warranties:</strong> pay on time on the 1st of
              each month, won&rsquo;t use content outside the licensed channels
              and contexts, won&rsquo;t alter content in ways that
              misrepresent creator.
            </li>
            <li>
              <strong>Mutual indemnification:</strong> each side covers the
              other for losses caused by their own breach of these reps.
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
              resolved in San Diego County.
            </li>
          </ul>
        </section>

        {/* ONBOARDING FLOW */}
        <section className="container creators-block">
          <h2 className="creators-h2">How Onboarding Works</h2>
          <p className="creators-helper">
            We never ask you to email us a copy of your ID or your bank info.
            Sensitive data goes through regulated, third-party platforms —
            you keep control, we get verification.
          </p>
          <ol className="creators-bullets" style={{ paddingLeft: 0, listStyle: "none" }}>
            <li>
              <strong>1. Apply.</strong> Fill the form below — IG/TikTok handles,
              follower screenshots, your Jordan retro collection, the pillar
              ranges you can flex.
            </li>
            <li>
              <strong>2. Manual review (1–5 business days).</strong> If your fit
              lands, we send the next step. If not, we save your file and tap
              in if a future brief matches.
            </li>
            <li>
              <strong>3. Stripe Identity verification.</strong> You get a secure
              link from Stripe — upload a gov ID + take a quick selfie. Stripe
              holds the documents, S&B never sees them. Stripe returns
              &ldquo;verified yes&rdquo; + DOB confirmation. This is how we
              prove 18+ without you sharing your ID with us.
            </li>
            <li>
              <strong>4. SignNow contract delivery.</strong> Once Stripe confirms
              verification, the S&B Girls contract is auto-sent through SignNow.
              Read it, share it with your own lawyer if you want, sign
              electronically. Both sides get a stamped PDF.
            </li>
            <li>
              <strong>5. Stripe Connect onboarding.</strong> You enter bank /
              debit card directly with Stripe — they hold the banking info,
              S&B never sees it. Stripe pays you on the 1st of each month
              automatically.
            </li>
            <li>
              <strong>6. Merch ships, retainer starts.</strong> First merch
              shipment goes out the day after Stripe Connect is active. Month
              1 retainer pays out the next 1st of the month. Welcome to S&B
              Girls.
            </li>
          </ol>
          <p className="creators-helper" style={{ marginTop: 16, fontSize: 13 }}>
            <em>Total stack we use: Stripe Identity (ID verification, $1.50 per
            check, paid by S&B), SignNow (contract signing), Stripe Connect
            (payouts). All three are SOC 2 compliant. None require S&B to
            store your sensitive data.</em>
          </p>
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
