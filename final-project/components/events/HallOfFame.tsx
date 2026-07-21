"use client";

import { Trophy } from "lucide-react";
import type { GetUserDesign } from "@/app/types";
import HallOfFameCard from "./HallOfFameCard";

export interface HallOfFameProps {
  designs: GetUserDesign[];
  limit?: number;
}

export default function HallOfFame({ designs, limit = 4 }: HallOfFameProps) {
  const topDesigns = [...designs].sort((a, b) => b.vote - a.vote).slice(0, limit);

  return (
    <section>
      <div className="mb-8">
        <h2 className="card-title">Hall of Fame</h2>
      </div>

      {topDesigns.length > 0 ? (
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {topDesigns.map((design, index) => (
            <HallOfFameCard key={design._id} design={design} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--border)] bg-white py-24 text-center">
          <Trophy className="h-10 w-10 text-[var(--muted)]" />
          <p className="text-base font-medium">No data available for now</p>
          <p className="text-sm text-[var(--muted)]">
            Winning community designs will show up here once votes come in.
          </p>
        </div>
      )}
    </section>
  );
}
