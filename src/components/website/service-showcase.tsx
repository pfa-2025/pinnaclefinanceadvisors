"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { Service } from "@/types";

import { FadeUp } from "@/components/animations/motion";

export function ServiceShowcase({ services }: { services: Service[] }) {
  const [active, setActive] = useState(services[0]);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
      <div className="space-y-3">
        {services.map((service) => (
          <button
            key={service.slug}
            type="button"
            onMouseEnter={() => setActive(service)}
            onFocus={() => setActive(service)}
            onClick={() => setActive(service)}
            className={`flex w-full items-center justify-between rounded-4xl border px-5 py-5 text-left transition ${
              active.slug === service.slug
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/8 text-white/60 hover:border-white/14 hover:bg-white/[0.03]"
            }`}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-accent-soft">{service.index}</p>
              <p className="mt-3 font-display text-2xl tracking-[-0.05em]">{service.title}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.24em]">Explore</span>
          </button>
        ))}
      </div>

      <FadeUp className="dark-panel rounded-5xl p-5 shadow-premium lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative h-[240px] overflow-hidden rounded-4xl sm:h-[320px]">
              <Image src={active.image} alt={active.title} fill className="object-cover" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-accent-soft">{active.metric}</p>
                <h3 className="mt-3 font-display text-4xl tracking-[-0.05em] text-white">
                  {active.title}
                </h3>
              </div>
              <Link
                href={`/expertise/${active.slug}`}
                className="rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Service
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{active.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.benefits.map((benefit) => (
                <div key={benefit} className="rounded-3xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/74">
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </FadeUp>
    </div>
  );
}
