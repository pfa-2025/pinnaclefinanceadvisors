"use client";

import { adminGet } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type ConsultationItem = {
  id: string;
  name: string;
  email: string;
  preferredDate: string;
  advisorFocus: string;
  goals: string;
  advisorId?: string | null;
  status: string;
  internalNotes?: string | null;
  advisor?: { id: string; name: string } | null;
};

type ConsultationForm = {
  name: string;
  email: string;
  preferredDate: string;
  advisorFocus: string;
  goals: string;
  advisorId: string;
  status: string;
  internalNotes: string;
};

type ConsultationExtra = {
  advisors: Array<{ id: string; name: string }>;
};

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function AdminConsultationsPage() {
  return (
    <AdminEntityPage<ConsultationItem, ConsultationForm, ConsultationExtra>
      title="Consultations"
      panelTitle="Schedule Workflow"
      description="Update confirmations, track follow-up, and maintain internal preparation notes before meetings."
      endpoint="/admin/consultations"
      allowCreate={false}
      loadExtra={() =>
        adminGet<{ items: Array<{ id: string; name: string }> }>("/admin/advisors").then((data) => ({
          advisors: data.items,
        }))
      }
      createEmpty={() => ({
        name: "",
        email: "",
        preferredDate: "",
        advisorFocus: "",
        goals: "",
        advisorId: "",
        status: "PENDING",
        internalNotes: "",
      })}
      fields={[
        { name: "name", label: "Client Name", type: "text", readOnly: true },
        { name: "email", label: "Email", type: "text", readOnly: true },
        { name: "preferredDate", label: "Preferred Date", type: "date", readOnly: true },
        { name: "advisorFocus", label: "Advisor Focus", type: "text", readOnly: true },
        { name: "goals", label: "Goals", type: "textarea", readOnly: true, rows: 5 },
        {
          name: "advisorId",
          label: "Assigned Advisor",
          type: "select",
          options: (extra) => extra?.advisors.map((item) => ({ label: item.name, value: item.id })) ?? [],
        },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "internalNotes", label: "Internal Notes", type: "textarea", rows: 5 },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.name,
        status: item.status,
        updated: formatAdminDate(item.preferredDate),
        owner: item.advisor?.name ?? item.advisorFocus,
      })}
      mapItemToForm={(item) => ({
        name: item.name,
        email: item.email,
        preferredDate: item.preferredDate,
        advisorFocus: item.advisorFocus,
        goals: item.goals,
        advisorId: item.advisorId ?? "",
        status: item.status,
        internalNotes: item.internalNotes ?? "",
      })}
      mapFormToPayload={(form) => ({
        advisorId: form.advisorId || null,
        status: form.status,
        internalNotes: form.internalNotes || null,
      })}
      afterSaveLabel="Consultation updated."
    />
  );
}
