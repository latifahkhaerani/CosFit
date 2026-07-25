"use client";

import { ThumbsUp, Trophy } from "lucide-react";
import type { GetUserDesign } from "@/app/types";

export interface HallOfFameCardProps {
  design: GetUserDesign;
  rank?: number;
}

export default function HallOfFameCard({ design, rank }: HallOfFameCardProps) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[3/4] w-full flex-shrink-0 overflow-hidden bg-[#FCFBFA]">
        {design.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={design.imgUrl}
            alt="Community design"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
            Design image
          </div>
        )}

        {rank ? (
          <div className="absolute left-5 top-5">
            <span className="badge-warning flex items-center gap-2">
              <Trophy size={13} />
              #{rank}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 items-center justify-between p-6">
        <p className="font-semibold">Community Design</p>

        <div className="flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
          <ThumbsUp size={16} />
          {design.vote}
        </div>
      </div>
    </article>
  );
}
