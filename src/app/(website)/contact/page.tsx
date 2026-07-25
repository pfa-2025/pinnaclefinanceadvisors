import { buildMetadata } from "@/lib/metadata";

import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/website/contact-form";
import { PageHero } from "@/components/website/page-hero";

export const metadata = buildMetadata(
  "Contact",
  "Start a conversation with Pinnacle Finance Advisors about retirement, wealth strategy, or long-term planning.",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let’s begin with the questions that matter most."
        description="Tell us what you're planning for, where decisions feel complex, and how we can support your next move."
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="REACH OUT"
              title="A more personal advisory conversation starts here."
              description="Whether you are planning for retirement, managing growing complexity, or preparing for a major transition, we’re ready to help."
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
              <p>220 Davidson Avenue, Somerset, NJ</p>
              <p>(908) 555-0100</p>
              <p>hello@pinnaclefinanceadvisors.com</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
