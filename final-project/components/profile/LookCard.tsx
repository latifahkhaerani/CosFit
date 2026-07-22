"use client";

import Image from "next/image";
import { Eye, Heart, Store, Trash2, Pencil, Bookmark } from "lucide-react";

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
  onClick?: () => void;
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
  onClick,
}: LookCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group overflow-hidden rounded-[30px] border border-[#efe4db] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
    >
      {/* IMAGE */}
      <div className="relative m-3 grid grid-cols-2 overflow-hidden rounded-2xl bg-[#faf8f6]">
        {/* BEFORE */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            className="object-cover object-top transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* AFTER */}
        <div className="relative aspect-[3/4] overflow-hidden border-l border-[#f5ede7]">
          <Image
            src={afterImage}
            alt={character}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* STATUS */}
        {/* <button
          onClick={onWishlist}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white"
        >
          <Bookmark
            size={18}
            className={
              // liked
              "fill-[#B14744] text-[#B14744]"
              // : "fill-transparent text-[#98A2B3]"
            }
          />
        </button> */}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col p-5 pt-2">
        <div>
          <h3 className="line-clamp-2 min-h-[64px] text-[30px] font-semibold leading-tight text-[#1f1a17]">
            {character}
          </h3>

          <p className="mt-2 text-base text-[#667085]">{series}</p>

          <p className="mt-4 text-sm text-[#98A2B3]">
            Generated on {generatedAt}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#FFF3EF] px-3 py-1 text-xs font-medium text-[#B14744]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* BUTTON */}
        {status === "draft" ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={onContinue}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#B14744] py-3 font-medium text-white transition hover:bg-[#983936]"
            >
              <Pencil size={16} />
              Continue
            </button>

            <button
              onClick={onDelete}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        ) : status === "ready" ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={onView}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#efe4db] py-3 font-medium transition hover:bg-[#faf6f2]"
            >
              <Eye size={16} />
              View
            </button>

            <button
              onClick={onRent}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#B14744] py-3 font-medium text-white transition hover:bg-[#983936]"
            >
              <Store size={16} />
              Rent
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={onView}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#efe4db] py-3 font-medium transition hover:bg-[#faf6f2]"
            >
              <Eye size={16} />
              View
            </button>

            {/* <button
              onClick={onWishlist}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#efe4db] py-3 font-medium transition hover:bg-[#faf6f2]"
            >
              <Heart size={16} />
              Wishlist
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
