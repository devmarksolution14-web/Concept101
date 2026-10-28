/**
 * Keyword landing copy for each service. One page per service at /services/[slug].
 * Each page targets one primary search term (Nepal) plus its international variant.
 * Copy describes how the studio works; adjust anything that doesn't match reality.
 * No invented prices, client names or results here — add real case studies when you have them.
 */

export type ServiceSeo = {
  slug: string;
  /** Matches the service id in components/services/data.ts */
  serviceId: string;
  /** Primary keyword, used in H1 and title */
  h1: string;
  title: string;
  description: string;
  serviceType: string;
  intro: string;
  /** For clients abroad */
  international: string;
  included: { title: string; text: string }[];
  forWho: string[];
  faq: { q: string; a: string }[];
  /** Related service slugs for internal linking */
  related: string[];
};

export const SERVICES_SEO: ServiceSeo[] = [
  {
    slug: "web-development",
    serviceId: "web-development",
    h1: "Web Development Company in Nepal",
    title: "Web Development Company in Nepal | Fast, SEO-Ready Websites",
    description:
      "Web development company in Kathmandu, Nepal building fast, SEO-ready websites, web apps and e-commerce stores with Next.js and React for clients in Nepal and abroad.",
    serviceType: "Web development",
    intro:
      "We design and build websites, web apps and online stores that load fast, rank in search and are easy for your team to update. Every build is made with modern frameworks like Next.js and React, tested on real phones, and handed over with a CMS you can actually use.",
    international:
      "Most of our web projects for clients in the USA, UK, Australia and the Gulf run fully remote: written specs, a staging link you can click through every week, and a launch checklist we go through together.",
    included: [
      { title: "Business websites", text: "Marketing sites with a CMS, built mobile-first and structured for search from day one." },
      { title: "Web apps & portals", text: "Booking systems, dashboards and customer portals with secure logins and clean APIs." },
      { title: "E-commerce", text: "Shopify and headless stores with local and international payment options." },
      { title: "Speed & Core Web Vitals", text: "Performance work on existing sites: image handling, caching, code-splitting and hosting." },
      { title: "Care & maintenance", text: "Updates, backups, monitoring and small changes after launch." },
    ],
    forWho: ["Businesses replacing a slow or outdated website", "Startups launching a product or MVP", "Shops selling online in Nepal or internationally"],
    faq: [
      { q: "Which technologies do you build websites with?", a: "Mostly Next.js, React and TypeScript, with a headless CMS such as Sanity or Contentful, or Shopify for stores. We choose the stack around your team and budget." },
      { q: "Will my website be SEO-friendly?", a: "Yes. Every site ships with clean URLs, metadata, structured data, a sitemap, fast loading and mobile-first layouts, which are the technical basics search engines look for." },
      { q: "Can you work with clients outside Nepal?", a: "Yes. We work remotely with clients in the USA, UK, Australia and the Middle East, with weekly demos and written updates." },
    ],
    related: ["seo-optimization", "brand-design", "ai-automation"],
  },
  {
    slug: "brand-design",
    serviceId: "brand-design",
    h1: "Brand Design Agency in Nepal",
    title: "Brand Design & Logo Design Agency in Nepal",
    description:
      "Brand design agency in Kathmandu creating logos, visual identities and brand guidelines for businesses in Nepal and international clients.",
    serviceType: "Brand identity design",
    intro:
      "A brand is the reason people remember you after they close the tab. We build identities from strategy first: who you're for, what you stand for, then the logo, colours, typography and guidelines that make every touchpoint look unmistakably like you.",
    international:
      "For international clients we run brand workshops over video, share directions as presentation links you can comment on, and deliver every file format your printers and developers will ask for.",
    included: [
      { title: "Brand strategy", text: "Positioning, audience and personality, written down so every later decision has a reason." },
      { title: "Logo design", text: "A primary logo, secondary marks and icon versions that work from favicon to billboard." },
      { title: "Visual identity", text: "Colour palette, typography, imagery style and graphic elements." },
      { title: "Brand guidelines", text: "A practical guide your team and suppliers can follow." },
      { title: "Packaging & print", text: "Labels, packaging, business cards, signage and stationery." },
    ],
    forWho: ["New businesses launching a brand", "Companies whose look no longer matches what they offer", "Products going from local to international"],
    faq: [
      { q: "How long does a brand identity take?", a: "Most identity projects take four to eight weeks, depending on how many directions and applications you need." },
      { q: "Do I get the source files?", a: "Yes. You receive vector source files, web and print exports, and the brand guidelines." },
      { q: "Can you refresh an existing brand instead of starting over?", a: "Yes. A refresh keeps what customers already recognise and fixes what isn't working." },
    ],
    related: ["graphic-design", "motion-graphics", "web-development"],
  },
  {
    slug: "digital-marketing",
    serviceId: "digital-marketing",
    h1: "Digital Marketing Agency in Nepal",
    title: "Digital Marketing Agency in Nepal | Ads, Social & Email",
    description:
      "Digital marketing agency in Kathmandu, Nepal running Google Ads, Meta ads, social media and email campaigns for growth, for clients in Nepal and abroad.",
    serviceType: "Digital marketing",
    intro:
      "We plan campaigns around your numbers, not around vanity metrics. Paid search, paid social and email are tested in small batches, then budget moves to what actually brings customers, with reporting you can read in two minutes.",
    international:
      "We run campaigns targeting audiences in the USA, UK, Australia and the Gulf, with ad accounts kept in your name so you always own the data.",
    included: [
      { title: "Google Ads", text: "Search, Performance Max and YouTube campaigns with conversion tracking set up properly." },
      { title: "Meta & TikTok ads", text: "Creative testing on Facebook, Instagram and TikTok, scaled on what converts." },
      { title: "Social media management", text: "Content calendars, posting and community management for your brand channels." },
      { title: "Email marketing", text: "Welcome, abandoned-cart and win-back flows plus regular newsletters." },
      { title: "Analytics & reporting", text: "GA4, tag management and a monthly report tied to revenue." },
    ],
    forWho: ["E-commerce brands that need more sales", "Service businesses that need more leads", "Startups that need a first repeatable channel"],
    faq: [
      { q: "Do you manage ad budgets or just strategy?", a: "Both. We plan, build and run the campaigns; the ad spend is billed directly to your own ad account." },
      { q: "Which platforms do you advertise on?", a: "Mainly Google, Meta (Facebook and Instagram), TikTok and LinkedIn, chosen by where your customers spend time." },
      { q: "How soon will I see results?", a: "Paid campaigns usually produce useful data within the first two to four weeks; we optimise from there." },
    ],
    related: ["seo-optimization", "graphic-design", "video-editing"],
  },
  {
    slug: "seo-optimization",
    serviceId: "seo-optimization",
    h1: "SEO Services in Nepal",
    title: "SEO Services in Nepal | SEO Company in Kathmandu",
    description:
      "SEO company in Kathmandu offering technical SEO, keyword research, on-page SEO, local SEO and content for businesses in Nepal and international markets.",
    serviceType: "Search engine optimization",
    intro:
      "SEO is how customers find you when they're already looking. We fix the technical problems that hold a site back, research what your customers actually search for, and build pages and content that answer it better than anyone else ranking today.",
    international:
      "For clients abroad we research keywords per country, handle hreflang and international site structure, and build local SEO for each market you sell in.",
    included: [
      { title: "Technical SEO audit", text: "Crawling, indexing, speed, structured data and site architecture, with a prioritised fix list." },
      { title: "Keyword research", text: "The searches your buyers make, grouped by intent and mapped to pages." },
      { title: "On-page SEO", text: "Titles, headings, internal links and content improvements on your key pages." },
      { title: "Local SEO", text: "Google Business Profile, local citations and location pages for Kathmandu and beyond." },
      { title: "Content & link building", text: "Articles and guides that earn links and rank for the questions buyers ask." },
    ],
    forWho: ["Businesses that rely on Google for leads", "Online stores competing with marketplaces", "Companies expanding into new countries"],
    faq: [
      { q: "How long does SEO take to work?", a: "Technical fixes can show results in weeks; competitive keywords usually take three to six months of consistent work." },
      { q: "Can you guarantee a first-page ranking?", a: "No honest SEO company can guarantee rankings, because search engines decide them. We commit to the work, the reporting and the targets we agree together." },
      { q: "Do you do local SEO for Kathmandu businesses?", a: "Yes, including Google Business Profile optimisation, local citations, reviews strategy and location-specific pages." },
    ],
    related: ["web-development", "digital-marketing", "graphic-design"],
  },
  {
    slug: "graphic-design",
    serviceId: "graphic-design",
    h1: "Graphic Design Services in Nepal",
    title: "Graphic Design Services in Nepal | Social, Ads & Print",
    description:
      "Graphic design studio in Kathmandu designing social media content, ad creatives, pitch decks and print for brands in Nepal and abroad.",
    serviceType: "Graphic design",
    intro:
      "We design the everyday content brands live on: social posts, ads, decks and print. Everything is built as a reusable template system, so your feed and campaigns stay consistent however much you publish.",
    international:
      "International clients send briefs in a shared board and get designs back on an agreed weekly rhythm, ready for every platform size.",
    included: [
      { title: "Social media design", text: "Post and story templates plus monthly content in your brand style." },
      { title: "Ad creatives", text: "Static and animated ads sized for Google, Meta and TikTok, with variants for testing." },
      { title: "Pitch & sales decks", text: "Investor and sales presentations that make the argument clearly." },
      { title: "Print design", text: "Brochures, menus, posters, banners and packaging artwork." },
    ],
    forWho: ["Brands posting every week", "Marketing teams that need more design capacity", "Founders preparing an investor pitch"],
    faq: [
      { q: "Can we hire you for ongoing monthly design?", a: "Yes. Many clients use a monthly design retainer with an agreed number of deliverables." },
      { q: "Will we get editable templates?", a: "Yes, in Figma or Canva so your team can make quick edits themselves." },
      { q: "Do you design in Nepali as well as English?", a: "Yes. We design bilingual content for audiences in Nepal." },
    ],
    related: ["brand-design", "digital-marketing", "motion-graphics"],
  },
  {
    slug: "video-editing",
    serviceId: "video-editing",
    h1: "Video Editing Services in Nepal",
    title: "Video Editing Services in Nepal | Reels, Ads & YouTube",
    description:
      "Video editing studio in Kathmandu editing reels, ads, YouTube videos and brand films with colour grading, captions and sound for clients worldwide.",
    serviceType: "Video editing",
    intro:
      "We turn raw footage into videos people watch to the end. Short-form reels, ads and long-form edits get pacing, captions, colour and sound designed for the platform they'll live on.",
    international:
      "Send footage by cloud link from anywhere; edits come back as review links where you can comment on the exact frame.",
    included: [
      { title: "Short-form reels", text: "Vertical edits for Instagram, TikTok and YouTube Shorts with burned-in captions." },
      { title: "Ad edits", text: "Hook-first ad cuts with multiple versions for testing." },
      { title: "YouTube & long-form", text: "Episodes, interviews and podcasts edited for retention." },
      { title: "Colour & sound", text: "Colour grading, audio clean-up, music and mixing." },
    ],
    forWho: ["Creators and brands publishing weekly video", "Businesses running video ads", "Teams with footage but no editor"],
    faq: [
      { q: "How do we send you footage?", a: "By Google Drive, Dropbox or any large-file transfer link. We confirm receipt and send review links back." },
      { q: "How many revisions are included?", a: "Two rounds of revisions per edit are standard; we agree this before starting." },
      { q: "Can you add subtitles in multiple languages?", a: "Yes, including English and Nepali captions." },
    ],
    related: ["motion-graphics", "digital-marketing", "graphic-design"],
  },
  {
    slug: "motion-graphics",
    serviceId: "motion-graphics",
    h1: "Motion Graphics & Animation Studio in Nepal",
    title: "Motion Graphics & Explainer Video Studio in Nepal",
    description:
      "Motion graphics studio in Kathmandu creating explainer videos, logo animations and UI animation for brands and apps in Nepal and abroad.",
    serviceType: "Motion graphics and animation",
    intro:
      "Motion makes complex ideas simple and makes a brand feel alive. We animate explainers, logos and product interfaces with the same care we give a static identity.",
    international:
      "We work from your script or write one with you, share animatics before full animation, and deliver in every format your channels need.",
    included: [
      { title: "Explainer videos", text: "Scripted, voiced and animated product or service explainers." },
      { title: "Logo animation", text: "Intros, outros and stings built from your identity." },
      { title: "UI & app animation", text: "Lottie and Rive animations developers can drop straight into apps and websites." },
      { title: "Social motion", text: "Animated posts and ads that stop the scroll." },
    ],
    forWho: ["Apps and SaaS products explaining a feature", "Brands launching a campaign", "Teams needing animated content for social"],
    faq: [
      { q: "How long is a typical explainer video?", a: "Usually 45 to 90 seconds; shorter versions are often cut for ads." },
      { q: "Can you provide animations for our app?", a: "Yes, as Lottie or Rive files that your developers can implement directly." },
      { q: "Do you write the script?", a: "We can. Many projects start with us writing the script and storyboard with you." },
    ],
    related: ["video-editing", "brand-design", "web-development"],
  },
  {
    slug: "ai-automation",
    serviceId: "ai-automation",
    h1: "AI Automation Agency in Nepal",
    title: "AI Automation Agency in Nepal | AI Agents & Workflows",
    description:
      "AI automation agency in Kathmandu building AI agents, chatbots and workflow automation that connect your CRM, email and tools, for businesses in Nepal and worldwide.",
    serviceType: "AI and business process automation",
    intro:
      "We find the repetitive work in your week and hand it to software. AI agents read emails and documents, chatbots answer customers, and automations move data between the tools you already use, with a person approving anything important.",
    international:
      "Automation work is fully remote: we map your process on a call, build in your own accounts, and document everything so your team stays in control.",
    included: [
      { title: "AI agents", text: "Agents that read, sort and draft replies to emails, quotes and documents." },
      { title: "Chatbots", text: "Website and WhatsApp assistants trained on your own information." },
      { title: "Workflow automation", text: "n8n, Make and Zapier automations connecting CRM, sheets, email and invoicing." },
      { title: "CRM integration", text: "Clean data flowing into HubSpot, Pipedrive or your CRM of choice." },
    ],
    forWho: ["Teams copying data between tools by hand", "Businesses answering the same customer questions daily", "Operations with high email volume"],
    faq: [
      { q: "Is AI automation safe for customer data?", a: "We build inside your own accounts, limit access to what each automation needs, and keep a person approving sensitive actions." },
      { q: "Which tools can you connect?", a: "Most tools with an API, including Gmail, Outlook, Google Sheets, HubSpot, Slack, WhatsApp Business and accounting software." },
      { q: "How do we know if a process is worth automating?", a: "We start with a short audit that estimates hours saved per process, then automate the ones with a clear payoff." },
    ],
    related: ["web-development", "digital-marketing", "seo-optimization"],
  },
];

export const SERVICE_SEO_BY_SLUG = Object.fromEntries(SERVICES_SEO.map((s) => [s.slug, s]));
