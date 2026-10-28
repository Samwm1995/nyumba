import { JoinForm } from "@/components/join-form";
import { EventsList } from "@/components/events-list";

export const metadata = { title: "Jumuiya · Community" };

export default function Community() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <h1 className="font-display text-3xl font-black text-navy">Jiunge · Join</h1>
        <p className="mt-2 text-foreground/80">
          Wachagga nyumbani na ughaibuni, na wageni wanaopanda Kilimanjaro — kila mmoja ana nafasi yake. Chagua njia yako hapa chini.
          <br /><span className="text-foreground/60">Chagga at home and abroad, and visitors climbing Kilimanjaro — pick your path below.</span>
        </p>
        <JoinForm />
      </section>
      <section id="matukio" className="scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-navy">Matukio · Events</h2>
        <p className="mt-2 text-foreground/80">Meetups, home visits, recording days and ceremonies members are welcome at.</p>
        <EventsList />
      </section>
    </div>
  );
}
