import Image from "next/image";

import { FadeUp, ImageReveal } from "@/components/animations/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/website/page-hero";
import { TestimonialCard } from "@/components/website/testimonial-card";
import { TestimonialForm } from "@/components/website/testimonial-form";
import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicPage, getPublicSeo, getPublicTestimonials, getString, getStringArray } from "@/lib/public-content";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "about");

  return buildMetadata(
    "About",
    "Meet the planning philosophy, advisory mindset, and relationship-centered approach behind Pinnacle Finance Advisors.",
    { path: "/about", seo },
  );
}

export default async function AboutPage() {
  const [page, testimonials, seo] = await Promise.all([
    getPublicPage("about"),
    getPublicTestimonials(),
    getPublicSeo("PAGE", "about"),
  ]);
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const story = getObject(content.story);
  const clientExperience = getObject(content.clientExperience);
  const highlights =
    getStringArray(story.highlights).length > 0
      ? getStringArray(story.highlights)
      : ["Personalized strategy", "Long-term relationships", "Transparent guidance", "Integrated planning"];

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <PageHero
        eyebrow={getString(hero.eyebrow, "ABOUT PINNACLE")}
        title={getString(hero.title, "A boutique advisory experience built on trust, perspective, and long-term partnership.")}
        description={getString(
          hero.description,
          "We help clients navigate important financial decisions with calm guidance, strategic clarity, and a deeply personal planning relationship.",
        )}
        accent={getString(hero.accent, "15+ years of thoughtful guidance across complex financial transitions.")}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={getString(story.eyebrow, "OUR STORY")}
              title={getString(story.title, "Wealth advice that meets people where life really happens.")}
              description={getString(
                story.description,
                "Pinnacle Finance Advisors was built to offer something more intentional than transactional planning. We believe clients deserve strategy that adapts, conversations that stay clear, and guidance that grows with the life behind the balance sheet.",
              )}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <FadeUp key={item} className="rounded-4xl border border-line bg-white/70 px-5 py-4 text-sm font-medium text-primary shadow-soft">
                  {item}
                </FadeUp>
              ))}
            </div>
          </div>
          <div className="relative">
            <ImageReveal className="rounded-[2.8rem]">
              <div className="relative h-[420px] overflow-hidden rounded-[2.8rem] sm:h-[620px]">
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
                  alt="Advisory team conversation"
                  fill
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>
      <section className="px-4 pb-24 sm:px-6 lg:px-10">
        <div className="container-shell rounded-[2.8rem] bg-primary px-6 py-12 text-white shadow-premium sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow={getString(clientExperience.eyebrow, "WHAT CLIENTS FEEL")}
            title={getString(clientExperience.title, "Clarity in the room. Confidence after the meeting.")}
            description={getString(
              clientExperience.description,
              "We design every interaction to reduce noise, create alignment, and help clients leave with a clearer sense of what matters next.",
            )}
            inverted
          />
          <div className="mt-10">
            <ButtonLink href={getString(clientExperience.primaryCtaHref, "/schedule")}>
              {getString(clientExperience.primaryCtaLabel, "Plan Your Future")}
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          {testimonials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : null}
          <div className={`grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start ${testimonials.length > 0 ? "mt-14" : ""}`}>
            <SectionHeading
              eyebrow="SHARE YOUR EXPERIENCE"
              title="Tell us how working with Pinnacle felt."
              description="Your feedback helps us keep improving. Submissions are reviewed by our team before appearing publicly on this page."
            />
            <TestimonialForm />
          </div>
        </div>
      </section>
    </>
  );
}
