"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GetOurEvent } from "@/app/types";
import { getEventStatus } from "@/app/helpers/getEventStatus";

export interface EventCardProps {
  event: GetOurEvent;
  joinLabel?: string;
}

export default function EventCard({
  event,
  joinLabel = "Join Event",
}: EventCardProps) {
  const status = getEventStatus(event.startDate, event.endDate);
  const isInternalContest = event.eventType === "internal_contest";
  const ctaHref = `/events/${event.slug}`;
  const ctaLabel = isInternalContest ? "Lihat Kontes" : "Lihat Detail Acara";

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link
        href={`/events/${event.slug}`}
        className="relative block aspect-video w-full shrink-0 overflow-hidden bg-[#FCFBFA]"
      >
        {event.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imgUrl}
            alt={event.eventName || "Event"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted">
            Event image
          </div>
        )}

        {event.category ? (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-xl">
            {event.category}
          </span>
        ) : null}

        <span
          className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-xl ${status.colorClass}`}
        >
          {status.label}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-8">
        <Link href={`/events/${event.slug}`}>
          <h3 className="line-clamp-2 text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
            {event.eventName || "Event Name"}
          </h3>
        </Link>

        <p className="mb-3 mt-3 line-clamp-2 text-sm text-muted">
          {event.description || "Short description of this event."}
        </p>

        {event.startDate ? (
          <div className="mb-4 text-sm text-muted">
            {new Intl.DateTimeFormat("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(event.startDate))}
          </div>
        ) : null}

        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {isInternalContest ? "🏆 Kontes Internal" : "📍 Event Convention"}
          </span>
        </div>

        <Link
          href={ctaHref}
          className="secondary-btn mt-auto flex w-full items-center justify-center gap-2 hover:bg-primary hover:text-white"
        >
          {ctaLabel || joinLabel}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
