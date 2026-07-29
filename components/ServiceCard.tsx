import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  href,
  image,
  imageAlt = "",
}: {
  title: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[20px] bg-[color:var(--sand)] p-10 h-[340px] border border-[color:var(--line)]"
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover opacity-25 scale-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-60 group-hover:scale-110"
        />
      )}
      <div
        className="absolute inset-0 translate-y-full opacity-90 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        style={{ backgroundImage: "var(--grad-brand)" }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-3xl transition-colors duration-500 text-ink group-hover:text-[color:var(--cream-on-night)]">
            {title}
          </h3>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:text-[color:var(--cream-on-night)]" />
        </div>
        <p className="text-[color:var(--ink-soft)] transition-colors duration-500 leading-relaxed group-hover:text-[color:var(--cream-on-night)]/90">
          {description}
        </p>
      </div>
    </Link>
  );
}
