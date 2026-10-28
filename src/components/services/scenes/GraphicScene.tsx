"use client";

import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { EASE_OUT, Panel, PanelLabel } from "./shared";

const LAYERS = ["Background", "Sun shape", "Headline", "Sticker", "CTA"];

// Cursor path (percent of artboard) — visits each element as it's placed
const CURSOR_X = ["10%", "62%", "18%", "74%", "24%", "86%"];
const CURSOR_Y = ["90%", "30%", "60%", "18%", "84%", "92%"];
const CURSOR_TIMES = [0, 0.18, 0.38, 0.56, 0.76, 1];

export default function GraphicScene() {
  return (
    <div className="absolute inset-0 grid gap-3 p-4 sm:grid-cols-[140px_1fr] sm:gap-4 sm:p-6">
      {/* Layers panel */}
      <Panel className="hidden flex-col p-3 sm:flex">
        <PanelLabel>Layers</PanelLabel>
        <ul className="mt-3 flex flex-col-reverse gap-1">
          {LAYERS.map((l, i) => (
            <motion.li
              key={l}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.75, duration: 0.4 }}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] text-white/70"
            >
              <span className="size-2.5 rounded-sm border border-white/30" />
              {l}
            </motion.li>
          ))}
        </ul>
        <div className="mt-auto space-y-2 border-t border-line pt-3">
          <PanelLabel>Export</PanelLabel>
          {["1080×1350 · IG", "1200×628 · Ads", "1080×1920 · Story"].map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.4 + i * 0.2 }}
              className="flex items-center justify-between font-mono text-[9px] text-muted"
            >
              {f} <span className="text-emerald-300">✓</span>
            </motion.div>
          ))}
        </div>
      </Panel>

      {/* Artboard */}
      <Panel delay={0.1} className="relative flex items-center justify-center overflow-hidden">
        <div className="absolute left-3 top-3"><PanelLabel>Artboard · Campaign post</PanelLabel></div>
        <div className="relative aspect-[4/5] h-[78%] overflow-hidden rounded-lg">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#1d1b3a] via-[#2a1840] to-[#0f0f14]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.div
            className="absolute -right-[15%] top-[8%] aspect-square w-[70%] rounded-full bg-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.05, type: "spring", stiffness: 140, damping: 12 }}
          />
          <motion.div
            className="absolute bottom-[30%] left-[8%] right-[8%] font-display text-[clamp(14px,2.6vw,30px)] font-bold leading-[0.95] tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6, ease: EASE_OUT }}
          >
            SUMMER<br />DROP &apos;26
          </motion.div>
          <motion.div
            className="absolute left-[10%] top-[10%] rounded-full bg-[#FF5D73] px-2.5 py-1 font-mono text-[9px] font-bold text-black"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ delay: 2.55, type: "spring", stiffness: 260, damping: 12 }}
          >
            NEW
          </motion.div>
          <motion.div
            className="absolute bottom-[10%] left-[8%] rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.4 }}
          >
            Shop now →
          </motion.div>
        </div>

        {/* Designer's cursor + selection box */}
        <motion.div
          className="pointer-events-none absolute z-10"
          initial={{ left: CURSOR_X[0], top: CURSOR_Y[0] }}
          animate={{ left: CURSOR_X, top: CURSOR_Y }}
          transition={{ duration: 4.4, times: CURSOR_TIMES, ease: "easeInOut", delay: 0.3 }}
        >
          <MousePointer2 className="size-5 fill-accent text-black drop-shadow" />
          <span className="ml-4 rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] font-semibold text-black">Designer</span>
        </motion.div>
      </Panel>
    </div>
  );
}
