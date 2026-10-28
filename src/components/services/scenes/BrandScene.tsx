"use client";

import { motion } from "framer-motion";
import { EASE_OUT, Panel, PanelLabel } from "./shared";

const SWATCHES = [
  { hex: "#FFD60A", name: "Signal" },
  { hex: "#0B0B0F", name: "Ink" },
  { hex: "#F4F1EA", name: "Paper" },
  { hex: "#3A86FF", name: "Pulse" },
  { hex: "#FF5D73", name: "Coral" },
];

const WORD = "LUMEN";

export default function BrandScene() {
  return (
    <div className="absolute inset-0 grid gap-3 p-4 sm:grid-cols-[1.4fr_1fr] sm:gap-4 sm:p-6">
      {/* Logo construction */}
      <Panel className="relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute left-3 top-3"><PanelLabel>Logo construction</PanelLabel></div>
        <svg viewBox="0 0 200 200" className="w-[46%] max-w-56 overflow-visible">
          {/* construction grid */}
          {[40, 80, 120, 160].map((p, i) => (
            <g key={p} stroke="rgb(255 255 255 / .14)" strokeWidth="0.6">
              <motion.line x1={p} y1="0" x2={p} y2="200" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + i * 0.08, duration: 0.8 }} />
              <motion.line x1="0" y1={p} x2="200" y2={p} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }} />
            </g>
          ))}
          <motion.circle cx="100" cy="100" r="80" fill="none" stroke="rgb(255 255 255 / .25)" strokeDasharray="3 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 1.2 }} />
          <motion.line x1="20" y1="180" x2="180" y2="20" stroke="rgb(255 214 10 / .5)" strokeWidth="0.8"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.9 }} />

          {/* the mark: outline draws, then fills */}
          <motion.path
            d="M100 30 A70 70 0 1 1 30 100 L100 100 Z"
            stroke="#FFD60A" strokeWidth="2.5"
            initial={{ pathLength: 0, fill: "rgba(255,214,10,0)" }}
            animate={{ pathLength: 1, fill: "rgba(255,214,10,1)" }}
            transition={{ pathLength: { delay: 1.3, duration: 1.4, ease: "easeInOut" }, fill: { delay: 2.6, duration: 0.6 } }}
          />
          <motion.rect
            x="38" y="38" width="48" height="48" rx="6" fill="#F4F1EA"
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            style={{ transformOrigin: "62px 62px" }}
            transition={{ delay: 2.9, type: "spring", stiffness: 200, damping: 14 }}
          />
        </svg>
        <div className="mt-4 flex font-display text-2xl font-bold tracking-[0.3em] sm:text-3xl">
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 3.3 + i * 0.09, duration: 0.5, ease: EASE_OUT }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </Panel>

      {/* Palette + type */}
      <div className="hidden flex-col gap-3 sm:flex sm:gap-4">
        <Panel delay={0.2} className="flex-1 p-3">
          <PanelLabel>Color system</PanelLabel>
          <div className="mt-3 space-y-1.5">
            {SWATCHES.map((s, i) => (
              <motion.div
                key={s.hex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + i * 0.12, duration: 0.5, ease: EASE_OUT }}
                className="flex items-center gap-2.5"
              >
                <motion.span
                  className="h-6 rounded-md border border-white/10"
                  style={{ background: s.hex }}
                  initial={{ width: 0 }}
                  animate={{ width: 56 }}
                  transition={{ delay: 1.9 + i * 0.12, duration: 0.6, ease: EASE_OUT }}
                />
                <span className="text-xs text-white/80">{s.name}</span>
                <span className="ml-auto font-mono text-[10px] text-muted">{s.hex}</span>
              </motion.div>
            ))}
          </div>
        </Panel>
        <Panel delay={0.35} className="p-3">
          <PanelLabel>Typeface</PanelLabel>
          <div className="mt-2 flex items-end justify-between">
            <motion.span
              className="font-display text-5xl font-bold leading-none"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0em" }}
              transition={{ delay: 4, duration: 1, ease: EASE_OUT }}
            >
              Aa
            </motion.span>
            <span className="text-right font-mono text-[10px] text-muted">Space Grotesk<br />500 · 700</span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
