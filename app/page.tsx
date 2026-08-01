import type { Metadata } from "next";
import Image from "next/image";
import VideoHero from "@/components/VideoHero";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import StatCounter from "@/components/StatCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import Button from "@/components/Button";
import CredentialsStrip from "@/components/CredentialsStrip";
import CtaBand from "@/components/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Massage Therapy & Life & Spiritual Coaching in Honolulu",
  description:
    "Bodywork and coaching for people ready to come home to themselves. Reiki, craniosacral, lymphatic bodywork, and life and spiritual coaching with Jason Gentrup.",
  path: "/",
});

const APPROACH = [
  {
    step: "01",
    title: "Arrive",
    body: "We begin by slowing down. Every session starts with listening, to your body, your history, and what brought you here today.",
  },
  {
    step: "02",
    title: "Release",
    body: "Through the modality that fits you, we work with the body's own intelligence to unwind tension, restore flow, and quiet the nervous system.",
  },
  {
    step: "03",
    title: "Awaken",
    body: "You leave more connected than you came, to your body, your breath, and a clearer sense of your own direction.",
  },
];

const STATS = [
  { value: "2", label: "Deployments as a Marine" },
  { value: "30+", label: "Countries explored" },
  { value: "6", label: "Continents" },
  { value: "10+", label: "Years of bodywork" },
  { value: "1000+", label: "People helped" },
];

const TESTIMONIALS = [
  {
    quote:
      "I came in with a stiff neck and left feeling like I'd put down something I'd carried for years. Jason works on a level most bodyworkers never reach.",
    attribution: "Malia K., Hawaii",
  },
  {
    quote:
      "Every session feels like it meets me exactly where I am. I've never felt more listened to on a table.",
    attribution: "Rachel T., Hawaii",
  },
  {
    quote:
      "The coaching work changed how I move through hard decisions. Grounded, honest, and never pushy.",
    attribution: "David M., Hawaii",
  },
  {
    quote:
      "The craniosacral work eased a headache pattern I'd lived with for years. I didn't know I was holding that much until it wasn't there anymore.",
    attribution: "Noa P., Hawaii",
  },
  {
    quote:
      "Jason's presence alone is half the medicine. You feel truly seen the moment you walk in, before he even puts his hands on you.",
    attribution: "Leilani S., Hawaii",
  },
  {
    quote:
      "Lymphatic work after surgery got me back on my feet faster than I expected. Gentle, precise, and he explained every step.",
    attribution: "Aiko R., Hawaii",
  },
  {
    quote:
      "Working with Jason helped me get honest about what I actually wanted, not just what I thought I was supposed to want. That clarity changed everything.",
    attribution: "Kekoa L., Hawaii",
  },
];

