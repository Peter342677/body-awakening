"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortraitReveal({
  src,
  alt,
  caption,
  dark = false,
  objectPosition = "center 20%",
}: {
  src: string;
  alt: string;
  caption?: string;
  dark?: boolean;
  objectPosition?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const parallax = parallaxRef.current;
    if (!section || !frame || !parallax) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );

      gsap.fromTo(
        parallax,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={clsx(
        "section-pad overflow-hidden",
        dark ? "night-section" : ""
      )}
    >
      <div className="container-brand flex flex-col items-center">
        <div
          ref={frameRef}
          className="relative w-full max-w-lg aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(126,99,166,0.35)]"
        >
          <div ref={parallaxRef} className="absolute inset-[-10%]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
              style={{ objectPosition }}
            />
          </div>
        </div>
        {caption && (
          <p
            className={clsx(
              "mt-6 text-sm text-center",
              dark
                ? "text-[color:var(--lilac)]"
                : "text-[color:var(--ink-soft)]"
            )}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
