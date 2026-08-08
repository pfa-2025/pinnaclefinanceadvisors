import type { GalleryItem } from "@/types";

import { buildMetadata } from "@/lib/metadata";
import { getPublicGallery, getPublicSeo } from "@/lib/public-content";
import { getVideoEmbedUrl } from "@/lib/video-embed";

import { FadeUp } from "@/components/animations/motion";
import { JsonLd } from "@/components/shared/json-ld";
import { ContentImage } from "@/components/shared/content-image";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "gallery");

  return buildMetadata(
    "Gallery",
    "Photos and videos from Pinnacle Finance Advisors — client events, community moments, and behind-the-scenes.",
    { path: "/gallery", seo },
  );
}

export default async function GalleryPage() {
  const [items, seo] = await Promise.all([getPublicGallery(), getPublicSeo("PAGE", "gallery")]);

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <PageHero
        eyebrow="GALLERY"
        title="Moments from the Pinnacle Finance Advisors community."
        description="A look at our team, events, and the relationships behind the work we do."
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell">
          {items.length === 0 ? (
            <p className="text-base leading-8 text-muted">New photos and videos are on the way. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <GalleryTile key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function GalleryTile({ item }: { item: GalleryItem }) {
  const embedUrl = item.mediaType === "VIDEO" && item.videoUrl ? getVideoEmbedUrl(item.videoUrl) : null;

  return (
    <FadeUp className="overflow-hidden rounded-4xl border border-line bg-white/70 shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
        {item.mediaType === "IMAGE" && item.imageUrl ? (
          <ContentImage src={item.imageUrl} alt={item.title ?? "Gallery image"} />
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title={item.title ?? "Gallery video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : null}
      </div>
      {item.title || item.caption ? (
        <div className="p-5">
          {item.title ? <p className="text-sm font-semibold text-primary">{item.title}</p> : null}
          {item.caption ? <p className="mt-1 text-sm text-muted">{item.caption}</p> : null}
        </div>
      ) : null}
    </FadeUp>
  );
}
