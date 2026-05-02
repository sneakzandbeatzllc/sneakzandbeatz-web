import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnTheRadar from "@/components/OnTheRadar";
import { EMAILS, mailto } from "@/data/contact-emails";
import { SOCIAL } from "@/data/social";
import { fetchYouTubeVideos, formatPublishedAgo, type YouTubeVideo } from "@/lib/youtube";

export const metadata = {
  title: "The PHRHX Show — Sneakz & Beatz",
  description:
    "Long-form interviews with the people moving culture — sneakers, hip-hop, anime, gaming. Hosted by PHRHX. Watch on YouTube, listen everywhere.",
};

// Hardcoded fallback list of real channel videos. Used when the YouTube
// RSS fetch fails (Vercel edge IPs blocked, ISR stale cache, etc.).
// Update these IDs whenever you publish a notable new episode — the
// dynamic fetch normally overrides them; this is the safety net so /show
// never renders empty.
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "2SBnn0bY2xY",
    title: "The New BRMG!",
    url: "https://www.youtube.com/watch?v=2SBnn0bY2xY",
    publishedAt: "",
    thumbnail: "https://i.ytimg.com/vi/2SBnn0bY2xY/hqdefault.jpg",
    thumbnailHigh: "https://i.ytimg.com/vi/2SBnn0bY2xY/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/2SBnn0bY2xY",
  },
  {
    id: "MpvEDKUeNes",
    title: "Rap's BIGGEST Flop Stars of 2025!",
    url: "https://www.youtube.com/watch?v=MpvEDKUeNes",
    publishedAt: "",
    thumbnail: "https://i.ytimg.com/vi/MpvEDKUeNes/hqdefault.jpg",
    thumbnailHigh: "https://i.ytimg.com/vi/MpvEDKUeNes/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/MpvEDKUeNes",
  },
  {
    id: "YamAo3IAhao",
    title: "Black Royal MG Live Stream",
    url: "https://www.youtube.com/watch?v=YamAo3IAhao",
    publishedAt: "",
    thumbnail: "https://i.ytimg.com/vi/YamAo3IAhao/hqdefault.jpg",
    thumbnailHigh: "https://i.ytimg.com/vi/YamAo3IAhao/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/YamAo3IAhao",
  },
];

export default async function ShowPage() {
  // Live pull from the The PHRHX Show YouTube channel RSS. Top 12 videos.
  // First video is rendered as a big embedded player; rest as thumbnails.
  // If the dynamic fetch returns 0 videos (YouTube blocking the Vercel
  // fetch UA, ISR cache stale, network error), fall through to the
  // hardcoded list above so the page never renders empty.
  const fetched = await fetchYouTubeVideos(undefined, 12);
  const videos: YouTubeVideo[] = fetched.length > 0 ? fetched : FALLBACK_VIDEOS;
  const featured = videos[0];
  const archive = videos.slice(1);

  return (
    <>
      <Header />

      <section className="container legal-page show-page-hero">
        <header className="legal-hero">
          <h2 className="show-page-eyebrow">The PHRHX Show</h2>
          <h1 className="legal-title">
            Real Conversations.
            <br />
            <span className="accent">Zero Filter.</span>
          </h1>
          <p className="lead legal-lead">
            Long-form interviews with the people moving culture — sneakers, hip-hop, anime,
            gaming. Hosted by PHRHX, recorded weekly, released across YouTube, Spotify, and
            Apple Podcasts. Average run-time: 35–50 minutes. No fluff intros, no
            advertorial pivots.
          </p>
          <div className="hero-ctas">
            <a
              href={SOCIAL.youtube.url}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-arrow"
            >
              Watch On YouTube
            </a>
            <a
              href={mailto(EMAILS.booking, "PHRHX Show — Guest Pitch")}
              className="btn btn-ghost btn-arrow"
            >
              Pitch A Guest
            </a>
          </div>
        </header>

        <section className="legal-section">
          <h2>Where to listen</h2>
          <p>
            Full-video episodes on{" "}
            <a href={SOCIAL.youtube.url} target="_blank" rel="noopener">YouTube</a>.
            Audio episodes on Spotify and Apple Podcasts (search &ldquo;The PHRHX Show&rdquo;).
            RSS coming once we self-host the feed.
          </p>
        </section>

        <OnTheRadar />

        {featured && (
          <section className="legal-section">
            <h2>Latest episode</h2>
            <div className="yt-featured">
              <div className="yt-featured-player">
                <iframe
                  src={`${featured.embedUrl}?rel=0`}
                  title={featured.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="yt-featured-meta">
                <span className="yt-featured-tag">⚡ Latest</span>
                <h3 className="yt-featured-title">{featured.title}</h3>
                {featured.publishedAt && (
                  <p className="yt-featured-date">
                    Published {formatPublishedAgo(featured.publishedAt)}
                  </p>
                )}
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary btn-arrow"
                >
                  Watch On YouTube
                </a>
              </div>
            </div>
          </section>
        )}

        <section className="legal-section">
          <h2>{archive.length > 0 ? "Recent episodes" : "Episodes"}</h2>
          {archive.length > 0 ? (
            <div className="yt-grid">
              {archive.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener"
                  className="yt-card"
                >
                  <div className="yt-card-thumb">
                    <img
                      src={v.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="yt-card-thumb-img"
                    />
                    <div className="yt-card-play">▶</div>
                  </div>
                  <div className="yt-card-body">
                    <h4 className="yt-card-title">{v.title}</h4>
                    <span className="yt-card-date">
                      {formatPublishedAgo(v.publishedAt)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="legal-effective">
              <em>YouTube feed is loading — check back in a minute, or head straight to{" "}
              <a href={SOCIAL.youtube.url} target="_blank" rel="noopener">
                {SOCIAL.youtube.handle}
              </a>{" "}
              for the full archive.</em>
            </p>
          )}
        </section>

        <section className="legal-section">
          <h2>Pitch a guest or be on the show</h2>
          <p>
            We pre-record — usually 30–60 minutes of conversation, edited down to ~40
            minutes. Looking for: producers with a perspective, artists at any stage if you
            have a real story, founders building in this space, sneaker historians, anime
            critics, and esports operators.
          </p>
          <p>
            Email <a href={mailto(EMAILS.booking, "PHRHX Show — Guest Pitch")}>{EMAILS.booking}</a> with: who you are, what you'd want to talk about, the
            shortest version of why you'd be interesting on this show. We respond within
            48 hours and usually book within 1–2 weeks.
          </p>
        </section>

        <section className="legal-section">
          <h2>Sponsor an episode</h2>
          <p>
            60-second mid-roll, full-episode title sponsorship, or season-long brand
            partnerships. We turn down sponsors that don't fit the audience —
            sports-betting, get-rich schemes, anything off-brand. See{" "}
            <Link href="/work-with-us">/work-with-us</Link> for the full media kit, or
            email <a href={mailto(EMAILS.partnerships)}>{EMAILS.partnerships}</a>.
          </p>
        </section>

        <p className="legal-foot">
          <Link href="/press">Press kit</Link> ·{" "}
          <Link href="/work-with-us">Sponsor an episode</Link> ·{" "}
          <a href={mailto(EMAILS.booking)}>Pitch a guest</a>
        </p>
      </section>

      <Footer />
    </>
  );
}
