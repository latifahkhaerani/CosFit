"use client";

import Image from "next/image";

const events = [
  {
    title: "Cosplay Festival",

    image: "/images/event1.jpg",

    date: "May 25",
  },

  {
    title: "Design Contest",

    image: "/images/event2.jpg",

    date: "Jun 10",
  },
];

export default function UpcomingEventCard() {
  return (
    <div className="card p-6">
      <div className="mb-6 flex justify-between">
        <h3 className="card-title">Upcoming Events</h3>

        <button className="text-sm text-(--primary)">View All</button>
      </div>

      <div className="space-y-5">
        {events.map((event) => (
          <div key={event.title} className="flex gap-4">
            <Image
              src={event.image}
              alt=""
              width={80}
              height={70}
              className="rounded-2xl object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="font-semibold">{event.title}</h4>

                <p className="text-sm text-(--muted)">{event.date}</p>
              </div>

              <button className="secondary-btn mt-2 w-fit px-4 py-2">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
