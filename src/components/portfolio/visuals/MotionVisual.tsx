"use client";

import { motion } from "framer-motion";
import { fluid, loop, type VisualProps } from "./shared";

const BARS = [0.4, 0.75, 0.55, 1, 0.65, 0.85, 0.45, 0.7, 0.5];

/** A logo mark breathing to a waveform, with its easing curve plotted alongside. */
export default function MotionVisual({ tagline, p, live }: VisualProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6cqh] overflow-hidden" style={{ background: p.bg, color: p.fg }}>
      {/* Orbit */}
      <div className="relative grid aspect-square h-[46%] place-items-center">
        <motion.div className="absolute inset-0" {...loop(live, { rotate: [0, 360] }, { duration: 8, ease: "linear" })}>
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 aspect-square w-[7%] rounded-full"
              style={{ background: p.fg, opacity: 0.5, transform: `rotate(${deg}deg) translateY(-650%)` }}
            />
          ))}
        </motion.div>
        <svg viewBox="0 0 100 100" className="absolute inset-0 opacity-20">
          <circle cx="50" cy="50" r="46" fill="none" stroke={p.fg} strokeWidth="0.5" strokeDasharray="2 3" />
        </svg>
        <motion.span
          className="aspect-square w-[52%]"
          style={{ background: p.accent, boxShadow: `0 12px 40px -10px ${p.accent}` }}
          {...loop(
            live,
            { borderRadius: ["18%", "50%", "50%", "30%", "18%"], rotate: [0, 90, 180, 270, 360], scale: [1, 0.82, 1.08, 0.92, 1] },
            { duration: 4, ease: [0.65, 0, 0.35, 1] },
          )}
        />
      </div>

      <div className="flex flex-col items-center gap-[2cqh]">
        <span className="font-display font-bold tracking-tight" style={{ fontSize: fluid(14, 5, 40) }}>
          {tagline}
        </span>
        {/* Waveform */}
        <div className="flex h-[clamp(14px,6cqw,44px)] items-center gap-[clamp(2px,0.8cqw,6px)]">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="h-full w-[clamp(2px,0.9cqw,6px)] rounded-full"
              style={{ background: i % 3 === 1 ? p.accent : p.fg }}
              {...loop(live, { scaleY: [h * 0.4, h, h * 0.5, h * 0.9, h * 0.4] }, { duration: 1.4, delay: i * 0.08 })}
            />
          ))}
        </div>
      </div>

      {/* Easing curve, like a graph editor */}
      <svg viewBox="0 0 60 40" className="absolute right-[4%] top-[5%] w-[22%] max-w-40 opacity-70">
        <rect x="0.5" y="0.5" width="59" height="39" rx="3" fill="none" stroke={p.fg} strokeOpacity="0.25" />
        <path d="M6 34 C 30 34, 30 6, 54 6" fill="none" stroke={p.accent} strokeWidth="1.6" strokeLinecap="round" />
        <motion.circle r="2" fill={p.fg} {...loop(live, { cx: [6, 30, 54, 54, 6], cy: [34, 20, 6, 6, 34] }, { duration: 4, ease: [0.65, 0, 0.35, 1] })} />
      </svg>
    </div>
  );
}
