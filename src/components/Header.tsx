import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container row">
        <Link href="/" className="brand" aria-label="Sneakz & Beatz home">
          <span className="brand-logo">
            <Image
              src="/logo-mark-256.png"
              alt="Sneakz & Beatz logo"
              width={256}
              height={256}
              priority
            />
          </span>
          <span className="brand-name">Sneakz &amp; Beatz</span>
        </Link>
        <nav className="primary">
          <Link href="/sneakers">Sneakers</Link>
          <Link href="/hiphop">Hip-Hop & Beatz</Link>
          <Link href="/anime">Anime</Link>
          <Link href="/gaming">Gaming</Link>
          <Link href="/show">The PHRHX Show</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/community">Community</Link>
        </nav>
        <div className="header-cta">
          <a
            href="https://sneakzandbeatz.substack.com"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            Subscribe
          </a>
          <Link href="/beats" className="btn btn-primary btn-arrow">
            Browse Beats
          </Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
