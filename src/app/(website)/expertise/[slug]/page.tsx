import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/metadata";
import { getPublicService } from "@/lib/public-content";

import { FadeUp, ImageReveal } from "@/components/animations/motion";
import { ContentImage } from "@/components/shared/content-image";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getPublicService(slug).catch(() => null);

  if (!service) return buildMetadata("Service");

  return buildMetadata(service.title, service.description);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getPublicService(slug).catch(() => null);

  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow={`SERVICE ${service.index}`}
        title={service.title}
        description={service.description}
        accent={service.metric}
        actions={
          <>
            <ButtonLink href="/schedule">Schedule a Consultation</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask a Question
            </ButtonLink>
          </>
        }
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit) => (
                <FadeUp key={benefit} className="rounded-4xl border border-line bg-white/70 p-5 shadow-soft">
                  <p className="text-sm font-medium text-primary">{benefit}</p>
                </FadeUp>
              ))}
            </div>
            <FadeUp className="mt-8 max-w-3xl text-lg leading-8 text-muted">
              {service.longDescription ??
                "Our role is to make this area of your financial life easier to understand, easier to coordinate, and more resilient as your priorities evolve."}
            </FadeUp>
          </div>
          <ImageReveal className="rounded-[2.8rem]">
            <div className="h-[380px] overflow-hidden rounded-[2.8rem] sm:h-[520px]">
              <ContentImage src={service.image} alt={service.title} />
            </div>
          </ImageReveal>
        </div>
      </section>
    </>
  );
}
