"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";

export default function Newsletter({ onDark = false }: { onDark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string) ?? "";
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2 max-w-sm">
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className={clsx(
          "flex-1 min-w-0 rounded-full px-5 py-3 text-sm bg-transparent border outline-none",
          onDark
            ? "border-[color:var(--lilac)]/40 text-[color:var(--cream-on-night)] placeholder:text-[color:var(--lilac)]/70"
            : "border-[color:var(--line)] text-ink placeholder:text-[color:var(--ink-soft)]"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full px-5 py-3 text-xs uppercase tracking-wide text-cream shrink-0"
        style={{ backgroundImage: "var(--grad-brand)" }}
      >
        {status === "done" ? "Sent" : "Join"}
      </button>
    </form>
  );
}
