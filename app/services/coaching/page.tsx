import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import ModalityRow from "@/components/ModalityRow";
import PricingStub from "@/components/PricingStub";
import ServiceVideoBand from "@/components/ServiceVideoBand";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getServicesByHub } from "@/lib/services";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Coaching: Spiritual, Wellness, Life & Performance",
  description:
    "Somatic-rooted coaching with Jason Gentrup: spiritual, wellness, life, and performance coaching for people ready to navigate themselves.",
  path: "/services/coaching",
});

const MODALITIES = [
  {
    title: "Spiritual Coaching",
    body: "For those sensing there is more to their life than the surface of it. Together we explore meaning, connection, and your relationship to something larger, not through dogma, but through direct experience and honest inquiry.",
  },
  {
    title: "Wellness Coaching",
    body: "A whole-person approach to feeling well: sleep, stress, movement, nourishment, and nervous-system regulation. We build habits that fit your real life and help your body find steadiness again.",
  },
  {
    title: "Life Coaching",
    body: "For the crossroads moments: transitions, decisions, and the sense of being off-course. We work to clarify what matters, name what's in the way, and chart a path you can actually walk.",
  },
  {
    title: "Performance & Somatic Coaching",
    body: "For those who want to show up fully: in their work, their craft, their body. Rooted in somatic awareness, we train the ability to stay grounded under pressure and perform from a regulated, connected state rather than sheer force.",
  },
];

export default function CoachingPage() {
  const coaching = getServicesByHub("coaching");

  return (
    <>
      {coaching.map((s) => (
        <JsonLd key={s.slug} data={serviceJsonLd(s)} />
      ))}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Coaching", path: "/services/coaching" },
        ])}
      />
      <PageHero
        eyebrow="COACHING"
        heading="For the parts of the journey that touch alone can't reach."
        sub="Jason's coaching comes from lived experience: rebuilding a life from rock bottom, and studying the human condition on six continents and across a thousand conversations. It is grounded in the body (somatic coaching) and honest about how change actually happens. Come as you are; leave with a clearer sense of your own direction."
      />

      <ServiceVideoBand
        src="/media/coaching.mp4"
        poster="/media/coaching-poster.jpg"
        caption="Every path forward starts with a single step"
      />

      <section className="section-pad">
        <div className="container-brand space-y-10">
          {MODALITIES.map((m, i) => (
            <ModalityRow key={m.title} index={i + 1} title={m.title} body={m.body} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-[color:var(--sand)]">
        <div className="container-brand">
          <Eyebrow className="mb-6">FORMAT</Eyebrow>
          <Reveal>
            <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)] max-w-[62ch]">
              1:1 sessions, in person or remote; single sessions or ongoing
              containers. ⟨PACKAGES_AND_PRICES⟩
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-brand">
          <Eyebrow className="mb-6">SESSIONS &amp; PRICING</Eyebrow>
          <PricingStub items={coaching} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
