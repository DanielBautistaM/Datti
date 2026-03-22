"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/types";

const content = {
  es: {
    tag: "Planes",
    title1: "Elige tu nivel de",
    title2: "control.",
    sub: "Sin contratos largos. Sin letras pequeñas. Solo resultados. Cada plan incluye llamada de onboarding directa con nuestro equipo.",
    bottomText: "¿No sabes cuál elegir?",
    bottomLink: "Agendamos una llamada gratuita de 30 min",
    bottomSuffix: "y te recomendamos el plan ideal para tu empresa.",
  },
  en: {
    tag: "Plans",
    title1: "Choose your level of",
    title2: "control.",
    sub: "No long contracts. No fine print. Just results. Every plan includes a direct onboarding call with our team.",
    bottomText: "Not sure which to pick?",
    bottomLink: "Schedule a free 30-min call",
    bottomSuffix: "and we'll recommend the ideal plan for your business.",
  },
};

const planes = [
  {
    nombre: "Esencial",
    tagline: "Tu primer paso hacia el control",
    precio: "$900.000",
    descripcion: "Para empresas que quieren dejar de adivinar y empezar a ver sus datos.",
    popular: false,
    color: "#0047FF",
    cta: "Empezar Ahora",
    caracteristicas: [
      "Auditoría de datos inicial",
      "1 pipeline de datos automatizado",
      "Dashboard con 5 métricas clave",
      "Conexión hasta 3 fuentes de datos",
      "Reporte mensual de insights",
      "Soporte por email",
    ],
    no_incluye: ["Análisis predictivo", "Soporte 24/7"],
  },
  {
    nombre: "Control",
    tagline: "El control que tu empresa merece",
    precio: "$2.500.000",
    descripcion: "Para empresas que quieren tomar decisiones basadas en datos, no en corazonadas.",
    popular: true,
    color: "#0047FF",
    cta: "Tomar el Control",
    caracteristicas: [
      "Todo lo de Esencial +",
      "Hasta 5 pipelines de datos",
      "Dashboards ilimitados",
      "Integración hasta 10 fuentes",
      "Alertas automáticas de anomalías",
      "Modelo de datos unificado",
      "Soporte prioritario (24 hrs)",
      "Reunión mensual de estrategia",
    ],
    no_incluye: [],
  },
  {
    nombre: "Dominio",
    tagline: "Domina tu información completamente",
    precio: "$7.500.000",
    descripcion: "Para empresas que quieren una ventaja competitiva real basada en sus datos.",
    popular: false,
    color: "#3A5AFF",
    cta: "Hablar con un Experto",
    caracteristicas: [
      "Todo lo de Control +",
      "Pipelines ilimitados",
      "Data warehouse dedicado",
      "Análisis predictivo con ML",
      "Integraciones ilimitadas",
      "Automatización de reportes",
      "Soporte 24/7",
      "2 reuniones estratégicas/mes",
      "Capacitación al equipo",
    ],
    no_incluye: [],
  },
  {
    nombre: "Elite",
    tagline: "Infraestructura completa a tu medida",
    precio: "A convenir",
    descripcion: "Para empresas que quieren su propio equipo de datos sin contratarlo.",
    popular: false,
    color: "#0047FF",
    cta: "Agendar Consultoría",
    caracteristicas: [
      "Todo lo de Dominio +",
      "Equipo de datos dedicado",
      "Arquitectura de datos propia",
      "SLA garantizado 99.9%",
      "Integración con cualquier sistema",
      "Chief Data Officer on-demand",
      "Consultoría estratégica continua",
      "Entrenamiento completo al equipo",
    ],
    no_incluye: [],
    esCustom: true,
  },
];

const planesEn = [
  {
    nombre: "Essential",
    tagline: "Your first step toward control",
    precio: "$900.000",
    descripcion: "For companies ready to stop guessing and start seeing their data.",
    popular: false,
    color: "#0047FF",
    cta: "Start Now",
    caracteristicas: [
      "Initial data audit",
      "1 automated data pipeline",
      "Dashboard with 5 key metrics",
      "Connect up to 3 data sources",
      "Monthly insights report",
      "Email support",
    ],
    no_incluye: ["Predictive analytics", "24/7 support"],
  },
  {
    nombre: "Control",
    tagline: "The control your business deserves",
    precio: "$2.500.000",
    descripcion: "For companies ready to make decisions based on data, not gut feeling.",
    popular: true,
    color: "#0047FF",
    cta: "Take Control",
    caracteristicas: [
      "Everything in Essential +",
      "Up to 5 data pipelines",
      "Unlimited dashboards",
      "Up to 10 source integrations",
      "Automatic anomaly alerts",
      "Unified data model",
      "Priority support (24 hrs)",
      "Monthly strategy meeting",
    ],
    no_incluye: [],
  },
  {
    nombre: "Mastery",
    tagline: "Full command of your data",
    precio: "$7.500.000",
    descripcion: "For companies that want a real competitive edge powered by their data.",
    popular: false,
    color: "#3A5AFF",
    cta: "Talk to an Expert",
    caracteristicas: [
      "Everything in Control +",
      "Unlimited pipelines",
      "Dedicated data warehouse",
      "Predictive analytics with ML",
      "Unlimited integrations",
      "Automated reporting",
      "24/7 support",
      "2 strategy meetings/month",
      "Team training",
    ],
    no_incluye: [],
  },
  {
    nombre: "Elite",
    tagline: "Complete infrastructure, built for you",
    precio: "Custom",
    descripcion: "For companies that want their own data team without hiring one.",
    popular: false,
    color: "#0047FF",
    cta: "Schedule a Consultation",
    caracteristicas: [
      "Everything in Mastery +",
      "Dedicated data team",
      "Custom data architecture",
      "99.9% SLA guaranteed",
      "Integration with any system",
      "On-demand Chief Data Officer",
      "Ongoing strategic consulting",
      "Full team training",
    ],
    no_incluye: [],
    esCustom: true,
  },
];

