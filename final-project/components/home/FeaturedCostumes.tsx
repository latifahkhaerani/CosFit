"use client";

import { Sparkles, Heart, ArrowRight } from "lucide-react";
import type { GetProduct, GetWishlist } from "@/app/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface FeaturedCostumesProps {
  title?: string;
  viewAllLabel?: string;
  /** Products rendered as costume cards (imgUrl, title, theme -> series, originalPrice). */
  costumes?: GetProduct[];
  /** Current user's wishlist entries, used to derive each costume's favorited state. */
  wishlist?: GetWishlist[];
  detailsLabel?: string;
  onViewAll?: () => void;
  onSelectCostume?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  currency?: string; // e.g. "USD", "IDR" — passed to Intl.NumberFormat
}

const data = await fetch("http://localhost:3000/api/user/product/featured");
const char: GetProduct[] = await data.json();

function formatPrice(amount: number, currency: string) {
  if (!amount) return "Rp 0";
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `Rp ${amount}`;
  }
}

function CostumeCard({
  costume,
  currency,
  detailsLabel,
  onSelect,
  onToggleFavorite,
}: {
  costume: GetProduct;
  currency: string;
  detailsLabel: string;
  onSelect?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const response = await fetch("/api/user/wishlist");
        if (response.ok) {
          const wishlist = await response.json();

          if (Array.isArray(wishlist)) {
            const isExist = wishlist.some((item: GetWishlist) => {
              const targetId =
                typeof item.productId === "object" && item.productId !== null
                  ? item.product._id
                  : item.productId;

              return String(targetId) === String(costume._id);
            });

            setIsFavorited(isExist);
          }
        }
      } catch (error) {
        console.error("Gagal mengecek status wishlist:", error);
      }
    };

    if (costume?._id) {
      fetchWishlistStatus();
    }
  }, [costume?._id]);

  const handleToggleFavorite = async () => {
    if (isLoading) return;

    const previousState = isFavorited;

    // Optimistic Update UI
    setIsFavorited(!isFavorited);
    setIsLoading(true);

    try {
      if (!previousState) {
        const response = await fetch("/api/user/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: costume._id }),
        });

        if (!response.ok) throw new Error("Gagal menambah wishlist");
      } else {
        const response = await fetch(`/api/user/wishlist/${costume._id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Gagal menghapus wishlist");
      }

      onToggleFavorite?.(costume._id);
    } catch (error) {
      console.error(error);
      setIsFavorited(previousState);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream/30">
        <button
          type="button"
          onClick={() => onSelect?.(costume._id)}
          className="h-full w-full text-left"
        >
          {costume.imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={costume.imgUrl}
              alt={costume.title || "Costume"}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-base text-muted">
              Costume image
            </div>
          )}
        </button>
        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={handleToggleFavorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-sm transition hover:bg-cream/40"
        >
          <Heart
            className={`h-5 w-5 ${isFavorited ? "fill-primary text-primary" : "text-muted"}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {costume.title || "Costume Title"}
          </p>
          <p className="text-base text-muted">{costume.theme || "Series"}</p>
        </div>
        <p className="text-xl font-bold text-primary">
          {formatPrice(costume.originalPrice, currency)}
        </p>
          <Link href={'marketplace/products/costume.slug'}>
        <button
          type="button"
          onClick={() => onSelect?.(costume._id)}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-base font-medium text-primary transition hover:bg-cream/40"
          >
          {detailsLabel}
          <ArrowRight className="h-5 w-5" />
        </button>
          </Link>
      </div>
    </div>
  );
}

export default function FeaturedCostumes({
  title = "Featured Costumes",
  viewAllLabel = "View All Costumes",
  costumes = char,
  wishlist = [],
  detailsLabel = "View Details",
  onViewAll,
  onSelectCostume,
  onToggleFavorite,
  currency = "IDR",
}: FeaturedCostumesProps) {
  const favoritedIds = new Set(wishlist.map((entry) => entry.productId));

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-serif text-3xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-5 w-5 text-accent" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-base font-medium text-primary hover:text-secondary hover:underline"
        >
          {viewAllLabel} &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {costumes.map((costume) => (
          <CostumeCard
            key={costume._id}
            costume={costume}
            currency={currency}
            detailsLabel={detailsLabel}
            onSelect={onSelectCostume}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
