"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = { quote: string; attribution: string };

export default function TestimonialSlider({
  items,
}: {
  items: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div
      className="max-w-3xl mx-auto text-center"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <Quote className="mx-auto h-8 w-8 text-[color:var(--mauve)]" aria-hidden="true" />
      <p className="mt-6 font-display text-2xl md:text-3xl italic leading-relaxed text-ink">
        &ldquo;{item.quote}&rdquo;
      </p>
      <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
        {item.attribution}
      </p>
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="p-2 rounded-full border border-[color:var(--line)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  i === index ? "var(--mauve)" : "var(--line)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="p-2 rounded-full border border-[color:var(--line)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
