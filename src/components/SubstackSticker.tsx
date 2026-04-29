/**
 * SubstackSticker.tsx
 *
 * Small inline "sticker"-style CTA pointing visitors to the S&B Substack
 * via a free-beat freebie. Replaces the heavy Newsletter section on the
 * homepage. Tasteful, recognizable, doesn't dominate the layout.
 *
 * Visual: white cream sticker rotated -2deg, dashed accent border, sits
 * centered between sections. Soft drop shadow gives it the feel of a
 * peel-and-stick decal on the page.
 */

export default function SubstackSticker() {
  return (
    <section className="substack-sticker-wrap" aria-label="Subscribe to the Sneakz & Beatz Substack">
      <a
        href="https://sneakzandbeatz.substack.com/subscribe"
        target="_blank"
        rel="noopener"
        className="substack-sticker"
      >
        <span className="substack-sticker-icon" aria-hidden="true">🎁</span>
        <span className="substack-sticker-text">
          <span className="substack-sticker-eyebrow">Free Beat</span>
          <span className="substack-sticker-headline">Subscribe → unlock</span>
        </span>
        <span className="substack-sticker-arrow" aria-hidden="true">→</span>
      </a>
    </section>
  );
}
