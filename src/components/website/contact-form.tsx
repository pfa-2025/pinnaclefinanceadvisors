"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import { z } from "zod";

import { postJson } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  focus: z.string().min(2, "Tell us what you need help with."),
  message: z.string().min(12, "Please share a little more context."),
  honeypot: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      focus: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    try {
      await postJson("/public/enquiries", values);
      reset(values);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unable to submit your enquiry right now.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-5xl p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className={inputClassName} placeholder="Alex Morgan" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} className={inputClassName} placeholder="alex@email.com" />
        </Field>
      </div>
      <Field label="Planning Focus" error={errors.focus?.message} className="mt-5">
        <input
          {...register("focus")}
          className={inputClassName}
          placeholder="Retirement, wealth management, estate planning..."
        />
      </Field>
      <Field label="Message" error={errors.message?.message} className="mt-5">
        <textarea
          {...register("message")}
          className={`${inputClassName} min-h-36 resize-none`}
          placeholder="Share what you're planning for and where you'd like more clarity."
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
        Send Enquiry <ArrowRight size={16} />
      </button>
      {errors.root?.message ? <p className="mt-4 text-sm text-[#b84e4e]">{errors.root.message}</p> : null}
      {isSubmitSuccessful ? (
        <p className="mt-4 text-sm text-accent">
          Thanks. Your message has been staged for the advisory team.
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
