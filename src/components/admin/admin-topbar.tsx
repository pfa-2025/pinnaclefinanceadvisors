"use client";

import { Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { getInitials } from "@/lib/admin-format";

type AdminUser = {
  firstName?: string;
  lastName?: string;
};

export function AdminTopbar({ onMenuClick, user }: { onMenuClick: () => void; user: AdminUser | null }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean).slice(1);
  const title = parts[parts.length - 1] ?? "dashboard";
  const userName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-[#f8fbfc]/80 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex rounded-full border border-line bg-white p-3 text-primary shadow-soft lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Admin Dashboard</p>
          <h1 className="truncate font-display text-3xl tracking-[-0.05em] text-primary">
            {title.replace(/-/g, " ")}
          </h1>
        </div>
        <div className="hidden items-center gap-3 rounded-full border border-line bg-white px-4 py-3 shadow-soft sm:flex">
          <Search size={16} className="text-muted" />
          <input
            aria-label="Search admin"
            placeholder="Search content, enquiries, advisors..."
            className="w-64 border-none bg-transparent text-sm text-primary outline-none placeholder:text-muted"
          />
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          {getInitials(userName)}
        </div>
      </div>
    </header>
  );
}
