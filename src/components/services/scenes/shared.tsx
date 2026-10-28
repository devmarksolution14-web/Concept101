"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/** Number that counts up from 0 to `to` after `delay` seconds. */
export function Counter({
  to,
  delay = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  delay?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const value = useMotionValue(0);
  const text = useTransform(value, (v) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`,
  );

  useEffect(() => {
    const controls = animate(value, to, { delay, duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, to, delay, duration]);

  return <motion.span className="tabular-nums">{text}</motion.span>;
}

/** Small panel used inside scenes. */
export function Panel({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl border border-line bg-panel-2/90 backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
      {children}
    </div>
  );
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
