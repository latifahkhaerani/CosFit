import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import ProductGrid from "@/components/marketplace/ProductGrid";
import type { GetProduct } from "@/app/types";

interface MarketplacePageProps {
  searchParams: Promise<{ search?: string; theme?: string; size?: string; sort?: string }>;
}

const allProducts: GetProduct[] = Array.from({ length: 8 }, (_, i) => ({
  _id: `product-${i}`,
  imgUrl: "",
  desc: "",
  size: "",
  theme: "",
  title: "",
  OriginalPrice: 0,
}));

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const { search = "", theme = "", size = "", sort = "title-asc" } = await searchParams;

  const themeOptions = Array.from(new Set(allProducts.map((p) => p.theme).filter(Boolean))).sort();
  const sizeOptions = Array.from(new Set(allProducts.map((p) => p.size).filter(Boolean))).sort();

  let products = allProducts.filter((product) => {
    const matchesSearch = search
      ? product.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesTheme = theme ? product.theme === theme : true;
    const matchesSize = size ? product.size === size : true;
    return matchesSearch && matchesTheme && matchesSize;
  });

  products = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.OriginalPrice - b.OriginalPrice;
    if (sort === "price-desc") return b.OriginalPrice - a.OriginalPrice;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <MarketplaceHeader />
      <MarketplaceFilters themeOptions={themeOptions} sizeOptions={sizeOptions} />
      <ProductGrid products={products} />
    </div>
  );
}
