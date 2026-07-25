import { buildMetadata } from "@/lib/metadata";

import { FadeUp } from "@/components/animations/motion";
import { PageHero } from "@/components/website/page-hero";

export const metadata = buildMetadata("Privacy Policy");

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        description="A concise explanation of how information is handled, stored, and protected across your interactions with Pinnacle Finance Advisors."
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell max-w-4xl space-y-8">
          {[
            "We collect information you choose to share with us through forms, consultation requests, and direct communication.",
            "Information is used to respond to enquiries, coordinate advisory conversations, and improve the clarity of our service experience.",
            "We do not sell personal information. Access is limited to authorized personnel and service providers supporting operations.",
            "You may contact our team to request updates or removal of submitted information, subject to applicable recordkeeping requirements.",
          ].map((paragraph) => (
            <FadeUp key={paragraph}>
              <p className="text-base leading-8 text-muted">{paragraph}</p>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
