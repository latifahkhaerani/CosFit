"use client";

import Image from "next/image";
import {
  CalendarDays,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default function FeaturedEvent() {
  return (
    <section>

      {/* Section Title */}

      <div className="mb-6 flex items-center gap-2">

        <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />

        <h2 className="card-title">
          Featured Event
        </h2>

      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">

        {/* LEFT */}

        <div className="group relative overflow-hidden rounded-[32px]">

          <Image
            src="/images/events/featured.jpg"
            alt=""
            width={900}
            height={700}
            className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
            "
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge */}

          <div className="absolute left-6 top-6">

            <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl">

              COSPLAY CONTEST

            </span>

          </div>

          {/* Bottom */}

          <div className="absolute bottom-7 left-7">

            <h3 className="text-4xl font-bold text-white">

              CosFit Championship

            </h3>

            <p className="mt-2 text-white/90">

              2025 Grand Final

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="card flex flex-col justify-between p-8">

          <div>

            <span className="badge-warning">

              Featured Event

            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight">

              CosFit Cosplay Championship 2025

            </h2>

            <p className="mt-5 leading-8 text-[var(--muted)]">

              The biggest cosplay competition in Indonesia.
              Meet thousands of cosplayers,
              compete with amazing costumes,
              and win exciting prizes.

            </p>

          </div>

          {/* Stats */}

          <div className="my-8 grid grid-cols-3 gap-4">

            <InfoCard
              icon={<CalendarDays size={20} />}
              title="May 25"
              subtitle="Deadline"
            />

            <InfoCard
              icon={<Users size={20} />}
              title="1,248"
              subtitle="Participants"
            />

            <InfoCard
              icon={<Trophy size={20} />}
              title="$10K"
              subtitle="Prize Pool"
            />

          </div>

          {/* CTA */}

          <button
            className="
            primary-btn
            flex
            items-center
            justify-center
            gap-3
            py-4
            text-lg
            hover:scale-[1.01]
            "
          >
            Join Event

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-[var(--border)]
      bg-[#FCFBFA]
      p-5
      text-center
      transition
      hover:bg-white
      hover:shadow-card
      "
    >
      <div className="mb-3 flex justify-center text-[var(--primary)]">

        {icon}

      </div>

      <h4 className="text-xl font-bold">

        {title}

      </h4>

      <p className="mt-1 text-sm text-[var(--muted)]">

        {subtitle}

      </p>

    </div>
  );
}