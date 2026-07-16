"use client";

import {
  CalendarDays,
  Coins,
  Package2,
  Boxes,
  BadgeCheck,
  UserCheck,
  Ruler,
} from "lucide-react";

export default function ProductInfoCard() {
  return (
    <section className="card p-7">

      {/* Header */}

      <div className="mb-8">

        <h2 className="card-title">
          Product Information
        </h2>

        <p className="card-subtitle">
          Rental settings and size specifications.
        </p>

      </div>

      {/* Information */}

      <div className="space-y-5">

        <InfoItem
          icon={<Coins size={18} />}
          title="Rental Price"
          value="Rp 350.000"
          subtitle="/ 3 days"
        />

        <InfoItem
          icon={<CalendarDays size={18} />}
          title="Minimum Rental"
          value="3 Days"
        />

        <InfoItem
          icon={<Package2 size={18} />}
          title="Deposit"
          value="Rp 1.000.000"
        />

        <InfoItem
          icon={<BadgeCheck size={18} />}
          title="Availability"
          badge="Available"
        />

        <InfoItem
          icon={<Boxes size={18} />}
          title="Current Stock"
          value="2 Sets"
        />

        <InfoItem
          icon={<UserCheck size={18} />}
          title="Currently Rented"
          value="1 Set"
        />

      </div>

      {/* Divider */}

      <div className="my-8 border-t border-[var(--border)]" />

      {/* Size */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="font-semibold text-[var(--text)]">

            Size Information

          </h3>

          <p className="mt-1 text-sm text-[var(--muted)]">

            Recommended body measurements

          </p>

        </div>

        <button className="text-sm font-medium text-[var(--primary)]">

          Size Guide

        </button>

      </div>

      <div className="space-y-4">

        <SizeItem
          label="Height"
          value="155 - 170 cm"
        />

        <SizeItem
          label="Bust"
          value="80 - 92 cm"
        />

        <SizeItem
          label="Waist"
          value="60 - 72 cm"
        />

        <SizeItem
          label="Hip"
          value="85 - 96 cm"
        />

      </div>

    </section>
  );
}

/* -------------------------- */

function InfoItem({
  icon,
  title,
  value,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl p-3 transition hover:bg-[#FCFBFA]">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF5F0] text-[var(--primary)]">

          {icon}

        </div>

        <div>

          <p className="text-sm text-[var(--muted)]">

            {title}

          </p>

        </div>

      </div>

      {badge ? (
        <span className="badge-success">

          {badge}

        </span>
      ) : (
        <div className="text-right">

          <h4 className="font-semibold">

            {value}

          </h4>

          {subtitle && (
            <p className="text-xs text-[var(--muted)]">

              {subtitle}

            </p>
          )}

        </div>
      )}
    </div>
  );
}

/* -------------------------- */

function SizeItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-5 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF5F0]">

          <Ruler
            size={16}
            className="text-[var(--primary)]"
          />

        </div>

        <span className="text-sm text-[var(--muted)]">

          {label}

        </span>

      </div>

      <span className="font-semibold">

        {value}

      </span>

    </div>
  );
}