import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildMetadata, SITE_EMAIL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Body Awakening collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL" heading="Privacy Policy" updated="⟨DATE⟩">
      <p>
        ⟨BUSINESS_LEGAL_NAME⟩ (&ldquo;Body Awakening,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) respects your privacy. This policy explains what
        information we collect through this site, how we use it, and the
        choices you have.
      </p>
      <h2 className="text-xl text-ink pt-4">Information we collect</h2>
      <p>
        When you book a session, join our newsletter, or send us a message,
        we collect the details you provide: name, email, phone, and any
        notes you share. Payment information is processed directly by Stripe
        and never stored on our servers.
      </p>
      <h2 className="text-xl text-ink pt-4">How we use it</h2>
      <p>
        We use your information to schedule and confirm sessions, respond to
        inquiries, and, if you opt in, send occasional updates. We do not
        sell your information.
      </p>
      <h2 className="text-xl text-ink pt-4">Analytics</h2>
      <p>
        We use Google Analytics to understand how visitors use this site.
        You can opt out via your cookie preferences at any time.
      </p>
      <h2 className="text-xl text-ink pt-4">Contact</h2>
      <p>Questions about this policy? Reach us at {SITE_EMAIL}.</p>
    </LegalPage>
  );
}
