"use client";

import { Sparkles } from "lucide-react";

export default function EventNewsletter() {
  return (
    <section
      className="
      overflow-hidden
      rounded-[36px]
      bg-gradient-to-r
      from-[#B14744]
      via-[#C7675E]
      to-[#D89C73]
      p-14
      text-white
      "
    >
      <Sparkles size={36} />

      <h2 className="mt-6 text-5xl font-bold">

        Never Miss Another Event

      </h2>

      <p className="mt-5 max-w-2xl text-lg text-white/90">

        Receive updates about cosplay contests,
        conventions,
        workshops,
        giveaways,
        and exclusive community events.

      </p>

      <div className="mt-10 flex max-w-xl gap-4">

        <input
          placeholder="Enter your email"
          className="
          flex-1
          rounded-2xl
          bg-white
          px-6
          py-4
          text-black
          outline-none
          "
        />

        <button className="rounded-2xl bg-black px-8 font-semibold text-white">

          Subscribe

        </button>

      </div>

    </section>
  );
}