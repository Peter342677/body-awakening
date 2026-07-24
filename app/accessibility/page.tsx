import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildMetadata, SITE_EMAIL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility",
  description: "Body Awakening's commitment to an accessible website and practice.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage eyebrow="LEGAL" heading="Accessibility Statement" updated="⟨DATE⟩">
      <p>
        Body Awakening is committed to making this website usable by everyone,
        including people who rely on assistive technology. We aim to meet
        WCAG 2.1 AA guidelines across navigation, forms, and booking.
      </p>
      <h2 className="text-xl text-ink pt-4">What we&rsquo;ve built in</h2>
      <p>
        Keyboard-navigable menus and booking flow, visible focus states,
        sufficient color contrast, descriptive alt text, and a reduced-motion
        experience that disables parallax, the custom cursor, and autoplay
        video for visitors who prefer it.
      </p>
      <h2 className="text-xl text-ink pt-4">Let us know</h2>
      <p>
        If you encounter a barrier anywhere on this site, please tell us at
        {SITE_EMAIL} so we can fix it.
      </p>
    </LegalPage>
  );
}
