"use client";

import Image from "next/image";
import { Trophy, Star, Heart } from "lucide-react";

type Props = {
  image: string;
  name: string;
  character: string;
  likes: number;
};

export default function FeaturedWinnerCard({
  image,
  name,
  character,
  likes,
}: Props) {
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
      <div className="relative overflow-hidden">

        <Image
          src={image}
          alt={name}
          width={500}
          height={650}
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-5 top-5">

          <span className="badge-warning flex items-center gap-2">

            <Trophy size={14} />

            Champion

          </span>

        </div>

      </div>

      <div className="p-6">

        <h3 className="text-xl font-semibold">

          {name}

        </h3>

        <p className="mt-1 text-[var(--muted)]">

          {character}

        </p>

        <div className="mt-5 flex items-center justify-between">

          <div className="flex text-yellow-400">

            <Star fill="currentColor" size={17} />

            <Star fill="currentColor" size={17} />

            <Star fill="currentColor" size={17} />

            <Star fill="currentColor" size={17} />

            <Star fill="currentColor" size={17} />

          </div>

          <div className="flex items-center gap-2 text-sm">

            <Heart size={16} />

            {likes}

          </div>

        </div>

      </div>
    </article>
  );
}