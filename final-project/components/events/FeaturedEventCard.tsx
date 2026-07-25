"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GetOurEvent } from "@/app/types";
import { getEventStatus } from "@/app/helpers/getEventStatus";

export interface FeaturedEventCardProps {
  event?: GetOurEvent;
  joinLabel?: string;
}

const placeholderEvent: GetOurEvent = {
  _id: "featured-event",
  slug: "featured-event",
  eventName: "",
  category: "",
  imgUrl: "",
  forumId: "",
  description: "",
};

const formatEventDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate) {
    return "";
  }

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  if (Number.isNaN(start.getTime())) {
    return "";
  }

  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const startDateText = dateFormatter.format(start);
  const startTimeText = timeFormatter.format(start);
  const endDateText =
    end && !Number.isNaN(end.getTime()) ? dateFormatter.format(end) : null;
  const endTimeText =
    end && !Number.isNaN(end.getTime()) ? timeFormatter.format(end) : null;

  if (endDateText && endDateText === startDateText) {
    return `${startDateText}, ${startTimeText}${endTimeText ? ` - ${endTimeText}` : ""}`;
  }

  if (endDateText) {
    return `${startDateText}${startTimeText !== "00:00" ? `, ${startTimeText}` : ""} - ${endDateText}`;
  }

  return startDateText;
};

export default function FeaturedEventCard({
  event = placeholderEvent,
  joinLabel = "Join Event",
}: FeaturedEventCardProps) {
  const status = getEventStatus(event.startDate, event.endDate);
  const eventDateRange = formatEventDateRange(event.startDate, event.endDate);

  return (
    <section>
      <div className="mb-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
        <h2 className="card-title">Featured Event</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        {/* LEFT: image */}
        <Link
          href={`/events/${event.slug}`}
          className="group relative block min-h-[320px] overflow-hidden rounded-[32px] bg-[#FCFBFA]"
        >
          {event.imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.imgUrl}
              alt={event.eventName || "Featured event"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
              Event image
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {event.category ? (
            <div className="absolute left-6 top-6">
              <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl">
                {event.category}
              </span>
            </div>
          ) : null}

          <div className="absolute bottom-7 left-7">
            <h3 className="text-4xl font-bold text-white">
              {event.eventName || "Event Name"}
            </h3>
          </div>
        </Link>

        {/* RIGHT: info */}
        <div className="card flex flex-col justify-between p-8">
          <div>
            {event.category ? (
              <span className="badge-warning">{event.category}</span>
            ) : null}

            <h2 className="mt-4 text-4xl font-bold leading-tight">
              {event.eventName || "Event Name"}
            </h2>

            {eventDateRange ? (
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-sm text-[var(--muted)]">{eventDateRange}</p>
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${status.colorClass}`}
                >
                  {status.label}
                </span>
              </div>
            ) : null}

            <p className="mt-5 leading-8 text-[var(--muted)]">
              {event.description || "Short description of this event."}
            </p>
          </div>

          <Link
            href={`/events/${event.slug}`}
            className="primary-btn mt-8 flex items-center justify-center gap-3 py-4 text-lg hover:scale-[1.01]"
          >
            {joinLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
