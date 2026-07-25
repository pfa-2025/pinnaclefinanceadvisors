"use client";

import Link from "next/link";
import { LogOut, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { adminNavigation } from "@/constants/navigation";
import { adminLogout } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

import { BrandLogo } from "@/components/shared/brand-logo";

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/login");
  }

  const content = (
    <div className="flex h-full w-full max-w-[290px] flex-col bg-primary px-5 py-6 text-white shadow-premium">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent-soft">Admin</p>
          <BrandLogo href="/admin/dashboard" dark />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      <nav className="mt-10 space-y-1">
        {adminNavigation.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition",
                active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/6 hover:text-white",
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-4xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">Security</p>
        <p className="mt-3 text-sm leading-6 text-white/74">
          Admin access is protected with role-based permissions and publication workflows.
        </p>
        <button
          type="button"
          onClick={() => void handleLogout()}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen lg:sticky lg:top-0 lg:block lg:w-[290px]">{content}</aside>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/35 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: -28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -28, opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="h-full"
            >
              {content}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
