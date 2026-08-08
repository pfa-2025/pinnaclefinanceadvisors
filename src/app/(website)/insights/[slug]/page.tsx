import { notFound } from "next/navigation";

import { buildMetadata, siteName } from "@/lib/metadata";
import { getPublicInsight, getPublicSeo } from "@/lib/public-content";

import { ImageReveal } from "@/components/animations/motion";
import { JsonLd } from "@/components/shared/json-ld";
import { ContentImage } from "@/components/shared/content-image";
import { PageHero } from "@/components/website/page-hero";
import { RichArticle } from "@/components/website/rich-article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, seo] = await Promise.all([
    getPublicInsight(slug).catch(() => null),
    getPublicSeo("INSIGHT", slug),
  ]);

  return buildMetadata(article?.title ?? "Article", article?.description, { path: `/insights/${slug}`, seo });
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, seo] = await Promise.all([
    getPublicInsight(slug).catch(() => null),
    getPublicSeo("INSIGHT", slug),
  ]);

  if (!article) notFound();

  const schema = seo?.schemaJson ?? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    articleSection: article.category,
    publisher: { "@type": "Organization", name: siteName },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow={`${article.category} • ${article.date}`}
        title={article.title}
        description={article.description}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          <ImageReveal className="rounded-[2.8rem]">
            <div className="h-[320px] overflow-hidden rounded-[2.8rem] sm:h-[520px]">
              <ContentImage src={article.image} alt={article.title} />
            </div>
          </ImageReveal>
          <div className="mt-12">
            <RichArticle paragraphs={article.body} />
          </div>
        </div>
      </section>
    </>
  );
}
