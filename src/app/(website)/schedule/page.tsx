import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicPage, getString } from "@/lib/public-content";

import { contactDetails } from "@/constants/contact";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScheduleForm } from "@/components/website/schedule-form";
import { PageHero } from "@/components/website/page-hero";

export const metadata = buildMetadata(
  "Schedule Consultation",
  "Request a consultation with Pinnacle Finance Advisors and start a more personalized planning conversation.",
);

export default async function SchedulePage() {
  const page = await getPublicPage("schedule");
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const expectations = getObject(content.expectations);

  return (
    <>
      <PageHero
        eyebrow={getString(hero.eyebrow, "SCHEDULE CONSULTATION")}
        title={getString(hero.title, "Reserve time for a conversation designed around your goals.")}
        description={getString(
          hero.description,
          "Choose a planning focus, share what matters most right now, and our team will confirm the right next step.",
        )}
        actions={
          <>
            <a
              href={contactDetails.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-transparent bg-white px-5 py-2.5 text-[0.92rem] font-semibold !text-primary transition duration-300 hover:bg-white/90 hover:!text-primary"
            >
              Book 30-Minute Meeting
            </a>
            <a
              href={`mailto:${contactDetails.email}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/18 bg-white/6 px-5 py-2.5 text-[0.92rem] font-semibold text-white transition duration-300 hover:bg-white/12"
            >
              Email Our Team
            </a>
          </>
        }
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={getString(expectations.eyebrow, "WHAT TO EXPECT")}
              title={getString(expectations.title, "A first meeting built for clarity, not pressure.")}
              description={getString(
                expectations.description,
                "We use the initial conversation to understand your priorities, map context, and identify where the most meaningful opportunities for planning may be.",
              )}
            />
            <a
              href={contactDetails.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-[#f4f8f8]"
            >
              Prefer instant booking? Open Calendly
            </a>
          </div>
          <ScheduleForm />
        </div>
      </section>
    </>
  );
}
