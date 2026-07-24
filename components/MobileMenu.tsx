"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import Button from "@/components/Button";
import clsx from "clsx";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9996] night-section transition-opacity duration-500 xl:hidden",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="container-brand flex justify-end py-4">
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="p-2 text-[color:var(--cream-on-night)]"
        >
          <X className="h-7 w-7" />
        </button>
      </div>
      <nav className="container-brand flex flex-col gap-2 mt-8">
        {NAV_LINKS.flatMap((item) =>
          item.children
            ? [item, ...item.children.map((c) => ({ ...c, sub: true }))]
            : [item]
        ).map((item, i) => (
          <div
            key={item.href}
            className="overflow-hidden"
            style={{
              transitionDelay: open ? `${i * 60}ms` : "0ms",
            }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className={clsx(
                "block font-display text-[clamp(1.75rem,7vw,2.5rem)] py-2 transition-all duration-500",
                "sub" in item && item.sub
                  ? "pl-6 text-[1.4rem] text-[color:var(--lilac)]"
                  : "text-[color:var(--cream-on-night)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
      <div className="container-brand mt-10">
        <Button href="/book" onClick={onClose}>
          Book a Session
        </Button>
      </div>
    </div>
  );
}
