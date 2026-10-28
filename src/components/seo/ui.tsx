import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { Backdrop } from "../portfolio/shared";

/** Page frame shared by all keyword landing pages. Server-rendered; motion is CSS-only. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-x-clip px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-10">
      <Backdrop />
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-white/80">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="transition-colors hover:text-white">
                  {it.name}
                </Link>
              )}
              {!last && <ChevronRight className="size-3" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Hero({ title, accent, sub, children, visual }: { title: string; accent?: string; sub: string; children?: ReactNode; visual?: ReactNode }) {
  // Accent the trailing phrase (e.g. "in Nepal") without changing the H1 text
  const head = accent && title.endsWith(accent) ? title.slice(0, -accent.length) : title;
  return (
    <header className={`mt-10 grid items-center gap-10 sm:mt-14 ${visual ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14" : ""}`}>
      <div>
        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight [text-wrap:balance] sm:text-6xl xl:text-7xl">
          {head}
          {accent && title.endsWith(accent) && <span className="text-accent">{accent}</span>}
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-white/75">{sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_8px_40px_-6px_rgba(255,214,10,.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Get a free consultation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          {children}
        </div>
      </div>
      {visual}
    </header>
  );
}

/** Monitor frame used for hero visuals */
export function Monitor({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,214,10,.14),transparent_70%)] blur-2xl" />
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
              <span className="truncate">{label}</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Section({ id, title, accent, intro, children, className = "" }: { id: string; title: string; accent?: string; intro?: string; children: ReactNode; className?: string }) {
  const head = accent && title.endsWith(accent) ? title.slice(0, -accent.length) : title;
  return (
    <section aria-labelledby={id} className={`reveal mt-24 ${className}`}>
      <h2 id={id} className="max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tight [text-wrap:balance] sm:text-5xl">
        {head}
        {accent && title.endsWith(accent) && <span className="text-accent">{accent}</span>}
      </h2>
      {intro && <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

/** Card grid for what's included / reasons. */
export function FeatureList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <li key={it.title} className="bg-background p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold text-white">{it.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="reveal mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
      <h2 id="faq-heading" className="font-display text-4xl font-bold leading-[0.95] tracking-tight [text-wrap:balance] sm:text-5xl">
        {title}
      </h2>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f, i) => (
          <details key={f.q} open={i === 0} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 font-display text-lg font-semibold text-white transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
              <h3>{f.q}</h3>
              <ChevronDown className="size-5 shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180 group-open:text-accent" aria-hidden />
            </summary>
            <p className="max-w-[65ch] pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function LinkGrid({ title, id, links }: { title: string; id: string; links: { href: string; label: string; text: string }[] }) {
  return (
    <section aria-labelledby={id} className="reveal mt-24">
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col gap-2 rounded-2xl border border-white/10 bg-panel/60 p-5 transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="flex items-center justify-between gap-3 font-display text-lg font-semibold text-white">
                {l.label}
                <ArrowRight className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
              </span>
              <span className="text-sm leading-relaxed text-muted">{l.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactCta({ heading }: { heading: string }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="reveal mt-24 scroll-mt-24 rounded-[28px] border border-accent/25 bg-panel/70 p-8 text-center sm:p-14">
      <h2 id="contact-heading" className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">
        {heading}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-muted">Tell us where you want to grow. You&apos;ll get a written plan and a quote, with no obligation.</p>
      <a
        href={SITE.email ? `mailto:${SITE.email}` : "/#contact"}
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_8px_40px_-6px_rgba(255,214,10,.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Get a free consultation
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </a>
    </section>
  );
}
