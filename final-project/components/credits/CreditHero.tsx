"use client";

import Image from "next/image";
import {
  Sparkles,
  Coins,
  ArrowRight,
  Images,
} from "lucide-react";

export default function CreditHero() {
  return (
    <section className="card overflow-hidden p-10">

      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <div className="mb-5 flex items-center gap-3">

            <Sparkles
              size={28}
              className="text-[var(--primary)]"
            />

            <h1 className="text-5xl font-bold">

              AI Virtual
              <br />
              Fitting Credits

            </h1>

          </div>

          <p className="max-w-xl text-lg text-[var(--muted)] leading-8">

            Generate realistic AI cosplay previews before renting
            costumes.

          </p>

          {/* Balance */}

          <div className="card mt-10 p-8">

            <p className="subtitle">

              Current Balance

            </p>

            <div className="mt-5 flex items-center gap-4">

              <div
                className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#FFF3E8]
                "
              >
                <Coins
                  size={30}
                  className="text-[#F6A623]"
                />
              </div>

              <div>

                <h2 className="text-5xl font-bold">

                  12

                </h2>

                <p className="text-xl font-semibold">

                  Credits

                </p>

              </div>

            </div>

            <p className="mt-6 max-w-md leading-7 text-[var(--muted)]">

              Each new AI Try-On uses
              <strong> 1 credit</strong>.
              Viewing previously generated looks
              is always FREE.

            </p>

          </div>

          {/* CTA */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="primary-btn flex items-center gap-2">

              <Coins size={18} />

              Get More Credits

            </button>

            <button className="secondary-btn flex items-center gap-2">

              <Images size={18} />

              My Generated Looks

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="card overflow-hidden p-4">

            <Image
              src="/images/credits/preview.png"
              alt="AI Preview"
              width={900}
              height={900}
              className="rounded-[24px]"
            />

          </div>

          <div
            className="
            absolute
            bottom-5
            left-5

            rounded-2xl

            bg-white/90

            px-5

            py-3

            shadow-soft

            backdrop-blur
            "
          >

            <div className="flex items-center gap-3">

              <Sparkles
                size={18}
                className="text-[var(--primary)]"
              />

              AI Virtual Try-On

            </div>

          </div>

          <div
            className="
            absolute
            right-5
            top-5

            rounded-full

            bg-[#FFF3E8]

            px-4

            py-2

            text-sm

            font-semibold

            text-[#D18A00]
            "
          >

            -1 Credit

          </div>

        </div>

      </div>

    </section>
  );
}