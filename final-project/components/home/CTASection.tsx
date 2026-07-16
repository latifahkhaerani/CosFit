"use client";

import { ArrowRight } from "lucide-react";

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
  return (
    <section className="px-6 py-6 lg:px-8">
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-primary px-8 py-12 sm:flex-row sm:items-center">
        <div>
          <h2 className="max-w-md font-serif text-3xl font-semibold text-white sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-2 text-base text-cream">{subtext}</p>
        </div>

        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-surface px-6 py-3 text-base font-medium text-primary transition hover:bg-cream/40"
        >
          {ctaLabel}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
