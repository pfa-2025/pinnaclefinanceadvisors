"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

import { BrandLogo } from "@/components/shared/brand-logo";
import { ButtonLink } from "@/components/ui/button";

export function Navbar({ navLinks }: { navLinks: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    return scrollY.on("change", (value) => setScrolled(value > 18));
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1320px] items-center justify-between rounded-2xl border px-3 py-2.5 transition duration-500 sm:px-5",
            scrolled
              ? "border-white/70 bg-[rgba(248,251,252,0.96)] shadow-[0_14px_40px_rgba(7,28,44,0.12)] backdrop-blur-xl"
              : "border-white/55 bg-[rgba(250,252,253,0.92)] shadow-[0_12px_34px_rgba(7,28,44,0.1)] backdrop-blur-xl",
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <BrandLogo href="/" compact size="sm" className="shrink-0" />
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-2 text-[0.94rem] font-medium transition",
                  pathname === item.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary"
                    : "text-primary/64 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink
              href="/schedule"
              className="gap-2 rounded-xl px-4 py-2.5"
            >
              Plan Your Future
              <ArrowUpRight size={15} />
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex rounded-xl border border-line bg-white/88 p-2.5 text-primary shadow-soft lg:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary/30 px-4 pb-6 pt-24 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={reduceMotion ? false : { y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              className="mx-auto flex h-auto w-full max-w-xl flex-col rounded-[1.5rem] border border-white/55 bg-[rgba(248,251,252,0.97)] p-4 shadow-[0_20px_64px_rgba(7,28,44,0.14)]"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <BrandLogo href="/" size="sm" />
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/48">
                  Menu
                </div>
              </div>
              <div className="space-y-2 py-5">
                {navLinks.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-[0.98rem] font-medium transition",
                        pathname === item.href
                          ? "border border-primary/10 bg-primary !text-white"
                          : "border border-line/80 bg-white text-primary hover:bg-[#f4f8f8]",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight size={16} className={pathname === item.href ? "text-white/80" : "text-primary/45"} />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-3 border-t border-line pt-4">
                <ButtonLink
                  href="/schedule"
                  onClick={() => setIsOpen(false)}
                  className="w-full justify-center rounded-xl px-5 py-3 shadow-none"
                >
                  Plan Your Future
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
