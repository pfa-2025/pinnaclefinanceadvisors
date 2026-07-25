import { services } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

import { SectionHeading } from "@/components/shared/section-heading";
import { PageHero } from "@/components/website/page-hero";
import { ServiceShowcase } from "@/components/website/service-showcase";

export const metadata = buildMetadata(
  "Expertise",
  "Explore Pinnacle Finance Advisors services across retirement, wealth, tax, estate, and protection strategy.",
);

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="OUR EXPERTISE"
        title="Sophisticated strategies shaped around the life you are building."
        description="Retirement readiness, wealth alignment, tax-aware decisions, and long-range planning coordinated into one thoughtful advisory relationship."
      />
      <section className="section-space bg-primary-deep px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="SERVICE PLATFORM"
            title="A connected planning approach, not isolated recommendations."
            description="Each discipline supports the others so decisions stay aligned across transitions, opportunities, and long-term priorities."
            inverted
          />
          <div className="mt-12">
            <ServiceShowcase services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
