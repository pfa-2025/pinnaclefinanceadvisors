import type { Metadata } from "next";

const siteName = "Pinnacle Finance Advisors";
const defaultDescription =
  "Premium financial guidance, wealth strategy, and long-term planning built around clarity, confidence, and deeply personal advisory relationships.";

export function buildMetadata(
  title: string,
  description = defaultDescription,
): Metadata {
  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://www.pinnaclefinanceadvisors.com"),
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
