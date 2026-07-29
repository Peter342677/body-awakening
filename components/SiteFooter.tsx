import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";
import { getServicesByHub } from "@/lib/services";
import { SITE_EMAIL, SITE_PHONE, SITE_LOCATION } from "@/lib/seo";

function SocialIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={d} />
    </svg>
  );
}

export default function SiteFooter() {
  const massage = getServicesByHub("massage");
  const coaching = getServicesByHub("coaching");

  return (
    <footer className="night-section pt-20 pb-10">
      <div className="container-brand grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-5">
            <Image src="/brand/mark.svg" alt="" width={32} height={32} />
            <span className="font-display italic text-xl text-[color:var(--cream-on-night)]">
              Body Awakening
            </span>
          </Link>
          <p className="text-[color:var(--lilac)] max-w-xs leading-relaxed">
            Bodywork and coaching for people ready to come home to themselves.
          </p>
          <div className="flex gap-4 mt-6 text-[color:var(--lilac)]">
            <a href="⟨INSTAGRAM_URL⟩" aria-label="Instagram">
              <SocialIcon d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm4.6-1.6h.01" />
            </a>
            <a href="⟨FACEBOOK_URL⟩" aria-label="Facebook">
              <SocialIcon d="M15 4h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h2.6l.4-4H13V8a1 1 0 0 1 1-1h2V4Z" />
            </a>
            <a href="⟨YOUTUBE_URL⟩" aria-label="YouTube">
              <SocialIcon d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.7.4-4.7ZM10 15V9l5 3-5 3Z" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-3 text-[color:var(--cream-on-night)]">
            <li><Link href="/about" className="link-underline">About Jason</Link></li>
            <li><Link href="/services" className="link-underline">Services</Link></li>
            <li><Link href="/the-human-compass" className="link-underline">The Human Compass</Link></li>
            <li><Link href="/journal" className="link-underline">Journal</Link></li>
            <li><Link href="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-3 text-[color:var(--cream-on-night)]">
            {[...massage.slice(0, 2), ...coaching.slice(0, 2)].map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.hub}`}
                  className="link-underline"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Stay in touch</p>
          <Newsletter onDark />
          <p className="mt-6 text-sm text-[color:var(--lilac)]">
            <a href={`mailto:${SITE_EMAIL}`} className="link-underline">{SITE_EMAIL}</a>
            {" · "}
            <a href={`tel:${SITE_PHONE.replace(/[^+\d]/g, "")}`} className="link-underline">{SITE_PHONE}</a>
            <br />
            {SITE_LOCATION}
          </p>
        </div>
      </div>

      <div className="container-brand mt-16 pt-8 border-t border-[color:var(--night-2)] flex flex-col md:flex-row justify-between gap-3 text-xs text-[color:var(--lilac)]">
        <p>© {new Date().getFullYear()} Body Awakening. Veteran-owned.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="link-underline">Privacy</Link>
          <Link href="/terms" className="link-underline">Terms</Link>
          <Link href="/accessibility" className="link-underline">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
