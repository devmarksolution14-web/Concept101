"use client";

import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { fluid, loop, type VisualProps } from "./shared";

/** A client landing page that scrolls itself, with a cursor heading for the CTA. */
export default function SiteVisual({ client, tagline, p, live }: VisualProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.bg, color: p.fg }}>
      <motion.div
        className="absolute inset-x-[7%] top-[7%] flex flex-col gap-[5cqw]"
        {...loop(live, { y: ["0%", "0%", "-42%", "-42%", "0%"] }, { duration: 10, times: [0, 0.18, 0.5, 0.78, 1] })}
      >
        {/* Nav */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[1.2cqw] font-display font-semibold" style={{ fontSize: fluid(9, 2.6, 18) }}>
            <span className="aspect-square w-[2.4cqw] rounded-full" style={{ background: p.accent }} />
            {client}
          </span>
          <span className="flex gap-[2cqw]">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-[0.7cqw] min-h-0.5 w-[5cqw] rounded-full opacity-40" style={{ background: p.fg }} />
            ))}
          </span>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-[1.1fr_1fr] items-center gap-[4cqw]">
          <div className="flex flex-col gap-[2cqw]">
            <span className="font-display font-bold leading-[0.95] tracking-tight [text-wrap:balance]" style={{ fontSize: fluid(16, 6.4, 56) }}>
              {tagline}
            </span>
            <span className="h-[0.9cqw] min-h-0.5 w-[80%] rounded-full opacity-35" style={{ background: p.fg }} />
            <span className="h-[0.9cqw] min-h-0.5 w-[60%] rounded-full opacity-35" style={{ background: p.fg }} />
            <span
              className="mt-[1cqw] w-fit rounded-full px-[2.6cqw] py-[1.1cqw] font-semibold"
              style={{ background: p.accent, color: p.bg, fontSize: fluid(8, 2.1, 15) }}
            >
              Get started
            </span>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2cqw]" style={{ background: p.soft }}>
            <motion.span
              className="absolute -right-[20%] -top-[10%] aspect-square w-[85%] rounded-full opacity-80"
              style={{ background: p.accent }}
              {...loop(live, { scale: [1, 1.08, 1] }, { duration: 6 })}
            />
            <span className="absolute bottom-[10%] left-[10%] aspect-square w-[38%] rounded-[1.5cqw] opacity-70" style={{ background: p.fg }} />
          </div>
        </div>

        {/* Feature row */}
        <div className="grid grid-cols-3 gap-[2.5cqw]">
          {[0, 1, 2].map((k) => (
            <div key={k} className="flex flex-col gap-[1.4cqw] rounded-[1.6cqw] p-[2.4cqw]" style={{ background: p.soft }}>
              <span className="aspect-square w-[4cqw] rounded-[0.8cqw]" style={{ background: p.accent }} />
              <span className="h-[0.8cqw] min-h-0.5 w-3/4 rounded-full opacity-60" style={{ background: p.fg }} />
              <span className="h-[0.8cqw] min-h-0.5 w-1/2 rounded-full opacity-30" style={{ background: p.fg }} />
            </div>
          ))}
        </div>

        {/* Testimonial band */}
        <div className="flex items-center gap-[3cqw] rounded-[1.6cqw] border p-[3cqw]" style={{ borderColor: p.soft }}>
          <span className="aspect-square w-[8cqw] shrink-0 rounded-full" style={{ background: p.soft }} />
          <div className="flex flex-1 flex-col gap-[1.4cqw]">
            <span className="h-[1cqw] min-h-0.5 w-full rounded-full opacity-50" style={{ background: p.fg }} />
            <span className="h-[1cqw] min-h-0.5 w-2/3 rounded-full opacity-30" style={{ background: p.fg }} />
          </div>
        </div>
      </motion.div>

      {/* Visitor cursor */}
      <motion.span
        className="absolute"
        style={{ color: p.fg }}
        {...loop(
          live,
          { left: ["70%", "20%", "20%", "60%", "70%"], top: ["80%", "52%", "52%", "30%", "80%"], scale: [1, 1, 0.8, 1, 1] },
          { duration: 10, times: [0, 0.12, 0.16, 0.6, 1] },
        )}
      >
        <MousePointer2 className="size-[clamp(12px,3.4cqw,24px)] fill-current drop-shadow-[0_2px_6px_rgba(0,0,0,.5)]" />
      </motion.span>
    </div>
  );
}
