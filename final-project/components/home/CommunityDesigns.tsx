"use client";

import { Sparkles, ThumbsUp } from "lucide-react";
import type { GetUserDesign } from "@/app/types";

export interface CommunityDesignsProps {
  title?: string;
  subtitle?: string;
  /** AI-generated cosplay designs submitted by users, rankable by vote count. */
  designs?: GetUserDesign[];
  onVote?: (designId: string) => void;
}

const placeholderDesigns: GetUserDesign[] = Array.from({ length: 8 }, (_, i) => ({
  _id: `design-${i}`,
  imgUrl: "",
  userId: "",
  vote: 0,
}));

function DesignCard({
  design,
  onVote,
}: {
  design: GetUserDesign;
  onVote?: (designId: string) => void;
}) {
  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-cream/30">
      {design.imgUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={design.imgUrl}
          alt="Community AI design"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted">
          Design image
        </div>
      )}
      <button
        type="button"
        onClick={() => onVote?.(design._id)}
        className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-surface/90 px-3 py-1.5 text-sm font-medium text-text shadow-sm transition hover:text-primary"
      >
        <ThumbsUp className="h-4 w-4" />
        {design.vote}
      </button>
    </div>
  );
}

export default function CommunityDesigns({
  title = "Community AI Designs",
  subtitle = "Trending virtual try-on looks from the CosFit community.",
  designs = placeholderDesigns,
  onVote,
}: CommunityDesignsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-6">
        <h2 className="flex items-center gap-1.5 font-serif text-2xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-4 w-4 text-accent" />
        </h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {designs.map((design) => (
          <DesignCard key={design._id} design={design} onVote={onVote} />
        ))}
      </div>
    </section>
  );
}
