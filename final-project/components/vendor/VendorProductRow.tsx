"use client";

import Image from "next/image";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  image: string;
  character: string;
  series: string;
  price: number;
  availability: "Available" | "Low Stock" | "Out of Stock";
  rental: "Available" | "Rented";
  views: number;
  wishlist: number;
};

export default function VendorProductRow({
  image,
  character,
  series,
  price,
  availability,
  rental,
  views,
  wishlist,
}: Props) {
  return (
    <tr className="group border-t border-[#F5EEE8] transition hover:bg-[#FCFBFA]">

      {/* Costume */}

      <td className="py-5">

        <div className="flex items-center gap-4">

          <Image
            src={image}
            alt={character}
            width={82}
            height={82}
            className="rounded-3xl object-cover transition duration-300 group-hover:scale-105"
          />

          <div>

            <h4 className="text-lg font-semibold text-[var(--text)]">

              {character}

            </h4>

            <p className="mt-1 text-sm text-[var(--muted)]">

              {series}

            </p>

          </div>

        </div>

      </td>

      {/* Price */}

      <td>

        <p className="text-lg font-semibold text-[var(--primary)]">

          Rp {price.toLocaleString("id-ID")}

        </p>

        <p className="mt-1 text-sm text-[var(--muted)]">

          / 3 Days

        </p>

      </td>

      {/* Availability */}

      <td>

        <StatusBadge
          type={availability}
        />

      </td>

      {/* Rental */}

      <td>

        <StatusBadge
          type={rental}
        />

      </td>

      {/* Views */}

      <td>

        <div>

          <h4 className="font-semibold">

            {views.toLocaleString()}

          </h4>

          <p className="text-xs text-[var(--muted)]">

            views

          </p>

        </div>

      </td>

      {/* Wishlist */}

      <td>

        <div>

          <h4 className="font-semibold">

            {wishlist}

          </h4>

          <p className="text-xs text-[var(--muted)]">

            saved

          </p>

        </div>

      </td>

      {/* Actions */}

      <td>

        <div className="flex gap-3">

          <ActionButton>

            <Eye size={18} />

          </ActionButton>

          <ActionButton>

            <Pencil size={18} />

          </ActionButton>

          <ActionButton danger>

            <Trash2 size={18} />

          </ActionButton>

        </div>

      </td>

    </tr>
  );
}

function StatusBadge({
  type,
}: {
  type: string;
}) {
  let className =
    "bg-green-100 text-green-700";

  if (type === "Low Stock")
    className =
      "bg-orange-100 text-orange-700";

  if (type === "Out of Stock")
    className =
      "bg-red-100 text-red-700";

  if (type === "Rented")
    className =
      "bg-blue-100 text-blue-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {type}
    </span>
  );
}

function ActionButton({
  children,
  danger = false,
}: {
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-white transition hover:-translate-y-0.5 hover:shadow-card ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-[var(--text)] hover:bg-[#FFF8F5]"
      }`}
    >
      {children}
    </button>
  );
}