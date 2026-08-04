import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/metadata";
import { getPublicInsight } from "@/lib/public-content";

import { ImageReveal } from "@/components/animations/motion";
import { ContentImage } from "@/components/shared/content-image";
import { PageHero } from "@/components/website/page-hero";
import { RichArticle } from "@/components/website/rich-article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublicInsight(slug).catch(() => null);

  return buildMetadata(article?.title ?? "Article", article?.description);
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublicInsight(slug).catch(() => null);

  if (!article) notFound();

  return (
    <>
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
