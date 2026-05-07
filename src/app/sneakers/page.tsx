import PillarHub from "@/components/PillarHub";

export const metadata = {
  title: "Sneakers — Air Jordan Retros, OG Colorways, Black-Owned Sneaker Culture",
  description:
    "Black-culture-first sneaker editorial. Air Jordan retro release calendar, OG colorway returns, A Ma Maniere & Trophy Room coverage, BIN 23 deep dives, the OG-vs-collab debate.",
  alternates: { canonical: "/sneakers" },
  openGraph: {
    title: "Sneakers — Sneakz & Beatz",
    description: "Air Jordan retros, Black-owned sneaker shops, OG colorways.",
    url: "https://www.sneakzandbeatz.com/sneakers",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
  keywords: ["Air Jordan retro", "AJ12 Bloodline", "AJ3 BIN 23", "AJ1 Banned", "A Ma Maniere", "Trophy Room", "Black-owned sneaker culture", "Black sneakerhead"],
};

export default function SneakersPage() {
  return (
    <PillarHub
      pillarKey="sneakers"
      pillarNumber="01 / Pillar"
      pillarName="SNEAKERS"
      pillarTagline="Jordan-First. Sneaker-Wide."
      lead="Sneakers, full stop. Nike, adidas, Yeezy, New Balance, Reebok, Asics, Puma — all welcome. But we're extreme Jordan retro fans, so anything from the AJ1 through AJ17 vault gets first dibs at the top. When Jordan goes quiet, the rest of the sneaker world fills in. No Travis collabs, no NOCTA, no deal listicles, no affiliate spam — just the culture."
      covers={[
        {
          tag: "Jordan Retros 1–17",
          heading: "First Dibs, Always",
          body: "Air Jordan 1 through 17 own the top of this feed. Release-day coverage, colorway lineage, retail vs. resale check, school PEs (Michigan, Georgetown), and brand collabs (Levi's, Trophy Room, Fragment, Union LA).",
        },
        {
          tag: "The Wider Sneaker World",
          heading: "Everything Else That Matters",
          body: "AF1, Dunk SB, Yeezy 350/700, NB 990v3, Kobe Protro, Reebok DMX, adidas Superstar — when there's heat in the broader sneaker world, it lands here. Same culture-first lens, no resale tickers.",
        },
        {
          tag: "Drop Calendar",
          heading: "Saturday Drops, Saved You First",
          body: "Jordan drops most Saturdays. We track release dates from the reference sites we trust so the upcoming heat shows up here days before the SNKRS app pings — Bloodline, World's Best Dad, Mother's Day, BIN 23, Brazil, Nigel Sylvester AJ4, all live before the drop.",
        },
      ]}
      secondaryCta={{ label: "Beat Store", href: "/beats" }}
    />
  );
}
