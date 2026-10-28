"use client";

import { motion } from "framer-motion";
import { fluid, loop, type VisualProps } from "./shared";

/** Logo mark paths per project, drawn on a 100×100 construction grid. */
const MARKS: Record<string, string[]> = {
  "northpeak-coffee": ["M10 78 L40 30 L56 54 L66 40 L90 78 Z", "M33 41 L40 30 L47 41"],
  "nova-skin": [
    "M50 8 L58 42 L92 50 L58 58 L50 92 L42 58 L8 50 L42 42 Z",
    "M50 30 L54 46 L70 50 L54 54 L50 70 L46 54 L30 50 L46 46 Z",
  ],
};

/** A brand guideline page: construction grid, the mark drawing itself, wordmark and swatches. */
export default function BrandVisual({ id, tagline, p, live }: VisualProps) {
  const paths = MARKS[id] ?? MARKS["northpeak-coffee"];
  const swatches = [p.accent, p.fg, p.soft, p.bg];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5cqh] overflow-hidden px-[8%]" style={{ background: p.bg, color: p.fg }}>
      {/* Construction guides */}
      <svg aria-hidden viewBox="0 0 100 100" className="absolute left-1/2 top-[40%] aspect-square h-[78%] -translate-x-1/2 -translate-y-1/2 opacity-25">
        <circle cx="50" cy="50" r="46" fill="none" stroke={p.fg} strokeWidth="0.3" strokeDasharray="1 1.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={p.fg} strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke={p.fg} strokeWidth="0.3" />
        <line x1="50" y1="0" x2="50" y2="100" stroke={p.fg} strokeWidth="0.3" />
      </svg>

      <svg viewBox="0 0 100 100" className="relative aspect-square h-[42%] min-h-16">
        {paths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill={i === 0 ? p.accent : "none"}
            stroke={i === 0 ? p.accent : p.bg}
            strokeWidth={i === 0 ? 1.5 : 3}
            strokeLinejoin="round"
            {...loop(
              live,
              { pathLength: [1, 0, 1, 1, 1], fillOpacity: [1, 0, 0, 1, 1] },
              { duration: 7, times: [0, 0.05, 0.4, 0.55, 1], ease: "easeInOut", delay: i * 0.3 },
            )}
          />
        ))}
      </svg>

      <motion.span
        className="relative font-display font-bold uppercase"
        style={{ fontSize: fluid(16, 7, 54) }}
        {...loop(live, { letterSpacing: ["0.06em", "0.22em", "0.22em", "0.06em"], opacity: [1, 0.85, 1, 1] }, { duration: 7, times: [0, 0.4, 0.7, 1] })}
      >
        {tagline}
      </motion.span>

      <div className="relative flex gap-[2cqw]">
        {swatches.map((c, i) => (
          <motion.span
            key={c + i}
            className="aspect-square w-[clamp(14px,7cqw,52px)] rounded-full border"
            style={{ background: c, borderColor: `${p.fg}33` }}
            {...loop(live, { y: [0, -6, 0, 0] }, { duration: 7, times: [0, 0.08, 0.16, 1], delay: 2.8 + i * 0.12 })}
          />
        ))}
      </div>

      {/* Specimen in the corner */}
      <span className="absolute bottom-[4%] right-[5%] font-display font-semibold opacity-30" style={{ fontSize: fluid(12, 5, 40) }}>
        Aa
      </span>
      <span className="absolute left-[5%] top-[4%] font-mono uppercase tracking-[0.2em] opacity-40" style={{ fontSize: fluid(7, 1.6, 12) }}>
        Brand guidelines · v1
      </span>
    </div>
  );
}
