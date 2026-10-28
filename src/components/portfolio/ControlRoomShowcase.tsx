"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { PROJECTS, type Project } from "./data";
import { Backdrop, CaseBody, EASE, FilterBar, Footer, RoundButton, Screen, SERVICE_BY_ID } from "./shared";

/** How long each project stays on air before the wall cuts to the next (ms). */
const ON_AIR_DURATION = 8000;

export default function ControlRoomShowcase() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  // null = no choice yet; people who prefer reduced motion start paused
  const [pausedChoice, setPausedChoice] = useState<boolean | null>(null);
  const userPaused = pausedChoice ?? !!reduceMotion;
  const [hovering, setHovering] = useState(false);

  const roomRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);
  const inView = useInView(roomRef, { amount: 0.3 });
  const progress = useMotionValue(0);

  const matching = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.services.includes(filter))),
    [filter],
  );
  const activeIndex = matching.findIndex((p) => p.id === activeId);
  const active = PROJECTS.find((p) => p.id === activeId)!;
  const paused = userPaused || hovering || !inView;

  const cut = (id: string) => {
    progress.set(0);
    setActiveId(id);
  };
  const step = (dir: 1 | -1) => cut(matching[(Math.max(activeIndex, 0) + dir + matching.length) % matching.length].id);

  const choose = (id: string) => {
    setFilter(id);
    const next = id === "all" ? PROJECTS : PROJECTS.filter((p) => p.services.includes(id));
    if (!next.some((p) => p.id === activeId)) cut(next[0].id);
  };

  // Pick from the wall: cut to it and bring the program monitor into view on small screens.
  const pick = (id: string) => {
    cut(id);
    const el = programRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Auto-cut through the matching channels, pausable mid-shot.
  useAnimationFrame((_, delta) => {
    if (paused) return;
    const next = progress.get() + Math.min(delta, 100) / ON_AIR_DURATION;
    if (next >= 1) {
      progress.set(0);
      setActiveId((id) => {
        const i = matching.findIndex((p) => p.id === id);
        return matching[(i + 1) % matching.length].id;
      });
    } else {
      progress.set(next);
    }
  });

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="work-heading" className="relative isolate overflow-x-clip px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <Backdrop />

        <div className="mx-auto max-w-[1440px]">
          <Header />

          <FilterBar active={filter} onChoose={choose} total={PROJECTS.length} className="mt-10 lg:mt-14" />

          <div
            ref={roomRef}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)] lg:gap-10"
          >
            {/* Program feed + story */}
            <div ref={programRef} className="scroll-mt-24">
              <Program
                project={active}
                paused={paused}
                userPaused={userPaused}
                live={inView}
                onTogglePause={() => setPausedChoice(!userPaused)}
                onStep={step}
                position={`${String(activeIndex + 1).padStart(2, "0")} / ${String(matching.length).padStart(2, "0")}`}
              />
              <div aria-live={paused ? "polite" : "off"} className="mt-8 min-h-[360px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col gap-6"
                  >
                    <p className="font-mono text-xs text-muted">
                      {active.client} · {active.year}
                    </p>
                    <CaseBody project={active} wide />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Monitor wall */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Wall matching={matching} activeId={active.id} progress={progress} live={inView} onPick={pick} />
            </div>
          </div>

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
      <h1 id="work-heading" className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
        {["Our", "Work"].map((word, i) => (
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
        Every project is live on the wall. Let it cut between them, or pick a screen to put it on air.
      </motion.p>
    </div>
  );
}

/* ───────────────────────── Program monitor ───────────────────────── */

function Program({
  project,
  paused,
  userPaused,
  live,
  onTogglePause,
  onStep,
  position,
}: {
  project: Project;
  paused: boolean;
  userPaused: boolean;
  live: boolean;
  onTogglePause: () => void;
  onStep: (dir: 1 | -1) => void;
  position: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease: EASE }} className="relative">
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,214,10,.16),transparent_70%)] blur-2xl" />

      <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] sm:p-3">
        <div id="program-screen" role="region" aria-label={`On air: ${project.client}`} className="relative overflow-hidden rounded-[20px] border border-black bg-panel">
          {/* Window bar */}
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
            <span
              className={`hidden items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider sm:flex ${
                paused ? "border-white/15 text-muted" : "border-accent/40 text-accent"
              }`}
            >
              <span className={`size-1.5 rounded-full ${paused ? "bg-white/40" : "animate-pulse bg-accent"}`} />
              {userPaused ? "Paused" : paused ? "Hold" : "On air"}
            </span>
          </div>

          {/* Feed */}
          <div className="screen-grid relative aspect-[4/5] sm:aspect-[16/10]">
            <AnimatePresence initial={false}>
              <motion.div
                key={project.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Screen project={project} live={live} className="size-full" />
              </motion.div>
            </AnimatePresence>
            {/* Channel-change sweep */}
            <motion.div
              key={`sweep-${project.id}`}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 z-10 h-24 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
              initial={{ top: "-25%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </div>

          {/* Status bar */}
          <div className="relative z-20 flex items-center gap-3 border-t border-line bg-black/40 px-3 py-2 sm:px-4">
            <span className="font-mono text-[11px] tabular-nums text-accent">{position}</span>
            <span className="hidden min-w-0 truncate font-mono text-[11px] uppercase tracking-wider text-muted sm:inline">
              {project.client} · {SERVICE_BY_ID[project.services[0]].title}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <RoundButton label="Previous project" onClick={() => onStep(-1)}>
                <ChevronLeft className="size-4" />
              </RoundButton>
              <RoundButton label={userPaused ? "Resume auto-cut" : "Pause auto-cut"} onClick={onTogglePause} highlight>
                {userPaused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
              </RoundButton>
              <RoundButton label="Next project" onClick={() => onStep(1)}>
                <ChevronRight className="size-4" />
              </RoundButton>
            </div>
          </div>
        </div>
      </div>

      {/* Stand */}
      <div aria-hidden className="mx-auto h-5 w-24 bg-gradient-to-b from-[#1c1c21] to-[#111114] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)] sm:w-32" />
      <div aria-hidden className="mx-auto h-1.5 w-48 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent sm:w-72" />
    </motion.div>
  );
}

/* ───────────────────────── Monitor wall ───────────────────────── */

function Wall({
  matching,
  activeId,
  progress,
  live,
  onPick,
}: {
  matching: Project[];
  activeId: string;
  progress: MotionValue<number>;
  live: boolean;
  onPick: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onAir = (id: string) => matching.some((p) => p.id === id);

  // Roving focus across the channels that are on, in wall order.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const i = matching.findIndex((p) => p.id === activeId);
    let next: number | null = null;
    if (e.key in keys) next = (i + keys[e.key] + matching.length) % matching.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = matching.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = matching[next].id;
    onPick(id);
    ref.current?.querySelector<HTMLButtonElement>(`[data-channel="${id}"]`)?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
      className="rounded-[24px] border border-white/10 bg-gradient-to-b from-[#141418] to-[#0b0b0d] p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]"
    >
      <div className="mb-3 flex items-center justify-between px-1 font-mono text-[11px] uppercase tracking-wider text-muted">
        <span>Monitor wall</span>
        <span className="tabular-nums">
          <span className="text-accent">{matching.length}</span> / {PROJECTS.length} live
        </span>
      </div>

      <div
        ref={ref}
        role="tablist"
        aria-label="Projects"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-3"
      >
        {PROJECTS.map((p, i) => (
          <Channel key={p.id} project={p} index={i} active={p.id === activeId} on={onAir(p.id)} progress={progress} live={live} onPick={onPick} />
        ))}
      </div>
    </motion.div>
  );
}

function Channel({
  project,
  index,
  active,
  on,
  progress,
  live,
  onPick,
}: {
  project: Project;
  index: number;
  active: boolean;
  on: boolean;
  progress: MotionValue<number>;
  live: boolean;
  onPick: (id: string) => void;
}) {
  const Icon = SERVICE_BY_ID[project.services[0]].icon;
  return (
    <motion.button
      type="button"
      role="tab"
      data-channel={project.id}
      aria-selected={active}
      aria-controls="program-screen"
      aria-label={`${project.client}: ${project.title}`}
      disabled={!on}
      tabIndex={active ? 0 : -1}
      onClick={() => onPick(project.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: on ? 1 : 0.28, y: 0, filter: on ? "grayscale(0)" : "grayscale(1)" }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.25 + index * 0.03 }}
      className="group text-left focus-visible:outline-none disabled:cursor-not-allowed"
    >
      <div
        className={`relative overflow-hidden rounded-xl border p-1 transition-[border-color,box-shadow] ${
          active
            ? "border-accent shadow-[0_8px_28px_-10px_rgba(255,214,10,.7)]"
            : "border-white/10 bg-white/[0.02] group-enabled:group-hover:border-white/30"
        } group-focus-visible:shadow-[0_0_0_3px_rgba(255,214,10,.45)]`}
      >
        <div className="relative overflow-hidden rounded-lg border border-black">
          <Screen project={project} live={live && on} className="aspect-[16/10]" hoverZoom={on} />
          {active && (
            <>
              <span className="absolute left-1.5 top-1.5 z-10 flex items-center gap-1 rounded-full bg-black/75 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" /> On air
              </span>
              <span className="absolute inset-x-0 bottom-0 z-10 block h-0.5 bg-white/10">
                <motion.span className="block h-full origin-left bg-accent" style={{ scaleX: progress }} />
              </span>
              {/* Flash as the monitor goes on air (mounts with `active`) */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 bg-accent"
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 px-0.5">
        <Icon className={`size-3 shrink-0 ${active ? "text-accent" : "text-white/40"}`} />
        <span className={`truncate text-xs font-medium ${active ? "text-white" : "text-white/55 group-enabled:group-hover:text-white/85"}`}>{project.client}</span>
      </div>
    </motion.button>
  );
}
