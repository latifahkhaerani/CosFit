import ProductGallery from "@/components/marketplace/ProductGallery";
import ProductInfo from "@/components/marketplace/ProductInfo";
import RelatedProducts from "@/components/marketplace/RelatedProducts";
import type { GetProduct } from "@/app/types";
import ProductViewTracker from "@/components/marketplace/ProductViewTracker";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const placeholderRelatedProducts: GetProduct[] = Array.from(
  { length: 4 },
  (_, i) => ({
    _id: `related-${i}`,
    imgUrl: "",
    desc: "",
    size: "",
    theme: "",
    title: "",
    originalPrice: 0,
  }),
);

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await fetch(
    `http://localhost:3000/api/user/product/${id}`,
  ).then((res) => res.json());

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <ProductViewTracker productId={id} />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts products={placeholderRelatedProducts} />
    </div>
  );
}
