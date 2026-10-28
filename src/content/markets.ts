/**
 * International market pages at /markets/[slug].
 * Time-zone maths uses standard time (no daylight saving) and office hours of
 * 10:00–18:00 in Nepal (NPT, UTC+5:45) against 09:00–17:00 in the client's city.
 * Process promises (call times, invoicing currency) are drafts: keep only what you'll actually do.
 */

export type Market = {
  slug: string;
  country: string;
  /** Countries for areaServed */
  areaServed: string[];
  h1: string;
  title: string;
  description: string;
  intro: string;
  city: string;
  tzLabel: string;
  /** Client UTC offset in hours (standard time) */
  utcOffset: number;
  /** Plain-language summary of the working rhythm */
  rhythm: string;
  reasons: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const NEPAL_UTC = 5.75;

export const MARKETS: Market[] = [
  {
    slug: "usa",
    country: "the USA",
    areaServed: ["United States"],
    h1: "Nepal-Based Digital Growth Agency for US Businesses",
    title: "Digital Agency for US Businesses | Based in Nepal",
    description:
      "Hire a senior digital growth team in Nepal for your US business: web development, SEO, paid ads, design, video and AI automation, with async daily updates.",
    intro:
      "US startups and small businesses work with us when they need a senior design, development and marketing team without US agency overhead. The work happens while you sleep, and you start each day with progress to review.",
    city: "New York",
    tzLabel: "Eastern Time (ET)",
    utcOffset: -5,
    rhythm:
      "There's no shared office day with US time zones, so we work async-first: a written update and a review link land in your inbox before your morning, and calls happen in your early morning or evening.",
    reasons: [
      { title: "Overnight progress", text: "You brief at the end of your day; the next morning there's work to review." },
      { title: "Senior team, lower overhead", text: "The same people design, build and market your project, without US agency layers." },
      { title: "US-ready output", text: "American English copy, US-format analytics and ad accounts set up in your name." },
    ],
    faq: [
      { q: "How do you handle the time difference with the US?", a: "Nepal is 10 hours 45 minutes ahead of US Eastern Time (9h45 during daylight saving). We work async with daily written updates and schedule calls at the edges of both days." },
      { q: "Can you work with US-based ad accounts and tools?", a: "Yes. We work inside your own Google, Meta, Shopify and analytics accounts so you keep ownership." },
      { q: "Do you build for US accessibility standards?", a: "We build to WCAG 2.2 AA guidelines, which is the usual benchmark for ADA-related accessibility in the US." },
    ],
  },
  {
    slug: "uk",
    country: "the UK",
    areaServed: ["United Kingdom"],
    h1: "Nepal-Based Digital Growth Agency for UK Businesses",
    title: "Digital Agency for UK Businesses | Based in Nepal",
    description:
      "A Kathmandu digital growth agency working with UK businesses on websites, SEO, paid social, branding, video and AI automation, with daily overlap in UK mornings.",
    intro:
      "UK businesses work with us for a senior, all-in-one digital team that shares part of their working day. Your morning is our afternoon, which is enough for a daily check-in and same-day answers.",
    city: "London",
    tzLabel: "Greenwich Mean Time (GMT)",
    utcOffset: 0,
    rhythm:
      "UK mornings overlap with our afternoons, so we keep a daily window for calls and quick decisions, then carry the work forward after your office closes.",
    reasons: [
      { title: "Daily overlap", text: "A few shared working hours every weekday for calls and quick feedback." },
      { title: "One team, every channel", text: "Website, SEO, ads and content handled by people who talk to each other." },
      { title: "UK-ready output", text: "British English copy, UK search research and GDPR-aware tracking set-ups." },
    ],
    faq: [
      { q: "What is the time difference between Nepal and the UK?", a: "Nepal is 5 hours 45 minutes ahead of GMT (4h45 during British Summer Time), so UK mornings overlap with Nepal afternoons." },
      { q: "Do you follow GDPR for UK websites?", a: "We build consent management and privacy-friendly analytics set-ups. Your legal compliance remains your responsibility, and we follow your policies." },
      { q: "Can you do SEO for the UK market?", a: "Yes, with keyword research done on UK search data and British English content." },
    ],
  },
  {
    slug: "australia",
    country: "Australia",
    areaServed: ["Australia"],
    h1: "Nepal-Based Digital Growth Agency for Australian Businesses",
    title: "Digital Agency for Australian Businesses | Nepal",
    description:
      "Kathmandu-based digital growth agency for Australian businesses: websites, SEO, Google and Meta ads, branding, video and AI automation, overlapping with your afternoons.",
    intro:
      "Australian businesses work with us for senior digital work with a time zone that's genuinely workable. Our morning is your afternoon, so questions get answered the same day.",
    city: "Sydney",
    tzLabel: "Australian Eastern Standard Time (AEST)",
    utcOffset: 10,
    rhythm:
      "Our mornings overlap with Australian afternoons, which gives us a shared window for calls every weekday and same-day turnaround on feedback.",
    reasons: [
      { title: "Same-day answers", text: "Your afternoon is our morning, so feedback is picked up the day you send it." },
      { title: "Senior, hands-on team", text: "You talk directly to the designers, developers and marketers doing the work." },
      { title: "Australia-ready output", text: "Australian English, local search research and AUD reporting." },
    ],
    faq: [
      { q: "What is the time difference between Nepal and Sydney?", a: "Sydney is 4 hours 15 minutes ahead of Nepal (5h15 during daylight saving), so Nepal mornings overlap with Sydney afternoons." },
      { q: "Can you do local SEO for Australian cities?", a: "Yes, including Google Business Profile optimisation and location pages for each city you serve." },
      { q: "Do you work with Australian e-commerce platforms?", a: "Yes, including Shopify and payment set-ups commonly used in Australia." },
    ],
  },
  {
    slug: "middle-east",
    country: "the Middle East",
    areaServed: ["United Arab Emirates", "Qatar", "Saudi Arabia", "Kuwait", "Oman", "Bahrain"],
    h1: "Nepal-Based Digital Growth Agency for UAE, Qatar & the Gulf",
    title: "Digital Agency for UAE & Qatar | Based in Nepal",
    description:
      "Kathmandu digital growth agency for UAE, Qatar and Gulf businesses: websites, SEO, ads, branding, video and AI automation, sharing most of your working day.",
    intro:
      "Businesses across the Gulf work with us because our working day almost matches theirs. Dubai is less than two hours behind Kathmandu, so we're available for calls most of your day.",
    city: "Dubai",
    tzLabel: "Gulf Standard Time (GST)",
    utcOffset: 4,
    rhythm:
      "With only 1h45 between Kathmandu and Dubai, we share most of the working day: live calls, quick reviews and real-time collaboration.",
    reasons: [
      { title: "Nearly the same working day", text: "Most of your office hours overlap with ours." },
      { title: "Bilingual-ready builds", text: "Websites structured for English and Arabic, including right-to-left layouts." },
      { title: "Gulf market focus", text: "Campaigns on the platforms Gulf audiences use, with local search research." },
    ],
    faq: [
      { q: "What is the time difference between Nepal and the UAE?", a: "Nepal is 1 hour 45 minutes ahead of the UAE and 2 hours 45 minutes ahead of Qatar, so most of the working day overlaps." },
      { q: "Can you build Arabic and right-to-left websites?", a: "Yes. We build bilingual English and Arabic sites with proper right-to-left layouts. Arabic copy should come from a native writer or translator." },
      { q: "Do you work with Nepali-owned businesses in the Gulf?", a: "Yes, and we can create content in English, Nepali or both." },
    ],
  },
];

export const MARKET_BY_SLUG = Object.fromEntries(MARKETS.map((m) => [m.slug, m]));
