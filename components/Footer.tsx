"use client";

import Logo from "./Logo";
import type { Lang } from "@/lib/types";

const navLinks = {
  es: [
    { label: "Inicio",    href: "#" },
    { label: "Servicios", href: "#servicios" },
    { label: "Control",   href: "#por-que" },
    { label: "Proceso",   href: "#proceso" },
  ],
  en: [
    { label: "Home",     href: "#" },
    { label: "Services", href: "#servicios" },
    { label: "Results",  href: "#por-que" },
    { label: "Process",  href: "#proceso" },
  ],
};

const copyright = {
  es: `© ${new Date().getFullYear()} Datti. Todos los derechos reservados.`,
  en: `© ${new Date().getFullYear()} Datti. All rights reserved.`,
};

export default function Footer({ lang = "es" }: { lang?: Lang }) {
  const links = [
    ...navLinks[lang],
    { label: "team@datti.co", href: "mailto:team@datti.co", accent: true },
  ];

  return (
    <footer className="relative py-14 px-6">
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div className="flex flex-col gap-2">
            <Logo size="sm" />
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              El control de tus datos, en tus manos.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors"
                style={{ color: (l as { accent?: boolean }).accent ? "var(--accent)" : "var(--text-muted)", fontWeight: (l as { accent?: boolean }).accent ? 600 : 400 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = (l as { accent?: boolean }).accent ? "var(--accent-dark)" : "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = (l as { accent?: boolean }).accent ? "var(--accent)" : "var(--text-muted)")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="divider mb-6" />

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {copyright[lang]}
        </p>
      </div>
    </footer>
  );
}
