"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Choose a Costume",
    desc: "Browse cosplay costumes from trusted rental vendors.",
    image: "/images/credits/1.png",
  },
  {
    number: "2",
    title: "Generate AI Preview",
    desc: "See yourself wearing the selected costume.",
    image: "/images/credits/2.png",
  },
  {
    number: "3",
    title: "Rent with Confidence",
    desc: "Only rent after you're satisfied with the preview.",
    image: "/images/credits/3.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-6">
      {/* Heading */}

      <div className="mb-14 text-center">
        <h2 className="card-title text-4xl">How It Works</h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Experience AI-powered cosplay fitting in just three simple steps.
        </p>
      </div>

      {/* Steps */}

      <div className="grid gap-8 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="
              relative
              overflow-visible
              rounded-[28px]
              border
              border-[#F4E7DC]
              bg-white
              p-8
              shadow-sm
              transition-all
              duration-300
              
              
            "
          >
            {/* Number */}

            <div className=" absolute -left-4 -top-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE7D6] text-base font-bold text-primary shadow-md">
              {step.number}
            </div>

            {/* Illustration */}
            <div className="flex gap-5 align-center">
              <div className=" mt-6 flex h-22 w-22 items-center justify-center rounded-[24px] bg-[#FFF7F2]">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="mt-7 text-2xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-base leading-8 text-[var(--muted)]">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Arrow */}

            {index < steps.length - 1 && (
              <div
                className="
                  absolute
                  -right-7
                  top-1/2
                  z-20
                  hidden
                  -translate-y-1/2
                  lg:flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-md
                "
              >
                <ArrowRight size={22} className="text-[var(--primary)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
