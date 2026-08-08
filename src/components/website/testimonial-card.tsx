import type { Testimonial } from "@/types";

import { FadeUp } from "@/components/animations/motion";
import { ContentImage } from "@/components/shared/content-image";

function getInitials(name?: string | null) {
  if (!name) return "PF";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "PF";
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <FadeUp className="flex h-full flex-col justify-between rounded-4xl border border-line bg-white/80 p-6 shadow-soft">
      <p className="text-sm leading-7 text-primary/80">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        {testimonial.clientImageUrl ? (
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <ContentImage src={testimonial.clientImageUrl} alt={testimonial.clientName ?? "Client"} />
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {getInitials(testimonial.clientName)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-primary">{testimonial.clientName ?? "Valued Client"}</p>
          {testimonial.clientTitle ? (
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{testimonial.clientTitle}</p>
          ) : null}
        </div>
      </div>
    </FadeUp>
  );
}
