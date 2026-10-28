import type { Metadata } from "next";
import AboutSeo from "@/components/about3/AboutSeo";
import { FAQ } from "@/components/about3/content";
import { PEOPLE } from "@/components/about/data";
import { SERVICES } from "@/components/services/data";
import { SITE } from "@/lib/site";

const PATH = "/about-3";
const TITLE = "About Us: Design, Development & Growth Studio";
const DESCRIPTION =
  "Meet the seven-person studio behind fast websites, memorable brands, SEO, video and AI automation. See what we believe, with live proof, and who you'll work with.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE.name}` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function About3Page() {
  const url = new URL(PATH, SITE.url).toString();
  const orgId = new URL("/#organization", SITE.url).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        knowsAbout: SERVICES.map((s) => s.title),
        numberOfEmployees: { "@type": "QuantitativeValue", value: PEOPLE.length },
        employee: PEOPLE.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role, description: p.bio })),
      },
      {
        "@type": "AboutPage",
        "@id": url,
        url,
        name: TITLE,
        description: DESCRIPTION,
        about: { "@id": orgId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", SITE.url).toString() },
          { "@type": "ListItem", position: 2, name: "About Us", item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <AboutSeo />
    </main>
  );
}
