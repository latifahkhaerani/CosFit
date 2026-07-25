import { Sparkles } from "lucide-react";

// Static marketing copy, not backed by app/types.ts (no matching entity there) —
// defined locally so this file has no dependency on a shared types module.
export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface HowItWorksProps {
  title?: string;
  steps?: ProcessStep[];
}

const placeholderSteps: ProcessStep[] = [
  { id: "step-1", step: 1, title: "", description: "" },
  { id: "step-2", step: 2, title: "", description: "" },
  { id: "step-3", step: 3, title: "", description: "" },
];

export default function HowItWorks({
  title = "How CosFit Works",
  steps = placeholderSteps,
}: HowItWorksProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <h2 className="mb-6 flex items-center gap-2 font-serif text-3xl font-semibold text-foreground">
        {title}
        <Sparkles className="h-5 w-5 text-accent" />
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-white">
                  {step.step}
                </span>
                <p className="text-lg font-semibold text-foreground">
                  {step.title || "Step Title"}
                </p>
              </div>
              <p className="text-base text-muted">
                {step.description || "Short description of this step."}
              </p>
              <div className="mt-2 flex h-36 items-center justify-center rounded-xl bg-cream/30">
                {step.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={step.imageUrl}
                    alt={step.title || "Step illustration"}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <span className="text-xs text-muted">Illustration placeholder</span>
                )}
              </div>
            </div>

            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="mt-6 hidden flex-shrink-0 text-gold sm:block"
              >
                &middot;&middot;&middot;
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
