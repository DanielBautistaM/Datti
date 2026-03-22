import Booking from "@/components/Booking";

export const metadata = {
  title: "Agendar Llamada — Datti",
  description: "Agenda una llamada gratuita de 30 minutos con el equipo de Datti.",
};

export default function AgendarPage() {
  return <Booking lang="es" standalone />;
}
