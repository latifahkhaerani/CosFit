import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import ProductGrid from "@/components/marketplace/ProductGrid";
import type { GetProduct } from "@/app/types";

interface MarketplacePageProps {
  searchParams: Promise<{
    search?: string;
    theme?: string;
    size?: string;
    sort?: string;
  }>;
}

async function getProducts(search: string) {
  const res = await fetch(
    `http://localhost:3000/api/user/product?search=${encodeURIComponent(search)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: GetProduct[] = await res.json();
  return data;
}

export default async function MarketplacePage({
  searchParams,
}: MarketplacePageProps) {
  const {
    search = "",
    theme = "",
    size = "",
    sort = "title-asc",
  } = await searchParams;

  const allProducts = await getProducts(search);

  const themeOptions = Array.from(
    new Set(allProducts.map((p) => p.theme).filter(Boolean)),
  ).sort();
  const sizeOptions = Array.from(
    new Set(allProducts.map((p) => p.size).filter(Boolean)),
  ).sort();

  let products = allProducts.filter((product) => {
    const matchesSearch = search
      ? product.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesTheme = theme ? product.theme === theme : true;
    const matchesSize = size ? product.size === size : true;
    return matchesSearch && matchesTheme && matchesSize;
  });

  products = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.originalPrice - b.originalPrice;
    if (sort === "price-desc") return b.originalPrice - a.originalPrice;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <MarketplaceHeader />
      <MarketplaceFilters
        themeOptions={themeOptions}
        sizeOptions={sizeOptions}
      />
      <ProductGrid products={products} />
    </div>
  );
}
