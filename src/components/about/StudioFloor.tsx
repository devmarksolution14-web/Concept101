"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { Server, Users } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { PROJECTS } from "../portfolio/data";
import { Screen } from "../portfolio/shared";
import { PEOPLE, type Person } from "./data";

/* ───────────────────────── Isometric geometry ───────────────────────── */

/** Stage size in px; the whole floor is drawn in this space, then scaled to fit. */
const W = 1200;
const H = 850;
/** px per floor unit */
const S = 34;
const C = Math.cos(Math.PI / 6);
const OX = 485;
const OY = 140;

type Pt = [number, number];
const iso = (x: number, y: number, z = 0): Pt => [OX + (x - y) * C * S, OY + (x + y) * 0.5 * S - z * S];
const pts = (...p: Pt[]) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

type Tone = { top: string; left: string; right: string };
const DESK: Tone = { top: "#2c2c34", left: "#202027", right: "#17171c" };
const DARK: Tone = { top: "#1d1d23", left: "#151519", right: "#101013" };
const WALL: Tone = { top: "#26262d", left: "#18181d", right: "#131317" };

/** An extruded box: w along x, d along y, h up. Draws the three faces the camera can see. */
function Box({ x, y, z = 0, w, d, h, tone, stroke = "rgb(255 255 255 / .06)" }: { x: number; y: number; z?: number; w: number; d: number; h: number; tone: Tone; stroke?: string }) {
  return (
    <g stroke={stroke} strokeWidth={0.75} strokeLinejoin="round">
      <polygon points={pts(iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h))} fill={tone.left} />
      <polygon points={pts(iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h))} fill={tone.right} />
      <polygon points={pts(iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h))} fill={tone.top} />
    </g>
  );
}

/** Flat patch on the floor */
function Rug({ x, y, w, d, fill, stroke }: { x: number; y: number; w: number; d: number; fill: string; stroke?: string }) {
  return <polygon points={pts(iso(x, y, 0.01), iso(x + w, y, 0.01), iso(x + w, y + d, 0.01), iso(x, y + d, 0.01))} fill={fill} stroke={stroke} strokeWidth={1} strokeDasharray="4 4" />;
}

/* ───────────────────────── Layout ───────────────────────── */

type DeskSpot = { person: string; x: number; y: number; w: number; monitors: number };

const DESKS: DeskSpot[] = [
  { person: "ava", x: 13, y: 2.4, w: 2.8, monitors: 1 },
  { person: "kai", x: 16.6, y: 2.4, w: 2.8, monitors: 1 },
  { person: "lena", x: 20.2, y: 2.4, w: 2.8, monitors: 1 },
  { person: "omar", x: 13, y: 8, w: 2.8, monitors: 1 },
  { person: "priya", x: 16.6, y: 8, w: 2.8, monitors: 1 },
  { person: "sofia", x: 20.2, y: 8, w: 2.8, monitors: 1 },
  { person: "diego", x: 2.2, y: 10.2, w: 4.6, monitors: 2 },
];
const DESK_D = 1.6;
const DESK_H = 1.1;
const MON = { w: 1.9, h: 1.15, d: 0.12 };

const ZONE_SPOTS: Record<string, { at: [number, number, number]; icon: ReactNode; label: string }> = {
  "meeting-room": { at: [4.7, 3.5, 2.2], icon: <Users className="size-5" />, label: "Meeting room" },
  "server-rack": { at: [10.15, 1, 4], icon: <Server className="size-5" />, label: "The rack" },
};

const PERSON_BY_ID = Object.fromEntries(PEOPLE.map((p) => [p.id, p]));
const PROJECT_BY_ID = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

/** Where the camera looks for each selectable thing, in floor units. */
export function focusOf(id: string): [number, number, number] {
  const desk = DESKS.find((d) => d.person === id);
  if (desk) return [desk.x + desk.w / 2, desk.y + DESK_D / 2, 1.6];
  return ZONE_SPOTS[id]?.at ?? [12, 8, 0];
}

/* ───────────────────────── Component ───────────────────────── */

