/**
 * Single source of truth for the business. Every page's metadata, canonical URLs,
 * sitemap and structured data (JSON-LD) read from here.
 *
 * BEFORE LAUNCH — fill in every field marked TODO with real details.
 * Empty strings are left out of the structured data automatically, so nothing fake ships,
 * but local ranking (Google Maps, "near me") needs a real street address and phone number
 * that match your Google Business Profile exactly.
 */
export const SITE = {
  /** TODO: real brand name */
  name: "Studio",
  /** TODO: set NEXT_PUBLIC_SITE_URL to the production domain, e.g. https://yourdomain.com */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Digital growth agency in Kathmandu, Nepal: web development, SEO, digital marketing, branding, video and AI automation for clients in Nepal and worldwide.",
  locale: "en_US",
  /** Content last updated; shown to search engines in the sitemap. Bump when pages change. */
  updated: "2026-10-28",
  /** TODO: real contact details (international format for phone, e.g. +977-1-XXXXXXX) */
  email: "",
  phone: "",
  address: {
    street: "", // TODO: street address
    locality: "Kathmandu",
    region: "Bagmati Province",
    postalCode: "44600",
    country: "NP",
  },
  /** TODO: exact office coordinates from Google Maps; leave null to omit */
  geo: null as { lat: number; lng: number } | null,
  /** Opening hours in Nepal time (NPT, UTC+5:45). TODO: confirm */
  hours: { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
  /** TODO: full URLs of real profiles (Google Business Profile, LinkedIn, Facebook, Instagram, Clutch…) */
  sameAs: [] as string[],
  /** Where clients come from; used for areaServed in structured data */
  areaServed: ["Nepal", "United States", "United Kingdom", "Australia", "United Arab Emirates", "Qatar"],
};

/** Indexable static routes listed in the sitemap (concept variants /about, /about-2, /portfolio-2 are noindex) (dynamic service and market pages are added in sitemap.ts). */
export const ROUTES = ["/", "/services", "/portfolio", "/about-3", "/digital-growth-agency-nepal"];

export const abs = (path: string) => new URL(path, SITE.url).toString();
export const ORG_ID = abs("/#organization");
export const WEBSITE_ID = abs("/#website");
