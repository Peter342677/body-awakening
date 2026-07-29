import type { Metadata } from "next";

export const SITE_NAME = "Body Awakening";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bodyawakeningmassage.com";
export const SITE_PHONE = "+1 (808) 724-6062";
export const SITE_EMAIL = "coolbreeze0113@yahoo.com";
export const SITE_LOCATION = "Honolulu, Hawaiʻi";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
