"use client";

import Image from "next/image";
import {
  Trophy,
  ArrowRight,
  Users,
} from "lucide-react";

type Props = {
  image: string;
  title: string;
  participants: string;
};

export default function PastEventCard({
  image,
  title,
  participants,
}: Props) {
  return (
    <article
      className="
      card
      group
      flex
      h-full
      flex-col
      overflow-hidden

      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-soft
      "
    >
      {/* IMAGE */}

      <div className="relative flex-shrink-0 overflow-hidden">

        <Image
          src={image}
          alt={title}
          width={700}
          height={450}
          className="
          h-56
          w-full
          object-cover

          transition-transform
          duration-500

          group-hover:scale-105
          "
        />

        {/* Badge */}

        <div className="absolute left-5 top-5">

          <span className="badge-warning flex items-center gap-2">

            <Trophy size={13} />

            Winner

          </span>

        </div>

      </div>

      <div className="flex flex-1 flex-col p-6">

        <h3 className="line-clamp-2 text-xl font-semibold">

          {title}

        </h3>

        <div className="mt-5 flex items-center gap-2 text-sm">

          <Users
            size={16}
            className="text-[var(--primary)]"
          />

          {participants} Participants

        </div>

        <button
          className="
          secondary-btn
          mt-auto
          flex
          w-full
          items-center
          justify-center
          gap-2
          "
        >
          View Gallery

          <ArrowRight size={16} />

        </button>

      </div>
    </article>
  );
}