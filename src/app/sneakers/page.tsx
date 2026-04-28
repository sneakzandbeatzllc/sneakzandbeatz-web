import PillarHub from "@/components/PillarHub";

export const metadata = {
  title: "Sneakers — Sneakz & Beatz",
  description:
    "Sneaker drop reports, retro returns, collab heat checks, and street culture from Sneakz & Beatz.",
};

export default function SneakersPage() {
  return (
    <PillarHub
      pillarNumber="01 / Pillar"
      pillarName="SNEAKERS"
      pillarTagline="Drops. Heat. Culture."
      lead="Sneaker drops aren't just product releases — they're the closest thing modern fashion has to event storytelling. We track release-day reports, retro returns, collab heat-checks, and the streetwear context around every meaningful drop. No deal listicles. No affiliate spam. Just the culture."
      covers={[
        {
          tag: "Drop Reports",
          heading: "Release-Day Coverage",
          body: "Same-day breakdowns of Jordan, Nike, adidas, and New Balance drops with the colorway lineage, retail vs. resale check, and where to actually cop.",
        },
        {
          tag: "Retro Returns",
          heading: "Archive vs. Reissue",
          body: "When a classic comes back — Air Jordan 4 Toro, AF1 Linen, NB 990v3 grey — we explain what's the same, what's been updated, and whether it's worth the hype.",
        },
        {
          tag: "Heat Checks",
          heading: "Collab Reality Tests",
          body: "Travis x AF1, Drake x NOCTA, Yeezy legacy — collab drops broken down for actual wearability + cultural weight, not just resale price.",
        },
      ]}
      secondaryCta={{ label: "Beat Store", href: "/beats" }}
    />
  );
}
