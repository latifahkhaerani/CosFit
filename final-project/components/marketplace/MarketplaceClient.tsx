"use client";

import { useMemo, useState } from "react";
import type { GetProduct, GetWishlist } from "@/app/types";
import MarketplaceHeader from "./MarketplaceHeader";
import MarketplaceFilters, { type SortOption } from "./MarketplaceFilters";
import ProductGrid from "./ProductGrid";

export interface MarketplaceClientProps {
  title?: string;
  description?: string;
  products: GetProduct[];
  wishlist?: GetWishlist[];
  currency?: string;
  onToggleFavorite?: (productId: string) => void;
}

export default function MarketplaceClient({
  title,
  description,
  products,
  wishlist = [],
  currency = "USD",
  onToggleFavorite,
}: MarketplaceClientProps) {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState<SortOption>("title-asc");

  const themeOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.theme).filter(Boolean))).sort(),
    [products]
  );
  const sizeOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.size).filter(Boolean))).sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = search
        ? product.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesTheme = theme ? product.theme === theme : true;
      const matchesSize = size ? product.size === size : true;
      return matchesSearch && matchesTheme && matchesSize;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.OriginalPrice - b.OriginalPrice;
      if (sort === "price-desc") return b.OriginalPrice - a.OriginalPrice;
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [products, search, theme, size, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <MarketplaceHeader title={title} description={description} />

      <MarketplaceFilters
        searchValue={search}
        onSearchChange={setSearch}
        themeOptions={themeOptions}
        selectedTheme={theme}
        onThemeChange={setTheme}
        sizeOptions={sizeOptions}
        selectedSize={size}
        onSizeChange={setSize}
        sortValue={sort}
        onSortChange={setSort}
        resultCount={filteredProducts.length}
        onClearFilters={() => {
          setSearch("");
          setTheme("");
          setSize("");
        }}
      />

      <ProductGrid
        products={filteredProducts}
        wishlist={wishlist}
        currency={currency}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}
