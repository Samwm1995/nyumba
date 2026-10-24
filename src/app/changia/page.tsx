import { Suspense } from "react";
import { ContributeForm } from "@/components/contribute-form";

export const metadata = { title: "Changia · Contribute" };

export default function Contribute() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-black text-navy">Changia · Add your voice</h1>
      <p className="mt-2 text-foreground/80">
        Record a word, a greeting, a proverb or a short story in your dialect — straight from your phone. Sit with a
        grandparent if you can. Everything is reviewed by two speakers of that dialect before it goes live, and the
        speaker is credited.
      </p>
      <Suspense>
        <ContributeForm />
      </Suspense>
    </div>
  );
}
