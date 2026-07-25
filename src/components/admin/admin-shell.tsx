"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { useAdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { ready, user } = useAdminGuard();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef5f7] text-sm text-muted">
        Loading admin workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef5f7] lg:flex">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <AdminTopbar onMenuClick={() => setOpen(true)} user={user} />
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
