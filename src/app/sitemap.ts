import type { MetadataRoute } from "next";

import { advisors, insights, services } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.pinnaclefinanceadvisors.com";

  const staticRoutes = [
    "",
    "/about",
    "/expertise",
    "/advisors",
    "/insights",
    "/contact",
    "/schedule",
    "/privacy",
    "/terms",
    "/admin/login",
    "/admin/dashboard",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/expertise/${service.slug}`,
    lastModified: new Date(),
  }));

  const advisorRoutes = advisors.map((advisor) => ({
    url: `${baseUrl}/advisors/${advisor.slug}`,
    lastModified: new Date(),
  }));

  const insightRoutes = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...advisorRoutes, ...insightRoutes];
}
