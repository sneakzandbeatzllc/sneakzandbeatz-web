import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Official Rules — $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Official rules for the Sneakz & Beatz $10K Rap Challenge: eligibility, entry methods (paid + free AMOE), judging, prize fulfillment, state restrictions, and sponsor information.",
  alternates: { canonical: "/rap-challenge/rules" },
};

const SECTIONS = [
  { id: "sponsor", h: "1. Sponsor" },
  { id: "eligibility", h: "2. Eligibility" },
  { id: "entry-period", h: "3. Entry Period" },
  { id: "how-to-enter", h: "4. How to Enter" },
  { id: "amoe", h: "5. Free Entry (AMOE)" },
  { id: "submission-rules", h: "6. Submission Requirements" },
  { id: "judging", h: "7. Judging" },
  { id: "winner-selection", h: "8. Winner Selection & Notification" },
  { id: "prizes", h: "9. Prizes" },
  { id: "prize-fulfillment", h: "10. Prize Fulfillment" },
  { id: "rights", h: "11. Rights & Releases" },
  { id: "general", h: "12. General Conditions" },
  { id: "privacy", h: "13. Privacy" },
  { id: "winners-list", h: "14. Winners List" },
  { id: "contact", h: "15. Contact" },
];

export default function RapChallengeRulesPage() {
  return (
    <>
      <Header />

      <main className="rules-page">
        <section className="container rules-hero">
          <Link href="/rap-challenge" className="rules-back">
            ← Back to Rap Challenge
          </Link>
          <h1 className="rules-h1">Official Rules — $10,000 Rap Challenge</h1>
          <p className="rules-meta">
            Last updated: <strong>May 7, 2026</strong> · This is a SKILL-BASED CONTEST
            determined primarily by judging on craft. The community-vote and public-vote
            components reflect audience preference among finalists already pre-selected on
            skill. NO PURCHASE NECESSARY TO ENTER OR WIN. A purchase will not increase your
            chances of winning. Void where prohibited.
          </p>

          <nav className="rules-toc">
            <span className="rules-toc-label">On this page</span>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={"#" + s.id}>{s.h}</a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <article className="container rules-body">
          <section id="sponsor">
            <h2>1. Sponsor</h2>
            <p>
              The &ldquo;$10K Rap Challenge&rdquo; (&ldquo;Promotion&rdquo;) is sponsored by{" "}
              <strong>Sneakz &amp; Beatz LLC</strong> (&ldquo;Sponsor&rdquo;), a California
              limited liability company. Mailing address:
              7465 Mission Gorge Road, Suite 142, San Diego, CA 92120.
            </p>
          </section>

          <section id="eligibility">
            <h2>2. Eligibility</h2>
            <p>
              Open to legal residents of the fifty (50) United States and the District of
              Columbia who are at least eighteen (18) years of age (or the age of majority in
              their state of residence, whichever is older) at the time of entry.
            </p>
            <p>
              Employees, officers, directors, and contractors of Sponsor and its parent
              companies, affiliates, subsidiaries, and immediate family members (spouse,
              parents, siblings, children) and household members of each are NOT eligible.
            </p>
            <p>
              <strong>Excluded jurisdictions:</strong> Void in Puerto Rico, the U.S. Virgin
              Islands, and any other U.S. territory or foreign jurisdiction. The Promotion
              specifically excludes residents of <strong>New York, Florida, and Rhode
              Island</strong> from any prize tier with a perceived retail value greater than
              $5,000 unless and until Sponsor has registered the Promotion and posted bond as
              required by those states&rsquo; sweepstakes laws.
            </p>
            <p>
              Subject to all applicable federal, state, and local laws and regulations. Void
              where prohibited.
            </p>
          </section>

          <section id="entry-period">
            <h2>3. Entry Period</h2>
            <p>
              The Promotion will run only after the Sponsor confirms a minimum of two
              hundred fifty (250) verified signups on the official Rap Challenge waitlist
              at sneakzandbeatz.com/rap-challenge (the &ldquo;Audience Threshold&rdquo;).
              Once the Audience Threshold is met, Sponsor will publicly announce the start
              and end dates of the Submission Period by email to all waitlist members and on
              sneakzandbeatz.com at least seven (7) calendar days before submissions open.
            </p>
            <p>
              The Submission Period will be no fewer than thirty (30) calendar days. If the
              Audience Threshold is not met within eighteen (18) months of these Official
              Rules being posted, Sponsor will, at Sponsor&rsquo;s sole discretion, either
              (a) extend the announcement period, or (b) cancel the Promotion. Beat bundles
              purchased separately are standalone products and are NOT refundable as a
              consequence of any cancellation of the Promotion.
            </p>
          </section>

          <section id="how-to-enter">
            <h2>4. How to Enter</h2>
            <p>
              <strong>The Sneakz &amp; Beatz Bundle and the Rap Challenge are two separate
              things.</strong> The bundle is a standalone product. Buying the bundle does
              NOT automatically enter you in the Promotion. At checkout, an explicit
              opt-in checkbox asks if you wish to also enter the Promotion. The opt-in is
              optional and unchecked by default.
            </p>
            <p>
              All entrants, regardless of entry method, must:
            </p>
            <ul>
              <li>Be following @sneakz_beatz on Instagram</li>
              <li>Be following @SneakzandBeatzOfficial on TikTok</li>
              <li>Be following @sneakzandbeatz on X (Twitter)</li>
              <li>Be subscribed to @sneakzandbeatz on YouTube</li>
              <li>Be a verified member of the Sneakz &amp; Beatz Discord server</li>
              <li>Submit a recording meeting the Submission Requirements (Section 6)</li>
              <li>Provide their Discord username on the entry form for cross-verification</li>
            </ul>
            <p>
              There are three (3) methods of entry. Each method counts as one (1) entry per
              eligible Submission. No entry method affects judging, scoring, or odds of
              winning in any way:
            </p>
            <p>
              <strong>(a) Bundle entry — opt-in at checkout:</strong> Purchase any tier of
              the Sneakz &amp; Beatz Bundle (Standard Vault $79, Producer Pack $149, or
              Industry Pack $399) and check the box at checkout reading &ldquo;Enter the
              $10K Rap Challenge.&rdquo; The bundle includes 100 mastered beats, drum kit,
              and sample pack. Buying the bundle without
              checking the box gives you the bundle product only — no contest entry.
              Entry is initiated at the moment of bundle purchase + checkbox tick, but
              entry is NOT COMPLETE until all four (4) post-purchase steps are completed
              within fourteen (14) calendar days of purchase: (1) follow all required
              social accounts; (2) join the Sneakz &amp; Beatz Discord; (3) submit the
              video meeting the Submission Requirements; (4) acknowledge these Official
              Rules via the entry-completion form. Failure to complete all four steps
              within the deadline forfeits the Promotion entry. The bundle product follows the standard 30-day
              satisfaction guarantee; accepting a bundle refund voids any Promotion entry
              initiated with that purchase.
            </p>
            <p>
              <strong>(b) Standalone paid entry — $25:</strong> Pay the twenty-five dollar
              ($25.00) standalone entry fee via the entry form at
              sneakzandbeatz.com/rap-challenge/submit and complete all entry requirements
              (social follows, Discord membership, Submission, and acknowledgment of these
              Official Rules) within fourteen (14) calendar days of payment. The entry fee
              is refundable in full if the Promotion is cancelled or rescheduled, and is
              non-refundable once the entrant&rsquo;s Submission has been judged.
            </p>
            <p>
              <strong>(c) Free entry — see Section 5 (AMOE).</strong>
            </p>
            <p>
              An entrant may submit multiple entries. Each entry must be a different
              recording and must independently satisfy one of the entry methods above
              (one bundle purchase supports one entry; each additional entry requires its
              own $25 standalone fee or AMOE entry). Identical or substantially similar recordings submitted multiple times
              will be treated as a single entry. All entries must verify the social-follow
              and Discord membership requirements above. Bundle entries are limited to one
              (1) per bundle purchase.
            </p>
          </section>

          <section id="amoe">
            <h2>5. Free Entry — Alternative Method of Entry (AMOE)</h2>
            <p>
              <strong>NO PURCHASE NECESSARY.</strong> To enter without payment or purchase, mail
              a 3&Prime;&times;5&Prime; index card with your full legal name, date of birth,
              email address, mailing address, and a working URL link to a recording satisfying
              the Submission Requirements (Section 6) to:
            </p>
            <p style={{ paddingLeft: 24, fontFamily: "monospace" }}>
              Sneakz & Beatz Rap Challenge — Free Entry<br />
              7465 Mission Gorge Road, Suite 142<br />
              San Diego, CA 92120
            </p>
            <p>
              Mailed entries must be postmarked during the Submission Period and received
              within seven (7) calendar days of the close of the Submission Period. Limit one
              (1) AMOE entry per envelope. Mechanically reproduced entries are void. Sponsor is
              not responsible for lost, late, illegible, misdirected, postage-due, or
              undelivered mail. AMOE entries have an equal probability of winning as paid or
              bundle entries.
            </p>
          </section>

          <section id="submission-rules">
            <h2>6. Submission Requirements</h2>
            <p>Each submission (the &ldquo;Submission&rdquo;) must:</p>
            <ul>
              <li>
                Use a beat from the Sneakz & Beatz catalog (sneakzandbeatz.com/beats) or a beat
                included in the Standard Bundle. No other beats permitted.
              </li>
              <li>
                Be a vocal recording — verse, hook, or full song — performed by the entrant.
                Length: minimum 60 seconds, maximum 4 minutes.
              </li>
              <li>
                Be uploaded to a publicly accessible platform (SoundCloud, YouTube, Audiomack,
                Instagram Reel, or TikTok) and tagged <strong>@sneakz_beatz</strong> with
                hashtag <strong>#SBRapChallenge</strong>.
              </li>
              <li>
                Be the entrant&rsquo;s original work. No samples not pre-cleared by entrant. No
                AI-generated vocals. No vocals performed by anyone other than the entrant.
              </li>
              <li>
                Not contain content that is unlawful, defamatory, obscene, infringing on third
                party rights, or in violation of the platform&rsquo;s terms of service.
              </li>
              <li>
                Not be removed, made private, or deleted prior to the announcement of winners.
              </li>
            </ul>
            <p>
              Sponsor reserves the right to disqualify any Submission that, in
              Sponsor&rsquo;s sole discretion, fails to meet these requirements.
            </p>
          </section>

          <section id="judging">
            <h2>7. Judging</h2>
            <p>
              All eligible Submissions will be reviewed by the judges panel — Sponsor (PHRHX)
              plus at least two (2) independent guest judges per round (names announced no
              fewer than fourteen (14) calendar days before voting opens). The top twenty-five
              (25) Submissions will advance to the community-vote and public-vote rounds.
            </p>
            <p>
              <strong>Final scoring weights — three tiers:</strong>
            </p>
            <ul>
              <li><strong>Judges&rsquo; panel score: 50%</strong></li>
              <li><strong>Discord community vote: 30%</strong> (members-only — see integrity rules)</li>
              <li><strong>Public YouTube vote: 20%</strong> (single platform — see procedure)</li>
            </ul>
            <p>
              <strong>Judges&rsquo; panel criteria (50% weight):</strong> lyricism (10 points),
              flow &amp; delivery (10 points), originality (10 points), beat selection &amp;
              use (10 points), production quality (10 points). Each finalist receives a
              numerical score from each judge from 0–50. The panel score is the average of
              all judges&rsquo; scores.
            </p>
            <p>
              <strong>Discord community vote (30% weight) — integrity rules:</strong> The
              Discord vote is conducted in the official Sneakz &amp; Beatz Discord server
              (link at sneakzandbeatz.com/community).
            </p>
            <ul>
              <li>
                <strong>One vote per Discord member.</strong> Each member may cast a single
                reaction-vote across all twenty-five (25) finalists during the seven (7) day
                voting window.
              </li>
              <li>
                <strong>No self-voting.</strong> A member&rsquo;s vote will be automatically
                rejected if their verified Discord username matches the submission Discord
                username of the finalist they voted for. The voting bot enforces this match
                check at vote-cast time. Repeated self-vote attempts may result in
                disqualification of the submitter&rsquo;s entry at Sponsor&rsquo;s sole
                discretion.
              </li>
              <li>
                <strong>Membership cutoff.</strong> Only Discord members who joined the server
                at least seven (7) calendar days before the voting window opens are eligible
                to vote. Accounts created or joined after the cutoff are excluded by the
                voting bot.
              </li>
              <li>
                <strong>One Discord account per voter.</strong> Use of multiple Discord
                accounts to cast multiple votes is prohibited and may result in
                disqualification of the offending account&rsquo;s submission(s).
              </li>
              <li>
                <strong>Public tally.</strong> Sponsor will publish the full per-finalist
                Discord vote count after the voting window closes for transparency.
              </li>
            </ul>
            <p>
              <strong>Public YouTube vote (20% weight) — single platform, like-count
              method:</strong>
            </p>
            <ul>
              <li>
                All twenty-five (25) finalist videos are uploaded by Sponsor to the official
                Sneakz &amp; Beatz Rap Challenge YouTube playlist within 72 hours of the
                voting window opening.
              </li>
              <li>
                Public votes are measured as <strong>like count</strong> on each finalist
                video over the seven (7) day voting window. Likes count, dislikes do not
                subtract.
              </li>
              <li>
                Each finalist&rsquo;s public-vote score is the percentage of total combined
                likes their video received. (E.g., if a finalist&rsquo;s video has 200 likes
                and the playlist total is 1,000 likes, that finalist&rsquo;s public-vote
                score is 20%.)
              </li>
              <li>
                Sponsor reserves the right to invalidate suspicious like-count spikes
                consistent with bot activity. Invalidated likes will be subtracted from the
                final tally and a public note will be issued.
              </li>
              <li>
                Cross-platform shares (TikTok, Instagram, X) are encouraged but do NOT count
                toward the public-vote score. Only YouTube playlist likes count.
              </li>
            </ul>
            <p>
              <strong>Final winner determination.</strong> The final score for each finalist
              is calculated as: (Panel Score / 50) × 50% + (Discord vote share) × 30% +
              (YouTube vote share) × 20%. The finalist with the highest final score is the
              1st place winner; second-highest is 2nd place; third-highest is 3rd place.
            </p>
            <p>
              In the event of a tie, the entrant with the higher panel-only score will
              prevail. If still tied, Sponsor will conduct a single-question tie-breaker
              decided by Sponsor in good faith. All judging decisions are final and binding.
            </p>
          </section>

          <section id="winner-selection">
            <h2>8. Winner Selection & Notification</h2>
            <p>
              Potential winners will be notified by the email address on file within five (5)
              business days of the close of the public-vote round. Each potential winner must
              respond and complete an Affidavit of Eligibility, Liability/Publicity Release,
              and (if required) IRS Form W-9 within seven (7) calendar days of notification, or
              the prize may be forfeited and an alternate winner selected.
            </p>
            <p>
              If a potential winner is unreachable, ineligible, declines the prize, or fails to
              return the required documents, the prize will be forfeited and Sponsor may, at
              Sponsor&rsquo;s sole discretion, select an alternate winner from the next-highest
              scoring Submissions.
            </p>
          </section>

          <section id="prizes">
            <h2>9. Prizes</h2>
            <p>
              Prizes are awarded as a combination of cash, physical product, gift cards,
              digital download licenses, paid advertising co-promotion, and merchandise.
              Approximate Retail Value (&ldquo;ARV&rdquo;) by tier:
            </p>
            <ul>
              <li>
                <strong>1st Place ($10,000+ ARV) — 1 winner:</strong> $2,500 cash (Cash App,
                Zelle, or check — winner&rsquo;s choice); Sony PS5 Pro + 2 AAA games; $500
                StockX gift card; custom 1-of-1 painted sneaker; anime exclusive box; 1 free
                exclusive beat per month for the remainder of calendar year 2026; 10 vocal
                kits + 5 drum kits + 5 melody loop packs (Logic / Pro Tools / FL / Ableton);
                PHRHX 1-of-1 custom beat; $500 paid Instagram ad-spend co-promotion of
                winner&rsquo;s next release; Sneakz & Beatz merch (t-shirt + hoodie + hat); a
                full episode feature on The PHRHX Show; opener slot (track #1) on
                &ldquo;Sneakz & Beatz Cypher Vol. 1.&rdquo;
              </li>
              <li>
                <strong>2nd Place ($3,000+ ARV) — 1 winner:</strong> $500 cash; $250 StockX
                gift card; 5 vocal kits + 1 drum kit + sample pack; Sneakz & Beatz t-shirt +
                hat; cypher tape feature track (slots #5-10); behind-the-scenes mention on the
                PHRHX Show winner episode.
              </li>
              <li>
                <strong>3rd Place ($1,000+ ARV) — 1 winner:</strong> $200 cash; $100 StockX
                gift card; Standard Bundle (100 mastered beats + t-shirt); 2 vocal kits;
                cypher tape feature track (slots #15-25).
              </li>
              <li>
                <strong>Top 25 Finalists ($300+ ARV each) — 25 winners:</strong> producer
                credit on &ldquo;Sneakz & Beatz Cypher Vol. 1&rdquo; (released to all DSPs);
                30% of streaming royalties on the finalist&rsquo;s track on the cypher tape;
                Sneakz & Beatz t-shirt; Standard Bundle at 50% off ($39) if not already
                purchased; Sneakz & Beatz follow + 1 promo Reel mention.
              </li>
              <li>
                <strong>Total Prize Pool ARV:</strong> approximately $21,500 across all
                twenty-eight (28) prize winners, including approximately $14,000+ across the
                top three placements, of which approximately $3,200 is cash. The
                &ldquo;$10K&rdquo; in the Promotion name refers to the 1st-place package ARV
                of $10,000+.
              </li>
            </ul>
            <p>
              <strong>No cash substitution</strong> for non-cash prize components, except by
              Sponsor in the event a specific component becomes unavailable; in such a case
              Sponsor may substitute a component of equal or greater perceived retail value.
            </p>
            <p>
              <strong>Skill-based determination.</strong> Winners are selected primarily on
              the basis of skill — judging on lyricism, flow and delivery, originality, beat
              selection and use, and production quality (Section 7). The community-vote
              component (30%) reflects audience preference among the top 25 finalists already
              pre-selected on skill. This Promotion is not determined by chance and does not
              constitute a lottery under California Penal Code §319 or the laws of any other
              jurisdiction.
            </p>
            <p>
              Full prize component breakdown is published at sneakzandbeatz.com/rap-challenge.
            </p>
          </section>

          <section id="prize-fulfillment">
            <h2>10. Prize Fulfillment</h2>
            <p>
              <strong>W-9 required before any prize is delivered.</strong> Each winner of a
              prize tier with ARV at or above $600 USD must complete and return IRS Form W-9
              to Sponsor before any prize component (cash, physical, or digital) is delivered.
              Failure to return the W-9 within fourteen (14) calendar days of request will
              result in forfeiture of the prize and selection of an alternate winner.
            </p>
            <p>
              <strong>Cash prize delivery.</strong> The cash component of the 1st, 2nd, and
              3rd place prizes ($2,500 / $500 / $200 respectively) will be delivered via the
              winner&rsquo;s chosen method (Cash App, Zelle, or paper check) within fourteen
              (14) calendar days of W-9 receipt.
            </p>
            <p>
              <strong>Physical prizes</strong> (PS5 Pro, custom sneaker, anime exclusive box,
              merchandise) will be shipped within thirty (30) days of W-9 receipt to a U.S.
              address provided by the winner.
            </p>
            <p>
              <strong>Gift cards and digital prizes</strong> (StockX gift cards, beat catalog
              access, kit downloads, monthly exclusive beats) will be delivered electronically
              within seven (7) days of W-9 receipt. The 1st-place &ldquo;1 free exclusive beat
              per month&rdquo; component runs from the calendar month immediately following
              W-9 receipt through December 2026.
            </p>
            <p>
              <strong>Cypher tape royalty splits</strong> will be administered through a
              standard distribution agreement signed by the finalist, granting the finalist
              30% of net streaming royalties on the finalist&rsquo;s track and Sponsor 70%.
              Royalties are paid quarterly per the distributor&rsquo;s schedule.
            </p>
            <p>
              <strong>Paid co-promotion (1st place).</strong> The $500 Instagram ad-spend
              co-promo will be executed through Meta Ads Manager pointing to a release of the
              winner&rsquo;s choice (single, EP, music video, etc.). Ad creative is the
              winner&rsquo;s; Sponsor handles execution. Spend window: 30 days from launch.
            </p>
            <p>
              <strong>Tax obligations.</strong> All federal, state, and local taxes on prizes
              (cash and non-cash) are the sole responsibility of the winner. Winners receiving
              prizes with ARV ≥ $600 will receive an IRS Form 1099-MISC by January 31 of the
              year following award. Failure to return a completed W-9 will result in mandatory
              federal backup withholding at 24% applied to any cash component of the prize,
              which will be remitted to the IRS on the winner&rsquo;s behalf.
            </p>
          </section>

          <section id="rights">
            <h2>11. Rights & Releases</h2>
            <p>
              By submitting an entry, each entrant grants Sponsor a worldwide, royalty-free,
              non-exclusive license to use, reproduce, modify, distribute, and publicly perform
              the Submission in connection with administration and promotion of the Promotion
              and Sponsor&rsquo;s related media for a period of two (2) years from the close of
              the Submission Period. Entrant retains full ownership and copyright in the
              Submission.
            </p>
            <p>
              Top 25 finalists who appear on the &ldquo;Sneakz & Beatz Cypher Vol. 1&rdquo;
              distribution will sign a separate, customary distribution agreement granting
              Sponsor the right to distribute the specific track on streaming platforms in
              exchange for a 30% share of net streaming royalties on that track, payable
              quarterly.
            </p>
            <p>
              By accepting a prize, winners consent to use of their name, likeness, hometown,
              and Submission for promotional purposes by Sponsor without further compensation,
              except where prohibited by law.
            </p>
          </section>

          <section id="general">
            <h2>12. General Conditions</h2>
            <p>
              Sponsor reserves the right to modify, suspend, or terminate the Promotion if
              fraud, technical failure, or any other factor beyond Sponsor&rsquo;s reasonable
              control impairs the integrity of the Promotion. Any attempt to deliberately
              undermine the legitimate operation of the Promotion is a violation of criminal
              and civil law, and Sponsor reserves the right to seek damages from any such
              entrant to the fullest extent permitted by law.
            </p>
            <p>
              By participating, entrants agree to release and hold harmless Sponsor and its
              parent, affiliates, subsidiaries, and their respective officers, directors,
              employees, and agents from any liability for injury, loss, or damage arising out
              of participation in the Promotion or receipt or use of any prize.
            </p>
            <p>
              These Official Rules will be governed by, and interpreted in accordance with,
              the laws of the State of California, without regard to its conflict-of-laws
              provisions. Any disputes will be resolved exclusively in the state or federal
              binding arbitration in San Diego County, California, under the rules of the American Arbitration Association.
            </p>
          </section>

          <section id="privacy">
            <h2>13. Privacy</h2>
            <p>
              Personal information collected from entrants is subject to Sponsor&rsquo;s{" "}
              <Link href="/privacy">Privacy Policy</Link>. By entering, you consent to the
              collection and use of your information for the purpose of administering the
              Promotion and, if you opt in, for marketing communications from Sponsor.
            </p>
          </section>

          <section id="winners-list">
            <h2>14. Winners List</h2>
            <p>
              For a list of winners, send a self-addressed stamped envelope to the address in
              Section 5 marked &ldquo;Winners List&rdquo; within ninety (90) days of the close
              of the Submission Period. Winners list will also be posted at
              sneakzandbeatz.com/rap-challenge/winners.
            </p>
          </section>

          <section id="contact">
            <h2>15. Contact</h2>
            <p>
              Questions regarding these Official Rules may be sent to{" "}
              <a href={mailto(EMAILS.info, "Rap Challenge — Rules Question")}>
                {EMAILS.info}
              </a>
              .
            </p>
            <p style={{ marginTop: 24, color: "var(--text-soft)", fontSize: 13 }}>
              © {new Date().getFullYear()} Sneakz and Beatz LLC. All rights reserved.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
