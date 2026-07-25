import BackgroundDecoration from "@/components/wishlist/BackgroundDecoration";
import ChibiCTA from "@/components/wishlist/ChibiCTA";
import NeedHelp from "@/components/wishlist/NeedHelp";
import { Heart, ShoppingBag, ShoppingCart, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { GetWishlist } from "../types";
import WishlistCard from "@/components/wishlist/WishlistCard";
import Link from "next/link";

export default async function WishlistPage() {
  async function getWishlist(): Promise<GetWishlist[]> {
    const cookieStore = await cookies();

    const auth = cookieStore.get("Authorization");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist`, {
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

      <section className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 xl:py-8">
        <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-20 sm:gap-5">
            {/* <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF3EF] sm:h-18 sm:w-18">
              <Heart className="text-primary" fill="currentColor" size={28} />
            </div> */}

            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] text-(--text) sm:text-3xl">
                My Wishlist
              </h1>

              <p className="mt-1.5 text-sm leading-6 text-gray-500 sm:text-base">
                All the costumes you love in one place.
              </p>
            </div>
          </div>
          {/* 
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_16px_44px_-28px_rgba(15,23,42,0.2)] lg:min-w-140">
            <div className="grid gap-0 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1.15fr]">
              <div className="flex items-center gap-4 border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-4">
                <div className="shrink-0 rounded-2xl bg-[#FFF3EF] p-3">
                  <ShoppingBag className="text-primary" size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Saved Costumes</p>
                  <h2 className="text-2xl font-semibold text-(--text) sm:text-3xl">
                    {wishlist.length}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-4">
                <div className="shrink-0 rounded-2xl bg-[#FFF3EF] p-3">
                  <ShoppingCart className="text-primary" size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Estimated Total</p>
                  <h2 className="text-lg font-semibold text-(--text) sm:text-xl">
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

              <div className="space-y-2.5 p-4 sm:p-5 lg:p-4">
                <Link href="/checkout" className="block">
                  <button className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90">
                    <ShoppingBag size={17} />
                    Move to Checkout ({wishlist.length})
                  </button>
                </Link>

                <Link href="/marketplace" className="block">
                  <button className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white text-sm font-medium text-primary transition-all duration-200 hover:border-primary/40 hover:bg-[#fff8f3]">
                    Continue Shopping
                    <ArrowRight size={17} />
                  </button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {wishlist.map((item) => {
            const product = item.product;

            return (
              <WishlistCard
                key={item._id}
                image={product.imgUrl}
                character={product.title}
                series={product.theme.join(", ")}
                vendor={item.vendor.namaToko}
                vendorAvatar="/images/default-vendor.png"
                price={Number(product.originalPrice)}
                duration="3 days"
                // sizeMatch="unknown"
                productSlug={product.slug}
                isWishlisted
                wishlistId={item._id}
                productId={item.productId}
              />
            );
          })}
        </div>

        {/* <NeedHelp /> */}
        <ChibiCTA />
      </section>
    </main>
  );
}
