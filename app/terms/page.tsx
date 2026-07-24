import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildMetadata, SITE_EMAIL } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of the Body Awakening website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL" heading="Terms of Service" updated="⟨DATE⟩">
      <p>
        These terms govern your use of this website and the booking of
        sessions with ⟨BUSINESS_LEGAL_NAME⟩ (&ldquo;Body Awakening&rdquo;).
        By using this site or booking a session, you agree to these terms.
      </p>
      <h2 className="text-xl text-ink pt-4">Sessions &amp; payment</h2>
      <p>
        Session prices and durations are listed on our Services and Booking
        pages. Payment is collected securely at the time of booking through
        Stripe.
      </p>
      <h2 className="text-xl text-ink pt-4">Cancellations &amp; rescheduling</h2>
      <p>⟨POLICY⟩</p>
      <h2 className="text-xl text-ink pt-4">Not medical advice</h2>
      <p>
        Massage therapy and coaching offered through Body Awakening are not a
        substitute for medical or mental health treatment. Please consult a
        licensed physician for medical concerns.
      </p>
      <h2 className="text-xl text-ink pt-4">Contact</h2>
      <p>Questions about these terms? Reach us at {SITE_EMAIL}.</p>
    </LegalPage>
  );
}
