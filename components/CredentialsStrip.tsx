import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import { CREDENTIALS } from "@/lib/credentials";

export default function CredentialsStrip({
  eyebrow = "CREDENTIALS",
}: {
  eyebrow?: string;
}) {
  return (
    <section className="section-pad bg-[color:var(--sand)]">
      <div className="container-brand">
        <Reveal>
          <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {CREDENTIALS.map((c, i) => (
            <Reveal key={c} delay={i * 40}>
              <span className="inline-block rounded-full border border-[color:var(--line)] bg-[color:var(--cream)] px-5 py-2.5 text-sm text-ink">
                {c}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
