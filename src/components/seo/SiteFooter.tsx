import Link from "next/link";
import { MARKETS } from "@/content/markets";
import { SERVICES_SEO } from "@/content/services-seo";
import { SITE } from "@/lib/site";
import { SERVICES } from "../services/data";

const TITLE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s.title]));

/** Site-wide footer: crawlable links to every service and market page, plus contact details (NAP). */
export default function SiteFooter() {
  const a = SITE.address;
  return (
    <footer className="border-t border-line px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold">
            {SITE.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            <Link href="/digital-growth-agency-nepal" className="text-white/80 underline decoration-white/20 underline-offset-4 hover:text-accent">
              Digital growth agency in Kathmandu, Nepal
            </Link>
            , working with businesses in Nepal, the USA, UK, Australia and the Middle East.
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-muted">
            {[a.street, a.locality, a.postalCode, "Nepal"].filter(Boolean).join(", ")}
            {SITE.phone && (
              <>
                <br />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </>
            )}
            {SITE.email && (
              <>
                <br />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </>
            )}
          </address>
        </div>

        <FooterList
          title="Services"
          links={SERVICES_SEO.map((s) => ({ href: `/services/${s.slug}`, label: TITLE_BY_ID[s.serviceId] }))}
        />
        <FooterList title="Where we work" links={[{ href: "/digital-growth-agency-nepal", label: "Nepal" }, ...MARKETS.map((m) => ({ href: `/markets/${m.slug}`, label: m.slug === "usa" ? "USA" : m.slug === "uk" ? "UK" : m.country.replace(/^the /, "") }))]} />
        <FooterList
          title="Studio"
          links={[
            { href: "/services", label: "Our services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/about-3", label: "About us" },
          ]}
        />
      </div>
      <p className="mx-auto mt-12 max-w-[1440px] font-mono text-[11px] text-white/35">
        © {SITE.name}, Kathmandu, Nepal.
      </p>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="font-display text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
