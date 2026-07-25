"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ChartCard({
  title,
  dataKey,
  data,
}: {
  title: string;
  dataKey: string;
  data: Array<Record<string, string | number>>;
}) {
  return (
    <div className="rounded-5xl bg-white p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Analytics</p>
          <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-primary">{title}</h3>
        </div>
        <div className="rounded-full border border-line px-3 py-2 text-xs text-muted">
          Last 6 months
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#00A6A6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00A6A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(12, 27, 38, 0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#64727D" tickLine={false} axisLine={false} />
            <YAxis stroke="#64727D" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#071C2C",
                border: "none",
                borderRadius: "18px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#00A6A6"
              strokeWidth={3}
              fill={`url(#gradient-${dataKey})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
