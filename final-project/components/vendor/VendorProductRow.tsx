"use client";

import Image from "next/image";
import {
  Eye,
} from "lucide-react";
import Link from "next/link";

type Props = {
  image: string;
  character: string;
  series: string;
  originalPrice: number;
  finalPrice: number;
  discount: number;
  availability: "Available" | "Low Stock" | "Out of Stock";
  rental: "Available" | "Rented";
  views: number;
  wishlist: number;
  id: string
};

export default function VendorProductRow({
  image,
  character,
  series,
  originalPrice,
  finalPrice,
  discount,
  views,
  wishlist,
  id,
}: Props) {
  return (
    <tr className="group border-t border-[#F5EEE8] transition hover:bg-[#FCFBFA]">

      {/* Costume */}

      <td className="py-5">

        <div className="flex items-center gap-4">

          <div className="relative h-20 w-20 overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt={character}
              width={82}
              height={82}
              className="rounded-3xl object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

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

          Rp {finalPrice?.toLocaleString("id-ID")}

        </p>

        {discount? (
          <div>
            <p className="text-sm font-semibold text-[var(--muted)] line-through">

              Rp {originalPrice.toLocaleString("id-ID")}

            </p>
            <span className="p-1 rounded-md bg-green-300 text-lg font-semibold text-[var(--primary)]">
              {discount} %
            </span>
          </div>
        ):(
          <div>
            
          </div>
        )}

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

          <ActionButton href={`/vendor/product/${id}`} >

            <Eye size={18} />

          </ActionButton>

        </div>

      </td>

    </tr>
  );
}


function ActionButton({
  children,
  href
}: {
  children: React.ReactNode;
  href: string
}) {
  return (
    <Link 
    href={href}
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-white transition hover:-translate-y-0.5 hover:shadow-card`}
    >
      {children}
    </Link>
  );
}