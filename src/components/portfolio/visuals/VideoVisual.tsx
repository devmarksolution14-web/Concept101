"use client";

import { motion } from "framer-motion";
import { fluid, loop, type VisualProps } from "./shared";

const DURATION = 8;

/** An edit in progress: graded footage up top, caption burn-in, and a timeline with a moving playhead. */
export default function VideoVisual({ tagline, p, live }: VisualProps) {
  const words = tagline.split(" ");

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: p.bg, color: p.fg }}>
      {/* Footage */}
      <div className="relative flex-1 overflow-hidden" style={{ background: `linear-gradient(160deg, ${p.soft}, ${p.bg} 70%)` }}>
        {/* Skyline */}
        <div className="absolute inset-x-0 bottom-[22%] flex items-end gap-[1.5%] px-[4%] opacity-50">
          {[40, 65, 30, 80, 55, 70, 35, 60, 45, 75].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h * 0.35}cqh`, background: p.soft, filter: "brightness(1.3)" }} />
          ))}
        </div>
        {/* Road lines rushing past */}
        <div className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: p.bg }}>
          <motion.div
            className="absolute top-1/2 flex h-[6%] min-h-0.5 w-[200%] gap-[3%]"
            {...loop(live, { x: ["0%", "-50%"] }, { duration: 1.6, ease: "linear" })}
          >
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className="h-full flex-1 rounded-full opacity-60" style={{ background: p.fg }} />
            ))}
          </motion.div>
        </div>
        {/* Runner */}
        <motion.span
          className="absolute bottom-[18%] left-[42%] aspect-[1/2] h-[34%] rounded-full"
          style={{ background: p.accent, boxShadow: `0 10px 30px -8px ${p.accent}` }}
          {...loop(live, { y: ["0%", "-8%", "0%"], rotate: [-4, 4, -4] }, { duration: 0.5 })}
        />
        {/* Caption burn-in */}
        <div className="absolute inset-x-0 top-[12%] flex justify-center gap-[1.4cqw]">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              className="rounded px-[1cqw] font-display font-bold uppercase"
              style={{ background: p.bg, fontSize: fluid(10, 3.2, 28) }}
              {...loop(
                live,
                { opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 0] },
                { duration: DURATION, times: [0, 0.1 + i * 0.08, 0.16 + i * 0.08, 0.85, 0.92], ease: "easeOut" },
              )}
            >
              {w}
            </motion.span>
          ))}
        </div>
        <span className="absolute left-[3%] top-[5%] flex items-center gap-[0.8cqw] font-mono uppercase" style={{ fontSize: fluid(7, 1.4, 11) }}>
          <motion.span className="aspect-square w-[1.2cqw] min-w-1.5 rounded-full bg-red-500" {...loop(live, { opacity: [1, 0.2, 1] }, { duration: 1.2 })} />
          Rec · 4K
        </span>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-[1.2cqh] border-t px-[3%] py-[3%]" style={{ borderColor: `${p.fg}22`, background: "rgb(0 0 0 / .35)" }}>
        {[
          [18, 30, 22, 30],
          [40, 15, 45],
          [100],
        ].map((track, t) => (
          <div key={t} className="flex h-[clamp(5px,2.4cqw,16px)] gap-[1%]">
            {track.map((w, i) => (
              <span
                key={i}
                className="h-full rounded-[0.5cqw]"
                style={{ width: `${w}%`, background: t === 0 ? (i % 2 ? p.soft : p.accent) : t === 1 ? `${p.fg}55` : `${p.accent}44` }}
              />
            ))}
          </div>
        ))}
        <motion.span
          className="absolute inset-y-[12%] w-0.5"
          style={{ background: p.fg }}
          {...loop(live, { left: ["3%", "97%"] }, { duration: DURATION, ease: "linear" })}
        />
      </div>
    </div>
  );
}
