"use client";

import {
  Flame,
  TrendingUp,
  Heart,
  CircleHelp,
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
    <div className="flex items-center justify-between">
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = currentFilter === filter.value;

          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#be2727] to-[#d33333] text-white shadow-[0_4px_12px_rgba(190,39,39,0.3)] -translate-y-0.5"
                  : "border border-white/80 bg-white/70 text-gray-600 shadow-sm backdrop-blur-md hover:border-gray-300 hover:bg-white hover:text-gray-900"
              }`}
            >
              <Icon size={16} className={isActive ? "text-white" : "text-gray-400"} />
              {filter.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}