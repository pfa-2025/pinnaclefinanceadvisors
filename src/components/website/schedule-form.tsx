"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { z } from "zod";

import { contactDetails } from "@/constants/contact";
import { postJson } from "@/lib/api";

const scheduleSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  date: z.string().min(1, "Please choose a preferred date."),
  advisor: z.string().min(2, "Choose an advisor focus."),
  goals: z.string().min(16, "Tell us more about your goals."),
  honeypot: z.string().optional(),
});

type ScheduleValues = z.infer<typeof scheduleSchema>;

export function ScheduleForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ScheduleValues>({
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit = async (values: ScheduleValues) => {
    try {
      await postJson("/public/consultations", values);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unable to request the consultation right now.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-5xl bg-white p-6 shadow-premium sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" error={errors.name?.message}>
          <input {...register("name")} className={inputClassName} placeholder="Jordan Ellis" />
        </Field>
        <Field label="Email Address" error={errors.email?.message}>
          <input {...register("email")} className={inputClassName} placeholder="jordan@email.com" />
        </Field>
        <Field label="Preferred Date" error={errors.date?.message}>
          <input {...register("date")} type="date" className={inputClassName} />
        </Field>
        <Field label="Advisor Focus" error={errors.advisor?.message}>
          <select {...register("advisor")} className={inputClassName}>
            <option value="">Select a focus area</option>
            <option value="retirement">Retirement Planning</option>
            <option value="wealth">Wealth Management</option>
            <option value="investment">Investment Strategy</option>
            <option value="estate">Estate Planning</option>
          </select>
        </Field>
      </div>
      <Field label="What would you like this meeting to help you solve?" error={errors.goals?.message} className="mt-5">
        <textarea
          {...register("goals")}
          className={`${inputClassName} min-h-40 resize-none`}
          placeholder="Share context on your planning priorities, questions, or transition you’re preparing for."
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
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:opacity-70"
      >
        <CalendarClock size={16} />
        Request Consultation
      </button>
      {errors.root?.message ? <p className="mt-4 text-sm text-[#b84e4e]">{errors.root.message}</p> : null}
      {isSubmitSuccessful ? (
        <p className="mt-4 text-sm text-accent">
          Your request has been queued for confirmation.
        </p>
      ) : null}
      <p className="mt-4 text-xs leading-6 text-muted">
        If you prefer immediate scheduling, you can also{" "}
        <a
          href={contactDetails.calendlyUrl}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary transition hover:text-accent"
        >
          book directly on Calendly
        </a>
        .
      </p>
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
  "w-full rounded-[1.35rem] border border-line bg-[#f9fbfc] px-4 py-3 text-sm text-primary outline-none transition placeholder:text-muted/70 focus:border-accent";
