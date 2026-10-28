/**
 * Copy for the SEO version of About Us. Kept as plain data so the page renders it on the server.
 * Team, results and demos are sample content; replace before launch.
 */

export type DemoId = "fast" | "show" | "second-visit" | "automate" | "team";

export const BELIEFS: {
  id: DemoId;
  /** Statement; the last word is accented */
  statement: string;
  short: string;
  text: string;
  /** Visible description of the live demo, doubling as its text alternative */
  demoDescription: string;
  links: { href: string; label: string }[];
}[] = [
  {
    id: "fast",
    statement: "Fast is a feature.",
    short: "Fast is a feature",
    text: "Every second of loading costs you visitors and search ranking. We treat page speed and Core Web Vitals as part of the design, not a fix for later.",
    demoDescription: "Demo: the same page built two ways. A typical site finishes loading in 4.2 seconds; our build paints in 0.9 seconds.",
    links: [{ href: "/services", label: "Web development" }],
  },
  {
    id: "show",
    statement: "Show, don't tell.",
    short: "Show, don't tell",
    text: "Anyone can claim great work. We'd rather put the work in front of you, with the results attached, and let it make the case.",
    demoDescription: "Demo: marketing claims are crossed out and replaced by real projects from our portfolio, each with its headline result.",
    links: [{ href: "/portfolio", label: "See the portfolio" }],
  },
  {
    id: "second-visit",
    statement: "Design for the second visit.",
    short: "Design for the second visit",
    text: "The first visit gets the attention. The second one gets the sale, so we design websites that remember returning visitors and pick up where they left off.",
    demoDescription: "Demo: a travel website on a first visit, then on a second visit where it welcomes the visitor back and resumes their booking.",
    links: [{ href: "/services", label: "UX and web design" }],
  },
  {
    id: "automate",
    statement: "Automate the boring parts.",
    short: "Automate the boring parts",
    text: "If a person does it every day and hates it, an AI agent should probably do it instead. We build business automation for clients, and we start with our own week.",
    demoDescription: "Demo: an AI inbox agent works through six repetitive tasks, from logging a quote request in the CRM to chasing an unpaid invoice, while the hours saved add up.",
    links: [{ href: "/services", label: "AI automation" }],
  },
  {
    id: "team",
    statement: "Small team, senior hands.",
    short: "Small team, senior hands",
    text: "No account managers relaying messages. You work directly with the designers, developers and marketers doing your project.",
    demoDescription: "Demo: lines connect you directly to each of the seven people on the team.",
    links: [{ href: "/about", label: "Meet the team" }],
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What services does the studio offer?",
    a: "Web development, brand design, digital marketing, SEO optimization, graphic design, video editing, motion graphics and AI automation. Most clients use two or three of them together.",
  },
  {
    q: "How big is the team?",
    a: "Seven people: a creative director, a UI/UX designer, a motion designer, a lead developer, an AI automation engineer, a growth and SEO lead and a video editor.",
  },
  {
    q: "Who will I work with on my project?",
    a: "The people doing the work. There are no account managers in between, so you talk directly to your designer, developer or marketer.",
  },
  {
    q: "How does a project start?",
    a: "With a working session on your goals, audience and numbers. You leave it with a written brief, then we design, build in small reviewable pieces, launch and keep improving.",
  },
  {
    q: "Do you build websites that rank well in search?",
    a: "Yes. Every site is built for speed, accessibility and technical SEO from the start, and our SEO lead plans content around what your customers actually search for.",
  },
];
