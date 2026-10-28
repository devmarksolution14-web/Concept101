import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PEOPLE } from "../about/data";
import { Backdrop } from "../portfolio/shared";
import { SERVICES } from "../services/data";
import BeliefIndex from "./BeliefIndex";
import { BELIEFS, FAQ } from "./content";
import LiveDemo from "./LiveDemo";

/**
 * SEO version of About Us: every word is server-rendered HTML, visible without JavaScript.
 * Motion comes from CSS (`.reveal`) and from client islands that only decorate.
 */
export default function AboutSeo() {
  return (
    <div className="relative isolate overflow-x-clip px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-10">
      <Backdrop />

      <div className="mx-auto max-w-[1440px]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="text-white/80">
              About Us
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <h1 className="font-display font-bold tracking-tight">
            <span className="block text-5xl leading-[0.9] sm:text-7xl lg:text-8xl">
              About <span className="text-accent">Us</span>
            </span>
            <span className="mt-4 block text-xl font-semibold leading-snug text-white/75 sm:text-2xl">A small design, development and growth studio</span>
          </h1>
          <p className="max-w-md text-base text-muted sm:text-lg lg:pb-3 lg:text-right">
            Five things we believe, and the live proof next to each one. It&apos;s the quickest way to know if we&apos;re a fit.
          </p>
        </header>

        {/* Who we are: indexable summary with internal links */}
        <section aria-labelledby="who-heading" className="reveal mt-14 grid gap-6 rounded-[28px] border border-white/10 bg-panel/60 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          <h2 id="who-heading" className="font-display text-3xl font-bold leading-[0.95] tracking-tight sm:text-4xl">
            Who we <span className="text-accent">are</span>
          </h2>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-white/80">
            <p>
              We&apos;re a team of seven designers, developers and marketers working from one studio. We help growing businesses look sharper, load faster, get found in search and spend less time on repetitive work.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Our services">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.id}>
                    <Link
                      href="/services"
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 text-sm text-white/80 transition-colors hover:border-accent/50 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-white/10">
                        <Icon className="size-3.5" aria-hidden />
                      </span>
                      {s.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Beliefs */}
        <section aria-labelledby="beliefs-heading" className="mt-20 lg:mt-28">
          <h2 id="beliefs-heading" className="sr-only">
            What we believe
          </h2>
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <BeliefIndex items={BELIEFS.map((b) => ({ id: b.id, label: b.short }))} />

            <ol className="flex flex-col">
              {BELIEFS.map((b, i) => {
                const words = b.statement.split(" ");
                const last = words.pop();
                return (
                  <li key={b.id} id={`belief-${b.id}`} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-20">
                    <article aria-labelledby={`belief-${b.id}-title`} className={`grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-14 ${i % 2 ? "xl:[&>*:first-child]:order-2" : ""}`}>
                      <div className="reveal">
                        <h3 id={`belief-${b.id}-title`} className="font-display text-5xl font-bold leading-[0.92] tracking-tight [text-wrap:balance] sm:text-6xl 2xl:text-7xl">
                          {words.join(" ")} <span className="text-accent">{last}</span>
                        </h3>
                        <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{b.text}</p>
                        <p className="mt-5 flex flex-wrap gap-4">
                          {b.links.map((l) => (
                            <Link key={l.label} href={l.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-accent">
                              {l.label}
                              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                            </Link>
                          ))}
                        </p>
                      </div>

                      <figure className="reveal relative">
                        <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,214,10,.10),transparent_70%)] blur-2xl" />
                        <div className="rounded-[24px] border border-white/10 bg-gradient-to-b from-[#1c1c21] to-[#0d0d10] p-2 shadow-[0_30px_90px_-30px_rgba(0,0,0,.9)]">
                          <div className="relative overflow-hidden rounded-[17px] border border-black bg-panel">
                            <div aria-hidden className="flex items-center gap-3 border-b border-line bg-black/40 px-4 py-2.5">
                              <div className="flex gap-1.5">
                                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                                <span className="size-2.5 rounded-full bg-[#28c840]" />
                              </div>
                              <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
                                <span className="size-1.5 rounded-full bg-accent" />
                                <span className="truncate">
                                  studio://beliefs/<span className="text-white/80">{b.id}</span>
                                </span>
                              </div>
                            </div>
                            {/* Fixed height reserves space so the lazy demo causes no layout shift */}
                            <div aria-hidden className="screen-grid relative h-[340px] sm:h-[380px]">
                              <LiveDemo id={b.id} />
                              <div className="scanlines pointer-events-none absolute inset-0" />
                            </div>
                          </div>
                        </div>
                        <figcaption className="mt-3 px-1 text-sm leading-relaxed text-white/45">{b.demoDescription}</figcaption>
                      </figure>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading" className="reveal mt-20 rounded-[28px] border border-white/10 bg-panel/60 p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="team-heading" className="max-w-xl font-display text-4xl font-bold leading-[0.95] tracking-tight [text-wrap:balance] sm:text-5xl">
              The people who <span className="text-accent">believe it</span>
            </h2>
            <Link href="/about" className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-white transition-colors hover:text-accent lg:self-end">
              Walk around the studio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
            {PEOPLE.map((p) => (
              <li key={p.id} className="flex flex-col items-start gap-3">
                <span aria-hidden className="grid size-14 place-items-center rounded-full font-display text-sm font-bold text-black" style={{ background: p.color }}>
                  {p.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{p.name}</span>
                  <span className="block text-xs text-muted">{p.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
          <h2 id="faq-heading" className="reveal font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
            Questions, <span className="text-accent">answered</span>
          </h2>
          <div className="reveal divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 font-display text-lg font-semibold text-white transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
                  <h3>{f.q}</h3>
                  <ChevronDown className="size-5 shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-accent" aria-hidden />
                </summary>
                <p className="max-w-[65ch] pb-5 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="cta-heading" className="reveal mt-24 flex flex-col items-center gap-6 text-center">
          <h2 id="cta-heading" className="font-display text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">
            Believe the same <span className="text-accent">things</span>?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_8px_40px_-6px_rgba(255,214,10,.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Start a project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              See our work
            </Link>
          </div>
          <p className="font-mono text-[11px] text-white/35">Team, results and demos shown are sample content for preview.</p>
        </section>
      </div>
    </div>
  );
}
