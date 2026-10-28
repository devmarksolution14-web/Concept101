"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { PROJECTS, type Project, type TileSize } from "./data";
import { Backdrop, CaseBody, EASE, FilterBar, Footer, RoundButton, Screen, SERVICE_BY_ID } from "./shared";

const MORPH = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;

const SIZE_CLASS: Record<TileSize, string> = {
  sm: "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  xl: "md:col-span-2 md:row-span-2",
};

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.services.includes(filter))),
    [filter],
  );

  const openIndex = visible.findIndex((p) => p.id === openId);
  // Filtered views drop the bento footprints for an even grid, so short lists don't leave holes
  const filtered = filter !== "all";

  const choose = (id: string) => {
    setFilter(id);
    // Keep the open case study only if it survives the filter
    if (openId && id !== "all" && !PROJECTS.find((p) => p.id === openId)?.services.includes(id)) setOpenId(null);
  };

  const step = (dir: 1 | -1) => {
    if (openIndex < 0) return;
    setOpenId(visible[(openIndex + dir + visible.length) % visible.length].id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="portfolio-heading" className="relative isolate px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <Backdrop />

        <div className="mx-auto max-w-[1440px]">
          <Header />

          <FilterBar active={filter} onChoose={choose} total={PROJECTS.length} className="mt-10 lg:mt-14" />

          <LayoutGroup>
            <motion.ul
              layout
              className={`mt-8 grid grid-flow-row-dense auto-rows-[minmax(18rem,auto)] grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 ${
                filtered ? "md:auto-rows-[minmax(26rem,auto)] lg:grid-cols-3" : "md:auto-rows-[minmax(20rem,auto)] lg:grid-cols-4"
              }`}
            >
              <AnimatePresence initial={false}>
                {visible.map((project, i) => (
                  <Tile
                    key={project.id}
                    project={project}
                    size={filtered ? "sm" : project.size}
                    index={i}
                    open={project.id === openId}
                    onOpen={() => setOpenId(project.id)}
                    onClose={() => setOpenId(null)}
                    onStep={step}
                    position={`${openIndex + 1} / ${visible.length}`}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>

          <Footer />
        </div>
      </section>
    </MotionConfig>
  );
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
      <h1 id="portfolio-heading" className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
        {["Selected", "Work"].map((word, i) => (
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
        Builds, brands, campaigns and automations, each one running live. Filter by service, or open any project for the full story.
      </motion.p>
    </div>
  );
}

/* ───────────────────────── Tile ───────────────────────── */

function Tile({
  project,
  size,
  index,
  open,
  onOpen,
  onClose,
  onStep,
  position,
}: {
  project: Project;
  size: TileSize;
  index: number;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  position: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const wasOpen = useRef(open);

  // Bring the case study into view once it opens; return focus to the tile when it closes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      const t = window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.querySelector<HTMLElement>("[data-case-heading]")?.focus({ preventScroll: true });
      }, 380);
      wasOpen.current = true;
      return () => window.clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      el.querySelector<HTMLElement>("[data-tile-trigger]")?.focus({ preventScroll: true });
    }
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (!open) return;
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight" && !(e.target instanceof HTMLButtonElement)) onStep(1);
    else if (e.key === "ArrowLeft" && !(e.target instanceof HTMLButtonElement)) onStep(-1);
  };

  return (
    <motion.li
      ref={ref}
      layout
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)", transition: { duration: 0.25 } }}
      transition={{ layout: MORPH, default: { duration: 0.5, ease: EASE, delay: Math.min(index, 8) * 0.04 } }}
      className={`relative scroll-mt-24 ${open ? "col-span-full row-span-1" : SIZE_CLASS[size]}`}
    >
      {open ? (
        <CaseStudy project={project} live={inView} onClose={onClose} onStep={onStep} position={position} />
      ) : (
        <TileFace project={project} live={inView} onOpen={onOpen} />
      )}
    </motion.li>
  );
}

function TileFace({ project, live, onOpen }: { project: Project; live: boolean; onOpen: () => void }) {
  const lead = SERVICE_BY_ID[project.services[0]];

  return (
    <button
      type="button"
      data-tile-trigger
      onClick={onOpen}
      aria-expanded={false}
      aria-label={`${project.client}: ${project.title}. Open case study`}
      className="group block size-full text-left focus-visible:outline-none"
    >
      <Bezel layoutId={`bezel-${project.id}`} className="size-full group-hover:border-accent/40 group-focus-visible:border-accent group-focus-visible:shadow-[0_0_0_3px_rgba(255,214,10,.35)]">
        <Screen project={project} live={live} className="size-full min-h-[15rem]" hoverZoom />

        {/* Caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-14">
          <motion.div layout="position" className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-white/60">
                {project.client} · {project.year}
              </p>
              <p className="mt-1 font-display text-lg font-semibold leading-tight text-white [text-wrap:balance] sm:text-xl">{project.title}</p>
            </div>
            <span className="flex shrink-0 -space-x-1.5">
              {project.services.map((id) => {
                const Icon = SERVICE_BY_ID[id].icon;
                return (
                  <span key={id} title={SERVICE_BY_ID[id].title} className={`grid size-7 place-items-center rounded-full border border-black ${id === lead.id ? "bg-accent text-black" : "bg-[#26262c] text-white/80"}`}>
                    <Icon className="size-3.5" />
                  </span>
                );
              })}
            </span>
          </motion.div>
        </div>

        {/* Hover affordance */}
        <span className="absolute right-3 top-3 z-10 flex translate-y-1 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-black opacity-0 shadow-[0_8px_24px_-8px_rgba(255,214,10,.8)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          View case <ArrowUpRight className="size-3.5" />
        </span>
      </Bezel>
    </button>
  );
}

/* ───────────────────────── Case study (expanded tile) ───────────────────────── */

function CaseStudy({
  project,
  live,
  onClose,
  onStep,
  position,
}: {
  project: Project;
  live: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  position: string;
}) {
  return (
    <div className="grid gap-6 rounded-[28px] border border-accent/25 bg-panel/80 p-3 sm:p-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8 lg:p-5">
      {/* Monitor */}
      <Bezel layoutId={`bezel-${project.id}`} className="self-start">
        <div className="relative z-20 flex items-center gap-3 border-b border-line bg-black/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="truncate">
              studio://work/<span className="text-white/80">{project.id}</span>
            </span>
          </div>
        </div>
        <Screen project={project} live={live} className="aspect-[4/5] sm:aspect-[16/10]" />
      </Bezel>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        className="flex flex-col gap-6 px-1 pb-2 lg:py-2 lg:pr-2"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">
            {project.client} · {project.year}
          </p>
          <div className="flex items-center gap-2">
            <span className="mr-1 whitespace-nowrap font-mono text-xs tabular-nums text-white/40">{position}</span>
            <RoundButton label="Previous project" onClick={() => onStep(-1)}>
              <ChevronLeft className="size-4" />
            </RoundButton>
            <RoundButton label="Next project" onClick={() => onStep(1)}>
              <ChevronRight className="size-4" />
            </RoundButton>
            <RoundButton label="Close case study" onClick={onClose} highlight>
              <X className="size-4" />
            </RoundButton>
          </div>
        </div>

        <CaseBody project={project} />
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Shared pieces ───────────────────────── */

/** The monitor frame from the services showcase, shared between tile and case study so it morphs. */
function Bezel({ layoutId, className = "", children }: { layoutId: string; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={MORPH}
      className={`relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] transition-[border-color,box-shadow] ${className}`}
    >
      <div className="relative size-full overflow-hidden rounded-[16px] border border-black bg-panel">{children}</div>
    </motion.div>
  );
}
