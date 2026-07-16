"use client";

import {
  Flame,
  TrendingUp,
  Heart,
  CircleHelp,
  SlidersHorizontal,
} from "lucide-react";

const filters = [
  {
    title: "Latest",
    icon: Flame,
    active: true,
  },
  {
    title: "Trending",
    icon: TrendingUp,
  },
  {
    title: "Most Liked",
    icon: Heart,
  },
  {
    title: "Unanswered",
    icon: CircleHelp,
  },
];

export default function DiscussionFilter() {
  return (
    <div className="mb-7 flex items-center justify-between">

      <div className="flex gap-3">

        {filters.map((filter) => {

          const Icon = filter.icon;

          return (
            <button
              key={filter.title}
              className={`
              flex items-center gap-2 rounded-2xl
              px-5 py-3 text-sm font-medium
              transition-all duration-300

              ${
                filter.active
                  ? "bg-[var(--primary)] text-white shadow-soft"
                  : "border border-[var(--border)] bg-white hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }
              `}
            >
              <Icon size={16} />

              {filter.title}
            </button>
          );
        })}
      </div>

      <button className="secondary-btn flex items-center gap-2 px-5 py-3">

        <SlidersHorizontal size={17} />

        Filter

      </button>

    </div>
  );
}