import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicAdvisors, getPublicPage, getPublicSeo, getString } from "@/lib/public-content";
import { cn } from "@/lib/utils";

import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { AdvisorCard } from "@/components/website/advisor-card";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "advisors");

  return buildMetadata(
    "Advisors",
    "Meet the Pinnacle Finance Advisors team and explore the specialties behind our client relationships.",
    { path: "/advisors", seo },
  );
}

export default async function AdvisorsPage() {
  const [page, advisors, seo] = await Promise.all([
    getPublicPage("advisors"),
    getPublicAdvisors(),
    getPublicSeo("PAGE", "advisors"),
  ]);
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const spotlight = getObject(content.spotlight);

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <PageHero
        eyebrow={getString(hero.eyebrow, "MEET THE TEAM")}
        title={getString(hero.title, "Trusted advisors with strategic depth and a personal way of working.")}
        description={getString(
          hero.description,
          "Our team brings calm judgment, coordinated planning, and genuine care to every client relationship.",
        )}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow={getString(spotlight.eyebrow, "ADVISOR SPOTLIGHT")}
            title={getString(spotlight.title, "A boutique team built for thoughtful, human-centered planning.")}
            description={getString(
              spotlight.description,
              "We combine financial rigor with the kind of ongoing communication that makes important decisions feel clearer.",
            )}
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
