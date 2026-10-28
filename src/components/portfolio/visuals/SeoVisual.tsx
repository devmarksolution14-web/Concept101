"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { fluid, loop, type VisualProps } from "./shared";

const ROW = 24; // % of list height per result slot
const COMPETITORS = ["bigmarket.com", "plantsdirect.co", "gardenhub.net"];

/** A results page where the client climbs from fourth to first. */
export default function SeoVisual({ client, tagline, p, live }: VisualProps) {
  const timing = { duration: 7, times: [0, 0.25, 0.55, 0.9, 1] };

  return (
    <div className="absolute inset-0 flex flex-col gap-[5%] overflow-hidden p-[6%]" style={{ background: p.bg, color: p.fg }}>
      {/* Search bar */}
      <div className="flex items-center gap-[2%] rounded-full border px-[3%] py-[2%]" style={{ borderColor: `${p.fg}33`, background: p.soft }}>
        <Search className="size-[clamp(10px,2.2cqw,18px)] shrink-0 opacity-60" />
        <motion.span
          className="overflow-hidden whitespace-nowrap"
          style={{ fontSize: fluid(9, 2.2, 17) }}
          {...loop(live, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }, timing)}
        >
          {tagline}
        </motion.span>
      </div>

      {/* Results */}
      <div className="relative flex-1">
        {COMPETITORS.map((site, i) => (
          <motion.div
            key={site}
            className="absolute inset-x-0 flex flex-col justify-center gap-[0.8cqw] rounded-[1.2cqw] px-[3%]"
            style={{ height: `${ROW - 4}%` }}
            {...loop(live, { top: [`${i * ROW}%`, `${i * ROW}%`, `${(i + 1) * ROW}%`, `${(i + 1) * ROW}%`, `${i * ROW}%`] }, timing)}
          >
            <span className="font-mono opacity-50" style={{ fontSize: fluid(7, 1.5, 12) }}>{site}</span>
            <span className="h-[1cqw] min-h-0.5 w-[70%] rounded-full opacity-30" style={{ background: p.fg }} />
          </motion.div>
        ))}

        <motion.div
          className="absolute inset-x-0 flex items-center gap-[3%] rounded-[1.2cqw] border px-[3%]"
          style={{ height: `${ROW - 4}%`, borderColor: p.accent, background: `${p.accent}1f` }}
          {...loop(live, { top: [`${3 * ROW}%`, `${3 * ROW}%`, "0%", "0%", `${3 * ROW}%`] }, timing)}
        >
          <motion.span
            className="grid aspect-square w-[clamp(18px,5cqw,40px)] shrink-0 place-items-center rounded-full font-display font-bold"
            style={{ background: p.accent, color: p.bg, fontSize: fluid(8, 2, 16) }}
            {...loop(live, { scale: [1, 1, 1.2, 1, 1] }, timing)}
          >
            1
          </motion.span>
          <div className="flex min-w-0 flex-col gap-[0.6cqw]">
            <span className="truncate font-display font-semibold" style={{ fontSize: fluid(9, 2.4, 18) }}>
              {client}
            </span>
            <span className="truncate font-mono opacity-60" style={{ fontSize: fluid(7, 1.5, 12) }}>
              {client.toLowerCase().replace(/\s+/g, "")}.com
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
