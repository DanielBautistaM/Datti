import Navbar from "@/components/Navbar";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Agendar Llamada — Datti",
  description: "Agenda una llamada gratuita de 30 minutos con el equipo de Datti.",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

export default function AgendarPage() {
  return (
    <main>
      <Navbar lang="es" base="/es" />
      <div style={{ paddingTop: "120px" }}>
        <Booking lang="es" />
      </div>
      <Footer lang="es" />
    </main>
  );
}
