"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Lang } from "@/lib/types";

const pasos = [
  {
    n: "01", titulo: "Auditoría",
    desc: "Mapeamos cada fuente de datos, herramienta y flujo.",
    extra: [
      "Inventario completo de herramientas y fuentes",
      "Identificamos datos duplicados o perdidos",
      "Mapa de flujos actuales vs. flujos ideales",
      "Reporte de hallazgos con prioridades claras",
    ],
  },
  {
    n: "02", titulo: "Diseño",
    desc: "Construimos la arquitectura ideal para tu empresa.",
    extra: [
      "Arquitectura cloud sin vendor lock-in",
      "Selección de tecnologías según tu stack actual",
      "Modelo de datos limpio y escalable",
      "Plan de implementación semana a semana",
    ],
  },
  {
    n: "03", titulo: "Construcción",
    desc: "Pipelines, bodegas y dashboards en producción.",
    extra: [
      "Pipelines automatizados y monitoreados",
      "Data warehouse o lakehouse configurado",
      "Dashboards listos desde la semana uno",
      "Testing y validación de calidad de datos",
    ],
  },
  {
    n: "04", titulo: "Control",
    desc: "Te entregamos la llave. Todo tuyo, para siempre.",
    extra: [
      "Documentación completa del sistema",
      "Capacitación al equipo que lo va a usar",
      "Acceso total sin dependencias externas",
      "Soporte post-entrega incluido",
    ],
  },
];

const pasosEn = [
  {
    n: "01", titulo: "Audit",
    desc: "We map every data source, tool, and workflow.",
    extra: [
      "Complete tool and source inventory",
      "We identify duplicate or missing data",
      "Map of current vs. ideal flows",
      "Findings report with clear priorities",
    ],
  },
  {
    n: "02", titulo: "Design",
    desc: "We build the ideal architecture for your business.",
    extra: [
      "Cloud architecture with no vendor lock-in",
      "Technology selection based on your current stack",
      "Clean and scalable data model",
      "Week-by-week implementation plan",
    ],
  },
  {
    n: "03", titulo: "Build",
    desc: "Pipelines, warehouses, and dashboards in production.",
    extra: [
      "Automated and monitored pipelines",
      "Configured data warehouse or lakehouse",
      "Dashboards ready from week one",
      "Data quality testing and validation",
    ],
  },
  {
    n: "04", titulo: "Control",
    desc: "We hand you the keys. All yours, forever.",
    extra: [
      "Complete system documentation",
      "Training for the team that will use it",
      "Full access with no external dependencies",
      "Post-delivery support included",
    ],
  },
];

const uiContent = {
  es: {
    tag: "Cómo Funciona",
    title1: "Del caos a la",
    title2: "claridad.",
    sub: "4 pasos. Resultados reales. Tu equipo siempre informado.",
  },
  en: {
    tag: "How It Works",
    title1: "From chaos to",
    title2: "clarity.",
    sub: "4 steps. Real results. Your team always informed.",
  },
};

const colors = ["#0047FF", "#5870FF", "#3A5AFF", "#4460FF"];
const STEP = 80;

