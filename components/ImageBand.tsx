import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function ImageBand({
  src,
  alt,
  objectPosition = "center",
  videoSrc,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  videoSrc?: string;
}) {
  return (
    <section className="px-[clamp(1.25rem,4vw,3rem)]">
      <Reveal>
        <div className="relative h-[46vh] min-h-[320px] max-h-[560px] rounded-[24px] overflow-hidden">
          {videoSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={src}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition }}
            />
          )}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-25"
            style={{ backgroundImage: "var(--grad-brand)" }}
          />
        </div>
      </Reveal>
    </section>
  );
}
