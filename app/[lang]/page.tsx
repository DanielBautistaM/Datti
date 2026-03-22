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
