"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/types";

const content = {
  es: {
    tag: "¿Te suena familiar?",
    title1: "Tienes datos.",
    title2: "No tienes claridad.",
    sub: "Tus datos hablan. El problema es que nadie los está escuchando.",
    cta: "Ver Cómo lo Resolvemos →",
    pains: [
      { title: "Datos en todas partes",       desc: "Tu información vive en 10 herramientas distintas sin comunicarse entre sí." },
      { title: "Sin una verdad única",         desc: "Cada área tiene sus propios números. ¿Quién tiene la razón?" },
      { title: "Decisiones a ciegas",          desc: "La dirección decide con intuición porque los datos llegan tarde o incompletos." },
      { title: "Datos que no te pertenecen",   desc: "Tus herramientas retienen tu información y te cobran por acceder a ella." },
    ],
  },
  en: {
    tag: "Sound familiar?",
    title1: "You have data.",
    title2: "You lack clarity.",
    sub: "Your data speaks. The problem is no one is listening.",
    cta: "See How We Fix It →",
    pains: [
      { title: "All over the place",           desc: "Your data lives in 10 different tools with no connection between them." },
      { title: "No single source of truth",    desc: "Every department has different numbers. Who's right?" },
      { title: "Always one step behind",       desc: "By the time you get the report, the moment has already passed." },
      { title: "Your data, someone else's hands", desc: "Switch tools and lose everything. Or worse — pay extra to export what's already yours." },
    ],
  },
};

const IconScattered = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {/* 4 nodes */}
    <circle cx="4" cy="4" r="2.5" fill="currentColor" style={{ animation: "iconNodePulse 2.2s ease-in-out infinite" }} />
    <circle cx="20" cy="4" r="2.5" fill="currentColor" style={{ animation: "iconNodePulse 2.2s ease-in-out 0.5s infinite" }} />
    <circle cx="4" cy="20" r="2.5" fill="currentColor" style={{ animation: "iconNodePulse 2.2s ease-in-out 1.1s infinite" }} />
    <circle cx="20" cy="20" r="2.5" fill="currentColor" style={{ animation: "iconNodePulse 2.2s ease-in-out 1.7s infinite" }} />
    {/* Broken connecting lines */}
    <line x1="6.5" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    <line x1="14" y1="4" x2="17.5" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    <line x1="4" y1="6.5" x2="4" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    <line x1="4" y1="14" x2="4" y2="17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    <line x1="20" y1="6.5" x2="20" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
    <line x1="20" y1="14" x2="20" y2="17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
  </svg>
);

const IconDiverge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {/* Two arrows pointing away from center */}
    <g style={{ animation: "iconDiverge 2s ease-in-out infinite" }}>
      <path d="M12 12 L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 6 L7 6 L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g style={{ animation: "iconDiverge 2s ease-in-out 1s infinite" }}>
      <path d="M12 12 L19 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 18 L17 18 L17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
  </svg>
);

const IconBlind = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {/* Dashed spinning circle — "loading forever" */}
    <circle
      cx="12" cy="12" r="8"
      stroke="currentColor" strokeWidth="1.5"
      strokeDasharray="6 6"
      strokeLinecap="round"
      style={{ animation: "iconDashSpin 3s linear infinite", transformOrigin: "12px 12px" }}
    />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1.8" fill="currentColor" opacity="0.5" />
    {/* Question line */}
    <line x1="12" y1="4" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {/* Shackle — animates up */}
    <path
      d="M8 11 L8 7 C8 4.8 16 4.8 16 7 L16 11"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      style={{ animation: "iconLockShake 2.5s ease-in-out infinite", transformOrigin: "12px 8px" }}
    />
    {/* Body */}
    <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    {/* Keyhole */}
    <circle cx="12" cy="15.5" r="1.5" fill="currentColor" opacity="0.5" />
    <line x1="12" y1="17" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const icons = [<IconScattered />, <IconDiverge />, <IconBlind />, <IconLock />];

function PainCard({ p, i }: { p: { title: string; desc: string }; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const tx = mouse && cardRef.current
    ? ((mouse.x / cardRef.current.offsetWidth) - 0.5) * 8
    : 0;
  const ty = mouse && cardRef.current
    ? ((mouse.y / cardRef.current.offsetHeight) - 0.5) * 8
    : 0;

  return (
    <div
      ref={cardRef}
      className="card p-6 reveal-card flex flex-col gap-3"
      style={{
        transitionDelay: `${i * 0.1}s`,
        position: "relative",
        overflow: "hidden",
        transform: hovered ? `translate(${tx}px, ${ty}px) scale(1.03)` : "translate(0,0) scale(1)",
        transition: hovered
          ? "transform 0.12s ease, box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: hovered ? "0 12px 40px rgba(0,71,255,0.18)" : undefined,
        borderColor: hovered ? "rgba(0,71,255,0.35)" : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse(null); }}
    >
      {/* Spotlight glow */}
      {mouse && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(260px circle at ${mouse.x}px ${mouse.y}px, rgba(0,71,255,0.13) 0%, transparent 70%)`,
            pointerEvents: "none",
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: hovered ? "rgba(0,71,255,0.15)" : "var(--accent-light)",
          color: "var(--accent)",
          transition: "background 0.3s ease",
        }}
      >
        {icons[i]}
      </div>
      <h4 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
        {p.title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {p.desc}
      </p>
    </div>
  );
}

export default function Problem({ lang = "es" }: { lang?: Lang }) {
  const tx = content[lang];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-card, .reveal-left").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 overflow-hidden" ref={ref}>
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="reveal-left flex flex-col gap-6">
            <span className="tag-pill">{tx.tag}</span>
            <h2
              className="font-display font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "var(--text-primary)" }}
            >
              {tx.title1}
              <br />
              <span className="text-gradient">{tx.title2}</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tx.sub}
            </p>
            <a href="#servicios" className="btn-primary w-fit">{tx.cta}</a>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tx.pains.map((p, i) => (
              <PainCard key={i} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
