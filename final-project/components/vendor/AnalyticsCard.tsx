"use client";

import {
  Eye,
  Heart,
  Sparkles,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Views",
    value: "12,458",
    icon: Eye,
    color: "#CC8857",
  },
  {
    title: "Wishlist",
    value: "1,234",
    icon: Heart,
    color: "#B14744",
  },
  {
    title: "Virtual Try-Ons",
    value: "3,456",
    icon: Sparkles,
    color: "#7C6CF5",
  },
  {
    title: "Rental Requests",
    value: "89",
    icon: ShoppingBag,
    color: "#2E8B57",
  },
];

export default function AnalyticsCard() {
  return (
    <section className="card p-7">

      {/* Header */}

      <div className="mb-7">

        <h2 className="card-title">
          Product Analytics
        </h2>

        <p className="card-subtitle">
          Performance of this costume.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-[var(--border)] p-5 transition hover:bg-[#FCFBFA]"
            >

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                }}
              >
                <Icon size={22} />
              </div>

              <h3 className="text-3xl font-bold">

                {item.value}

              </h3>

              <p className="mt-1 text-sm text-[var(--muted)]">

                {item.title}

              </p>

            </div>
          );
        })}

      </div>

      {/* Divider */}

      <div className="my-8 border-t border-[var(--border)]" />

      {/* Conversion */}

      <div>

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h3 className="font-semibold">

              Conversion Rate

            </h3>

            <p className="text-sm text-[var(--muted)]">

              This Month

            </p>

          </div>

          <div className="flex items-center gap-2 text-green-600">

            <TrendingUp size={18} />

            <span className="font-semibold">

              4.8%

            </span>

          </div>

        </div>

        {/* Fake Chart */}

        <div className="flex h-28 items-end gap-2">

          {[35, 60, 48, 72, 55, 90, 70, 100].map((h, index) => (
            <div
              key={index}
              className="flex-1 rounded-full bg-gradient-to-t from-[var(--primary)] to-[#E1BD9C]"
              style={{
                height: `${h}%`,
              }}
            />
          ))}
        </div>

      </div>

    </section>
  );
}