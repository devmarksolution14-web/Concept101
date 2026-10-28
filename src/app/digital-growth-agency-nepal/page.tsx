import type { Metadata } from "next";
import { Breadcrumbs, ContactCta, Faq, FeatureList, Hero, LinkGrid, Section, Shell } from "@/components/seo/ui";
import { MARKETS } from "@/content/markets";
import { SERVICES_SEO } from "@/content/services-seo";
import { breadcrumbSchema, faqSchema, JsonLd, pageMetadata, webPageSchema } from "@/lib/seo";

const PATH = "/digital-growth-agency-nepal";
const TITLE = "Digital Growth Agency in Nepal | Marketing, Web & SEO";
const DESCRIPTION =
  "Kathmandu-based digital growth agency: digital marketing, SEO, web development, branding, video and AI automation for businesses in Nepal and clients worldwide.";

const STEPS = [
  { title: "1. Growth audit", text: "We review your website, search visibility, ads and analytics, and find where growth is leaking." },
  { title: "2. Plan", text: "A written plan with priorities, budget and the numbers we'll track together." },
  { title: "3. Build & launch", text: "Website, content, campaigns or automations, shipped in small pieces you can review." },
  { title: "4. Measure & grow", text: "Monthly reporting tied to leads and revenue, and the next round of improvements." },
];

const FAQ = [
  {
    q: "What does a digital growth agency do?",
    a: "A digital growth agency combines the services that bring a business customers online: a fast website, SEO, paid advertising, social content, branding and automation, planned together around measurable growth.",
  },
  {
    q: "Where is your office in Nepal?",
    a: "We're based in Kathmandu. We meet clients in person across Kathmandu Valley and work remotely with businesses everywhere else in Nepal.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work with clients in the USA, UK, Australia and the Middle East, remotely and in English.",
  },
  {
    q: "Can you help a small business in Nepal get found on Google?",
    a: "Yes. Local SEO, a Google Business Profile, a fast website and a few well-targeted pages are usually the quickest wins for small businesses in Nepal.",
  },
  {
    q: "Do you create content in Nepali?",
    a: "Yes. We create social media, ads and website content in English, Nepali or both.",
  },
];

export const metadata: Metadata = pageMetadata(PATH, TITLE, DESCRIPTION);

export default function NepalPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Digital growth agency in Nepal", path: PATH },
  ];

  return (
    <main className="flex-1">
      <JsonLd data={[webPageSchema(PATH, TITLE, DESCRIPTION), breadcrumbSchema(crumbs), faqSchema(FAQ)]} />
      <Shell>
        <Breadcrumbs items={crumbs} />

        <Hero
          title="Digital Growth Agency in Nepal"
          accent="in Nepal"
          sub="We're a Kathmandu-based team of designers, developers and marketers helping businesses grow online. Websites that load fast and rank, campaigns tied to revenue, brands people remember and automation that frees up your team, for clients in Nepal and around the world."
        />

        <LinkGrid
          id="services-heading"
          title="Digital marketing, web and design services in Kathmandu"
          links={SERVICES_SEO.map((s) => ({ href: `/services/${s.slug}`, label: s.h1, text: s.description }))}
        />

        <Section
          id="process-heading"
          title="How we grow businesses"
          accent="businesses"
          intro="Growth comes from the channels working together. Every engagement follows the same four steps, whether you're a shop in Thamel or a startup in Sydney."
        >
          <FeatureList items={STEPS} />
        </Section>

        <LinkGrid
          id="markets-heading"
          title="Working with clients abroad"
          links={MARKETS.map((m) => ({ href: `/markets/${m.slug}`, label: m.h1, text: m.description }))}
        />

        <Faq items={FAQ} />

        <ContactCta heading="Grow your business with a team in Kathmandu" />
      </Shell>
    </main>
  );
}
