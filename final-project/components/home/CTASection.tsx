"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface CTASectionProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export default function CTASection({
  headline = "Ready to transform into your favorite character?",
  subtext = "Join thousands of cosplayers who trust CosFit.",
  ctaLabel = "Try Virtual Fitting Now",
  onCtaClick,
}: CTASectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/try-on");
  };

  return (
    <section className="px-6 py-6 lg:px-8">
      <div
        className="relative mx-auto flex min-h-[220px] max-w-7xl items-center overflow-hidden rounded-[32px]"
        style={{
          backgroundImage: "url('/images/hero/foot.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Glow */}
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#FFD9C2]/15 blur-3xl" />

        {/* Chibi */}
        <div className="pointer-events-none absolute bottom-0 left-6 z-20 hidden lg:block">
          <Image
            src="/images/hero/helo2.png"
            alt="CosFit Mascot"
            width={170}
            height={170}
            className=" scale-125 origin-bottom-left  drop-shadow-[0_20px_35px_rgba(0,0,0,.18)]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 ml-9 flex w-full flex-col gap-8 px-10 py-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-2xl lg:ml-44">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-white lg:text-5xl">
              {headline}
            </h2>

            <p className="mt-4 max-w-lg text-lg leading-8 text-[#FFF2EA]">
              {subtext}
            </p>
          </div>

          {/* Right */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleClick}
              className="inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-7 font-medium text-primary shadow-[0_15px_40px_rgba(0,0,0,.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#FFF7F2]"
            >
              {ctaLabel}

              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
