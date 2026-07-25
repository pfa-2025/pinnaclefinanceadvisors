"use client";

import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type SeoItem = {
  id: string;
  pageType: string;
  entityId: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaJson?: unknown;
  updatedAt: string;
};

type SeoForm = {
  pageType: string;
  entityId: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaJson: unknown;
};

const pageTypeOptions = [
  { label: "Page", value: "PAGE" },
  { label: "Service", value: "SERVICE" },
  { label: "Advisor", value: "ADVISOR" },
  { label: "Insight", value: "INSIGHT" },
  { label: "Site", value: "SITE" },
];

export default function AdminSeoPage() {
  return (
    <AdminEntityPage<SeoItem, SeoForm>
      title="SEO Controls"
      panelTitle="Metadata Editor"
      description="Control title tags, descriptions, schema priorities, and social metadata."
      endpoint="/admin/seo"
      createMethod="PATCH"
      getCreatePath={(form) => `/admin/seo/${form.pageType}/${form.entityId}`}
      getUpdatePath={(_item, form) => `/admin/seo/${form.pageType}/${form.entityId}`}
      createEmpty={() => ({
        pageType: "PAGE",
        entityId: "",
        metaTitle: "",
        metaDescription: "",
        canonicalUrl: "",
        ogTitle: "",
        ogDescription: "",
        ogImageUrl: "",
        robotsIndex: true,
        robotsFollow: true,
        schemaJson: {},
      })}
      fields={[
        { name: "pageType", label: "Page Type", type: "select", options: pageTypeOptions },
        { name: "entityId", label: "Entity ID / Slug", type: "text" },
        { name: "metaTitle", label: "Meta Title", type: "text" },
        { name: "metaDescription", label: "Meta Description", type: "textarea", rows: 4 },
        { name: "canonicalUrl", label: "Canonical URL", type: "text" },
        { name: "ogTitle", label: "Open Graph Title", type: "text" },
        { name: "ogDescription", label: "Open Graph Description", type: "textarea", rows: 4 },
        { name: "ogImageUrl", label: "Open Graph Image URL", type: "text" },
        { name: "robotsIndex", label: "Allow Indexing", type: "checkbox" },
        { name: "robotsFollow", label: "Allow Following", type: "checkbox" },
        { name: "schemaJson", label: "Structured Data JSON", type: "json", rows: 10 },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.metaTitle,
        status: item.robotsIndex ? "Indexed" : "Noindex",
        updated: formatAdminDate(item.updatedAt),
        owner: `${item.pageType}:${item.entityId}`,
      })}
      mapItemToForm={(item) => ({
        pageType: item.pageType,
        entityId: item.entityId,
        metaTitle: item.metaTitle,
        metaDescription: item.metaDescription,
        canonicalUrl: item.canonicalUrl ?? "",
        ogTitle: item.ogTitle ?? "",
        ogDescription: item.ogDescription ?? "",
        ogImageUrl: item.ogImageUrl ?? "",
        robotsIndex: item.robotsIndex,
        robotsFollow: item.robotsFollow,
        schemaJson: item.schemaJson ?? {},
      })}
      mapFormToPayload={(form) => ({
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        canonicalUrl: form.canonicalUrl || null,
        ogTitle: form.ogTitle || null,
        ogDescription: form.ogDescription || null,
        ogImageUrl: form.ogImageUrl || null,
        robotsIndex: form.robotsIndex,
        robotsFollow: form.robotsFollow,
        schemaJson: form.schemaJson,
      })}
      afterSaveLabel="SEO updated."
    />
  );
}
