import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Licensing — Sneakz & Beatz",
  description: "Lease and exclusive beat licensing options from Sneakz & Beatz.",
};

export default function LicensingPage() {
  return (
    <ComingSoon
      eyebrow="Licensing"
      title="Beat Licensing — Coming Soon."
      subtitle="Lease, exclusive, and stem licensing options for every beat in the store. Detailed terms and pricing tiers dropping with the full Beat Store launch."
      primaryCta={{ label: "Subscribe For Launch", href: "https://sneakzandbeatz.substack.com" }}
      secondaryCta={{ label: "Beat Store", href: "/beats" }}
    />
  );
}
