"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

const CONSENT_KEY = "ba-consent";

export default function AnalyticsGate() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    // Reads a client-only source (localStorage) once after mount, so the
    // server-rendered banner state matches on hydration.
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "granted" || stored === "denied") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(stored);
    }
  }, []);

  const respond = (value: "granted" | "denied") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (!gtmId) return null;

  return (
    <>
      {consent === "granted" && <GoogleTagManager gtmId={gtmId} />}
      {consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-[9995] night-section">
          <div className="container-brand py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[color:var(--lilac)] max-w-xl">
              We use cookies for basic site analytics. No personal data is
              sold. See our{" "}
              <a href="/privacy" className="link-underline text-[color:var(--cream-on-night)]">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => respond("denied")}
                className="rounded-full px-5 py-2.5 text-xs uppercase tracking-wide border border-[color:var(--lilac)]/40 text-[color:var(--cream-on-night)]"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => respond("granted")}
                className="rounded-full px-5 py-2.5 text-xs uppercase tracking-wide text-cream"
                style={{ backgroundImage: "var(--grad-brand)" }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
