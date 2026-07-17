import BackgroundDecoration from "@/components/BackgroundDecoration";
import ChibiCTA from "@/components/ChibiCTA";
import NeedHelp from "@/components/NeedHelp";
import WishlistCard from "@/components/WishlistCard";
import { Heart, ShoppingBag, ShoppingCart, ArrowRight } from "lucide-react";

const wishlist = [
  {
    image: "/images/yaemiko.jpg",
    character: "Yae Miko",
    series: "Genshin Impact",
    vendor: "Starlight Cosplay",
    vendorAvatar: "/images/vendor1.jpg",
    price: 450000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/rei.jpg",
    character: "Rei Ayanami",
    series: "Neon Genesis Evangelion",
    vendor: "Cosplay House",
    vendorAvatar: "/images/vendor2.jpg",
    price: 400000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/hutao.jpg",
    character: "Hu Tao",
    series: "Genshin Impact",
    vendor: "Starlight Cosplay",
    vendorAvatar: "/images/vendor1.jpg",
    price: 450000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/rem.jpg",
    character: "Rem",
    series: "Re:Zero",
    vendor: "Otaku Rentals",
    vendorAvatar: "/images/vendor3.jpg",
    price: 350000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/2b.jpg",
    character: "2B",
    series: "NieR:Automata",
    vendor: "Cosplay House",
    vendorAvatar: "/images/vendor2.jpg",
    price: 500000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/saber.jpg",
    character: "Saber",
    series: "Fate/Stay Night",
    vendor: "Universe Rental",
    vendorAvatar: "/images/vendor4.jpg",
    price: 450000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/raiden.jpg",
    character: "Raiden Shogun",
    series: "Genshin Impact",
    vendor: "Starlight Cosplay",
    vendorAvatar: "/images/vendor1.jpg",
    price: 450000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
  {
    image: "/images/zerotwo.jpg",
    character: "Zero Two",
    series: "Darling in the Franxx",
    vendor: "Cosplay House",
    vendorAvatar: "/images/vendor2.jpg",
    price: 400000,
    duration: "3 days",
    sizeMatch: "good",
    isWishlisted: true,
  },
] as const;

export default function WishlistPage() {
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
                    .reduce((a, b) => a + b.price, 0)
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
          {wishlist.map((item) => (
            <WishlistCard key={item.character} {...item} />
          ))}
        </div>

        <NeedHelp />
        <ChibiCTA />
      </section>
    </main>
  );
}
