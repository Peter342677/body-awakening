import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08]">
          {heading}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={160}>
          <p className="mt-6 text-lg leading-[1.75] text-[color:var(--ink-soft)] max-w-[68ch]">
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
