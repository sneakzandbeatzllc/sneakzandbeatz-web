import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeatCatalog from "@/components/BeatCatalog";
import { BEATS, CATEGORIES } from "@/data/beats";

export const metadata = {
  title: "Beat Store — Sneakz & Beatz",
  description:
    "96 mastered beats across East Coast, West Coast, Trap, Rage, and Free. Hard-hitting production for artists who move different.",
};

export default function BeatsPage() {
  const totalCount = BEATS.length;
  const freeCount = BEATS.filter((b) => b.isFree).length;
  const paidCount = totalCount - freeCount;

  return (
    <>
      <Header />

      <section className="beat-store-hero">
        <div className="container">
          <span className="eyebrow">
            Beat Store · {totalCount} mastered beats · {paidCount} for lease · {freeCount} free
          </span>
          <h1 className="beat-store-title">
            Beats For Artists Who <span className="accent">Move Different.</span>
          </h1>
          <p className="lead">
            All beats below are produced by Sneakz &amp; Beatz / BRMG. 60-second previews stream
            inline. Lease beats are MP3 + WAV delivery. Free beats unlock with a Substack signup.
          </p>
        </div>
      </section>

      <section className="container beat-store-section">
        <BeatCatalog beats={BEATS} categories={CATEGORIES} />
      </section>

      <Footer />
    </>
  );
}
