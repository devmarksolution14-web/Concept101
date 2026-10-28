"use client";

import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PROJECTS, type Project } from "../portfolio/data";
import { Backdrop, EASE, Screen } from "../portfolio/shared";
import { SERVICES } from "../services/data";
import { SCENES } from "../services/scenes";
import StudioFloor from "../about/StudioFloor";
import { FastDemo } from "../about2/demos";

type Page = {
  href: string;
  title: string;
  description: string;
  preview: (live: boolean) => ReactNode;
  className: string;
  wide?: boolean;
};

const PAGES: Page[] = [
  {
    href: "/services",
    title: "Our Services",
    description: "Eight services, each playing live on one big monitor with an auto-advancing rail.",
    preview: (live) => <ServicesPreview live={live} />,
    className: "",
  },
  {
    href: "/portfolio",
    title: "Portfolio · Bento wall",
    description: "A filterable bento grid of live projects that open in place into full case studies.",
    preview: (live) => <BentoPreview live={live} />,
    className: "",
  },
  {
    href: "/portfolio-2",
    title: "Portfolio · Control room",
    description: "A wall of live monitors that cuts between projects and puts one on air.",
    preview: (live) => <ControlRoomPreview live={live} />,
    className: "",
  },
  {
    href: "/about",
    title: "About Us · Studio floor",
    description: "An isometric map of the studio. Pick a desk to meet the person at it.",
    preview: () => <StudioFloor interactive={false} />,
    className: "",
  },
  {
    href: "/about-2",
    title: "About Us · Beliefs",
    description: "Five things the studio believes, each with a live demo proving it.",
    preview: (live) => <BeliefsPreview live={live} />,
    className: "",
  },
  {
    href: "/about-3",
    title: "About Us · Beliefs (SEO)",
    description: "The beliefs page rebuilt for search: server-rendered copy, structured data, FAQ and metadata.",
    preview: () => <SeoPreview />,
    className: "",
  },
];

