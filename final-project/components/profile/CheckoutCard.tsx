"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

type Props = {
  image: string;
  character: string;
  series: string;
  vendor: string;
  price: number;
  status: string;
  slug: string;
};

export default function CheckoutCard({
  image,
  character,
  series,
  vendor,
  price,
  status,
  slug,
}: Props) {
  const badge =
    status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "returned"
        ? "bg-blue-100 text-blue-700"
        : "bg-orange-100 text-orange-700";

  return (
    <Link
      //   href={`/marketplace/products/${slug}`}
      href={`/checkout`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#faf6f2]">
        <Image
          src={image}
          alt={character}
          fill
          className="object-cover transition duration-500 group-hover:scale-105 object-top"
        />

        <span
          className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${badge}`}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-[#4D565C]">
            {character}
          </h3>

          <p className="line-clamp-1 text-sm text-muted">{series}</p>
        </div>

        <div>
          <p className="text-sm">{vendor}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-primary">
            Rp {price.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="mt-auto">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-white transition hover:bg-[#9A3B39]">
            <ShoppingBag size={15} />
            View Detail
          </button>
        </div>
      </div>
    </Link>
  );
}
