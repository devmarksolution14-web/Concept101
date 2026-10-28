"use client";

import { motion } from "framer-motion";
import { Bot, Database, Mail, MessageSquareText, Table2, type LucideIcon } from "lucide-react";
import { fluid, loop, type VisualProps } from "./shared";

type Node = { x: number; y: number; label: string; icon: LucideIcon };

const AGENT = { x: 50, y: 50 };
const OUTPUTS: Node[] = [
  { x: 84, y: 20, label: "CRM", icon: Database },
  { x: 84, y: 50, label: "Rates", icon: Table2 },
  { x: 84, y: 80, label: "Reply", icon: Mail },
];
const CYCLE = 3.2;

/** An automation run: a request comes in, the agent fans work out to the connected tools. */
export default function AiVisual({ tagline, p, live }: VisualProps) {
  const trigger: Node = { x: 16, y: 50, label: tagline, icon: MessageSquareText };

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.bg, color: p.fg }}>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {[trigger, ...OUTPUTS].map((n) => (
          <line
            key={n.label}
            x1={n === trigger ? n.x : AGENT.x}
            y1={n === trigger ? n.y : AGENT.y}
            x2={n === trigger ? AGENT.x : n.x}
            y2={n === trigger ? AGENT.y : n.y}
            stroke={p.fg}
            strokeOpacity="0.2"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Packet: trigger → agent */}
      <Packet live={live} color={p.accent} from={trigger} to={AGENT} delay={0} />
      {/* Packets: agent → each tool */}
      {OUTPUTS.map((n, i) => (
        <Packet key={n.label} live={live} color={p.accent} from={AGENT} to={n} delay={0.45 + i * 0.12} />
      ))}

      <NodeChip node={trigger} p={p} />
      {OUTPUTS.map((n, i) => (
        <NodeChip key={n.label} node={n} p={p} live={live} delay={0.85 + i * 0.12} />
      ))}

      {/* Agent */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${AGENT.x}%`, top: `${AGENT.y}%` }}>
        <motion.span
          className="absolute inset-0 rounded-[28%]"
          style={{ background: p.accent }}
          {...loop(live, { scale: [1, 1.6], opacity: [0.45, 0] }, { duration: CYCLE / 2, ease: "easeOut" })}
        />
        <span
          className="relative grid aspect-square w-[clamp(34px,11cqw,84px)] place-items-center rounded-[28%]"
          style={{ background: p.accent, color: p.bg, boxShadow: `0 10px 30px -8px ${p.accent}` }}
        >
          <Bot className="size-1/2" />
        </span>
        <span className="absolute left-1/2 top-full mt-[1.2cqw] -translate-x-1/2 whitespace-nowrap font-mono uppercase tracking-wider opacity-60" style={{ fontSize: fluid(6, 1.4, 11) }}>
          AI agent
        </span>
      </div>
    </div>
  );
}

function Packet({ live, color, from, to, delay }: { live: boolean; color: string; from: { x: number; y: number }; to: { x: number; y: number }; delay: number }) {
  if (!live) return null;
  return (
    <motion.span
      aria-hidden
      className="absolute aspect-square w-[clamp(5px,1.4cqw,10px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
      initial={{ left: `${from.x}%`, top: `${from.y}%`, opacity: 0 }}
      animate={{ left: [`${from.x}%`, `${to.x}%`], top: [`${from.y}%`, `${to.y}%`], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.5, delay, repeat: Infinity, repeatDelay: CYCLE - 0.5, ease: "easeInOut" }}
    />
  );
}

function NodeChip({ node, p, live = false, delay = 0 }: { node: Node; p: VisualProps["p"]; live?: boolean; delay?: number }) {
  const Icon = node.icon;
  return (
    <motion.div
      className="absolute flex max-w-[30%] -translate-x-1/2 -translate-y-1/2 items-center gap-[1cqw] rounded-[1.4cqw] border px-[1.6cqw] py-[1.2cqw]"
      style={{ left: `${node.x}%`, top: `${node.y}%`, background: p.soft, borderColor: `${p.fg}22` }}
      animate={live ? { borderColor: [`${p.fg}22`, p.accent, `${p.fg}22`] } : undefined}
      transition={live ? { duration: 0.6, delay, repeat: Infinity, repeatDelay: CYCLE - 0.6 } : undefined}
    >
      <Icon className="size-[clamp(9px,2.2cqw,18px)] shrink-0" style={{ color: p.accent }} />
      <span className="truncate font-medium" style={{ fontSize: fluid(7, 1.8, 14) }}>
        {node.label}
      </span>
    </motion.div>
  );
}
