export function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-5xl bg-white p-6 shadow-soft">
      <p className="text-sm text-muted">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="font-display text-4xl tracking-[-0.06em] text-primary">{value}</p>
        <span className="rounded-full bg-[#eaf7f8] px-3 py-2 text-xs font-semibold text-accent">
          {delta}
        </span>
      </div>
    </div>
  );
}
