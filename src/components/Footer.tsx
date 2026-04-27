import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" aria-label="Sneakz & Beatz home">
              <span className="brand-logo">
                <Image src="/logo-mark-256.png" alt="Sneakz & Beatz logo" width={256} height={256} />
              </span>
              <span className="brand-name">Sneakz &amp; Beatz</span>
            </Link>
            <p className="footer-tagline">
              Where sneakers, hip-hop, anime, and gaming collide. We cover the
              culture. You live it.
            </p>
            <div className="socials">
              <a href="https://instagram.com/SneakzandBeatz" aria-label="Instagram">IG</a>
              <a href="https://tiktok.com/@SneakzandBeatz" aria-label="TikTok">TT</a>
              <a href="https://x.com/SneakzandBeatz" aria-label="X">X</a>
              <a href="https://youtube.com/@SneakzandBeatz" aria-label="YouTube">YT</a>
              <a href="https://threads.net/@SneakzandBeatz" aria-label="Threads">TH</a>
            </div>
          </div>

          <div>
            <h5>Explore</h5>
            <ul>
              <li><Link href="/sneakers">Sneakers</Link></li>
              <li><Link href="/hiphop">Hip-Hop · Beatz</Link></li>
              <li><Link href="/anime">Anime</Link></li>
              <li><Link href="/gaming">Gaming</Link></li>
              <li><Link href="/show">The PHRHX Show</Link></li>
            </ul>
          </div>

          <div>
            <h5>Shop</h5>
            <ul>
              <li><Link href="/beatstore">Beat Store</Link></li>
              <li><a href="https://beats.sneakzandbeatz.com/100-beats-mix-pack" target="_blank" rel="noopener">Bundles</a></li>
              <li><Link href="/licensing">Licensing</Link></li>
              <li><Link href="/producer-kits">Producer Kits</Link></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/work-with-us">Work With Us</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h5>Newsletter</h5>
            <p className="footer-tagline" style={{ marginTop: 0 }}>
              Stay locked in. Substack delivers culture every week.
            </p>
            <form
              className="footer-newsletter"
              action="https://sneakzandbeatz.substack.com/subscribe"
              method="post"
              target="_blank"
            >
              <input type="email" name="email" placeholder="your@email.com" required />
            </form>
          </div>
        </div>

        <div className="footer-bar">
          <span>© 2026 Sneakz &amp; Beatz LLC. All rights reserved.</span>
          <span>Built for the culture.</span>
        </div>
      </div>
    </footer>
  );
}
