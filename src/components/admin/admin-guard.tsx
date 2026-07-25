"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { adminGet, clearAdminSession, getAdminAccessToken, getStoredAdminUser, setAdminUser } from "@/lib/admin-api";

type AdminUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export function useAdminGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(() => getStoredAdminUser<AdminUser>());

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const token = getAdminAccessToken();
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await adminGet<AdminUser>("/auth/me");
        if (!active) return;
        setAdminUser(data);
        setUser(data);
        setReady(true);
      } catch {
        clearAdminSession();
        if (active) {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        }
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [pathname, router]);

  return { ready, user };
}
