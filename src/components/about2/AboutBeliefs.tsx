"use client";

import { MotionConfig, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { PEOPLE } from "../about/data";
import { Backdrop, EASE } from "../portfolio/shared";
import { AutomateDemo, FastDemo, SecondVisitDemo, ShowDemo, TeamDemo } from "./demos";

type Belief = {
  id: string;
  /** Statement, with the last word accented */
  words: string[];
  short: string;
  text: string;
  demo: ComponentType<{ live: boolean }>;
  caption: string;
};

const BELIEFS: Belief[] = [
  {
    id: "fast",
    words: ["Fast", "is", "a", "feature."],
    short: "Fast is a feature",
    text: "Every second of loading costs you visitors. We treat speed as part of the design, not a fix for later.",
    demo: FastDemo,
    caption: "The same page, two builds",
  },
  {
    id: "show",
    words: ["Show,", "don't", "tell."],
    short: "Show, don't tell",
    text: "Anyone can claim great work. We'd rather put the work in front of you and let it make the case.",
    demo: ShowDemo,
    caption: "Claims out, proof in",
  },
  {
    id: "second-visit",
    words: ["Design", "for", "the", "second", "visit."],
    short: "Design for the second visit",
    text: "The first visit gets the attention. The second one gets the sale, so we design for people who come back.",
    demo: SecondVisitDemo,
    caption: "A site that remembers you",
  },
  {
    id: "automate",
    words: ["Automate", "the", "boring", "parts."],
    short: "Automate the boring parts",
    text: "If a person does it every day and hates it, an agent should probably do it instead. We start with our own week.",
    demo: AutomateDemo,
    caption: "An agent working through a real inbox",
  },
  {
    id: "team",
    words: ["Small", "team,", "senior", "hands."],
    short: "Small team, senior hands",
    text: "No account managers relaying messages. You talk directly to the people designing and building your project.",
    demo: TeamDemo,
    caption: "Who you'll actually talk to",
  },
];

export default function AboutBeliefs() {
  const [active, setActive] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="beliefs-heading" className="relative isolate overflow-x-clip px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-10">
        <Backdrop />

        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h1 id="beliefs-heading" className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
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
              Five things we believe, and the live proof next to each one. It&apos;s the quickest way to know if we&apos;re a fit.
            </motion.p>
          </div>

          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <BeliefIndex active={active} />

            <ol className="flex flex-col">
              {BELIEFS.map((b, i) => (
                <BeliefBand key={b.id} belief={b} index={i} onActive={setActive} />
              ))}
            </ol>
          </div>

          <Team />
          <Cta />
        </div>
      </section>
    </MotionConfig>
  );
}

/* ───────────────────────── Index ───────────────────────── */

function BeliefIndex({ active }: { active: number }) {
  return (
    <nav aria-label="Beliefs" className="hidden lg:block">
      <ol className="sticky top-24 flex flex-col gap-1 border-l border-line">
        {BELIEFS.map((b, i) => {
          const on = i === active;
          return (
            <li key={b.id} className="relative">
              {on && <motion.span layoutId="belief-mark" className="absolute -left-px top-0 h-full w-0.5 bg-accent" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
              <a
                href={`#belief-${b.id}`}
                aria-current={on ? "step" : undefined}
                className={`flex gap-3 py-2 pl-4 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-accent ${on ? "text-white" : "text-white/40 hover:text-white/75"}`}
              >
                <span className={`font-mono text-xs tabular-nums ${on ? "text-accent" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                {b.short}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ───────────────────────── Belief band ───────────────────────── */

function BeliefBand({ belief, index, onActive }: { belief: Belief; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const live = useInView(ref, { amount: 0.3 });
  const seen = useInView(ref, { amount: 0.3, once: true });
  const Demo = belief.demo;
  const flip = index % 2 === 1;

  useEffect(() => {
    if (centered) onActive(index);
  }, [centered, onActive, index]);

  return (
    <li ref={ref} id={`belief-${belief.id}`} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-20">
      <div className={`grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-14 ${flip ? "xl:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <h2 className="font-display text-5xl font-bold leading-[0.92] tracking-tight sm:text-6xl 2xl:text-7xl">
            {belief.words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1.5 align-bottom">
                <motion.span
                  className={`inline-block ${i === belief.words.length - 1 ? "text-accent" : ""} ${i < belief.words.length - 1 ? "mr-[0.22em]" : ""}`}
                  initial={{ y: "105%" }}
                  animate={seen ? { y: 0 } : { y: "105%" }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
            className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {belief.text}
          </motion.p>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={seen ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative"
        >
          <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,214,10,.10),transparent_70%)] blur-2xl" />
          <div className="rounded-[24px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-2 shadow-[0_30px_90px_-30px_rgba(0,0,0,.9)]">
            <div className="relative overflow-hidden rounded-[17px] border border-black bg-panel">
              <div className="flex items-center gap-3 border-b border-line bg-black/40 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
                  <span className={`size-1.5 rounded-full ${live ? "animate-pulse bg-accent" : "bg-white/30"}`} />
                  <span className="truncate">
                    studio://beliefs/<span className="text-white/80">{belief.id}</span>
                  </span>
                </div>
              </div>
              <div aria-hidden className="screen-grid relative h-[340px] sm:h-[380px]">
                <Demo live={live} />
                <div className="scanlines pointer-events-none absolute inset-0" />
              </div>
            </div>
          </div>
          <figcaption className="mt-3 px-1 font-mono text-[11px] uppercase tracking-wider text-white/40">{belief.caption}</figcaption>
        </motion.figure>
      </div>
    </li>
  );
}

/* ───────────────────────── Team strip ───────────────────────── */

function Team() {
  return (
    <div className="mt-20 rounded-[28px] border border-white/10 bg-panel/60 p-6 sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-xl font-display text-4xl font-bold leading-[0.95] tracking-tight [text-wrap:balance] sm:text-5xl">
          The people who <span className="text-accent">believe it</span>
        </h2>
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-white transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:self-end"
        >
          Walk around the studio
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
        {PEOPLE.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
            className="flex flex-col items-start gap-3"
          >
            <span className="grid size-14 place-items-center rounded-full font-display text-sm font-bold text-black" style={{ background: p.color }}>
              {p.initials}
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">{p.name}</span>
              <span className="block text-xs text-muted">{p.role}</span>
            </span>
          </motion.li>
        ))}
      </ul>
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
      className="mt-24 flex flex-col items-center gap-6 text-center"
    >
      <p className="font-display text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">
        Believe the same <span className="text-accent">things</span>?
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
      <p className="font-mono text-[11px] text-white/35">Team, results and demos shown are sample content for preview.</p>
    </motion.div>
  );
}