export default function HomePage() {
  return (
    <>
      <VideoHero
        eyebrow="MASSAGE THERAPY · LIFE & SPIRITUAL COACHING"
        heading="Come home to the body that has been carrying you."
        highlight="home"
        sub="Body Awakening is the bodywork and coaching practice of Jason Gentrup, a place to release what you've been holding, reconnect with yourself, and learn to navigate your life from the inside out."
      />

      {/* INTRO / POSITIONING */}
      <section className="relative section-pad overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/photos/spa-still-life.jpg"
            alt="A calm massage therapy setting with soft, natural light"
            fill
            sizes="100vw"
            className="object-cover scale-110 opacity-40 blur-md"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--cream) 0%, color-mix(in srgb, var(--cream) 75%, transparent) 45%, color-mix(in srgb, var(--cream) 30%, transparent) 100%)",
            }}
          />
        </div>
        <div className="container-brand grid gap-16 md:grid-cols-2 items-center">
          <SectionHeading
            eyebrow="WHY BODY AWAKENING"
            heading="Healing that treats you as a whole person, not a set of symptoms."
            body="Most of us live a step removed from our own bodies. We push through tension, override exhaustion, and carry stress we can no longer name. Body Awakening is built on a simple truth Jason learned on the table and in his own recovery: the body is not the problem to be fixed. It is the guide. Through skilled touch and grounded conversation, we help you feel it again, trust it again, and let it lead you back to yourself."
            className="rounded-[24px] bg-[color:var(--cream)]/90 backdrop-blur-sm p-8 md:p-10 shadow-[0_20px_60px_-30px_rgba(42,30,51,0.25)]"
          />
          <Reveal delay={120}>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden">
              <Image
                src="/photos/whole-person-touch.jpg"
                alt="Calm, whole-person care: a gentle, grounded touch"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-pad bg-[color:var(--sand)]">
        <div className="container-brand">
          <SectionHeading
            eyebrow="WHAT WE OFFER"
            heading="Two paths. One aim: to bring you back into contact with yourself."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <ServiceCard
                title="Massage Therapy"
                description="Reiki and energy work, craniosacral therapy, lymphatic drainage, and distant healing: bodywork that speaks to the nervous system, not just the muscle."
                href="/services/massage"
                image="/photos/reiki-hands.jpg"
                imageAlt="Hands offering Reiki energy work"
              />
            </Reveal>
            <Reveal delay={100}>
              <ServiceCard
                title="Coaching"
                description="Spiritual and life coaching, plus wellness and performance work, for the parts of the journey that touch alone can't reach."
                href="/services/coaching"
                image="/photos/misty-road.jpg"
                imageAlt="A misty road stretching ahead, symbolizing the coaching journey"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE APPROACH */}
      <section className="section-pad">
        <div className="container-brand grid gap-16 md:grid-cols-[0.9fr_1.1fr] items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden">
              <Image
                src="/photos/jason/jason-couch-reading.jpg"
                alt="Jason Gentrup, present with a client's process"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Eyebrow className="mb-5">THE EXPERIENCE</Eyebrow>
            <div className="mt-4 grid gap-10 sm:grid-cols-2">
              {APPROACH.map((s, i) => (
                <Reveal key={s.step} delay={i * 100}>
                  <span className="font-display text-5xl gradient-text">
                    {s.step}
                  </span>
                  <h3 className="mt-4 text-2xl">{s.title}</h3>
                  <p className="mt-4 text-[color:var(--ink-soft)] leading-relaxed">
                    {s.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="night-section section-pad">
        <div className="container-brand grid gap-16 md:grid-cols-2 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden">
              <Image
                src="/photos/jason/jason-reading.jpg"
                alt="Jason Gentrup reading at home in Honolulu"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow className="mb-5">YOUR GUIDE</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08]">
                From two war zones to the healing table.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg leading-relaxed text-[color:var(--lilac)] max-w-[60ch]">
                Jason Gentrup is a Marine Corps veteran who found his way back
                to himself through bodywork, then spent years and six
                continents learning how the body connects us to everything
                around us. He brings all of it to the table.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8">
                <Button href="/about" variant="text" onDark>
                  Read Jason&rsquo;s story
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CredentialsStrip eyebrow="TRAINED & CREDENTIALED" />

      {/* IMPACT STATS */}
      <section className="section-pad">
        <div className="container-brand grid grid-cols-2 gap-10 md:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <StatCounter value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-[color:var(--sand)]">
        <div className="container-brand">
          <Reveal>
            <TestimonialSlider items={TESTIMONIALS} />
          </Reveal>
        </div>
      </section>

      {/* HUMAN COMPASS TEASER */}
      <section className="section-pad">
        <div className="container-brand grid gap-16 md:grid-cols-2 items-center">
          <Reveal>
            <div className="relative flex justify-center">
              <Image
                src="/brand/book-cover-front.jpg"
                alt="The Human Compass, book by Jason Gentrup"
                width={340}
                height={510}
                className="rounded-[16px] shadow-[0_24px_60px_-24px_rgba(126,99,166,0.4)]"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.08]">
                He wrote the map he wished he&rsquo;d had.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-lg leading-relaxed text-[color:var(--ink-soft)] max-w-[58ch]">
                The Human Compass is Jason&rsquo;s book on navigating a world
                turned upside down, and, more importantly, on navigating
                yourself.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8">
                <Button href="/the-human-compass" variant="text">
                  Explore the book
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
