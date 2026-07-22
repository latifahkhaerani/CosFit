"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CreditsCTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-[#FFF5ED]
      "
    >
      <div className="grid min-h-[500px] items-center lg:grid-cols-2">
        {/* LEFT */}

        <div className="relative z-20 px-10 py-14 lg:px-16">
          <span
            className="
              inline-flex
              rounded-full
              bg-[#FFE6D9]
              px-4
              py-2
              text-sm
              font-semibold
              text-[#B14744]
            "
          >
            AI Credits
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">
            Need More
            <br />
            AI Previews?
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">
            Upgrade your AI Credits and generate more realistic cosplay previews
            before renting your next costume.
          </p>

          <button className="primary-btn mt-10 flex items-center gap-2">
            Purchase Credits
            <ArrowRight size={18} />
          </button>
        </div>

        {/* RIGHT */}

        <div className="relative h-[500px] overflow-hidden">
          {/* Glow */}

          <div
            className="
              absolute
              right-10
              top-1/2
              h-[420px]
              w-[420px]
              -translate-y-1/2
              rounded-full
              bg-[#FFD7C7]
              opacity-70
              blur-[120px]
            "
          />

          {/* Character */}

          <Image
            src="/images/credits/cta.png"
            alt="AI Credits"
            fill
            priority
            className="
              object-cover
              object-right
              scale-100
              translate-x-2
              select-none
              pointer-events-none
            "
          />

          {/* Left Fade */}

          <div
            className="
              absolute
              inset-y-0
              left-0
              w-80
              bg-gradient-to-r
              from-[#FFF5ED]
              via-[#FFF5ED]
              via-10%
              to-transparent
            "
          />

          {/* Bottom Fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-[#FFF5ED]
              via-[#FFF5ED]/40
              to-transparent
            "
          />

          {/* Top Fade */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-24
              bg-gradient-to-b
              from-[#FFF5ED]/50
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}