export default function StudioFloor({
  selected = null,
  onSelect,
  interactive = true,
}: {
  selected?: string | null;
  onSelect?: (id: string | null) => void;
  interactive?: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const live = useInView(frameRef, { amount: 0.15 });
  const reduce = useReducedMotion();
  const [fit, setFit] = useState(0.5);

  // Scale the fixed stage to the frame width
  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setFit(entry.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Camera: zoom toward whatever is selected
  const zoom = useMotionValue(1);
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);
  useEffect(() => {
    const Z = selected ? (PERSON_BY_ID[selected] ? 1.9 : 1.6) : 1;
    let tx = 0;
    let ty = 0;
    if (selected) {
      const [fx, fy] = iso(...focusOf(selected));
      tx = Math.min(0, Math.max(W - W * Z, W / 2 - fx * Z));
      ty = Math.min(0, Math.max(H - H * Z, H / 2 - fy * Z));
    }
    const t = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 90, damping: 20, mass: 1 };
    const a = [animate(zoom, Z, t), animate(camX, tx, t), animate(camY, ty, t)];
    return () => a.forEach((c) => c.stop());
  }, [selected, zoom, camX, camY, reduce]);

  // Keep hotspots the same on-screen size whatever the zoom; shrink them a little on small screens
  const pinSize = Math.min(1, Math.max(0.55, fit * 1.4));
  const counter = useTransform(zoom, (z) => pinSize / (fit * z));
  const compact = pinSize < 0.8;

  return (
    <div ref={frameRef} className="relative w-full overflow-hidden" style={{ height: H * fit }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${fit})` }}>
        <motion.div className="absolute inset-0 origin-top-left" style={{ x: camX, y: camY, scale: zoom }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden className="absolute inset-0">
            <Scene selected={selected} live={live} />
          </svg>

          {/* Live screens mapped onto iso faces */}
          <Face plane="y" x={13.3} y={0} z={3} w={7.6} h={1.6} inset={0}>
            <Screen project={PROJECT_BY_ID["halo-fitness"]} live={live} className="size-full" />
          </Face>
          {DESKS.map((desk) =>
            Array.from({ length: desk.monitors }, (_, m) => {
              const mx = monitorX(desk, m);
              const person = PERSON_BY_ID[desk.person];
              const project = PROJECT_BY_ID[m === 0 ? person.project : "halo-fitness"];
              return (
                <Face key={`${desk.person}-${m}`} plane="y" x={mx} y={desk.y + 0.25 + MON.d} z={DESK_H + MON.h} w={MON.w} h={MON.h}>
                  <Screen project={project} live={live} className="size-full" />
                </Face>
              );
            }),
          )}

          {/* Floor labels */}
          <FloorLabel x={1.4} y={6.3}>Meeting room</FloorLabel>
          <FloorLabel x={1.4} y={14.7}>Edit suite</FloorLabel>
          <FloorLabel x={12.4} y={6.9}>Design</FloorLabel>
          <FloorLabel x={12.4} y={12.5}>Build &amp; growth</FloorLabel>

          {/* Hotspots */}
          {interactive &&
            DESKS.map((desk) => {
              const p = PERSON_BY_ID[desk.person];
              const [hx, hy] = iso(desk.x + desk.w / 2, desk.y + DESK_D / 2, 3.3);
              return (
                <Hotspot key={p.id} x={hx} y={hy} counter={counter} active={selected === p.id} dim={!!selected && selected !== p.id} onClick={() => onSelect?.(selected === p.id ? null : p.id)} label={`${p.name}, ${p.role}`}>
                  <PersonPin person={p} active={selected === p.id} />
                </Hotspot>
              );
            })}
          {interactive &&
            Object.entries(ZONE_SPOTS).map(([id, z]) => {
              const [hx, hy] = iso(...z.at);
              return (
                <Hotspot key={id} x={hx} y={hy} counter={counter} active={selected === id} dim={!!selected && selected !== id} onClick={() => onSelect?.(selected === id ? null : id)} label={z.label}>
                  <span className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 ${compact ? "pr-1.5" : "pr-3.5"} text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(0,0,0,.9)] transition-colors ${selected === id ? "border-accent bg-accent text-black" : "border-white/15 bg-[#1a1a1f] text-white group-hover:border-accent/60"}`}>
                    <span className={`grid size-8 place-items-center rounded-full ${selected === id ? "bg-black/15" : "bg-white/10"}`}>{z.icon}</span>
                    {!compact && z.label}
                  </span>
                </Hotspot>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
}

function monitorX(desk: DeskSpot, m: number) {
  const gap = 0.3;
  const total = desk.monitors * MON.w + (desk.monitors - 1) * gap;
  return desk.x + (desk.w - total) / 2 + m * (MON.w + gap);
}

/* ───────────────────────── SVG scene ───────────────────────── */

