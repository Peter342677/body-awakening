import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ModalityRow({
  index,
  title,
  body,
  href,
  reverse = false,
}: {
  index: number;
  title: string;
  body: string;
  href?: string;
  reverse?: boolean;
}) {
  return (
    <Reveal>
      <div className="grid gap-8 md:grid-cols-[auto_1fr] items-start border-t border-[color:var(--line)] pt-10">
        <span
          className={`font-display text-4xl gradient-text ${
            reverse ? "md:order-2 md:justify-self-end" : ""
          }`}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-2xl md:text-3xl mb-3">{title}</h3>
          <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)] max-w-[62ch]">
            {body}
          </p>
          {href && (
            <Link
              href={href}
              className="mt-5 inline-block rounded-full px-5 py-2 text-xs uppercase tracking-wide text-cream whitespace-nowrap"
              style={{ backgroundImage: "var(--grad-brand)" }}
            >
              Book a Session
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}
