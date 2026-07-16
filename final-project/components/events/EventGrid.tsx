"use client";

import { CalendarX2 } from "lucide-react";
import type { GetOurEvent } from "@/app/types";
import EventCard from "./EventCard";

export interface EventGridProps {
  events: GetOurEvent[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function EventGrid({
  events,
  emptyTitle = "No events found",
  emptyDescription = "Try a different category or check back later.",
}: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border)] bg-white py-24 text-center">
        <CalendarX2 className="h-10 w-10 text-[var(--muted)]" />
        <p className="text-base font-medium">{emptyTitle}</p>
        <p className="text-sm text-[var(--muted)]">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
