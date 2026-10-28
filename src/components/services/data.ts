import {
  Bot,
  Clapperboard,
  CodeXml,
  Palette,
  PenTool,
  Rocket,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  num: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    id: "web-development",
    num: "01",
    title: "Web Development",
    short: "Fast, scalable websites and web apps built with modern frameworks.",
    description:
      "From landing pages to full web apps, we ship fast, accessible, SEO-ready builds on modern stacks that scale with your business.",
    deliverables: ["Next.js & React", "CMS integration", "Performance 95+", "E-commerce"],
    icon: CodeXml,
  },
  {
    id: "brand-design",
    num: "02",
    title: "Brand Design",
    short: "Distinct visual identities that make your brand memorable.",
    description:
      "Logos, color systems and typography built on strategy, so every touchpoint looks unmistakably like you.",
    deliverables: ["Logo system", "Color & type", "Brand guidelines", "Stationery"],
    icon: Palette,
  },
  {
    id: "digital-marketing",
    num: "03",
    title: "Digital Marketing",
    short: "Growth-focused campaigns that turn visibility into revenue.",
    description:
      "Paid social, search and email campaigns planned around your numbers, then tested and scaled on what converts.",
    deliverables: ["Paid ads", "Social strategy", "Email flows", "Analytics"],
    icon: Rocket,
  },
  {
    id: "seo-optimization",
    num: "04",
    title: "SEO Optimization",
    short: "Rank higher, get found faster, and outpace your competitors.",
    description:
      "Technical audits, content and links that move you up the results page and keep you there.",
    deliverables: ["Technical audit", "Keyword strategy", "On-page SEO", "Local SEO"],
    icon: Search,
  },
  {
    id: "graphic-design",
    num: "05",
    title: "Graphic Design",
    short: "Scroll-stopping design systems, campaign assets, and content built to stay on-brand.",
    description:
      "Social posts, ads, decks and print, designed in reusable systems so your content stays consistent at any volume.",
    deliverables: ["Social content", "Ad creatives", "Pitch decks", "Print"],
    icon: PenTool,
  },
  {
    id: "video-editing",
    num: "06",
    title: "Video Editing",
    short: "Polished short-form and campaign video that keeps your audience watching.",
    description:
      "Reels, ads and long-form edits with pacing, captions, color and sound that hold attention to the last frame.",
    deliverables: ["Short-form reels", "Ad edits", "Color grading", "Captions & sound"],
    icon: Clapperboard,
  },
  {
    id: "motion-graphics",
    num: "07",
    title: "Motion Graphics",
    short: "Dynamic visual stories, product explainers, and animated brand moments.",
    description:
      "Explainers, logo animations and UI motion that make complex ideas simple and your brand feel alive.",
    deliverables: ["Explainer videos", "Logo animation", "UI motion", "3D elements"],
    icon: Sparkles,
  },
  {
    id: "ai-automation",
    num: "08",
    title: "AI Automation",
    short: "Practical AI workflows that reduce repetitive work and help teams move faster.",
    description:
      "We map your repetitive work and replace it with AI agents and automations that connect the tools you already use.",
    deliverables: ["AI agents", "Workflow automation", "CRM integration", "Chatbots"],
    icon: Bot,
  },
];

/** How long each service stays on the big screen before auto-advancing (ms). */
export const SLIDE_DURATION = 7000;
