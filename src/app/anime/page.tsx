import PillarHub from "@/components/PillarHub";

export const metadata = {
  title: "Anime — Hip-Hop Crossover, Best Anime for Sneakerheads",
  description:
    "Anime releases, manga reports, industry shifts, and the hip-hop crossover. Anime for sneakerheads who live the culture.",
  alternates: { canonical: "/anime" },
  openGraph: {
    title: "Anime — Sneakz & Beatz",
    description: "Anime for sneakerheads who live hip-hop. The crossover lane nobody else covers.",
    url: "https://www.sneakzandbeatz.com/anime",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
  keywords: ["best anime for hip-hop fans", "Black anime fans", "anime references in hip-hop", "anime sneaker collabs", "Megan Thee Stallion Naruto", "blerd anime", "Jujutsu Kaisen merch"],
};

export default function AnimePage() {
  return (
    <PillarHub
      pillarKey="anime"
      showCovers={false}
      pillarNumber="03 / Pillar"
      pillarName="ANIME"
      pillarTagline="Releases. Manga. Crossover."
      lead="Anime stopped being niche. Jujutsu Kaisen finales, One Piece movie runs, Demon Slayer arcs — they're cultural events with hip-hop, sneaker, and gaming overlap. We cover the releases that matter, the manga arcs producing the next wave, and the industry shifts that decide what gets dubbed and what gets buried."
      covers={[
        {
          tag: "Releases",
          heading: "Episode + Movie Reports",
          body: "Same-day reports on the anime drops worth your time — finales, season premieres, movie runs. Who's animating, who's directing, what to skip.",
        },
        {
          tag: "Manga",
          heading: "Source Material Watch",
          body: "Which manga arcs are leading the next anime wave. What Shōnen Jump, Young Magazine, and indie titles are quietly cooking before they hit screens.",
        },
        {
          tag: "Crossover",
          heading: "Anime × Hip-Hop × Sneakers",
          body: "Anime references in rap. Sneaker collabs (BAPE legacy, Nike anime drops, JJK collabs). Music videos pulling from anime aesthetics. The full overlap.",
        },
      ]}
    />
  );
}
