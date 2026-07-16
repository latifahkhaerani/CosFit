"use client";

import Link from "next/link";
import { MessagesSquare, ArrowRight } from "lucide-react";
import type { GetOurEvent } from "@/app/types";

export default function EventDetailInfo({ event }: { event: GetOurEvent }) {
  return (
    <section className="card p-8">
      <h2 className="card-title">About This Event</h2>

      <p className="mt-4 max-w-4xl leading-8 text-[var(--muted)]">
        {event.description || "Short description of this event."}
      </p>

      <div className="mt-8 flex flex-wrap gap-4 border-t border-[var(--border)] pt-8">
        {event.forumId ? (
          <Link
            href={`/forum/${event.forumId}`}
            className="primary-btn flex items-center gap-2"
          >
            <MessagesSquare size={18} />
            Join Discussion
          </Link>
        ) : null}

        <Link href="/events" className="secondary-btn flex items-center gap-2">
          Back to Events
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
