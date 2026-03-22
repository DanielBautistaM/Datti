"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/types";

const t = {
  es: {
    title1: "El poder de",
    title2: "controlar tus datos.",
    sub1: "Datos sin sistema es dinero que se escapa. Construimos la infraestructura para que ",
    subBold: "cada número cuente",
    sub2: " y cada decisión sea tuya.",
    cta1: "Tomar el Control →",
    cta2: "Ver Paquetes",
  },
  en: {
    title1: "The power of",
    title2: "owning your data.",
    sub1: "Scattered data is money left on the table. We build the infrastructure so ",
    subBold: "every number counts",
    sub2: " and every decision is yours.",
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


      {/* Mouse follow glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(460px circle at var(--mx) var(--my), rgba(0,71,255,0.06), transparent 60%)" }}
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
          {tx.sub1}<strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{tx.subBold}</strong>{tx.sub2}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 mt-1"
          style={{ opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.48s forwards" }}
        >
          <a href={lang === "es" ? "/agendar" : "/schedule"} className="btn-primary text-base">{tx.cta1}</a>
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
