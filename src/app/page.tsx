import Header from "@/components/Header";
import TikTokFeed from "@/components/TikTokFeed";
import ShowEmbed from "@/components/ShowEmbed";
import SubstackSticker from "@/components/SubstackSticker";
import Footer from "@/components/Footer";
import LaneGrid from "@/components/LaneGrid";
import {
  OnAirBar,
  RoomHero,
  ProgramGuide,
  BeatLabV3,
  MerchZone,
  GirlsZone,
  AdBreak,
} from "@/components/HomeV3";
import { SOCIAL } from "@/data/social";

// Use `title.absolute` so the layout's "%s — Sneakz & Beatz" template doesn't
// append a duplicate brand suffix to the homepage title.
export const metadata = {
  title: {
    absolute:
      "Sneakz & Beatz — Sneakers, Hip-Hop, Anime, Gaming. Black-owned culture brand.",
  },
  description:
    "Sneakz & Beatz is the editorial home for sneakerheads who live hip-hop, anime, and gaming. The PHRHX Show, 100 mastered beats, the $79 Vault, the $10K Rap Challenge.",
  alternates: { canonical: "https://www.sneakzandbeatz.com" },
  openGraph: {
    title: "Sneakz & Beatz — Sneakers, Hip-Hop, Anime, Gaming",
    description:
      "Black-owned culture brand for sneakerheads who live hip-hop, anime, and gaming. Watch The PHRHX Show, get 100 mastered beats in the $79 Vault, win $10K in the Rap Challenge.",
    url: "https://www.sneakzandbeatz.com",
    siteName: "Sneakz & Beatz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sneakz & Beatz — Sneakers, Hip-Hop, Anime, Gaming",
    description:
      "Black-owned culture brand. The PHRHX Show. 100 mastered beats. $79 Vault. $10K Rap Challenge.",
  },
};

// JSON-LD: Organization + WebSite schemas for AI engines + Knowledge Graph.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.sneakzandbeatz.com/#organization",
      name: "Sneakz & Beatz",
      legalName: "Sneakz & Beatz LLC",
      url: "https://www.sneakzandbeatz.com",
      logo: "https://www.sneakzandbeatz.com/logo-mark-512.png",
      description:
        "Black-owned editorial brand for sneakerheads who live hip-hop, anime, and gaming. Operator of The PHRHX Show, the 100-beat catalog, and the $10K Rap Challenge.",
      sameAs: [
        SOCIAL.instagram.url,
        SOCIAL.tiktok.url,
        SOCIAL.x.url,
        SOCIAL.youtube.url,
        SOCIAL.substack.url,
      ],
      foundingDate: "2026-04-23",
      founder: {
        "@type": "Person",
        "@id": "https://www.sneakzandbeatz.com/#phrhx",
        name: "PHRHX",
        givenName: "Raymond",
        familyName: "Miller",
        jobTitle: "Founder, Host, Producer",
        url: "https://www.sneakzandbeatz.com/about",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Diego",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sneakzandbeatz.com/#website",
      url: "https://www.sneakzandbeatz.com",
      name: "Sneakz & Beatz",
      publisher: { "@id": "https://www.sneakzandbeatz.com/#organization" },
    },
    {
      "@type": "PodcastSeries",
      "@id": "https://www.sneakzandbeatz.com/#podcast",
      name: "The PHRHX Show",
      description:
        "Hip-hop culture podcast covering sneakers, hip-hop, anime, and gaming through a Black-culture-first lens. Hosted by PHRHX.",
      url: "https://www.sneakzandbeatz.com/show",
      author: { "@id": "https://www.sneakzandbeatz.com/#phrhx" },
      publisher: { "@id": "https://www.sneakzandbeatz.com/#organization" },
    },
  ],
};

export default async function HomePage() {
  // Broadcast spine — OnAir, RoomHero, ProgramGuide, The PHRHX Show — ALWAYS
  // leads (social proof first, global rule R-2026-06-25-003). The trend-ranked
  // "Latest from The Lane" rail sits BELOW the Show.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <OnAirBar />
      <Header />
      <RoomHero />
      <ProgramGuide />
      <ShowEmbed />

      <LaneGrid limit={6} heading="Latest from The Lane" />

      <BeatLabV3 />
      <MerchZone />
      <GirlsZone />
      <TikTokFeed />
      <AdBreak />
      <SubstackSticker />
      <Footer />
    </>
  );
}
