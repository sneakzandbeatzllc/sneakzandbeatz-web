import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DMCA Policy — Sneakz & Beatz",
  description:
    "Sneakz & Beatz DMCA takedown procedure for copyright owners and counter-notice process for users.",
};

export default function DMCAPage() {
  return (
    <>
      <Header />

      <section className="container legal-page">
        <header className="legal-hero">
          <span className="eyebrow">DMCA Policy</span>
          <h1 className="legal-title">
            Copyright.
            <br />
            <span className="accent">Takedown &amp; Counter-Notice.</span>
          </h1>
          <p className="lead legal-lead">
            We respect copyright. If you believe content on Sneakz &amp; Beatz
            infringes your work — or if you got a takedown that you think is
            wrong — here&rsquo;s the process under the Digital Millennium
            Copyright Act (17 U.S.C. § 512).
          </p>
          <p className="legal-effective">
            Effective: April 1, 2026 · Operator: Black Royal Music Media Group Inc., San Diego, CA
            {" "}· DMCA Agent: <a href="mailto:dmca@sneakzandbeatz.com">dmca@sneakzandbeatz.com</a>
          </p>
        </header>

        <section className="legal-section">
          <h2>1. What this policy covers</h2>
          <p>
            This applies to user-submitted content on any Sneakz &amp; Beatz
            property — Rap Challenge entries, Discord uploads, comments, fan
            art, articles, and any third-party material that may appear on
            sneakzandbeatz.com. It does <strong>not</strong> cover original
            beats produced and licensed by Sneakz &amp; Beatz (those are owned
            by us; license terms are at{" "}
            <Link href="/licensing">/licensing</Link>).
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Filing a takedown notice (copyright owners)</h2>
          <p>
            If you&rsquo;re the copyright owner (or authorized agent) of work
            you believe is being infringed on Sneakz &amp; Beatz, send a
            written notice to{" "}
            <a href="mailto:dmca@sneakzandbeatz.com">dmca@sneakzandbeatz.com</a>
            {" "}that includes:
          </p>
          <ol>
            <li>
              A physical or electronic signature of the copyright owner or
              authorized agent.
            </li>
            <li>
              Identification of the copyrighted work claimed to be infringed
              (title, registration number if applicable, original URL, etc.).
            </li>
            <li>
              Identification of the material that is claimed to be infringing
              and where it is located on our site (specific URL or screenshot).
            </li>
            <li>
              Your contact information — name, address, phone, email.
            </li>
            <li>
              A statement that you have a good-faith belief that use of the
              material is not authorized by the copyright owner, its agent, or
              the law.
            </li>
            <li>
              A statement, under penalty of perjury, that the information in
              the notice is accurate and that you are the copyright owner or
              authorized to act on behalf of the owner.
            </li>
          </ol>
          <p>
            We act on properly-formatted notices within 1–3 business days.
            Material is typically removed pending review. Repeat infringers
            are banned from the platform per § 512(i).
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Filing a counter-notice (users)</h2>
          <p>
            If your content was removed and you believe the removal was a
            mistake or misidentification, send a counter-notice to{" "}
            <a href="mailto:dmca@sneakzandbeatz.com">dmca@sneakzandbeatz.com</a>
            {" "}that includes:
          </p>
          <ol>
            <li>Your physical or electronic signature.</li>
            <li>
              Identification of the material that was removed and the location
              where it appeared before removal.
            </li>
            <li>
              A statement under penalty of perjury that you have a good-faith
              belief that the material was removed as a result of mistake or
              misidentification.
            </li>
            <li>
              Your name, address, phone, email, and a statement that you
              consent to the jurisdiction of the federal court for the judicial
              district in which your address is located (or, if your address is
              outside the U.S., for any judicial district in which Sneakz &amp;
              Beatz may be found), and that you will accept service of process
              from the original notice-filer.
            </li>
          </ol>
          <p>
            On a valid counter-notice, we forward it to the original
            notice-filer and may restore the material in 10–14 business days
            unless the filer notifies us they&rsquo;ve filed a court action.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. False claims</h2>
          <p>
            Knowingly filing a false DMCA notice or counter-notice is perjury
            under § 512(f) and can result in liability for damages, attorney
            fees, and court costs. Don&rsquo;t use this process to harass
            critics, competitors, or fan creators.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Repeat infringers</h2>
          <p>
            Accounts that receive multiple valid takedowns are terminated. We
            log every notice. Three valid strikes = permanent ban from the Rap
            Challenge, Discord, and any future user-account features.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Beats licensed from Sneakz &amp; Beatz</h2>
          <p>
            If you&rsquo;ve purchased a beat lease from us and someone else has
            uploaded a song using that beat, you do <strong>not</strong> own
            the underlying composition — we do. Forward the situation to{" "}
            <a href="mailto:support@sneakzandbeatz.com">support@sneakzandbeatz.com</a>
            {" "}and we&rsquo;ll handle the takedown on the streaming
            platform&rsquo;s side, since we hold the master rights to the
            beat.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Designated agent</h2>
          <p>
            For DMCA purposes, our designated agent is:
          </p>
          <p className="legal-effective">
            DMCA Agent — Black Royal Music Media Group Inc.<br />
            c/o Sneakz &amp; Beatz<br />
            iPostal1 — San Diego, CA<br />
            Email: <a href="mailto:dmca@sneakzandbeatz.com">dmca@sneakzandbeatz.com</a>
          </p>
          <p>
            Email is the fastest method and the preferred channel for both
            takedown notices and counter-notices.
          </p>
        </section>

        <p className="legal-foot">
          See also: <Link href="/terms">Terms of Service</Link> ·{" "}
          <Link href="/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/licensing">Beat Licensing Terms</Link> ·{" "}
          <Link href="/refund-policy">Refund Policy</Link>
        </p>
      </section>

      <Footer />
    </>
  );
}
