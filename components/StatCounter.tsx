"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value.match(/^\d+$/) ? "0" : value);

  useEffect(() => {
    const numeric = value.match(/^(\d+)(\+?)$/);
    const el = ref.current;
    if (!el || !numeric) return;

    const target = parseInt(numeric[1], 10);
    const suffix = numeric[2];
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * target) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block font-display text-[clamp(2.5rem,5vw,4rem)] gradient-text"
      >
        {display}
      </span>
      <span className="mt-2 block text-sm uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
        {label}
      </span>
    </div>
  );
}
