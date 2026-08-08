import type { Metadata } from "next";

import type { PublicSeoRecord } from "@/lib/public-content";

export const siteName = "Pinnacle Finance Advisors";
export const siteUrl = "https://www.pinnaclefinanceadvisors.com";
const defaultDescription =
  "Premium financial guidance, wealth strategy, and long-term planning built around clarity, confidence, and deeply personal advisory relationships.";

export function buildMetadata(
  title: string,
  description = defaultDescription,
  options?: { path?: string; seo?: PublicSeoRecord | null },
): Metadata {
  const seo = options?.seo;
  const resolvedTitle = seo?.metaTitle || title;
  const resolvedDescription = seo?.metaDescription || description;
  const ogTitle = seo?.ogTitle || resolvedTitle;
  const ogDescription = seo?.ogDescription || resolvedDescription;
  const canonical = seo?.canonicalUrl || (options?.path ? `${siteUrl}${options.path}` : undefined);
  const robotsIndex = seo?.robotsIndex ?? true;
  const robotsFollow = seo?.robotsFollow ?? true;

  return {
    // An admin-authored SEO override is treated as the exact, final title (bypassing the
    // root layout's "%s | Site Name" template); the code-default title still goes through it.
    title: seo?.metaTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: canonical ? { canonical } : undefined,
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },
    openGraph: {
      title: `${ogTitle} | ${siteName}`,
      description: ogDescription,
      siteName,
      type: "website",
      ...(seo?.ogImageUrl ? { images: [{ url: seo.ogImageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${ogTitle} | ${siteName}`,
      description: ogDescription,
      ...(seo?.ogImageUrl ? { images: [seo.ogImageUrl] } : {}),
    },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    title: siteName,
    description: defaultDescription,
    siteName,
    type: "website",
  },
};
