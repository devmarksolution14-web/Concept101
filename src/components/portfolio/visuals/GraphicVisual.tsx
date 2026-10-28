"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Palette } from "../data";
import { fluid, loop, type VisualProps } from "./shared";

/** A 3×3 social feed built from one template system, with a selection frame touring the grid. */
export default function GraphicVisual({ tagline, p, live }: VisualProps) {
  // Selection frame visits these cells (col, row) in turn
  const path = [[0, 0], [1, 1], [2, 0], [1, 2], [0, 0]];

  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden" style={{ background: p.bg, color: p.fg }}>
      <div className="relative grid aspect-square h-[86%] max-w-[86%] grid-cols-3 gap-[3%]">
        {Array.from({ length: 9 }, (_, i) => (
          <Post key={i} index={i} p={p} tagline={tagline} />
        ))}

        <motion.span
          aria-hidden
          className="pointer-events-none absolute aspect-square w-[31.3%] rounded-[0.8cqw] border-2"
          style={{ borderColor: p.accent, boxShadow: `0 6px 24px -6px ${p.accent}88` }}
          {...loop(
            live,
            { left: path.map(([c]) => `${c * 34.35}%`), top: path.map(([, r]) => `${r * 34.35}%`) },
            { duration: 8, ease: [0.65, 0, 0.35, 1] },
          )}
        >
          {[["-top-1", "-left-1"], ["-top-1", "-right-1"], ["-bottom-1", "-left-1"], ["-bottom-1", "-right-1"]].map(([y, x]) => (
            <span key={y + x} className={`absolute ${y} ${x} size-2 rounded-sm border bg-white`} style={{ borderColor: p.accent }} />
          ))}
        </motion.span>
      </div>
    </div>
  );
}

function Post({ index, p, tagline }: { index: number; p: Palette; tagline: string }) {
  const base = "relative overflow-hidden rounded-[0.8cqw]";
  switch (index % 4) {
    case 0:
      return (
        <div className={`${base} flex items-end p-[8%]`} style={{ background: p.accent, color: p.bg }}>
          <span className="font-display font-bold leading-none" style={{ fontSize: fluid(8, 2.4, 20) }}>
            {index === 4 ? tagline : "New in"}
          </span>
        </div>
      );
    case 1:
      return (
        <div className={base} style={{ background: p.soft }}>
          <span className="absolute -bottom-[25%] -right-[25%] aspect-square w-[85%] rounded-full" style={{ background: p.accent }} />
          <Heart className="absolute left-[10%] top-[10%] size-[clamp(8px,2cqw,16px)] fill-current" style={{ color: p.fg }} />
        </div>
      );
    case 2:
      return (
        <div className={base} style={{ background: `repeating-linear-gradient(135deg, ${p.soft} 0 8%, ${p.bg} 8% 16%)` }}>
          <span className="absolute inset-[22%] rounded-full" style={{ background: p.fg }} />
        </div>
      );
    default:
      return (
        <div className={`${base} flex flex-col justify-between p-[8%]`} style={{ background: p.fg, color: p.bg }}>
          <span className="font-mono uppercase" style={{ fontSize: fluid(6, 1.2, 10) }}>Drop 0{index}</span>
          <span className="h-[18%] w-[60%] rounded-sm" style={{ background: p.accent }} />
        </div>
      );
  }
}
