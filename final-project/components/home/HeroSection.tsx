"use client";

import {
  ArrowRight,
  Sparkles,
  Ruler,
  GitCompareArrows,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface HeroSectionProps {
  eyebrow?: string;
  headline?: string;
  highlightWord?: string;
  subtext?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

const defaultFeatures = [
  { icon: Sparkles, label: "AI Virtual Try-On" },
  { icon: ShoppingBag, label: "Marketplace" },
  { icon: Ticket, label: "Events" },
  { icon: UserRound, label: "Community" },
];

export default function HeroSection({
  headline = "See Yourself as Your Favorite ",
  highlightWord = "Character",
  subtext = "Upload your photo, preview cosplay costumes with AI, discover vendors, and join cosplay events.",
  primaryCtaLabel = "Try Virtual Fitting",
  secondaryCtaLabel = "Explore Costumes",
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#fcf2ed]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-20 lg:px-8">
        {/* LEFT */}
        <div
          className="relative flex flex-col justify-center"
          // style={{
          //   backgroundImage: "url('/images/hero/hero-glow.png')",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "contain",
          //   backgroundPosition: "left center",
          // }}
        >
          {/* soft overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fcf2ed]/70 via-[#fcf2ed]/45 to-transparent" />

          {/* glow */}
          <div className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#FFDCC8]/40 blur-[120px]" />

          <div className="relative z-10">
            <h1 className="font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl">
              {headline}
              <span className="text-primary">{highlightWord}</span> Before the
              Event
            </h1>

            <p className="mt-5 max-w-md text-lg text-muted">{subtext}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push("/try-on")}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-secondary"
              >
                {primaryCtaLabel}
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/marketplace")}
                className="inline-flex items-center gap-2 rounded-xl border border-primary bg-surface px-6 py-3 text-base font-medium text-primary transition hover:bg-cream/40"
              >
                {secondaryCtaLabel}
              </button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {defaultFeatures.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-muted"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex min-h-105 items-center justify-center">
          {/* glow */}
          <div className="absolute h-[520px] w-[520px] rounded-full bg-[#FFDCC5]/40 blur-[120px]" />

          <Image
            src="/images/hero/hero.png"
            alt="CosFit AI Virtual Try-On"
            width={720}
            height={720}
            priority
            className="relative z-10 h-auto w-full max-w-[720px] scale-130 mr-20 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