function Scene({ selected, live }: { selected: string | null; live: boolean }) {
  const grid: ReactNode[] = [];
  for (let i = 1; i < 24; i++) grid.push(<line key={`gx${i}`} x1={iso(i, 0)[0]} y1={iso(i, 0)[1]} x2={iso(i, 16)[0]} y2={iso(i, 16)[1]} />);
  for (let j = 1; j < 16; j++) grid.push(<line key={`gy${j}`} x1={iso(0, j)[0]} y1={iso(0, j)[1]} x2={iso(24, j)[0]} y2={iso(24, j)[1]} />);

  const zoneFill = (id: string) => (selected === id ? "rgb(255 214 10 / .10)" : "rgb(255 255 255 / .025)");
  const zoneStroke = (id: string) => (selected === id ? "rgb(255 214 10 / .6)" : "rgb(255 255 255 / .1)");

  return (
    <>
      <defs>
        <linearGradient id="window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd60a" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffd60a" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Slab */}
      <Box x={0} y={0} z={-0.6} w={24} d={16} h={0.6} tone={{ top: "#121216", left: "#0d0d10", right: "#09090b" }} stroke="rgb(255 255 255 / .08)" />
      <g stroke="rgb(255 255 255 / .035)" strokeWidth={1}>{grid}</g>

      {/* Light spilling in from the windows */}
      <polygon points={pts(iso(2, 0), iso(9, 0), iso(11, 6), iso(4, 6))} fill="url(#window)" opacity={0.5} />

      {/* Zones */}
      <Rug x={1} y={1} w={7.6} d={5.6} fill={zoneFill("meeting-room")} stroke={zoneStroke("meeting-room")} />
      <Rug x={1} y={9} w={7.6} d={6} fill="rgb(255 77 109 / .04)" stroke="rgb(255 255 255 / .1)" />
      <Rug x={12} y={1.6} w={11.6} d={4} fill="rgb(255 255 255 / .02)" stroke="rgb(255 255 255 / .08)" />
      <Rug x={12} y={7.2} w={11.6} d={4} fill="rgb(255 255 255 / .02)" stroke="rgb(255 255 255 / .08)" />

      {/* Walls */}
      <Box x={-0.4} y={-0.4} w={0.4} d={16.4} h={3.4} tone={WALL} />
      <Box x={0} y={-0.4} w={24} d={0.4} h={3.4} tone={WALL} />
      {[[1.5, 4.5], [5.5, 8.5]].map(([a, b]) => (
        <polygon key={a} points={pts(iso(a, 0, 1), iso(b, 0, 1), iso(b, 0, 2.9), iso(a, 0, 2.9))} fill="url(#window)" stroke="rgb(255 214 10 / .25)" strokeWidth={1} />
      ))}
      {[[3, 7], [9, 13]].map(([a, b]) => (
        <polygon key={a} points={pts(iso(0, b, 1), iso(0, a, 1), iso(0, a, 2.9), iso(0, b, 2.9))} fill="url(#window)" stroke="rgb(255 214 10 / .25)" strokeWidth={1} />
      ))}
      {/* Wall screen bezel */}
      <polygon points={pts(iso(13.1, 0.02, 1.25), iso(21.1, 0.02, 1.25), iso(21.1, 0.02, 3.2), iso(13.1, 0.02, 3.2))} fill="#0b0b0d" stroke="rgb(255 255 255 / .15)" />

      {/* Server rack with blinking lights */}
      <Box x={9.4} y={0.3} w={1.5} d={1.4} h={3.3} tone={DARK} />
      {Array.from({ length: 12 }, (_, i) => {
        const [cx, cy] = iso(9.65 + (i % 4) * 0.3, 1.7, 0.6 + Math.floor(i / 4) * 0.8);
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={2.6}
            fill={i % 5 === 0 ? "#ffd60a" : "#34d399"}
            animate={live ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={{ duration: 0.9 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.13 }}
          />
        );
      })}

      {/* Plants */}
      <Plant x={11.6} y={0.5} />
      <Plant x={0.5} y={7.4} />
      <Plant x={22.8} y={5.9} />
      <Plant x={9.4} y={14.4} />

      {/* Meeting table and chairs */}
      <Box x={1.4} y={2.6} w={0.8} d={0.8} h={0.8} tone={DARK} />
      <Box x={1.4} y={3.9} w={0.8} d={0.8} h={0.8} tone={DARK} />
      <Box x={2.4} y={2.4} w={4.6} d={2.2} h={1} tone={selected === "meeting-room" ? { ...DESK, top: "#3a3420" } : DESK} />
      {[2.8, 4.3, 5.8].map((x) => (
        <Box key={x} x={x} y={5} w={0.8} d={0.8} h={0.8} tone={DARK} />
      ))}

      {/* Desks: desk, then monitors on top, then chair in front */}
      {DESKS.map((desk) => {
        const person = PERSON_BY_ID[desk.person];
        const on = selected === desk.person;
        return (
          <g key={desk.person} style={on ? { filter: `drop-shadow(0 0 14px ${person.color}aa)` } : undefined}>
            <Box x={desk.x} y={desk.y} w={desk.w} d={DESK_D} h={DESK_H} tone={on ? { ...DESK, top: "#3a3a44" } : DESK} stroke={on ? person.color : undefined} />
            {Array.from({ length: desk.monitors }, (_, m) => (
              <Box key={m} x={monitorX(desk, m)} y={desk.y + 0.25} z={DESK_H} w={MON.w} d={MON.d} h={MON.h} tone={DARK} />
            ))}
            <Box x={desk.x + desk.w / 2 - 0.45} y={desk.y + DESK_D + 0.45} w={0.9} d={0.9} h={0.75} tone={DARK} />
            <Box x={desk.x + desk.w / 2 - 0.45} y={desk.y + DESK_D + 1.25} w={0.9} d={0.14} h={1.6} tone={DARK} />
          </g>
        );
      })}

      {/* Edit-suite couch */}
      <Box x={2.4} y={13.2} w={4} d={1.2} h={0.7} tone={{ top: "#3a1f27", left: "#2a161c", right: "#1f1015" }} />
      <Box x={2.4} y={14.4} w={4} d={0.35} h={1.4} tone={{ top: "#3a1f27", left: "#2a161c", right: "#1f1015" }} />
    </>
  );
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Box x={x} y={y} w={0.7} d={0.7} h={0.6} tone={{ top: "#2a2a30", left: "#3b3b44", right: "#2c2c33" }} />
      <Box x={x - 0.15} y={y - 0.15} z={0.6} w={1} d={1} h={1} tone={{ top: "#2f6b45", left: "#22503a", right: "#1a3d2c" }} />
    </>
  );
}

