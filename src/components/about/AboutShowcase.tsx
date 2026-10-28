"use client";

import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../portfolio/data";
import { Backdrop, EASE, RoundButton, Screen, SERVICE_BY_ID } from "../portfolio/shared";
import { PEOPLE, STORY, ZONES, type Person, type Zone } from "./data";
import StudioFloor from "./StudioFloor";

const PERSON_BY_ID = Object.fromEntries(PEOPLE.map((p) => [p.id, p]));
const ZONE_BY_ID = Object.fromEntries(ZONES.map((z) => [z.id, z]));
const PROJECT_BY_ID = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

export default function AboutShowcase() {
  const [selected, setSelected] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape returns to the whole floor from anywhere on the page
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Once the new panel has animated in, move focus to it so keyboard users land on the details
  const focusPanel = () => {
    if (selected) panelRef.current?.querySelector<HTMLElement>("[data-panel-heading]")?.focus({ preventScroll: true });
  };

  const stepPerson = (dir: 1 | -1) => {
    const i = PEOPLE.findIndex((p) => p.id === selected);
    setSelected(PEOPLE[(Math.max(i, 0) + dir + PEOPLE.length) % PEOPLE.length].id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="about-heading" className="relative isolate overflow-x-clip px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <Backdrop />

        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h1 id="about-heading" className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              {["About", "Us"].map((word, i) => (
                <span key={word} className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className={`inline-block ${i === 1 ? "text-accent" : "mr-[0.22em]"}`}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="max-w-md text-base text-muted sm:text-lg lg:pb-3 lg:text-right"
            >
              Seven people, one floor, eight services. Walk around the studio: pick a desk to meet the person at it.
            </motion.p>
          </div>

          {/* The floor + panel */}
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative self-start"
            >
              <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,214,10,.12),transparent_70%)] blur-2xl" />
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] sm:p-3">
                <div className="relative overflow-hidden rounded-[20px] border border-black bg-[#0b0b0d]">
                  <div className="relative z-20 flex items-center gap-3 border-b border-line bg-black/40 px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="size-2.5 rounded-full bg-[#febc2e]" />
                      <span className="size-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span className="truncate">
                        studio://about/<span className="text-white/80">{selected ?? "floor"}</span>
                      </span>
                    </div>
                    <AnimatePresence>
                      {selected && (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          onClick={() => setSelected(null)}
                          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          <Maximize2 className="size-3" /> Whole floor
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  <StudioFloor selected={selected} onSelect={setSelected} />
                  <div aria-hidden className="scanlines pointer-events-none absolute inset-0 z-10" />
                </div>
              </div>
            </motion.div>

            <div ref={panelRef} aria-live="polite" className="lg:sticky lg:top-8 lg:self-start">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected ?? "intro"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onAnimationComplete={focusPanel}
                  className="rounded-[24px] border border-white/10 bg-panel/80 p-5 sm:p-6"
                >
                  {selected && PERSON_BY_ID[selected] ? (
                    <PersonPanel person={PERSON_BY_ID[selected]} onBack={() => setSelected(null)} onStep={stepPerson} />
                  ) : selected && ZONE_BY_ID[selected] ? (
                    <ZonePanel zone={ZONE_BY_ID[selected]} onBack={() => setSelected(null)} />
                  ) : (
                    <IntroPanel onPick={setSelected} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <Story />
          <Cta />
        </div>
      </section>
    </MotionConfig>
  );
}

/* ───────────────────────── Panels ───────────────────────── */

function IntroPanel({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div>
      <h2 data-panel-heading tabIndex={-1} className="font-display text-2xl font-bold tracking-tight focus:outline-none">
        Meet the team
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">Everyone who&apos;ll work on your project, at the desk where they do it.</p>
      <ul className="mt-5 flex flex-col gap-1">
        {PEOPLE.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onPick(p.id)}
              className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Avatar person={p} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-white">{p.name}</span>
                <span className="block truncate text-xs text-muted">{p.role}</span>
              </span>
              <ArrowRight className="size-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
        {ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => onPick(z.id)}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-accent/50 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
          >
            {z.id === "meeting-room" ? "How we work" : "What we build with"}
          </button>
        ))}
      </div>
    </div>
  );
}

function PersonPanel({ person, onBack, onStep }: { person: Person; onBack: () => void; onStep: (dir: 1 | -1) => void }) {
  const project = PROJECT_BY_ID[person.project];
  const service = SERVICE_BY_ID[person.service];
  const Icon = service.icon;

  return (
    <div className="flex flex-col gap-5">
      <PanelNav onBack={onBack}>
        <RoundButton label="Previous person" onClick={() => onStep(-1)}>
          <ChevronLeft className="size-4" />
        </RoundButton>
        <RoundButton label="Next person" onClick={() => onStep(1)}>
          <ChevronRight className="size-4" />
        </RoundButton>
      </PanelNav>

      <div className="flex items-center gap-4">
        <Avatar person={person} size="lg" />
        <div className="min-w-0">
          <h2 data-panel-heading tabIndex={-1} className="font-display text-2xl font-bold leading-tight tracking-tight focus:outline-none">
            {person.name}
          </h2>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            <Icon className="size-3.5 text-accent" /> {person.role}
          </p>
        </div>
      </div>

      <p className="leading-relaxed text-white/80">{person.bio}</p>

      <div>
        <p className="font-display text-sm font-semibold text-white">On their screen</p>
        <Link
          href="/portfolio"
          className="group mt-2 block overflow-hidden rounded-xl border border-white/10 transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Screen project={project} live className="aspect-[16/9]" hoverZoom />
          <span className="flex items-center justify-between gap-3 bg-black/40 px-3 py-2.5">
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white">{project.client}</span>
              <span className="block truncate text-xs text-muted">{project.title}</span>
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-white/50 transition-colors group-hover:text-accent" />
          </span>
        </Link>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="Tools">
        {person.tools.map((t) => (
          <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/80">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ZonePanel({ zone, onBack }: { zone: Zone; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <PanelNav onBack={onBack} />
      <div>
        <h2 data-panel-heading tabIndex={-1} className="font-display text-2xl font-bold tracking-tight focus:outline-none">
          {zone.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{zone.intro}</p>
      </div>
      {zone.kind === "steps" ? (
        <ol className="relative flex flex-col gap-5 border-l border-line pl-6">
          {zone.items.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: EASE }}
              className="relative"
            >
              <span className="absolute -left-[37px] top-0 grid size-6 place-items-center rounded-full border border-accent/60 bg-background font-mono text-[11px] font-semibold text-accent">
                {i + 1}
              </span>
              <p className="font-display font-semibold text-white">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      ) : (
        <dl className="divide-y divide-line border-y border-line">
          {zone.items.map((s) => (
            <div key={s.title} className="grid grid-cols-[96px_1fr] gap-3 py-3 text-sm">
              <dt className="font-display font-semibold text-white">{s.title}</dt>
              <dd className="text-muted">{s.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function PanelNav({ onBack, children }: { onBack: () => void; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> Whole team
      </button>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

function Avatar({ person, size }: { person: Person; size: "sm" | "lg" }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-display font-bold text-black ${size === "lg" ? "size-16 text-lg" : "size-9 text-xs"}`}
      style={{ background: person.color }}
    >
      {person.initials}
    </span>
  );
}

/* ───────────────────────── Story ───────────────────────── */

function Story() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mt-28 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
      <div>
        <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight [text-wrap:balance] sm:text-5xl">
          How we got <span className="text-accent">here</span>
        </h2>
        <p className="mt-4 max-w-sm text-muted">From a spare room to the floor above, without ever getting too big to know every client.</p>
      </div>

      <ol ref={ref} className="relative grid gap-8 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4">
        {/* Progress rail (desktop) */}
        <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-line xl:block">
          <motion.span className="block h-full origin-left bg-accent" style={{ scaleX: line }} />
        </span>
        {STORY.map((s, i) => (
          <motion.li
            key={s.year}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            className="relative pl-6 xl:pl-0 xl:pt-8"
          >
            <span aria-hidden className={`absolute left-0 top-1 size-3.5 rounded-full border-2 xl:top-0 ${i === STORY.length - 1 ? "border-accent bg-accent" : "border-accent bg-background"}`} />
            <p className="font-mono text-sm font-semibold text-accent">{s.year}</p>
            <p className="mt-1 font-display text-lg font-semibold leading-snug text-white">{s.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ───────────────────────── CTA ───────────────────────── */

function Cta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-28 flex flex-col items-center gap-6 text-center"
    >
      <p className="font-display text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">
        Pull up a <span className="text-accent">chair</span>.
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
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          See our work
        </Link>
      </div>
      <p className="font-mono text-[11px] text-white/35">Team, history and studio shown are sample content for preview.</p>
    </motion.div>
  );
}
