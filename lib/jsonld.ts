import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL, SITE_LOCATION } from "@/lib/seo";
import type { Service } from "@/lib/services";

export const personJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jason Gentrup",
  jobTitle: "Massage Therapist & Somatic Coach",
  url: `${SITE_URL}/about`,
  worksFor: { "@type": "Organization", name: SITE_NAME },
  alumniOf: [
    { "@type": "OrganizationRole", name: "U.S. Marine Corps" },
  ],
});

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/brand/logo-horizontal.png`,
  founder: { "@type": "Person", name: "Jason Gentrup" },
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  areaServed: SITE_LOCATION,
  priceRange: "$$",
});

export const serviceJsonLd = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: service.name,
  description: service.description,
  provider: { "@type": "Person", name: "Jason Gentrup" },
  areaServed: SITE_LOCATION,
  url: `${SITE_URL}/services/${service.hub}`,
});

export const bookJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name: "The Human Compass",
  author: { "@type": "Person", name: "Jason Gentrup" },
  url: `${SITE_URL}/the-human-compass`,
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
