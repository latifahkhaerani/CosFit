"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarPlus,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

export default function HeroEvent() {
  return (
    <section className="relative overflow-hidden rounded-[36px]">

      {/* Background */}

      <Image
        src="/images/events/hero.jpg"
        alt="CosFit Events"
        width={1800}
        height={900}
        className="h-[560px] w-full object-cover"
      />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#8E332F]/90 via-[#B14744]/75 to-transparent" />

      {/* Decoration */}

      <div className="absolute right-16 top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute left-14 top-14">

        <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold tracking-widest text-white backdrop-blur-xl">

          COMMUNITY · CREATIVITY · COSPLAY

        </span>

      </div>

      {/* Content */}

      <div className="absolute inset-0 flex items-center">

        <div className="max-w-2xl px-14">

          <div className="mb-5 flex items-center gap-3 text-[#FFD28F]">

            <Sparkles size={22} />

            <span className="font-semibold">

              COSFIT COMMUNITY

            </span>

          </div>

          <h1 className="max-w-xl text-6xl font-bold leading-[1.05] text-white">

            Join the

            <br />

            CosFit Events

          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-white/90">

            Participate in cosplay competitions,
            fashion design contests,
            workshops,
            conventions,
            and meet thousands of passionate cosplayers.

          </p>

          {/* CTA */}

          <div className="mt-10 flex gap-5">

            <button className="primary-btn flex items-center gap-3 px-8 py-4 shadow-soft hover:scale-[1.02]">

              Explore Events

              <ArrowRight size={18} />

            </button>

            <button className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-xl transition hover:bg-white/20">

              <div className="flex items-center gap-3">

                <CalendarPlus size={18} />

                Create Event

              </div>

            </button>

          </div>

          {/* Stats */}

          <div className="mt-14 flex gap-5">

            <StatCard
              icon={<Trophy size={20} />}
              title="120+"
              subtitle="Events"
            />

            <StatCard
              icon={<Users size={20} />}
              title="48K+"
              subtitle="Participants"
            />

            <StatCard
              icon={<Sparkles size={20} />}
              title="250+"
              subtitle="Winners"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

function StatCard({
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
      rounded-3xl
      border
      border-white/20
      bg-white/10
      px-6
      py-5
      backdrop-blur-xl
      "
    >
      <div className="mb-3 text-[#FFD28F]">

        {icon}

      </div>

      <h3 className="text-3xl font-bold text-white">

        {title}

      </h3>

      <p className="mt-1 text-white/80">

        {subtitle}

      </p>

    </div>
  );
}