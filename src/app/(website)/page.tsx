import { Homepage } from "@/components/website/homepage";
import { buildMetadata } from "@/lib/metadata";
import { getHomepageContent, getObject, getPublicGallery, getPublicSeo } from "@/lib/public-content";

import { JsonLd } from "@/components/shared/json-ld";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "home");

  return buildMetadata(
    "Defensive; Financial Planning",
    "Premium financial guidance, wealth strategy, and long-term planning built around clarity, confidence, and deeply personal advisory relationships.",
    { path: "/", seo },
  );
}

export default async function HomePage() {
  const [homepage, galleryItems, seo] = await Promise.all([
    getHomepageContent(),
    getPublicGallery(),
    getPublicSeo("PAGE", "home"),
  ]);

  return (
    <>
      {seo?.schemaJson ? <JsonLd data={seo.schemaJson} /> : null}
      <Homepage
        advisors={homepage.advisors}
        galleryItems={galleryItems}
        homepageStats={homepage.stats}
        insights={homepage.insights}
        page={getObject(homepage.page?.contentJson)}
        services={homepage.services}
      />
    </>
  );
}
