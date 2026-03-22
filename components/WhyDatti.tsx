"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/types";

const bubbles = [
  { value: "10×",   label: "ROI en 6 meses",            size: 220, accent: "#0047FF", dur: "7s",   delay: "0s"   },
  { value: "87%",   label: "menos decisiones a ciegas", size: 155, accent: "#3A5AFF", dur: "9s",   delay: "1.4s" },
  { value: "100%",  label: "ownership total",            size: 185, accent: "#5870FF", dur: "8s",   delay: "0.7s" },
  { value: "3×",    label: "más rápido reportar",        size: 130, accent: "#0047FF", dur: "10s",  delay: "2s"   },
  { value: "↓40%",  label: "costos operativos",          size: 145, accent: "#4460FF", dur: "6.5s", delay: "1s"   },
  { value: "5×",    label: "fuentes integradas",         size: 110, accent: "#3A5AFF", dur: "8.5s", delay: "1.7s" },
  { value: "∞",     label: "escalabilidad",              size: 95,  accent: "#0047FF", dur: "11s",  delay: "0.3s" },
  { value: "99.9%", label: "uptime",                     size: 120, accent: "#5870FF", dur: "7.5s", delay: "2.3s" },
  { value: "<1s",   label: "latencia",                   size: 100, accent: "#4460FF", dur: "9.5s", delay: "0.9s" },
];

const bubblesEn = [
  { value: "10×",   label: "ROI in 6 months",         size: 220, accent: "#0047FF", dur: "7s",   delay: "0s"   },
  { value: "87%",   label: "fewer blind decisions",    size: 155, accent: "#3A5AFF", dur: "9s",   delay: "1.4s" },
  { value: "100%",  label: "full ownership",           size: 185, accent: "#5870FF", dur: "8s",   delay: "0.7s" },
  { value: "3×",    label: "faster reporting",         size: 130, accent: "#0047FF", dur: "10s",  delay: "2s"   },
  { value: "↓40%",  label: "operating costs",         size: 145, accent: "#4460FF", dur: "6.5s", delay: "1s"   },
  { value: "5×",    label: "sources integrated",      size: 110, accent: "#3A5AFF", dur: "8.5s", delay: "1.7s" },
  { value: "∞",     label: "scalability",             size: 95,  accent: "#0047FF", dur: "11s",  delay: "0.3s" },
  { value: "99.9%", label: "uptime",                  size: 120, accent: "#5870FF", dur: "7.5s", delay: "2.3s" },
  { value: "<1s",   label: "latency",                 size: 100, accent: "#4460FF", dur: "9.5s", delay: "0.9s" },
];

const uiText = {
  es: {
    tag: "Por Qué Datti",
    title1: "No construimos reportes.",
    title2: "Construimos control.",
    p1: "Estos son los resultados reales que obtienen las empresas que dejan de improvisar con sus datos.",
    p2: "Cada métrica refleja lo que pasa cuando dejas de tomar decisiones a ciegas y empiezas a operar con información real, en tiempo real.",
    cta: "Ver planes →",
    mobileTitle1: "No construimos reportes.",
    mobileTitle2: "Construimos control.",
    mobileSub: "Resultados reales de empresas que dejaron de improvisar.",
  },
  en: {
    tag: "Why Datti",
    title1: "We don't build reports.",
    title2: "We build control.",
    p1: "These are the real results companies achieve when they stop improvising with their data.",
    p2: "Each metric reflects what happens when you stop making blind decisions and start operating with real, real-time information.",
    cta: "View plans →",
    mobileTitle1: "We don't build reports.",
    mobileTitle2: "We build control.",
    mobileSub: "Real results from companies that stopped improvising.",
  },
};

/*
  Positions mixed by size — big and small interleaved, no overlap.
  Container 560 × 550 px.
  Index order: 0(220), 1(155), 2(185), 3(130), 4(145), 5(110), 6(95), 7(120), 8(100)
*/
const positions = [
  { top: 5,   left: 5   }, // 0: 220 — top-left
  { top: 8,   left: 352 }, // 1: 155 — top-right
  { top: 138, left: 217 }, // 2: 185 — center
  { top: 265, left: 385 }, // 3: 130 — mid-right
  { top: 298, left: 127 }, // 4: 145 — mid-left
  { top: 405, left: 265 }, // 5: 110 — bottom-center
  { top: 443, left: 72  }, // 6: 95  — bottom-left
  { top: 280, left: 0   }, // 7: 120 — left-middle
  { top: 410, left: 440 }, // 8: 100 — bottom-right
];

type BubbleData = typeof bubbles[0];

