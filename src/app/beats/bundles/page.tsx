import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Beat Bundles — Sneakz & Beatz",
  description: "Pre-priced beat bundle drops. The 100 Beats + Mix Pack and other bundles are coming soon.",
};

export default function BundlesPage() {
  return (
    <ComingSoon
      eyebrow="Bundles"
      title="100 Beats + Mix Pack — Coming Soon."
      subtitle="The flagship bundle: trap, drill, R&B, Detroit, with stems included. Instant download. Subscribe for early access pricing."
      primaryCta={{ label: "Subscribe For Early Access", href: "https://sneakzandbeatz.substack.com" }}
      secondaryCta={{ label: "Browse Beat Store", href: "/beats" }}
    />
  );
}
