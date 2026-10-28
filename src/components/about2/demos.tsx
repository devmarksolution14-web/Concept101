"use client";

import { AnimatePresence, animate, motion, useAnimationFrame, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { Bot, Check, Clock3, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PEOPLE } from "../about/data";
import { PROJECTS } from "../portfolio/data";
import { EASE, Screen } from "../portfolio/shared";

const PROJECT_BY_ID = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

/** Runs `tick` on an interval while `live`. */
function useStep(live: boolean, ms: number, count: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!live) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [live, ms, count]);
  return i;
}

/* ───────────────────────── 1. Fast is a feature ───────────────────────── */

const CYCLE = 6.5;

export function FastDemo({ live }: { live: boolean }) {
  const t = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (!live) return;
    t.set((t.get() + delta / 1000) % CYCLE);
  });

  return (
    <div className="grid h-full grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-5">
      <Lane t={t} duration={4.2} label="Typical site" tone="muted" />
      <Lane t={t} duration={0.9} label="Built by us" tone="accent" />
    </div>
  );
}

function Lane({ t, duration, label, tone }: { t: MotionValue<number>; duration: number; label: string; tone: "muted" | "accent" }) {
  const p = useTransform(t, (v) => Math.min(1, v / duration));
  const readout = useTransform(t, (v) => `${Math.min(v, duration).toFixed(1)}s`);
  const accent = tone === "accent";
  const blocks: [string, number][] = [
    ["h-3 w-1/3", 0.15],
    ["h-6 w-5/6", 0.35],
    ["h-6 w-2/3", 0.45],
    ["h-3 w-1/2", 0.6],
    ["h-16 w-full", 0.8],
    ["h-10 w-full", 1],
  ];

  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border ${accent ? "border-accent/40" : "border-white/10"} bg-black/30`}>
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
        <span className={`truncate text-xs font-semibold ${accent ? "text-accent" : "text-white/60"}`}>{label}</span>
        <motion.span className={`font-mono text-sm font-semibold tabular-nums ${accent ? "text-accent" : "text-white/70"}`}>{readout}</motion.span>
      </div>
      <span className="block h-0.5 bg-white/5">
        <motion.span className={`block h-full origin-left ${accent ? "bg-accent" : "bg-white/40"}`} style={{ scaleX: p }} />
      </span>
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        {blocks.map(([cls, at], i) => (
          <PaintBlock key={i} p={p} at={at} className={cls} accent={accent && i === 3} />
        ))}
      </div>
    </div>
  );
}

function PaintBlock({ p, at, className, accent }: { p: MotionValue<number>; at: number; className: string; accent: boolean }) {
  const opacity = useTransform(p, [at - 0.12, at], [0.08, 1]);
  return <motion.span className={`block rounded-md ${accent ? "bg-accent" : "bg-white/25"} ${className}`} style={{ opacity }} />;
}

/* ───────────────────────── 2. Show, don't tell ───────────────────────── */

const CLAIMS = [
  { claim: "We make brands people remember.", project: "northpeak-coffee" },
  { claim: "We build sites that load fast.", project: "lumen-health" },
  { claim: "We cut videos people finish.", project: "kinetic-run-club" },
];

export function ShowDemo({ live }: { live: boolean }) {
  const i = useStep(live, 4500, CLAIMS.length);
  const c = CLAIMS[i];
  const project = PROJECT_BY_ID[c.project];

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={i} className="absolute inset-0 flex flex-col justify-center gap-5 p-5 sm:p-7" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <p className="relative w-fit font-display text-xl font-semibold leading-snug text-white/80 sm:text-2xl">
            {c.claim}
            <motion.span
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-0.5 origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: live ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
            />
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={live ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ delay: 1.3, duration: 0.6, ease: EASE }}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <Screen project={project} live={live} className="aspect-[16/8]" />
            <div className="flex items-center justify-between gap-3 bg-black/50 px-3 py-2 text-xs">
              <span className="font-semibold text-white">{project.client}</span>
              <span className="truncate text-muted">{project.results[0].value} {project.results[0].label.toLowerCase()}</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── 3. Design for the second visit ───────────────────────── */

export function SecondVisitDemo({ live }: { live: boolean }) {
  const visit = useStep(live, 3600, 2);
  const p = PROJECT_BY_ID["fernway-travel"].palette;

  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="relative isolate flex w-fit gap-1 rounded-full border border-white/10 bg-black/40 p-1 text-xs font-semibold">
        {["First visit", "Second visit"].map((label, n) => (
          <span key={label} className={`relative rounded-full px-3 py-1 transition-colors ${visit === n ? "text-black" : "text-white/60"}`}>
            {visit === n && <motion.span layoutId="visit-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            {label}
          </span>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10" style={{ background: p.bg, color: p.fg }}>
        <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs" style={{ borderColor: `${p.fg}22` }}>
          <span className="flex items-center gap-1.5 font-display font-semibold">
            <span className="size-2 rounded-full" style={{ background: p.accent }} /> Fernway Travel
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={visit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid size-6 place-items-center rounded-full text-[10px] font-bold" style={{ background: visit ? p.accent : `${p.fg}22`, color: p.bg }}>
              {visit ? "S" : ""}
            </motion.span>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {visit === 0 ? (
            <motion.div key="first" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="flex flex-col gap-3 p-4">
              <p className="font-display text-xl font-bold leading-tight sm:text-2xl">Slow trips, booked fast</p>
              <p className="text-xs opacity-60">Small-group tours across Europe.</p>
              <div className="grid grid-cols-3 gap-2">
                {["Lisbon", "Kyoto", "Oaxaca"].map((c) => (
                  <div key={c} className="rounded-lg p-2" style={{ background: p.soft }}>
                    <span className="block aspect-[4/3] rounded" style={{ background: `${p.fg}18` }} />
                    <span className="mt-1.5 block text-[11px] font-semibold">{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="second" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="flex flex-col gap-3 p-4">
              <p className="font-display text-xl font-bold leading-tight sm:text-2xl">Welcome back, Sam</p>
              <div className="flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: p.accent, background: `${p.accent}18` }}>
                <span className="grid size-10 shrink-0 place-items-center rounded-md text-xs font-bold" style={{ background: p.accent, color: p.bg }}>
                  2/2
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">Lisbon · 3 nights</p>
                  <p className="text-[11px] opacity-60">Pick up where you left off</p>
                </div>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: p.accent, color: p.bg }}>
                  Finish booking
                </span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wider opacity-50">Saved for you</p>
              <div className="grid grid-cols-2 gap-2">
                {["Porto add-on", "Kyoto in spring"].map((c) => (
                  <div key={c} className="rounded-lg p-2 text-[11px] font-semibold" style={{ background: p.soft }}>
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────── 4. Automate the boring parts ───────────────────────── */

const TASKS = ["Copy quote request into CRM", "Look up the freight rate", "Draft the reply email", "Update the pricing sheet", "Send the invoice", "Chase the unpaid invoice"];

export function AutomateDemo({ live }: { live: boolean }) {
  // 0..TASKS.length checks, then a pause of 3 ticks before resetting
  const step = useStep(live, 700, TASKS.length + 4);
  const done = Math.min(step, TASKS.length);
  const hours = useMotionValue(0);
  const hoursText = useTransform(hours, (v) => `${Math.round(v)}h`);

  useEffect(() => {
    const c = animate(hours, (done / TASKS.length) * 26, { duration: 0.6, ease: EASE });
    return () => c.stop();
  }, [done, hours]);

  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-black">
            <Bot className="size-4" />
          </span>
          Inbox agent
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
          <Clock3 className="size-3.5 text-accent" /> Saved this week <motion.span className="font-mono font-semibold text-accent">{hoursText}</motion.span>
        </span>
      </div>
      <ul className="flex flex-1 flex-col justify-center gap-1.5">
        {TASKS.map((task, i) => {
          const isDone = i < done;
          const isNow = i === done && done < TASKS.length;
          return (
            <li key={task} className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors duration-300 ${isNow ? "border-accent/50 bg-accent/5" : "border-white/[0.06]"}`}>
              <span className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-300 ${isDone ? "border-accent bg-accent text-black" : "border-white/20"}`}>
                {isDone && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="size-3.5" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
              <span className={`truncate transition-colors duration-300 ${isDone ? "text-white/40 line-through decoration-accent/60" : "text-white/85"}`}>{task}</span>
              {isNow && <MousePointer2 className="ml-auto size-4 shrink-0 fill-current text-accent" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ───────────────────────── 5. Small team, senior hands ───────────────────────── */

export function TeamDemo({ live }: { live: boolean }) {
  const you = { x: 10, y: 50 };
  const spots = PEOPLE.map((p, i) => {
    const a = (-60 + (120 / (PEOPLE.length - 1)) * i) * (Math.PI / 180);
    return { p, x: 26 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 };
  });

  return (
    <div className="relative h-full">
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {spots.map((s, i) => (
          <motion.line
            key={s.p.id}
            x1={you.x}
            y1={you.y}
            x2={s.x}
            y2={s.y}
            stroke={s.p.color}
            strokeWidth={0.35}
            strokeOpacity={0.6}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: live ? 1 : 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
          />
        ))}
      </svg>

      <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${you.x}%`, top: `${you.y}%` }}>
        <span className="grid size-14 place-items-center rounded-full border-2 border-accent bg-accent/15 font-display text-sm font-bold text-accent sm:size-16">You</span>
      </div>

      {spots.map((s, i) => (
        <motion.div
          key={s.p.id}
          className="absolute flex -translate-y-1/2 items-center gap-2"
          style={{ left: `${s.x}%`, top: `${s.y}%`, translateX: "-20px" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={live ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-black shadow-[0_8px_20px_-8px_rgba(0,0,0,.9)]" style={{ background: s.p.color }}>
            {s.p.initials}
          </span>
          <span className="hidden whitespace-nowrap text-xs sm:block">
            <span className="block font-semibold text-white">{s.p.name.split(" ")[0]}</span>
            <span className="block text-muted">{s.p.role}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
