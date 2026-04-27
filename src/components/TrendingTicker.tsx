type TrendingItem = {
  title: string;
  url?: string;
};

export default function TrendingTicker({ items }: { items: TrendingItem[] }) {
  // Duplicate the items so the CSS keyframe ticker animation loops seamlessly.
  const looped = [...items, ...items];

  return (
    <section className="trending">
      <div className="container row">
        <span className="label">⚡ Trending Now</span>
        <div className="ticker">
          <div className="ticker-track">
            {looped.map((item, i) => (
              <span key={`${item.title}-${i}`}>
                <span className="dot"></span>
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
