import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import clsx from "clsx";

export default function PageHero({
  eyebrow,
  heading,
  sub,
  dark = true,
}: {
  eyebrow: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={clsx(
        "pt-40 pb-24 md:pt-52 md:pb-32",
        dark ? "night-section" : "bg-[color:var(--sand)]"
      )}
    >
      <div className="container-brand max-w-4xl">
        <Reveal>
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05]">
            {heading}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={160}>
            <p
              className={clsx(
                "mt-6 text-lg leading-relaxed max-w-2xl",
                dark ? "text-[color:var(--lilac)]" : "text-[color:var(--ink-soft)]"
              )}
            >
              {sub}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
