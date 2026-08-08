import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicInsights, getPublicPage, getPublicSeo, getString } from "@/lib/public-content";

import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { InsightCard } from "@/components/website/insight-card";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "insights");

  return buildMetadata(
    "Insights",
    "Explore editorial perspective on retirement, tax strategy, legacy planning, and long-term financial decision-making.",
    { path: "/insights", seo },
  );
}

export default async function InsightsPage() {
  const [page, insights, seo] = await Promise.all([
    getPublicPage("insights"),
    getPublicInsights(),
    getPublicSeo("PAGE", "insights"),
  ]);
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const editorial = getObject(content.editorial);
  const featuredInsight = insights[0];

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <PageHero
        eyebrow={getString(hero.eyebrow, "INSIGHTS")}
        title={getString(hero.title, "Perspective for what's next in your financial life.")}
        description={getString(
          hero.description,
          "Thoughtful commentary on planning decisions, transitions, and the questions that shape long-term confidence.",
        )}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow={getString(editorial.eyebrow, "EDITORIAL")}
            title={getString(editorial.title, "Modern financial thinking with a calm, practical lens.")}
            description={getString(
              editorial.description,
              "We write for clients who want clarity more than noise and strategy more than headlines.",
            )}
          />
          {featuredInsight ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <InsightCard insight={featuredInsight} featured />
              <div className="grid gap-8">
                {insights.slice(1).map((insight) => (
                  <InsightCard key={insight.slug} insight={insight} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
