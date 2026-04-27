import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Producer Kits — Sneakz & Beatz",
  description: "Drum kits, sample packs, and producer tools from Sneakz & Beatz.",
};

export default function ProducerKitsPage() {
  return (
    <ComingSoon
      eyebrow="Producer Kits"
      title="Producer Kits — Coming Soon."
      subtitle="Drum kits, sample packs, melody loops, and Serum presets — built for the next generation of beatmakers."
      primaryCta={{ label: "Subscribe For Drop", href: "https://sneakzandbeatz.substack.com" }}
      secondaryCta={{ label: "Beat Store", href: "/beats" }}
    />
  );
}
