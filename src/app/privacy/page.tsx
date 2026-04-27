import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Privacy Policy — Sneakz & Beatz",
};

export default function PrivacyPage() {
  return (
    <ComingSoon
      eyebrow="Legal"
      title="Privacy Policy — Coming Soon."
      subtitle="The full privacy policy is being finalized with counsel. In short: we collect what's necessary to deliver the experience, we don't sell your data, and you can email us to remove anything we have on you."
      primaryCta={{ label: "Email Privacy Questions", href: "mailto:blackroyalmusicmedia@gmail.com?subject=Privacy" }}
      secondaryCta={{ label: "Back To Home", href: "/" }}
    />
  );
}
