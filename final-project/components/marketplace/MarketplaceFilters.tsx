"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

export type SortOption = "title-asc" | "price-asc" | "price-desc";

export interface MarketplaceFiltersProps {
  themeOptions: string[];
  sizeOptions: string[];
}

const sortLabels: Record<SortOption, string> = {
  "title-asc": "Name (A–Z)",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

/**
 * Reads/writes filter state straight to the URL (?search=...&theme=...&size=...&sort=...)
 * instead of React state — so this component doesn't need to share state with ProductGrid
 * through a parent; both just read the same URL independently.
 */
export default function MarketplaceFilters({ themeOptions, sizeOptions }: MarketplaceFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const theme = searchParams.get("theme") ?? "";
  const size = searchParams.get("size") ?? "";
  const sort = (searchParams.get("sort") as SortOption) ?? "title-asc";

  // Search stays local while typing, only commits to the URL on Enter/blur —
  // avoids triggering a navigation on every keystroke.
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function commitSearch() {
    updateParam("search", searchInput);
  }

  function clearFilters() {
    setSearchInput("");
    router.push(pathname);
  }

  const hasActiveFilters = Boolean(searchParams.get("search") || theme || size);

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={commitSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitSearch();
            }}
            placeholder="Search costumes or characters..."
            className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
          />
        </div>

        {/* Theme */}
        <select
          value={theme}
          onChange={(e) => updateParam("theme", e.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary lg:w-52"
        >
          <option value="">All Series</option>
          {themeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Size */}
        <select
          value={size}
          onChange={(e) => updateParam("size", e.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary lg:w-40"
        >
          <option value="">All Sizes</option>
          {sizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Sort */}
        <div className="flex items-center gap-2 lg:w-64">
          <SlidersHorizontal className="h-5 w-5 flex-shrink-0 text-muted" />
          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((option) => (
              <option key={option} value={option}>
                {sortLabels[option]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-end border-t border-border pt-4 text-sm text-muted">
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 font-medium text-primary hover:text-secondary"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
