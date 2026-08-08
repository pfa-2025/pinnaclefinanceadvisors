import { buildMetadata } from "@/lib/metadata";
import { getObject, getPublicPage, getPublicSeo, getString, getStringArray } from "@/lib/public-content";

import { FadeUp } from "@/components/animations/motion";
import { PageHero } from "@/components/website/page-hero";

export async function generateMetadata() {
  const seo = await getPublicSeo("PAGE", "terms");

  return buildMetadata("Terms & Conditions", undefined, { path: "/terms", seo });
}

export default async function TermsPage() {
  const page = await getPublicPage("terms");
  const content = getObject(page.contentJson);
  const hero = getObject(content.hero);
  const body = getObject(content.body);
  const paragraphs =
    getStringArray(body.paragraphs).length > 0
      ? getStringArray(body.paragraphs)
      : [
          "Website content is provided for general informational purposes and does not constitute individualized financial, investment, legal, or tax advice.",
          "Any planning discussion or consultation request submitted through this website does not establish an advisory relationship until formally confirmed.",
          "We aim for accurate content, but information may change over time and should be reviewed in the context of your personal circumstances.",
          "By using this site, you agree not to misuse forms, content, or access methods intended for ordinary client communication.",
        ];

  return (
    <>
      <PageHero
        eyebrow={getString(hero.eyebrow, "LEGAL")}
        title={getString(hero.title, "Terms & Conditions")}
        description={getString(
          hero.description,
          "Important information about the use of this website, informational content, and the scope of advisory communication.",
        )}
      />
      <section className="section-space px-4 sm:px-6 lg:px-10">
        <div className="container-shell max-w-4xl space-y-8">
          {paragraphs.map((paragraph) => (
            <FadeUp key={paragraph}>
              <p className="text-base leading-8 text-muted">{paragraph}</p>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
