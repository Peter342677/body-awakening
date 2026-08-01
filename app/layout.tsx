import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Cursor from "@/components/Cursor";
import CursorAura from "@/components/CursorAura";
import ScrollProgress from "@/components/ScrollProgress";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import AnalyticsGate from "@/components/AnalyticsGate";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { localBusinessJsonLd, personJsonLd } from "@/lib/jsonld";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: Massage Therapy & Life & Spiritual Coaching with Jason Gentrup`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Bodywork and coaching for people ready to come home to themselves. Reiki, craniosacral, lymphatic bodywork, and life and spiritual coaching with Jason Gentrup.",
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/favicon-180.png", sizes: "180x180" }],
    shortcut: ["/brand/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={personJsonLd()} />
        <SmoothScrollProvider>
          <CursorAura />
          <Cursor />
          <ScrollProgress />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
        <AnalyticsGate />
      </body>
    </html>
  );
}
