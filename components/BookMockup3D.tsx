"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEPTH = 34;

export default function BookMockup3D({
  frontSrc,
  backSrc,
  frontAlt,
  backAlt,
}: {
  frontSrc: string;
  backSrc: string;
  frontAlt: string;
  backAlt: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const book = bookRef.current;
    if (!wrap || !book) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(book, { rotateY: 26, rotateX: 3, opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        book,
        { rotateY: 62, rotateX: 8, opacity: 0, scale: 0.86 },
        {
          rotateY: 26,
          rotateX: 3,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: wrap, start: "top 82%" },
        }
      );
    }, wrap);

    const onEnter = () =>
      gsap.to(book, { rotateY: 8, duration: 0.6, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(book, { rotateY: 26, duration: 0.6, ease: "power2.out" });
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="mx-auto w-full max-w-[300px] py-8"
      style={{ perspective: "1800px" }}
    >
      <div
        ref={bookRef}
        className="relative w-full opacity-0"
        style={{ aspectRatio: "2 / 3", transformStyle: "preserve-3d" }}
      >
        {/* Back cover, sits deepest */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[3px]"
          style={{ transform: `translateZ(-${DEPTH / 2}px)` }}
        >
          <Image
            src={backSrc}
            alt={backAlt}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>

        {/* Pages / spine, hinged along the left edge */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: DEPTH,
            transformOrigin: "left center",
            transform: "rotateY(-90deg)",
            background:
              "repeating-linear-gradient(180deg, #f3ece6 0px, #f3ece6 2px, #e0d5cb 3px, #e0d5cb 4px)",
            boxShadow: "inset 6px 0 10px -6px rgba(0,0,0,0.35)",
          }}
        />

        {/* Front cover, closest to the viewer */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[3px] shadow-[22px_30px_60px_-16px_rgba(42,30,51,0.5)]"
          style={{ transform: `translateZ(${DEPTH / 2}px)` }}
        >
          <Image
            src={frontSrc}
            alt={frontAlt}
            fill
            sizes="300px"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent" />
        </div>
      </div>
    </div>
  );
}
