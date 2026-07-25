import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

const variants = {
  primary:
    "border border-transparent bg-primary !text-white shadow-[0_12px_28px_rgba(7,28,44,0.14)] hover:bg-primary-deep hover:!text-white",
  secondary:
    "border border-white/18 bg-white/6 !text-white hover:bg-white/12 hover:!text-white",
  ghost:
    "border border-line bg-white text-primary hover:bg-[#f4f8f8]",
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[0.92rem] font-semibold transition duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
