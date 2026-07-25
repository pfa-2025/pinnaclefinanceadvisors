"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { z } from "zod";

import { postJson } from "@/lib/api";
import { setAdminAccessToken, setAdminUser } from "@/lib/admin-api";

const loginSchema = z.object({
  email: z.string().email("Enter a valid admin email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const data = await postJson<{ accessToken: string; user: { email: string; firstName?: string; lastName?: string } }>(
        "/auth/login",
        values,
      );
      setAdminAccessToken(data.accessToken);
      setAdminUser(data.user);
      router.push("/admin/dashboard");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unable to sign in right now.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-5xl bg-white p-8 shadow-premium">
      <div className="grid gap-5">
        <Field label="Admin Email" error={errors.email?.message}>
          <input {...register("email")} className={inputClassName} placeholder="admin@pinnaclefinanceadvisors.com" />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <input {...register("password")} type="password" className={inputClassName} placeholder="••••••••" />
        </Field>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:opacity-70"
      >
        <ShieldCheck size={16} />
        Access Dashboard
      </button>
      {errors.root?.message ? <p className="mt-4 text-sm text-[#b84e4e]">{errors.root.message}</p> : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-[#b84e4e]">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-[1.35rem] border border-line bg-[#f9fbfc] px-4 py-3 text-sm text-primary outline-none transition placeholder:text-muted/70 focus:border-accent";
