import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "Work With Us — Sneakz & Beatz",
  description: "Editor, designer, and creator opportunities at Sneakz & Beatz.",
};

export default function WorkWithUsPage() {
  return (
    <ComingSoon
      eyebrow="Work With Us"
      title="We're Hiring (Soon)."
      subtitle="Editors, designers, video cutters, and creators — Sneakz & Beatz is building a roster. The roles page is being put together; reach out via email in the meantime."
      primaryCta={{ label: "Email Us", href: "mailto:blackroyalmusicmedia@gmail.com" }}
      secondaryCta={{ label: "Back To Home", href: "/" }}
    />
  );
}
