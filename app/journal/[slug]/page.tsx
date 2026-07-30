import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { JOURNAL_POSTS, getJournalPost } from "@/content/journal";

export function generateStaticParams() {
  return JOURNAL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return buildMetadata({ title: "Journal", description: "", path: "/journal" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
  });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />
      <PageHero
        eyebrow={new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        heading={post.title}
      />
      <section className="section-pad">
        <div className="container-brand max-w-2xl space-y-6">
          {post.body.map((para, i) => (
            <Reveal key={i}>
              <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)]">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
