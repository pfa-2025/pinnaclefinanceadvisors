import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function BrandLogo({
  href = "/",
  dark = false,
  compact = false,
  size = "md",
  className,
}: {
  href?: string;
  dark?: boolean;
  compact?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const isSmall = size === "sm";

  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl shadow-soft",
          isSmall ? "h-9 w-9" : compact ? "h-11 w-11" : "h-14 w-14",
          dark ? "bg-white/10 ring-1 ring-white/10" : "bg-white ring-1 ring-black/5",
        )}
      >
        <Image
          src="/assets/pfa_logo.png"
          alt="Pinnacle Finance Advisors logo"
          fill
          sizes={isSmall ? "40px" : compact ? "48px" : "64px"}
          className="object-contain p-0.5"
          priority
        />
      </div>
      <div className={compact ? "hidden sm:block" : ""}>
        <p
          className={cn(
            isSmall
              ? "font-display text-[0.58rem] uppercase tracking-[0.24em]"
              : "font-display text-[0.72rem] uppercase tracking-[0.2em]",
            dark ? "text-white/60" : "text-primary/60",
          )}
        >
          Pinnacle
        </p>
        <p
          className={cn(
            isSmall
              ? "font-display text-[0.95rem] font-semibold leading-none"
              : "font-display text-[1rem] font-semibold leading-none",
            dark ? "text-white" : "text-primary",
          )}
        >
          Finance Advisors
        </p>
      </div>
    </Link>
  );
}
