import Image from "next/image";
import Link from "next/link";

import type { Advisor } from "@/types";

import { FadeUp, ImageReveal } from "@/components/animations/motion";

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <FadeUp>
      <Link href={`/advisors/${advisor.slug}`} className="group block">
        <ImageReveal className="rounded-5xl">
          <div className="relative h-[420px] overflow-hidden rounded-5xl">
            <Image
              src={advisor.image}
              alt={advisor.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </ImageReveal>
        <div className="mt-6 flex items-end justify-between gap-6">
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
