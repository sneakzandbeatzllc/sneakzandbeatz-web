import Link from "next/link";
import { fetchPillarCycles } from "@/lib/soc-cycles";

type PillarKey = "sneakers" | "hiphop" | "anime" | "gaming";

type Pillar = {
  slug: string;
  number: string;
  href: string;
  title: string;
  tagline: string;
  data: PillarKey;
  icon: string;
};

const PILLARS: Pillar[] = [
  { slug: "sneakers", number: "01", href: "/sneakers", title: "Sneakers",         tagline: "Latest drops & culture",   data: "sneakers", icon: "👟" },
  { slug: "hiphop",   number: "02", href: "/hiphop",   title: "Hip-Hop · Beatz",  tagline: "Music · artists · stories", data: "hiphop",   icon: "🎤" },
  { slug: "anime",    number: "03", href: "/anime",    title: "Anime",            tagline: "News · reviews · culture",  data: "anime",    icon: "🍜" },
  { slug: "gaming",   number: "04", href: "/gaming",   title: "Gaming",           tagline: "News · gear · play",        data: "gaming",   icon: "🎮" },
];

export default async function PillarsGrid() {
  // Fetch live story counts from SOC engine — each card shows "X stories today"
  const counts = await Promise.all(
    PILLARS.map((p) => fetchPillarCycles(p.data).then((items) => items.length))
  );

  return (
    <section className="pillars container" id="pillars">
      <div className="pillars-grid">
        {PILLARS.map((p, i) => {
          const count = counts[i];
          return (
            <Link key={p.slug} className="pillar-card" data-pillar={p.data} href={p.href}>
              <div className="photo"></div>
              <span className="pillar-card-icon" aria-hidden="true">{p.icon}</span>
              <span className="label-tag">{p.number} / Pillar</span>
              {count > 0 && (
                <span className="pillar-card-count">
                  <span className="pillar-card-count-num">{count}</span>
                  <span className="pillar-card-count-label">
                    {count === 1 ? "story" : "stories"}<br />today
                  </span>
                </span>
              )}
              <div className="meta">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.tagline}</p>
                </div>
                <div className="arrow">→</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
