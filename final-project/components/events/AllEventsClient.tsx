"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { GetOurEvent } from "@/app/types";
import EventGrid from "./EventGrid";
import EventCategoryFilter from "./EventCategoryFilter";

export type EventSortOption =
  | "time-asc"
  | "time-desc"
  | "name-asc"
  | "name-desc";

export interface AllEventsClientProps {
  events: GetOurEvent[];
  pageSize?: number;
}

const ALL_LABEL = "All";

export default function AllEventsClient({
  events,
  pageSize = 8,
}: AllEventsClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_LABEL);
  const [sort, setSort] = useState<EventSortOption>("time-asc");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(events.map((event) => event.category).filter(Boolean)),
      ),
    [events],
  );

  const filteredEvents = useMemo(() => {
    const result = events.filter((event) => {
      const matchesSearch = search
        ? event.eventName.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesCategory =
        selectedCategory === ALL_LABEL
          ? true
          : event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return result.sort((a, b) => {
      if (sort === "name-desc") {
        return b.eventName.localeCompare(a.eventName);
      }

      if (sort === "name-asc") {
        return a.eventName.localeCompare(b.eventName);
      }

      const aTime = a.startDate
        ? new Date(a.startDate).getTime()
        : Number.POSITIVE_INFINITY;
      const bTime = b.startDate
        ? new Date(b.startDate).getTime()
        : Number.POSITIVE_INFINITY;

      if (sort === "time-desc") {
        return bTime - aTime;
      }

      return aTime - bTime;
    });
  }, [events, search, selectedCategory, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    setPage(1);
  }

  function handleSortChange(value: EventSortOption) {
    setSort(value);
    setPage(1);
  }

  return (
    <div>
      {/* Search + Sort */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-6 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-3 pl-12 pr-4 outline-none focus:border-[var(--primary)]"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value as EventSortOption)}
          className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-[var(--primary)] lg:w-56"
        >
          <option value="time-asc">Nearest</option>
          <option value="time-desc">Farthest</option>
          <option value="name-asc">Name (A&ndash;Z)</option>
          <option value="name-desc">Name (Z&ndash;A)</option>
        </select>
      </div>

      {/* Category filter */}
      {categories.length > 0 ? (
        <div className="mb-6">
          <EventCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            allLabel={ALL_LABEL}
          />
        </div>
      ) : null}

      <p className="mb-4 text-sm text-[var(--muted)]">
        {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"}{" "}
        found
      </p>

      <EventGrid events={paginatedEvents} />

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="secondary-btn px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`h-10 w-10 rounded-xl font-medium transition ${
                p === currentPage
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]/40"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="secondary-btn px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
