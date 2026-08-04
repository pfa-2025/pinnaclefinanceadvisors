import { getApiBaseUrl } from "@/lib/api";
import type { Advisor, Insight, Service, Stat } from "@/types";

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  error?: { message?: string };
};

export type PublicPageRecord = {
  slug: string;
  title: string;
  template: string;
  summary?: string | null;
  contentJson?: Record<string, unknown> | null;
};

type PublicHomepageRecord = {
  page: PublicPageRecord | null;
  stats: Array<{ label: string; value: string; detail: string }>;
  services: PublicServiceRecord[];
  advisors: PublicAdvisorRecord[];
  insights: PublicInsightRecord[];
};

type PublicServiceRecord = {
  slug: string;
  displayOrder: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  metricLabel: string;
  coverImageUrl?: string | null;
  benefits: Array<{ label: string }>;
};

type PublicAdvisorRecord = {
  slug: string;
  name: string;
  roleTitle: string;
  bio: string;
  email: string;
  phone: string;
  portraitImageUrl?: string | null;
  specializations: Array<{ label: string }>;
};

type PublicInsightRecord = {
  slug: string;
  title: string;
  excerpt: string;
  bodyJson: string[];
  coverImageUrl?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  category?: { name: string } | null;
};

type SitemapEntry = {
  url: string;
  lastModified: string | Date;
};

const fallbackImages = {
  advisor:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  service:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  insight:
    "https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1200&q=80",
};

async function fetchPublic<T>(path: string): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error?.message ?? "Unable to load public content.");
  }

  return payload.data as T;
}

function formatDisplayDate(value?: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function mapService(item: PublicServiceRecord, index: number): Service & { longDescription: string } {
  return {
    slug: item.slug,
    index: String(index + 1).padStart(2, "0"),
    title: item.title,
    description: item.shortDescription,
    longDescription: item.longDescription,
    benefits: item.benefits.map((benefit) => benefit.label),
    image: item.coverImageUrl || fallbackImages.service,
    metric: item.metricLabel,
  };
}

function mapAdvisor(item: PublicAdvisorRecord): Advisor {
  return {
    slug: item.slug,
    name: item.name,
    role: item.roleTitle,
    bio: item.bio,
    specializations: item.specializations.map((entry) => entry.label),
    image: item.portraitImageUrl || fallbackImages.advisor,
    email: item.email,
    phone: item.phone,
  };
}

function mapInsight(item: PublicInsightRecord): Insight {
  return {
    slug: item.slug,
    category: item.category?.name ?? "Insight",
    date: formatDisplayDate(item.publishedAt ?? item.createdAt) || "Unpublished",
    title: item.title,
    description: item.excerpt,
    image: item.coverImageUrl || fallbackImages.insight,
    body: Array.isArray(item.bodyJson) ? item.bodyJson : [],
  };
}

export async function getHomepageContent() {
  const data = await fetchPublic<PublicHomepageRecord>("/public/homepage");

  return {
    page: data.page,
    stats: data.stats as Stat[],
    services: data.services.map(mapService),
    advisors: data.advisors.map(mapAdvisor),
    insights: data.insights.map(mapInsight),
  };
}

export async function getPublicPage(slug: string) {
  return fetchPublic<PublicPageRecord>(`/public/pages/${slug}`);
}

export async function getPublicServices() {
  const services = await fetchPublic<PublicServiceRecord[]>("/public/services");
  return services.map(mapService);
}

export async function getPublicService(slug: string) {
  const service = await fetchPublic<PublicServiceRecord>(`/public/services/${slug}`);
  return mapService(service, service.displayOrder > 0 ? service.displayOrder - 1 : 0);
}

export async function getPublicAdvisors() {
  const advisors = await fetchPublic<PublicAdvisorRecord[]>("/public/advisors");
  return advisors.map(mapAdvisor);
}

export async function getPublicAdvisor(slug: string) {
  const advisor = await fetchPublic<PublicAdvisorRecord>(`/public/advisors/${slug}`);
  return mapAdvisor(advisor);
}

export async function getPublicInsights() {
  const data = await fetchPublic<{ items: PublicInsightRecord[] }>("/public/insights");
  return data.items.map(mapInsight);
}

export async function getPublicInsight(slug: string) {
  const insight = await fetchPublic<PublicInsightRecord>(`/public/insights/${slug}`);
  return mapInsight(insight);
}

export async function getPublicSitemap() {
  const entries = await fetchPublic<SitemapEntry[]>("/public/sitemap");
  return entries.map((entry) => ({
    url: entry.url,
    lastModified: new Date(entry.lastModified),
  }));
}

export function getObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as Record<string, unknown>;
  }

  return value as Record<string, unknown>;
}

export function getString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function getStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function formatSectionLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}
