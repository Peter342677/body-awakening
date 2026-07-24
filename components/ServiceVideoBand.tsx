"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceVideoBand({
  src,
  poster,
  caption,
  dark = false,
}: {
  src: string;
  poster?: string;
  caption?: string;
  dark?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!section || !frame || !video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    playObserver.observe(section);

    if (reduced) {
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
      return () => playObserver.disconnect();
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.05 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );
    }, section);

    return () => {
      playObserver.disconnect();
      ctx.revert();
    };
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
          className="relative w-full max-w-4xl aspect-video rounded-[28px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(126,99,166,0.35)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 mix-blend-multiply opacity-15 pointer-events-none"
            style={{ backgroundImage: "var(--grad-brand)" }}
          />
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
