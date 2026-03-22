"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/types";

const faqs = [
  {
    q: "¿Cuánto tiempo toma ver resultados?",
    a: "Desde la primera semana ya tienes visibilidad de tus datos clave. La implementación completa toma entre 2 y 6 semanas según el plan.",
  },
  {
    q: "¿Necesito un equipo técnico propio?",
    a: "No. Nosotros construimos, configuramos y te entregamos todo funcionando. Solo necesitas a alguien que quiera usar los dashboards.",
  },
  {
    q: "¿Qué pasa si ya tengo herramientas de datos?",
    a: "Perfecto — las conectamos. Trabajamos con cualquier fuente: Google Sheets, Salesforce, bases de datos propias, ERPs, APIs y más.",
  },
  {
    q: "¿Los datos siguen siendo míos?",
    a: "100%. Todo se construye en tu infraestructura. Cuando terminamos, tienes acceso completo y no dependes de nosotros para nada.",
  },
  {
    q: "¿Necesito servidores o infraestructura propia?",
    a: "No. Trabajamos 100% en la nube — BigQuery, Snowflake, AWS, Google Cloud — según lo que mejor se adapte a tu empresa. Sin servidores propios, sin costos de hardware.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí. Los planes son mes a mes, sin contratos largos. Puedes escalar o ajustar en cualquier momento.",
  },
  {
    q: "¿Cómo es el proceso para empezar?",
    a: "Agendamos una llamada de 30 min sin costo. Revisamos tu situación, te recomendamos el plan ideal y arrancamos esa misma semana.",
  },
  {
    q: "¿Tienes alguna otra pregunta?",
    a: "Escríbenos directamente — respondemos en menos de 24 horas.",
    email: true,
  },
];

const faqsEn = [
  { q: "How long does it take to see results?", a: "From the first week you'll have visibility into your key data. Full implementation takes 2 to 6 weeks depending on the plan." },
  { q: "Do I need my own technical team?", a: "No. We build, configure, and deliver everything fully working. You just need someone who wants to use the dashboards." },
  { q: "What if I already have data tools?", a: "Perfect — we connect them. We work with any source: Google Sheets, Salesforce, your own databases, ERPs, APIs, and more." },
  { q: "Does my data stay mine?", a: "100%. Everything is built on your infrastructure. When we're done, you have full access and don't depend on us for anything." },
  { q: "Do I need my own servers or infrastructure?", a: "No. We work 100% in the cloud — BigQuery, Snowflake, AWS, Google Cloud — whatever best fits your company. No servers, no hardware costs." },
  { q: "Can I change plans later?", a: "Yes. Plans are month-to-month with no long contracts. You can scale or adjust at any time." },
  { q: "How does the process to start work?", a: "We schedule a free 30-min call. We review your situation, recommend the ideal plan, and start that same week." },
  { q: "Have another question?", a: "Contact us — we respond in less than 24 hours.", email: true },
];

const uiText = {
  es: {
    tag: "¿Tienes dudas?",
    title1: "Preguntas",
    title2: "frecuentes.",
    emailCopy: "Contáctanos — te respondemos en menos de 24 horas.",
  },
  en: {
    tag: "Questions?",
    title1: "Frequently asked",
    title2: "questions.",
    emailCopy: "Contact us — we respond in less than 24 hours.",
  },
};

type FaqItem = { q: string; a: string; email?: boolean };

export default function CTA({ lang = "es" }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const tx = uiText[lang];
  const activeFaqs: FaqItem[] = lang === "en" ? faqsEn : faqs;

  useEffect(() => {
    const ob = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <section id="contacto" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="orb" style={{
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(0,71,255,0.08) 0%, transparent 70%)",
        bottom: "-20%", left: "-10%", filter: "blur(80px)",
        animation: "float 9s ease-in-out infinite",
      }} />

      <div className="max-w-2xl mx-auto">

        {/* Header centrado */}
        <div className="text-center mb-12 reveal">
          <span className="tag-pill justify-center">{tx.tag}</span>
          <h2
            className="font-display font-black leading-tight mt-5 mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
          >
            {tx.title1}{" "}
            <span className="text-gradient">{tx.title2}</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {tx.emailCopy}
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="flex flex-col reveal">
          {activeFaqs.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.q}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{
                    flexShrink: 0,
                    color: "var(--accent)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>

              <div style={{ maxHeight: open === i ? "240px" : "0", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                <div className="pb-5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {(item as FaqItem & { email?: boolean }).email ? (
                    <div className="flex flex-col gap-3">
                      <p style={{ color: "var(--text-secondary)" }}>
                        {tx.emailCopy}
                      </p>
                      <a
                        href="mailto:team@datti.co"
                        className="flex items-center gap-2 w-fit font-semibold"
                        style={{ color: "var(--accent)", textDecoration: "none" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M2 7l10 7 10-7" />
                        </svg>
                        team@datti.co
                      </a>
                    </div>
                  ) : item.a}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