const WA_NUMBER = "521234567890";
const waLink = (plan: string) =>
  `https://wa.me/${WA_NUMBER}?text=Hola%20Datti%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan)}`;

const CHECK = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.2" />
    <path d="M5 8l2 2.5 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const X_ICON = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.15" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

type PlanShape = {
  nombre: string;
  tagline: string;
  precio: string;
  descripcion: string;
  popular: boolean;
  color: string;
  cta: string;
  caracteristicas: string[];
  no_incluye: string[];
  esCustom?: boolean;
};

function CardContent({ p, lang }: { p: PlanShape; lang: Lang }) {
  const popularLabel = lang === "es" ? "Más Popular" : "Most Popular";
  return (
    <div className="flex flex-col h-full p-7">

      {/* Section 1: Badge + tagline — fixed height */}
      <div style={{ minHeight: 68 }} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block"
            style={{
              background: `${p.color}12`,
              color: p.color,
              border: `1px solid ${p.color}20`,
            }}
          >
            {p.nombre}
          </span>
          {p.popular && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full text-white whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #0047FF, #3A5AFF)",
                boxShadow: "0 2px 8px rgba(0,71,255,0.35)",
              }}
            >
              {/* Sparkle SVG */}
              <svg
                width="10" height="10" viewBox="0 0 12 12" fill="currentColor"
                style={{ animation: "sparkleRotate 2.5s ease-in-out infinite" }}
              >
                <path d="M6 0 L6.7 4.3 L11 6 L6.7 7.7 L6 12 L5.3 7.7 L1 6 L5.3 4.3 Z" />
              </svg>
              {popularLabel}
            </span>
          )}
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {p.tagline}
        </p>
      </div>

      {/* Section 2: Price — fixed height */}
      <div style={{ minHeight: 72 }} className="mb-3">
        <div className="flex items-baseline gap-2">
        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: p.esCustom ? "1.9rem" : "2.4rem",
            color: p.popular ? "var(--accent)" : "var(--text-primary)",
          }}
        >
          {p.precio}
        </span>
        {!p.esCustom && (
          <span className="text-xs font-bold tracking-widest" style={{ color: "var(--text-muted)" }}>COP</span>
        )}
        </div>
      </div>

      {/* Section 3: Description — fixed height */}
      <div style={{ minHeight: 72 }} className="mb-5">
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {p.descripcion}
        </p>
      </div>

      {/* CTA */}
      <a
        href={waLink(p.nombre)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${p.popular ? "btn-primary" : "btn-ghost"} w-full text-sm mb-5`}
        style={{ borderRadius: "10px" }}
      >
        {p.cta} →
      </a>

      {/* Divider */}
      <div className="divider mb-4" />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {p.caracteristicas.map((f, j) => (
          <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--accent)" }}>{CHECK}</span>
            {f}
          </li>
        ))}
        {p.no_incluye?.map((f, j) => (
          <li key={`no-${j}`} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>{X_ICON}</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services({ lang = "es" }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);

  const tx = content[lang];
  const activePlanes = lang === "en" ? planesEn : planes;

  useEffect(() => {
    const ob = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-card").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <section id="servicios" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {activePlanes.map((p, i) =>
            p.popular ? (
              /* Popular card — snake border wrapper */
              <div
                key={i}
                className="snake-wrap reveal-card"
                style={{ transitionDelay: `${i * 0.1}s`, position: "relative" }}
              >
                <div className="snake-inner relative">
                  <CardContent p={p} lang={lang} />
                </div>
              </div>
            ) : (
              /* Regular card */
              <div
                key={i}
                className="card reveal-card flex flex-col"
                style={{ transitionDelay: `${i * 0.1}s`, position: "relative" }}
              >
                <CardContent p={p} lang={lang} />
              </div>
            )
          )}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm mt-8 reveal" style={{ color: "var(--text-muted)" }}>
          {tx.bottomText}{" "}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hola%20Datti%2C%20necesito%20ayuda%20para%20elegir%20un%20plan`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            {tx.bottomLink}
          </a>{" "}
          {tx.bottomSuffix}
        </p>
      </div>
    </section>
  );
}
