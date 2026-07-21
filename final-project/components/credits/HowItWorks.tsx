"use client";

import {
  Shirt,
  Sparkles,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose Costume",
    desc: "Browse thousands of cosplay costumes from trusted vendors.",
    icon: <Shirt size={28} />,
  },
  {
    number: "2",
    title: "Generate AI Preview",
    desc: "See yourself wearing the selected costume.",
    icon: <Sparkles size={28} />,
  },
  {
    number: "3",
    title: "Rent with Confidence",
    desc: "Only rent after you're satisfied with your preview.",
    icon: <ShoppingBag size={28} />,
  },
];

export default function HowItWorks() {
  return (
    <section>

      <div className="mb-10 text-center">

        <h2 className="card-title text-4xl">

          How It Works

        </h2>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {steps.map((step, index) => (

          <div
            key={step.title}
            className="
            relative
            card
            p-8
            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-soft
            "
          >

            <div
              className="
              mb-6

              flex

              h-14

              w-14

              items-center

              justify-center

              rounded-2xl

              bg-[#FFF5EE]

              text-[var(--primary)]
              "
            >
              {step.icon}

            </div>

            <div
              className="
              absolute

              right-6

              top-6

              flex

              h-8

              w-8

              items-center

              justify-center

              rounded-full

              bg-[#FFE8D9]

              text-sm

              font-bold

              text-[var(--primary)]
              "
            >
              {step.number}

            </div>

            <h3 className="text-xl font-semibold">

              {step.title}

            </h3>

            <p className="mt-3 leading-7 text-[var(--muted)]">

              {step.desc}

            </p>

            {index < steps.length - 1 && (
              <ArrowRight
                size={24}
                className="
                absolute
                -right-8
                top-1/2
                hidden
                -translate-y-1/2
                text-[var(--muted)]
                lg:block
                "
              />
            )}

          </div>

        ))}

      </div>

    </section>
  );
}