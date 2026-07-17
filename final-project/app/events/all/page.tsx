import Link from "next/link";
import AllEventsClient from "@/components/events/AllEventsClient";
import OurEventModel from "@/db/models/ourEventModel";
import serializeEvent from "@/app/helpers/serializeEvent";

export const dynamic = "force-dynamic";

export default async function AllEventsPage() {
  const events = await OurEventModel.getAllEvents();
  const serializedEvents = events.map(serializeEvent);

  return (
    <main className="page-container">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="card-title">All Events</h1>
        <Link href="/events" className="secondary-btn">
          Back to Events
        </Link>
      </div>

      <AllEventsClient events={serializedEvents} />
    </main>
  );
}
