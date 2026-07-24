import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

export default function CtaBand({
  heading = "Your body has been waiting for you.",
}: {
  heading?: string;
}) {
  return (
    <section className="night-section section-pad">
      <div className="container-brand text-center">
        <Reveal>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] max-w-3xl mx-auto">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10">
            <Button href="/book">Book a Session</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
