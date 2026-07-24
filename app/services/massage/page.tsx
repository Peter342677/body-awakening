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
  title: "Massage Therapy: Reiki, Craniosacral, Lymphatic & Distant Healing",
  description:
    "Nervous-system-first bodywork with Jason Gentrup: Reiki and energy work, craniosacral therapy, lymphatic drainage, and distant healing.",
  path: "/services/massage",
});

const MODALITIES = [
  {
    title: "Reiki & Energy Work",
    body: "A gentle, hands-on (or hands-near) practice that works with the body's energy to calm the nervous system, ease stress, and restore a sense of flow. Deeply relaxing and often profoundly quieting for a mind that won't stop, a way to let the body downshift into its own capacity to heal.",
  },
  {
    title: "Craniosacral Therapy",
    body: "A light-touch approach that follows the subtle rhythm of the craniosacral system: the fluid and membranes surrounding the brain and spinal cord. By releasing deep restrictions around the head, spine, and nervous system, craniosacral work can ease tension, headaches, and the residue of stress and trauma held in the body.",
  },
  {
    title: "Lymphatic Drainage",
    body: "A precise, feather-light technique that encourages the movement of lymph, the body's natural detox and immune network. It reduces swelling and fluid retention, supports recovery, and leaves the body feeling lighter, clearer, and less inflamed.",
  },
  {
    title: "Distant Healing",
    body: "Energy work is not bound by the room. For clients who can't be present in person, Jason offers distant healing sessions: a focused, intentional practice held remotely to support relaxation, balance, and wellbeing wherever you are.",
  },
];

const STEPS = ["Intake & listening", "The work", "Integration", "Aftercare guidance"];

export default function MassagePage() {
  const massage = getServicesByHub("massage");

  return (
    <>
      {massage.map((s) => (
        <JsonLd key={s.slug} data={serviceJsonLd(s)} />
      ))}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Massage Therapy", path: "/services/massage" },
        ])}
      />
      <PageHero
        eyebrow="MASSAGE THERAPY"
        heading="Bodywork that speaks to the whole nervous system."
        sub="This is not a spa add-on. Jason's bodywork is built on more than a decade on the table and a deep study of how the body holds, and releases, what we live through. Each modality below can stand alone or be woven into a session shaped around you."
      />

      <ServiceVideoBand
        src="/media/massage.mp4"
        poster="/media/massage-poster.jpg"
        caption="Hands-on bodywork, slowed down"
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
          <Eyebrow className="mb-6">HOW A SESSION WORKS</Eyebrow>
          <div className="grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s} delay={i * 80}>
                <span className="font-display text-3xl gradient-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lg text-ink">{s}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-brand">
          <Eyebrow className="mb-6">SESSIONS &amp; PRICING</Eyebrow>
          <PricingStub items={massage} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
