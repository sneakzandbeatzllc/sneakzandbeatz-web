import PillarHub from "@/components/PillarHub";

export const metadata = {
  title: "Gaming — Hip-Hop Soundtracks, Black Gamers, NBA 2K, GTA 6 Predictions",
  description:
    "Game releases, soundtracks, Black gamer culture, NBA 2K hip-hop curation, GTA 6 soundtrack predictions. Gaming meets street culture, Black-culture-first.",
  alternates: { canonical: "/gaming" },
  openGraph: {
    title: "Gaming — Sneakz & Beatz",
    description: "Black gamer culture + hip-hop game soundtracks + sneaker integrations in games.",
    url: "https://www.sneakzandbeatz.com/gaming",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
  keywords: ["NBA 2K soundtrack hip-hop", "GTA 6 hip-hop soundtrack", "Black gamers Twitch", "hip-hop video game soundtracks", "sneaker drops in video games"],
};

export default function GamingPage() {
  return (
    <PillarHub
      pillarKey="gaming"
      pillarNumber="04 / Pillar"
      pillarName="GAMING"
      pillarTagline="Patches. Plays. Culture."
      lead="The hip-hop / sneaker / anime audience is the same audience playing GTA, Valorant, Elden Ring, and Genshin. We cover the releases, the patches that actually change the meta, the indies most outlets skip, and where gaming aesthetics show up in fashion + music."
      covers={[
        {
          tag: "Releases",
          heading: "Drop-Day Reports",
          body: "Major-game launch coverage with the actual day-one experience — performance, content, and whether the price-tag makes sense.",
        },
        {
          tag: "Patches",
          heading: "Meta Shifts",
          body: "Valorant agent reworks, Apex meta swings, Marvel Rivals balance — the patches that change how you actually play, broken down.",
        },
        {
          tag: "Indies + Crossover",
          heading: "Beyond AAA",
          body: "Indie gems we're playing, gaming x hip-hop crossovers (Travis x Fortnite, NBA 2K soundtracks), and gaming aesthetics in streetwear.",
        },
      ]}
    />
  );
}
