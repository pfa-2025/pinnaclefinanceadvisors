"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { adminGet } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { ChartCard } from "@/components/admin/chart-card";
import { type AdminTableRow, DataTable } from "@/components/admin/data-table";
import { StatCard } from "@/components/admin/stat-card";

type DashboardStat = {
  label: string;
  value: string;
  delta: string;
};

type DashboardSummary = {
  eyebrow: string;
  title: string;
  description: string;
};

type DashboardQuickAction = {
  label: string;
  detail: string;
  href: string;
};

type DashboardChartPoint = {
  name: string;
  contentUpdates: number;
  enquiries: number;
  consultations: number;
};

type PublishingCounts = {
  published: number;
  draft: number;
  review: number;
  archived: number;
};

type DashboardEnquiry = {
  id: string;
  name: string;
  focus: string;
  status: string;
  createdAt: string;
};

type DashboardConsultation = {
  id: string;
  name: string;
  advisor: string;
  date: string;
  status: string;
};

type DashboardResponse = {
  summary: DashboardSummary;
  stats: DashboardStat[];
  charts: DashboardChartPoint[];
  quickActions: DashboardQuickAction[];
  publishing: {
    homepageStatus: string | null;
    pages: PublishingCounts;
    services: PublishingCounts;
    insights: PublishingCounts;
  };
  recentEnquiries: DashboardEnquiry[];
  upcomingConsultations: DashboardConsultation[];
};

type PageLikeItem = {
  id: string;
  title: string;
  slug: string;
  status: string;
  updatedAt: string;
};

type ServiceItem = {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
  metricLabel: string;
};

type InsightItem = {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
  category?: { name: string } | null;
};

type ListResponse<T> = {
  items: T[];
};

type SnapshotItem = {
  label: string;
  detail: string;
};

const dashboardResponseSchema = z.object({
  summary: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      delta: z.string(),
    }),
  ),
  charts: z.array(
    z.object({
      name: z.string(),
      contentUpdates: z.number(),
      enquiries: z.number(),
      consultations: z.number(),
    }),
  ),
  quickActions: z.array(
    z.object({
      label: z.string(),
      detail: z.string(),
      href: z.string(),
    }),
  ),
  publishing: z.object({
    homepageStatus: z.string().nullable(),
    pages: z.object({
      published: z.number(),
      draft: z.number(),
      review: z.number(),
      archived: z.number(),
    }),
    services: z.object({
      published: z.number(),
      draft: z.number(),
      review: z.number(),
      archived: z.number(),
    }),
    insights: z.object({
      published: z.number(),
      draft: z.number(),
      review: z.number(),
      archived: z.number(),
    }),
  }),
  recentEnquiries: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      focus: z.string(),
      status: z.string(),
      createdAt: z.string(),
    }),
  ),
  upcomingConsultations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      advisor: z.string(),
      date: z.string(),
      status: z.string(),
    }),
  ),
});

function buildContentRows(pages: PageLikeItem[], insights: InsightItem[]): AdminTableRow[] {
  return [...pages, ...insights]
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status,
      updated: formatAdminDate(item.updatedAt),
      owner: "slug" in item ? item.slug : item.category?.name ?? "Editorial",
    }));
}

function buildServiceRows(services: ServiceItem[]): AdminTableRow[] {
  return services.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    updated: formatAdminDate(item.updatedAt),
    owner: item.metricLabel,
  }));
}