function Bubble({ b, i, visible }: { b: BubbleData; i: number; visible: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: b.size / 2, y: b.size / 2 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const cx = b.size / 2;
  const cy = b.size / 2;
  const mx = hovered ? ((mouse.x - cx) / cx) * 8 : 0;
  const my = hovered ? ((mouse.y - cy) / cy) * 8 : 0;
  const pos = positions[i];
  const entranceDelay = `${i * 0.08}s`;

  return (
    /* Outer: position + entrance pop + hover magnetic */
    <div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: b.size,
        height: b.size,
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? `translate(${mx}px, ${my}px) scale(1.07)` : "translate(0,0) scale(1)")
          : "scale(0.55) translateY(18px)",
        filter: visible ? "blur(0px)" : "blur(8px)",
        transition: visible
          ? (hovered
              ? "transform 0.1s ease, opacity 0s, filter 0s"
              : `transform 0.65s cubic-bezier(0.34,1.4,0.64,1) ${entranceDelay}, opacity 0.55s ease ${entranceDelay}, filter 0.55s ease ${entranceDelay}`)
          : "none",
        zIndex: hovered ? 10 : 1,
        cursor: "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: cx, y: cy }); }}
    >
      {/* Inner: float animation + visual styling */}
      <div
        ref={wrapRef}
        className="flex flex-col items-center justify-center text-center rounded-full"
        style={{
          width: "100%",
          height: "100%",
          background: hovered
            ? `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, ${b.accent}38 0%, ${b.accent}14 55%, transparent 80%)`
            : `radial-gradient(circle at 38% 32%, ${b.accent}28 0%, ${b.accent}0a 65%, transparent 100%)`,
          border: `1.5px solid ${hovered ? b.accent + "65" : b.accent + "40"}`,
          boxShadow: hovered
            ? `0 0 40px ${b.accent}35, 0 0 80px ${b.accent}18, inset 0 1px 0 ${b.accent}30`
            : `0 6px 30px ${b.accent}18, inset 0 1px 0 ${b.accent}14`,
          ["--pulse-color" as string]: `${b.accent}28`,
          animation: visible
            ? `bubbleFloat ${b.dur} ease-in-out ${b.delay} infinite, bubblePulse ${parseFloat(b.dur) * 1.3}s ease-in-out ${b.delay} infinite`
            : "none",
          transition: "background 0.2s ease, border-color 0.25s ease, box-shadow 0.3s ease",
          position: "relative",
          padding: 14,
        }}
      >
        {/* Expanding ring on hover */}
        {hovered && (
          <div style={{
            position: "absolute", inset: -2, borderRadius: "50%",
            border: `1px solid ${b.accent}50`,
            animation: "bubbleRingExpand 0.9s ease-out forwards",
            pointerEvents: "none",
          }} />
        )}

        {/* Spotlight */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: `radial-gradient(100px circle at ${mouse.x}px ${mouse.y}px, ${b.accent}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: b.size > 200 ? "2.8rem" : b.size > 165 ? "2.2rem" : b.size > 130 ? "1.75rem" : b.size > 105 ? "1.4rem" : "1.15rem",
            color: b.accent,
            letterSpacing: "-0.03em",
            position: "relative", zIndex: 1,
          }}
        >
          {b.value}
        </span>
        <span
          style={{
            fontSize: b.size > 165 ? "0.68rem" : "0.6rem",
            color: "var(--text-secondary)",
            fontWeight: 600,
            maxWidth: b.size * 0.66,
            display: "block",
            marginTop: 6,
            lineHeight: 1.3,
            position: "relative", zIndex: 1,
          }}
        >
          {b.label}
        </span>
      </div>
    </div>
  );
}

export default function WhyDatti({ lang = "es" }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const tx = uiText[lang];
  const activeBubbles = lang === "en" ? bubblesEn : bubbles;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); ob.disconnect(); } },
      { threshold: 0.04 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="por-que" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-16 items-center">

          <div style={{ position: "relative", height: 550 }}>
            {activeBubbles.map((b, i) => (
              <Bubble key={i} b={b} i={i} visible={visible} />
            ))}
          </div>

          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              filter: visible ? "blur(0px)" : "blur(4px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s, filter 0.7s ease 0.3s",
            }}
          >
            <span className="tag-pill">{tx.tag}</span>
            <h2
              className="font-display font-black leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", color: "var(--text-primary)" }}
            >
              {tx.title1}
              <br />
              <span className="text-gradient">{tx.title2}</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tx.p1}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {tx.p2}
            </p>
            <a href="#servicios" className="btn-primary w-fit">
              {tx.cta}
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div
          className="md:hidden flex flex-col gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="text-center flex flex-col gap-4">
            <h2
              className="font-display font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)", color: "var(--text-primary)" }}
            >
              {tx.mobileTitle1}
              <br />
              <span className="text-gradient">{tx.mobileTitle2}</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tx.mobileSub}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {activeBubbles.map((b, i) => {
              const sz = Math.min(b.size * 0.72, 118);
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center text-center rounded-full flex-shrink-0"
                  style={{
                    width: sz, height: sz,
                    background: `radial-gradient(circle at 38% 32%, ${b.accent}28 0%, ${b.accent}0a 65%, transparent 100%)`,
                    border: `1.5px solid ${b.accent}40`,
                    animation: visible ? `bubbleFloat ${b.dur} ease-in-out ${b.delay} infinite` : "none",
                    padding: 10,
                  }}
                >
                  <span className="font-display font-black leading-none" style={{ fontSize: "1.35rem", color: b.accent, letterSpacing: "-0.03em" }}>
                    {b.value}
                  </span>
                  <span style={{ fontSize: "0.58rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", maxWidth: "88%", marginTop: 4, lineHeight: 1.3 }}>
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
