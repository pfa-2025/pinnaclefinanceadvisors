"use client";

import { adminPost } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type ServiceItem = {
  id: string;
  slug: string;
  displayOrder: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  metricLabel: string;
  coverImageUrl?: string | null;
  status: string;
  updatedAt: string;
  benefits: Array<{ label: string }>;
};

type ServiceForm = {
  slug: string;
  displayOrder: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  metricLabel: string;
  coverImageUrl: string;
  status: string;
  benefits: string[];
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Review", value: "REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminServicesPage() {
  return (
    <AdminEntityPage<ServiceItem, ServiceForm>
      title="Services"
      panelTitle="Service Editor"
      description="Update descriptions, reorder services, add imagery, and manage draft or published status."
      endpoint="/admin/services"
      createEmpty={() => ({
        slug: "",
        displayOrder: 0,
        title: "",
        shortDescription: "",
        longDescription: "",
        metricLabel: "",
        coverImageUrl: "",
        status: "DRAFT",
        benefits: [],
      })}
      fields={[
        { name: "slug", label: "Slug", type: "text" },
        { name: "displayOrder", label: "Display Order", type: "number" },
        { name: "title", label: "Title", type: "text" },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "shortDescription", label: "Short Description", type: "textarea", rows: 4 },
        { name: "longDescription", label: "Long Description", type: "textarea", rows: 5 },
        { name: "metricLabel", label: "Metric Label", type: "text" },
        { name: "coverImageUrl", label: "Cover Image URL", type: "text" },
        { name: "benefits", label: "Benefits", type: "array" },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.title,
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.metricLabel,
      })}
      mapItemToForm={(item) => ({
        slug: item.slug,
        displayOrder: item.displayOrder,
        title: item.title,
        shortDescription: item.shortDescription,
        longDescription: item.longDescription,
        metricLabel: item.metricLabel,
        coverImageUrl: item.coverImageUrl ?? "",
        status: item.status,
        benefits: item.benefits.map((benefit) => benefit.label),
      })}
      mapFormToPayload={(form) => ({
        slug: form.slug,
        displayOrder: form.displayOrder,
        title: form.title,
        shortDescription: form.shortDescription,
        longDescription: form.longDescription,
        metricLabel: form.metricLabel,
        coverImageUrl: form.coverImageUrl || null,
        status: form.status,
        benefits: form.benefits,
      })}
      publishAction={{
        label: "Publish",
        run: (item) => adminPost(`/admin/services/${item.id}/publish`, {}),
        isDone: (item) => item.status === "PUBLISHED",
        doneLabel: "Published",
      }}
      showDeleteAction
    />
  );
}
