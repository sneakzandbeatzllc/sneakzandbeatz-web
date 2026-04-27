import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Terms of Use — Sneakz & Beatz",
};

export default function TermsPage() {
  return (
    <ComingSoon
      eyebrow="Legal"
      title="Terms Of Use — Coming Soon."
      subtitle="The full Terms of Use is being finalized with counsel. Beat licensing terms (lease, exclusive, custom) will live with each beat in the Beat Store and are also covered here when published."
      primaryCta={{ label: "Email Legal Questions", href: "mailto:blackroyalmusicmedia@gmail.com?subject=Terms" }}
      secondaryCta={{ label: "Back To Home", href: "/" }}
    />
  );
}
