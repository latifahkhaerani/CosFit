import ProductGallery from "@/components/marketplace/ProductGallery";
import ProductInfo from "@/components/marketplace/ProductInfo";
import RelatedProducts from "@/components/marketplace/RelatedProducts";
import ProductViewTracker from "@/components/marketplace/ProductViewTracker";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id: slug } = await params;

  const product = await fetch(
    `http://localhost:3000/api/user/product/${slug}`,
    {
      cache: "no-store",
    },
  ).then((res) => res.json());

  const relatedProducts = await fetch(
    `http://localhost:3000/api/user/product/${slug}/related`,
    {
      cache: "no-store",
    },
  )
    .then((res) => res.json())
    .catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      {/* View tracker tetap memakai ObjectId */}
      <ProductViewTracker productId={product._id} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