export default function HomeHub() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="home-heading" className="relative isolate overflow-x-clip px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <Backdrop />

        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h1 id="home-heading" className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              {["Design", "Concepts"].map((word, i) => (
                <span key={word} className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className={`inline-block ${i === 1 ? "text-accent" : "mr-[0.22em]"}`}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="max-w-md text-base text-muted sm:text-lg lg:pb-3 lg:text-right"
            >
              Working pages for the studio site. Every preview is running live; open one to see it full size.
            </motion.p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
            {PAGES.map((page, i) => (
              <PageCard key={page.href} page={page} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}

function PageCard({ page, index }: { page: Page; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const live = useInView(ref, { amount: 0.2 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: EASE }}
      className={page.className}
    >
      <Link
        href={page.href}
        className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_30px_80px_-30px_rgba(255,214,10,.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-2.5"
      >
        {/* Preview screen */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-[20px] border border-black bg-panel">
          <div className="relative z-20 flex items-center gap-3 border-b border-line bg-black/40 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="truncate">
                localhost<span className="text-white/80">{page.href}</span>
              </span>
            </div>
          </div>
          <div className={`screen-grid relative overflow-hidden ${page.wide ? "aspect-[16/10] lg:aspect-[32/9]" : "aspect-[16/10]"}`} aria-hidden>
            <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]">
              {page.preview(live)}
            </div>
            <div className="scanlines pointer-events-none absolute inset-0 z-10" />
          </div>
        </div>

        {/* Label */}
        <div className="flex items-end justify-between gap-4 px-3 pb-2 pt-5 sm:px-4">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{page.title}</h2>
            <p className="mt-1.5 max-w-[52ch] text-sm text-muted sm:text-base">{page.description}</p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

/* ───────────────────────── Previews ───────────────────────── */

/** Renders children at 2× and scales them down, so miniature pages keep their real proportions. */
function Mini({ children, scale = 0.5 }: { children: ReactNode; scale?: number }) {
  const size = `${100 / scale}%`;
  return (
    <div className="absolute left-0 top-0 origin-top-left" style={{ width: size, height: size, transform: `scale(${scale})` }}>
      {children}
    </div>
  );
}

function ServicesPreview({ live }: { live: boolean }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  // Cycle through the services like the real page does
  useEffect(() => {
    if (!live || reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % SERVICES.length), 5000);
    return () => window.clearInterval(t);
  }, [live, reduce]);

  const service = SERVICES[i];
  const Scene = SCENES[service.id];
  const Icon = service.icon;

  return (
    <Mini scale={0.6}>
      <div className="absolute inset-0 flex flex-col gap-6 p-6">
        {/* The monitor */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-panel">
          <AnimatePresence initial={false}>
            <motion.div
              key={service.id}
              className="absolute inset-0"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {live && <Scene />}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 rounded-full border border-line bg-black/80 py-2 pl-2 pr-5">
            <span className="grid size-10 place-items-center rounded-full bg-accent text-black">
              <Icon className="size-5" />
            </span>
            <span className="font-display text-xl font-semibold">{service.title}</span>
          </div>
        </div>

        {/* The service rail, as on the real page */}
        <div className="grid grid-cols-2 content-start gap-3">
          {SERVICES.map((s, n) => {
            const RailIcon = s.icon;
            const on = n === i;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-colors duration-500 ${on ? "border-accent/40 bg-white/[0.05]" : "border-white/[0.06]"}`}
              >
                <span className={`grid size-12 place-items-center rounded-xl border transition-colors duration-500 ${on ? "border-accent bg-accent text-black" : "border-white/10 bg-white/[0.04] text-white/60"}`}>
                  <RailIcon className="size-6" />
                </span>
                <span className={`font-display text-2xl font-semibold transition-colors duration-500 ${on ? "text-white" : "text-white/50"}`}>{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Mini>
  );
}

const BENTO: { id: string; area: string }[] = [
  { id: "lumen-health", area: "col-span-2 row-span-2" },
  { id: "northpeak-coffee", area: "row-span-2" },
  { id: "atlas-freight", area: "row-span-2" },
  { id: "orbit-pay", area: "col-span-2" },
  { id: "kinetic-run-club", area: "col-span-2" },
];

function BentoPreview({ live }: { live: boolean }) {
  return (
    <Mini>
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-4 p-6">
        {BENTO.map(({ id, area }) => (
          <div key={id} className={`overflow-hidden rounded-2xl border border-white/10 p-1.5 ${area}`}>
            <Screen project={byId(id)} live={live} className="size-full rounded-xl" />
          </div>
        ))}
      </div>
    </Mini>
  );
}

function ControlRoomPreview({ live }: { live: boolean }) {
  const wall = PROJECTS.slice(0, 9);
  return (
    <Mini>
      <div className="absolute inset-0 grid grid-cols-[1.6fr_1fr] gap-6 p-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 p-1.5">
          <Screen project={wall[4]} live={live} className="size-full rounded-xl" />
        </div>
        <div className="grid grid-cols-3 content-center gap-2.5 rounded-2xl border border-white/10 bg-black/30 p-3">
          {wall.map((p, i) => (
            <div key={p.id} className={`overflow-hidden rounded-lg border p-0.5 ${i === 4 ? "border-accent" : "border-white/10"}`}>
              <Screen project={p} live={live && i === 4} className="aspect-[16/10] rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </Mini>
  );
}

function SeoPreview() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#101014] p-6 sm:p-8">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#17171b] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] sm:p-6">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/70">
          <Search className="size-4 text-white/40" /> design and development studio
        </div>
        <div className="mt-5 flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-accent font-display text-xs font-bold text-black">S</span>
          <span className="min-w-0 text-xs leading-tight">
            <span className="block text-white/85">Studio</span>
            <span className="block truncate text-white/45">yourdomain.com › about-us</span>
          </span>
        </div>
        <p className="mt-2 font-display text-lg font-semibold leading-snug text-[#8ab4f8] sm:text-xl">About Us: Design, Development &amp; Growth Studio</p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/60">Meet the seven-person studio behind fast websites, memorable brands, SEO, video and AI automation. See what we believe…</p>
        <div className="mt-3 divide-y divide-white/10 border-t border-white/10 text-sm text-white/75">
          {["What services does the studio offer?", "Who will I work with on my project?"].map((q) => (
            <p key={q} className="flex items-center justify-between py-2.5">
              {q} <ChevronDown className="size-4 text-white/40" />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeliefsPreview({ live }: { live: boolean }) {
  return (
    <Mini scale={0.6}>
      <div className="absolute inset-0 grid grid-cols-[1fr_1.15fr] items-center gap-10 p-12">
        <p className="font-display text-7xl font-bold leading-[0.92] tracking-tight">
          Fast is a <span className="text-accent">feature.</span>
        </p>
        <div className="h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-panel">
          <FastDemo live={live} />
        </div>
      </div>
    </Mini>
  );
}

function byId(id: string): Project {
  return PROJECTS.find((p) => p.id === id)!;
}
