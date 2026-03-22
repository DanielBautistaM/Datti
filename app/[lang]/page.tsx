import type { Lang } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyDatti from "@/components/WhyDatti";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return (
    <main>
      {/* TEMP — logo fullscreen para descarga */}
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "var(--bg)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, userSelect: "none" }}>
          <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 900, fontSize: "14rem", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
            datti
          </span>
          <svg width="36" height="36" viewBox="0 0 6 6" fill="none" style={{ marginBottom: 0 }}>
            <circle cx="3" cy="3" r="3" fill="var(--accent)" />
          </svg>
        </div>
      </div>
      <Navbar lang={lang} />
      <Hero lang={lang} />
      <Problem lang={lang} />
      <Services lang={lang} />
      <Process lang={lang} />
      <WhyDatti lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
