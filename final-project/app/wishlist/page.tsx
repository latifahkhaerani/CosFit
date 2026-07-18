import BackgroundDecoration from "@/components/wishlist/BackgroundDecoration";
import ChibiCTA from "@/components/wishlist/ChibiCTA";
import NeedHelp from "@/components/wishlist/NeedHelp";
import { Heart, ShoppingBag, ShoppingCart, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { GetWishlist } from "../types";
import WishlistCard from "@/components/wishlist/WishlistCard";

export default async function WishlistPage() {
  async function getWishlist(): Promise<GetWishlist[]> {
    const cookieStore = await cookies();

    const auth = cookieStore.get("Authorization");

    const res = await fetch("http://localhost:3000/api/user/wishlist", {
      cache: "no-store",
      headers: {
        Cookie: `Authorization=${auth?.value}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    return res.json();
  }

  const wishlist = await getWishlist();

  return (
    <main className="min-h-screen bg-background">
      <BackgroundDecoration />
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}

        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF3EF]">
              <Heart
                className="text-(--primary)"
                fill="currentColor"
                size={40}
              />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-[var(--text)]">
                My Wishlist
              </h1>

              <p className="mt-3 text-xl text-gray-500">
                All the costumes you love in one place.
              </p>
            </div>
          </div>

          {/* Summary */}

          <div className="grid overflow-hidden rounded-3xl border border-(--border) bg-white shadow-sm lg:grid-cols-[1fr_1.3fr_1.4fr]">
            {/* Saved */}

            <div className="flex items-center gap-5 border-r border-[var(--border)] p-8">
              <div className="flex-shrink-0 rounded-2xl bg-[#FFF3EF] p-4">
                <ShoppingBag className="text-[var(--primary)]" size={24} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-gray-500">Saved Costumes</p>

                <h2 className="text-4xl font-bold">{wishlist.length}</h2>
              </div>
            </div>

            {/* Price */}

            <div className="flex items-center gap-5 border-r border-[var(--border)] p-8">
              <div className="flex-shrink-0 rounded-2xl bg-[#FFF3EF] p-4">
                <ShoppingCart className="text-[var(--primary)]" size={24} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-gray-500">Estimated Total</p>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Rp{" "}
                  {wishlist
                    .reduce(
                      (total, item) =>
                        total + Number(item.product.originalPrice),
                      0,
                    )
                    .toLocaleString("id-ID")}
                </h2>
              </div>
            </div>

            {/* Buttons */}

            <div className="space-y-4 p-6">
              <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[var(--primary)] text-white transition hover:opacity-90">
                <ShoppingBag size={18} />
                Move to Checkout ({wishlist.length})
              </button>

              <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border)] font-medium text-[var(--primary)]">
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => {
            const product = item.product;

            return (
              <WishlistCard
                key={item._id}
                image={item.aiImgUrl || product.imgUrl}
                character={product.title}
                series={product.theme}
                vendor="Unknown Vendor"
                vendorAvatar="/images/default-vendor.png"
                price={Number(product.originalPrice)}
                duration="3 days"
                sizeMatch="unknown"
                isWishlisted
                wishlistId={item._id}
                productId={item.productId}
              />
            );
          })}
        </div>

        <NeedHelp />
        <ChibiCTA />
      </section>
    </main>
  );
}
