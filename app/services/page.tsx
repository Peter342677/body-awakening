import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import ImageBand from "@/components/ImageBand";
import CtaBand from "@/components/CtaBand";
import { buildMetadata } from "@/lib/seo";
import { getServicesByHub } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Services: Bodywork & Coaching",
  description:
    "Skilled bodywork and grounded coaching with Jason Gentrup. Choose the doorway that fits where you are.",
  path: "/services",
});

export default function ServicesPage() {
  const massage = getServicesByHub("massage");
  const coaching = getServicesByHub("coaching");

  return (
    <>
      <PageHero
        eyebrow="WHAT WE OFFER"
        heading="Choose the doorway that fits where you are."
        sub="Some of what we carry lives in the body and answers to touch. Some of it needs a different kind of attention. Body Awakening offers both, skilled bodywork and grounded coaching, so you can be met wherever you actually are."
      />

      <section className="section-pad">
        <div className="container-brand grid gap-6 md:grid-cols-2">
          <Reveal>
            <ServiceCard
              title="Massage Therapy"
              description="Reiki and energy work, craniosacral therapy, lymphatic drainage, and distant healing."
              href="/services/massage"
              image="/photos/reiki-hands.jpg"
              imageAlt="Hands offering Reiki energy work"
            />
          </Reveal>
          <Reveal delay={100}>
            <ServiceCard
              title="Coaching"
              description="Spiritual and life coaching, plus wellness and performance work."
              href="/services/coaching"
              image="/photos/misty-road.jpg"
              imageAlt="A misty road stretching ahead, symbolizing the coaching journey"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[24px] border border-[color:var(--line)] bg-[color:var(--sand)] p-8 md:p-10">
              <p className="eyebrow mb-6">MASSAGE THERAPY MODALITIES</p>
              <div className="flex flex-wrap gap-3">
                {massage.map((s) => (
                  <span
                    key={s.slug}
                    className="inline-block rounded-full border border-[color:var(--line)] bg-[color:var(--cream)] px-5 py-2.5 text-sm text-ink"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-[24px] border border-[color:var(--line)] bg-[color:var(--sand)] p-8 md:p-10">
              <p className="eyebrow mb-6">COACHING MODALITIES</p>
              <div className="flex flex-wrap gap-3">
                {coaching.map((s) => (
                  <span
                    key={s.slug}
                    className="inline-block rounded-full border border-[color:var(--line)] bg-[color:var(--cream)] px-5 py-2.5 text-sm text-ink"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ImageBand
        src="/photos/zen-stones-poster.jpg"
        alt="Balanced stones, a still moment of calm"
        videoSrc="/media/services-band.mp4"
      />

      <CtaBand />
    </>
  );
}
