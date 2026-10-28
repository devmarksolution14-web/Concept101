"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Counter, EASE_OUT, Panel, PanelLabel } from "./shared";

const BARS = [22, 30, 26, 38, 34, 46, 52, 48, 62, 70, 78, 92];
const KPIS = [
  { label: "Reach", to: 2.4, decimals: 1, suffix: "M", delta: "+184%" },
  { label: "CTR", to: 6.8, decimals: 1, suffix: "%", delta: "+2.1pt" },
  { label: "ROAS", to: 4.2, decimals: 1, suffix: "x", delta: "+63%" },
];

export default function MarketingScene() {
  // Line overlay built from the bar heights
  const points = BARS.map((h, i) => `${(i / (BARS.length - 1)) * 100},${100 - h}`).join(" ");

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {KPIS.map((k, i) => (
          <Panel key={k.label} delay={0.1 + i * 0.12} className="p-2.5 sm:p-3">
            <PanelLabel>{k.label}</PanelLabel>
            <div className="mt-1 font-display text-xl font-bold sm:text-3xl">
              <Counter to={k.to} decimals={k.decimals} suffix={k.suffix} delay={0.4 + i * 0.15} duration={2.2} />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 + i * 0.1 }}
              className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300 sm:text-[10px]"
            >
              <TrendingUp className="size-3" /> {k.delta}
            </motion.div>
          </Panel>
        ))}
      </div>

      <Panel delay={0.3} className="relative flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <PanelLabel>Revenue from campaigns · 12 weeks</PanelLabel>
          <span className="hidden font-mono text-[10px] text-muted sm:block">Meta · Google · Email</span>
        </div>
        <div className="relative mt-3 flex-1">
          <div className="absolute inset-0 flex items-end gap-[3%]">
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                className={`flex-1 origin-bottom rounded-t-md ${i === BARS.length - 1 ? "bg-accent" : "bg-white/15"}`}
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.6 + i * 0.09, duration: 0.7, ease: EASE_OUT }}
              />
            ))}
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            <motion.polyline
              points={points}
              fill="none"
              stroke="#FFD60A"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Toast */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3.9, type: "spring", stiffness: 260, damping: 20 }}
          className="absolute right-3 top-9 flex items-center gap-2 rounded-lg border border-accent/30 bg-black/85 px-3 py-2 text-xs backdrop-blur sm:right-4"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          New campaign record: <span className="font-semibold text-accent">+$48.2k</span>
        </motion.div>
      </Panel>
    </div>
  );
}
