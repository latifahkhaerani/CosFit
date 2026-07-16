import Link from "next/link";
import AllEventsClient from "@/components/events/AllEventsClient";
import type { GetOurEvent } from "@/app/types";

const allEvents: GetOurEvent[] = Array.from({ length: 20 }, (_, i) => ({
  _id: `event-${i}`,
  eventName: "",
  category: "",
  imgUrl: "",
  forumId: "",
  description: "",
}));

export default function AllEventsPage() {
  return (
    <main className="page-container">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="card-title">All Events</h1>
        <Link href="/events" className="secondary-btn">
          Back to Events
        </Link>
      </div>

      <AllEventsClient events={allEvents} />
    </main>
  );
}
