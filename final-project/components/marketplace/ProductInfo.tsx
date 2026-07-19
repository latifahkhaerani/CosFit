"use client";

import Link from "next/link";
import { Heart, Sparkles, ChevronRight } from "lucide-react";
import type { GetProduct, GetWishlist } from "@/app/types";
import { formatProductPrice } from "./ProductCard";
import { useEffect, useState } from "react";

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
  currency = "IDR",
  tryOnLabel = "Try On With AI",
  checkoutLabel = "Rent Now",
  onToggleFavorite,
  onTryOn,
  onCheckout,
}: ProductInfoProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const response = await fetch("/api/user/wishlist");
        if (response.ok) {
          const wishlist = await response.json();
          console.log(wishlist, "<<<<<<");

          // Pastikan responsnya adalah array sebelum dicocokkan
          if (Array.isArray(wishlist)) {
            const isExist = wishlist.some((item: any) => {
              // Menangani kemungkinan productId berupa string biasa atau object/agregasi MongoDB
              const targetId =
                typeof item.productId === "object" && item.productId !== null
                  ? item.productId._id
                  : item.productId;

              return String(targetId) === String(product._id);
            });

            setIsFavorited(isExist);
          }
        }
      } catch (error) {
        console.error("Gagal mengecek status wishlist:", error);
      }
    };

    if (product?._id) {
      fetchWishlistStatus();
    }
  }, [product?._id]);

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
          body: JSON.stringify({ productId: product._id }),
        });

        if (!response.ok) throw new Error("Gagal menambah wishlist");
      } else {
        const response = await fetch(`/api/user/wishlist/${product._id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Gagal menghapus wishlist");
      }

      onToggleFavorite?.(product._id);
    } catch (error) {
      console.error(error);
      setIsFavorited(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <Link href="/marketplace" className="hover:text-primary">
          Marketplace
        </Link>
        {product.theme && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span>{product.theme}</span>
          </>
        )}
        <ChevronRight className="h-4 w-4" />
        <span className="line-clamp-1 text-foreground">
          {product.title || "Product Title"}
        </span>
      </nav>

      <div>
        <p className="text-base font-medium text-muted">
          {product.theme || "Series"}
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          {product.title || "Product Title"}
        </h1>
      </div>

      <p className="text-4xl font-bold text-primary">
        {formatProductPrice(product.originalPrice, currency)}
      </p>

      {product.size && (
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-cream/40 px-4 py-2 text-sm font-medium text-primary">
            Size: {product.size}
          </span>
        </div>
      )}

      <div>
        <p className="text-base font-semibold text-foreground">Description</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {product.desc || "No description available for this product yet."}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onCheckout?.(product._id)}
          className="flex-1 rounded-xl bg-primary px-6 py-4 text-base font-medium text-white transition hover:bg-secondary"
        >
          {checkoutLabel}
        </button>
        <button
          type="button"
          onClick={() => onTryOn?.(product._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary px-6 py-4 text-base font-medium text-primary transition hover:bg-cream/40"
        >
          <Sparkles className="h-5 w-5" />
          {tryOnLabel}
        </button>

        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={handleToggleFavorite}
          disabled={isLoading}
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-border transition hover:bg-cream/40 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <Heart
            className={`h-6 w-6 transition-colors ${
              isFavorited ? "fill-primary text-primary" : "text-muted"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
