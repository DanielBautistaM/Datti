"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/types";
import { useTheme } from "@/context/ThemeContext";

const CAL_USER = "datti";
const CAL_EVENT = "30min";

const content = {
  es: {
    tag: "Agenda",
    title1: "Hablemos de",
    title2: "tus datos.",
    sub: "30 minutos. Sin costo. Te decimos exactamente qué necesita tu empresa y cómo lograrlo.",
  },
  en: {
    tag: "Book a Call",
    title1: "Let's talk about",
    title2: "your data.",
    sub: "30 minutes. No cost. We'll tell you exactly what your business needs and how to get there.",
  },
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/datti",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:team@datti.co",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

export default function Booking({ lang = "es" }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const tx = content[lang];
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const calTheme = theme === "dark" ? "dark" : "light";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  const calSrc = `https://cal.com/${CAL_USER}/${CAL_EVENT}?embed=true&theme=${calTheme}&brandColor=%235C4DFF&layout=month_view`;

  return (
    <section className="relative py-20 px-6 overflow-hidden" ref={ref}>
      <div
        className="orb"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(92,77,255,0.09) 0%, transparent 70%)",
          top: "0%", right: "-5%", filter: "blur(80px)",
          animation: "float 11s ease-in-out infinite",
        }}
      />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="tag-pill justify-center">{tx.tag}</span>
          <h2
            className="font-display font-black leading-tight mt-5 mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "var(--text-primary)" }}
          >
            {tx.title1}{" "}
            <span className="text-gradient">{tx.title2}</span>
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            {tx.sub}
          </p>
        </div>

        {/* Calendar */}
        <div
          className="reveal"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-lg)",
            height: 600,
          }}
        >
          {mounted && (
            <iframe
              key={`${calTheme}-${lang}`}
              src={calSrc}
              style={{ width: "100%", height: 755, border: "none", display: "block" }}
              loading="lazy"
            />
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-10 reveal">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)")}
            >
              {s.icon}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
