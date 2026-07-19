"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Users, ArrowRight, Ticket } from "lucide-react";

type Props = {
  image: string;
  category: string;
  title: string;
  date: string;
  location: string;
  participants: string;
  price: string;
  status: "Upcoming" | "Ongoing" | "Completed";
};

export default function UpcomingEventCard({
  image,
  category,
  title,
  date,
  location,
  participants,
  price,
  status,
}: Props) {
  const statusStyle = {
    Upcoming: "bg-green-100 text-green-700",
    Ongoing: "bg-orange-100 text-orange-700",
    Completed: "bg-gray-100 text-gray-600",
  };

  return (
    <article
      className="
      card
      group
      overflow-hidden
      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-soft
      "
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={700}
          height={500}
          className="
          h-56
          w-full
          object-cover

          transition-transform
          duration-500

          group-hover:scale-105
          "
        />

        {/* Category */}

        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-xl">
            {category}
          </span>
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <h3
          className="
          text-xl
          font-semibold
          leading-snug

          transition-colors

          group-hover:text-[var(--primary)]
          "
        >
          {title}
        </h3>

        {/* Date */}

        <div className="mt-5 flex items-center gap-3 text-sm">
          <CalendarDays size={16} className="text-[var(--primary)]" />

          <span>{date}</span>
        </div>

        {/* Location */}

        <div className="mt-3 flex items-center gap-3 text-sm">
          <MapPin size={16} className="text-[var(--primary)]" />

          <span className="text-[var(--muted)]">{location}</span>
        </div>

        {/* Divider */}

        <div className="my-6 h-px bg-[var(--border)]" />

        {/* Footer */}

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-[var(--primary)]" />

            {participants}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Ticket size={16} className="text-[var(--primary)]" />

            {price}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[status]}`}
          >
            {status}
          </span>
        </div>

        {/* BUTTON */}

        <button
          className="
          secondary-btn
          flex
          w-full
          items-center
          justify-center
          gap-2

          hover:bg-[var(--primary)]
          hover:text-white
          "
        >
          Join Event
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
