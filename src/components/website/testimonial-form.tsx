"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { z } from "zod";

import { postJson } from "@/lib/api";

const testimonialSchema = z.object({
  clientName: z.string().min(2, "Please enter your name."),
  clientTitle: z.string().optional(),
  quote: z.string().min(10, "Please share a little more detail."),
  honeypot: z.string().optional(),
});

type TestimonialValues = z.infer<typeof testimonialSchema>;

export function TestimonialForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<TestimonialValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      clientName: "",
      clientTitle: "",
      quote: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values: TestimonialValues) => {
    try {
      await postJson("/public/testimonials", values);
      reset(values);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unable to submit your feedback right now.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-5xl p-6 shadow-soft sm:p-8">
      <Field label="Your Name" error={errors.clientName?.message}>
        <input {...register("clientName")} className={inputClassName} placeholder="Alex Morgan" />
      </Field>
      <Field label="Title / Relationship (optional)" error={errors.clientTitle?.message} className="mt-5">
        <input {...register("clientTitle")} className={inputClassName} placeholder="Retirement Planning Client" />
      </Field>
      <Field label="Your Feedback" error={errors.quote?.message} className="mt-5">
        <textarea
          {...register("quote")}
          className={`${inputClassName} min-h-36 resize-none`}
          placeholder="Share what stood out about working with our advisory team."
        />
      </Field>
      <input
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-deep disabled:opacity-70"
      >
        Submit Feedback <ArrowRight size={16} />
      </button>
      {errors.root?.message ? <p className="mt-4 text-sm text-[#b84e4e]">{errors.root.message}</p> : null}
      {isSubmitSuccessful ? (
        <p className="mt-4 text-sm text-accent">
          Thank you. Your feedback has been submitted for review and will appear here once approved by our team.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-sm font-medium text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-[#b84e4e]">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-[1.35rem] border border-line bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-muted/70 focus:border-accent";
