"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";

const events = [
  {
    title: "Cosplay Festival",
    image: "/images/event1.jpg",
    date: "May 25",
    location: "Jakarta Convention Center",
  },
  {
    title: "Design Contest",
    image: "/images/event2.jpg",
    date: "Jun 10",
    location: "Bandung Creative Hub",
  },
];

export default function UpcomingEventCard() {
  return (
    <section className="card p-7">

      {/* Header */}

      <div className="mb-7 flex items-center justify-between">

        <div>

          <h3 className="card-title">
            Upcoming Events
          </h3>

          <p className="card-subtitle">
            Join cosplay competitions & festivals
          </p>

        </div>

        <button className="group flex items-center gap-2 text-sm font-medium text-[var(--primary)]">

          View All

          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />

        </button>

      </div>

      {/* Events */}

      <div className="space-y-4">

        {events.map((event) => (

          <div
            key={event.title}
            className="group flex gap-4 rounded-3xl p-3 transition-all duration-300 hover:bg-[#FCFBFA]"
          >

            {/* Image */}

            <div className="relative overflow-hidden rounded-3xl">

              <Image
                src={event.image}
                alt={event.title}
                width={96}
                height={96}
                className="h-24 w-24 object-cover transition duration-500 group-hover:scale-105"
              />

            </div>

            {/* Content */}

            <div className="flex flex-1 flex-col justify-between">

              <div>

                <h4 className="font-semibold text-[var(--text)]">

                  {event.title}

                </h4>

                <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">

                  <CalendarDays size={15} />

                  {event.date}

                </div>

                <p className="mt-1 text-sm text-[var(--muted)]">

                  {event.location}

                </p>

              </div>

              <button className="primary-btn mt-4 w-fit px-5 py-2 text-sm">

                Join Event

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}