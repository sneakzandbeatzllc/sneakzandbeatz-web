import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container row">
        <Link href="/" className="brand">
          <span className="brand-logo">S&amp;B</span>
          <span className="brand-name">Sneakz &amp; Beatz</span>
        </Link>
        <nav className="primary">
          <Link href="/sneakers">Sneakers</Link>
          <Link href="/hiphop">Hip-Hop · Beatz</Link>
          <Link href="/anime">Anime</Link>
          <Link href="/gaming">Gaming</Link>
          <Link href="/show">The PHRHX Show</Link>
          <Link href="/beatstore">Beat Store</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="header-cta">
          <a href="#newsletter" className="btn btn-ghost">Subscribe</a>
          <a href="#beatstore" className="btn btn-primary btn-arrow">Browse Beats</a>
        </div>
      </div>
    </header>
  );
}
