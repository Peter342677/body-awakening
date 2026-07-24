"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "We are not our bodies.",
  "The body is our guide through this world,",
  "here to help us navigate.",
  "The work is learning to listen to it again.",
];

export default function PinnedPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          scrub: 0.6,
          pin: true,
        },
      });

      linesRef.current.forEach((line, i) => {
        if (!line) return;
        tl.fromTo(
          line,
          { opacity: 0.12 },
          { opacity: 1, duration: 1 },
          i * 1
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="night-section h-screen flex items-center overflow-hidden">
      <div className="container-brand">
        <p className="eyebrow mb-8">THE PHILOSOPHY</p>
        <p className="max-w-4xl font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.3]">
          {LINES.map((line, i) => (
            <span
              key={line}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              className="block text-[color:var(--cream-on-night)]"
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
