import Link from "next/link";

type Pillar = {
  slug: string;
  number: string;
  href: string;
  title: string;
  tagline: string;
  data: "sneakers" | "hiphop" | "anime" | "gaming";
};

const PILLARS: Pillar[] = [
  { slug: "sneakers", number: "01", href: "/sneakers", title: "Sneakers",         tagline: "Latest drops & culture",   data: "sneakers" },
  { slug: "hiphop",   number: "02", href: "/hiphop",   title: "Hip-Hop · Beatz",  tagline: "Music · artists · stories", data: "hiphop" },
  { slug: "anime",    number: "03", href: "/anime",    title: "Anime",            tagline: "News · reviews · culture",  data: "anime" },
  { slug: "gaming",   number: "04", href: "/gaming",   title: "Gaming",           tagline: "News · gear · play",        data: "gaming" },
];

export default function PillarsGrid() {
  return (
    <section className="pillars container" id="pillars">
      <div className="pillars-grid">
        {PILLARS.map((p) => (
          <Link key={p.slug} className="pillar-card" data-pillar={p.data} href={p.href}>
            <div className="photo"></div>
            <span className="label-tag">{p.number} / Pillar</span>
            <div className="meta">
              <div>
                <h3>{p.title}</h3>
                <p>{p.tagline}</p>
              </div>
              <div className="arrow">→</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
