import type { GetProduct, GetWishlist } from "@/app/types";
import ProductGrid from "./ProductGrid";

export interface RelatedProductsProps {
  title?: string;
  products: GetProduct[];
  wishlist?: GetWishlist[];
  currency?: string;
  onToggleFavorite?: (productId: string) => void;
}

export default function RelatedProducts({
  title = "You Might Also Like",
  products,
  wishlist = [],
  currency = "USD",
  onToggleFavorite,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">{title}</h2>
      <ProductGrid
        products={products}
        wishlist={wishlist}
        currency={currency}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  );
}
