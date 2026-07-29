import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PinnedPhilosophy from "@/components/PinnedPhilosophy";
import PortraitReveal from "@/components/PortraitReveal";
import CredentialsStrip from "@/components/CredentialsStrip";
import CtaBand from "@/components/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Jason Gentrup: Veteran & Bodyworker",
  description:
    "Marine Corps veteran, bodyworker, and world traveler. The story behind Body Awakening and the philosophy that shapes every session.",
  path: "/about",
});

const SECTIONS = [
  {
    heading: "A life spent learning to navigate",
    body: "Jason Gentrup was born in Belle Fourche, South Dakota, French for “beautiful forks,” and known as the geographic center of the nation. It is the place where one river splits into two, and there has always been something fitting in that. His life has been an unbroken study in navigation: of the world, and of himself.",
  },
  {
    heading: "The Marine Corps, and a wake-up call",
    body: "He joined the Marine Corps in search of structure and challenge, and was stationed at Marine Corps Base Hawaii. He deployed twice, once to Iraq, once to Afghanistan, and lost his lieutenant overseas. Those years became a wake-up call: to see the world as it actually is, not as we are told it is. He learned to carry his lieutenant with him, and to live the life his friend never got the chance to.",
  },
];

const LATER_SECTIONS = [
  {
    heading: "An education in the human condition",
    body: "The greatest gift of the work, Jason will tell you, is the education it gave him in being human. Talking with thousands of people at their most vulnerable, there on his table, he watched them open up in ways they rarely do anywhere else. Hour after hour, he learned how the body connects each of us to the world around us, and how much we carry that we never speak of.",
  },
  {
    heading: "Six continents, thirty countries",
    body: "In 2016 he sold nearly everything and set out with his daughter to see the world: every continent, every ancient site, anything worth learning. Over two and a half years they visited some 30 countries across six continents, living through it all, including COVID in three countries and nine states. He went to see the world as it truly is, and to never get caught in a single way of seeing it.",
  },
  {
    heading: "Putting it to use",
    body: "Back home, Jason earned a degree in Political Science and Sociology to understand how the world's problems come to be, and a Master's in Urban and Regional Planning to help solve them. He asks a simple question of everything he's learned: what good is wisdom locked away in a single vessel? Body Awakening, and his book, The Human Compass, are his answer. This is the beginning of a new journey: to share what has helped him navigate this world, and himself.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="THE STORY"
        heading="The body is our guide through this world, here to help us navigate."
      />

      <section className="section-pad">
        <div className="container-brand grid gap-16 md:grid-cols-[1fr_1.1fr] items-start">
          <Reveal>
            <div className="relative sticky top-32 aspect-[4/5] rounded-[24px] overflow-hidden">
              <Image
                src="/photos/jason/jason-portrait.jpg"
                alt="Jason Gentrup"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
          <div className="space-y-16">
            {SECTIONS.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="text-2xl md:text-3xl mb-4">{s.heading}</h2>
                <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where the healing began: dark pull-quote band */}
      <section className="night-section section-pad">
        <div className="container-brand max-w-3xl">
          <Reveal>
            <h2 className="text-2xl md:text-3xl mb-6">
              Where the healing began
            </h2>
            <p className="text-lg leading-[1.75] text-[color:var(--lilac)]">
              After leaving the Corps, Jason raised his daughter as a single
              father while going back to school. Florida was rock bottom:
              PTSD at its worst, burning out, running on empty. Then he
              enrolled in massage school, and everything changed. He learned
              how starved he had been for touch, which is vital to human
              flourishing, and for connection. Bodywork became the ground he
              rebuilt himself on.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-display-italic text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.3] gradient-text mt-12">
              &ldquo;Massage and bodywork kept me from joining the people who
              leave early.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <PortraitReveal
        src="/photos/jason/jason-couch-smiling.jpg"
        alt="Jason Gentrup, overlooking Waikiki"
        caption="Jason Gentrup, Honolulu"
        objectPosition="65% 20%"
      />

      <section className="section-pad">
        <div className="container-brand max-w-3xl space-y-16">
          {LATER_SECTIONS.map((s) => (
            <Reveal key={s.heading}>
              <h2 className="text-2xl md:text-3xl mb-4">{s.heading}</h2>
              <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <PinnedPhilosophy />

      <CredentialsStrip />

      <CtaBand />
    </>
  );
}
