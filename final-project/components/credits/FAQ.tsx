"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is an AI Credit?",
    answer:
      "One AI Credit is used every time you generate a brand new AI Virtual Try-On preview.",
  },
  {
    question: "Does viewing previous results use credits?",
    answer:
      "No. Viewing your previous AI generations is completely free.",
  },
  {
    question: "Can I regenerate my preview?",
    answer:
      "Yes. Each new generation consumes one credit.",
  },
  {
    question: "Do my credits expire?",
    answer:
      "No. Credits never expire and remain in your account.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section>

      <div className="mb-10 text-center">

        <h2 className="card-title text-4xl">

          Frequently Asked Questions

        </h2>

      </div>

      <div className="space-y-4">

        {faqs.map((faq, index) => (

          <div
            key={faq.question}
            className="card overflow-hidden"
          >

            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between p-6"
            >

              <span className="font-semibold">

                {faq.question}

              </span>

              <ChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />

            </button>

            {open === index && (

              <div className="border-t border-[var(--border)] px-6 py-5">

                <p className="leading-7 text-[var(--muted)]">

                  {faq.answer}

                </p>

              </div>

            )}

          </div>

        ))}

      </div>

    </section>
  );
}