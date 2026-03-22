import Booking from "@/components/Booking";

export const metadata = {
  title: "Schedule a Call — Datti",
  description: "Book a free 30-minute call with the Datti team.",
};

export default function SchedulePage() {
  return <Booking lang="en" standalone />;
}
