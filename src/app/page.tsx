import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrendingTicker from "@/components/TrendingTicker";
import FeaturedStory from "@/components/FeaturedStory";
import PillarsGrid from "@/components/PillarsGrid";
import CommunityAIGallery from "@/components/CommunityAIGallery";
import BrandPhotos from "@/components/BrandPhotos";
import PHRHXShow from "@/components/PHRHXShow";
import BeatStore from "@/components/BeatStore";
import Newsletter from "@/components/Newsletter";
import FromTheCulture from "@/components/FromTheCulture";
import Footer from "@/components/Footer";
import { fetchTrending } from "@/lib/soc-engine";

export default async function HomePage() {
  // Server-side fetch from the SOC engine. Falls back to defaults if engine is offline.
  const trending = await fetchTrending();

  return (
    <>
      <Header />
      <Hero />
      <TrendingTicker items={trending} />
      <FeaturedStory />
      <PillarsGrid />
      <PHRHXShow />
      <BeatStore />
      <BrandPhotos />
      <Newsletter />
      <CommunityAIGallery variant="preview" />
      <FromTheCulture />
      <Footer />
    </>
  );
}
