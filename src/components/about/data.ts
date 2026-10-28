/**
 * PLACEHOLDER ABOUT DATA
 * Team members, history and numbers are invented for layout preview.
 * Replace with the real studio before launch.
 */

export type Person = {
  id: string;
  name: string;
  initials: string;
  role: string;
  /** Lead service id from `services/data.ts` */
  service: string;
  bio: string;
  /** Portfolio project id shown on their monitor */
  project: string;
  tools: string[];
  /** Avatar tint */
  color: string;
};

export type Zone = {
  id: string;
  title: string;
  intro: string;
  kind: "steps" | "stack";
  items: { title: string; text: string }[];
};

export const PEOPLE: Person[] = [
  {
    id: "ava",
    name: "Ava Moreno",
    initials: "AM",
    role: "Creative Director",
    service: "brand-design",
    bio: "Sets the direction on every brand we touch and signs off the work before it leaves the studio.",
    project: "northpeak-coffee",
    tools: ["Figma", "Illustrator", "Type design"],
    color: "#ff7a2f",
  },
  {
    id: "kai",
    name: "Kai Tanaka",
    initials: "KT",
    role: "UI/UX Designer",
    service: "graphic-design",
    bio: "Turns messy flows into screens people finish, then builds the design system so they stay that way.",
    project: "maison-rue",
    tools: ["Figma", "Prototyping", "User testing"],
    color: "#ff8fb1",
  },
  {
    id: "lena",
    name: "Lena Fischer",
    initials: "LF",
    role: "Motion Designer",
    service: "motion-graphics",
    bio: "Makes logos breathe and explainers land. Thinks in easing curves.",
    project: "pulse-audio",
    tools: ["After Effects", "Rive", "Lottie"],
    color: "#ff5cf0",
  },
  {
    id: "omar",
    name: "Omar Haddad",
    initials: "OH",
    role: "Lead Developer",
    service: "web-development",
    bio: "Owns every build from first commit to launch day, and the performance score after it.",
    project: "lumen-health",
    tools: ["Next.js", "TypeScript", "Headless CMS"],
    color: "#3ee0c1",
  },
  {
    id: "priya",
    name: "Priya Nair",
    initials: "PN",
    role: "AI Automation Engineer",
    service: "ai-automation",
    bio: "Finds the repetitive work hiding in a client's week and hands it to an agent.",
    project: "atlas-freight",
    tools: ["LLM agents", "n8n", "Python"],
    color: "#4da3ff",
  },
  {
    id: "sofia",
    name: "Sofia Rossi",
    initials: "SR",
    role: "Growth & SEO Lead",
    service: "digital-marketing",
    bio: "Plans campaigns around the numbers and keeps testing until they move.",
    project: "orbit-pay",
    tools: ["Google Ads", "Meta Ads", "Search Console"],
    color: "#8b7bff",
  },
  {
    id: "diego",
    name: "Diego Alvarez",
    initials: "DA",
    role: "Video Editor",
    service: "video-editing",
    bio: "Cuts raw footage into reels people watch to the end. Colour, captions, sound.",
    project: "kinetic-run-club",
    tools: ["Premiere Pro", "DaVinci Resolve", "Audition"],
    color: "#ff4d6d",
  },
];

export const ZONES: Zone[] = [
  {
    id: "meeting-room",
    title: "The meeting room",
    intro: "Every project starts at this table. Here's what happens next.",
    kind: "steps",
    items: [
      { title: "Discover", text: "A working session on your goals, audience and numbers. We leave with a written brief." },
      { title: "Design", text: "Directions first, then one chosen and taken all the way, reviewed with you each week." },
      { title: "Build", text: "Built in small, shippable pieces you can click through as they land." },
      { title: "Launch & grow", text: "We ship, measure and keep improving what the numbers point at." },
    ],
  },
  {
    id: "server-rack",
    title: "The rack",
    intro: "What our work runs on.",
    kind: "stack",
    items: [
      { title: "Build", text: "Next.js, React, TypeScript, Tailwind" },
      { title: "Content", text: "Sanity, Contentful, Shopify" },
      { title: "Automation", text: "LLM agents, n8n, Zapier, Python" },
      { title: "Measure", text: "GA4, Search Console, Hotjar" },
    ],
  },
];

export const STORY: { year: string; title: string; text: string }[] = [
  { year: "2019", title: "Two people, one spare room", text: "Started with a laptop each and a client who needed a website by Friday." },
  { year: "2021", title: "Fifty projects in", text: "Brand and video joined web, so clients could bring us the whole job." },
  { year: "2023", title: "The studio", text: "Moved into the floor you just walked around. Added an edit suite." },
  { year: "2025", title: "AI automation", text: "Started building agents for clients, then for ourselves." },
  { year: "Today", title: "Seven people, eight services", text: "Still small enough that you talk to the people doing the work." },
];
