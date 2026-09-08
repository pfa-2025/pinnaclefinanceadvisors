"use client";

import { adminPost } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type AdvisorItem = {
  id: string;
  slug: string;
  name: string;
  roleTitle: string;
  bio: string;
  email: string;
  phone: string;
  portraitImageUrl?: string | null;
  status: string;
  updatedAt: string;
  specializations: Array<{ label: string }>;
};

type AdvisorForm = {
  slug: string;
  name: string;
  roleTitle: string;
  bio: string;
  email: string;
  phone: string;
  portraitImageUrl: string;
  status: string;
  specializations: string[];
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Review", value: "REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminAdvisorsPage() {
  return (
    <AdminEntityPage<AdvisorItem, AdvisorForm>
      title="Advisors"
      panelTitle="Advisor Profile"
      description="Manage biography, qualifications, specializations, portrait imagery, and publication state."
      endpoint="/admin/advisors"
      createEmpty={() => ({
        slug: "",
        name: "",
        roleTitle: "",
        bio: "",
        email: "",
        phone: "",
        portraitImageUrl: "",
        status: "DRAFT",
        specializations: [],
      })}
      fields={[
        { name: "slug", label: "Slug", type: "text" },
        { name: "name", label: "Name", type: "text" },
        { name: "roleTitle", label: "Role", type: "text" },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "bio", label: "Biography", type: "textarea", rows: 5 },
        { name: "email", label: "Email", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        {
          name: "portraitImageUrl",
          label: "Portrait Image",
          type: "image",
          uploadEndpoint: "/admin/advisors/portrait",
          placeholder: "Paste an image URL or public Google Drive link, or upload a file below",
        },
        { name: "specializations", label: "Specializations", type: "array" },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.name,
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.roleTitle,
      })}
      mapItemToForm={(item) => ({
        slug: item.slug,
        name: item.name,
        roleTitle: item.roleTitle,
        bio: item.bio,
        email: item.email,
        phone: item.phone,
        portraitImageUrl: item.portraitImageUrl ?? "",
        status: item.status,
        specializations: item.specializations.map((entry) => entry.label),
      })}
      mapFormToPayload={(form) => ({
        slug: form.slug,
        name: form.name,
        roleTitle: form.roleTitle,
        bio: form.bio,
        email: form.email,
        phone: form.phone,
        portraitImageUrl: form.portraitImageUrl || null,
        status: form.status,
        specializations: form.specializations,
      })}
      publishAction={{
        label: "Publish",
        run: (item) => adminPost(`/admin/advisors/${item.id}/publish`, {}),
        isDone: (item) => item.status === "PUBLISHED",
        doneLabel: "Published",
      }}
      showDeleteAction
    />
  );
}
