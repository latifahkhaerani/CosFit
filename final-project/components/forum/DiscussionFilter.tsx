"use client";

import {
  Flame,
  TrendingUp,
  Heart,
  CircleHelp,
  SlidersHorizontal,
} from "lucide-react";

type FilterProps = {
  currentFilter: string;
  onFilterChange: (filterValue: string) => void;
};

const filters = [
  { title: "Latest", value: "newest", icon: Flame },
  { title: "Trending", value: "trending", icon: TrendingUp },
  { title: "Most Liked", value: "most_like", icon: Heart },
  { title: "Unanswered", value: "unanswered", icon: CircleHelp },
];

export default function DiscussionFilter({
  currentFilter,
  onFilterChange,
}: FilterProps) {
  return (
    <div className="mb-7 flex items-center justify-between">
      <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = currentFilter === filter.value;

          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[var(--primary)] text-white shadow-soft"
                  : "border border-[var(--border)] bg-white hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
            >
              <Icon size={16} />
              {filter.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}