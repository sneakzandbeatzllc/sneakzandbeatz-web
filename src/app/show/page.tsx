import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "The PHRHX Show — Sneakz & Beatz",
  description: "Real conversations. Zero filter. The PHRHX Show explores the moments shaping our culture.",
};

export default function ShowPage() {
  return (
    <ComingSoon
      eyebrow="The PHRHX Show"
      title="Real Conversations. Zero Filter."
      subtitle="Episodes drop weekly across sneakers, hip-hop, anime, and gaming. The full archive page is being built — for now, watch on YouTube or Spotify."
      primaryCta={{ label: "Watch On YouTube", href: "https://youtube.com/@SneakzandBeatz" }}
      secondaryCta={{ label: "Back To Home", href: "/" }}
    />
  );
}
