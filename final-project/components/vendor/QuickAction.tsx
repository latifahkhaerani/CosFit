"use client";

import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
};

export default function QuickAction({
  title,
  desc,
  color,
  icon,
}: Props) {
  return (
    <button className="group card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">

      {/* Icon */}

      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${color}15`,
          color,
        }}
      >
        {icon}
      </div>

      {/* Text */}

      <h3 className="text-lg font-semibold text-[var(--text)]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {desc}
      </p>

      {/* Arrow */}

      <div className="mt-8 flex justify-end">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCFBFA] transition group-hover:bg-[var(--primary)] group-hover:text-white">

          <ArrowRight size={18} />

        </div>

      </div>

    </button>
  );
}