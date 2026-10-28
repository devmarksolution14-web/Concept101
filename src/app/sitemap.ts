import type { MetadataRoute } from "next";
import { MARKETS } from "@/content/markets";
import { SERVICES_SEO } from "@/content/services-seo";
import { ROUTES, SITE } from "@/lib/site";

/** Keyword landing pages get the highest priority after the home page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: new URL(path, SITE.url).toString(),
    lastModified: SITE.updated,
    changeFrequency: "monthly",
    priority,
  });
  return [
    ...ROUTES.map((p) => entry(p, p === "/" ? 1 : p === "/digital-growth-agency-nepal" ? 0.95 : 0.6)),
    ...SERVICES_SEO.map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...MARKETS.map((m) => entry(`/markets/${m.slug}`, 0.85)),
  ];
}
