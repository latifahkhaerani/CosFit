"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { GetOurEvent } from "@/app/types";

export default function EventDetailHero({ event }: { event: GetOurEvent }) {
  return (
    <section className="relative overflow-hidden rounded-[36px]">
      <Link
        href="/events"
        className="absolute left-8 top-8 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/20"
      >
        <ArrowLeft size={16} />
        Back to Events
      </Link>

      <div className="aspect-[21/9] w-full bg-[#FCFBFA]">
        {event.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imgUrl}
            alt={event.eventName || "Event"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
            Event image
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
        {event.category ? (
          <span className="badge-warning">{event.category}</span>
        ) : null}

        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl">
          {event.eventName || "Event Name"}
        </h1>
      </div>
    </section>
  );
}
