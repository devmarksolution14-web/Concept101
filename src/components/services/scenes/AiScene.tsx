"use client";

import { motion } from "framer-motion";
import { Bot, Database, Mail, MessageSquare, Zap, type LucideIcon } from "lucide-react";
import { Counter, Panel, PanelLabel } from "./shared";

type Node = { id: string; label: string; sub: string; icon: LucideIcon; x: number; y: number; ai?: boolean };

// Positions are percentages of the canvas
const NODES: Node[] = [
  { id: "trigger", label: "New lead", sub: "Website form", icon: Zap, x: 12, y: 50 },
  { id: "ai", label: "AI Agent", sub: "Qualify & score", icon: Bot, x: 45, y: 50, ai: true },
  { id: "crm", label: "CRM", sub: "Create deal", icon: Database, x: 82, y: 18 },
  { id: "slack", label: "Slack", sub: "Notify sales", icon: MessageSquare, x: 82, y: 50 },
  { id: "email", label: "Email", sub: "Personal reply", icon: Mail, x: 82, y: 82 },
];

const EDGES: [string, string, number][] = [
  ["trigger", "ai", 0.6],
  ["ai", "crm", 1.6],
  ["ai", "slack", 1.8],
  ["ai", "email", 2.0],
];

const LOG = [
  { t: "0.2s", m: "Lead captured from website form" },
  { t: "1.1s", m: "AI scored lead 92/100 · high intent" },
  { t: "1.6s", m: "Deal created in CRM" },
  { t: "1.8s", m: "#sales notified on Slack" },
  { t: "2.4s", m: "Personalised email drafted & sent" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export default function AiScene() {
  return (
    <div className="absolute inset-0 grid gap-3 p-4 sm:grid-cols-[1.6fr_1fr] sm:gap-4 sm:p-6">
      {/* Workflow canvas */}
      <Panel className="relative overflow-hidden">
        <div className="absolute left-3 top-3 z-10"><PanelLabel>Workflow · Lead → Revenue</PanelLabel></div>

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {EDGES.map(([a, b, delay]) => {
            const A = byId(a), B = byId(b);
            const d = `M${A.x} ${A.y} C ${(A.x + B.x) / 2} ${A.y}, ${(A.x + B.x) / 2} ${B.y}, ${B.x} ${B.y}`;
            return (
              <g key={a + b}>
                <motion.path
                  d={d} fill="none" stroke="rgb(255 255 255 / .18)" strokeWidth="0.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay - 0.4, duration: 0.6 }}
                />
                {/* data flowing along the edge */}
                <motion.path
                  d={d} fill="none" stroke="#FFD60A" strokeWidth="0.8" strokeLinecap="round"
                  initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: [0, 0.88], opacity: [0, 1, 1, 0] }}
                  transition={{ delay, duration: 1.1, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
                />
              </g>
            );
          })}
        </svg>

        {NODES.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 240, damping: 18 }}
            >
              <div
                className={`relative flex items-center gap-2 rounded-xl border px-2 py-1.5 backdrop-blur sm:px-2.5 sm:py-2 ${
                  n.ai ? "border-accent/60 bg-accent/15" : "border-white/15 bg-black/70"
                }`}
              >
                {n.ai && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border border-accent"
                    animate={{ opacity: [0.8, 0], scale: [1, 1.35] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className={`grid size-6 place-items-center rounded-lg ${n.ai ? "bg-accent text-black" : "bg-white/10 text-white"}`}>
                  <Icon className="size-3.5" />
                </span>
                <div className="hidden leading-tight sm:block">
                  <div className="text-[11px] font-semibold">{n.label}</div>
                  <div className="text-[9px] text-muted">{n.sub}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Panel>

      {/* Run log */}
      <div className="hidden flex-col gap-3 sm:flex sm:gap-4">
        <Panel delay={0.2} className="flex-1 p-3">
          <div className="flex items-center justify-between">
            <PanelLabel>Run log</PanelLabel>
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-300">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> running
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {LOG.map((l, i) => (
              <motion.li
                key={l.m}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.55, duration: 0.35 }}
                className="flex gap-2 font-mono text-[10px] leading-snug"
              >
                <span className="text-emerald-300">✓</span>
                <span className="text-white/80">{l.m}</span>
                <span className="ml-auto text-white/30">{l.t}</span>
              </motion.li>
            ))}
          </ul>
        </Panel>
        <Panel delay={0.35} className="p-3">
          <PanelLabel>Hours saved this month</PanelLabel>
          <div className="mt-1 font-display text-4xl font-bold text-accent">
            <Counter to={186} delay={0.6} duration={3.5} />h
          </div>
        </Panel>
      </div>
    </div>
  );
}
