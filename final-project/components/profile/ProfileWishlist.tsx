"use client";

import { Heart } from "lucide-react";

import { GetWishlist } from "@/app/types";
import WishlistCard from "../wishlist/WishlistCard";

type Props = {
  wishlist: GetWishlist[];
  refreshProfileData: () => Promise<void>;
};

export default function ProfileWishlist({
  wishlist,
  refreshProfileData,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-[#efe4db] bg-white p-8 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3EF]">
            <Heart className="fill-[#B14744] text-[#B14744]" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1f1a17]">Wishlist</h1>

            <p className="mt-1 text-[#7d746d]">
              Costumes you&apos;ve saved for later.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#F3E7DD] bg-[#FCFAF8] px-6 py-4">
          <p className="text-sm text-muted">Total Wishlist</p>

          <h2 className="text-3xl font-bold text-primary">{wishlist.length}</h2>
        </div>
      </div>

      {/* CONTENT */}

      <div className="rounded-3xl border border-[#efe4db] bg-white p-6">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={46} className="mb-5 text-primary" />

            <h2 className="text-2xl font-semibold text-[#1f1a17]">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Save costumes you love so you can compare, try them on, and rent
              them later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((item) => (
              <WishlistCard
                key={item._id}
                image={item.product.imgUrl}
                character={item.product.title}
                series={item.product.theme}
                vendor={item.vendor?.namaToko || "CosFit Vendor"}
                vendorAvatar=""
                price={Number(item.product.originalPrice)}
                // duration={item.product.duration}
                isWishlisted
                wishlistId={item._id}
                productId={item.product._id}
                productSlug={item.product.slug}
                onRemoved={refreshProfileData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
