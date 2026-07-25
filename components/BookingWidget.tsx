"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { Check, Loader2 } from "lucide-react";
import { SERVICES, formatDuration, formatPrice, type Service, type DurationOption } from "@/lib/services";
import { track } from "@/lib/analytics";

const detailsSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  notes: z.string().optional(),
});
type DetailsForm = z.infer<typeof detailsSchema>;

type DaySlots = { date: string; label: string; slots: string[] };

function stepMap(svc: Service | null) {
  const hasDurationChoice = !!svc && svc.durations.length > 1;
  return hasDurationChoice
    ? { service: 0, duration: 1, time: 2, details: 3, confirm: 4, labels: ["Service", "Duration", "Time", "Details", "Confirm"] }
    : { service: 0, duration: -1, time: 1, details: 2, confirm: 3, labels: ["Service", "Time", "Details", "Confirm"] };
}

export default function BookingWidget({
  confirmedId,
  initialServiceSlug,
}: {
  confirmedId?: string;
  initialServiceSlug?: string;
}) {
  const initialService = useMemo(
    () => (initialServiceSlug ? SERVICES.find((s) => s.slug === initialServiceSlug) ?? null : null),
    [initialServiceSlug]
  );
  const initialHasSingleDuration = initialService?.durations.length === 1;

  const [step, setStep] = useState(() =>
    initialService ? stepMap(initialService)[initialHasSingleDuration ? "time" : "duration"] : 0
  );
  const [hub, setHub] = useState<Service["hub"]>(initialService?.hub ?? "massage");
  const [service, setService] = useState<Service | null>(initialService);
  const [duration, setDuration] = useState<DurationOption | null>(
    initialHasSingleDuration ? initialService!.durations[0] : null
  );
  const [days, setDays] = useState<DaySlots[]>([]);
  const [loadingDays, setLoadingDays] = useState(true);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(Boolean(confirmedId));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsForm>({ resolver: zodResolver(detailsSchema) });

  useEffect(() => {
    if (confirmedId) track("booking_complete", { via: "stripe_redirect" });
  }, [confirmedId]);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data) => setDays(data.days ?? []))
      .catch(() => setDays([]))
      .finally(() => setLoadingDays(false));
  }, []);

  const visibleServices = useMemo(
    () => SERVICES.filter((s) => s.hub === hub),
    [hub]
  );

  const idx = stepMap(service);

  if (confirmed) {
    return (
      <div className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--sand)] p-12 text-center">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-cream"
          style={{ backgroundImage: "var(--grad-brand)" }}
        >
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-6 text-2xl">Your session is booked.</h2>
        <p className="mt-3 text-[color:var(--ink-soft)] max-w-md mx-auto">
          A confirmation is on its way to your inbox with everything you need
          before we meet. Reference: <span className="text-ink">{confirmedId}</span>
        </p>
        <p className="mt-6 text-sm text-[color:var(--ink-soft)]">
          Need to reschedule? ⟨POLICY⟩ Just reply to your confirmation email
          or <a href="/contact" className="link-underline">reach out</a>.
        </p>
      </div>
    );
  }

  const onSubmitDetails = async (values: DetailsForm) => {
    if (!service || !duration || !date || !time) return;
    setSubmitting(true);
    setError(null);
    track("checkout_start", { service: service.slug });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: service.slug,
          durationMinutes: duration.minutes,
          date,
          time,
          ...values,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      if (data.mock) {
        track("booking_complete", { service: service.slug });
        setConfirmed(true);
        window.history.replaceState(null, "", `/book?confirmed=${data.bookingId}`);
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch {
      setError("We couldn't complete your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[20px] border border-[color:var(--line)] overflow-hidden">
      <div className="flex border-b border-[color:var(--line)] bg-[color:var(--sand)]">
        {idx.labels.map((label, i) => (
          <div
            key={label}
            className={clsx(
              "flex-1 py-4 text-center text-xs uppercase tracking-wide",
              i === step ? "text-ink font-medium" : "text-[color:var(--ink-soft)]"
            )}
          >
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <div className="p-8 md:p-10">
        {step === idx.service && (
          <div>
            <div className="flex gap-2 mb-8">
              {(["massage", "coaching"] as const).map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHub(h)}
                  className={clsx(
                    "rounded-full px-5 py-2 text-sm uppercase tracking-wide border",
                    hub === h
                      ? "text-cream border-transparent"
                      : "border-[color:var(--line)] text-ink"
                  )}
                  style={hub === h ? { backgroundImage: "var(--grad-brand)" } : undefined}
                >
                  {h === "massage" ? "Massage Therapy" : "Coaching"}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleServices.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    const next = stepMap(s);
                    setService(s);
                    if (s.durations.length === 1) {
                      setDuration(s.durations[0]);
                      setStep(next.time);
                    } else {
                      setDuration(null);
                      setStep(next.duration);
                    }
                  }}
                  className="text-left rounded-[16px] border border-[color:var(--line)] p-6 hover:border-[color:var(--mauve)] transition-colors"
                >
                  <p className="text-lg text-ink">{s.name}</p>
                  <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                    {formatDuration(s)} · {formatPrice(s)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {idx.duration !== -1 && step === idx.duration && (
          <div>
            <p className="text-sm text-[color:var(--ink-soft)] mb-6">
              {service?.name} · choose your session length
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {service?.durations.map((d) => (
                <button
                  key={d.minutes}
                  type="button"
                  onClick={() => {
                    setDuration(d);
                    setStep(idx.time);
                  }}
                  className={clsx(
                    "text-left rounded-[16px] border p-6 transition-colors",
                    duration?.minutes === d.minutes
                      ? "border-[color:var(--mauve)]"
                      : "border-[color:var(--line)] hover:border-[color:var(--mauve)]"
                  )}
                >
                  <p className="text-lg text-ink">{d.label}</p>
                  <p className="mt-2 text-sm text-[color:var(--ink-soft)]">${d.price}</p>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(idx.service)}
              className="mt-6 text-sm link-underline text-[color:var(--ink-soft)]"
            >
              ← Change service
            </button>
          </div>
        )}

        {step === idx.time && (
          <div>
            <p className="text-sm text-[color:var(--ink-soft)] mb-6">
              {service?.name} · {duration?.label}
            </p>
            {loadingDays ? (
              <div className="flex items-center gap-2 text-[color:var(--ink-soft)]">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading availability…
              </div>
            ) : (
              <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
                {days.map((d) => (
                  <div key={d.date}>
                    <p className="text-sm uppercase tracking-wide text-[color:var(--ink-soft)] mb-3">
                      {d.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {d.slots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setDate(d.date);
                            setTime(t);
                            setStep(idx.details);
                          }}
                          className={clsx(
                            "rounded-full px-4 py-2 text-sm border transition-colors",
                            date === d.date && time === t
                              ? "text-cream border-transparent"
                              : "border-[color:var(--line)] text-ink hover:border-[color:var(--mauve)]"
                          )}
                          style={
                            date === d.date && time === t
                              ? { backgroundImage: "var(--grad-brand)" }
                              : undefined
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setStep(idx.duration !== -1 ? idx.duration : idx.service)}
              className="mt-6 text-sm link-underline text-[color:var(--ink-soft)]"
            >
              ← {idx.duration !== -1 ? "Change duration" : "Change service"}
            </button>
          </div>
        )}

        {step === idx.details && (
          <form onSubmit={handleSubmit(() => setStep(idx.confirm))} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Name</label>
              <input
                {...register("name")}
                className="w-full rounded-xl border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--mauve)]"
              />
              {errors.name && <p className="mt-1 text-sm text-[color:var(--rose-deep)]">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-xl border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--mauve)]"
              />
              {errors.email && <p className="mt-1 text-sm text-[color:var(--rose-deep)]">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Phone (optional)</label>
              <input
                {...register("phone")}
                className="w-full rounded-xl border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--mauve)]"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[color:var(--ink-soft)]">Intake notes (optional)</label>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full rounded-xl border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--mauve)]"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(idx.time)}
                className="text-sm link-underline text-[color:var(--ink-soft)]"
              >
                ← Change time
              </button>
              <button
                type="submit"
                className="rounded-full px-8 py-3 text-sm uppercase tracking-wide text-cream"
                style={{ backgroundImage: "var(--grad-brand)" }}
              >
                Review booking
              </button>
            </div>
          </form>
        )}

        {step === idx.confirm && (
          <div>
            <div className="rounded-[16px] bg-[color:var(--sand)] p-6 space-y-2">
              <p className="text-lg text-ink">{service?.name}</p>
              <p className="text-sm text-[color:var(--ink-soft)]">
                {days.find((d) => d.date === date)?.label} at {time}
              </p>
              <p className="text-sm text-[color:var(--ink-soft)]">
                {duration?.label} · ${duration?.price}
              </p>
            </div>
            {error && <p className="mt-4 text-sm text-[color:var(--rose-deep)]">{error}</p>}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(idx.details)}
                className="text-sm link-underline text-[color:var(--ink-soft)]"
              >
                ← Edit details
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSubmit(onSubmitDetails)()}
                className={clsx(
                  "rounded-full px-8 py-3 text-sm uppercase tracking-wide text-cream",
                  submitting && "opacity-70 pointer-events-none"
                )}
                style={{ backgroundImage: "var(--grad-brand)" }}
              >
                {submitting ? "Processing…" : "Confirm & Pay"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
