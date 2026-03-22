"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/types";

// ── Replace with your Cal.com username and event slug ──
const CAL_LINK = "datti/llamada-30min";

const content = {
  es: {
    tag: "Agenda",
    title1: "Hablemos de",
    title2: "tus datos.",
    sub: "30 minutos. Sin costo. Te decimos exactamente qué necesita tu empresa y cómo lograrlo.",
  },
  en: {
    tag: "Book a Call",
    title1: "Let's talk about",
    title2: "your data.",
    sub: "30 minutes. No cost. We'll tell you exactly what your business needs and how to get there.",
  },
};

export default function Booking({ lang = "es" }: { lang?: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const tx = content[lang];

  useEffect(() => {
    // Reveal animation observer
    const ob = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => ob.observe(el));

    // Load Cal.com embed script
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
          theme: "dark",
        });
        Cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#5C4DFF" } },
          hideEventTypeDetails: false,
        });
      `;
      document.head.appendChild(script);
    }

    return () => ob.disconnect();
  }, []);

  return (
    <section id="agendar" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="divider absolute top-0 left-0 right-0" />

      {/* Ambient orb */}
      <div className="orb" style={{
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(92,77,255,0.09) 0%, transparent 70%)",
        top: "10%", right: "-5%", filter: "blur(80px)",
        animation: "float 11s ease-in-out infinite",
      }} />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="tag-pill justify-center">{tx.tag}</span>
          <h2
            className="font-display font-black leading-tight mt-5 mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "var(--text-primary)" }}
          >
            {tx.title1}{" "}
            <span className="text-gradient">{tx.title2}</span>
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            {tx.sub}
          </p>
        </div>

        {/* Cal.com inline embed */}
        <div
          className="reveal"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-lg)",
            minHeight: 600,
          }}
        >
          <div
            id="cal-booking-embed"
            style={{ width: "100%", minHeight: 600 }}
          />
        </div>

      </div>
    </section>
  );
}
