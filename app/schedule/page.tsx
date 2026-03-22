import Navbar from "@/components/Navbar";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Schedule a Call — Datti",
  description: "Book a free 30-minute call with the Datti team.",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

export default function SchedulePage() {
  return (
    <main>
      <Navbar lang="en" base="/en" />
      <div style={{ paddingTop: "120px" }}>
        <Booking lang="en" />
      </div>
      <Footer lang="en" />
    </main>
  );
}
