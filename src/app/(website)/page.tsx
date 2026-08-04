import { Homepage } from "@/components/website/homepage";
import { getHomepageContent, getObject } from "@/lib/public-content";

export default async function HomePage() {
  const homepage = await getHomepageContent();

  return (
    <Homepage
      advisors={homepage.advisors}
      homepageStats={homepage.stats}
      insights={homepage.insights}
      page={getObject(homepage.page?.contentJson)}
      services={homepage.services}
    />
  );
}
