import ProductGallery from "@/components/vendor/ProductGallery";
import ProductInfoCard from "@/components/vendor/ProductInfoCard";

export default function VendorProductDetail() {
  return (
    <main className="flex min-h-screen bg-[var(--background)]">

      <section className="page-container flex-1">
        {/* Header */}
        {/* breadcrumb */}
        <nav className="mb-3 flex items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">Dashboard</span>

          <span className="text-[var(--muted)]">/</span>

          <span className="text-[var(--muted)]">Costumes</span>

          <span className="text-[var(--muted)]">/</span>

          <span className="font-medium text-[var(--text)]">
            Crimson Valkyrie Armor
          </span>
        </nav>

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold">
              Crimson Valkyrie Armor
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Product ID: CF-PRD-2024-0815 • Updated 2 days ago
            </p>
          </div>

          <div>
            <button className="secondary-btn">Edit</button>
          </div>

        </div>
        <div className="grid grid-cols-[2.1fr_1fr] gap-7">
          <ProductGallery />

          <div className="space-y-7">
            <ProductInfoCard />

            {/* <AISizeMatchCard /> */}

            {/* <AnalyticsCard /> */}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-[2fr_1fr] gap-7">
          <div className="space-y-7">
            {/* <ProductDescriptionCard /> */}

            {/* <RentalHistoryCard /> */}
          </div>

          {/* <ProductReviewCard /> */}
        </div>
      </section>
    </main>
  );
}
