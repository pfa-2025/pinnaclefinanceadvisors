"use client";

import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type AdminUserItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
  createdAt: string;
};

type AdminUserForm = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
};

const roleOptions = [
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Editor", value: "EDITOR" },
  { label: "Operations", value: "OPERATIONS" },
  { label: "SEO Manager", value: "SEO_MANAGER" },
];

const statusOptions = [
  { label: "Invited", value: "INVITED" },
  { label: "Active", value: "ACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
];

export default function AdminAdministratorsPage() {
  return (
    <AdminEntityPage<AdminUserItem, AdminUserForm>
      title="Administrators"
      panelTitle="Team Access"
      description="Manage roles, invitation status, and security requirements for admin users."
      endpoint="/admin/users"
      getCreatePath={() => "/admin/users/invite"}
      createEmpty={() => ({
        email: "",
        firstName: "",
        lastName: "",
        role: "EDITOR",
        status: "INVITED",
        twoFactorEnabled: false,
      })}
      fields={[
        { name: "email", label: "Email", type: "text" },
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "role", label: "Role", type: "select", options: roleOptions },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        { name: "twoFactorEnabled", label: "Two-Factor Enabled", type: "checkbox" },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: `${item.firstName} ${item.lastName}`.trim() || item.email,
        status: item.twoFactorEnabled ? "2FA Enabled" : item.status,
        updated: formatAdminDate(item.createdAt),
        owner: item.role,
      })}
      mapItemToForm={(item) => ({
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
        status: item.status,
        twoFactorEnabled: item.twoFactorEnabled,
      })}
      mapFormToPayload={(form) => ({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        status: form.status,
        twoFactorEnabled: form.twoFactorEnabled,
      })}
      afterSaveLabel="Administrator saved."
    />
  );
}
