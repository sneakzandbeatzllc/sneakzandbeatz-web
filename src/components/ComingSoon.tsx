import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  /** Big eyebrow above the headline (e.g. "Pillar · 01"). */
  eyebrow?: string;
  /** Big headline. Defaults to "Coming Soon." */
  title?: string;
  /** Subhead paragraph. */
  subtitle?: string;
  /** Primary CTA label + href. */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA label + href. */
  secondaryCta?: { label: string; href: string };
};

export default function ComingSoon({
  eyebrow,
  title = "Coming Soon.",
  subtitle = "We're cooking. Drop your email — we'll let you know the moment this lands.",
  primaryCta = { label: "Subscribe On Substack", href: "https://sneakzandbeatz.substack.com" },
  secondaryCta = { label: "Back To Home", href: "/" },
}: Props) {
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container hero-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div style={{ maxWidth: 720 }}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            <p className="lead">{subtitle}</p>
            <div className="hero-ctas">
              <a
                href={primaryCta.href}
                target={primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                className="btn btn-primary btn-arrow"
              >
                {primaryCta.label}
              </a>
              <Link href={secondaryCta.href} className="btn btn-ghost btn-arrow">
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
