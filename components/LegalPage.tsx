import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function LegalPage({
  eyebrow,
  heading,
  updated,
  children,
}: {
  eyebrow: string;
  heading: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} heading={heading} sub={`Last updated ${updated}`} dark={false} />
      <section className="section-pad">
        <Reveal>
          <div className="container-brand max-w-2xl prose-legal space-y-6 text-[color:var(--ink-soft)] leading-[1.75]">
            {children}
          </div>
        </Reveal>
      </section>
    </>
  );
}
