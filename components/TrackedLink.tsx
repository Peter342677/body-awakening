"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export default function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track(event)}>
      {children}
    </a>
  );
}
