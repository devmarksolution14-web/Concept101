"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SERVICES } from "../services/data";
import { PROJECTS, type Project } from "./data";
import { VISUALS } from "./visuals";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s]));

/** Only offer filters for services that have work to show. */
export const FILTERS = SERVICES.map((s) => ({ ...s, count: PROJECTS.filter((p) => p.services.includes(s.id)).length })).filter((s) => s.count > 0);

/** The project's live visual inside a CRT-style screen. The screen is a size container for the visual's fluid type. */
export function Screen({ project, live, className = "", hoverZoom }: { project: Project; live: boolean; className?: string; hoverZoom?: boolean }) {
  const Visual = VISUALS[project.visual];
  return (
    <div className={`relative overflow-hidden [container-type:size] ${className}`} aria-hidden>
      <div className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hoverZoom ? "group-hover:scale-[1.04]" : ""}`}>
        <Visual id={project.id} client={project.client} tagline={project.tagline} p={project.palette} live={live} />
      </div>
      <div className="scanlines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.06),transparent_35%)]" />
    </div>
  );
}

export function RoundButton({ label, onClick, highlight, children }: { label: string; onClick: () => void; highlight?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid size-9 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        highlight ? "border-accent bg-accent text-black hover:bg-accent-soft" : "border-white/15 bg-white/[0.03] text-white hover:border-white/40"
      }`}
    >
      {children}
    </button>
  );
}

/** Sticky, full-bleed service filter. */
export function FilterBar({ active, onChoose, total, className = "" }: { active: string; onChoose: (id: string) => void; total: number; className?: string }) {
  const options = [{ id: "all", title: "All work", icon: LayoutGrid, count: total }, ...FILTERS];

  return (
    <div className={`sticky top-0 z-30 -mx-4 border-b border-line bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 ${className}`}>
      <div role="group" aria-label="Filter projects by service" className="no-scrollbar mx-auto flex max-w-[1440px] gap-2 overflow-x-auto">
        {options.map((o) => {
          const isActive = o.id === active;
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChoose(o.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive ? "border-accent/50 text-white" : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-accent/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className={`grid size-7 place-items-center rounded-full transition-colors ${isActive ? "bg-accent text-black" : "bg-white/10"}`}>
                <Icon className="size-3.5" />
              </span>
              {o.title}
              <span className={`font-mono text-xs tabular-nums ${isActive ? "text-accent" : "text-white/35"}`}>{o.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Title, story, results, services and CTA for one case study. */
export function CaseBody({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <>
      <div>
        <h2 data-case-heading tabIndex={-1} className="font-display text-3xl font-bold leading-[1.02] tracking-tight [text-wrap:balance] focus:outline-none sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-3 max-w-[60ch] text-white/75">{project.summary}</p>
      </div>

      <dl className={`grid gap-4 text-sm leading-relaxed sm:grid-cols-2 ${wide ? "" : "lg:grid-cols-1 xl:grid-cols-2"}`}>
        <div>
          <dt className="font-display font-semibold text-white">The challenge</dt>
          <dd className="mt-1 text-muted">{project.challenge}</dd>
        </div>
        <div>
          <dt className="font-display font-semibold text-white">What we did</dt>
          <dd className="mt-1 text-muted">{project.approach}</dd>
        </div>
      </dl>

      <dl className="grid grid-cols-3 divide-x divide-line border-y border-line">
        {project.results.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.4, ease: EASE }}
            className="flex flex-col-reverse gap-1 px-3 py-4 first:pl-0"
          >
            <dt className="text-xs leading-snug text-muted">{r.label}</dt>
            <dd className="font-display text-2xl font-bold tabular-nums text-accent sm:text-3xl">{r.value}</dd>
          </motion.div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" aria-label="Services involved">
          {project.services.map((id) => {
            const s = SERVICE_BY_ID[id];
            const Icon = s.icon;
            return (
              <li key={id} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-xs text-white/80">
                <span className="grid size-5 place-items-center rounded-full bg-white/10">
                  <Icon className="size-3" />
                </span>
                {s.title}
              </li>
            );
          })}
        </ul>

        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-shadow hover:shadow-[0_8px_32px_-6px_rgba(255,214,10,.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Start a project like this
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-20 flex flex-col items-center gap-6 text-center"
    >
      <p className="font-display text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">
        Your project could be <span className="text-accent">next</span>.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_8px_40px_-6px_rgba(255,214,10,.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Start a project
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Explore our services
        </Link>
      </div>
      <p className="font-mono text-[11px] text-white/35">Sample projects shown for preview. Real case studies coming soon.</p>
    </motion.div>
  );
}

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <motion.div
        className="absolute right-[-10%] top-[-10%] h-[600px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(255,214,10,.09),transparent)]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
