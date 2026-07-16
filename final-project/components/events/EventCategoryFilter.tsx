"use client";

export interface EventCategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  allLabel?: string;
}

export default function EventCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  allLabel = "All",
}: EventCategoryFilterProps) {
  const options = [allLabel, ...categories];

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isActive = option === selectedCategory;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onCategoryChange(option)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--border)] bg-white text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
