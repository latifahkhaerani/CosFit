"use client";

import Image from "next/image";
import { Eye, Heart, Store, Trash2, Pencil } from "lucide-react";

type LookCardProps = {
  beforeImage: string;
  afterImage: string;

  character: string;
  series: string;

  status: "saved" | "ready" | "draft";

  generatedAt: string;

  tags: string[];

  liked?: boolean;

  onView?: () => void;
  onRent?: () => void;
  onDelete?: () => void;
  onContinue?: () => void;
  onWishlist?: () => void;
};

export default function LookCard({
  beforeImage,
  afterImage,
  character,
  series,
  status,
  generatedAt,
  tags,
  liked,
  onView,
  onRent,
  onDelete,
  onContinue,
  onWishlist,
}: LookCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#efe4db] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* IMAGE */}

      <div className="relative grid grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="relative aspect-[3/4] border-l border-[#efe4db]">
          <Image
            src={afterImage}
            alt={character}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute left-3 top-3">
          {/* <span
            className={`rounded-full px-3 py-1 text-xs font-semibold
            ${
              status === "ready"
                ? "bg-[#B14744] text-white"
                : status === "saved"
                  ? "bg-[#FFF3EF] text-[#B14744]"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span> */}
        </div>

        <button
          onClick={onWishlist}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:scale-105"
        >
          <Heart
            size={16}
            className={
              liked ? "fill-[#B14744] text-[#B14744]" : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* CONTENT */}

      <div className="flex flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-[#1f1a17]">{character}</h3>

          <p className="text-sm text-gray-500">{series}</p>

          <p className="mt-2 text-xs text-gray-400">
            Generated on {generatedAt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#FFF3EF] px-3 py-1 text-xs text-[#B14744]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* BUTTON */}

        {status === "draft" ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onContinue}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#B14744] py-2 font-medium text-white hover:bg-[#983936]"
            >
              <Pencil size={15} />
              Continue
            </button>

            <button
              onClick={onDelete}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2 text-red-500 hover:bg-red-50"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        ) : status === "ready" ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onView}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#efe4db] py-2 hover:bg-[#faf6f2]"
            >
              <Eye size={15} />
              View
            </button>

            <button
              onClick={onRent}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#B14744] py-2 text-white hover:bg-[#983936]"
            >
              <Store size={15} />
              Rent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onView}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#efe4db] py-2 hover:bg-[#faf6f2]"
            >
              <Eye size={15} />
              View
            </button>

            <button
              onClick={onWishlist}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#efe4db] py-2 hover:bg-[#faf6f2]"
            >
              <Heart size={15} />
              Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
