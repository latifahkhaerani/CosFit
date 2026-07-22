"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GetOurEvent } from "@/app/types";
import EventGrid from "./EventGrid";
import EventCategoryFilter from "./EventCategoryFilter";

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

const ALL_LABEL = "All";

export default function EventsClient({
  title = "Upcoming Events",
  viewAllLabel = "View All Events",
  viewAllHref = "/events/all",
  events = placeholderEvents,
}: EventsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(ALL_LABEL);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(events.map((event) => event.category).filter(Boolean)),
      ),
    [events],
  );

  const filteredEvents = useMemo(() => {
    if (selectedCategory === ALL_LABEL) return events;
    return events.filter((event) => event.category === selectedCategory);
  }, [events, selectedCategory]);

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="card-title">{title}</h2>
        <Link href={viewAllHref} className="secondary-btn">
          {viewAllLabel}
        </Link>
      </div>

      {categories.length > 0 ? (
        <div className="mb-8">
          <EventCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            allLabel={ALL_LABEL}
          />
        </div>
      ) : null}

      <EventGrid events={filteredEvents} />
    </section>
  );
}