/* ───────────────────────── HTML overlays ───────────────────────── */

/**
 * Maps a flat HTML box onto a vertical iso face. `plane="y"` faces the viewer's left (runs along x).
 * Content renders at 4× and is scaled down so visuals keep their proportions.
 */
function Face({ x, y, z, w, h, inset = 0.07, children }: { plane: "y"; x: number; y: number; z: number; w: number; h: number; inset?: number; children: ReactNode }) {
  const [tx, ty] = iso(x + inset, y, z - inset);
  const pw = (w - inset * 2) * S;
  const ph = (h - inset * 2) * S;
  return (
    <div className="pointer-events-none absolute left-0 top-0 origin-top-left overflow-hidden" style={{ width: pw, height: ph, transform: `matrix(${C}, 0.5, 0, 1, ${tx}, ${ty})` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: pw * 4, height: ph * 4, transform: "scale(0.25)" }}>
        {children}
      </div>
    </div>
  );
}

function FloorLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  const [tx, ty] = iso(x, y, 0.02);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 origin-top-left whitespace-nowrap font-mono text-[15px] font-semibold uppercase tracking-[0.3em] text-white/30"
      style={{ transform: `matrix(${C}, 0.5, ${-C}, 0.5, ${tx}, ${ty}) translateY(-100%)` }}
    >
      {children}
    </div>
  );
}

function Hotspot({
  x,
  y,
  counter,
  active,
  dim,
  onClick,
  label,
  children,
}: {
  x: number;
  y: number;
  counter: MotionValue<number>;
  active: boolean;
  dim: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      // Off-focus hotspots can be panned out of frame; reach them via the panel instead
      tabIndex={dim ? -1 : 0}
      aria-label={label}
      title={label}
      className="group absolute -translate-x-1/2 -translate-y-full rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      style={{ left: x, top: y, scale: counter, transformOrigin: "50% 100%", zIndex: active ? 20 : 10 }}
      animate={{ opacity: dim ? 0.45 : 1 }}
    >
      {children}
    </motion.button>
  );
}

function PersonPin({ person, active }: { person: Person; active: boolean }) {
  return (
    <span className="flex flex-col items-center">
      <span className="relative">
        {!active && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: person.color }}
            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span
          className={`relative grid size-12 place-items-center rounded-full border-2 font-display text-sm font-bold text-black shadow-[0_10px_24px_-8px_rgba(0,0,0,.9)] transition-transform group-hover:scale-110 ${active ? "border-white" : "border-black/40"}`}
          style={{ background: person.color }}
        >
          {person.initials}
        </span>
      </span>
      <span className="h-5 w-0.5 bg-gradient-to-b from-white/50 to-transparent" />
    </span>
  );
}
