"use client";

import { useEffect, useRef } from "react";

export default function TitleBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="divider absolute bottom-0 left-0 right-0" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="orb" style={{
        width: 450, height: 450,
        background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)",
        top: "50%", left: "65%", transform: "translate(-50%,-50%)", filter: "blur(60px)",
        animation: "float 8s ease-in-out infinite",
      }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — editorial title */}
          <div className="flex flex-col gap-4 reveal">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Plataforma de Datos para Pymes
            </p>
            <h2
              className="font-display font-black leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "var(--text-primary)" }}
            >
              Todos tus datos.
              <br />
              <span className="text-gradient">Control total.</span>
            </h2>
          </div>

          {/* Right — pipeline mini-visual */}
          <div className="flex flex-col gap-8 reveal" style={{ transitionDelay: "0.15s" }}>
            <p className="text-xl leading-relaxed" style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
              Una sola plataforma para ingestar, transformar y convertir tus datos
              en decisiones que mueven tu negocio.
            </p>

            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between gap-2">
                {[
                  { emoji: "🗄️", count: "Todo", label: "Tus Fuentes" },
                  null,
                  { emoji: "⚡", count: "Automático", label: "Pipeline" },
                  null,
                  { emoji: "📊", count: "En Vivo", label: "Insights" },
                ].map((item, i) =>
                  item === null ? (
                    <div key={i} className="flex-1 flex items-center">
                      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)", opacity: 0.25 }} />
                      <svg width="10" height="10" viewBox="0 0 10 8" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M0 4h7M4 1l4 3-4 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                      </svg>
                    </div>
                  ) : (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
                      >
                        {item.emoji}
                      </div>
                      <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{item.count}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
