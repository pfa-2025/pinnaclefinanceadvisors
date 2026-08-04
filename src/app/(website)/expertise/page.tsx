import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicPage, getPublicServices, getString } from "@/lib/public-content";

import { SectionHeading } from "@/components/shared/section-heading";
import { PageHero } from "@/components/website/page-hero";
import { ServiceShowcase } from "@/components/website/service-showcase";

export const metadata = buildMetadata(
  "Expertise",
  "Explore Pinnacle Finance Advisors services across retirement, wealth, tax, estate, and protection strategy.",
);

export default async function ExpertisePage() {
  const [page, services] = await Promise.all([getPublicPage("expertise"), getPublicServices()]);
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const platform = getObject(content.platform);

  return (
    <>
      <PageHero
        eyebrow={getString(hero.eyebrow, "OUR EXPERTISE")}
        title={getString(hero.title, "Sophisticated strategies shaped around the life you are building.")}
        description={getString(
          hero.description,
          "Retirement readiness, wealth alignment, tax-aware decisions, and long-range planning coordinated into one thoughtful advisory relationship.",
        )}
      />
      <section className="section-space bg-primary-deep px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow={getString(platform.eyebrow, "SERVICE PLATFORM")}
            title={getString(platform.title, "A connected planning approach, not isolated recommendations.")}
            description={getString(
              platform.description,
              "Each discipline supports the others so decisions stay aligned across transitions, opportunities, and long-term priorities.",
            )}
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
