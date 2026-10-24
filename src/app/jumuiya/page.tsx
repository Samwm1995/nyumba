import { JoinForm } from "@/components/join-form";
import { EventsList } from "@/components/events-list";

export const metadata = { title: "Jumuiya · Community" };

export default function Community() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <h1 className="font-display text-3xl font-black text-navy">Jumuiya · Community</h1>
        <p className="mt-2 text-foreground/80">
          Join the register so we can reach you for recordings, verification and meetups. Tell us your dialect and whether you can record elders in your area.
        </p>
        <JoinForm />
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold text-navy">Matukio · Events</h2>
        <p className="mt-2 text-foreground/80">Meetups, home visits, recording days and ceremonies members are welcome at.</p>
        <EventsList />
      </section>
    </div>
  );
}
