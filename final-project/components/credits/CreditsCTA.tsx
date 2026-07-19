"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CreditsCTA() {
  return (
    <section
      className="
      card
      overflow-hidden
      bg-gradient-to-r
      from-[#FFF7F3]
      via-[#FFFDFC]
      to-[#FFF4EE]
      p-10
      "
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <h2 className="text-5xl font-bold leading-tight">

            Need More
            <br />
            AI Previews?

          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">

            Upgrade your AI Credits and explore
            unlimited cosplay possibilities before
            renting your next costume.

          </p>

          <button className="primary-btn mt-8 flex items-center gap-2">

            Purchase Credits

            <ArrowRight size={18} />

          </button>

        </div>

        {/* RIGHT */}

        <div className="flex justify-center">

          <Image
            src="/images/credits/cta.png"
            alt=""
            width={520}
            height={420}
            className="object-contain"
          />

        </div>

      </div>
    </section>
  );
}