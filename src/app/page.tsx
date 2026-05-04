import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendingTicker from "@/components/TrendingTicker";
import DropsFeed from "@/components/DropsFeed";
import FeaturedStory from "@/components/FeaturedStory";
import PillarsGrid from "@/components/PillarsGrid";
import BrandPhotos from "@/components/BrandPhotos";
import CreatorsCTA from "@/components/CreatorsCTA";
import PHRHXShow from "@/components/PHRHXShow";
import BeatStore from "@/components/BeatStore";
import SubstackSticker from "@/components/SubstackSticker";
import Footer from "@/components/Footer";
import { fetchTrending } from "@/lib/soc-engine";

export default async function HomePage() {
  // Server-side fetch from the SOC engine. Falls back to defaults if engine is offline.
  const trending = await fetchTrending();

  // Path A — Drops Feed replaces the AI article cards. Each card is an
  // outbound link to the original publisher (Drudge / HN / Reddit
  // format), with sneakers leading the feed (Jordan-first editorial
  // rule). The brand voice is the show + the beats + the substack —
  // the drops feed is just the cultural pulse.
  return (
    <>
      <Header />
      <Hero />
      <TrendingTicker items={trending} />
      <DropsFeed
        title="What's dropping"
        subtitle="Sneakers leads. Then music, anime, and gaming. Tap any card — we link out to the source. No fluff, no rewrites, just the culture refresh."
      />
      <FeaturedStory />
      <PillarsGrid />
      <PHRHXShow />
      <BeatStore />
      <BrandPhotos />
      <CreatorsCTA />
      <SubstackSticker />
      <Footer />
    </>
  );
}
