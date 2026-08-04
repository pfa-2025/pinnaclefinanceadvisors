import Link from "next/link";

import type { Advisor } from "@/types";

import { FadeUp, ImageReveal } from "@/components/animations/motion";
import { ContentImage } from "@/components/shared/content-image";

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <FadeUp>
      <Link href={`/advisors/${advisor.slug}`} className="group block w-full">
        <ImageReveal className="rounded-5xl">
          <div className="h-[320px] overflow-hidden rounded-5xl sm:h-[420px]">
            <ContentImage
              src={advisor.image}
              alt={advisor.name}
              className="transition duration-700 group-hover:scale-105"
            />
          </div>
        </ImageReveal>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-3xl tracking-[-0.05em] text-primary">
              {advisor.name}
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">{advisor.role}</p>
          </div>
          <span className="text-sm font-semibold text-accent">View Profile</span>
        </div>
      </Link>
    </FadeUp>
  );
}
