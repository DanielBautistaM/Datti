"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/types";
import Logo from "@/components/Logo";

const CAL_LINK = "datti/30min";

const content = {
  es: {
    tag: "Agenda",
    title1: "Hablemos de",
    title2: "tus datos.",
    sub: "30 minutos. Sin costo. Te decimos exactamente qué necesita tu empresa y cómo lograrlo.",
    back: "← Volver",
  },
  en: {
    tag: "Book a Call",
    title1: "Let's talk about",
    title2: "your data.",
    sub: "30 minutes. No cost. We'll tell you exactly what your business needs and how to get there.",
    back: "← Back",
  },
};

export default function Booking({ lang = "es", standalone = false }: { lang?: Lang; standalone?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const tx = content[lang];

  useEffect(() => {
    const existing = document.getElementById("cal-embed-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "cal-embed-script";
      script.innerHTML = `
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal; let ar = arguments;
            if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
            if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", { origin: "https://cal.com" });
        Cal("inline", {
          elementOrSelector: "#cal-booking-embed",
          calLink: "${CAL_LINK}",
          layout: "month_view",
        });
        Cal("ui", {
          styles: { branding: { brandColor: "#5C4DFF" } },
          hideEventTypeDetails: false,
        });
      `;
      document.head.appendChild(script);
    }
  }, []);

  if (standalone) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 24px 60px",
        }}
        className="dark"
      >
        {/* Top bar */}
        <div style={{ width: "100%", maxWidth: 860, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
          <a href={lang === "es" ? "/es" : "/en"} style={{ textDecoration: "none" }}>
            <Logo size="md" />
          </a>
          <a
            href={lang === "es" ? "/es" : "/en"}
            style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none", fontWeight: 500 }}
          >
            {tx.back}
          </a>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 560 }}>
          <h1
            className="font-display font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text-primary)", marginBottom: 12 }}
          >
            {tx.title1} <span className="text-gradient">{tx.title2}</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
            {tx.sub}
          </p>
        </div>

        {/* Calendar */}
        <div
          style={{
            width: "100%",
            maxWidth: 860,
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-lg)",
            minHeight: 600,
          }}
        >
          <div id="cal-booking-embed" style={{ width: "100%", minHeight: 600 }} />
        </div>
      </div>
    );
  }

  // Embedded in main page (unused for now)
  return (
    <section className="relative py-20 px-6 overflow-hidden" ref={ref}>
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto">
        <div id="cal-booking-embed" style={{ width: "100%", minHeight: 600 }} />
      </div>
    </section>
  );
}
