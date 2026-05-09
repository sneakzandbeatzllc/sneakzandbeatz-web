import Image from "next/image";
import Link from "next/link";
import { SOCIAL } from "@/data/social";

export const metadata = {
  title: "Sneakz & Beatz — Every offer in one place",
  description:
    "The $79 Vault Bundle. The PHRHX Show. The $10K Rap Challenge. Sneakz Pass. Free beats. Every door into the brand for sneakerheads who live hip-hop, anime, and gaming.",
  alternates: { canonical: "/sb" },
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
    href: "/beats/bundles",
    label: "Get The $79 Vault — 200+ Beats",
    sub: "Hero offer · WAV + drum kit + samples + tee + free Rap Challenge entry",
    icon: "⚡",
    accent: true,
  },
  {
    href: "/show",
    label: "Watch The PHRHX Show",
    sub: "Tuesdays 9am PT · sneakers / hip-hop / anime / gaming",
    icon: "▶",
  },
  {
    href: "/rap-challenge",
    label: "$10K Rap Challenge",
    sub: "Waitlist open · submissions launch at 5,000 newsletter subs",
    icon: "🎤",
  },
  {
    href: "/sneakz-pass",
    label: "Sneakz Pass — $12/mo",
    sub: "Bonus eps · members-only Discord · monthly free beat · 10% off",
    icon: "🎫",
  },
  {
    href: "https://sneakzandbeatz.substack.com/subscribe",
    label: "Free newsletter — Substack",
    sub: "Weekly drop briefs + show recaps + culture refresh",
    icon: "📩",
    external: true,
  },
  {
    href: "/beats",
    label: "Browse The Beat Store",
    sub: "26 mastered paid leases · $34.99 each + 70 free with email",
    icon: "🎧",
  },
  {
    href: "/shop",
    label: "Shop merch",
    sub: "Bred colorway · launches August 15, 2026",
    icon: "👕",
  },
  {
    href: SOCIAL.discord.enabled && SOCIAL.discord.url
      ? SOCIAL.discord.url
      : "/community",
    label: "Join the Discord",
    sub: "Friday listening parties · daily prompts · contest voting",
    icon: "💬",
    external: SOCIAL.discord.enabled,
  },
  {
    href: "/the-lane",
    label: "Why this brand exists",
    sub: "The lane Hypebeast and Joe Budden don't fully cover",
    icon: "📍",
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
            <span>© {new Date().getFullYear()} Sneakz &amp; Beatz LLC</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
