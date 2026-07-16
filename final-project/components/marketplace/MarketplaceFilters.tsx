"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export type SortOption = "title-asc" | "price-asc" | "price-desc";

export interface MarketplaceFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  themeOptions: string[];
  selectedTheme: string;
  onThemeChange: (value: string) => void;
  sizeOptions: string[];
  selectedSize: string;
  onSizeChange: (value: string) => void;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  onClearFilters?: () => void;
  resultCount?: number;
}

const sortLabels: Record<SortOption, string> = {
  "title-asc": "Name (A–Z)",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

export default function MarketplaceFilters({
  searchValue,
  onSearchChange,
  themeOptions,
  selectedTheme,
  onThemeChange,
  sizeOptions,
  selectedSize,
  onSizeChange,
  sortValue,
  onSortChange,
  onClearFilters,
  resultCount,
}: MarketplaceFiltersProps) {
  const hasActiveFilters = Boolean(searchValue || selectedTheme || selectedSize);

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search costumes or characters..."
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary"
          />
        </div>

        {/* Theme */}
        <select
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary md:w-48"
        >
          <option value="">All Series</option>
          {themeOptions.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>

        {/* Size */}
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary md:w-36"
        >
          <option value="">All Sizes</option>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Sort */}
        <div className="flex items-center gap-2 md:w-56">
          <SlidersHorizontal className="h-4 w-4 flex-shrink-0 text-muted" />
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((option) => (
              <option key={option} value={option}>
                {sortLabels[option]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(hasActiveFilters || typeof resultCount === "number") && (
        <div className="flex items-center justify-between text-sm text-muted">
          <span>{typeof resultCount === "number" ? `${resultCount} products found` : null}</span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="flex items-center gap-1 text-primary hover:text-secondary"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
