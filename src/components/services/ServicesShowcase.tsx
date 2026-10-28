"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { SERVICES, SLIDE_DURATION, type Service } from "./data";
import { SCENES } from "./scenes";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServicesShowcase() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  // null = user hasn't chosen yet; then people who prefer reduced motion start paused
  const [pausedChoice, setPausedChoice] = useState<boolean | null>(null);
  const userPaused = pausedChoice ?? !!reduceMotion;
  const [hovering, setHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const paused = userPaused || hovering || !inView;
  const progress = useMotionValue(0);

  const go = useCallback(
    (index: number) => {
      progress.set(0);
      setActive((index + SERVICES.length) % SERVICES.length);
    },
    [progress],
  );

  // Auto-advance timer. Driven per-frame so it can pause mid-slide and resume.
  useAnimationFrame((_, delta) => {
    if (paused) return;
    const next = progress.get() + Math.min(delta, 100) / SLIDE_DURATION;
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % SERVICES.length);
    } else {
      progress.set(next);
    }
  });

  const service = SERVICES[active];

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        aria-labelledby="services-heading"
        className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
      >
        <Backdrop />

        <div className="mx-auto max-w-[1440px]">
          <Header active={active} paused={userPaused} onToggle={() => setPausedChoice(!userPaused)} onPrev={() => go(active - 1)} onNext={() => go(active + 1)} />

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-16 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)] lg:gap-10">
            <ServiceRail active={active} progress={progress} onSelect={go} />
            <MobileRail active={active} progress={progress} onSelect={go} />

            <div
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
              onPointerLeave={() => setHovering(false)}
            >
              <BigScreen service={service} paused={paused} userPaused={userPaused} progress={progress} active={active} onSelect={go} tilt={!reduceMotion} />
              <Details service={service} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 flex justify-center"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_0_rgba(255,214,10,.5)] transition-shadow hover:shadow-[0_0_40px_-4px_rgba(255,214,10,.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              See all services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ───────────────────────── Header ───────────────────────── */

function Header({
  active,
  paused,
  onToggle,
  onPrev,
  onNext,
}: {
  active: number;
  paused: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent"
        >
          <span className="size-2 bg-accent" /> What we do
        </motion.p>
        <h1 id="services-heading" className="mt-4 font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
          {["Our", "Services"].map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className={`inline-block ${i === 1 ? "text-accent" : ""}`}
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {word}
                {i === 0 && " "}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 max-w-xl text-base text-muted sm:text-lg"
        >
          End-to-end solutions to help your brand grow, built around your goals. Watch each one run live, or pick a service to jump straight to it.
        </motion.p>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-mono text-sm tabular-nums text-muted">
          <span className="text-2xl font-semibold text-white">{SERVICES[active].num}</span> / {String(SERVICES.length).padStart(2, "0")}
        </div>
        <div className="flex gap-2">
          <IconButton label="Previous service" onClick={onPrev}><ChevronLeft className="size-4" /></IconButton>
          <IconButton label={paused ? "Play slideshow" : "Pause slideshow"} onClick={onToggle} highlight>
            {paused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
          </IconButton>
          <IconButton label="Next service" onClick={onNext}><ChevronRight className="size-4" /></IconButton>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  highlight,
  children,
}: {
  label: string;
  onClick: () => void;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid size-11 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        highlight
          ? "border-accent bg-accent text-black hover:bg-accent-soft"
          : "border-white/15 bg-white/[0.03] text-white hover:border-white/40"
      }`}
    >
      {children}
    </button>
  );
}

/* ───────────────────────── Rails ───────────────────────── */

function useRailKeys(active: number, onSelect: (i: number) => void, prevKey: string, nextKey: string) {
  return (e: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === nextKey) next = active + 1;
    else if (e.key === prevKey) next = active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SERVICES.length - 1;
    if (next === null) return;
    e.preventDefault();
    const wrapped = (next + SERVICES.length) % SERVICES.length;
    onSelect(wrapped);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[wrapped]?.focus();
  };
}

function ServiceRail({ active, progress, onSelect }: { active: number; progress: MotionValue<number>; onSelect: (i: number) => void }) {
  const onKeyDown = useRailKeys(active, onSelect, "ArrowUp", "ArrowDown");

  return (
    <div role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKeyDown} className="hidden flex-col gap-1.5 lg:flex">
      {SERVICES.map((s, i) => {
        const isActive = i === active;
        const Icon = s.icon;
        return (
          <motion.button
            key={s.id}
            type="button"
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={isActive}
            aria-controls="service-screen"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: EASE }}
            className={`group relative overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive ? "border-accent/40 bg-white/[0.05]" : "border-transparent hover:border-white/10 hover:bg-white/[0.025]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="rail-glow"
                className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,214,10,.14),transparent_60%)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-3.5">
              <IconTile icon={Icon} active={isActive} />
              <span className={`flex-1 font-display text-lg font-semibold transition-colors ${isActive ? "text-white" : "text-white/55 group-hover:text-white/85"}`}>
                {s.title}
              </span>
              <span className={`font-mono text-xs ${isActive ? "text-accent" : "text-white/25"}`}>{s.num}</span>
            </div>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden pl-[58px] text-sm leading-relaxed text-muted"
                >
                  <span className="block pt-1.5">{s.short}</span>
                </motion.p>
              )}
            </AnimatePresence>
            {isActive && <ProgressBar progress={progress} className="absolute inset-x-4 bottom-0" />}
          </motion.button>
        );
      })}
    </div>
  );
}

