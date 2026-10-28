import type { TargetAndTransition, Transition } from "framer-motion";
import type { Palette } from "../data";

export type VisualProps = {
  id: string;
  client: string;
  tagline: string;
  p: Palette;
  /** Run the looping animation. Off-screen tiles rest on their first frame. */
  live: boolean;
};

type Keyframes = Record<string, (number | string)[]>;

/**
 * Infinite loop when `live`, otherwise park on the first keyframe.
 * Spread onto any motion element: `<motion.div {...loop(live, { y: [0, -8, 0] })} />`
 */
export function loop(live: boolean, keyframes: Keyframes, transition: Transition = {}) {
  if (!live) {
    const rest = Object.fromEntries(Object.entries(keyframes).map(([k, v]) => [k, v[0]]));
    return { animate: rest as TargetAndTransition, transition: { duration: 0.4 } };
  }
  return {
    animate: keyframes as TargetAndTransition,
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", ...transition } as Transition,
  };
}

/** Fluid type that scales with the screen it sits in (the screen is a size container). */
export const fluid = (min: number, cqw: number, max: number) => `clamp(${min}px, ${cqw}cqw, ${max}px)`;
