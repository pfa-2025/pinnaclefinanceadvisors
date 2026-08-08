"use client";

import { adminPost } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type TestimonialItem = {
  id: string;
  clientName?: string | null;
  clientTitle?: string | null;
  clientImageUrl?: string | null;
  quote: string;
  sourceType: string;
  approvalStatus: string;
  featured: boolean;
  updatedAt: string;
};

type TestimonialForm = {
  clientName: string;
  clientTitle: string;
  quote: string;
  sourceType: string;
  approvalStatus: string;
  featured: boolean;
};

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export default function AdminTestimonialsPage() {
  return (
    <AdminEntityPage<TestimonialItem, TestimonialForm>
      title="Testimonials"
      panelTitle="Approval Workflow"
      description="Manage testimonials, proof status, and publication approvals."
      endpoint="/admin/testimonials"
      createEmpty={() => ({
        clientName: "",
        clientTitle: "",
        quote: "",
        sourceType: "website",
        approvalStatus: "PENDING",
        featured: false,
      })}
      fields={[
        { name: "clientName", label: "Client Name", type: "text" },
        { name: "clientTitle", label: "Client Title", type: "text" },
        { name: "sourceType", label: "Source Type", type: "text" },
        { name: "approvalStatus", label: "Approval Status", type: "select", options: statusOptions },
        { name: "quote", label: "Feedback / Quote", type: "textarea", rows: 5 },
        { name: "featured", label: "Featured Testimonial", type: "checkbox" },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.clientName ?? "Unnamed testimonial",
        status: item.approvalStatus,
        updated: formatAdminDate(item.updatedAt),
        owner: item.sourceType,
      })}
      mapItemToForm={(item) => ({
        clientName: item.clientName ?? "",
        clientTitle: item.clientTitle ?? "",
        quote: item.quote,
        sourceType: item.sourceType,
        approvalStatus: item.approvalStatus,
        featured: item.featured,
      })}
      mapFormToPayload={(form) => ({
        clientName: form.clientName || null,
        clientTitle: form.clientTitle || null,
        quote: form.quote,
        sourceType: form.sourceType,
        approvalStatus: form.approvalStatus,
        featured: form.featured,
      })}
      publishAction={{
        label: "Approve",
        run: (item, form) => adminPost(`/admin/testimonials/${item.id}/approve`, { featured: form.featured }),
      }}
    />
  );
}
