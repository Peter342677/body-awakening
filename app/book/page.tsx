import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/BookingWidget";
import Reveal from "@/components/Reveal";
import { ShieldCheck, CalendarClock, HeartHandshake } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a Session",
  description:
    "Choose your service and a time that works for you. Secure payment, calendar confirmation, everything you need before we meet.",
  path: "/book",
});

const TRUST = [
  { icon: ShieldCheck, label: "Secure payment via Stripe" },
  { icon: CalendarClock, label: "Free cancellation up to 24 hours before" },
  { icon: HeartHandshake, label: "Veteran-owned practice" },
];

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string; service?: string }>;
}) {
  const { confirmed, service } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="BOOK YOUR SESSION"
        heading="Book your session."
        sub="Choose your service and a time that works for you. Payment is secure, and you'll receive a confirmation with everything you need before we meet."
      />

      <section className="section-pad">
        <div className="container-brand max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
                <Image
                  src="/photos/jason/jason-reading.jpg"
                  alt="Jason Gentrup"
                  fill
                  sizes="64px"
                  className="object-cover"
                  style={{ objectPosition: "75% 15%" }}
                />
              </div>
              <p className="text-[color:var(--ink-soft)]">
                You&rsquo;ll be working directly with{" "}
                <span className="text-ink">Jason Gentrup</span>, founder of
                Body Awakening.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <BookingWidget confirmedId={confirmed} initialServiceSlug={service} />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[color:var(--mauve)] shrink-0" />
                <p className="text-sm text-[color:var(--ink-soft)]">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[color:var(--ink-soft)]">
            Questions before you book? <a href="/contact" className="link-underline text-ink">Contact us</a>, Jason reads every message.
          </p>
        </div>
      </section>
    </>
  );
}
