"use client";

import Image from "next/image";

const members = [
  "/images/avatar1.jpg",
  "/images/avatar2.jpg",
  "/images/avatar3.jpg",
  "/images/avatar4.jpg",
  "/images/avatar5.jpg",
  "/images/avatar6.jpg",
];

export default function OnlineMembers() {
  return (
    <section className="card p-6">

      <div className="mb-6">

        <h3 className="card-title">

          Online Now

        </h3>

        <p className="card-subtitle">

          1,234 members online

        </p>

      </div>

      <div className="flex items-center">

        {members.map((avatar, index) => (

          <Image
            key={avatar}
            src={avatar}
            alt=""
            width={48}
            height={48}
            className="-mr-3 rounded-full border-4 border-white"
            style={{
              zIndex: members.length - index,
            }}
          />

        ))}

        <div className="ml-4 rounded-full bg-[#FCFBFA] px-4 py-3 text-sm font-semibold">

          +1.2K

        </div>

      </div>

      <button className="secondary-btn mt-6 w-full">

        See All Members

      </button>

    </section>
  );
}