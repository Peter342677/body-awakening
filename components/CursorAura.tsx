"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!el || !fine || reduced) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const quickX = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    // Start centered on first paint so the aura doesn't fly in from the corner.
    quickX(window.innerWidth / 2);
    quickY(window.innerHeight / 2);

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className="cursor-aura" aria-hidden="true" />;
}
