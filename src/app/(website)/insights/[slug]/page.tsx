import Image from "next/image";
import { notFound } from "next/navigation";

import { insights } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

import { ImageReveal } from "@/components/animations/motion";
import { PageHero } from "@/components/website/page-hero";
import { RichArticle } from "@/components/website/rich-article";

export async function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);

  return buildMetadata(article?.title ?? "Article", article?.description);
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);

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
            <div className="relative h-[520px] overflow-hidden rounded-[2.8rem]">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
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
