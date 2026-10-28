import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TimeOverlap from "@/components/seo/TimeOverlap";
import { Breadcrumbs, ContactCta, Faq, FeatureList, Hero, LinkGrid, Section, Shell } from "@/components/seo/ui";
import { MARKET_BY_SLUG, MARKETS } from "@/content/markets";
import { SERVICES_SEO } from "@/content/services-seo";
import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata, serviceSchema, webPageSchema } from "@/lib/seo";

export function generateStaticParams() {
  return MARKETS.map((m) => ({ slug: m.slug }));
}

// Every real slug is prerendered above; anything else 404s, so this route may block instead of streaming a shell.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/markets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = MARKET_BY_SLUG[slug];
  if (!m) return {};
  return pageMetadata(`/markets/${m.slug}`, m.title, m.description);
}

export default async function MarketPage({ params }: PageProps<"/markets/[slug]">) {
  const { slug } = await params;
  const m = MARKET_BY_SLUG[slug];
  if (!m) notFound();

  const path = `/markets/${m.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Where we work", path: "/digital-growth-agency-nepal" },
    { name: m.country.replace(/^the /, "").replace(/^\w/, (c) => c.toUpperCase()), path },
  ];

  return (
    <main className="flex-1">
      <JsonLd
        data={[
          webPageSchema(path, m.title, m.description),
          serviceSchema(path, m.h1, "Digital marketing, web development and design", m.description, m.areaServed),
          breadcrumbSchema(crumbs),
          faqSchema(m.faq),
        ]}
      />
      <Shell>
        <Breadcrumbs items={crumbs} />

        <Hero title={m.h1} sub={m.intro} />

        <Section id="time-heading" title="How our days line up" intro={m.rhythm}>
          <TimeOverlap city={m.city} tzLabel={m.tzLabel} utcOffset={m.utcOffset} />
        </Section>

        <Section id="why-heading" title={`Why businesses in ${m.country} work with us`}>
          <FeatureList items={m.reasons} />
        </Section>

        <LinkGrid
          id="services-heading"
          title={`What we do for clients in ${m.country}`}
          links={SERVICES_SEO.map((s) => ({ href: `/services/${s.slug}`, label: s.serviceType.replace(/^\w/, (c) => c.toUpperCase()), text: s.description }))}
        />

        <Faq items={m.faq} title={`Working with a Nepal agency from ${m.country}`} />

        <ContactCta heading={`Book a call at a time that works in ${m.city}`} />
      </Shell>
    </main>
  );
}
