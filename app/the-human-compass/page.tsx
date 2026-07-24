import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import Newsletter from "@/components/Newsletter";
import Button from "@/components/Button";
import PortraitReveal from "@/components/PortraitReveal";
import BookMockup3D from "@/components/BookMockup3D";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { bookJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "The Human Compass",
  description:
    "The Human Compass is Jason Gentrup's guide for navigating a world turned upside down, and, more importantly, for navigating yourself.",
  path: "/the-human-compass",
});

export default function HumanCompassPage() {
  return (
    <>
      <JsonLd data={bookJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The Human Compass", path: "/the-human-compass" },
        ])}
      />
      <PageHero
        eyebrow="THE BOOK"
        heading="The Human Compass"
        sub="A guide for navigating a world turned upside down, and, more importantly, for navigating yourself."
      />

      <section className="section-pad">
        <div className="container-brand grid gap-16 md:grid-cols-2 items-center">
          <BookMockup3D
            frontSrc="/brand/book-cover-front.jpg"
            backSrc="/brand/book-cover-back.jpg"
            frontAlt="The Human Compass: front cover"
            backAlt="The Human Compass: back cover"
          />
          <div>
            <Reveal>
              <Eyebrow className="mb-5">ABOUT THE BOOK</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)]">
                Back home, Jason earned a degree in Political Science and
                Sociology to understand how the world&rsquo;s problems come to
                be, and a Master&rsquo;s in Urban and Regional Planning to
                help solve them. He asks a simple question of everything
                he&rsquo;s learned: what good is wisdom locked away in a
                single vessel? The Human Compass, and Body Awakening, are
                his answer.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book">Book a Session</Button>
                <Button href="/about" variant="text">Read Jason&rsquo;s story</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PortraitReveal
        src="/photos/jason/jason-book.jpg"
        alt="Jason Gentrup with The Human Compass"
        caption="Jason Gentrup, author of The Human Compass"
        objectPosition="60% 18%"
      />

      <section className="section-pad bg-[color:var(--sand)]">
        <div className="container-brand max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-5">WHO IT&rsquo;S FOR</Eyebrow>
            <p className="text-lg leading-[1.75] text-[color:var(--ink-soft)]">
              For anyone who has felt off-course, in a relationship, a
              career, a body, or a life, and wants a grounded, honest guide
              back to themselves. Written from lived experience, not theory:
              two deployments, a rebuilt life, and two and a half years
              circling the globe to see the world as it actually is.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-brand max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-5">AN EXCERPT</Eyebrow>
            <blockquote className="font-display-italic text-2xl md:text-3xl leading-[1.4] gradient-text">
              ⟨EXCERPT⟩
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="night-section section-pad">
        <div className="container-brand max-w-xl text-center mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl mb-4">
              Be the first to know when it&rsquo;s available.
            </h2>
            <p className="text-[color:var(--lilac)] mb-8">
              Join the list for release updates and early excerpts.
            </p>
            <div className="flex justify-center">
              <Newsletter onDark />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
