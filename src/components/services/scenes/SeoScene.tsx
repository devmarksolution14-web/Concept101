"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_OUT, Panel, PanelLabel } from "./shared";

const QUERY = "best digital agency near me";

type Result = { id: string; title: string; url: string; ours?: boolean };

const START: Result[] = [
  { id: "a", title: "Top 10 Agencies Ranked for 2026", url: "listicle.com" },
  { id: "b", title: "Digital Agency Directory", url: "directory.io" },
  { id: "c", title: "Pixelforge — Creative Studio", url: "pixelforge.co" },
  { id: "d", title: "Northside Media Group", url: "northside.media" },
  { id: "us", title: "Your Brand — Web, Design & Growth", url: "yourbrand.com", ours: true },
];

export default function SeoScene() {
  const [typed, setTyped] = useState(0);
  const [results, setResults] = useState(START);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= QUERY.length; i++) {
      timers.push(setTimeout(() => setTyped(i), 300 + i * 45));
    }
    // Climb the rankings one step at a time
    const climb = (fromIndex: number, at: number) =>
      timers.push(
        setTimeout(() => {
          setResults((prev) => {
            const next = [...prev];
            const i = next.findIndex((r) => r.ours);
            if (i > 0 && i === fromIndex) [next[i - 1], next[i]] = [next[i], next[i - 1]];
            return next;
          });
        }, at),
      );
    climb(4, 2600);
    climb(3, 3300);
    climb(2, 3900);
    climb(1, 4500);
    return () => timers.forEach(clearTimeout);
  }, []);

  const rank = results.findIndex((r) => r.ours) + 1;

  return (
    <div className="absolute inset-0 grid gap-3 p-4 sm:grid-cols-[1.5fr_1fr] sm:gap-4 sm:p-6">
      <Panel className="flex flex-col overflow-hidden p-3 sm:p-4">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2">
          <Search className="size-3.5 text-muted" />
          <span className="text-xs text-white/90 sm:text-sm">
            {QUERY.slice(0, typed)}
            <motion.span
              className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-accent"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </span>
        </div>
        <LayoutGroup>
          <motion.ol
            className="mt-3 flex flex-1 flex-col gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {results.map((r, i) => (
              <motion.li
                key={r.id}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`flex items-center gap-3 rounded-lg px-2.5 py-1.5 ${
                  r.ours ? "border border-accent/50 bg-accent/10 shadow-[0_0_24px_-6px_rgba(255,214,10,.5)]" : "border border-transparent"
                }`}
              >
                <span className={`w-4 font-mono text-[10px] ${r.ours ? "text-accent" : "text-white/30"}`}>{i + 1}</span>
                <div className="min-w-0">
                  <div className="truncate font-mono text-[9px] text-emerald-300/80">{r.url}</div>
                  <div className={`truncate text-xs sm:text-[13px] ${r.ours ? "font-semibold text-accent" : "text-sky-300/90"}`}>{r.title}</div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </LayoutGroup>
      </Panel>

      <div className="hidden flex-col gap-3 sm:flex sm:gap-4">
        <Panel delay={0.2} className="flex flex-1 flex-col items-center justify-center p-3">
          <PanelLabel>Google position</PanelLabel>
          <motion.div
            key={rank}
            initial={{ y: 16, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className={`mt-1 font-display text-7xl font-bold leading-none ${rank === 1 ? "text-accent" : "text-white"}`}
          >
            #{rank}
          </motion.div>
          <div className="mt-2 font-mono text-[10px] text-muted">from #47 in 90 days</div>
        </Panel>
        <Panel delay={0.35} className="p-3">
          <PanelLabel>Organic traffic</PanelLabel>
          <svg viewBox="0 0 100 40" className="mt-2 h-12 w-full overflow-visible">
            <motion.path
              d="M0 36 C 15 35, 25 33, 35 30 S 55 24, 65 18 S 85 6, 100 3"
              fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 2.4, duration: 2.4, ease: "easeInOut" }}
            />
          </svg>
          <div className="font-mono text-[10px] text-emerald-300">+312% sessions</div>
        </Panel>
      </div>
    </div>
  );
}
