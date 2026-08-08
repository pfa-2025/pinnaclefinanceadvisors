import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicPage, getPublicSeo, getString } from "@/lib/public-content";

import { contactDetails, socialLinks } from "@/constants/contact";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/website/contact-form";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "contact");

  return buildMetadata(
    "Contact",
    "Start a conversation with Pinnacle Finance Advisors about retirement, wealth strategy, or long-term planning.",
    { path: "/contact", seo },
  );
}

export default async function ContactPage() {
  const [page, seo] = await Promise.all([getPublicPage("contact"), getPublicSeo("PAGE", "contact")]);
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const reachOut = getObject(content.reachOut);

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <PageHero
        eyebrow={getString(hero.eyebrow, "CONTACT")}
        title={getString(hero.title, "Let's begin with the questions that matter most.")}
        description={getString(
          hero.description,
          "Tell us what you're planning for, where decisions feel complex, and how we can support your next move.",
        )}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={getString(reachOut.eyebrow, "REACH OUT")}
              title={getString(reachOut.title, "A more personal advisory conversation starts here.")}
              description={getString(
                reachOut.description,
                "Whether you are planning for retirement, managing growing complexity, or preparing for a major transition, we're ready to help.",
              )}
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
              <p>{contactDetails.address}</p>
              <p>{contactDetails.phone}</p>
              <p>{contactDetails.email}</p>
              <a
                href={contactDetails.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-primary transition hover:text-accent"
              >
                Schedule directly on Calendly
              </a>
            </div>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Follow Us</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-primary transition hover:bg-[#f4f8f8]"
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
