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
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-tertiary px-8 py-10 sm:flex-row sm:items-center">
        <div>
          <h2 className="max-w-md font-serif text-2xl font-semibold text-white sm:text-3xl">
            {headline}
          </h2>
          <p className="mt-2 text-sm text-cream">{subtext}</p>
        </div>

        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-medium text-secondary transition hover:bg-cream/40"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
