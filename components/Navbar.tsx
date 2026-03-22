"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useTheme } from "@/context/ThemeContext";
import type { Lang } from "@/lib/types";

const t = {
  es: {
    links: [
      { label: "Inicio",    href: "#" },
      { label: "Servicios", href: "#servicios" },
      { label: "Proceso",   href: "#proceso" },
      { label: "Control",   href: "#por-que" },
    ],
    cta: "Agendar Llamada",
    ariaTheme: "Cambiar tema",
  },
  en: {
    links: [
      { label: "Home",     href: "#" },
      { label: "Services", href: "#servicios" },
      { label: "Process",  href: "#proceso" },
      { label: "Results",  href: "#por-que" },
    ],
    cta: "Book a Call",
    ariaTheme: "Toggle theme",
  },
};

export default function Navbar({ lang = "es", base = "" }: { lang?: Lang; base?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const tx = t[lang];
  const otherLang = lang === "es" ? "en" : "es";
  const href = (h: string) => h === "#" ? (base || "#") : `${base}${h}`;

  const langHref = (l: string) => {
    if (typeof window === "undefined") return `/${l}`;
    const pathname = window.location.pathname;

    // Standalone pages — switch between their equivalents
    if (pathname === "/agendar" || pathname === "/schedule") {
      return l === "es" ? "/agendar" : "/schedule";
    }

    // Main page — detect current visible section
    const sections = ["servicios", "por-que", "proceso", "contacto"];
    let currentHash = window.location.hash;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.1) {
          currentHash = `#${id}`;
          break;
        }
      }
    }
    return `/${l}${currentHash}`;
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
        <nav
          className="flex items-center gap-1 transition-all duration-400"
          style={{
            background: scrolled ? "var(--bg-card)" : "rgba(var(--bg-card, 255,255,255), 0.92)",
            border: "1px solid var(--border)",
            borderRadius: "100px",
            boxShadow: scrolled ? "var(--shadow-float)" : "var(--shadow-md)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "10px 12px 10px 20px",
            gap: 0,
          }}
        >
          {/* Logo */}
          <a href={base || "/"} className="flex items-center mr-6 flex-shrink-0">
            <Logo size="sm" />
          </a>

          {/* Separator */}
          <div className="hidden md:block w-px h-5 flex-shrink-0 mr-3" style={{ background: "var(--border-strong)" }} />

          {/* Links */}
          <div className="hidden md:flex items-center">
            {tx.links.map((l) => (
              <a
                key={l.href}
                href={href(l.href)}
                className="px-5 py-2.5 text-sm font-medium rounded-full transition-all whitespace-nowrap"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = "var(--text-primary)"; el.style.background = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = "var(--text-secondary)"; el.style.background = "transparent"; }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-5 flex-shrink-0 mx-3" style={{ background: "var(--border-strong)" }} />

          {/* Lang switcher — ES always left, EN always right */}
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full mr-1" style={{ border: "1px solid var(--border)" }}>
            {(["es", "en"] as const).map((l, idx) => (
              <span key={l} className="flex items-center gap-1">
                {idx > 0 && <span style={{ color: "var(--border-strong)", fontSize: "0.6rem" }}>·</span>}
                {l === lang ? (
                  <span className="text-xs font-bold" style={{ color: "var(--accent)", letterSpacing: "0.05em" }}>
                    {l.toUpperCase()}
                  </span>
                ) : (
                  <a
                    href={`/${l}`}
                    className="text-xs font-bold transition-colors"
                    style={{ color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}
                    onClick={(e) => { e.preventDefault(); window.location.href = langHref(l); }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; }}
                  >
                    {l.toUpperCase()}
                  </a>
                )}
              </span>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={tx.ariaTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 mr-2 transition-colors"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--bg-subtle)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            <div className="icon-sun-moon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ opacity: isDark ? 0 : 1, transform: isDark ? "rotate(45deg) scale(0.6)" : "rotate(0) scale(1)" }}>
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ opacity: isDark ? 1 : 0, transform: isDark ? "rotate(0) scale(1)" : "rotate(-45deg) scale(0.6)" }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </button>

          {/* CTA — fixed size based on longest text (Agendar Llamada) */}
          <a href={lang === "es" ? "/agendar" : "/schedule"} className="btn-dark text-sm flex-shrink-0" style={{ padding: "10px 20px", textAlign: "center", position: "relative" }}>
            <span style={{ visibility: "hidden", pointerEvents: "none" }}>Agendar Llamada</span>
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{tx.cta}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full ml-1"
            style={{ background: "var(--bg-subtle)", border: "none", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="relative w-4 h-3">
              <span className="absolute block w-full h-[1.5px] transition-all duration-300 origin-center"
                style={{ background: "var(--text-secondary)", top: menuOpen ? "50%" : "0px", transform: menuOpen ? "translateY(-50%) rotate(45deg)" : "none" }} />
              <span className="absolute block w-full h-[1.5px] transition-all duration-300"
                style={{ background: "var(--text-secondary)", top: "50%", transform: "translateY(-50%)", opacity: menuOpen ? 0 : 1 }} />
              <span className="absolute block w-full h-[1.5px] transition-all duration-300 origin-center"
                style={{ background: "var(--text-secondary)", top: menuOpen ? "50%" : "100%", transform: menuOpen ? "translateY(-50%) rotate(-45deg)" : "none" }} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile dropdown */}
      <div
        className="fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-300 overflow-hidden"
        style={{
          paddingTop: "90px",
          maxHeight: menuOpen ? "420px" : "0",
          background: "var(--bg-card)",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
          boxShadow: menuOpen ? "var(--shadow-lg)" : "none",
        }}
      >
        <div className="px-6 pb-6 flex flex-col gap-1">
          {tx.links.map((l) => (
            <a key={l.href} href={href(l.href)} onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}>
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <a href={lang === "es" ? "/agendar" : "/schedule"} className="btn-dark text-sm text-center flex-1" onClick={() => setMenuOpen(false)}>
              {tx.cta}
            </a>
            <div className="flex items-center justify-center gap-1 px-4 rounded-xl" style={{ border: "1px solid var(--border)" }}>
              {(["es", "en"] as const).map((l, idx) => (
                <span key={l} className="flex items-center gap-1">
                  {idx > 0 && <span style={{ color: "var(--border-strong)", fontSize: "0.6rem" }}>·</span>}
                  {l === lang ? (
                    <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{l.toUpperCase()}</span>
                  ) : (
                    <a href={`/${l}`} className="text-xs font-bold" style={{ color: "var(--text-muted)", textDecoration: "none" }}
                      onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.location.href = langHref(l); }}>
                      {l.toUpperCase()}
                    </a>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
