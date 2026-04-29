import Image from "next/image";
import Link from "next/link";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Sneakz & Beatz — Listen, Subscribe, Watch, Join",
  description:
    "Beats. Show. Community. The brand at the intersection of sneakers, hip-hop, anime, and gaming. Pick a door.",
};

type Link = {
  href: string;
  label: string;
  sub: string;
  icon: string;
  external?: boolean;
  accent?: boolean;
};

const LINKS: Link[] = [
  {
    href: "/beats",
    label: "Listen + Lease Beats",
    sub: "26 mastered · $29.99 each",
    icon: "🎧",
    accent: true,
  },
  {
    href: "https://sneakzandbeatz.substack.com/subscribe",
    label: "Subscribe — Free Beat",
    sub: "Substack · weekly drops",
    icon: "🎁",
    external: true,
  },
  {
    href: "/show",
    label: "Watch The PHRHX Show",
    sub: "Long-form · zero filter",
    icon: "▶",
  },
  {
    href: SOCIAL.discord.enabled && SOCIAL.discord.url
      ? SOCIAL.discord.url
      : "/community",
    label: "Join the Discord",
    sub: "Community · vote · drops",
    icon: "💬",
    external: SOCIAL.discord.enabled,
  },
  {
    href: "/shop",
    label: "Shop the Drop",
    sub: "Merch — March 2027",
    icon: "👕",
  },
  {
    href: "/creators",
    label: "S&B Creator Program",
    sub: "5K-10K · paid UGC",
    icon: "📸",
  },
  {
    href: "/rap-challenge",
    label: "$10K Rap Challenge",
    sub: "Waitlist open",
    icon: "🎤",
  },
];

export default function LinkInBioPage() {
  return (
    <main className="sb-page">
      <div className="sb-frame">
        <div className="sb-header">
          <Link href="/" className="sb-brand-link" aria-label="Sneakz & Beatz home">
            <Image
              src="/logo-mark-512.png"
              alt="Sneakz & Beatz"
              width={120}
              height={120}
              className="sb-logo"
              priority
            />
          </Link>
          <h1 className="sb-headline">Sneakz &amp; Beatz</h1>
          <p className="sb-tag">Sneakers · Hip-Hop · Anime · Gaming</p>
        </div>

        <nav className="sb-links" aria-label="Main destinations">
          {LINKS.map((l) => {
            const target = l.external ? "_blank" : undefined;
            const rel = l.external ? "noopener" : undefined;
            const className =
              "sb-link" + (l.accent ? " sb-link-accent" : "");
            const inner = (
              <>
                <span className="sb-link-icon" aria-hidden="true">{l.icon}</span>
                <span className="sb-link-text">
                  <span className="sb-link-label">{l.label}</span>
                  <span className="sb-link-sub">{l.sub}</span>
                </span>
                <span className="sb-link-arrow" aria-hidden="true">→</span>
              </>
            );
            return l.external ? (
              <a
                key={l.href}
                href={l.href}
                target={target}
                rel={rel}
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </nav>

        <footer className="sb-foot">
          <div className="sb-socials">
            <a href={SOCIAL.instagram.url} target="_blank" rel="noopener" aria-label={`Instagram ${SOCIAL.instagram.handle}`}>{SOCIAL.instagram.label}</a>
            <a href={SOCIAL.tiktok.url}    target="_blank" rel="noopener" aria-label={`TikTok ${SOCIAL.tiktok.handle}`}>{SOCIAL.tiktok.label}</a>
            <a href={SOCIAL.x.url}         target="_blank" rel="noopener" aria-label={`X ${SOCIAL.x.handle}`}>{SOCIAL.x.label}</a>
            <a href={SOCIAL.youtube.url}   target="_blank" rel="noopener" aria-label={`YouTube ${SOCIAL.youtube.handle}`}>{SOCIAL.youtube.label}</a>
          </div>
          <p className="sb-foot-line">
            <Link href="/">sneakzandbeatz.com</Link>
            <span aria-hidden="true"> · </span>
            <span>© {new Date().getFullYear()} Black Royal Music Media LLC</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
