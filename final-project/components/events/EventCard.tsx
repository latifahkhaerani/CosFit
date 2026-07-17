"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GetOurEvent } from "@/app/types";

export interface EventCardProps {
  event: GetOurEvent;
  joinLabel?: string;
}

export default function EventCard({ event, joinLabel = "Join Event" }: EventCardProps) {
  return (
    <article className="card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link
        href={`/events/${event._id}`}
        className="relative block aspect-video w-full overflow-hidden bg-[#FCFBFA]"
      >
        {event.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imgUrl}
            alt={event.eventName || "Event"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
            Event image
          </div>
        )}

        {event.category ? (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-xl">
            {event.category}
          </span>
        ) : null}
      </Link>

      <div className="p-6">
        <Link href={`/events/${event._id}`}>
          <h3 className="text-xl font-semibold leading-snug transition-colors group-hover:text-[var(--primary)]">
            {event.eventName || "Event Name"}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm text-[var(--muted)]">
          {event.description || "Short description of this event."}
        </p>

        <Link
          href={`/events/${event._id}`}
          className="secondary-btn mt-6 flex w-full items-center justify-center gap-2 hover:bg-[var(--primary)] hover:text-white"
        >
          {joinLabel}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
