import PillarHub from "@/components/PillarHub";

export const metadata = {
  title: "Hip-Hop · Beatz — Sneakz & Beatz",
  description:
    "Hip-hop news, releases, scene reports, and producer spotlights from Sneakz & Beatz.",
};

export default function HipHopPage() {
  return (
    <PillarHub
      pillarNumber="02 / Pillar"
      pillarName="HIP-HOP · BEATZ"
      pillarTagline="The Sound. The Stories."
      lead="Hip-hop is the operating system of culture in 2026. We cover the music — releases, scenes, beefs that actually mean something — and the production side: who's making the beats, why a sound takes off, what's next. Plus we drop our own beats. 96 mastered tracks live in the Beat Store right now."
      covers={[
        {
          tag: "New Music",
          heading: "Releases & Reviews",
          body: "Singles, mixtapes, albums — the drops worth your time and the ones being overrated. Honest takes, not the press release rewritten.",
        },
        {
          tag: "Scene Reports",
          heading: "Regional Beats",
          body: "What's happening in Detroit, Atlanta, Memphis, the Bay, UK drill, NY drill, Texas. The geography still matters; we map it.",
        },
        {
          tag: "Producer Spotlights",
          heading: "Behind The Boards",
          body: "Interviews, sample breakdowns, drum-kit teardowns. The people making the beats explain how they're making them.",
        },
      ]}
      primaryCta={{ label: "Browse Beat Store", href: "/beats" }}
      secondaryCta={{ label: "Subscribe On Substack", href: "https://sneakzandbeatz.substack.com" }}
    />
  );
}
