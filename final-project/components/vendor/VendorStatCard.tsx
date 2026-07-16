"use client";

import { LucideIcon, TrendingUp } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  growth: string;
  icon: LucideIcon;
  color: string;
};

export default function VendorStatCard({
  title,
  value,
  growth,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: `${color}15`,
            color,
          }}
        >
          <Icon size={26} />
        </div>
      </div>

      <p className="text-sm text-(--muted)">{title}</p>

      <h2 className="mt-2 text-4xl font-bold">{value}</h2>

      <div className="mt-6 flex items-center gap-2 text-sm text-green-600">
        <TrendingUp size={15} />

        {growth}
      </div>
    </div>
  );
}
