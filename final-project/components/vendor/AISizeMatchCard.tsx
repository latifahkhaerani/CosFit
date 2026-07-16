"use client";

import Image from "next/image";
import { CircleHelp } from "lucide-react";

const matches = [
  {
    image: "/images/model-1.jpg",
    height: 160,
    bust: 84,
    waist: 64,
    hip: 90,
    result: "Good Match",
    score: "92%",
  },
  {
    image: "/images/model-2.jpg",
    height: 168,
    bust: 92,
    waist: 72,
    hip: 90,
    result: "Possible Match",
    score: "72%",
  },
  {
    image: "/images/model-3.jpg",
    height: 175,
    bust: 98,
    waist: 78,
    hip: 102,
    result: "Not Enough Information",
    score: "--",
  },
];

export default function AISizeMatchCard() {
  return (
    <section className="card p-7">

      {/* Header */}

      <div className="mb-7 flex items-start justify-between">

        <div>

          <h2 className="card-title">
            AI Size Match Preview
          </h2>

          <p className="card-subtitle">
            See how this costume fits different body types.
          </p>

        </div>

        <CircleHelp
          size={18}
          className="text-[var(--muted)]"
        />

      </div>

      <div className="space-y-4">

        {matches.map((item) => (
          <MatchCard
            key={item.height}
            {...item}
          />
        ))}

      </div>

    </section>
  );
}

function MatchCard({
  image,
  height,
  bust,
  waist,
  hip,
  result,
  score,
}: {
  image: string;
  height: number;
  bust: number;
  waist: number;
  hip: number;
  result: string;
  score: string;
}) {
  return (
    <div className="group flex gap-4 rounded-3xl border border-[var(--border)] p-4 transition hover:border-[#F3D7CC] hover:bg-[#FCFBFA]">

      <Image
        src={image}
        alt=""
        width={70}
        height={90}
        className="rounded-2xl object-cover"
      />

      <div className="flex-1">

        <p className="text-sm text-[var(--muted)]">

          Height {height} cm

        </p>

        <p className="mt-1 text-sm text-[var(--muted)]">

          Bust {bust} • Waist {waist} • Hip {hip}

        </p>

        <div className="mt-3 flex items-center gap-3">

          <MatchBadge result={result} />

          <span className="text-sm font-medium text-[var(--muted)]">

            Fit Score: {score}

          </span>

        </div>

      </div>

    </div>
  );
}

function MatchBadge({
  result,
}: {
  result: string;
}) {
  let className =
    "bg-green-100 text-green-700";

  if (result === "Possible Match")
    className =
      "bg-orange-100 text-orange-700";

  if (result === "Not Enough Information")
    className =
      "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {result}
    </span>
  );
}