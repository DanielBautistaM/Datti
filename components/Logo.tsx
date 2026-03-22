"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

// Saved mark concept: 3 bold parallelograms tilted -30°, stacked vertically pointing right
// Back:   translate(17,21) rotate(-30), opacity 0.28
// Middle: translate(16,15) rotate(-30), opacity 0.60
// Front:  translate(15,9)  rotate(-30), opacity 1.0
// rect x="-8" y="-3.5" width="16" height="7"

export default function Logo({ size = "md", showWordmark = true }: LogoProps) {
  const text = { sm: "text-base", md: "text-lg", lg: "text-2xl" }[size];
  const dotSize = { sm: 5, md: 6, lg: 9 }[size];

  return (
    <div className="flex items-center select-none" style={{ gap: 4 }}>
      <span
        className={`${text} font-display font-bold leading-none`}
        style={{
          color: "var(--text-primary)",
          letterSpacing: "-0.04em",
        }}
      >
        datti
      </span>
      <svg width={dotSize} height={dotSize} viewBox="0 0 6 6" fill="none" style={{ marginBottom: "-27%" }}>
        <circle cx="3" cy="3" r="3" fill="var(--accent)" />
      </svg>
    </div>
  );
}
