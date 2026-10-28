import { NEPAL_UTC } from "@/content/markets";

const OPEN_NP = 10;
const CLOSE_NP = 18;
const OPEN_CLIENT = 9;
const CLOSE_CLIENT = 17;

type Seg = [number, number];

/** Split a span on the 0–24 axis into segments, wrapping past midnight. */
function wrap(start: number, end: number): Seg[] {
  const s = ((start % 24) + 24) % 24;
  const e = s + (end - start);
  return e <= 24 ? [[s, e]] : [[s, 24], [0, e - 24]];
}

function intersect(a: Seg[], b: Seg[]): Seg[] {
  const out: Seg[] = [];
  for (const [a0, a1] of a) for (const [b0, b1] of b) {
    const s = Math.max(a0, b0);
    const e = Math.min(a1, b1);
    if (e > s) out.push([s, e]);
  }
  return out;
}

const fmt = (h: number) => {
  const t = ((h % 24) + 24) % 24;
  const hh = Math.floor(t);
  const mm = Math.round((t - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};
const dur = (h: number) => `${Math.floor(h)}h${Math.round((h % 1) * 60) ? ` ${Math.round((h % 1) * 60)}m` : ""}`;

/** Both business days on one 24-hour axis in Nepal time, with the shared window highlighted. */
export default function TimeOverlap({ city, tzLabel, utcOffset }: { city: string; tzLabel: string; utcOffset: number }) {
  const shift = NEPAL_UTC - utcOffset; // hours Nepal is ahead
  const nepal: Seg[] = [[OPEN_NP, CLOSE_NP]];
  const client = wrap(OPEN_CLIENT + shift, CLOSE_CLIENT + shift);
  const overlap = intersect(nepal, client);
  const total = overlap.reduce((n, [s, e]) => n + (e - s), 0);

  return (
    <figure className="rounded-[24px] border border-white/10 bg-panel/70 p-5 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center">
        <p className="text-sm font-semibold text-white">
          Kathmandu <span className="block font-normal text-muted">10:00–18:00 NPT</span>
        </p>
        <Bar segs={nepal} overlap={overlap} tone="nepal" />
        <p className="mt-2 text-sm font-semibold text-white sm:mt-0">
          {city}{" "}
          <span className="block font-normal text-muted">
            09:00–17:00 local = {fmt(OPEN_CLIENT + shift)}–{fmt(CLOSE_CLIENT + shift)} NPT
          </span>
        </p>
        <Bar segs={client} overlap={overlap} tone="client" />
        <span className="hidden sm:block" />
        <div aria-hidden className="flex justify-between font-mono text-[11px] text-white/35">
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
            <span key={h}>{String(h).padStart(2, "0")}</span>
          ))}
        </div>
      </div>
      <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-muted">
        <span>
          <strong className="font-display text-2xl text-accent">{total > 0 ? dur(total) : "No"}</strong>{" "}
          {total > 0 ? "of shared office hours every weekday" : "shared office hours, so we work async-first"}
        </span>
        <span>
          Nepal is {dur(Math.abs(shift))} {shift >= 0 ? "ahead of" : "behind"} {tzLabel} (standard time).
        </span>
      </figcaption>
    </figure>
  );
}

const pct = (h: number) => `${(h / 24) * 100}%`;

function Bar({ segs, overlap, tone }: { segs: Seg[]; overlap: Seg[]; tone: "nepal" | "client" }) {
  return (
    <div className="relative h-9 rounded-lg bg-white/[0.04]">
      {segs.map(([s, e]) => (
        <span
          key={s}
          className={`absolute inset-y-0 rounded-lg ${tone === "nepal" ? "bg-white/25" : "border border-white/30 bg-white/[0.08]"}`}
          style={{ left: pct(s), width: pct(e - s) }}
        />
      ))}
      {overlap.map(([s, e]) => (
        <span key={`o${s}`} className="absolute inset-y-0 rounded-lg bg-accent/80" style={{ left: pct(s), width: pct(e - s) }} />
      ))}
    </div>
  );
}
