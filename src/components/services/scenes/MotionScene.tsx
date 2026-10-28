"use client";

import { motion } from "framer-motion";
import { Panel, PanelLabel } from "./shared";

const LOOP = 3.2;
const KEYFRAMES = [0, 0.33, 0.66, 1];

export default function MotionScene() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-6">
      {/* Stage */}
      <Panel className="relative flex-1 overflow-hidden">
        <div className="absolute left-3 top-3"><PanelLabel>Stage · Explainer intro</PanelLabel></div>

        {/* Motion path */}
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <motion.path
            d="M40 150 C 120 20, 200 20, 200 100 S 300 190, 360 60"
            fill="none" stroke="rgb(255 214 10 / .35)" strokeWidth="1.5" strokeDasharray="5 6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }}
          />
        </svg>

        {/* The morphing hero shape travels along the path */}
        <motion.div
          className="absolute size-14 -translate-x-1/2 -translate-y-1/2 bg-accent shadow-[0_0_40px_rgba(255,214,10,.45)] sm:size-16"
          animate={{
            left: ["10%", "40%", "60%", "90%"],
            top: ["75%", "22%", "68%", "30%"],
            borderRadius: ["12%", "50%", "30% 70% 60% 40%", "12%"],
            rotate: [0, 180, 270, 360],
            scale: [1, 1.25, 0.85, 1],
          }}
          transition={{ duration: LOOP, times: KEYFRAMES, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Orbiting particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 size-2 rounded-full bg-white/70"
            animate={{ x: [0, Math.cos(i) * 140, 0], y: [0, Math.sin(i) * 70, 0], opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Kinetic type */}
        <div className="absolute bottom-4 left-4 flex gap-1 font-display text-xl font-bold sm:text-3xl">
          {"MAKE IT MOVE".split(" ").map((w, i) => (
            <motion.span
              key={w}
              animate={{ y: [24, 0, 0, -24], opacity: [0, 1, 1, 0] }}
              transition={{ duration: LOOP, times: [0, 0.15, 0.8, 1], delay: i * 0.12, repeat: Infinity }}
              className={i === 2 ? "text-accent" : ""}
            >
              {w}
            </motion.span>
          ))}
        </div>
      </Panel>

      {/* Graph editor */}
      <Panel delay={0.2} className="grid grid-cols-[1fr_auto] gap-4 p-3">
        <div>
          <div className="flex items-center justify-between">
            <PanelLabel>Keyframes</PanelLabel>
            <span className="font-mono text-[10px] text-muted">position · rotation · shape</span>
          </div>
          <div className="relative mt-3 h-8">
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            {[0.05, 0.33, 0.66, 0.95].map((k, i) => (
              <motion.span
                key={k}
                className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent"
                style={{ left: `${k * 100}%` }}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.12, type: "spring" }}
              />
            ))}
            <motion.span
              className="absolute -top-0.5 bottom-[-2px] w-px bg-white"
              animate={{ left: ["5%", "95%"] }}
              transition={{ duration: LOOP, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            />
          </div>
        </div>
        <div className="hidden sm:block">
          <PanelLabel>Easing</PanelLabel>
          <svg viewBox="0 0 60 40" className="mt-1 h-10 w-16">
            <rect x="0" y="0" width="60" height="40" fill="none" stroke="rgb(255 255 255 / .08)" />
            <motion.path
              d="M2 38 C 30 38, 30 2, 58 2" fill="none" stroke="#FFD60A" strokeWidth="2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 1 }}
            />
          </svg>
        </div>
      </Panel>
    </div>
  );
}
