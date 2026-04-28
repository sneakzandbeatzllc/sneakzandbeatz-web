import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Official Rules — $10K Rap Challenge — Sneakz & Beatz",
  description:
    "Official rules for the Sneakz & Beatz $10K Rap Challenge: eligibility, entry methods (paid + free AMOE), judging, prize fulfillment, state restrictions, and sponsor information.",
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
            Last updated: <strong>April 28, 2026</strong> · NO PURCHASE NECESSARY TO ENTER OR WIN.
            A purchase will not increase your chances of winning. Void where prohibited.
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
              <strong>Sneakz and Beatz LLC</strong> (&ldquo;Sponsor&rdquo;), a California limited
              liability company operated by <strong>Black Royal Music Media LLC</strong>, with
              business mailing address [iPostal1 mailbox — 1234 Example St, Suite 100, Los
              Angeles, CA 90001 — confirm before publish]. EIN: 42-2192032.
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
              The Promotion will run only after the Sponsor confirms a minimum of 250 waitlist
              signups (the &ldquo;Funding Threshold&rdquo;). Once the Funding Threshold is met,
              Sponsor will publicly announce the start and end dates of the Submission Period
              by email to the waitlist and on sneakzandbeatz.com at least seven (7) days
              before submissions open.
            </p>
            <p>
              The Submission Period will be no fewer than thirty (30) calendar days. If the
              Funding Threshold is not met within twelve (12) months of the Promotion
              announcement, Sponsor will, at Sponsor&rsquo;s sole discretion, either (a) extend
              the announcement period or (b) cancel the Promotion and refund any paid entries.
              Beat bundles purchased separately are NOT refundable as they constitute a
              standalone product.
            </p>
          </section>

          <section id="how-to-enter">
            <h2>4. How to Enter</h2>
            <p>
              There are two methods of entry. Each method counts as one (1) entry per eligible
              submission.
            </p>
            <p>
              <strong>(a) Paid entry:</strong> Pay the $25 entry fee at sneakzandbeatz.com/rap-challenge/submit
              and submit a recording meeting the Submission Requirements (Section 6).
            </p>
            <p>
              <strong>(b) Bundle entry:</strong> Purchase the Sneakz & Beatz Standard Bundle
              ($79) and submit a recording meeting the Submission Requirements. The bundle
              purchase email is automatically added to the entry list. The Standard Bundle is a
              standalone product; the entry is provided as a no-additional-cost bonus.
            </p>
            <p>
              <strong>(c) Free entry — see Section 5 (AMOE).</strong>
            </p>
            <p>
              An entrant may submit multiple entries. Each entry must be a different recording
              and must independently satisfy one of the entry methods above. Identical or
              substantially similar recordings submitted multiple times will be treated as a
              single entry.
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
              [iPostal1 mailbox — confirm before publish]<br />
              Los Angeles, CA 90001
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
              All eligible Submissions will be reviewed by Sponsor and a panel of at least
              three (3) independent guest judges (names announced no fewer than fourteen (14)
              calendar days before voting opens). The top twenty-five (25) Submissions will
              advance to the public-vote round.
            </p>
            <p>
              <strong>Final scoring weights:</strong>
            </p>
            <ul>
              <li>Judges&rsquo; panel score: 70%</li>
              <li>Public vote (Instagram Reel + TikTok engagement, weighted): 30%</li>
            </ul>
            <p>
              <strong>Judging criteria:</strong> lyricism (30%), flow and delivery (25%),
              originality (20%), beat selection and use (15%), production quality (10%).
            </p>
            <p>
              In the event of a tie, the entrant with the higher panel-only score will prevail.
              If still tied, Sponsor will conduct a single-question tie-breaker decided by
              Sponsor in good faith. All judging decisions are final and binding.
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
              All prizes are awarded as physical product, gift cards, digital download licenses,
              or service credits. <strong>No cash equivalent or substitution permitted</strong>{" "}
              except by Sponsor in the event a specific prize component becomes unavailable; in
              such a case Sponsor may substitute a component of equal or greater perceived
              retail value.
            </p>
            <p>Approximate Retail Value (&ldquo;ARV&rdquo;) by tier:</p>
            <ul>
              <li><strong>1st Place:</strong> $10,000+ ARV (1 winner)</li>
              <li><strong>2nd Place:</strong> $3,000+ ARV (1 winner)</li>
              <li><strong>3rd Place:</strong> $1,000+ ARV (1 winner)</li>
              <li><strong>Top 25 Finalists:</strong> $300+ ARV each (25 winners)</li>
              <li><strong>Total Prize Pool ARV:</strong> approximately $21,500</li>
            </ul>
            <p>
              Full prize component breakdown is published at sneakzandbeatz.com/rap-challenge.
            </p>
          </section>

          <section id="prize-fulfillment">
            <h2>10. Prize Fulfillment</h2>
            <p>
              Physical prizes (PS5 Pro, custom sneaker, anime exclusive box) will be shipped
              within thirty (30) days of return of the executed winner documents. Gift cards
              and digital prizes (StockX gift cards, beat catalog access, kit downloads) will
              be delivered electronically within seven (7) days. Cypher tape royalty splits
              will be administered through a standard PRO/distributor split agreement and paid
              quarterly per the distributor&rsquo;s payment schedule.
            </p>
            <p>
              All federal, state, and local taxes on prizes are the sole responsibility of the
              winner. Winners receiving prizes valued at $600 USD or more will receive a Form
              1099-MISC.
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
              courts located in Los Angeles County, California.
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
