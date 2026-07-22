"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  Sparkles,
  Store,
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
        fill
        className="object-cover"
      />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#8E332F] via-[#B14744] to-[#D89C73]" />

      {/* Decoration */}

      <div className="absolute right-16 top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <Trophy className="pointer-events-none absolute -bottom-10 right-72 hidden h-72 w-72 text-white/5 lg:block" />

      {/* Content */}

      <div className="relative z-10 flex flex-col gap-10 px-14 py-14 lg:flex-row lg:items-center lg:gap-14 lg:py-20">
        <div className="lg:flex-1">
          <div className="mb-5 flex items-center gap-3 text-[#FFD28F]">
            <Sparkles size={22} />

            <span className="font-semibold">COSFIT COMMUNITY</span>
          </div>

          <h1 className="text-7xl font-bold leading-[1.05] text-white">
            Join the
            <br />
            CosFit Events
          </h1>

          <p className="mt-7 max-w-xl text-xl leading-8 text-white/90">
            Participate in cosplay competitions, fashion design contests,
            workshops, conventions, and meet thousands of passionate cosplayers.
          </p>

          {/* CTA */}

          <div className="mt-10 flex gap-5">
            <Link
              href="/events/all"
              className="primary-btn flex items-center gap-3 px-8 py-4 shadow-soft hover:scale-[1.02]"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Stats sidebar */}

        <div className="grid grid-cols-2 gap-6 lg:w-[460px] lg:flex-shrink-0">
          <StatCard
            icon={<Trophy size={24} />}
            title="120+"
            subtitle="Events"
          />

          <StatCard
            icon={<Users size={24} />}
            title="48K+"
            subtitle="Participants"
          />

          <StatCard
            icon={<Sparkles size={24} />}
            title="250+"
            subtitle="Winners"
          />

          <StatCard icon={<Store size={24} />} title="80+" subtitle="Vendors" />
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
    <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-6 backdrop-blur-xl transition">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#FFD28F]">
        {icon}
      </div>

      <h3 className="mt-4 text-2xl font-bold leading-tight text-white">
        {title}
      </h3>

      <p className="mt-1 text-white/80">{subtitle}</p>
    </div>
  );
}
