import { notFound } from "next/navigation";

import { buildMetadata, siteName, siteUrl } from "@/lib/metadata";
import { getPublicAdvisor, getPublicSeo } from "@/lib/public-content";

import { FadeUp, ImageReveal } from "@/components/animations/motion";
import { JsonLd } from "@/components/shared/json-ld";
import { ContentImage } from "@/components/shared/content-image";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [advisor, seo] = await Promise.all([
    getPublicAdvisor(slug).catch(() => null),
    getPublicSeo("ADVISOR", slug),
  ]);

  return buildMetadata(advisor?.name ?? "Advisor", advisor?.bio, { path: `/advisors/${slug}`, seo });
}

export default async function AdvisorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [advisor, seo] = await Promise.all([
    getPublicAdvisor(slug).catch(() => null),
    getPublicSeo("ADVISOR", slug),
  ]);

  if (!advisor) notFound();

  const schema = seo?.schemaJson ?? {
    "@context": "https://schema.org",
    "@type": "Person",
    name: advisor.name,
    jobTitle: advisor.role,
    description: advisor.bio,
    image: advisor.image,
    email: advisor.email,
    telephone: advisor.phone,
    worksFor: { "@type": "FinancialService", name: siteName, url: siteUrl },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="ADVISOR PROFILE"
        title={advisor.name}
        description={advisor.bio}
        accent={advisor.role}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImageReveal className="rounded-[2.8rem]">
            <div className="h-[420px] overflow-hidden rounded-[2.8rem] sm:h-[620px]">
              <ContentImage src={advisor.image} alt={advisor.name} />
            </div>
          </ImageReveal>
          <div>
            <FadeUp>
              <h2 className="section-title text-primary">Areas of Focus</h2>
              <div className="mt-8 grid gap-4">
                {advisor.specializations.map((specialization) => (
                  <div key={specialization} className="rounded-4xl border border-line bg-white/70 p-5 text-sm text-primary shadow-soft">
                    {specialization}
                  </div>
                ))}
              </div>
              <div className="mt-10 space-y-3 text-sm text-muted">
                <p>Email: {advisor.email}</p>
                <p>Phone: {advisor.phone}</p>
              </div>
              <div className="mt-8">
                <ButtonLink href="/schedule">Book a Conversation</ButtonLink>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
