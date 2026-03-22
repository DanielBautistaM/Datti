"use client";

const marks = [
  {
    id: "A",
    label: "Trazo ascendente",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <path d="M 4 26 C 8 24 14 18 28 6" stroke="#5C4DFF" strokeWidth="3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "B",
    label: "Nodo central",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4.5" fill="#5C4DFF" />
        <circle cx="16" cy="16" r="10" stroke="#5C4DFF" strokeWidth="1.5" opacity="0.25" />
        <circle cx="16" cy="16" r="14" stroke="#5C4DFF" strokeWidth="1" opacity="0.10" />
      </svg>
    ),
  },
  {
    id: "C",
    label: "Pipeline",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <path d="M 4 22 L 4 10 Q 4 6 8 6 L 24 6 Q 28 6 28 10 L 28 22" stroke="#5C4DFF" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.35"/>
        <path d="M 4 22 Q 4 26 8 26 L 24 26 Q 28 26 28 22" stroke="#5C4DFF" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "D",
    label: "Espiral mínima",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <path d="M 16 16 m 0 -10 a 10 10 0 1 1 -0.01 0" stroke="#5C4DFF" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
        <path d="M 16 16 m 0 -6 a 6 6 0 1 1 -0.01 0" stroke="#5C4DFF" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
        <circle cx="16" cy="16" r="2.5" fill="#5C4DFF" />
      </svg>
    ),
  },
  {
    id: "E",
    label: "Dos trazos",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <path d="M 6 24 L 26 8" stroke="#5C4DFF" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 6 24 L 26 24" stroke="#5C4DFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "F",
    label: "Flujo",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <circle cx="6" cy="16" r="3" fill="#5C4DFF" opacity="0.4"/>
        <circle cx="16" cy="16" r="3" fill="#5C4DFF" opacity="0.7"/>
        <circle cx="26" cy="16" r="3" fill="#5C4DFF" />
        <line x1="9" y1="16" x2="13" y2="16" stroke="#5C4DFF" strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
        <line x1="19" y1="16" x2="23" y2="16" stroke="#5C4DFF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "G",
    label: "Pulso",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <polyline points="2,16 8,16 11,8 14,24 17,12 20,16 30,16" stroke="#5C4DFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "H",
    label: "Ángulo",
    svg: (
      <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
        <path d="M 6 26 L 6 8 L 26 8" stroke="#5C4DFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="20" r="3.5" fill="#5C4DFF" opacity="0.9"/>
      </svg>
    ),
  },
];

export default function LogoExplorer() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#0a0914",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 48,
    }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Exploración de marca — señala cuál tiene algo
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        maxWidth: 560,
      }}>
        {marks.map((m) => (
          <div key={m.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            padding: "24px 16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
          }}>
            {m.svg}
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {m.id}
            </span>
          </div>
        ))}
      </div>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.65rem" }}>
        dime la letra de la que más se acerca a lo que buscas
      </p>
    </div>
  );
}
