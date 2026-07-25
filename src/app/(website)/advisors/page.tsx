import { advisors } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import { SectionHeading } from "@/components/shared/section-heading";
import { AdvisorCard } from "@/components/website/advisor-card";
import { PageHero } from "@/components/website/page-hero";

export const metadata = buildMetadata(
  "Advisors",
  "Meet the Pinnacle Finance Advisors team and explore the specialties behind our client relationships.",
);

export default function AdvisorsPage() {
  return (
    <>
      <PageHero
        eyebrow="MEET THE TEAM"
        title="Trusted advisors with strategic depth and a personal way of working."
        description="Our team brings calm judgment, coordinated planning, and genuine care to every client relationship."
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="ADVISOR SPOTLIGHT"
            title="A boutique team built for thoughtful, human-centered planning."
            description="We combine financial rigor with the kind of ongoing communication that makes important decisions feel clearer."
          />
          <div
            className={cn(
              "mt-12 grid gap-8",
              advisors.length === 1 ? "mx-auto max-w-[34rem]" : "lg:grid-cols-3",
            )}
          >
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.slug} advisor={advisor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
