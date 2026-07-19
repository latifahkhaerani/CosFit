"use client";

import { Heart } from "lucide-react";
import clsx from "clsx";

type Props = {
  isWishlisted: boolean;
  onClick?: () => void;
};

export default function WishlistButton({ isWishlisted, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
        isWishlisted
          ? "bg-[#B14744] text-white shadow-md"
          : "bg-white text-[#B14744] shadow hover:bg-[#FFF3EF]",
      )}
    >
      <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
    </button>
  );
}
