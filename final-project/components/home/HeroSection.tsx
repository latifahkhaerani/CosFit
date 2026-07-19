"use client";

import {
  ArrowRight,
  Sparkles,
  Ruler,
  GitCompareArrows,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface HeroSectionProps {
  eyebrow?: string;
  headline?: string;
  highlightWord?: string;
  subtext?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

const defaultFeatures = [
  { icon: Sparkles, label: "AI Virtual Try-On" },
  { icon: Ruler, label: "Size Match" },
  { icon: GitCompareArrows, label: "Multi-Vendor Compare" },
  { icon: ShieldCheck, label: "Secure & Easy" },
];

export default function HeroSection({
  headline = "See Yourself as Your Favorite ",
  highlightWord = "Character",
  subtext = "Upload your photo, virtually try cosplay costumes, compare rental vendors, and rent with confidence.",
  primaryCtaLabel = "Try Virtual Fitting",
  secondaryCtaLabel = "Explore Costumes",
  // onPrimaryCtaClick,
  // onSecondaryCtaClick,
}: HeroSectionProps) {
  const router = useRouter();

  const handlePrimaryClick = () => {
    router.push("/try-on");
  };

  const handleSecondaryClick = () => {
    router.push("/marketplace");
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-24 lg:px-8">
        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <h1 className="font-serif text-5xl font-bold leading-tight text-foreground sm:text-6xl">
            {headline}
            <span className="text-primary">{highlightWord}</span> Before You
            Rent.
          </h1>

          <p className="mt-5 max-w-md text-lg text-muted">{subtext}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-medium text-white transition hover:bg-secondary"
            >
              {primaryCtaLabel}
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleSecondaryClick}
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

        {/* Right: placeholder visual area */}
        <div className="relative flex min-h-[380px] items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-dashed border-border bg-surface">
            <span className="text-base text-muted">
              Hero illustration placeholder
            </span>
          </div>

          {/* "Your Photo" mini card */}
          <div className="absolute left-2 top-2 w-32 rounded-xl border border-border bg-surface p-2 shadow-sm sm:left-6 sm:top-6">
            <p className="mb-1 text-xs font-medium text-muted">Your Photo</p>
            <div className="flex h-20 items-center justify-center rounded-lg bg-cream/30">
              <span className="text-xs text-muted">Photo</span>
            </div>
          </div>

          {/* AI Virtual Try-On pill */}
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow sm:top-[38%]">
            AI Virtual Try-On
          </div>

          {/* Cosplay preview mini card */}
          <div className="absolute bottom-2 left-2 w-32 rounded-xl border border-border bg-surface p-2 shadow-sm sm:bottom-6 sm:left-6">
            <p className="mb-1 text-xs font-medium text-muted">
              Cosplay Preview
            </p>
            <div className="flex h-24 items-center justify-center rounded-lg bg-cream/30">
              <span className="text-xs text-muted">Preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
