import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import TrackedLink from "@/components/TrackedLink";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { buildMetadata, SITE_EMAIL, SITE_PHONE, SITE_LOCATION } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Questions about a session, a modality, or whether Body Awakening is right for you? Reach out, Jason reads every message.",
  path: "/contact",
});

const DETAILS = [
  { icon: Mail, label: SITE_EMAIL, href: `mailto:${SITE_EMAIL}`, event: "email_click" },
  {
    icon: Phone,
    label: SITE_PHONE,
    href: `tel:${SITE_PHONE.replace(/[^+\d]/g, "")}`,
    event: "phone_click",
  },
  { icon: MapPin, label: SITE_LOCATION },
  { icon: Clock, label: "Monday to Friday, 9:00 AM to 5:00 PM (Hawai'i time)" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        heading="Let's connect."
        sub="Questions about a session, a modality, or whether this is right for you? Reach out, Jason reads every message."
      />

      <section className="section-pad">
        <div className="container-brand grid gap-16 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden mb-8">
                <Image
                  src="/photos/jason/jason-contemplative.jpg"
                  alt="Jason Gentrup"
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover"
                />
              </div>
              <Eyebrow className="mb-6">DETAILS</Eyebrow>
              <ul className="space-y-4">
                {DETAILS.map(({ icon: Icon, label, href, event }) => (
                  <li key={label} className="flex items-center gap-3 text-[color:var(--ink-soft)]">
                    <Icon className="h-5 w-5 text-[color:var(--mauve)] shrink-0" />
                    {href ? (
                      <TrackedLink href={href} event={event!} className="link-underline">
                        {label}
                      </TrackedLink>
                    ) : (
                      label
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-8 aspect-video rounded-[20px] overflow-hidden border border-[color:var(--line)]">
                <iframe
                  title={`Map of ${SITE_LOCATION}`}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-157.95%2C21.25%2C-157.75%2C21.37&layer=mapnik&marker=21.3069%2C-157.8583"
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-8 text-sm text-[color:var(--ink-soft)]">
                Prefer to book directly? <a href="/book" className="link-underline text-ink">Head to booking</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
