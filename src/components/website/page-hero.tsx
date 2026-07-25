import type { ReactNode } from "react";

import { FadeUp, TextReveal } from "@/components/animations/motion";
import { ButtonLink } from "@/components/ui/button";

export function PageHero({
  eyebrow,
  title,
  description,
  accent,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary px-4 pb-16 pt-36 text-white sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-hero-radial opacity-90" />
      <div className="absolute inset-0 bg-grid bg-[size:72px_72px] opacity-[0.06]" />
      <div className="container-shell relative">
        <FadeUp className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
            <TextReveal text={title} />
          </h1>
          {accent ? <div className="mt-4 text-lg text-accent-soft">{accent}</div> : null}
          <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/70 sm:text-base">
            {description}
          </p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          {!actions ? (
            <div className="mt-8">
              <ButtonLink href="/schedule" variant="secondary">
                Schedule a Consultation
              </ButtonLink>
            </div>
          ) : null}
        </FadeUp>
      </div>
    </section>
  );
}
