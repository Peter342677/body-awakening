import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { JournalPost } from "@/content/journal";

export default function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Reveal>
      <Link
        href={`/journal/${post.slug}`}
        className="group block rounded-[20px] border border-[color:var(--line)] p-8 hover:border-[color:var(--mauve)] transition-colors"
      >
        <p className="text-sm uppercase tracking-wide text-[color:var(--ink-soft)]">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h2 className="mt-3 text-2xl group-hover:text-[color:var(--mauve)] transition-colors">
          {post.title}
        </h2>
        <p className="mt-3 text-[color:var(--ink-soft)] leading-relaxed">
          {post.excerpt}
        </p>
      </Link>
    </Reveal>
  );
}
