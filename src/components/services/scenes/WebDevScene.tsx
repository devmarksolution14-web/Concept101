"use client";

import { motion } from "framer-motion";
import { Counter, EASE_OUT, Panel, PanelLabel } from "./shared";

type Token = { t: string; c?: string };

const CODE: Token[][] = [
  [{ t: "export default ", c: "text-pink-400" }, { t: "function ", c: "text-pink-400" }, { t: "Home", c: "text-accent" }, { t: "() {" }],
  [{ t: "  return (" }],
  [{ t: "    <" }, { t: "Nav", c: "text-sky-300" }, { t: " sticky " }, { t: "/>" }],
  [{ t: "    <" }, { t: "Hero", c: "text-sky-300" }, { t: " title", c: "text-emerald-300" }, { t: "=" }, { t: '"Grow faster"', c: "text-amber-200" }, { t: " />" }],
  [{ t: "    <" }, { t: "Features", c: "text-sky-300" }, { t: " cols", c: "text-emerald-300" }, { t: "={" }, { t: "3", c: "text-accent" }, { t: "} />" }],
  [{ t: "    <" }, { t: "CTA", c: "text-sky-300" }, { t: " />" }],
  [{ t: "  );" }],
  [{ t: "}" }],
];

const LINE_DELAY = 0.32;

export default function WebDevScene() {
  return (
    <div className="absolute inset-0 grid gap-3 p-4 sm:grid-cols-[1.05fr_1fr] sm:gap-4 sm:p-6">
      {/* Editor */}
      <Panel className="flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">page.tsx</span>
          <span className="font-mono text-[10px] text-muted">components/Hero.tsx</span>
        </div>
        <div className="flex-1 space-y-1 p-3 font-mono text-[10px] leading-relaxed sm:text-xs">
          {CODE.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-4 shrink-0 text-right text-white/20">{i + 1}</span>
              <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ delay: 0.3 + i * LINE_DELAY, duration: 0.35, ease: "linear" }}
                className="whitespace-pre text-white/80"
              >
                {line.map((tok, j) => (
                  <span key={j} className={tok.c}>{tok.t}</span>
                ))}
              </motion.span>
            </div>
          ))}
          <motion.div
            className="ml-7 h-3.5 w-1.5 bg-accent"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4 }}
          className="flex items-center gap-2 border-t border-line px-3 py-2 font-mono text-[10px] text-emerald-300"
        >
          <span className="size-1.5 rounded-full bg-emerald-400" /> Compiled in 412ms
        </motion.div>
      </Panel>

      {/* Live preview building up as the code is typed */}
      <Panel delay={0.15} className="relative hidden flex-col overflow-hidden sm:flex">
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <PanelLabel>Live preview</PanelLabel>
          <span className="font-mono text-[10px] text-muted">localhost:3000</span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-3">
          <Block delay={0.3 + 2 * LINE_DELAY} className="flex h-6 items-center justify-between px-2">
            <span className="h-1.5 w-8 rounded-full bg-accent" />
            <span className="flex gap-1.5">
              {[0, 1, 2].map((k) => <span key={k} className="h-1 w-5 rounded-full bg-white/25" />)}
            </span>
          </Block>
          <Block delay={0.3 + 3 * LINE_DELAY} className="flex flex-1 flex-col justify-center gap-2 p-3">
            <span className="h-2.5 w-3/4 rounded-full bg-white/80" />
            <span className="h-2.5 w-1/2 rounded-full bg-white/80" />
            <span className="h-1.5 w-2/3 rounded-full bg-white/25" />
            <span className="mt-1 h-4 w-16 rounded-full bg-accent" />
          </Block>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((k) => (
              <Block key={k} delay={0.3 + 4 * LINE_DELAY + k * 0.12} className="h-12 p-2">
                <span className="block size-3 rounded bg-accent/70" />
                <span className="mt-2 block h-1 w-3/4 rounded-full bg-white/30" />
              </Block>
            ))}
          </div>
        </div>

        {/* Lighthouse-style score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.6, type: "spring", stiffness: 220, damping: 16 }}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-line bg-black/80 p-2 pr-3 backdrop-blur"
        >
          <svg viewBox="0 0 36 36" className="size-10 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="3" />
            <motion.circle
              cx="18" cy="18" r="15" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.99 }}
              transition={{ delay: 3.8, duration: 1.4, ease: EASE_OUT }}
            />
          </svg>
          <div>
            <div className="font-display text-lg font-bold leading-none text-emerald-300">
              <Counter to={99} delay={3.8} duration={1.4} />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-muted">Performance</div>
          </div>
        </motion.div>
      </Panel>
    </div>
  );
}

function Block({ delay, className = "", children }: { delay: number; className?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: EASE_OUT }}
      className={`rounded-lg border border-white/10 bg-white/[0.04] ${className}`}
    >
      {children}
    </motion.div>
  );
}
