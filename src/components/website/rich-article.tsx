import { FadeUp } from "@/components/animations/motion";

export function RichArticle({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-8">
      {paragraphs.map((paragraph) => (
        <FadeUp key={paragraph}>
          <p className="max-w-3xl text-lg leading-9 text-muted">{paragraph}</p>
        </FadeUp>
      ))}
    </div>
  );
}
