"use client";

import { useEffect, useState } from "react";

/** In-page table of contents. Links render on the server; the active marker follows scroll. */
export default function BeliefIndex({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id.replace("belief-", ""))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(`belief-${id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <ol className="sticky top-24 flex flex-col gap-1 border-l border-line">
        {items.map((b, i) => {
          const on = b.id === active;
          return (
            <li key={b.id} className="relative">
              <span className={`absolute -left-px top-0 h-full w-0.5 transition-colors duration-300 ${on ? "bg-accent" : "bg-transparent"}`} />
              <a
                href={`#belief-${b.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex gap-3 py-2 pl-4 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-accent ${on ? "text-white" : "text-white/40 hover:text-white/75"}`}
              >
                <span className={`font-mono text-xs tabular-nums ${on ? "text-accent" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                {b.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
