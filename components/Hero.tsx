"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/types";

const t = {
  es: {
    title1: "El poder de",
    title2: "controlar tus datos.",
    sub: (
      <>Datos sin sistema es dinero que se escapa. Construimos la infraestructura para que{" "}<strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>cada número cuente</strong>{" "}y cada decisión sea tuya.</>
    ),
    cta1: "Tomar el Control →",
    cta2: "Ver Paquetes",
  },
  en: {
    title1: "The power of",
    title2: "owning your data.",
    sub: (
      <>Scattered data is money left on the table. We build the infrastructure so{" "}<strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>every number counts</strong>{" "}and every decision is yours.</>
    ),
    cta1: "Take Control →",
    cta2: "View Plans",
  },
};

export default function Hero({ lang = "es" }: { lang?: Lang }) {
  const tx = t[lang];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("mousemove", h);
    return () => el.removeEventListener("mousemove", h);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-28 overflow-hidden"
      style={{ "--mx": "50%", "--my": "40%" } as React.CSSProperties}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.35] dark:opacity-[0.7] pointer-events-none" />

      {/* Left side light beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: "10%",
          width: 340,
          height: "80%",
          background: "linear-gradient(90deg, rgba(92,77,255,0.13) 0%, rgba(92,77,255,0.04) 60%, transparent 100%)",
          filter: "blur(40px)",
          borderRadius: "0 100% 100% 0",
          animation: "float 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: "25%",
          width: 160,
          height: "40%",
          background: "linear-gradient(90deg, rgba(123,111,255,0.18) 0%, transparent 100%)",
          filter: "blur(24px)",
          animation: "float 8s ease-in-out infinite 1.5s",
        }}
      />

      {/* Right side light beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: "15%",
          width: 340,
          height: "70%",
          background: "linear-gradient(270deg, rgba(155,77,255,0.12) 0%, rgba(155,77,255,0.04) 60%, transparent 100%)",
          filter: "blur(40px)",
          borderRadius: "100% 0 0 100%",
          animation: "float 13s ease-in-out infinite 0.8s",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: "35%",
          width: 160,
          height: "35%",
          background: "linear-gradient(270deg, rgba(184,127,255,0.16) 0%, transparent 100%)",
          filter: "blur(24px)",
          animation: "float 9s ease-in-out infinite 2.2s",
        }}
      />

      {/* Center ambient orb */}
      <div className="orb" style={{
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(92,77,255,0.07) 0%, transparent 70%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        filter: "blur(80px)",
        animation: "float 10s ease-in-out infinite",
      }} />

      {/* Mouse follow glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(460px circle at var(--mx) var(--my), rgba(92,77,255,0.06), transparent 60%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-7">

        {/* Headline */}
        <div style={{ opacity: 0, animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards" }}>
          <h1
            className="font-display font-black leading-[0.93] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
          >
            <span style={{ color: "var(--text-primary)", display: "block" }}>{tx.title1}</span>
            <span className="text-gradient" style={{ display: "block", marginTop: "0.04em" }}>
              {tx.title2}
            </span>
          </h1>
        </div>

        {/* Sub */}
        <p
          className="text-lg md:text-xl max-w-xl leading-relaxed"
          style={{
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.34s forwards",
            color: "var(--text-secondary)",
            fontWeight: 400,
          }}
        >
          {tx.sub}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 mt-1"
          style={{ opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.48s forwards" }}
        >
          <a href="#contacto" className="btn-primary text-base">{tx.cta1}</a>
          <a href="#servicios" className="btn-ghost text-base">{tx.cta2}</a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, animation: "fadeUp 0.5s ease 1.1s forwards" }}
      >
        <div
          className="w-6 h-9 rounded-full flex items-start justify-center pt-2"
          style={{ border: "1.5px solid var(--border-strong)" }}
        >
          <div
            style={{
              width: 4, height: 8, borderRadius: 2,
              background: "var(--accent)",
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
