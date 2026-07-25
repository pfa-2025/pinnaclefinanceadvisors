import Image from "next/image";
import Link from "next/link";

import type { Insight } from "@/types";

import { FadeUp, ImageReveal } from "@/components/animations/motion";

export function InsightCard({
  insight,
  featured = false,
}: {
  insight: Insight;
  featured?: boolean;
}) {
  return (
    <FadeUp className={featured ? "lg:row-span-2" : ""}>
      <Link href={`/insights/${insight.slug}`} className="group block">
        <ImageReveal className="rounded-5xl">
          <div className={`relative overflow-hidden rounded-5xl ${featured ? "h-[420px]" : "h-[280px]"}`}>
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </ImageReveal>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">
            {insight.category} • {insight.date}
          </p>
          <h3 className={`mt-4 font-display tracking-[-0.05em] text-primary ${featured ? "text-3xl" : "text-2xl"}`}>
            {insight.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{insight.description}</p>
          <span className="mt-5 inline-flex text-sm font-semibold text-primary">
            Read Article
          </span>
        </div>
      </Link>
    </FadeUp>
  );
}
