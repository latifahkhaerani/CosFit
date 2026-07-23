"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GetOurEvent } from "@/app/types";
import EventGrid from "./EventGrid";

export interface EventsClientProps {
  title?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  events?: GetOurEvent[];
}

const placeholderEvents: GetOurEvent[] = Array.from({ length: 4 }, (_, i) => ({
  _id: `event-${i}`,
  slug: `event-${i}`,
  eventName: "",
  category: "",
  imgUrl: "",
  forumId: "",
  description: "",
}));

const EVENT_TYPE_OPTIONS = [
  { value: "All", label: "All" },
  { value: "internal_contest", label: "Contests" },
  { value: "external_convention", label: "Conventions" },
] as const;

export default function EventsClient({
  title = "Upcoming Events",
  viewAllLabel = "View All Events",
  viewAllHref = "/events/all",
  events = placeholderEvents,
}: EventsClientProps) {
  const [selectedType, setSelectedType] =
    useState<(typeof EVENT_TYPE_OPTIONS)[number]["value"]>("All");

  const filteredEvents = useMemo(() => {
    const now = new Date();

    const visibleEvents = events.filter((event) => {
      const endDate = event.endDate ? new Date(event.endDate) : null;
      return !endDate || Number.isNaN(endDate.getTime()) || now <= endDate;
    });

    const sortedEvents = [...visibleEvents].sort((a, b) => {
      const aStart = a.startDate
        ? new Date(a.startDate).getTime()
        : Number.POSITIVE_INFINITY;
      const bStart = b.startDate
        ? new Date(b.startDate).getTime()
        : Number.POSITIVE_INFINITY;
      return aStart - bStart;
    });

    if (selectedType === "All") return sortedEvents;

    return sortedEvents.filter((event) => event.eventType === selectedType);
  }, [events, selectedType]);

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="card-title">{title}</h2>
        <Link href={viewAllHref} className="secondary-btn">
          {viewAllLabel}
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {EVENT_TYPE_OPTIONS.map((option) => {
          const isActive = option.value === selectedType;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedType(option.value)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-white text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <EventGrid events={filteredEvents} />
    </section>
  );
}
