import type { ReactNode } from "react";

export function ContentPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-5xl bg-white p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.26em] text-muted">Content Controls</p>
      <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-primary">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
