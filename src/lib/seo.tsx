import { abs, ORG_ID, SITE, WEBSITE_ID } from "./site";

type Json = Record<string, unknown>;

/** Renders schema.org JSON-LD, escaped against script injection. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const graph = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

/** Drops empty strings, empty arrays and nulls so placeholders never reach the markup. */
function clean<T extends Json>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== "" && v != null && !(Array.isArray(v) && v.length === 0)),
  ) as T;
}

/** The business as a local professional service. Rendered once, site-wide. */
export function organizationSchema(): Json {
  const a = SITE.address;
  return clean({
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: clean({
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    }),
    geo: SITE.geo ? { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng } : null,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Country", name })),
    sameAs: SITE.sameAs,
  });
}

export function websiteSchema(): Json {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE.url, name: SITE.name, publisher: { "@id": ORG_ID }, inLanguage: "en" };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function webPageSchema(path: string, name: string, description: string): Json {
  return { "@type": "WebPage", "@id": abs(path), url: abs(path), name, description, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORG_ID }, inLanguage: "en" };
}

export function serviceSchema(path: string, name: string, serviceType: string, description: string, areaServed: string[]): Json {
  return {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: areaServed.map((n) => ({ "@type": "Country", name: n })),
  };
}

/** Shared metadata shape for keyword landing pages. */
export function pageMetadata(path: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, url: path, siteName: SITE.name, title, description, locale: SITE.locale },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}
