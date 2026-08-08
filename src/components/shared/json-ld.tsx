export function JsonLd({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
