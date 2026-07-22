"use client";

import Image from "next/image";
import { Sparkles, Coins, ArrowRight, Images } from "lucide-react";

export default function CreditHero() {
  return (
    <section className="overflow-hidden rounded-[40px] border border-[#F3E8DF] bg-gradient-to-br from-white via-[#FFFDFC] to-[#FFF8F4] p-12 shadow-sm">
      <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT */}

        {/* LEFT */}

        <div className="flex h-full flex-col justify-center">
          {/* Heading */}

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F4E2D8] bg-[#FFF8F5] px-4 py-2">
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              AI Powered Credits
            </span>
          </div>

          <h1 className="mt-6 max-w-md text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            AI Virtual
            <br />
            Fitting Credits
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            Generate realistic AI cosplay previews before renting costumes.
            Every generation uses one credit, while your saved looks stay
            available anytime.
          </p>

          {/* Balance */}

          <div className="mt-10 rounded-[28px] border border-[#F3E6DC] bg-gradient-to-br from-white to-[#FFF8F5] p-7 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wider text-[#8B857F]">
              Current Balance
            </p>

            <div className="mt-6 flex items-center gap-5">
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-[#FFF4EA] shadow-inner">
                <Coins size={34} className="text-[#F6A623]" />
              </div>

              <div>
                <div className="flex items-end gap-2">
                  <h2 className="text-6xl font-bold leading-none text-foreground">
                    12
                  </h2>

                  <span className="pb-2 text-xl font-semibold text-muted">
                    Credits
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted">
                  Available for AI generation
                </p>
              </div>
            </div>

            {/* Divider */}

            <div className="my-7 h-px bg-[#F2E8E1]" />

            {/* Benefits */}

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#7ACB87]" />

                <p className="text-[15px] text-muted">
                  1 credit per AI Try-On generation
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#7ACB87]" />

                <p className="text-[15px] text-muted">
                  View previously generated looks for free
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#7ACB87]" />

                <p className="text-[15px] text-muted">
                  Claim free weekly credits every 7 days
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}

          <div className="mt-8 flex items-center gap-5">
            <button className="primary-btn flex items-center gap-2 px-7 py-3">
              <Coins size={18} />
              Get More Credits
            </button>

            <button className="group flex items-center gap-2 text-[15px] font-semibold text-primary transition hover:gap-3">
              <Images size={18} />
              My Generated Looks
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* RIGHT */}

        {/* RIGHT */}

        <div className="relative flex items-center justify-center">
          {/* Glow */}

          <div className="absolute h-[560px] w-[560px] rounded-full bg-[#FFE8D9] blur-[120px] opacity-70" />

          {/* Floating Decoration */}

          <div className="absolute -left-8 top-14 h-28 w-28 rounded-full bg-[#FFF6EF] blur-2xl" />

          <div className="absolute -right-6 bottom-12 h-36 w-36 rounded-full bg-[#FFEFE5] blur-3xl" />

          {/* Main Mockup */}

          <div className="relative overflow-hidden rounded-[36px] border border-[#F3E7DD] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,.08)]">
            <Image
              src="/images/credits/credits.png"
              alt="AI Preview"
              width={900}
              height={900}
              priority
              className="rounded-[28px]"
            />

            {/* Bottom Card */}

            <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-[#F4E5D9] bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8B857F]">
                    Current Balance
                  </p>

                  <h3 className="mt-1 text-3xl font-bold text-foreground">
                    12
                    <span className="ml-2 text-lg font-medium text-muted">
                      Credits
                    </span>
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#F2FFF3] px-4 py-2">
                  <span className="text-sm font-semibold text-[#2F9D50]">
                    Ready to Generate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
