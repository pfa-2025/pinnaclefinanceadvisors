"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import type { MouseEvent, PropsWithChildren } from "react";
import { useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

function getRevealVariants(y = 32): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easing },
    },
  };
}

export function FadeUp({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLMotionProps<"div">>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "visible"}
      variants={getRevealVariants()}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLMotionProps<"div">>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0 }}
      animate={reduced ? undefined : { opacity: 1 }}
      transition={{ duration: 0.8, ease: easing }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideReveal({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={reduced ? false : { y: "110%" }}
        animate={reduced ? undefined : { y: 0 }}
        transition={{ duration: 0.8, ease: easing }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: index * 0.04, ease: easing }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function WordReveal({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <TextReveal text={String(children)} className={className} />;
}

export function ImageReveal({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={reduced ? false : { scale: 1.08, clipPath: "inset(0 0 100% 0 round 2rem)" }}
        animate={reduced ? undefined : { scale: 1, clipPath: "inset(0 0 0% 0 round 2rem)" }}
        transition={{ duration: 1.1, ease: easing }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "visible"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div className={className} variants={getRevealVariants(22)}>
      {children}
    </motion.div>
  );
}

export function ScaleReveal({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={reduced ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 32, opacity: 0 }}
      animate={reduced ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.18;
    ref.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
