import Link from "next/link";
import Image from "next/image";
import { SOCIAL } from "@/data/social";

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
              <a href={SOCIAL.instagram.url} target="_blank" rel="noopener" aria-label={`Instagram ${SOCIAL.instagram.handle}`}>{SOCIAL.instagram.label}</a>
              <a href={SOCIAL.tiktok.url}    target="_blank" rel="noopener" aria-label={`TikTok ${SOCIAL.tiktok.handle}`}>{SOCIAL.tiktok.label}</a>
              <a href={SOCIAL.x.url}         target="_blank" rel="noopener" aria-label={`X ${SOCIAL.x.handle}`}>{SOCIAL.x.label}</a>
              <a href={SOCIAL.youtube.url}   target="_blank" rel="noopener" aria-label={`YouTube ${SOCIAL.youtube.handle}`}>{SOCIAL.youtube.label}</a>
              {SOCIAL.discord.enabled && SOCIAL.discord.url && (
                <a href={SOCIAL.discord.url} target="_blank" rel="noopener" aria-label={`Discord ${SOCIAL.discord.handle}`}>{SOCIAL.discord.label}</a>
              )}
              {/* Threads hidden until S&B Girls roster launches. */}
            </div>
          </div>

          <div>
            <h5>Explore</h5>
            <ul>
              <li><Link href="/sneakers">Sneakers</Link></li>
              <li><Link href="/hiphop">Hip-Hop</Link></li>
              <li><Link href="/anime">Anime</Link></li>
              <li><Link href="/gaming">Gaming</Link></li>
              <li><Link href="/show">The PHRHX Show</Link></li>
            </ul>
          </div>

          <div>
            <h5>Shop</h5>
            <ul>
              <li><Link href="/shop">Beats &amp; Merch</Link></li>
              <li><Link href="/bundle">The Vault — from $79</Link></li>
              <li><Link href="/licensing">Licensing</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/dmca">DMCA</Link></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/rap-challenge">$10K Rap Challenge</Link></li>
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
          <span>© 2026 The PHRHX Company. Sneakz &amp; Beatz is a property of The PHRHX Company. Beat catalog + publishing by Black Royal Music Media Group Inc. All rights reserved.</span>
          <span>Built for the culture.</span>
        </div>
      </div>
    </footer>
  );
}
