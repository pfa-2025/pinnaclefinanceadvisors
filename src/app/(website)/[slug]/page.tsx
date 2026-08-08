import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/metadata";
import { formatSectionLabel, getObject, getPublicPage, getPublicSeo, getString, getStringArray } from "@/lib/public-content";

import { FadeUp } from "@/components/animations/motion";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/website/page-hero";

function renderSectionContent(section: Record<string, unknown>) {
  const textEntries = Object.entries(section).filter(
    ([key, value]) =>
      !["eyebrow", "title", "description", "primaryCtaLabel", "primaryCtaHref", "secondaryCtaLabel", "secondaryCtaHref"].includes(key) &&
      typeof value === "string" &&
      value.trim().length > 0,
  );
  const listEntries = Object.entries(section).flatMap(([key, value]) =>
    ["eyebrow", "title", "description", "primaryCtaLabel", "primaryCtaHref", "secondaryCtaLabel", "secondaryCtaHref"].includes(key)
      ? []
      : getStringArray(value),
  );

  return (
    <>
      {textEntries.map(([key, value]) => (
        <FadeUp key={key}>
          <p className="text-base leading-8 text-muted">{getString(value)}</p>
        </FadeUp>
      ))}
      {listEntries.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {listEntries.map((item) => (
            <FadeUp key={item} className="rounded-4xl border border-line bg-white/70 px-5 py-4 text-sm font-medium text-primary shadow-soft">
              {item}
            </FadeUp>
          ))}
        </div>
      ) : null}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, seo] = await Promise.all([getPublicPage(slug).catch(() => null), getPublicSeo("PAGE", slug)]);
  const hero = getObject(page?.contentJson).hero;
  const heroContent = getObject(hero);

  return buildMetadata(
    page?.title ?? formatSectionLabel(slug),
    getString(heroContent.description, page?.summary ?? undefined),
    { path: `/${slug}`, seo },
  );
}

export default async function DynamicCmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, seo] = await Promise.all([getPublicPage(slug).catch(() => null), getPublicSeo("PAGE", slug)]);

  if (!page) notFound();

  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const sections = Object.entries(content).filter(([key]) => key !== "hero");

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <PageHero
        eyebrow={getString(hero.eyebrow, page.title.toUpperCase())}
        title={getString(hero.title, page.title)}
        description={getString(hero.description, page.summary ?? "Explore the latest content from Pinnacle Finance Advisors.")}
        accent={getString(hero.accent)}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell max-w-5xl space-y-12">
          {sections.length === 0 ? (
            <FadeUp>
              <p className="text-base leading-8 text-muted">{page.summary ?? "This page has been published and is ready for content."}</p>
            </FadeUp>
          ) : (
            sections.map(([key, value]) => {
              const section = getObject(value);
              const primaryCtaLabel = getString(section.primaryCtaLabel);
              const primaryCtaHref = getString(section.primaryCtaHref);

              return (
                <div key={key} className="space-y-6">
                  <SectionHeading
                    eyebrow={getString(section.eyebrow, formatSectionLabel(key).toUpperCase())}
                    title={getString(section.title, formatSectionLabel(key))}
                    description={getString(section.description)}
                  />
                  {renderSectionContent(section)}
                  {primaryCtaLabel && primaryCtaHref ? (
                    <ButtonLink href={primaryCtaHref}>{primaryCtaLabel}</ButtonLink>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
