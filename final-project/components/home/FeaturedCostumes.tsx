"use client";

import { ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";
import type { GetProduct, GetWishlist } from "@/app/types";

export interface FeaturedCostumesProps {
  title?: string;
  viewAllLabel?: string;
  /** Products rendered as costume cards (imgUrl, title, theme -> series, OriginalPrice). */
  costumes?: GetProduct[];
  /** Current user's wishlist entries, used to derive each costume's favorited state. */
  wishlist?: GetWishlist[];
  onViewAll?: () => void;
  onToggleFavorite?: (productId: string) => void;
  currency?: string; // e.g. "USD", "IDR" — passed to Intl.NumberFormat
}

const placeholderCostumes: GetProduct[] = Array.from({ length: 6 }, (_, i) => ({
  _id: `costume-${i}`,
  imgUrl: "",
  desc: "",
  size: "",
  theme: "",
  title: "",
  OriginalPrice: 0,
}));

function formatPrice(amount: number, currency: string) {
  if (!amount) return "$0";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

function CostumeCard({
  costume,
  isFavorited,
  currency,
  onToggleFavorite,
}: {
  costume: GetProduct;
  isFavorited: boolean;
  currency: string;
  onToggleFavorite?: (productId: string) => void;
}) {
  return (
    <div className="group w-40 flex-shrink-0 sm:w-44">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream/30">
        {costume.imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={costume.imgUrl}
            alt={costume.title || "Costume"}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            Costume image
          </div>
        )}
        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={() => onToggleFavorite?.(costume._id)}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 text-muted shadow-sm hover:text-accent"
        >
          <Heart className={`h-3.5 w-3.5 ${isFavorited ? "fill-primary text-primary" : "text-muted"}`} />
        </button>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-foreground">
        {costume.title || "Costume Title"}
      </p>
      <p className="truncate text-xs text-muted">{costume.theme || "Series"}</p>
      <p className="mt-1 text-sm font-semibold text-primary">
        {formatPrice(costume.OriginalPrice, currency)}
      </p>
    </div>
  );
}

export default function FeaturedCostumes({
  title = "Featured Costumes",
  viewAllLabel = "View All Costumes",
  costumes = placeholderCostumes,
  wishlist = [],
  onViewAll,
  onToggleFavorite,
  currency = "USD",
}: FeaturedCostumesProps) {
  const favoritedIds = new Set(wishlist.map((entry) => entry.productId));

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-serif text-xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-4 w-4 text-accent" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-secondary"
        >
          {viewAllLabel} &rarr;
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          className="absolute -left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm hover:bg-cream/40 sm:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {costumes.map((costume) => (
            <CostumeCard
              key={costume._id}
              costume={costume}
              isFavorited={favoritedIds.has(costume._id)}
              currency={currency}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          className="absolute -right-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm hover:bg-cream/40 sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
