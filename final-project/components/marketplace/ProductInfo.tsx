"use client";

import Link from "next/link";
import { Heart, Sparkles, ChevronRight } from "lucide-react";
import type { GetProduct } from "@/app/types";
import { formatProductPrice } from "./ProductCard";

export interface ProductInfoProps {
  product: GetProduct;
  isFavorited?: boolean;
  currency?: string;
  tryOnLabel?: string;
  checkoutLabel?: string;
  onToggleFavorite?: (productId: string) => void;
  onTryOn?: (productId: string) => void;
  onCheckout?: (productId: string) => void;
}

export default function ProductInfo({
  product,
  isFavorited = false,
  currency = "USD",
  tryOnLabel = "Try On With AI",
  checkoutLabel = "Rent Now",
  onToggleFavorite,
  onTryOn,
  onCheckout,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/marketplace" className="hover:text-primary">
          Marketplace
        </Link>
        {product.theme && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{product.theme}</span>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="line-clamp-1 text-foreground">{product.title || "Product Title"}</span>
      </nav>

      <div>
        <p className="text-sm font-medium text-muted">{product.theme || "Series"}</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">
          {product.title || "Product Title"}
        </h1>
      </div>

      <p className="text-3xl font-bold text-primary">
        {formatProductPrice(product.OriginalPrice, currency)}
      </p>

      <div className="flex flex-wrap gap-2">
        {product.size && (
          <span className="rounded-full bg-cream/40 px-3 py-1 text-sm font-medium text-primary">
            Size: {product.size}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">Description</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {product.desc || "No description available for this product yet."}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onCheckout?.(product._id)}
          className="flex-1 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-secondary"
        >
          {checkoutLabel}
        </button>
        <button
          type="button"
          onClick={() => onTryOn?.(product._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3 text-sm font-medium text-primary transition hover:bg-cream/40"
        >
          <Sparkles className="h-4 w-4" />
          {tryOnLabel}
        </button>
        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={() => onToggleFavorite?.(product._id)}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border transition hover:bg-cream/40"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? "fill-primary text-primary" : "text-muted"}`} />
        </button>
      </div>
    </div>
  );
}
