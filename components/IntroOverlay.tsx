"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/types";

const metrics = ["10× ROI", "87% clarity", "100% ownership", "3× faster", "↓40% costs"];

export default function IntroOverlay({ lang }: { lang: Lang }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [metricIdx, setMetricIdx] = useState(0);
  const [barsReady, setBarsReady] = useState(false);
  const hasLeft = useRef(false);

  const label = lang === "es" ? "Scroll para continuar" : "Scroll to continue";

  useEffect(() => {
    // Lock scroll while overlay is visible
    document.body.style.overflow = "hidden";
    // Animate bars after mount
    const bt = setTimeout(() => setBarsReady(true), 100);
    // Cycle metrics
    const mt = setInterval(() => setMetricIdx((i) => (i + 1) % metrics.length), 1400);

    const dismiss = () => {
      if (hasLeft.current) return;
      hasLeft.current = true;
      document.body.style.overflow = "";
      setLeaving(true);
      setTimeout(() => setGone(true), 900);
    };

    window.addEventListener("wheel", dismiss, { once: true, passive: true });
    window.addEventListener("touchmove", dismiss, { once: true, passive: true });
    // Auto-dismiss after 5s
    const at = setTimeout(dismiss, 5000);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(bt);
      clearTimeout(at);
      clearInterval(mt);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
    };
  }, []);

  if (gone) return null;

  const panelBase: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 9999,
    background: "linear-gradient(160deg, #0d0b1e 0%, #130f2a 40%, #1a0d2e 100%)",
    transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
    overflow: "hidden",
  };

  return (
    <>
      {/* Top half */}
      <div style={{
        ...panelBase,
        top: 0,
        height: "50vh",
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        borderBottom: "1px solid rgba(92,77,255,0.15)",
      }}>
        {/* Top decorative streams */}
        <DataStreams side="top" />
      </div>

      {/* Bottom half */}
      <div style={{
        ...panelBase,
        bottom: 0,
        height: "50vh",
        transform: leaving ? "translateY(100%)" : "translateY(0)",
        borderTop: "1px solid rgba(92,77,255,0.15)",
      }}>
        <DataStreams side="bottom" />
      </div>

      {/* Center content — sits above both panels */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}>
        {/* Logo mark — 3 animated bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 20 }}>
          {[
            { h: 36, delay: "0s",    opacity: 0.45 },
            { h: 56, delay: "0.12s", opacity: 1    },
            { h: 28, delay: "0.24s", opacity: 0.65 },
          ].map((bar, i) => (
            <div
              key={i}
              style={{
                width: 14,
                borderRadius: 4,
                background: "linear-gradient(180deg, #FF4040, #E02020)",
                opacity: bar.opacity,
                height: barsReady ? bar.h : 0,
                transition: `height 0.6s cubic-bezier(0.34,1.56,0.64,1) ${bar.delay}`,
                boxShadow: "0 0 20px rgba(92,77,255,0.5)",
              }}
            />
          ))}
        </div>

        {/* Wordmark */}
        <div style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "2.8rem",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          opacity: barsReady ? 1 : 0,
          transform: barsReady ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s",
        }}>
          datti
        </div>

        {/* Cycling metric */}
        <div style={{
          marginTop: 28,
          height: 28,
          overflow: "hidden",
          opacity: barsReady ? 1 : 0,
          transition: "opacity 0.5s ease 0.55s",
        }}>
          <div style={{
            transform: `translateY(-${metricIdx * 28}px)`,
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "linear-gradient(90deg, #FF4040, #FF7070)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "fixed",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: barsReady ? 0.5 : 0,
          transition: "opacity 0.5s ease 0.9s",
        }}>
          <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
            {label}
          </span>
          <div style={{ animation: "float 1.4s ease-in-out infinite" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

/* Decorative data streams */
function DataStreams({ side }: { side: "top" | "bottom" }) {
  const cols = [
    { x: "8%",  values: ["0xA4F", "1.2K", "99.9", "10×", "↑87"], speed: "8s",  delay: "0s"    },
    { x: "18%", values: ["3.2M", "true", "null", "5×",  "COP"],  speed: "11s", delay: "1.3s"  },
    { x: "78%", values: ["data", "↓40%", "sync", "3×",  "live"], speed: "9s",  delay: "0.5s"  },
    { x: "88%", values: ["100%", "fast", "0ms",  "ok",  "→"],    speed: "12s", delay: "2.1s"  },
    { x: "50%", values: ["∞",   "AI",   "SQL",  "ETL", "API"],   speed: "14s", delay: "0.8s"  },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {cols.map((col, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: col.x,
            top: side === "top" ? "auto" : 0,
            bottom: side === "top" ? 0 : "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            animation: `dataStream${side === "top" ? "Up" : "Down"} ${col.speed} linear ${col.delay} infinite`,
            opacity: 0.18,
          }}
        >
          {[...col.values, ...col.values, ...col.values].map((v, j) => (
            <span key={j} style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#FF4040",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}>
              {v}
            </span>
          ))}
        </div>
      ))}

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(92,77,255,0.12) 0%, transparent 70%)",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        filter: "blur(40px)",
      }} />
    </div>
  );
}
