"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import type { GetProduct } from "@/app/types";

export interface ProductCardProps {
  product: GetProduct;
  isFavorited?: boolean;
  currency?: string;
  detailsLabel?: string;
  onToggleFavorite?: (productId: string) => void;
}

export function formatProductPrice(amount: number, currency: string) {
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

export default function ProductCard({
  product,
  isFavorited = false,
  currency = "USD",
  detailsLabel = "View Details",
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:shadow-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream/30">
        <Link href={`/marketplace/products/${product._id}`} className="block h-full w-full">
          {product.imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imgUrl}
              alt={product.title || "Product"}
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted">
              Product image
            </div>
          )}
        </Link>
        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={() => onToggleFavorite?.(product._id)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-sm transition hover:bg-cream/40"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? "fill-primary text-primary" : "text-muted"}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <p className="line-clamp-1 text-lg font-semibold text-foreground">
            {product.title || "Product Title"}
          </p>
          <p className="mt-0.5 text-sm text-muted">{product.theme || "Series"}</p>
        </div>
        <p className="text-2xl font-bold text-primary">
          {formatProductPrice(product.OriginalPrice, currency)}
        </p>

        <Link
          href={`/marketplace/products/${product._id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-5 py-3 text-sm font-medium text-primary transition hover:bg-cream/40"
        >
          {detailsLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
