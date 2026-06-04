/**
 * /links — Linktree-style bio link page.
 *
 * Single destination for every social bio's "link in bio" CTA.
 * Lists every active offer + product + CTA in one place. Mobile-first.
 */

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Links — Sneakz & Beatz",
  description:
    "Every Sneakz & Beatz offer in one place. Watch The PHRHX Show, get 96 beats for $79, win $10K in the Rap Challenge, join Sneakz Pass.",
  alternates: { canonical: "/links" },
};

interface LinkItem {
  label: string;
  href: string;
  hint?: string;
  highlight?: boolean;
  external?: boolean;
}

const LINKS: LinkItem[] = [
  {
    label: "▶  Watch The PHRHX Show",
    href: "/show",
    hint: "Tuesdays at 9am PT — sneakers, hip-hop, anime, gaming",
    highlight: true,
  },
  {
    label: "🎵  Get 100 Mastered Beats — $79",
    href: "/beats/bundles",
    hint: "WAV + drum kit + samples + t-shirt + free Rap Challenge entry",
    highlight: true,
  },
  {
    label: "🏆  Submit a Rap. Win $10K.",
    href: "/rap-challenge",
    hint: "Standard $35 / Verified $99 / Free with bundle / Free via AMOE",
    highlight: true,
  },
  {
    label: "🎫  Join Sneakz Pass — $12/mo",
    href: "/sneakz-pass",
    hint: "Bonus episodes, members-only Discord, monthly free beat. Launches Oct 1.",
  },
  {
    label: "📩  Get the newsletter (free)",
    href: "https://sneakzandbeatz.substack.com",
    hint: "Weekly drop briefs + show recaps + culture refresh",
    external: true,
  },
  {
    label: "💬  Join the Discord",
    href: "/community",
    hint: "Daily prompts, Friday listening parties, members-only channels",
  },
  {
    label: "🔥  Browse The Beat Store",
    href: "/beats",
    hint: "96 mastered beats — 26 paid leases at $34.99, 70 free",
  },
  {
    label: "🛒  Shop merch",
    href: "/shop",
    hint: "Bred colorway drop — first units ship August 15, 2026",
  },
  {
    label: "📰  Read the latest articles",
    href: "/articles",
    hint: "Sneakers, hip-hop, anime, gaming — Black-culture-first editorial",
  },
  {
    label: "ℹ️  About + The Lane",
    href: "/the-lane",
    hint: "Why this brand exists. Who it's for. Where it sits.",
  },
];

export default function LinksPage() {
  return (
    <>
      <Header />

      <main
        className="container links-page"
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          padding: "32px 20px 60px",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0 0 8px" }}>
            Sneakz &amp; Beatz
          </h1>
          <p style={{ margin: 0, color: "var(--muted, #888)", fontSize: "0.95rem" }}>
            For sneakerheads who live hip-hop, anime, and gaming.
            <br />
            Every offer, in one place.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {LINKS.map((link) => {
            const styleBase: React.CSSProperties = {
              display: "block",
              padding: "16px 18px",
              borderRadius: "12px",
              border: "1px solid var(--rule, #2a2a30)",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.1s ease, border-color 0.1s ease",
            };
            const styleHighlight: React.CSSProperties = link.highlight
              ? {
                  background: "linear-gradient(135deg, #FF6A1A 0%, #c8262c 100%)",
                  color: "#fff",
                  border: "none",
                }
              : {};

            const content = (
              <>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                  {link.label}
                </div>
                {link.hint && (
                  <div
                    style={{
                      fontSize: "0.83rem",
                      marginTop: "4px",
                      opacity: link.highlight ? 0.92 : 0.7,
                    }}
                  >
                    {link.hint}
                  </div>
                )}
              </>
            );

            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styleBase, ...styleHighlight }}
              >
                {content}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{ ...styleBase, ...styleHighlight }}
              >
                {content}
              </Link>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "32px",
            fontSize: "0.78rem",
            color: "var(--muted, #888)",
          }}
        >
          © 2026 Sneakz &amp; Beatz LLC. PHRHX hosts. San Diego, CA.
        </p>
      </main>

      <Footer />
    </>
  );
}
