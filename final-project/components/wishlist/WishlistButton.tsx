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
      type="button"
      aria-label="Toggle favorite"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 hover:bg-[#FFF8F3] hover:shadow-md">
      <Heart
        className={clsx(
          "h-5 w-5 transition-colors duration-200",
          isWishlisted
            ? "fill-primary text-primary"
            : "fill-none text-muted hover:text-primary",
        )}
      />
    </button>
  );
}
