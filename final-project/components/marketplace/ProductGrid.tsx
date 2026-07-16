"use client";

import { PackageSearch } from "lucide-react";
import type { GetProduct, GetWishlist } from "@/app/types";
import ProductCard from "./ProductCard";

export interface ProductGridProps {
  products: GetProduct[];
  wishlist?: GetWishlist[];
  currency?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onToggleFavorite?: (productId: string) => void;
}

export default function ProductGrid({
  products,
  wishlist = [],
  currency = "USD",
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your filters or search term.",
  onToggleFavorite,
}: ProductGridProps) {
  const favoritedIds = new Set(wishlist.map((entry) => entry.productId));

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface py-24 text-center">
        <PackageSearch className="h-10 w-10 text-muted" />
        <p className="text-base font-medium text-foreground">{emptyTitle}</p>
        <p className="text-sm text-muted">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isFavorited={favoritedIds.has(product._id)}
          currency={currency}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
