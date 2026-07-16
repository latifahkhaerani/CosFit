"use client";

import { Sparkles, Tag } from "lucide-react";
import type { GetOurEvent } from "@/app/types";

export interface UpcomingEventsProps {
  title?: string;
  viewAllLabel?: string;
  events?: GetOurEvent[];
  onViewAll?: () => void;
  onSelectEvent?: (eventId: string) => void;
}

const placeholderEvents: GetOurEvent[] = Array.from({ length: 3 }, (_, i) => ({
  _id: `event-${i}`,
  eventName: "",
  category: "",
  imgUrl: "",
  forumId: "",
  description: "",
}));

function EventCard({
  event,
  onSelect,
}: {
  event: GetOurEvent;
  onSelect?: (eventId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(event._id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:shadow-sm"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-cream/30">
        {event.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imgUrl}
            alt={event.eventName || "Event"}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            Event image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="flex w-fit items-center gap-1 rounded-full bg-cream/40 px-2.5 py-1 text-[10px] font-medium text-primary">
          <Tag className="h-3 w-3" />
          {event.category || "Category"}
        </span>
        <p className="text-sm font-semibold text-foreground">
          {event.eventName || "Event Name"}
        </p>
        <p className="line-clamp-2 text-xs text-muted">
          {event.description || "Short description of this event."}
        </p>
      </div>
    </button>
  );
}

export default function UpcomingEvents({
  title = "Upcoming Events",
  viewAllLabel = "View All Events",
  events = placeholderEvents,
  onViewAll,
  onSelectEvent,
}: UpcomingEventsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-serif text-xl font-semibold text-foreground">
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} onSelect={onSelectEvent} />
        ))}
      </div>
    </section>
  );
}
