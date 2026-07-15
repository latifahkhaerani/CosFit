"use client";

import Image from "next/image";

import {
  ShoppingBag,
  Sparkles,
  Trash2,
  CircleCheck,
  CircleHelp,
} from "lucide-react";
import WishlistButton from "./WishlistButton";

type WishlistCardProps = {
  image: string;
  character: string;
  series: string;
  vendor: string;
  vendorAvatar: string;
  price: number;
  duration: string;
  sizeMatch: "good" | "possible" | "unknown";
  isWishlisted: boolean;
  onWishlist?: () => void;
  onTryOn?: () => void;
  onCheckout?: () => void;
  onRemove?: () => void;
};

export default function WishlistCard({
  image,
  character,
  series,
  vendor,
  vendorAvatar,
  price,
  duration,
  sizeMatch,
  isWishlisted,
  onWishlist,
  onTryOn,
  onCheckout,
  onRemove,
}: WishlistCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}

      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={character}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3">
          <WishlistButton isWishlisted={isWishlisted} onClick={onWishlist} />
        </div>

        <div className="absolute bottom-3 left-3">
          {sizeMatch === "good" && (
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <CircleCheck size={14} />
              Good Size Match
            </div>
          )}

          {sizeMatch === "possible" && (
            <div className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
              Possible Match
            </div>
          )}

          {sizeMatch === "unknown" && (
            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs">
              <CircleHelp size={14} />
              Unknown
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#4D565C]">
              {character}
            </h3>

            <p className="text-sm text-gray-500">{series}</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-[#B14744]">
              Rp {price.toLocaleString("id-ID")}
            </p>

            <p className="text-sm text-gray-500">/ {duration}</p>
          </div>
        </div>

        {/* Vendor */}

        <div className="flex items-center gap-2">
          <Image
            src={vendorAvatar}
            alt={vendor}
            width={24}
            height={24}
            className="rounded-full"
          />

          <p className="text-sm text-[#849282]">{vendor}</p>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onTryOn}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#B14744] py-2 font-medium text-[#B14744] transition hover:bg-[#FFF3EF]"
          >
            <Sparkles size={16} />
            Try On
          </button>

          <button
            onClick={onCheckout}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#B14744] py-2 font-medium text-white transition hover:bg-[#9A3B39]"
          >
            <ShoppingBag size={16} />
            Checkout
          </button>
        </div>

        <button
          onClick={onRemove}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 py-2 text-sm text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={15} />
          Remove
        </button>
      </div>
    </div>
  );
}
