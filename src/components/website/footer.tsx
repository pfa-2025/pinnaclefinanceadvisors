import Link from "next/link";

import { websiteNavigation } from "@/constants/navigation";
import { services } from "@/data/site";

import { BrandLogo } from "@/components/shared/brand-logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary px-4 pb-12 pt-24 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-display text-[20vw] font-semibold tracking-[-0.08em] text-white/[0.03]">
        PINNACLE
      </div>
      <div className="container-shell relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <BrandLogo href="/" dark />
          <h2 className="mt-5 max-w-sm font-display text-4xl tracking-[-0.05em]">
            Financial clarity designed for ambitious lives.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Personalized planning, sophisticated strategy, and steady guidance for every chapter of what comes next.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg">Navigation</h3>
          <div className="mt-5 space-y-3 text-sm text-white/68">
            {websiteNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="block hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg">Expertise</h3>
          <div className="mt-5 space-y-3 text-sm text-white/68">
            {services.slice(0, 5).map((service) => (
              <Link
                key={service.slug}
                href={`/expertise/${service.slug}`}
                className="block hover:text-white"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg">Contact</h3>
          <div className="mt-5 space-y-3 text-sm leading-7 text-white/68">
            <p>220 Davidson Avenue, Somerset, NJ</p>
            <p>(908) 555-0100</p>
            <p>hello@pinnaclefinanceadvisors.com</p>
            <p className="pt-3 text-xs text-white/50">
              Pinnacle Finance Advisors provides educational information and planning guidance. Investment and insurance products are subject to applicable risks and regulations.
            </p>
          </div>
        </div>
      </div>
      <div className="container-shell relative mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <p>© 2026 Pinnacle Finance Advisors. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
