"use client";

import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type CategoryItem = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  status: string;
  updatedAt: string;
};

type CategoryForm = {
  slug: string;
  name: string;
  description: string;
  status: string;
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminCategoriesPage() {
  return (
    <AdminEntityPage<CategoryItem, CategoryForm>
      title="Categories"
      panelTitle="Category Settings"
      description="Manage insight taxonomies, archive options, and publication structure."
      endpoint="/admin/categories"
      createEmpty={() => ({
        slug: "",
        name: "",
        description: "",
        status: "PUBLISHED",
      })}
      fields={[
        { name: "slug", label: "Slug", type: "text" },
        { name: "name", label: "Name", type: "text" },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "description", label: "Description", type: "textarea", rows: 4 },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.name,
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.slug,
      })}
      mapItemToForm={(item) => ({
        slug: item.slug,
        name: item.name,
        description: item.description ?? "",
        status: item.status,
      })}
      mapFormToPayload={(form) => ({
        slug: form.slug,
        name: form.name,
        description: form.description || null,
        status: form.status,
      })}
    />
  );
}
