import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="night-section min-h-[80vh] flex items-center">
      <div className="container-brand text-center max-w-xl mx-auto">
        <Image
          src="/brand/mark.svg"
          alt=""
          width={56}
          height={56}
          className="mx-auto mb-8 opacity-90"
        />
        <p className="eyebrow mb-4">LOST YOUR WAY?</p>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.05]">
          This page has wandered off.
        </h1>
        <p className="mt-6 text-lg text-[color:var(--lilac)]">
          Even the best-navigated paths take a wrong turn now and then.
          Let&rsquo;s get you back on course.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <Button href="/">Return Home</Button>
          <Link href="/book" className="link-underline text-[color:var(--cream-on-night)] self-center">
            Book a Session
          </Link>
        </div>
      </div>
    </section>
  );
}
