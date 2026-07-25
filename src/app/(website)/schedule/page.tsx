import { buildMetadata } from "@/lib/metadata";

import { SectionHeading } from "@/components/shared/section-heading";
import { ScheduleForm } from "@/components/website/schedule-form";
import { PageHero } from "@/components/website/page-hero";

export const metadata = buildMetadata(
  "Schedule Consultation",
  "Request a consultation with Pinnacle Finance Advisors and start a more personalized planning conversation.",
);

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="SCHEDULE CONSULTATION"
        title="Reserve time for a conversation designed around your goals."
        description="Choose a planning focus, share what matters most right now, and our team will confirm the right next step."
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="WHAT TO EXPECT"
              title="A first meeting built for clarity, not pressure."
              description="We use the initial conversation to understand your priorities, map context, and identify where the most meaningful opportunities for planning may be."
            />
          </div>
          <ScheduleForm />
        </div>
      </section>
    </>
  );
}
