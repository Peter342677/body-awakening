"use client";

import Image from "next/image";
import Button from "@/components/Button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="night-section min-h-[80vh] flex items-center">
      <div className="container-brand text-center max-w-xl mx-auto">
        <Image
          src="/brand/mark.svg"
          alt=""
          width={56}
          height={56}
          className="mx-auto mb-8 opacity-90"
        />
        <p className="eyebrow mb-4">SOMETHING SLIPPED</p>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.05]">
          A moment of turbulence.
        </h1>
        <p className="mt-6 text-lg text-[color:var(--lilac)]">
          Something went wrong on our end. Take a breath, then try again.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <button
            type="button"
            onClick={reset}
            className="rounded-full px-8 py-4 text-sm uppercase tracking-wide text-cream"
            style={{ backgroundImage: "var(--grad-brand)" }}
          >
            Try Again
          </button>
          <Button href="/" variant="ghost" onDark>
            Return Home
          </Button>
        </div>
      </div>
    </section>
  );
}
