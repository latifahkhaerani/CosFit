"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import type { GetOurEvent } from "@/app/types";

export interface UpcomingEventsProps {
  title?: string;
  viewAllLabel?: string;
  events?: GetOurEvent[];
  joinLabel?: string;
  onViewAll?: () => void;
  onSelectEvent?: (eventId: string) => void;
}

const placeholderEvents: GetOurEvent[] = Array.from({ length: 4 }, (_, i) => ({
  _id: `event-${i}`,
  eventName: "",
  category: "",
  imgUrl: "",
  forumId: "",
  description: "",
}));

function EventCard({
  event,
  joinLabel,
  onSelect,
}: {
  event: GetOurEvent;
  joinLabel: string;
  onSelect?: (eventId: string) => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-video w-full overflow-hidden bg-cream/30">
        {event.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imgUrl}
            alt={event.eventName || "Event"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            Event image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {event.category || "Category"}
        </p>
        <p className="text-lg font-semibold text-foreground">
          {event.eventName || "Event Name"}
        </p>
        <p className="line-clamp-2 text-sm text-muted">
          {event.description || "Short description of this event."}
        </p>

        <button
          type="button"
          onClick={() => onSelect?.(event._id)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-cream/40"
        >
          {joinLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function UpcomingEvents({
  title = "Upcoming Events",
  viewAllLabel = "View All Events",
  events = placeholderEvents,
  joinLabel = "Join Event",
  onViewAll,
  onSelectEvent,
}: UpcomingEventsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-serif text-2xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-4 w-4 text-accent" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-secondary"
        >
          {viewAllLabel} &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} joinLabel={joinLabel} onSelect={onSelectEvent} />
        ))}
      </div>
    </section>
  );
}
