import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContactCta, Faq, FeatureList, Hero, LinkGrid, Monitor, Section, Shell } from "@/components/seo/ui";
import { SCENES } from "@/components/services/scenes";
import { MARKETS } from "@/content/markets";
import { SERVICE_SEO_BY_SLUG, SERVICES_SEO } from "@/content/services-seo";
import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata, serviceSchema, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES_SEO.map((s) => ({ slug: s.slug }));
}

// Every real slug is prerendered above; anything else 404s, so this route may block instead of streaming a shell.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICE_SEO_BY_SLUG[slug];
  if (!s) return {};
  return pageMetadata(`/services/${s.slug}`, s.title, s.description);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = SERVICE_SEO_BY_SLUG[slug];
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.serviceType.replace(/^\w/, (c) => c.toUpperCase()), path },
  ];
  const Scene = SCENES[s.serviceId];

  return (
    <main className="flex-1">
      <JsonLd
        data={[
          webPageSchema(path, s.title, s.description),
          serviceSchema(path, s.h1, s.serviceType, s.description, SITE.areaServed),
          breadcrumbSchema(crumbs),
          faqSchema(s.faq),
        ]}
      />
      <Shell>
        <Breadcrumbs items={crumbs} />

        <Hero
          title={s.h1}
          accent="in Nepal"
          sub={s.intro}
          visual={
            <Monitor label={`studio://services/${s.serviceId}`}>
              <div aria-hidden className="screen-grid relative aspect-[16/11]">
                {Scene && <Scene />}
                <div className="scanlines pointer-events-none absolute inset-0" />
              </div>
            </Monitor>
          }
        />

        <Section id="included" title="What's included" intro={`Everything we deliver as part of our ${s.serviceType.toLowerCase()} service, scoped to what your business actually needs.`}>
          <FeatureList items={s.included} />
        </Section>

        <section aria-labelledby="who-heading" className="reveal mt-24 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="who-heading" className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
              Who it&apos;s <span className="text-accent">for</span>
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {s.forWho.map((w) => (
                <li key={w} className="flex gap-3 text-lg leading-snug text-white/85">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-panel/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">For clients outside Nepal</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.international}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <li key={m.slug}>
                  <a href={`/markets/${m.slug}`} className="inline-flex rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/80 transition-colors hover:border-accent/50 hover:text-white">
                    {s.serviceType} for {m.country.replace(/^the /, "the ")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq items={s.faq} title={`${s.serviceType.replace(/^\w/, (c) => c.toUpperCase())}: your questions`} />

        <LinkGrid
          id="related-heading"
          title="Often paired with"
          links={s.related.map((r) => {
            const rel = SERVICE_SEO_BY_SLUG[r];
            return { href: `/services/${rel.slug}`, label: rel.h1, text: rel.description };
          })}
        />

        <ContactCta heading={`Talk to a ${s.serviceType.toLowerCase()} team in Kathmandu`} />
      </Shell>
    </main>
  );
}
