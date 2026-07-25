import { FadeUp } from "@/components/animations/motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <FadeUp className="max-w-3xl">
      <p
        className={`text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${
          inverted ? "text-accent-soft" : "text-accent"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`section-title mt-4 max-w-[16ch] text-balance ${
          inverted ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-2xl text-[0.98rem] leading-7 ${inverted ? "text-white/68" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </FadeUp>
  );
}
