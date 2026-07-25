import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { BrandLogo } from "@/components/shared/brand-logo";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("Admin Login");

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-primary px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-10 rounded-[2.8rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-10">
        <div className="text-white">
          <div className="mb-6">
            <BrandLogo href="/" dark />
          </div>
          <p className="text-xs uppercase tracking-[0.32em] text-accent-soft">Pinnacle CMS</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.94] tracking-[-0.07em]">
            Premium control for a premium advisory brand.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
            Manage editorial content, services, advisors, enquiries, consultations, SEO, and media workflows from a calm operational workspace.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
