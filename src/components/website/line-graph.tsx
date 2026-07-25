"use client";

import { motion, useReducedMotion } from "framer-motion";

export function LineGraph({ dark = false }: { dark?: boolean }) {
  const reduced = useReducedMotion();
  const stroke = dark ? "#67D5D1" : "#00A6A6";
  const fill = dark ? "rgba(103, 213, 209, 0.18)" : "rgba(0, 166, 166, 0.12)";

  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" role="img" aria-label="Growth trend line chart">
      <defs>
        <linearGradient id={`lineFill-${dark ? "dark" : "light"}`} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>
      <path d="M20 120 H280" stroke={dark ? "rgba(255,255,255,0.12)" : "rgba(12,27,38,0.08)"} strokeDasharray="4 6" />
      <motion.path
        d="M20 110 C65 94, 80 102, 120 78 S190 42, 280 28"
        stroke={stroke}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <path
        d="M20 110 C65 94, 80 102, 120 78 S190 42, 280 28 L280 140 L20 140 Z"
        fill={`url(#lineFill-${dark ? "dark" : "light"})`}
      />
    </svg>
  );
}
