"use client";
import {
  CalendarDays,
  CircleCheck,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  growth: string;
  icon: "calendar" | "trophy" | "users" | "check";
  color: string;
};

const ICONS = {
  calendar: CalendarDays,
  trophy: Trophy,
  users: Users,
  check: CircleCheck,
};

export default function VendorStatCard({
  title,
  value,
  growth,
  icon,
  color,
}: Props) {
  const Icon = ICONS[icon] ?? CalendarDays;

  return (
    <div className="card group relative overflow-hidden p-6 hover:-translate-y-1 transition-all duration-300">
      <div
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-20"
        style={{
          background: color,
        }}
      />
      <div className="mt-8 flex h-14 items-end gap-1">
        {[18, 24, 20, 30, 28, 38, 34, 45].map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${bar}px`,
              background: color,
              opacity: 0.15 + i / 12,
            }}
          />
        ))}
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div
          className="icon-wrapper"
          style={{
            background: `${color}15`,
            color,
          }}
        >
          <Icon size={26} />
        </div>
      </div>

      <p className="text-sm text-(--muted)">{title}</p>

      <h2 className="mt-2 text-5xl font-bold tracking-tight">{value}</h2>

      <div className="mt-6 flex items-center gap-2 text-sm text-green-600">
        <TrendingUp size={15} />

        {growth}
      </div>
    </div>
  );
}
