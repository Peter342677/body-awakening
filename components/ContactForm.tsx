"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { track } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
});
type ContactForm = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      track("contact_submit");
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--sand)] p-10 text-center">
        <p className="text-lg text-ink">Message sent.</p>
        <p className="mt-2 text-[color:var(--ink-soft)]">
          Thank you for reaching out. Jason will be in touch soon.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--mauve)] bg-transparent";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Name</label>
          <input {...register("name")} className={inputClass} />
          {errors.name && <p className="mt-1 text-sm text-[color:var(--rose-deep)]">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Email</label>
          <input type="email" {...register("email")} className={inputClass} />
          {errors.email && <p className="mt-1 text-sm text-[color:var(--rose-deep)]">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Subject</label>
        <input {...register("subject")} className={inputClass} />
        {errors.subject && <p className="mt-1 text-sm text-[color:var(--rose-deep)]">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Message</label>
        <textarea rows={5} {...register("message")} className={inputClass} />
        {errors.message && <p className="mt-1 text-sm text-[color:var(--rose-deep)]">{errors.message.message}</p>}
      </div>
      {status === "error" && (
        <p className="text-sm text-[color:var(--rose-deep)]">
          Something went wrong. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className={clsx(
          "rounded-full px-8 py-3.5 text-sm uppercase tracking-wide text-cream",
          status === "loading" && "opacity-70"
        )}
        style={{ backgroundImage: "var(--grad-brand)" }}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
