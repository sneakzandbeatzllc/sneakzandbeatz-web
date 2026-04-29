"use client";

/**
 * MobileMenu.tsx
 *
 * Hamburger toggle + slide-out drawer for screens ≤720px.
 * Desktop nav stays as-is; this component is hidden via CSS at >720px.
 *
 * Behavior:
 *   - Click hamburger → drawer slides in from the right with full nav
 *   - Click backdrop or X or any link → drawer closes
 *   - Body scroll locks while open
 *   - ESC closes
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { SOCIAL } from "@/data/social";

const NAV_LINKS = [
  { href: "/sneakers", label: "Sneakers" },
  { href: "/hiphop", label: "Hip-Hop · Beatz" },
  { href: "/anime", label: "Anime" },
  { href: "/gaming", label: "Gaming" },
  { href: "/show", label: "The PHRHX Show" },
  { href: "/beats", label: "Beat Store" },
  { href: "/shop", label: "Shop" },
  { href: "/creators", label: "Creators" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC key closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={"mobile-menu-toggle" + (open ? " is-open" : "")}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="mobile-menu-bar" />
        <span className="mobile-menu-bar" />
        <span className="mobile-menu-bar" />
      </button>

      <div
        className={"mobile-menu-backdrop" + (open ? " is-open" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={"mobile-menu-drawer" + (open ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <header className="mobile-menu-head">
          <span className="mobile-menu-eyebrow">Sneakz &amp; Beatz</span>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </header>

        <nav className="mobile-menu-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mobile-menu-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-cta-row">
          <a
            href="https://sneakzandbeatz.substack.com"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost btn-arrow"
            onClick={() => setOpen(false)}
          >
            Subscribe
          </a>
          <Link
            href="/beats"
            className="btn btn-primary btn-arrow"
            onClick={() => setOpen(false)}
          >
            Browse Beats
          </Link>
        </div>

        <div className="mobile-menu-socials">
          <a href={SOCIAL.instagram.url} target="_blank" rel="noopener" aria-label={`Instagram ${SOCIAL.instagram.handle}`}>{SOCIAL.instagram.label}</a>
          <a href={SOCIAL.tiktok.url}    target="_blank" rel="noopener" aria-label={`TikTok ${SOCIAL.tiktok.handle}`}>{SOCIAL.tiktok.label}</a>
          <a href={SOCIAL.x.url}         target="_blank" rel="noopener" aria-label={`X ${SOCIAL.x.handle}`}>{SOCIAL.x.label}</a>
          <a href={SOCIAL.youtube.url}   target="_blank" rel="noopener" aria-label={`YouTube ${SOCIAL.youtube.handle}`}>{SOCIAL.youtube.label}</a>
          {SOCIAL.discord.enabled && SOCIAL.discord.url && (
            <a href={SOCIAL.discord.url} target="_blank" rel="noopener" aria-label={`Discord ${SOCIAL.discord.handle}`}>{SOCIAL.discord.label}</a>
          )}
        </div>
      </aside>
    </>
  );
}
