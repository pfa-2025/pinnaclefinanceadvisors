import { getStringArray } from "@/lib/public-content";

const defaultItems = [
  "RETIREMENT PLANNING",
  "WEALTH MANAGEMENT",
  "INVESTMENT STRATEGY",
  "ESTATE PLANNING",
  "FINANCIAL CLARITY",
  "LONG-TERM GROWTH",
];

export function TrustMarquee({ marquee = {} }: { marquee?: Record<string, unknown> }) {
  const items = getStringArray(marquee.items).length > 0 ? getStringArray(marquee.items) : defaultItems;
  const content = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-line bg-white/60 py-5">
      <div className="flex min-w-max animate-marquee gap-6 whitespace-nowrap">
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-sm tracking-[0.32em] text-primary/70"
          >
            {item} <span className="ml-6 text-accent">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
