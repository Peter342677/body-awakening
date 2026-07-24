"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import Magnetic from "@/components/Magnetic";
import { track } from "@/lib/analytics";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "text";
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  onDark = false,
  onClick,
}: ButtonProps) {
  const handleClick = () => {
    if (href === "/book") track("book_click");
    onClick?.();
  };

  if (variant === "text") {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={clsx(
          "group inline-flex items-center gap-2 font-body text-sm tracking-wide uppercase link-underline",
          onDark ? "text-[color:var(--cream-on-night)]" : "text-ink",
          className
        )}
      >
        {children}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    );
  }

  const base =
    "inline-flex items-center justify-center px-8 py-4 rounded-[999px] text-sm tracking-[0.08em] uppercase font-body transition-transform duration-300";

  const styles =
    variant === "primary"
      ? "text-cream shadow-[0_24px_60px_-24px_rgba(126,99,166,0.45)]"
      : clsx(
          "border",
          onDark
            ? "border-[color:var(--lilac)] text-[color:var(--cream-on-night)]"
            : "border-[color:var(--line)] text-ink"
        );

  return (
    <Magnetic>
      <Link
        href={href}
        onClick={handleClick}
        className={clsx(base, styles, className)}
        style={
          variant === "primary" ? { backgroundImage: "var(--grad-brand)" } : undefined
        }
      >
        {children}
      </Link>
    </Magnetic>
  );
}
