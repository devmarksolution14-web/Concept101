"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { Panel, PanelLabel } from "./shared";

const RUN = 6; // seconds the playhead takes to cross the timeline
const FPS = 24;
const CLIPS = [
  { w: 22, color: "from-sky-500/80 to-sky-700/80", label: "Hook", tint: "from-sky-900 to-slate-900" },
  { w: 30, color: "from-violet-500/80 to-violet-700/80", label: "B-roll", tint: "from-violet-900 to-slate-900" },
  { w: 18, color: "from-rose-500/80 to-rose-700/80", label: "Product", tint: "from-rose-900 to-slate-900" },
  { w: 30, color: "from-amber-400/90 to-amber-600/90", label: "CTA", tint: "from-amber-700 to-slate-900" },
];
const WAVE = Array.from({ length: 64 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.7) * 50 + Math.sin(i * 2.3) * 25));

export default function VideoScene() {
  const progress = useMotionValue(0);
  const left = useTransform(progress, (p) => `${p * 100}%`);
  const timecode = useTransform(progress, (p) => {
    const totalFrames = Math.floor(p * 30 * FPS);
    const s = Math.floor(totalFrames / FPS);
    const f = totalFrames % FPS;
    return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
  });
  // Which clip is under the playhead → drives the preview colour
  const clipIndex = useTransform(progress, (p) => {
    let acc = 0;
    for (let i = 0; i < CLIPS.length; i++) {
      acc += CLIPS[i].w / 100;
      if (p <= acc) return i;
    }
    return CLIPS.length - 1;
  });
  const label = useTransform(clipIndex, (i) => CLIPS[i].label.toUpperCase());

  useEffect(() => {
    const c = animate(progress, 1, { duration: RUN, ease: "linear", delay: 0.6 });
    return () => c.stop();
  }, [progress]);

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
      {/* Program monitor */}
      <Panel className="relative flex-1 overflow-hidden">
        {CLIPS.map((c, i) => (
          <ClipFrame key={c.label} index={i} clipIndex={clipIndex} tint={c.tint} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="font-display text-3xl font-bold tracking-[0.2em] text-white/90 sm:text-5xl">
            {label}
          </motion.span>
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-red-500" />
          <PanelLabel>Program · 4K · 24fps</PanelLabel>
        </div>
        <motion.div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 font-mono text-[11px] text-accent">
          {timecode}
        </motion.div>
        <div className="absolute bottom-3 left-3 max-w-[60%] rounded bg-black/70 px-2 py-1 text-[11px] text-white">
          Captions synced automatically ✦
        </div>
      </Panel>

      {/* Timeline */}
      <Panel delay={0.15} className="relative p-3">
        <div className="mb-2 flex items-center justify-between">
          <PanelLabel>Timeline</PanelLabel>
          <span className="font-mono text-[10px] text-muted">00:30 · Reel_v3_final</span>
        </div>
        <div className="relative space-y-1.5">
          <Track name="V1">
            {CLIPS.map((c, i) => (
              <motion.div
                key={c.label}
                className={`h-full rounded bg-gradient-to-b ${c.color} px-1.5 font-mono text-[9px] leading-6 text-white/90`}
                style={{ width: `${c.w}%` }}
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              >
                {c.label}
              </motion.div>
            ))}
          </Track>
          <Track name="T1">
            <motion.div
              className="ml-[6%] h-full w-[40%] rounded bg-white/15 px-1.5 font-mono text-[9px] leading-6 text-white/70"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              Title · Lower third
            </motion.div>
          </Track>
          <Track name="A1">
            <div className="flex h-full w-full items-center gap-[2px] rounded bg-emerald-500/10 px-1">
              {WAVE.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-full bg-emerald-400/70"
                  style={{ height: `${Math.min(h, 100)}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.01 }}
                />
              ))}
            </div>
          </Track>

          {/* Playhead */}
          <div className="pointer-events-none absolute -top-1 bottom-0 left-8 right-0">
            <motion.div className="absolute inset-y-0 w-px bg-accent" style={{ left }}>
              <span className="absolute -left-1.5 -top-1 size-3 rotate-45 rounded-sm bg-accent" />
            </motion.div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Track({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex h-6 items-center gap-2">
      <span className="w-6 font-mono text-[9px] text-muted">{name}</span>
      <div className="flex h-full flex-1 gap-0.5">{children}</div>
    </div>
  );
}

function ClipFrame({
  index,
  clipIndex,
  tint,
}: {
  index: number;
  clipIndex: MotionValue<number>;
  tint: string;
}) {
  const opacity = useTransform(clipIndex, (i) => (i === index ? 1 : 0));
  return <motion.div className={`absolute inset-0 bg-gradient-to-br ${tint}`} style={{ opacity }} />;
}
