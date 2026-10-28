"use client";

import { MotionConfig, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, type ComponentType } from "react";
import type { DemoId } from "./content";

// Demos are decorative and code-split: they load only when their section is near the viewport.
const load = (name: "FastDemo" | "ShowDemo" | "SecondVisitDemo" | "AutomateDemo" | "TeamDemo") =>
  dynamic(() => import("../about2/demos").then((m) => m[name] as ComponentType<{ live: boolean }>), { ssr: false });

const DEMOS: Record<DemoId, ComponentType<{ live: boolean }>> = {
  fast: load("FastDemo"),
  show: load("ShowDemo"),
  "second-visit": load("SecondVisitDemo"),
  automate: load("AutomateDemo"),
  team: load("TeamDemo"),
};

export default function LiveDemo({ id }: { id: DemoId }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px 0px", once: true });
  const live = useInView(ref, { amount: 0.3 });
  const Demo = DEMOS[id];

  return (
    <div ref={ref} className="absolute inset-0">
      <MotionConfig reducedMotion="user">{near && <Demo live={live} />}</MotionConfig>
    </div>
  );
}