function buildSnapshot(overview: DashboardResponse): SnapshotItem[] {
  return [
    {
      label: "Homepage",
      detail: overview.publishing.homepageStatus
        ? `Current status: ${overview.publishing.homepageStatus}`
        : "Homepage content has not been created yet.",
    },
    {
      label: "Pages",
      detail: `${overview.publishing.pages.published} published, ${overview.publishing.pages.draft} draft, ${overview.publishing.pages.review} in review`,
    },
    {
      label: "Services",
      detail: `${overview.publishing.services.published} published, ${overview.publishing.services.draft} draft, ${overview.publishing.services.review} in review`,
    },
    {
      label: "Insights",
      detail: `${overview.publishing.insights.published} published, ${overview.publishing.insights.draft} draft, ${overview.publishing.insights.review} in review`,
    },
  ];
}

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<DashboardResponse | null>(null);
  const [pages, setPages] = useState<PageLikeItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError(null);

      try {
        const [dashboardData, pageData, serviceData, insightData] = await Promise.all([
          adminGet<DashboardResponse>("/admin/dashboard"),
          adminGet<ListResponse<PageLikeItem>>("/admin/pages?limit=100"),
          adminGet<ListResponse<ServiceItem>>("/admin/services?limit=100"),
          adminGet<ListResponse<InsightItem>>("/admin/insights?limit=100"),
        ]);

        setOverview(dashboardResponseSchema.parse(dashboardData));
        setPages(pageData.items);
        setServices(serviceData.items);
        setInsights(insightData.items);
      } catch (loadError) {
        setOverview(null);
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  const contentRows = useMemo(() => buildContentRows(pages, insights), [insights, pages]);
  const serviceRows = useMemo(() => buildServiceRows(services), [services]);
  const snapshotItems = useMemo(() => (overview ? buildSnapshot(overview) : []), [overview]);
  const chartData = overview?.charts.slice(-6) ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-5xl bg-primary px-6 py-8 text-white shadow-premium">
        {overview ? (
          <>
            <p className="text-xs uppercase tracking-[0.26em] text-accent-soft">{overview.summary.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">{overview.summary.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">{overview.summary.description}</p>
          </>
        ) : (
          <p className="text-sm text-white/70">Loading live dashboard...</p>
        )}
      </section>

      {error ? (
        <div className="rounded-5xl bg-white p-6 text-sm text-red-500 shadow-soft">{error}</div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(overview?.stats ?? []).map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} delta={stat.delta} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ChartCard title="Content Updates" dataKey="contentUpdates" data={chartData} />
        </div>
        <div className="rounded-5xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Quick Actions</p>
          <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-primary">What would you like to update?</h3>
          <div className="mt-6 grid gap-3">
            {loading && !overview ? (
              <p className="text-sm text-muted">Loading action queue...</p>
            ) : overview && overview.quickActions.length === 0 ? (
              <p className="text-sm text-muted">No open admin actions right now.</p>
            ) : (
              overview?.quickActions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className="rounded-4xl border border-line bg-[#f8fbfc] px-4 py-4 text-left transition hover:bg-[#eef6f7]"
                >
                  <p className="text-sm font-medium text-primary">{action.label}</p>
                  <p className="mt-1 text-xs leading-6 text-muted">{action.detail}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Enquiry Trends" dataKey="enquiries" data={chartData} />
        <ChartCard title="Consultation Requests" dataKey="consultations" data={chartData} />
        <div className="rounded-5xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Schedule</p>
          <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-primary">Upcoming consultations</h3>
          <div className="mt-6 space-y-4">
            {loading && !overview ? (
              <p className="text-sm text-muted">Loading consultations...</p>
            ) : overview?.upcomingConsultations.length ? (
              overview.upcomingConsultations.map((item) => (
                <div key={item.id} className="rounded-4xl border border-line p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{item.advisor}</p>
                    </div>
                    <div className="text-right text-sm text-muted">
                      <p>{formatAdminDate(item.date)}</p>
                      <p>{item.status}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No upcoming consultations scheduled.</p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <DataTable title="Recent Content Updates" rows={contentRows} loading={loading} showCreateButton={false} />
        <DataTable title="Service Publishing" rows={serviceRows} loading={loading} showCreateButton={false} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-5xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Recent Enquiries</p>
          <div className="mt-6 space-y-4">
            {loading && !overview ? (
              <p className="text-sm text-muted">Loading enquiries...</p>
            ) : overview?.recentEnquiries.length ? (
              overview.recentEnquiries.map((item) => (
                <div key={item.id} className="rounded-4xl border border-line p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">{item.name}</p>
                      <p className="mt-1 text-sm text-muted">{item.focus}</p>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-[#eaf7f8] px-3 py-1 text-xs font-semibold text-accent">
                        {item.status}
                      </span>
                      <p className="mt-2 text-xs text-muted">{formatAdminDate(item.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No recent enquiries yet.</p>
            )}
          </div>
        </div>
        <div className="rounded-5xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Publishing Snapshot</p>
          <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-primary">Content health overview</h3>
          <div className="mt-6 grid gap-4">
            {snapshotItems.map((item) => (
              <div key={item.label} className="rounded-4xl border border-line p-4">
                <p className="text-sm font-semibold text-primary">{item.label}</p>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
