import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendingTicker from "@/components/TrendingTicker";
import LatestArticles from "@/components/LatestArticles";
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

  // Section order is intentional — engineered to maximize time-on-site.
  // Hero hooks. Trending ticker shows what's hot RIGHT NOW (clickable
  // into S&B articles). LatestArticles surfaces fresh editorial with
  // hero images BEFORE the static "What We Cover" section, so first-time
  // visitors have something concrete to click into immediately. Each
  // subsequent section drops the friction one more notch — the show,
  // beats, brand photos, creators — so by the time they hit Substack
  // they've consumed enough to subscribe.
  return (
    <>
      <Header />
      <Hero />
      <TrendingTicker items={trending} />
      <LatestArticles />
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
