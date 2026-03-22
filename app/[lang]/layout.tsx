import type { Metadata } from "next";
import type { Lang } from "@/lib/types";
import LangSetter from "@/components/LangSetter";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs ? "Datti — El Control de Tus Datos" : "Datti — Own Your Data",
    description: isEs
      ? "Ingeniería y análisis de datos para empresas que exigen control total."
      : "Data engineering and analytics for companies that demand full control.",
    keywords: isEs
      ? ["ingeniería de datos", "análisis de datos", "business intelligence", "datti"]
      : ["data engineering", "data analytics", "business intelligence", "datti"],
    openGraph: {
      title: isEs ? "Datti — El Control de Tus Datos" : "Datti — Own Your Data",
      description: isEs ? "El poder de controlar tus datos." : "The power of owning your data.",
      url: "https://datti.co",
      siteName: "Datti",
      type: "website",
      locale: isEs ? "es_CO" : "en_US",
    },
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    alternates: {
      canonical: `https://datti.co/${lang}`,
      languages: { es: "https://datti.co/es", en: "https://datti.co/en" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return (
    <>
      <LangSetter lang={lang} />
      {children}
    </>
  );
}
