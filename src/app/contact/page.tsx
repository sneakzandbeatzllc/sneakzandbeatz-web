import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Contact — Sneakz & Beatz",
  description: "Reach Sneakz & Beatz for press, sponsorships, collaborations, and licensing inquiries.",
};

export default function ContactPage() {
  return (
    <ComingSoon
      eyebrow="Contact"
      title="Get In Touch."
      subtitle="Press, sponsorships, collaborations, and licensing — reach out via email and we'll get back within 48 hours."
      primaryCta={{ label: "Email Us", href: "mailto:blackroyalmusicmedia@gmail.com" }}
      secondaryCta={{ label: "Back To Home", href: "/" }}
    />
  );
}
