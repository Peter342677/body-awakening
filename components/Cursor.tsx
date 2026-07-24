"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced || !dotRef.current) return;

    const el = dotRef.current;
    const quickX = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const grow = () => gsap.to(el, { width: 46, height: 46, duration: 0.3, ease: "power2.out" });
    const shrink = () => gsap.to(el, { width: 14, height: 14, duration: 0.3, ease: "power2.out" });
    const press = () => gsap.to(el, { scale: 0.7, duration: 0.15 });
    const release = () => gsap.to(el, { scale: 1, duration: 0.15 });

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) grow();
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea")) shrink();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
