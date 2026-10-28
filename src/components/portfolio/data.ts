/**
 * PLACEHOLDER PORTFOLIO DATA
 * Every client, project and result below is invented for layout preview.
 * Replace with real case studies before launch.
 */

export type VisualKind = "site" | "brand" | "campaign" | "seo" | "graphic" | "video" | "motion" | "ai";

/** Bento footprint on the wall: sm 1×1, wide 2×1, tall 1×2, xl 2×2. */
export type TileSize = "sm" | "wide" | "tall" | "xl";

export type Palette = {
  /** Screen background */
  bg: string;
  /** Primary ink */
  fg: string;
  /** Brand accent */
  accent: string;
  /** Secondary tint */
  soft: string;
};

export type Project = {
  id: string;
  client: string;
  title: string;
  year: number;
  /** Service ids from `services/data.ts`; the first one is the lead discipline. */
  services: string[];
  size: TileSize;
  visual: VisualKind;
  palette: Palette;
  /** Short line rendered inside the project's live visual. */
  tagline: string;
  summary: string;
  challenge: string;
  approach: string;
  results: { value: string; label: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "lumen-health",
    client: "Lumen Health",
    title: "A booking platform patients finish",
    year: 2026,
    services: ["web-development", "seo-optimization"],
    size: "xl",
    visual: "site",
    palette: { bg: "#0d2b2a", fg: "#e9fbf7", accent: "#3ee0c1", soft: "#1d4a46" },
    tagline: "Care that comes to you",
    summary: "Rebuilt a clinic network's site and booking flow as one fast Next.js app.",
    challenge: "Patients dropped out of a six-step booking form, and the old site took eight seconds to load on mobile.",
    approach: "We cut booking to two steps, moved to a static-first Next.js build and wired availability straight from the clinic calendar.",
    results: [
      { value: "+212%", label: "Online bookings" },
      { value: "0.9s", label: "Mobile load" },
      { value: "99", label: "Performance score" },
    ],
  },
  {
    id: "northpeak-coffee",
    client: "Northpeak Coffee",
    title: "An identity roasted for the shelf",
    year: 2026,
    services: ["brand-design", "graphic-design"],
    size: "tall",
    visual: "brand",
    palette: { bg: "#2a1a12", fg: "#f7e9dc", accent: "#ff7a2f", soft: "#4a2e20" },
    tagline: "Northpeak",
    summary: "A mountain-mark identity and packaging system for a specialty roaster.",
    challenge: "Six coffees, six unrelated bag designs, and no mark customers could recall.",
    approach: "One summit mark, a roast-level colour code and a type system that scales from bag to café signage.",
    results: [
      { value: "3×", label: "Wholesale accounts" },
      { value: "14", label: "SKUs redesigned" },
      { value: "6 wks", label: "Concept to print" },
    ],
  },
  {
    id: "orbit-pay",
    client: "Orbit Pay",
    title: "Launch campaign for a card with no fees",
    year: 2025,
    services: ["digital-marketing", "graphic-design"],
    size: "wide",
    visual: "campaign",
    palette: { bg: "#120f2e", fg: "#eeeaff", accent: "#8b7bff", soft: "#272257" },
    tagline: "Zero fees. Full orbit.",
    summary: "Paid social and search launch for a fintech debit card.",
    challenge: "A crowded category and a cost per signup the founders could not scale.",
    approach: "Forty ad variants tested in week one, budget moved daily to the three that converted, then a lifecycle email flow.",
    results: [
      { value: "−58%", label: "Cost per signup" },
      { value: "4.2×", label: "Return on ad spend" },
      { value: "38k", label: "Launch-month signups" },
    ],
  },
  {
    id: "verdant-living",
    client: "Verdant Living",
    title: "From page four to the top spot",
    year: 2025,
    services: ["seo-optimization"],
    size: "wide",
    visual: "seo",
    palette: { bg: "#0f1f12", fg: "#e8f7e6", accent: "#7ee081", soft: "#1f3a22" },
    tagline: "indoor plants delivered",
    summary: "Technical SEO and content for an online plant shop.",
    challenge: "Great products, invisible in search behind marketplace giants.",
    approach: "Fixed crawl and speed issues, then built care guides around the questions buyers actually search.",
    results: [
      { value: "#1", label: "Core keyword" },
      { value: "+340%", label: "Organic traffic" },
      { value: "120", label: "Guides published" },
    ],
  },
  {
    id: "kinetic-run-club",
    client: "Kinetic Run Club",
    title: "Season opener, cut for the scroll",
    year: 2026,
    services: ["video-editing", "motion-graphics"],
    size: "wide",
    visual: "video",
    palette: { bg: "#1c0d10", fg: "#ffe9ec", accent: "#ff4d6d", soft: "#3d1a20" },
    tagline: "Run the city",
    summary: "A hero film and twelve vertical cutdowns for a running community launch.",
    challenge: "Two days of raw footage and a launch date three weeks out.",
    approach: "One master edit, then platform-native reels with burned-in captions and a shared colour grade.",
    results: [
      { value: "2.1M", label: "Organic views" },
      { value: "71%", label: "Watch-through rate" },
      { value: "13", label: "Edits delivered" },
    ],
  },
  {
    id: "atlas-freight",
    client: "Atlas Freight",
    title: "An AI agent that handles the inbox",
    year: 2026,
    services: ["ai-automation"],
    size: "tall",
    visual: "ai",
    palette: { bg: "#0b1726", fg: "#e6f1ff", accent: "#4da3ff", soft: "#18304d" },
    tagline: "Quote request",
    summary: "An agent that reads freight quote emails, prices them and drafts replies.",
    challenge: "Three coordinators spent most of each day copying emails into spreadsheets.",
    approach: "An AI agent parses each request, pulls rates from the pricing sheet, logs it in the CRM and drafts the reply for approval.",
    results: [
      { value: "26h", label: "Saved per week" },
      { value: "4 min", label: "Average reply time" },
      { value: "92%", label: "Drafts sent unedited" },
    ],
  },
  {
    id: "pulse-audio",
    client: "Pulse Audio",
    title: "A logo that keeps the beat",
    year: 2025,
    services: ["motion-graphics", "brand-design"],
    size: "sm",
    visual: "motion",
    palette: { bg: "#1a1030", fg: "#f3ecff", accent: "#ff5cf0", soft: "#33205c" },
    tagline: "Pulse",
    summary: "Animated logo system and UI motion for a headphone brand.",
    challenge: "A static logo for a product that is all about sound.",
    approach: "A mark that breathes to a waveform, with sting, loop and loader variants.",
    results: [
      { value: "9", label: "Motion assets" },
      { value: "60fps", label: "In-app loops" },
    ],
  },
  {
    id: "maison-rue",
    client: "Maison Rue",
    title: "A feed that looks like the boutique",
    year: 2025,
    services: ["graphic-design", "digital-marketing"],
    size: "sm",
    visual: "graphic",
    palette: { bg: "#2a1420", fg: "#fff0f5", accent: "#ff8fb1", soft: "#4d2538" },
    tagline: "Maison Rue",
    summary: "A reusable social template system for a fashion boutique.",
    challenge: "Posting daily without the feed turning into a mess.",
    approach: "Nine templates, one grid rhythm and a monthly content calendar.",
    results: [
      { value: "+64%", label: "Engagement" },
      { value: "9", label: "Templates" },
    ],
  },
  {
    id: "fernway-travel",
    client: "Fernway Travel",
    title: "Trips you can book in one scroll",
    year: 2025,
    services: ["web-development", "digital-marketing"],
    size: "wide",
    visual: "site",
    palette: { bg: "#10202e", fg: "#eaf6ff", accent: "#ffc65c", soft: "#1e3a52" },
    tagline: "Slow trips, booked fast",
    summary: "A storefront and checkout for small-group travel tours.",
    challenge: "Tours sold over email threads with no live availability.",
    approach: "A headless commerce build with live seat counts and a one-page checkout.",
    results: [
      { value: "+3.4×", label: "Direct bookings" },
      { value: "−41%", label: "Checkout drop-off" },
    ],
  },
  {
    id: "nova-skin",
    client: "Nova Skin",
    title: "Clean beauty, clearly branded",
    year: 2026,
    services: ["brand-design"],
    size: "tall",
    visual: "brand",
    palette: { bg: "#f1e8df", fg: "#2b2420", accent: "#c8553d", soft: "#e2d3c4" },
    tagline: "Nova",
    summary: "Naming support, logo and packaging for a skincare start-up.",
    challenge: "Launching against brands with ten times the budget.",
    approach: "A restrained star mark, honest ingredient-first labels and a palette drawn from the products.",
    results: [
      { value: "5", label: "Retail partners at launch" },
      { value: "8 wks", label: "Brief to shelf" },
    ],
  },
  {
    id: "quill-legal",
    client: "Quill Legal",
    title: "Intake that sorts itself",
    year: 2026,
    services: ["ai-automation", "web-development"],
    size: "tall",
    visual: "ai",
    palette: { bg: "#141414", fg: "#f2f2f2", accent: "#e0b354", soft: "#2b2b2b" },
    tagline: "New enquiry",
    summary: "An intake chatbot that qualifies enquiries and books consultations.",
    challenge: "Partners were answering the same first questions all day.",
    approach: "A chatbot trained on the firm's FAQs that routes each case type to the right lawyer's calendar.",
    results: [
      { value: "70%", label: "Enquiries self-served" },
      { value: "24/7", label: "Intake coverage" },
    ],
  },
  {
    id: "halo-fitness",
    client: "Halo Fitness",
    title: "App onboarding with momentum",
    year: 2025,
    services: ["motion-graphics", "video-editing"],
    size: "wide",
    visual: "motion",
    palette: { bg: "#0a1f1c", fg: "#e7fff9", accent: "#c6ff4d", soft: "#173b35" },
    tagline: "Halo",
    summary: "Onboarding animations and an explainer for a workout app.",
    challenge: "New users quit before finishing setup.",
    approach: "Short animated steps that show progress and a 45-second explainer for the app store.",
    results: [
      { value: "+29%", label: "Setup completion" },
      { value: "45s", label: "Explainer" },
    ],
  },
];
