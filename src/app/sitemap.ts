import type { MetadataRoute } from "next";

import { getPublicSitemap } from "@/lib/public-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getPublicSitemap();
}
