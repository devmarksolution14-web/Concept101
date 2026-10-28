"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { fluid, loop, type VisualProps } from "./shared";

const LINE = "M0 82 C 12 80, 18 70, 28 68 S 44 60, 52 50 S 70 30, 78 26 S 92 12, 100 8";

/** Ad creatives rotating through a test while the results curve climbs. */
export default function CampaignVisual({ client, tagline, p, live }: VisualProps) {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.9fr_1.1fr] items-center gap-[4%] overflow-hidden p-[6%]" style={{ background: p.bg, color: p.fg }}>
      {/* Ad stack */}
      <div className="relative mx-auto aspect-[9/14] h-[88%] max-h-full">
        {[2, 1, 0].map((k) => (
          <motion.div
            key={k}
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2.2cqw] border p-[7%]"
            style={{
              background: k === 0 ? p.accent : p.soft,
              color: k === 0 ? p.bg : p.fg,
              borderColor: `${p.fg}22`,
              zIndex: 3 - k,
            }}
            {...loop(
              live,
              { rotate: [k * -6, k * -6 - 2, k * -6], x: [`${k * -10}%`, `${k * -12}%`, `${k * -10}%`] },
              { duration: 5, delay: k * 0.2 },
            )}
          >
            <span className="font-mono uppercase tracking-wider opacity-70" style={{ fontSize: fluid(6, 1.4, 11) }}>
              Sponsored · {client}
            </span>
            <span className="font-display font-bold leading-[0.95] [text-wrap:balance]" style={{ fontSize: fluid(11, 3.6, 30) }}>
              {tagline}
            </span>
            <span className="w-fit rounded-full px-[8%] py-[3%] font-semibold" style={{ background: k === 0 ? p.bg : p.accent, color: k === 0 ? p.fg : p.bg, fontSize: fluid(6, 1.5, 12) }}>
              Get the card
            </span>
          </motion.div>
        ))}
      </div>

      {/* Results chart */}
      <div className="flex h-full flex-col justify-center gap-[6%]">
        <div className="flex items-baseline justify-between">
          <span className="font-mono uppercase tracking-wider opacity-60" style={{ fontSize: fluid(7, 1.5, 12) }}>Signups · launch week</span>
          <motion.span
            className="flex items-center gap-1 rounded-full px-[3%] py-[1%] font-mono font-semibold"
            style={{ background: `${p.accent}33`, color: p.accent, fontSize: fluid(7, 1.5, 12) }}
            {...loop(live, { opacity: [0, 0, 1, 1, 0] }, { duration: 6, times: [0, 0.45, 0.55, 0.9, 1] })}
          >
            <TrendingUp className="size-[1.2em]" /> 4.2× ROAS
          </motion.span>
        </div>
        <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="h-[62%] w-full overflow-visible">
          {[22, 45, 68].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke={p.fg} strokeOpacity="0.1" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          ))}
          <motion.path
            d={`${LINE} L100 90 L0 90 Z`}
            fill={p.accent}
            {...loop(live, { fillOpacity: [0, 0, 0.18, 0.18, 0] }, { duration: 6, times: [0, 0.2, 0.55, 0.9, 1] })}
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke={p.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...loop(live, { pathLength: [0, 1, 1, 0] }, { duration: 6, times: [0, 0.5, 0.9, 1] })}
          />
        </svg>
        <div className="grid grid-cols-7 items-end gap-[4%]">
          {[30, 45, 38, 60, 72, 85, 100].map((h, i) => (
            <motion.span
              key={i}
              className="origin-bottom rounded-t-[0.6cqw]"
              style={{ background: i === 6 ? p.accent : p.soft, height: `${h * 0.06}cqw` }}
              {...loop(live, { scaleY: [0.3, 1, 1, 0.3] }, { duration: 6, times: [0, 0.4, 0.9, 1], delay: i * 0.05 })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
