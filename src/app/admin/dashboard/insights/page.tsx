"use client";

import { adminGet, adminPost } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type InsightItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  bodyJson: string[];
  categoryId: string;
  coverImageUrl?: string | null;
  authorAdvisorId?: string | null;
  status: string;
  featured: boolean;
  updatedAt: string;
  category: { id: string; name: string };
  authorAdvisor?: { id: string; name: string } | null;
};

type InsightForm = {
  slug: string;
  title: string;
  excerpt: string;
  bodyJson: string[];
  categoryId: string;
  coverImageUrl: string;
  authorAdvisorId: string;
  featured: boolean;
  status: string;
};

type InsightExtra = {
  categories: Array<{ id: string; name: string }>;
  advisors: Array<{ id: string; name: string }>;
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Review", value: "REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminInsightsPage() {
  return (
    <AdminEntityPage<InsightItem, InsightForm, InsightExtra>
      title="Insights"
      panelTitle="Article Composer"
      description="Draft new insights, assign categories, manage featured images, and control publish state."
      endpoint="/admin/insights"
      loadExtra={() =>
        Promise.all([
          adminGet<{ items: Array<{ id: string; name: string }> }>("/admin/categories"),
          adminGet<{ items: Array<{ id: string; name: string }> }>("/admin/advisors"),
        ]).then(([categories, advisors]) => ({
          categories: categories.items,
          advisors: advisors.items,
        }))
      }
      createEmpty={() => ({
        slug: "",
        title: "",
        excerpt: "",
        bodyJson: [],
        categoryId: "",
        coverImageUrl: "",
        authorAdvisorId: "",
        featured: false,
        status: "DRAFT",
      })}
      fields={[
        { name: "slug", label: "Slug", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        {
          name: "categoryId",
          label: "Category",
          type: "select",
          options: (extra) => extra?.categories.map((item) => ({ label: item.name, value: item.id })) ?? [],
        },
        {
          name: "authorAdvisorId",
          label: "Author Advisor",
          type: "select",
          options: (extra) => extra?.advisors.map((item) => ({ label: item.name, value: item.id })) ?? [],
        },
        { name: "excerpt", label: "Excerpt", type: "textarea", rows: 4 },
        { name: "bodyJson", label: "Article Body", type: "array" },
        { name: "coverImageUrl", label: "Cover Image URL", type: "text" },
        { name: "featured", label: "Featured Article", type: "checkbox" },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.title,
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.authorAdvisor?.name ?? item.category.name,
      })}
      mapItemToForm={(item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        bodyJson: item.bodyJson,
        categoryId: item.categoryId,
        coverImageUrl: item.coverImageUrl ?? "",
        authorAdvisorId: item.authorAdvisorId ?? "",
        featured: item.featured,
        status: item.status,
      })}
      mapFormToPayload={(form) => ({
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt,
        bodyJson: form.bodyJson,
        categoryId: form.categoryId,
        coverImageUrl: form.coverImageUrl || null,
        authorAdvisorId: form.authorAdvisorId || null,
        featured: form.featured,
        status: form.status,
      })}
      publishAction={{
        label: "Publish",
        run: (item) => adminPost(`/admin/insights/${item.id}/publish`, {}),
        isDone: (item) => item.status === "PUBLISHED",
        doneLabel: "Published",
      }}
      showDeleteAction
    />
  );
}