/* ── Each card manages its OWN hover state — no cross-card interference ── */
function StepCard({
  s, i, color, circleRef,
}: {
  s: { n: string; titulo: string; desc: string; extra: string[] };
  i: number;
  color: string;
  circleRef: (el: HTMLDivElement | null) => void;
}) {
  const [on, setOn] = useState(false);

  return (
    <div
      className="card h-full p-6"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        cursor: "default",
        overflow: "hidden",
        transform: on ? "scale(1.04)" : "scale(1)",
        borderColor: on ? color + "70" : undefined,
        boxShadow: on
          ? `0 20px 60px ${color}22, 0 4px 14px ${color}12`
          : undefined,
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Step circle */}
      <div className="flex justify-center md:justify-start mb-4">
        <div
          ref={circleRef}
          style={{
            width: 44, height: 44,
            borderRadius: "50%",
            background: on ? color : "var(--bg-card)",
            border: `1.5px solid ${color}`,
            boxShadow: on ? `0 0 0 6px ${color}22` : `0 0 0 5px ${color}14`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.72rem", fontWeight: 700,
            color: on ? "#fff" : color,
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          {s.n}
        </div>
      </div>

      <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        {s.titulo}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {s.desc}
      </p>

      {/* Expanded content */}
      <div style={{
        maxHeight: on ? "260px" : "0px",
        opacity: on ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
      }}>
        <ul className="flex flex-col gap-2 mt-4 pt-4"
          style={{ borderTop: `1px solid ${color}22` }}>
          {s.extra.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-xs leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                transform: on ? "translateY(0)" : "translateY(6px)",
                opacity: on ? 1 : 0,
                transition: `transform 0.3s ease ${j * 0.07 + 0.05}s, opacity 0.3s ease ${j * 0.07 + 0.05}s`,
              }}
            >
              <span style={{ color, marginTop: 1, flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Accent line */}
      <div
        className="mt-4 h-[3px] rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          width: on ? "100%" : "32px",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

/* ── Main section ── */
export default function Process({ lang = "es" }: { lang?: Lang }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const [visible, setVisible] = useState(false);
  const [pathD, setPathD]     = useState("");

  const tx = uiContent[lang];
  const activePasos = lang === "en" ? pasosEn : pasos;

  const computePath = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const pts = circleRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - svgRect.left, y: r.top + r.height / 2 - svgRect.top };
    });
    if (pts.some((p) => !p)) return;
    const p = pts as { x: number; y: number }[];
    let d = `M ${p[0].x},${p[0].y}`;
    for (let i = 1; i < p.length; i++) d += ` H ${p[i].x} V ${p[i].y}`;
    setPathD(d);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardOb = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    section.querySelectorAll(".reveal").forEach((el) => cardOb.observe(el));

    const secOb = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        setTimeout(computePath, 80);
        secOb.disconnect();
      }
    }, { threshold: 0.08 });
    secOb.observe(section);

    const ro = new ResizeObserver(() => setTimeout(computePath, 60));
    ro.observe(section);

    return () => { cardOb.disconnect(); secOb.disconnect(); ro.disconnect(); };
  }, [computePath]);

  return (
    <section id="proceso" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 reveal">
          <span className="tag-pill">{tx.tag}</span>
          <h2
            className="font-display font-black mt-5 mb-4 leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", color: "var(--text-primary)" }}
          >
            {tx.title1}{" "}
            <span className="text-gradient">{tx.title2}</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {tx.sub}
          </p>
        </div>

        <div className="relative" style={{ paddingBottom: STEP * 3 + 20 }}>

          {/* SVG connector */}
          <svg
            ref={svgRef}
            className="hidden md:block absolute inset-0 w-full pointer-events-none overflow-visible"
            style={{ height: "100%", zIndex: 0 }}
          >
            <defs>
              <linearGradient id="stairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0047FF" />
                <stop offset="100%" stopColor="#4460FF" />
              </linearGradient>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {pathD && (
              <>
                <path d={pathD} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" />
                <path d={pathD} fill="none" stroke="url(#stairGrad)" strokeWidth="1.5" strokeLinecap="round" className="process-path" />
                {visible && (
                  <circle r="5.5" filter="url(#dotGlow)">
                    <animate attributeName="fill" values="#0047FF;#3A5AFF;#4460FF;#0047FF" dur="3s" repeatCount="indefinite" />
                    <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#stair-path" />
                    </animateMotion>
                  </circle>
                )}
                <path id="stair-path" d={pathD} fill="none" stroke="none" />
              </>
            )}
          </svg>

          {/* Cards — each is its own component with isolated state */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5" style={{ position: "relative", zIndex: 1, alignItems: "start" }}>
            {activePasos.map((s, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  transform: `translateY(${i * STEP}px)`,
                }}
              >
                <StepCard
                  s={s}
                  i={i}
                  color={colors[i]}
                  circleRef={(el) => { circleRefs.current[i] = el; }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
