"use client";

import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type EnquiryItem = {
  id: string;
  name: string;
  email: string;
  focus: string;
  message: string;
  status: string;
  internalNotes?: string | null;
  createdAt: string;
};

type EnquiryForm = {
  name: string;
  email: string;
  focus: string;
  message: string;
  status: string;
  internalNotes: string;
};

const statusOptions = [
  { label: "New", value: "NEW" },
  { label: "Review", value: "REVIEW" },
  { label: "Qualified", value: "QUALIFIED" },
  { label: "Closed", value: "CLOSED" },
  { label: "Spam", value: "SPAM" },
];

export default function AdminEnquiriesPage() {
  return (
    <AdminEntityPage<EnquiryItem, EnquiryForm>
      title="Enquiries"
      panelTitle="Lead Review"
      description="Filter incoming enquiries, update statuses, leave internal notes, and delete spam or duplicates."
      endpoint="/admin/enquiries"
      allowCreate={false}
      createEmpty={() => ({
        name: "",
        email: "",
        focus: "",
        message: "",
        status: "NEW",
        internalNotes: "",
      })}
      fields={[
        { name: "name", label: "Name", type: "text", readOnly: true },
        { name: "email", label: "Email", type: "text", readOnly: true },
        { name: "focus", label: "Planning Focus", type: "text", readOnly: true },
        { name: "message", label: "Message", type: "textarea", readOnly: true, rows: 5 },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "internalNotes", label: "Internal Notes", type: "textarea", rows: 5 },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.name,
        status: item.status,
        updated: formatAdminDate(item.createdAt),
        owner: item.focus,
      })}
      mapItemToForm={(item) => ({
        name: item.name,
        email: item.email,
        focus: item.focus,
        message: item.message,
        status: item.status,
        internalNotes: item.internalNotes ?? "",
      })}
      mapFormToPayload={(form) => ({
        status: form.status,
        internalNotes: form.internalNotes || null,
      })}
      afterSaveLabel="Lead updated."
    />
  );
}
