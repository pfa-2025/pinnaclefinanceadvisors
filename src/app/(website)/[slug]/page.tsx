import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import {
  formatSectionLabel,
  getObject,
  getPublicAffiliateOffers,
  getPublicPage,
  getPublicSeo,
  getString,
  getStringArray,
  type PublicAffiliateOffer,
} from "@/lib/public-content";
import { buildMetadata } from "@/lib/metadata";
import { getWebsitePreviewUrl } from "@/lib/website-preview";

import { FadeUp } from "@/components/animations/motion";
import { ContentImage } from "@/components/shared/content-image";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/website/page-hero";

function SectionBlock({ sectionKey, value }: { sectionKey: string; value: unknown }) {
  const section = getObject(value);
  const primaryCtaLabel = getString(section.primaryCtaLabel);
  const primaryCtaHref = getString(section.primaryCtaHref);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow={getString(section.eyebrow, formatSectionLabel(sectionKey).toUpperCase())}
        title={getString(section.title, formatSectionLabel(sectionKey))}
        description={getString(section.description)}
      />
      {renderSectionContent(section)}
      {primaryCtaLabel && primaryCtaHref ? <ButtonLink href={primaryCtaHref}>{primaryCtaLabel}</ButtonLink> : null}
    </div>
  );
}

function AffiliateOffersSection({ offers }: { offers: PublicAffiliateOffer[] }) {
  if (offers.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="CURRENT OFFERS"
        title="Active partner offers."
        description="Coupon codes currently available through our affiliate partners."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {offers.map((offer) => {
          const previewUrl = offer.brandUrl ? getWebsitePreviewUrl(offer.brandUrl) : null;

          return (
            <FadeUp
              key={offer.id}
              className="overflow-hidden rounded-4xl border border-line bg-white/70 shadow-soft"
            >
              {previewUrl ? (
                <div className="aspect-video w-full overflow-hidden bg-primary/5">
                  <ContentImage src={previewUrl} alt={`${offer.brandName} website preview`} />
                </div>
              ) : null}
              <div className="space-y-3 px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary">{offer.brandName}</p>
                  <span className="rounded-full bg-primary/6 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-primary">
                    {offer.couponCode}
                  </span>
                </div>
                <p className="text-sm leading-6 text-muted">{offer.message}</p>
                {offer.brandUrl ? (
                  <a
                    href={offer.brandUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                  >
                    Visit {offer.brandName}
                    <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  );
}

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
  const [page, seo, affiliateOffers] = await Promise.all([
    getPublicPage(slug).catch(() => null),
    getPublicSeo("PAGE", slug),
    slug === "affiliation" ? getPublicAffiliateOffers() : Promise.resolve([]),
  ]);

  if (!page) notFound();

  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const isAffiliationPage = slug === "affiliation";
  const sections = Object.entries(content).filter(([key]) => key !== "hero" && !(isAffiliationPage && key === "cta"));
  const ctaSection = isAffiliationPage && content.cta ? (["cta", content.cta] as const) : null;

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
          {sections.length === 0 && !isAffiliationPage ? (
            <FadeUp>
              <p className="text-base leading-8 text-muted">{page.summary ?? "This page has been published and is ready for content."}</p>
            </FadeUp>
          ) : (
            sections.map(([key, value]) => <SectionBlock key={key} sectionKey={key} value={value} />)
          )}
          {isAffiliationPage ? <AffiliateOffersSection offers={affiliateOffers} /> : null}
          {ctaSection ? <SectionBlock sectionKey={ctaSection[0]} value={ctaSection[1]} /> : null}
        </div>
      </section>
    </>
  );
}
