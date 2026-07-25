import Link from "next/link";
import EventNewsletter from "@/components/events/EventNewsletter";
import FeaturedEventCard from "@/components/events/FeaturedEventCard";
import HeroEvent from "@/components/events/HeroEvent";
import EventsClient from "@/components/events/EventsClient";
import OurEventModel from "@/db/models/ourEventModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import { ArrowRight, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = (await OurEventModel.getAllEvents()).map(serializeEvent);
  const [featuredEvent, ...upcomingEvents] = events;
  const now = new Date();

  const pastEvents = [...events]
    .filter((event) => {
      if (!event.endDate) return false;

      const endDate = new Date(event.endDate);
      return !Number.isNaN(endDate.getTime()) && now > endDate;
    })
    .sort((a, b) => {
      const aEnd = a.endDate ? new Date(a.endDate).getTime() : 0;
      const bEnd = b.endDate ? new Date(b.endDate).getTime() : 0;
      return bEnd - aEnd;
    });

  return (
    <main className="page-container space-y-14">
      <HeroEvent />

      <FeaturedEventCard event={featuredEvent} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button className="secondary-btn bg-primary text-white hover:bg-primary/90">
            All
          </button>
          <button className="secondary-btn">Contests</button>
          <button className="secondary-btn">Conventions</button>
        </div>
      </section>

      <EventsClient
        events={
          upcomingEvents.length > 0 ? upcomingEvents.slice(0, 4) : undefined
        }
      />

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="card-title">Past Events & Winners</h2>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {pastEvents.slice(0, 4).map((event) => {
            const participantCount = event.entries?.length ?? 0;
            const ctaLabel =
              event.eventType === "internal_contest"
                ? "🏆 Lihat Pemenang"
                : "📸 Lihat Galeri";

            return (
              <article
                key={event._id}
                className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative flex-shrink-0 overflow-hidden">
                  {event.imgUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.imgUrl}
                      alt={event.eventName || "Past event"}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-[#FCFBFA] text-sm text-muted">
                      Event image
                    </div>
                  )}

                  <div className="absolute left-5 top-5">
                    <span className="badge-warning flex items-center gap-2">
                      {event.eventType === "internal_contest" ? "🏆" : "📍"}
                      {event.eventType === "internal_contest"
                        ? "Winner"
                        : "Past Event"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="line-clamp-2 text-xl font-semibold">
                    {event.eventName || "Event Name"}
                  </h3>

                  <div className="mt-5 flex items-center gap-2 text-sm text-muted">
                    <Users size={16} className="text-[var(--primary)]" />
                    {participantCount} Participants
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="secondary-btn mt-auto flex w-full items-center justify-center gap-2"
                  >
                    {ctaLabel}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <EventNewsletter />
    </main>
  );
}
