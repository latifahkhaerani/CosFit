"use client";

import Image from "next/image";

const rentals = [
  {
    name: "Dewi Anjani",

    costume: "Raiden Shogun",

    avatar: "/images/avatar1.jpg",

    date: "May 18",

    status: "Pending",
  },

  {
    name: "Rizky Pratama",

    costume: "Saber",

    avatar: "/images/avatar2.jpg",

    date: "May 17",

    status: "Pending",
  },

  {
    name: "Kevin Jonathan",

    costume: "Levi Ackerman",

    avatar: "/images/avatar3.jpg",

    date: "May 15",

    status: "Confirmed",
  },
];

export default function RecentRentalCard() {
  return (
    <div className="card p-6">
      <div className="mb-6 flex justify-between">
        <h3 className="card-title">Recent Rental Requests</h3>

        <button className="text-sm text-(--primary)">View All</button>
      </div>

      <div className="space-y-5">
        {rentals.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={item.avatar}
                alt=""
                width={45}
                height={45}
                className="rounded-full"
              />

              <div>
                <h4 className="font-medium">{item.name}</h4>

                <p className="text-sm text-(--muted)">{item.costume}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="badge-warning">{item.status}</span>

              <p className="mt-1 text-xs text-(--muted)">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
