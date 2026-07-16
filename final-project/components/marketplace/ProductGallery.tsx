import type { GetProduct } from "@/app/types";

export interface ProductGalleryProps {
  product: GetProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-cream/30">
      {product.imgUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imgUrl}
          alt={product.title || "Product"}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-base text-muted">
          Product image
        </div>
      )}
    </div>
  );
}
