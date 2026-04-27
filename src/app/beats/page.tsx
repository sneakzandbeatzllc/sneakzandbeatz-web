import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Beat Store — Sneakz & Beatz",
  description: "Hard-hitting production for artists who move different. Lease, exclusive, and stem options.",
};

export default function BeatStorePage() {
  return (
    <ComingSoon
      eyebrow="Beat Store"
      title="Beats Loading."
      subtitle="The locally hosted Beat Store is in production — full catalog with previews, leases, and exclusive licensing dropping soon. Subscribe and we'll send the launch link."
      primaryCta={{ label: "Subscribe On Substack", href: "https://sneakzandbeatz.substack.com" }}
      secondaryCta={{ label: "Back To Home", href: "/" }}
    />
  );
}
