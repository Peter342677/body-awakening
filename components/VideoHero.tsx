"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import { ArrowDown } from "lucide-react";

export default function VideoHero({
  eyebrow,
  heading,
  highlight,
  sub,
  primaryHref = "/book",
  primaryLabel = "Book a Session",
  secondaryHref = "/about",
  secondaryLabel = "Meet Jason",
}: {
  eyebrow: string;
  heading: string;
  highlight: string;
  sub: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const words = headingRef.current?.querySelectorAll(".word");
    if (!words || !words.length) return;
    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.2,
      }
    );
  }, []);

  const words = heading.split(" ");

  return (
    <section
      ref={wrapRef}
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden night-section"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: "var(--grad-brand)" }}
      />
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{ backgroundImage: "var(--grad-soft)", mixBlendMode: "overlay" }}
      />
      <video
        ref={videoRef}
        className="absolute inset-0 z-10 h-full w-full object-cover"
        muted
        playsInline
        autoPlay
        loop
        preload="metadata"
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero.mp4" type="video/mp4" />
        <source src="/media/hero.webm" type="video/webm" />
      </video>
      <div
        className="absolute inset-0 z-20"
        style={{ backgroundImage: "var(--grad-scrim)" }}
      />

      <div className="relative z-30 h-full flex items-center">
        <div className="container-brand">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6 text-[color:var(--lilac)]">
              {eyebrow}
            </Eyebrow>
            <h1
              ref={headingRef}
              className="text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.5px] text-[color:var(--cream-on-night)]"
            >
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                  <span
                    className={`word inline-block ${
                      w.toLowerCase().includes(highlight.toLowerCase())
                        ? "gradient-text"
                        : ""
                    }`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-[color:var(--cream-on-night)]/90 max-w-xl">
              {sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Button href={primaryHref}>{primaryLabel}</Button>
              <Button href={secondaryHref} variant="text" onDark>
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <ArrowDown className="h-5 w-5 text-[color:var(--cream-on-night)]/70" />
      </div>
    </section>
  );
}
