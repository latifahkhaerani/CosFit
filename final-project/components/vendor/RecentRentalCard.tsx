"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const rentals = [
  {
    name: "Dewi Anjani",
    costume: "Raiden Shogun",
    avatar: "/images/avatar1.jpg",
    date: "May 18, 2025",
    status: "Pending",
  },
  {
    name: "Rizky Pratama",
    costume: "Saber",
    avatar: "/images/avatar2.jpg",
    date: "May 17, 2025",
    status: "Pending",
  },
  {
    name: "Kevin Jonathan",
    costume: "Levi Ackerman",
    avatar: "/images/avatar3.jpg",
    date: "May 15, 2025",
    status: "Confirmed",
  },
];

export default function RecentRentalCard() {
  return (
    <section className="card p-7">

      {/* Header */}

      <div className="mb-7 flex items-center justify-between">

        <div>

          <h3 className="card-title">
            Recent Rental Requests
          </h3>

          <p className="card-subtitle">
            Latest customer rental requests
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

      {/* List */}

      <div className="space-y-3">

        {rentals.map((item) => (
          <div
            key={item.name}
            className="group flex items-center justify-between rounded-3xl p-4 transition-all duration-300 hover:bg-[#FCFBFA]"
          >
            {/* Left */}

            <div className="flex items-center gap-4">

              <Image
                src={item.avatar}
                alt={item.name}
                width={54}
                height={54}
                className="rounded-full object-cover ring-2 ring-[#F8EFE9]"
              />

              <div>

                <h4 className="font-semibold text-[var(--text)]">

                  {item.name}

                </h4>

                <p className="mt-1 text-sm text-[var(--muted)]">

                  {item.costume}

                </p>

              </div>

            </div>

            {/* Right */}

            <div className="flex flex-col items-end gap-2">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-[var(--primary)]"
                }`}
              >
                {item.status}
              </span>

              <span className="text-xs text-[var(--muted)]">

                {item.date}

              </span>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}