function MobileRail({ active, progress, onSelect }: { active: number; progress: MotionValue<number>; onSelect: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = useRailKeys(active, onSelect, "ArrowLeft", "ArrowRight");

  // Keep the active chip in view without scrolling the page vertically
  useEffect(() => {
    const el = ref.current;
    const chip = el?.children[active] as HTMLElement | undefined;
    if (!el || !chip) return;
    el.scrollTo({ left: chip.offsetLeft - el.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Services"
      onKeyDown={onKeyDown}
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:hidden"
    >
      {SERVICES.map((s, i) => {
        const isActive = i === active;
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls="service-screen"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full border py-2 pl-2 pr-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
              isActive ? "border-accent/50 bg-accent/10 text-white" : "border-white/10 text-white/60"
            }`}
          >
            <span className={`grid size-7 place-items-center rounded-full ${isActive ? "bg-accent text-black" : "bg-white/10"}`}>
              <Icon className="size-3.5" />
            </span>
            {s.title}
            {isActive && <ProgressBar progress={progress} className="absolute inset-x-3 bottom-0" />}
          </button>
        );
      })}
    </div>
  );
}

function IconTile({ icon: Icon, active }: { icon: Service["icon"]; active: boolean }) {
  return (
    <motion.span
      animate={active ? { rotate: [0, -8, 6, 0], scale: [1, 1.12, 1] } : { rotate: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`grid size-11 shrink-0 place-items-center rounded-xl border transition-colors ${
        active
          ? "border-accent bg-gradient-to-br from-accent-soft to-accent text-black shadow-[0_6px_20px_-6px_rgba(255,214,10,.7)]"
          : "border-white/10 bg-white/[0.04] text-white/60 group-hover:text-white"
      }`}
    >
      <Icon className="size-5" />
    </motion.span>
  );
}

function ProgressBar({ progress, className = "" }: { progress: MotionValue<number>; className?: string }) {
  return (
    <span className={`block h-0.5 overflow-hidden rounded-full bg-white/10 ${className}`}>
      <motion.span className="block h-full origin-left bg-accent" style={{ scaleX: progress }} />
    </span>
  );
}

/* ───────────────────────── Big screen ───────────────────────── */

function BigScreen({
  service,
  active,
  paused,
  userPaused,
  progress,
  onSelect,
  tilt,
}: {
  service: Service;
  active: number;
  paused: boolean;
  userPaused: boolean;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
  tilt: boolean;
}) {
  const Scene = SCENES[service.id];

  // Subtle 3D tilt following the pointer
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 20 });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetTilt = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative [perspective:1600px]"
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
    >
      {/* Glow behind the monitor */}
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,214,10,.18),transparent_70%)] blur-2xl" />

      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] sm:p-3">
        <div
          id="service-screen"
          role="tabpanel"
          aria-labelledby={`tab-${service.id}`}
          aria-live={paused ? "polite" : "off"}
          className="relative overflow-hidden rounded-[20px] border border-black bg-panel"
        >
          {/* Window bar */}
          <div className="relative z-20 flex items-center gap-3 border-b border-line bg-black/40 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
              <span className="text-accent">●</span>
              <span className="truncate">studio://services/<span className="text-white/80">{service.id}</span></span>
            </div>
            <span
              className={`hidden items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider sm:flex ${
                paused ? "border-white/15 text-muted" : "border-accent/40 text-accent"
              }`}
            >
              <span className={`size-1.5 rounded-full ${paused ? "bg-white/40" : "animate-pulse bg-accent"}`} />
              {userPaused ? "Paused" : paused ? "Hold" : "Auto"}
            </span>
          </div>

          {/* Scene viewport */}
          <div className="screen-grid relative aspect-[4/5] sm:aspect-[16/11] xl:aspect-[16/10]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <Scene />
              </motion.div>
            </AnimatePresence>

            {/* "Channel change" sweep */}
            <motion.div
              key={`sweep-${service.id}`}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 z-10 h-24 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
              initial={{ top: "-25%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            <div aria-hidden className="scanlines pointer-events-none absolute inset-0 z-10" />
            <div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,.06),transparent_35%)]" />
          </div>

          {/* Status bar */}
          <div className="relative z-20 flex items-center gap-4 border-t border-line bg-black/40 px-4 py-2.5">
            <span className="font-mono text-[11px] text-accent">{service.num}</span>
            <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted sm:inline">
              Now showing · {service.title}
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Show ${s.title}`}
                  onClick={() => onSelect(i)}
                  className="group grid h-5 place-items-center focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className={`relative block h-1 overflow-hidden rounded-full transition-all ${i === active ? "w-8 bg-white/15" : "w-2.5 bg-white/20 group-hover:bg-white/40"}`}>
                    {i === active && <motion.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: progress }} />}
                    {i < active && <span className="absolute inset-0 bg-accent/60" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Monitor stand */}
      <div aria-hidden className="mx-auto h-5 w-24 bg-gradient-to-b from-[#1c1c21] to-[#111114] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)] sm:w-32" />
      <div aria-hidden className="mx-auto h-1.5 w-48 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent sm:w-72" />
    </motion.div>
  );
}

/* ───────────────────────── Details strip ───────────────────────── */

function Details({ service }: { service: Service }) {
  return (
    <div className="mt-8 min-h-[150px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">{service.title}</h3>
            <p className="mt-2 max-w-2xl text-muted">{service.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.deliverables.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/80"
                >
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-4 self-start md:self-end">
            <Link
              href={`/services/${service.id}`}
              className="text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Learn more about {service.title.toLowerCase()}
            </Link>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Backdrop ───────────────────────── */

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid absolute inset-0" />
      <motion.div
        className="absolute left-1/2 top-[-20%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,214,10,.10),transparent)]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
