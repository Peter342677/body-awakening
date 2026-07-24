import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JournalCard from "@/components/JournalCard";
import PortraitReveal from "@/components/PortraitReveal";
import { buildMetadata } from "@/lib/seo";
import { JOURNAL_POSTS } from "@/content/journal";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description:
    "Notes on bodywork, coaching, and the human condition from Jason Gentrup.",
  path: "/journal",
});

export default function JournalIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="THE JOURNAL"
        heading="Notes on the work."
        sub="Reflections on bodywork, coaching, and what it means to come home to yourself."
      />
      <PortraitReveal
        src="/photos/jason/jason-reading.jpg"
        alt="Jason Gentrup, reflecting"
        caption="Jason Gentrup"
        objectPosition="center 20%"
      />
      <section className="section-pad">
        <div className="container-brand max-w-3xl space-y-6">
          {JOURNAL_POSTS.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
