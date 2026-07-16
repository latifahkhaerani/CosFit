"use client";

import Image from "next/image";

const users = [
  {
    name: "Mika Chan",
    role: "Vendor",
    point: 320,
    image: "/images/avatar1.jpg",
    color: "#8B5CF6",
  },
  {
    name: "Ryuunosuke",
    role: "Moderator",
    point: 285,
    image: "/images/avatar2.jpg",
    color: "#F97316",
  },
  {
    name: "Hana Yuki",
    role: "Cosplayer",
    point: 210,
    image: "/images/avatar3.jpg",
    color: "#10B981",
  },
  {
    name: "Aoi Cosplay",
    role: "Cosplayer",
    point: 150,
    image: "/images/avatar4.jpg",
    color: "#10B981",
  },
];

export default function TopContributors() {
  return (
    <section className="card p-6">

      <h3 className="card-title mb-6">

        Top Contributors

      </h3>

      <div className="space-y-5">

        {users.map((user) => (

          <div
            key={user.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <Image
                src={user.image}
                alt=""
                width={46}
                height={46}
                className="rounded-full"
              />

              <div>

                <h4 className="font-medium">

                  {user.name}

                </h4>

                <span
                  className="mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium"
                  style={{
                    background: `${user.color}15`,
                    color: user.color,
                  }}
                >
                  {user.role}
                </span>

              </div>

            </div>

            <span className="font-semibold">

              {user.point} pts

            </span>

          </div>

        ))}

      </div>

      <button className="secondary-btn mt-6 w-full">

        View Leaderboard

      </button>

    </section>
  );
}